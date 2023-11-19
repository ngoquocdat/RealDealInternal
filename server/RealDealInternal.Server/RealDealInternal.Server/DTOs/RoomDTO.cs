namespace RealDealInternal;

public record RoomDTO(
    string id,
    int status,
    string realEstateId,
    string name,
    DateTime createdAt
);