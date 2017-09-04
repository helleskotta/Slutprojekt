CREATE TABLE [dbo].[Goal]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UserID] NVARCHAR(450) NOT NULL references AspNetUsers(ID), 
    [Type] NVARCHAR(20) NOT NULL
)
