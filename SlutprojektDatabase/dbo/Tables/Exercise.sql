CREATE TABLE [logit].[Exercise]
(
	[ID] INT NOT NULL PRIMARY KEY identity, 
    [WorkoutSessionID] INT NOT NULL references logit.WorkoutSession([ID]), 
    [ExerciseName] NVARCHAR(20) NOT NULL
)
