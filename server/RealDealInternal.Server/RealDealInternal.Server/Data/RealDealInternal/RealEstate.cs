namespace RealDealInternal;
public class RealEstate : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string RsType { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double FloorArea { get; set; }
    public double PricePerSquare { get; set; }
    public double? Price { get; set; }
    public double PriceOnRoom { get; set; }
    public bool IsPopular { get; set; }
    public double PropertyTotal { get; set; }
    public int Capacity { get; set; }
    public string ApartmentMap { get; set; } = string.Empty;
    public string PropertyImages { get; set; } = string.Empty;
    public string SearchKeys { get; set; } = string.Empty;

    public ICollection<Room> Rooms { get; set; } = new List<Room>();
    public ICollection<Facility> Facilities { get; set; } = new List<Facility>();
}