CREATE TABLE [dbo].[UserSettings]
(
	[Id] INT NOT NULL PRIMARY KEY, 
     [UserID] NVARCHAR(450) NOT NULL references AspNetUsers(ID), 
    [Gender] NVARCHAR(10) NOT NULL
)
