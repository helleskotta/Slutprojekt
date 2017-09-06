using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SlutprojektBackend.Models.ViewModels;
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

            // Random statistik - lista? Välj ut i DataManager?
            mainVMToReturn.Statistics = GetStatisticsForMain(userID);

            //Hämtar #Goals
            // mainVMToReturn.Goals = GetGoalsForMain(userID);

            // 3 dagar i boxar
            mainVMToReturn.Calendar = GetCalendarForMain(userID);

            //Hämtar favorit pass för användare till add menyn
            mainVMToReturn.Favorites = GetFavoritesForMain(userID);

            return mainVMToReturn;
        }

        private List<string> GetFavoritesForMain(string userID)
        {
            throw new NotImplementedException();
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
            .First();

            var todayListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d => d.Date.Day == DateTime.Now.Day)
            .First();

            var lastListitem = WorkoutSession
            .Where(i => i.UserId == userID)
            .Select(c => new CalendarMainVM()
            {
                Date = c.Date,
                SessionName = c.SessionName,
                TypeOfWorkoutSession = c.Type
            })
            .Where(d => d.Date.Day > DateTime.Now.Day)
            .First();

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

        private List<StatisticsMainVM> GetStatisticsForMain(string userID)
        {
            List<StatisicsVM> statsForMain = new List<StatisicsVM>();
            //statsForMain.Add(new StatisicsVM() {TypeOfWorkoutSession })


            throw new NotImplementedException();
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
    }

    public partial class AppIdentityDBContext : IdentityDbContext
    {
        public AppIdentityDBContext(DbContextOptions<AppIdentityDBContext> o) : base(o)
        {

        }
        //Lägg till metoder
    }
}
