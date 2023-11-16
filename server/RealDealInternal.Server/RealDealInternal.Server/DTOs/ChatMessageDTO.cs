namespace RealDealInternal;

public record ChatMessageDTO(string id,
                             string roomId,
                             string content,
                             DateTime createdAt,
                             string senderId,
                             string senderName,
                             string senderAvatar);