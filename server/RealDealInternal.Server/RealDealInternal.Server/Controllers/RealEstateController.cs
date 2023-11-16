using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class RealEstateController : BaseController
{
    #region [ Fields ]

    private readonly IRealEstateRepository realEstateRepository;
    #endregion

    #region [ CTor ]
    
    public RealEstateController(IRealEstateRepository realEstateRepository)
    {
        this.realEstateRepository = realEstateRepository;
    }
    #endregion

    #region [ GET ]

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get()
    {
        var result = await realEstateRepository.FindAll().ToListAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(400)]
    [AllowAnonymous]
    public async Task<ActionResult> Get(string id, 
                                        CancellationToken cancellationToken = default)
    {
        if(!Guid.TryParse(id, out _))
            throw new BadRequestException("Invalid real estate id format");

        var result = await realEstateRepository
                                .FindByIdAsync(id, cancellationToken);
        if(result is null)
            return NotFound();

        return Ok(result);
    }
    #endregion

    #region [ POST ]

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [AllowAnonymous]
    public async Task<IActionResult> Post(RealEstateDTO dto, 
                                          CancellationToken cancellationToken = default){           
        if(!Guid.TryParse(dto.id, out _))
            throw new BadRequestException("Invalid real estate id format");

        RealEstate realEstate = new()
        {
            Title = dto.title,
            Description = dto.description,
            RsType = dto.rsType,
            Location = dto.location,
            Address = dto.address,
            FloorArea = dto.floorArea,
            PricePerSquare = dto.pricePerSquare,
            Price = dto.price,
            PriceOnRoom = dto.priceOnRoom,
            IsPopular = dto.isPopular,
            PropertyTotal = dto.propertyTotal,
            Capacity = dto.capacity,
            ApartmentMap = dto.apartmentMap,
            PropertyImages = dto.propertyImages,
            SearchKeys = dto.searchKeys
        };
        realEstateRepository.Add(realEstate);
        await realEstateRepository.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = realEstate.Id });
    }
    #endregion

    #region [ PUT ]

    [HttpPut]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(RealEstateDTO dto,
                                         CancellationToken cancellationToken = default){
        if(!Guid.TryParse(dto.id, out _))
            throw new BadRequestException("Invalid real estate id format");
            
        var realEstate = await realEstateRepository.FindByIdAsync(dto.id, cancellationToken);
        if(realEstate is null)
            throw new NotFoundException("Invalid real estate id", dto.id);
        
        realEstate.Title = dto.title;
        realEstate.Description = dto.description;
        realEstate.RsType = dto.rsType;
        realEstate.Location = dto.location;
        realEstate.Address = dto.address;
        realEstate.FloorArea = dto.floorArea;
        realEstate.PricePerSquare = dto.pricePerSquare;
        realEstate.Price = dto.price;
        realEstate.PriceOnRoom = dto.priceOnRoom;
        realEstate.IsPopular = dto.isPopular;
        realEstate.PropertyTotal = dto.propertyTotal;
        realEstate.Capacity = dto.capacity;
        realEstate.ApartmentMap = dto.apartmentMap;
        realEstate.PropertyImages = dto.propertyImages;
        realEstate.SearchKeys = dto.searchKeys;

        realEstateRepository.Update(realEstate);
        await realEstateRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion

    #region [ DELETE ]

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id,
                                            CancellationToken cancellationToken = default){

        var realEstate = await realEstateRepository.FindByIdAsync(id, cancellationToken);
        if(realEstate is null)
            throw new NotFoundException("Invalid real estate id", id);

        realEstateRepository.Delete(realEstate);
        await realEstateRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion
}