using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SlutprojektBackend.Models.ViewModels;
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

        private List<CalendarMainVM> GetCalendarForMain(string userID)
        {
            var listToReturn = new List<CalendarMainVM>();
            var firstListitem= WorkoutSession
            .Where(i => i.UserId==userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d=>d.Date.Day<DateTime.Now.Day)
            .FirstOrDefault();

            var todayListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d => d.Date.Day == DateTime.Now.Day)
            .FirstOrDefault();

            var lastListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
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

        internal void AddWeightMeasurment(string userID, double weightData)
        {
            UserWeight.Add(new UserWeight() { Date = DateTime.Now, UserId = userID, UserWeight1 = weightData });
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
                .Select(c => c.Date).ToArray();

            dataToReturn.WeightData = UserWeight
               .Where(u => u.UserId == userID)
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


            return statsToReturn;
        }

        private StatisicsVM GetCardioVsStr(string userID)
        {
            var count = WorkoutSession.GroupBy(c => c.Type).Select(c=>c.Count());
            var names = WorkoutSession.GroupBy(c => c.Type).Select(c=>c.Key).ToArray();
            StatisicsVM statToReturn = new StatisicsVM();
            statToReturn.TypeOfWorkoutSession = "General";

            var data = new PieChartStat();

            data.Data = count.ToArray();
            data.Names = names;
            statToReturn.Stats = data;

            return statToReturn;
        }

        private StatisicsVM GetTotalLiftetWeight(string userID)
        {
            var temp =WorkoutSession
                .Where(c => c.UserId == userID)
                .Select(s => s.Exercise.Select(c => c.Set.Select(k => new  { weight = k.UsedWeight*k.Reps})));
            StatisicsVM statToReturn = new StatisicsVM();
            statToReturn.TypeOfWorkoutSession = "Strength";

            var total = 0.0;
             
            foreach (var item in temp)
            {
                total += Convert.ToDouble(item);
            }
            statToReturn.Stats = new TotalStrengthStats() {TotalWeightLifted=total };
           
            return statToReturn;

        }

        private StatisicsVM GetWeightStatFull(string userID)
        {
            var dataToReturn = new StatisicsVM();
            dataToReturn.TypeOfWorkoutSession = "General";

            var Data = new WeightChangeGrafStat();
            Data.DateData = UserWeight
                .Where(u => u.UserId == userID)
                .Select(c => c.Date).ToArray();

            Data.WeightData = UserWeight
               .Where(u => u.UserId == userID)
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
                .Select(s => new ChooseExerciseVM() {Name=s.Name, Type=s.Type }).ToList();
        }
    }

    public partial class AppIdentityDBContext : IdentityDbContext
    {
        public AppIdentityDBContext(DbContextOptions<AppIdentityDBContext> o) : base(o)
        {

        }
    }
}
