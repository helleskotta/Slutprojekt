CREATE TABLE [logit].[UserWeight]
(
	[Id] INT NOT NULL PRIMARY KEY identity, 
    [UserID] NVARCHAR(450) NOT NULL, --references AspNetUsers(ID), 
    [UserWeight] FLOAT NOT NULL, 
    [Date] DATETIME NOT NULL
)
