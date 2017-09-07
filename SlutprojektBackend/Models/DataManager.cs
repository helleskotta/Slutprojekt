﻿using SlutprojektBackend.Models.Entities;
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
            setView.Add(new SetVM { Reps = 10, UserComment = "", Weight = 80 });
            setView.Add(new SetVM { Reps = 81, UserComment = "", Weight = 85 });
            setView.Add(new SetVM { Reps = 81, UserComment = "", Weight = 85 });
            setView.Add(new SetVM { Reps = 81, UserComment = "", Weight = 80 });

            List<ExerciseVM> exerciseView = new List<ExerciseVM>();
            exerciseView.Add(new ExerciseVM { Name="SQUAT",Sets=setView });
            
            WorkoutSessionVM viewModel = new WorkoutSessionVM {
                Date = DateTime.Now.Date.AddDays(1),
                SessionName = "Next session",
                Exercises = exerciseView,
                Type = "Killer leg workout"};
            workoutcontext.AddWorkoutSessionStrength(user, viewModel);
        }

        internal void TestAddFavorite()
        {
            workoutcontext.AddUserFavorite("PetterTest", "MyFavoriteWorkout!");
            workoutcontext.AddUserFavorite("PetterTest", "MySecondFavoriteWorkout!");
            workoutcontext.AddUserFavorite("PetterTest", "MyLeastFavoriteWorkout!");
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

        public void TestAddWeight()
        {
            workoutcontext.AddWeightMeasurment("PetterTest", 100.0);
            workoutcontext.AddWeightMeasurment("PetterTest", 105.0);
            workoutcontext.AddWeightMeasurment("PetterTest", 90.0);
        }

    }
}
