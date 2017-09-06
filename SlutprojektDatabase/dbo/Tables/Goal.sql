CREATE TABLE [logit].[Goal]
(
	[Id] INT NOT NULL PRIMARY KEY identity, 
    [UserID] NVARCHAR(450) NOT NULL, --references AspNetUsers(ID), 
    [Type] NVARCHAR(20) NOT NULL
)
