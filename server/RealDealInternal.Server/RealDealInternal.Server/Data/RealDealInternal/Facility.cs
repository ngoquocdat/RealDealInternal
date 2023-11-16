using System;

namespace RealDealInternal;
public class Facility : BaseEntity
{
    public int Bathroom { get; set; }
    public int Bedroom { get; set; }
    public string Other { get; set; } = string.Empty;  
}