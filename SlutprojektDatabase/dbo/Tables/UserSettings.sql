CREATE TABLE [logit].[UserSettings]
(
	[Id] INT NOT NULL PRIMARY KEY identity, 
     [UserID] NVARCHAR(450) NOT NULL, --references AspNetUsers(ID), 
    [Gender] NVARCHAR(10) NOT NULL
)
