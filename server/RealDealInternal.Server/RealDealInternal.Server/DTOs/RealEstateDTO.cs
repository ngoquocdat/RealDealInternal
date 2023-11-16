namespace RealDealInternal;

public record RealEstateDTO(string id,
                            string title, 
                            string? description,
                            string rsType,
                            string location,
                            string address,
                            double floorArea,
                            double pricePerSquare,
                            double? price,
                            double priceOnRoom,
                            bool isPopular,
                            double propertyTotal,
                            int capacity,
                            string apartmentMap,
                            string propertyImages,
                            string searchKeys);