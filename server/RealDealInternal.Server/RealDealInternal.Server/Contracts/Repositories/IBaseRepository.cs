﻿using System.Linq.Expressions;

namespace RealDealInternal;

public interface IBaseRepository<T> where T : class
{
    IQueryable<T> FindAll(Expression<Func<T, bool>>? predicate = null);
    Task<T?> FindByIdAsync(string id, CancellationToken cancellationToken = default);
    void Add(T entity);
    void AddRange(IEnumerable<T> entities);
    void Update(T entity);
    void Delete(T entity);
    void DeleteRange(IEnumerable<T> entities);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
