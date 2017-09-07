CREATE TABLE [logit].[UserExercises]
(
	[Id] INT NOT NULL PRIMARY KEY identity, 
    [UserID] NVARCHAR(450) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Type] NVARCHAR(50) NOT NULL
)
