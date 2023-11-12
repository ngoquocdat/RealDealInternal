﻿
using Azure.Storage;
using Azure.Storage.Blobs;
using System.Collections.ObjectModel;

namespace RealDealInternal;

public class AzureBlobService : IMediaService
{

    #region [ Fields ]

    private readonly IMapper mapper;
    private readonly IMediaRepository mediaRepository;
    private readonly AzureStorageConfig azureStorageConfig;
    private readonly StorageSharedKeyCredential storageCredentials;
    private readonly BlobContainerClient avatarBlobContainerClient;
    private readonly BlobContainerClient generalBlobContainerClient;
    #endregion

    #region [ Properties ]

    private ReadOnlyDictionary<MediaTypeDTO, string> azureBlobStorageContainersMap;
    #endregion

    #region [ CTors ]

    public AzureBlobService(IMapper mapper,
                            IMediaRepository mediaRepository,
                            IOptionsMonitor<AzureStorageConfig> config,
                            StorageSharedKeyCredential storageCredentials,
                            Func<AzureBlobContainerEnum, BlobContainerClient> avatarBlobContainerClient,
                            Func<AzureBlobContainerEnum, BlobContainerClient> generalBlobContainerClient)
    {
        this.mapper = mapper;
        this.mediaRepository = mediaRepository;
        this.azureStorageConfig = config.CurrentValue;
        this.storageCredentials = storageCredentials;
        this.avatarBlobContainerClient = avatarBlobContainerClient(AzureBlobContainerEnum.Avatar);
        this.generalBlobContainerClient = generalBlobContainerClient(AzureBlobContainerEnum.General);

        azureBlobStorageContainersMap = new ReadOnlyDictionary<MediaTypeDTO, string>(new Dictionary<MediaTypeDTO, string>()
        {
            { MediaTypeDTO.Avatar, azureStorageConfig.AvatarFiles},
            { MediaTypeDTO.Photo, azureStorageConfig.GeneralFiles}
        });
    }
    #endregion

    #region [ Methods ]

    public async Task<SystemMediaDTO?> UploadFileAsync(IFormFile file,
                                                      MediaTypeDTO type,
                                                      CancellationToken cancellationToken = default)
    {
        if (!IsImage(file))
            return null;

        var fileUploaded = await AzureSdkUploadFileAsync(file,
                                                         type,
                                                         cancellationToken);
        Media media = new()
        {
            Id = new Guid(fileUploaded.blobGuid),
            MediaUrl = fileUploaded.absoluteUri,
            MediaName = fileUploaded.name,
            Type = MediaTypeDtoToMediaTypeConverter(fileUploaded.mediaType),
            TimeUpload = fileUploaded.uploadDate
        };
        mediaRepository.Add(media);
        await mediaRepository.SaveChangesAsync(cancellationToken);
        return new()
        {
            FileName = fileUploaded.name,
            MediaUrl = fileUploaded.absoluteUri,
            UploadTime = fileUploaded.uploadDate,
            Type = fileUploaded.mediaType
        };
    }

    #endregion

    #region [ Private Methods ]
    bool IsImage(IFormFile file)
    {
        if (file.ContentType.Contains("image"))
            return true;

        string[] formats = { ".jpg", ".png", ".gif", ".jpeg" };

        return formats.Any(item => file.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
    }

    async Task<FileUploadedInformation> AzureSdkUploadFileAsync(IFormFile file, MediaTypeDTO mediaType, CancellationToken cancellationToken)
    {
        using (Stream stream = file.OpenReadStream())
        {
            var blobGuid = Guid.NewGuid().ToString("N");
            var blobUri = AzureUrlBuilder(azureStorageConfig.AccountName, azureBlobStorageContainersMap.GetValueOrDefault(mediaType)!, file.FileName);

            var blobClient = new BlobClient(blobUri, storageCredentials);

            await blobClient.UploadAsync(stream, cancellationToken);

            return new FileUploadedInformation(blobGuid,
                                               blobClient!.Name,
                                               blobUri.AbsoluteUri,
                                               mediaType,
                                               DateTime.Now);
        }
    }

    Uri AzureUrlBuilder(string accountName, string containerName, string fileName)
        => new Uri($"https://{accountName}.blob.core.windows.net/{containerName}/{fileName}");

    MediaType MediaTypeDtoToMediaTypeConverter(MediaTypeDTO type)
    {
        switch (type)
        {
            case MediaTypeDTO.Avatar:
                return MediaType.UserAvatar;
            case MediaTypeDTO.Photo:
                return MediaType.Photo;
            case MediaTypeDTO.Video:
                return MediaType.Video;
            case MediaTypeDTO.Audio:
                return MediaType.Audio;
            case MediaTypeDTO.File:
                return MediaType.File;
            case MediaTypeDTO.Other:
                return MediaType.Other;
            default:
                return MediaType.Other;
        }
    }
    #endregion
}
