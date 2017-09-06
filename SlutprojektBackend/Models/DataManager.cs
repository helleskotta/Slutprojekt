using SlutprojektBackend.Models.Entities;
using SlutprojektBackend.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class DataManager
    {
        WorkoutDBContext workoutcontext;

        public DataManager(WorkoutDBContext context)
        {
            workoutcontext = context;
        }

        public void TestMethodAddWorkoutSession()
        {
            string user = "PetterTest";
            List<SetVM> setView = new List<SetVM>();
            setView.Add(new SetVM { Reps = 10, UserComment = "", Weight = 50 });
            setView.Add(new SetVM { Reps = 81, UserComment = "", Weight = 55 });

            List<ExerciseVM> exerciseView = new List<ExerciseVM>();
            exerciseView.Add(new ExerciseVM { Name="Test",Sets=setView });

            WorkoutSessionVM viewModel = new WorkoutSessionVM {
                Date = DateTime.Now,
                Exercises = exerciseView,
                Type = "NewTest"};
            workoutcontext.AddWorkoutSessionStrength(user, viewModel);
        }

        internal MainVM GetMainViewModel(string userID)
        {
            MainVM VMToReturn = new MainVM();

            VMToReturn = workoutcontext.getMainVM(userID);

            return VMToReturn;
        }

        public void TestMethodGet()
        {
            workoutcontext.GetAllWorkoutSessions("PetterTest");
        }

        

    }
}
