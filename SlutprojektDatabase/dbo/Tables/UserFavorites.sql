CREATE TABLE [logit].[UserFavorites]
(
	[Id] INT NOT NULL PRIMARY KEY identity, 
    [UserID] NVARCHAR(450) NOT NULL, 
    [Favorite] NVARCHAR(50) NOT NULL
)
