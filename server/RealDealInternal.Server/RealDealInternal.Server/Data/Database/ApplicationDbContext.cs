using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class ApplicationDbContext : DbContext
{

    #region [ CTors ]

    public ApplicationDbContext(DbContextOptions options) : base(options) { }
    #endregion

    public virtual DbSet<Room> Rooms { get; set; } = null!;
    public virtual DbSet<Media> Medias { get; set; } = null!;
    public virtual DbSet<UserRoom> UserRooms { get; set; } = null!;
    public virtual DbSet<RealEstate> RealEstates { get; set; } = null!;
    public virtual DbSet<ChatMessage> ChatMessages { get; set; } = null!;
}
