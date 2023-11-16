using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class ChatMessageController : BaseController
{
    #region [ Fields ]

    private readonly ApplicationDbContext context;
    private readonly IRoomRepository roomRepository;
    private readonly IChatMessageRepository chatMessageRepository;
    #endregion

    #region [ CTor ]
    
    public ChatMessageController(ApplicationDbContext context,
                                 IRoomRepository roomRepository,
                                 IChatMessageRepository chatMessageRepository)
    {
        this.context = context;
        this.roomRepository = roomRepository;
        this.chatMessageRepository = chatMessageRepository;
    }
    #endregion

    #region [ GET ]

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Get()
    {
        var result = await chatMessageRepository.FindAll().ToListAsync();
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
            throw new BadRequestException("Invalid chat message id format");

        var result = await chatMessageRepository.FindByIdAsync(id, cancellationToken);
        if(result is null)
            throw new NotFoundException("Chat message not found", id);

        return Ok(result);
    }
    #endregion

    #region [ POST ]

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [AllowAnonymous]
    public async Task<IActionResult> Post(ChatMessageDTO dto, 
                                          CancellationToken cancellationToken = default){

                                            
        if(!Guid.TryParse(dto.roomId, out _))
            throw new BadRequestException("Invalid room id format");

        var room = await roomRepository.FindByIdAsync(dto.roomId, cancellationToken);
        if(room is null)
            throw new NotFoundException("Room not found", dto.roomId);  

        ChatMessage chatMessage = new(){
            Content = dto.content,
            CreatedAt = dto.createdAt,
            SenderId = dto.senderId,
            SenderName = dto.senderName,
            SenderAvatar = dto.senderAvatar
        };                                    

        room.Messages.Add(chatMessage);
        await roomRepository.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = chatMessage.Id });
    }
    #endregion

    #region [ PUT ]

    [HttpPut]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put(ChatMessageDTO dto,
                                         CancellationToken cancellationToken = default){


        if(!Guid.TryParse(dto.id, out _))
            throw new BadRequestException("Invalid chat message id format");

        var chatMessage = await chatMessageRepository.FindByIdAsync(dto.id, cancellationToken);
        if(chatMessage is null)
            throw new NotFoundException("Chat message not found", dto.id);

        chatMessage.SenderName = dto.senderName;
        chatMessage.SenderAvatar = dto.senderAvatar;
        chatMessage.Content = dto.content;
        chatMessage.CreatedAt = dto.createdAt;
        chatMessage.SenderId = dto.senderId;

        chatMessageRepository.Update(chatMessage);
        await chatMessageRepository.SaveChangesAsync(cancellationToken);
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
            throw new BadRequestException("Invalid chat message id format");

        var chatMessage = await chatMessageRepository.FindByIdAsync(id, cancellationToken);
        if(chatMessage is null)
            throw new NotFoundException("Chat message not found", id);

        chatMessageRepository.Delete(chatMessage);
        await chatMessageRepository.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
    #endregion
}