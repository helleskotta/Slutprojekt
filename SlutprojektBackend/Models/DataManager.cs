using SlutprojektBackend.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SlutprojektBackend.Models
{
    public class DataManager
    {
        // Listor, data och metoder för att hantera datan
        static List<UserSettings> userSettings = new List<UserSettings>()
        {
                new UserSettings {Id = 1, UserId = "Daniel", Gender = "Male"},
                new UserSettings {Id = 2, UserId = "Helen", Gender = "Female"},
                new UserSettings {Id = 3, UserId = "Petter", Gender = "Male"},
        };

        static List<UserWeight> userWeight = new List<UserWeight>()
        {
                new UserWeight {Id = 1, UserId = "Daniel", UserWeight1 = 4},
                new UserWeight {Id = 2, UserId = "Helen", UserWeight1 = 5},
                new UserWeight {Id = 3, UserId = "Peter", UserWeight1 = 6}
        };

        static List<Goal> goal = new List<Goal>()
        {
                new Goal {Id = 1, UserId = "Daniel", Type = "Jag vill gå ner 3 kg"},
                new Goal {Id = 2, UserId = "Helen", Type = "Jag vill få mer muskler"},
                new Goal {Id = 3, UserId = "Petter", Type = "Jag vill få mer muskler"},
        };


    }
}
