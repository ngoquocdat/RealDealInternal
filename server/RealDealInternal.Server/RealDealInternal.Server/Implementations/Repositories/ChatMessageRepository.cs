namespace RealDealInternal;

public class ChatMessageRepository : ApplicationBaseRepository<ChatMessage>, IChatMessageRepository
{
    #region [ Fields ]

    #endregion

    #region [ CTors ]

    public ChatMessageRepository(ApplicationDbContext context) : base(context) { }
    #endregion

    #region [ Methods ]
    #endregion

}
