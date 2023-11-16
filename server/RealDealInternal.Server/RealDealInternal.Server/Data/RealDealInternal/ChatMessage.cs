namespace RealDealInternal;

public class ChatMessage : BaseEntity 
{
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string SenderName { get; set; } = string.Empty;
    public string SenderAvatar { get; set; } = string.Empty;
}