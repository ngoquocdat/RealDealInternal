using CommunityToolkit.Diagnostics;

namespace RealDealInternal;

public class AuthenticationService : IAuthenticationService
{

    #region [ Fields ]

    private readonly IMapper mapper;
    private readonly IMediaService mediaService;
    private readonly RoleManager<Role> roleManager;
    private readonly IUserRepository userRepository;
    private readonly IJwtTokenService jwtTokenService;
    private readonly IdentityDbContext identityDbContext;
    #endregion

    #region [ CTors ]

    public AuthenticationService(IMapper mapper,
                                 IMediaService mediaService,
                                 RoleManager<Role> roleManager,
                                 IUserRepository userRepository,
                                 IJwtTokenService jwtTokenService,
                                 IdentityDbContext identityDbContext)
    {

        this.mapper = mapper;
        this.roleManager = roleManager;
        this.mediaService = mediaService;
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
        this.identityDbContext = identityDbContext;
    }
    #endregion

    #region [ Methods ]

    public async Task<OneOf<AuthenticatedResponseDTO, ServiceError>> Login(UserLoginDTO dto, CancellationToken cancellationToken = default)
    {
        Guard.IsNotNull(dto);

        var user = await userRepository.FindByNameAsync(dto.username);
        if (user is null)
            return new ServiceError(nameof(AuthenticationService), nameof(Login))
            {
                ErrorMessage = ServiceConstants.USER_NOT_FOUND,
                ErrorCode = nameof(ServiceConstants.USER_NOT_FOUND),
                EventOccuredAt = DateTime.Now
            };

        var passwordCheck = await userRepository.CheckPasswordSignInAsync(user, dto.password, false);
        if (!passwordCheck.Succeeded)
            return new ServiceError(nameof(AuthenticationService), nameof(Login))
            {
                ErrorMessage = ServiceConstants.PASSWORD_INVALID,
                ErrorCode = nameof(ServiceConstants.PASSWORD_INVALID),
                EventOccuredAt = DateTime.Now
            };

        var requestAt = DateTime.UtcNow;
        var expiredIn = requestAt.AddDays(1);   // TODO: define expire time
        var accessToken = jwtTokenService.GenerateToken(user, requestAt, expiredIn);
        // TODO: define refresh token

        return new AuthenticatedResponseDTO(user.Id, requestAt, accessToken, expiredIn);
    }

    public async Task<OneOf<AuthenticatedResponseDTO, ServiceError>> LoginWithPhoneNumber(PhoneNumberUserLoginDTO dto, CancellationToken cancellationToken)
    {
        Guard.IsNotNull(dto);

        var user = await userRepository.FindByPhoneNumberAsync(dto.phoneNumber);
        if (user is null)
            return new ServiceError(nameof(AuthenticationService), nameof(LoginWithPhoneNumber))
            {
                ErrorMessage = ServiceConstants.USER_NOT_FOUND,
                ErrorCode = nameof(ServiceConstants.USER_NOT_FOUND),
                EventOccuredAt = DateTime.Now
            };
        var passwordCheck = await userRepository.CheckPasswordSignInAsync(user, dto.password, false);
        if (!passwordCheck.Succeeded)
            return new ServiceError(nameof(AuthenticationService), nameof(LoginWithPhoneNumber))
            {
                ErrorMessage = ServiceConstants.PASSWORD_INVALID,
                ErrorCode = nameof(ServiceConstants.PASSWORD_INVALID),
                EventOccuredAt = DateTime.Now
            };
        var requestAt = DateTime.UtcNow;
        var expiredIn = requestAt.AddDays(1);   // TODO: define expire time
        var accessToken = jwtTokenService.GenerateToken(user, requestAt, expiredIn);

        return new AuthenticatedResponseDTO(user.Id, requestAt, accessToken, expiredIn);
    }

    public async Task Register(UserSignUpDTO dto, CancellationToken cancellationToken = default)
    {
        Guard.IsNotNull(dto);

        var user = mapper.Map<User>(dto);

        user.CreatedAt = DateTime.UtcNow;

        await userRepository.CreateAsync(user, dto.Password);

        if (dto.AvatarFile is not null)
        {
            var uploadedAvatarInfomation = await mediaService.UploadFileAsync(dto.AvatarFile,
                                                                              MediaTypeDTO.Avatar,
                                                                              cancellationToken);
            user.ProfileImageUrl = uploadedAvatarInfomation.MediaUrl;
            await userRepository.UpdateAsync(user);
        }
    }
    #endregion
}
