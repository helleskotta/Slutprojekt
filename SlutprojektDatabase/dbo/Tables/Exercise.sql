CREATE TABLE [dbo].[Exercise]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [WorkoutSessionID] INT NOT NULL references WorkoutSession(ID), 
    [ExerciseName] NVARCHAR(20) NOT NULL
)
