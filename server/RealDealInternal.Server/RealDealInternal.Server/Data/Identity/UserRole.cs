﻿namespace RealDealInternal;

public class UserRole : IdentityUserRole<string>
{
    public string Id { get; set; } = default!;
    public virtual User? User { get; set; }
    public virtual Role? Role { get; set; }
}