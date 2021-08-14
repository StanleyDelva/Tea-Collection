USE [Tea-Collection]
GO

/****** Object:  StoredProcedure [dbo].[InsertPost]    Script Date: 8/14/2021 3:19:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[InsertPost]
@TeaType nchar(10),
@TeaName nvarchar(max),
@TeaImage varchar(MAX)=NULL,
@purchaseSite nvarchar(MAX),
@Description nvarchar(MAX)=NULL
AS
INSERT INTO Post (TeaType, TeaName, TeaImage, purchaseSite, Description)
VALUES (@TeaType, @TeaName, @TeaImage, @purchaseSite, @Description)

GO

