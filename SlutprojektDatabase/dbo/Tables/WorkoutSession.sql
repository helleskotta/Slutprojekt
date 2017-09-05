﻿CREATE TABLE [logit].[WorkoutSession]
(
	[ID] INT NOT NULL PRIMARY KEY, 
    [UserID] NVARCHAR(450) NOT NULL, --references AspNetUsers(ID), 
    [Date] DATETIME NOT NULL, 
    [Type] NVARCHAR(50) NULL, 
    [Duration] INT NULL, 
    [Distance] FLOAT NULL, 
    [SessionUserNote] NVARCHAR(50) NULL
)
