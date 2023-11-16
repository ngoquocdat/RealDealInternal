namespace RealDealInternal;

public class AuthenticationController : BaseController
{
    #region [ Fields ]

    private readonly IAuthenticationService _authenticationService;
    #endregion

    #region [ CTor ]
    
    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    #endregion

    #region [ POST ]

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserLoginDTO dto, CancellationToken cancellationToken = default)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.username) || string.IsNullOrWhiteSpace(dto.password))
            return BadRequest();

        var result = await _authenticationService.Login(dto, cancellationToken);

        return result.Match(
            authenticatedInfo => (IActionResult)Ok(authenticatedInfo),
            error => NotFound(new
            {
                error.ServiceName,
                error.ErrorCode,
                error.ErrorMessage,
                error.EventOccuredAt
            })
        );
    }

    [HttpPost("loginWithPhoneNumber")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithPhoneNumber(PhoneNumberUserLoginDTO dto, CancellationToken cancellationToken = default)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.phoneNumber) || string.IsNullOrWhiteSpace(dto.password))
            return BadRequest();

        var result = await _authenticationService.LoginWithPhoneNumber(dto, cancellationToken);

        return result.Match(
            authenticatedInfo => (IActionResult)Ok(authenticatedInfo),
            error => NotFound(new
            {
                error.ServiceName,
                error.ErrorCode,
                error.ErrorMessage,
                error.EventOccuredAt
            })
        );
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromForm] UserSignUpDTO dto, CancellationToken cancellationToken = default)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.UserName) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest();

        await _authenticationService.Register(dto,  cancellationToken);

        return Created();
    }
    #endregion
}