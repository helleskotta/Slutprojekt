using SlutprojektBackend.Models.Entities;
using SlutprojektBackend.Models.ViewModels;
using SlutprojektBackend.Models.ViewModels.Main;
using SlutprojektBackend.Models.ViewModels.WorkoutSession;
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

        internal void AddWorkOutForUser(string userID, WorkoutSessionVM newWorkout)
        {
            workoutcontext.AddWorkoutSessionStrength(userID, newWorkout);
        }

        internal List<WorkoutSessionVM> GetAllWorkoutsForUser(string userID)
        {
            return workoutcontext.GetAllWorkoutSessions(userID);
        }

        internal WrapperStatisticsVM GetStatisticsForUser(string userID)
        {
            WrapperStatisticsVM statsForStatistics = new WrapperStatisticsVM();
            statsForStatistics = workoutcontext.GetAllStatistics(userID);

            return statsForStatistics;
        }

        internal MainVM GetMainViewModel(string userID)
        {
            MainVM VMToReturn = new MainVM();

            VMToReturn = workoutcontext.getMainVM(userID);

            return VMToReturn;
        }

        public List<ChooseExerciseVM> GetExercises()
        {

            return workoutcontext.GetExercises();
        }

        public void AddWeight(string userID, BodyMeasurmentsVM bodyMeasurments)
        {
            workoutcontext.AddWeightMeasurment(userID, bodyMeasurments);
        }

        internal void EditWorkOutForUser(string userID, WorkoutSessionVM workoutToEdit)
        {
            workoutcontext.EditWorkout(userID, workoutToEdit);
        }

        internal void DeleteWorkoutSession(string userID, WorkoutSessionVM workoutToDelete)
        {
            workoutcontext.DeleteWorkout(userID, workoutToDelete);
        }
    }
}
