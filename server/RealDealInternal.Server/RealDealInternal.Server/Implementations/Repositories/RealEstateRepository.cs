
using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class RealEstateRepository : ApplicationBaseRepository<RealEstate>, IRealEstateRepository
{
    #region [ Fields ]

    #endregion

    #region [ CTors ]

    public RealEstateRepository(ApplicationDbContext context) : base(context) { }
    #endregion

    #region [ Methods ]

    public override Task<RealEstate?> FindByIdAsync(string id, CancellationToken cancellationToken = default)
        => Task.FromResult(_dbSet.Include(x => x.Rooms)
                                 .Include(x => x.Facilities)
                                 .FirstOrDefaultAsync(x => x.Id == new Guid(id)).Result);
    #endregion

}
