CREATE TABLE [logit].[Exercise]
(
	[ID] INT NOT NULL PRIMARY KEY identity, 
    [WorkoutSessionID] INT NOT NULL references logit.WorkoutSession([ID]), 
    [ExerciseName] NVARCHAR(40) NOT NULL
)
