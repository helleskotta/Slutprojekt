CREATE TABLE [dbo].[Set]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ExerciseID] INT NOT NULL references Exercise(ID), 
    [UsedWeight] FLOAT NOT NULL, 
    [Reps] INT NOT NULL, 
    [UserNote] NVARCHAR(50) NOT NULL
)
