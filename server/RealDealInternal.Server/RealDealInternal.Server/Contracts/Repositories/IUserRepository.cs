using System.Linq.Expressions;

namespace RealDealInternal;

public interface IUserRepository
{
    #region [ READS ]
    Task<User?> FindByGuidAsync(string guid, CancellationToken cancellationToken = default!);
    Task<List<User>> FindByGuidsAsync(string[] userGuids, CancellationToken cancellationToken = default!);
    Task<User?> FindByNameAsync(string userName);
    Task<User?> FindByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default!);
    Task<Microsoft.AspNetCore.Identity.SignInResult> CheckPasswordSignInAsync(User user, string password, bool lockoutOnFailure);
    IQueryable<User> FindAll(Expression<Func<User, bool>>? predicate = null);
    Task<User?> FindBySignalRConnectionStringId(string connectionId, CancellationToken cancellationToken = default!);
    #endregion

    #region [ MUTATES ]
    Task<IdentityResult> CreateAsync(User user, string password);
    Task<IdentityResult> UpdateAsync(User user);
    #endregion
}
