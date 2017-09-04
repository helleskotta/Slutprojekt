CREATE TABLE [dbo].[UserWeight]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UserID] NVARCHAR(450) NOT NULL references AspNetUsers(ID), 
    [UserWeight] FLOAT NOT NULL, 
    [Date] DATETIME NOT NULL
)
