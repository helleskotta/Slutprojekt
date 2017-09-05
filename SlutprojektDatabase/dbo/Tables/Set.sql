CREATE TABLE [logit].[Set]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ExerciseID] INT NOT NULL references logit.Exercise([ID]), 
    [UsedWeight] FLOAT NOT NULL, 
    [Reps] INT NOT NULL, 
    [UserNote] NVARCHAR(50) NOT NULL
)
