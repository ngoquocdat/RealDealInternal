
using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class RoomRepository : ApplicationBaseRepository<Room>, IRoomRepository
{
    #region [ Fields ]

    #endregion

    #region [ CTors ]

    public RoomRepository(ApplicationDbContext context) : base(context) { }
    #endregion

    #region [ Methods ]

    public override Task<Room?> FindByIdAsync(string id, CancellationToken cancellationToken = default)
        => Task.FromResult(_dbSet.Include(x => x.Messages).FirstOrDefaultAsync(x => x.Id == new Guid(id)).Result);
    #endregion

}
