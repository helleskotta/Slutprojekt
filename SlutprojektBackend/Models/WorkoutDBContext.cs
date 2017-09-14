using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SlutprojektBackend.Models.ViewModels;
using SlutprojektBackend.Models.ViewModels.Main;
using SlutprojektBackend.Models.ViewModels.Statistics;
using SlutprojektBackend.Models.ViewModels.WorkoutSession;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models.Entities
{
    public partial class WorkoutDBContext
    {
        public WorkoutDBContext(DbContextOptions<WorkoutDBContext> o) : base(o)
        {

        }
        //Add a workoutsession
        public void AddWorkoutSessionStrength(string userID, WorkoutSessionVM workoutSessionVM) //Bool return?
        {
            var session = new WorkoutSession
            {
                Date = workoutSessionVM.Date,
                Distance = workoutSessionVM.Distance,
                Duration = workoutSessionVM.Duration,
                Type = workoutSessionVM.Type,
                SessionUserNote = workoutSessionVM.SessionUserNote,
                UserId = userID,
                SessionName = workoutSessionVM.SessionName,
            };


            foreach (var exerciseVM in workoutSessionVM.Exercises)
            {
                var exercise = new Exercise { ExerciseName = exerciseVM.Name };
                session.Exercise.Add(exercise);
                foreach (var set in exerciseVM.Sets)
                {
                    exercise.Set.Add(new Set { Reps = set.Reps, UsedWeight = set.Weight, UserNote = set.UserComment });
                }
            };

            WorkoutSession.Add(session);
            SaveChanges();
        }

        //Gets the VM for Main page
        public MainVM getMainVM(string userID)
        {
            MainVM mainVMToReturn = new MainVM();

            //// Random statistik - lista? Välj ut i DataManager?
            mainVMToReturn.Statistics = GetStatisticsForMain(userID);

            //Hämtar #Goals
            // mainVMToReturn.Goals = GetGoalsForMain(userID);

            // 3 dagar i boxar
            mainVMToReturn.Calendar = GetCalendarForMain(userID);

            ////Hämtar favorit pass för användare till add menyn
            mainVMToReturn.Favorites = GetFavoritesForMain(userID);

            return mainVMToReturn;
        }

        private List<string> GetFavoritesForMain(string userID)
        {
            return UserFavorites.Where(c => c.UserId == userID).OrderBy(o => o.Id).Select(f => f.Favorite).ToList();
        }


        //Ska ej användas
        private List<CalendarMainVM> GetCalendarForMain(string userID)
        {
            var listToReturn = new List<CalendarMainVM>();
            var firstListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d => (d.Date.DayOfYear < DateTime.Now.DayOfYear) && (d.Date.Year <= DateTime.Now.Year))
            .OrderByDescending(c => c.Date)
            .FirstOrDefault();

            var todayListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d => d.Date.Day == DateTime.Now.Day && d.Date.Month==DateTime.Now.Month && d.Date.Year == DateTime.Now.Year)
            .FirstOrDefault();

            var lastListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .OrderBy(c => c.Date)
            .Where(d => d.Date.Day > DateTime.Now.Day)
            .FirstOrDefault();

            listToReturn.Add(firstListitem);
            listToReturn.Add(todayListitem);
            listToReturn.Add(lastListitem);
            return listToReturn;
        }

        private List<GoalVM> GetGoalsForMain(string userID)
        {
            //return Goal.Where(u => u.UserId == userID);
            return null;
        }

        internal void AddWeightMeasurment(string userID, BodyMeasurmentsVM bodyMeasurments)
        {
            UserWeight.Add(new UserWeight()
            {
                Date = bodyMeasurments.Date,
                UserId = userID,
                UserWeight1 = bodyMeasurments.BodyWeight
            });
            SaveChanges();
        }

        private List<Stats> GetStatisticsForMain(string userID)
        {
            List<Stats> statsForMain = new List<Stats>();

            WeightChangeGrafStat weightChangeGrafStat = GetWeightStat(userID);
            statsForMain.Add(weightChangeGrafStat);

            return statsForMain;
        }

        private WeightChangeGrafStat GetWeightStat(string userID)
        {
            var dataToReturn = new WeightChangeGrafStat();
            

            dataToReturn.DateData = UserWeight
                .Where(u => u.UserId == userID)
                .OrderBy(e =>e.Date)
                .Select(c => c.Date).ToArray();

            dataToReturn.WeightData = UserWeight
               .Where(u => u.UserId == userID)
               .OrderBy(e => e.Date)
               .Select(c => c.UserWeight1).ToArray();

            return dataToReturn;
        }

        //Gets all workoutsession for a user
        public List<WorkoutSessionVM> GetAllWorkoutSessions(string userID)
        {
            List<WorkoutSessionVM> listOfWorkoutToReturn = new List<WorkoutSessionVM>();

            listOfWorkoutToReturn = WorkoutSession
                .Where(i => i.UserId == userID)
                .Select(w => new WorkoutSessionVM
                {
                    Date = w.Date,
                    Distance = w.Distance,
                    Duration = w.Duration,
                    SessionName = w.SessionName,
                    SessionUserNote = w.SessionUserNote,
                    Type = w.Type,
                    Exercises =
                    w.Exercise.Select(
                        z => new ExerciseVM
                        {
                            Name = z.ExerciseName,
                            Sets = z.Set.Select(
                            q => new SetVM { Reps = q.Reps, UserComment = q.UserNote, Weight = Convert.ToInt32(q.UsedWeight) }).ToList()
                        }).ToList()
                })
                .OrderBy(c => c.Date)
                .ToList();
            return listOfWorkoutToReturn;
        }

        public List<CalendarVM> GetCalendar(string userID)
        {
            var calandarList = WorkoutSession
                .Where(i => i.UserId == userID)
                .Select(c => new CalendarVM()
                {
                    NameOfWorkoutSession = c.SessionName,
                    TypeOfWorkoutSession = c.Type,
                    Date = c.Date
                })
                .OrderBy(c => c.Date)
                .ToList();

            return calandarList;
        }

        internal void AddUserFavorite(string userID, string favoriteToAdd)
        {
            UserFavorites.Add(new UserFavorites() { UserId = userID, Favorite = favoriteToAdd });
            SaveChanges();
        }

        public WrapperStatisticsVM GetAllStatistics(string userID)
        {

            WrapperStatisticsVM statsToReturn = new WrapperStatisticsVM();
            statsToReturn.Statistics = new List<StatisicsVM>();

            //Vikt kurva
            statsToReturn.Statistics.Add(GetWeightStatFull(userID));

            //Total lyft vikt!
            statsToReturn.Statistics.Add(GetTotalLiftetWeight(userID));

            //Cardio vs STR
            statsToReturn.Statistics.Add(GetCardioVsStr(userID));

            // Total km 
            statsToReturn.Statistics.Add(GetTotalDistanceDone(userID));

            return statsToReturn;
        }

        private StatisicsVM GetTotalDistanceDone(string userID)
        {
            var totalDistanceStat = WorkoutSession
                .Where(t => t.UserId == userID && t.Type == "Cardio")
                .Select(d => d.Distance)
                .Sum();

            StatisicsVM statToReturn = new StatisicsVM();
            statToReturn.TypeOfWorkoutSession = "Cardio";

            statToReturn.Stats = new TotalCardioDistansStat() { Distans = Convert.ToDouble(totalDistanceStat) };

            return statToReturn;
        }

        private StatisicsVM GetCardioVsStr(string userID)
        {
            int [] countArray = new int [3];

            var countStrength = WorkoutSession
                .Where(b => b.UserId==userID && b.Type== "Strength").Count();
            countArray[0] =countStrength;

            var countCardio = WorkoutSession
                .Where(b => b.UserId == userID && b.Type == "Cardio").Count();
            countArray[1] = countCardio;


            var countOther = WorkoutSession
                .Where(b => b.UserId == userID && b.Type == "Other").Count();
            countArray[2] = countOther;


            string [] namesArray = new string[3] { "Strength", "Cardio", "Other" };
           
            StatisicsVM statToReturn = new StatisicsVM();
            statToReturn.TypeOfWorkoutSession = "General";

            var data = new PieChartStat();

            data.Data = countArray;
            data.Names = namesArray;
            statToReturn.Stats = data;

            return statToReturn;
        }

        private StatisicsVM GetTotalLiftetWeight(string userID)
        {
            var workOutSessions = WorkoutSession
                .Where(c => c.UserId == userID && c.Type == "Strength")
                .Select(x => x.Exercise
                    .Select(y => y.Set.Sum(z => z.Reps * z.UsedWeight)))
                        .Select(w => w.Sum())
                .Sum();

            StatisicsVM statToReturn = new StatisicsVM();
            statToReturn.TypeOfWorkoutSession = "Strength";

            statToReturn.Stats = new TotalStrengthStats() { TotalWeightLifted = workOutSessions };

            return statToReturn;

        }

        private StatisicsVM GetWeightStatFull(string userID)
        {
            var dataToReturn = new StatisicsVM();
            dataToReturn.TypeOfWorkoutSession = "General";

            var Data = new WeightChangeGrafStat();
            Data.DateData = UserWeight
                .Where(u => u.UserId == userID)
                .OrderBy(e=>e.Date)
                .Select(c => c.Date).ToArray();

            Data.WeightData = UserWeight
               .Where(u => u.UserId == userID)
                .OrderBy(e => e.Date)
               .Select(c => c.UserWeight1).ToArray();

            dataToReturn.Stats = Data;

            return dataToReturn;
        }

        // C# 7 Synatx
        //public List<WorkoutSessionVM> GetAllWorkoutSessions(string userID) =>
        //    WorkoutSession
        //        .Where(i => i.UserId == userID)
        //        .Select(w => new WorkoutSessionVM
        //        {
        //            Date = w.Date,
        //            Distance = w.Distance,
        //            Duration = w.Duration,
        //            Exercises =
        //            w.Exercise.Select(
        //                z => new ExerciseVM
        //                {
        //                    Name = z.ExerciseName,
        //                    Sets = z.Set.Select(
        //                    q => new SetVM { Reps = q.Reps, UserComment = q.UserNote, Weight = Convert.ToInt32(q.UsedWeight) }).ToList()
        //                }).ToList()
        //        })
        //        .ToList();

        //Lägg till metoder

        internal List<ChooseExerciseVM> GetExercises()
        {
            return UserExercises
                .Where(c => c.UserId == "Admin")
                .Select(s => new ChooseExerciseVM() { Name = s.Name, Type = s.Type }).ToList();
        }

        internal void EditWorkout(string userID, WorkoutSessionVM workoutToEdit)
        {

            var session = new WorkoutSession
            {
                Date = workoutToEdit.Date,
                Distance = workoutToEdit.Distance,
                Duration = workoutToEdit.Duration,
                Type = workoutToEdit.Type,
                SessionUserNote = workoutToEdit.SessionUserNote,
                UserId = userID,
                SessionName = workoutToEdit.SessionName,
            };


            foreach (var exerciseVM in workoutToEdit.Exercises)
            {
                var exercise = new Exercise { ExerciseName = exerciseVM.Name };
                session.Exercise.Add(exercise);
                foreach (var set in exerciseVM.Sets)
                {
                    exercise.Set.Add(new Set { Reps = set.Reps, UsedWeight = set.Weight, UserNote = set.UserComment });
                }
            };
            var oldWorkoutSession = WorkoutSession
                .Include(z=>z.Exercise)
                .ThenInclude(y=>y.Set)
                .FirstOrDefault(x => x.SessionName == workoutToEdit.SessionName && x.UserId == userID && x.Date == workoutToEdit.Date); //== session;

            foreach (var exercise in oldWorkoutSession.Exercise)
            {
                foreach (var set in exercise.Set)
                {
                    Set.Remove(set);
                }
                //SaveChanges();

                Exercise.Remove(exercise);

            };
            //SaveChanges();

            WorkoutSession.Remove(oldWorkoutSession);

            WorkoutSession.Add(session);
            SaveChanges();
            
             
        }

        internal void DeleteWorkout(string userID, WorkoutSessionVM workoutToDelete)
        {
            var oldWorkoutSession = WorkoutSession
                .Include(z => z.Exercise)
                .ThenInclude(y => y.Set)
                .FirstOrDefault(x => x.SessionName == workoutToDelete.SessionName && x.UserId == userID && x.Date == workoutToDelete.Date); //== session;

            foreach (var exercise in oldWorkoutSession.Exercise)
            {
                foreach (var set in exercise.Set)
                {
                    Set.Remove(set);
                }
                //SaveChanges();

                Exercise.Remove(exercise);

            };
            //SaveChanges();

            WorkoutSession.Remove(oldWorkoutSession);
            SaveChanges();
        }
    }

    public partial class AppIdentityDBContext : IdentityDbContext
    {
        public AppIdentityDBContext(DbContextOptions<AppIdentityDBContext> o) : base(o)
        {

        }
    }
}
