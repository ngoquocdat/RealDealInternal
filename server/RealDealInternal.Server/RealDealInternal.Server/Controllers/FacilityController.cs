using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class FacilityController : BaseController
{
    #region [ Fields ]

    private readonly ApplicationDbContext context;
    private readonly IRealEstateRepository realEstateRepository;
    private readonly IFacilityRepository facilityRepository;
    #endregion

    #region [ CTor ]
    
    public FacilityController(ApplicationDbContext context,
                              IRealEstateRepository realEstateRepository,
                              IFacilityRepository facilityRepository)
    {
        this.context = context;
        this.realEstateRepository = realEstateRepository;
        this.facilityRepository = facilityRepository;
    }
    #endregion

    #region [ GET ]

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get()
    {
        var result = await facilityRepository.FindAll().ToListAsync();
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
            throw new BadRequestException("Invalid facility id format");

        var result = await facilityRepository.FindByIdAsync(id, cancellationToken);
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
    public async Task<IActionResult> Post(FacilityDTO dto, 
                                          CancellationToken cancellationToken = default)
    {
        if(!Guid.TryParse(dto.realEstateId, out _))
            throw new BadRequestException("Invalid real estate id format");

        var realestate = await realEstateRepository.FindByIdAsync(dto.realEstateId, 
                                                                  cancellationToken);
        if(realestate is null)
            return NotFound();

        Facility facility = new(){
            Bathroom = dto.bathRoom,
            Bedroom = dto.bedRoom,
            Other = dto.other,
        };                                    

        realestate.Facilities.Add(facility);
        await realEstateRepository.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = facility.Id });
    }
    #endregion

    #region [ PUT ]

    [HttpPut]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(FacilityDTO dto,
                                         CancellationToken cancellationToken = default)
    {

        if(!Guid.TryParse(dto.id, out _))
            throw new BadRequestException("Invalid facility id format");

        var facility = await facilityRepository.FindByIdAsync(dto.id, cancellationToken);
        if(facility is null)
            return NotFound();

        facility.Bathroom = dto.bathRoom;
        facility.Bedroom = dto.bedRoom;
        facility.Other = dto.other;

        facilityRepository.Update(facility);
        await facilityRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion

    #region [ DELETE ]

    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id,
                                            CancellationToken cancellationToken = default){
        if(!Guid.TryParse(id, out _))
            throw new BadRequestException("Invalid facility id format");

        var facility = await facilityRepository.FindByIdAsync(id, cancellationToken);
        if(facility is null)
            return NotFound();

        facilityRepository.Delete(facility);
        await facilityRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion
}