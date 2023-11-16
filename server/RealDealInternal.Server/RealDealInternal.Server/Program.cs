using Azure.Storage;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RealDealInternal;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Real Deal", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                    new string[] { }
                }
              });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = false,
                        ValidIssuer = builder.Configuration["JwtTokenConfig:Issuer"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtTokenConfig:Key"]!)),
                        ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha256 },
                    };
                });


builder.Services.AddIdentity<User, Role>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 1;

    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<IdentityDbContext>()
    .AddUserManager<UserManager>()
    .AddDefaultTokenProviders();
builder.Services.AddDbContextPool<IdentityDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection")));
builder.Services.AddDbContextPool<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPermission", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .WithOrigins("http://localhost:7094")
              .AllowCredentials();
    });
});
builder.Services.AddSignalR();

builder.Services.Configure<AzureStorageConfig>(builder.Configuration.GetSection("AzureStorageConfig"));
builder.Services.Configure<JwtTokenConfig>(builder.Configuration.GetSection("JwtTokenConfig"));


builder.Services.AddTransient<Func<AzureBlobContainerEnum, BlobContainerClient>>(provider => container =>
{
    var config = provider.GetRequiredService<IOptionsMonitor<AzureStorageConfig>>().CurrentValue;
    switch (container)
    {
        case AzureBlobContainerEnum.Avatar:
            return new BlobContainerClient(config.BlobConnectionString, config.AvatarFiles);

        case AzureBlobContainerEnum.General:
            return new BlobContainerClient(config.BlobConnectionString, config.GeneralFiles);

        default:
            return new BlobContainerClient(config.BlobConnectionString, config.GeneralFiles);
    }
});
builder.Services.AddSingleton((provider) =>
{
    var config = provider.GetRequiredService<IOptionsMonitor<AzureStorageConfig>>().CurrentValue;
    return new StorageSharedKeyCredential(config.AccountName, config.AccountKey);
});

builder.Services.AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IRoomRepository, RoomRepository>()
                .AddScoped<IChatMessageRepository, ChatMessageRepository>()
                .AddScoped<IRealEstateRepository, RealEstateRepository>()
                .AddScoped<IFacilityRepository, FacilityRepository>()
                .AddScoped<IMediaService, AzureBlobService>()
                .AddScoped<IJwtTokenService, JwtTokenService>()
                .AddScoped<IMediaRepository, MediaRepository>()
                .AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.DefaultRequestCulture = new RequestCulture("en-US");
});


builder.Services.AddControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddSingleton(new MapperConfiguration(
    mc =>
    {
        mc.AddProfile(new MappingConfig());
    }).CreateMapper());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("ClientPermission");

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");


app.Run();
