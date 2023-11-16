using Microsoft.AspNetCore.SignalR;

namespace RealDealInternal;

public class ChatHub : Hub
{
    #region [Services]

    private readonly IUserRepository userRepository;
    private readonly IRoomRepository roomRepository;
    private readonly IChatMessageRepository chatMessageRepository;
    #endregion

    #region [CTor]

    public ChatHub(IUserRepository userRepository,
                   IRoomRepository roomRepository,
                   IChatMessageRepository chatMessageRepository)
    {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    #endregion

    #region [Overrides]

    public override async Task OnConnectedAsync()
    {
        CancellationToken cancellationToken = new CancellationToken(default);

        var guid = Context.User?.Claims?.First(c => c.Type == "guid")?.Value;
        var loginUser = await userRepository.FindByGuidAsync(guid!, cancellationToken);
        if (loginUser is null)
            return;

        loginUser!.SignalRConnectionId = Context.ConnectionId;
        await userRepository.UpdateAsync(loginUser);
        await Clients.All.SendAsync("ChatHub", $"Welcome {loginUser!.UserName}");
        await Clients.All.SendAsync("ChatHub", $"Welcome Tourist");

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        CancellationToken cancellationToken = new CancellationToken(default);

        var connectionId = Context.ConnectionId;
        var logoffUser = await userRepository.FindBySignalRConnectionStringId(connectionId, cancellationToken);
        logoffUser!.SignalRConnectionId = string.Empty;
        await userRepository.UpdateAsync(logoffUser);


        await Clients.All.SendAsync("MAUIslandHub", $"{logoffUser.UserName} Logoff");
        await base.OnDisconnectedAsync(exception);
    }
    #endregion

    #region [Channels]
    public async Task SendMessage(string message,
                                  string roomId)
    {
        CancellationToken cancellationToken = new CancellationToken(default);

        var signalRConnectionId = Context.ConnectionId;
        var userInfo = await userRepository.FindBySignalRConnectionStringId(signalRConnectionId, cancellationToken);
        var roomInfo = await roomRepository.FindByIdAsync(roomId, cancellationToken);

        ChatMessage chatMessage = new()
        {
            SenderId = userInfo!.Id,
            SenderName = userInfo!.UserName!,
            Content = message,
            CreatedAt = DateTime.Now,
        };

        roomInfo!.Messages.Add(chatMessage);
        await roomRepository.SaveChangesAsync(cancellationToken);

        await Clients.All.SendAsync("ReceiveMessage",
                                    message,
                                    userInfo!.UserName,
                                    userInfo.ProfileImageUrl ?? "https://i.imgur.com/deS4147.png",
                                    chatMessage.CreatedAt);
    }
    #endregion

}