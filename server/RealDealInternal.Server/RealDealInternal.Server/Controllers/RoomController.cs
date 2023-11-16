using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class RoomController : BaseController
{
    #region [ Fields ]

    private readonly ApplicationDbContext context;
    private readonly IRoomRepository roomRepository;
    private readonly IRealEstateRepository realEstateRepository;
    #endregion

    #region [ CTor ]
    
    public RoomController(ApplicationDbContext context,
                          IRoomRepository roomRepository,
                          IRealEstateRepository realEstateRepository)
    {
        this.context = context;
        this.roomRepository = roomRepository;
        this.realEstateRepository = realEstateRepository;
    }
    #endregion

    #region [ GET ]

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get()
    {
        var result = await roomRepository.FindAll().ToListAsync();
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
            throw new BadRequestException("Invalid room id format");

        var result = await roomRepository.FindByIdAsync(id, cancellationToken);
        if(result is null)
            return NotFound();

        return Ok(result);
    }
    #endregion

    #region [ POST ]

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [AllowAnonymous]
    public async Task<IActionResult> Post(RoomDTO dto, 
                                          CancellationToken cancellationToken = default){
        
        if(!Guid.TryParse(dto.realEstateId, out _))
            throw new BadRequestException("Invalid real estate id format");

        var realEstate = await realEstateRepository.FindByIdAsync(dto.realEstateId, cancellationToken);
        if(realEstate is null)
            throw new NotFoundException("Real estate not found", dto.realEstateId);

        Room room = new()
        {
            Name = dto.name,
            CreatedAt = dto.createdAt
        };

        realEstate.Rooms.Add(room);
        await realEstateRepository.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = realEstate.Id });
    }
    #endregion

    #region [ PUT ]

    [HttpPut]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(RoomDTO dto,
                                         CancellationToken cancellationToken = default){
                                            
        if(!Guid.TryParse(dto.id, out _))
            throw new BadRequestException("Invalid room id format");

        var room = await roomRepository.FindByIdAsync(dto.id, cancellationToken);
        if(room is null)
            return NotFound();

        room.Name = dto.name;
        room.CreatedAt = dto.createdAt;

        roomRepository.Update(room);
        await roomRepository.SaveChangesAsync(cancellationToken);
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
            throw new BadRequestException("Invalid room id format");

        var room = await roomRepository.FindByIdAsync(id, cancellationToken);
        if(room is null)
            return NotFound();

        roomRepository.Delete(room);
        await roomRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion
}