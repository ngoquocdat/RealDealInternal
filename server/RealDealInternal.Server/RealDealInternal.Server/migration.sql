IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Medias] (
    [Id] uniqueidentifier NOT NULL,
    [MediaName] nvarchar(max) NOT NULL,
    [MediaUrl] nvarchar(max) NOT NULL,
    [TimeUpload] datetime2 NOT NULL,
    [Type] int NOT NULL,
    CONSTRAINT [PK_Medias] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20231112151428_initial_migration', N'8.0.0-rc.2.23480.1');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [RealEstates] (
    [Id] uniqueidentifier NOT NULL,
    [Title] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [RsType] nvarchar(max) NOT NULL,
    [Location] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    [FloorArea] float NOT NULL,
    [PricePerSquare] float NOT NULL,
    [Price] float NULL,
    [PriceOnRoom] float NOT NULL,
    [IsPopular] bit NOT NULL,
    [PropertyTotal] float NOT NULL,
    [Capacity] int NOT NULL,
    [ApartmentMap] nvarchar(max) NOT NULL,
    [PropertyImages] nvarchar(max) NOT NULL,
    [SearchKeys] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_RealEstates] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [UserRooms] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] nvarchar(max) NOT NULL,
    [RoomId] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_UserRooms] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Facility] (
    [Id] uniqueidentifier NOT NULL,
    [Bathroom] int NOT NULL,
    [Bedroom] int NOT NULL,
    [Other] nvarchar(max) NOT NULL,
    [RealEstateId] uniqueidentifier NULL,
    CONSTRAINT [PK_Facility] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Facility_RealEstates_RealEstateId] FOREIGN KEY ([RealEstateId]) REFERENCES [RealEstates] ([Id])
);
GO

CREATE TABLE [Rooms] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [RealEstateId] uniqueidentifier NULL,
    CONSTRAINT [PK_Rooms] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Rooms_RealEstates_RealEstateId] FOREIGN KEY ([RealEstateId]) REFERENCES [RealEstates] ([Id])
);
GO

CREATE TABLE [ChatMessages] (
    [Id] uniqueidentifier NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [SenderId] nvarchar(max) NOT NULL,
    [SenderName] nvarchar(max) NOT NULL,
    [SenderAvatar] nvarchar(max) NOT NULL,
    [RoomId] uniqueidentifier NULL,
    CONSTRAINT [PK_ChatMessages] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ChatMessages_Rooms_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [Rooms] ([Id])
);
GO

CREATE INDEX [IX_ChatMessages_RoomId] ON [ChatMessages] ([RoomId]);
GO

CREATE INDEX [IX_Facility_RealEstateId] ON [Facility] ([RealEstateId]);
GO

CREATE INDEX [IX_Rooms_RealEstateId] ON [Rooms] ([RealEstateId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20231115080608_rooms_realestate_entities', N'8.0.0-rc.2.23480.1');
GO

COMMIT;
GO

