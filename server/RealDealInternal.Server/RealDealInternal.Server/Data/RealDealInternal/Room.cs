namespace RealDealInternal;
public class Room : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public ChatRoomStatus Status { get; set; } = ChatRoomStatus.Inprogress;
    public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
}

public enum ChatRoomStatus
{
    Inprogress, Completed
}

