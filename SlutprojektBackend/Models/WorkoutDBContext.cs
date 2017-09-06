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
        public WorkoutDBContext(DbContextOptions<WorkoutDBContext> o) : base (o)
        {
            
        }
        //todo
        public void AddWorkoutSession(string userID, WorkoutSessionVM workoutSessionVM) //Bool return?
        {
            var session=new WorkoutSession
            {
                Date = workoutSessionVM.Date,
                Distance = workoutSessionVM.Distance,
                Duration = workoutSessionVM.Duration,
                Type = workoutSessionVM.Type,
                SessionUserNote = workoutSessionVM.SessionUserNote,
                //Exercise = workoutSessionToAdd.Exercises
                UserId = userID,
                
            };

            foreach (var exerciseVM in workoutSessionVM.Exercises)
            {
                var exercise = new Exercise { ExerciseName = exerciseVM.Name};
                session.Exercise.Add(exercise);
                foreach (var set in exerciseVM.Sets)
                {
                    exercise.Set.Add(new Set {Reps=set.Reps,UsedWeight=set.Weight,UserNote=set.UserComment });
                }
            };
            WorkoutSession.Add(session);
            SaveChanges();
        }
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
