using Microsoft.EntityFrameworkCore;

namespace RealDealInternal;

public class RolesController : BaseController
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public RolesController(RoleManager<Role> roleManager, IMapper mapper)
    {
        _roleManager = roleManager;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var roles = await _roleManager.Roles.ToListAsync();
        return Ok(_mapper.Map<IEnumerable<RoleDTO>>(roles));
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] RoleDTO dTO)
    {
        var role = _mapper.Map<Role>(dTO);
        await _roleManager.CreateAsync(role);

        return Ok(new RoleDTO()
        {
            Id = role.Id,
            Name = role.Name!,
            Mission = role.Mission,
            MainTasks = role.MainTasks,
            RoleIcon = role.RoleIcon,
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] RoleDTO dto)
    {
        var role = await _roleManager.FindByIdAsync(dto.Id);
        if (role is null)
            return NotFound();

        role.Name = dto.Name;
        role.RoleIcon = dto.RoleIcon;
        role.Summary = dto.Summary;
        role.Mission = dto.Mission;
        role.MainTasks = dto.MainTasks;


        await _roleManager.UpdateAsync(role);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role is null)
            return NotFound();

        await _roleManager.DeleteAsync(role);
        return NoContent();
    }
}
