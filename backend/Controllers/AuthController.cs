using Microsoft.AspNetCore.Mvc;
using AuthAPI.Data;
using CollabZone.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net.Mail;
using System.Net;
using CollabZone.Models;

namespace AuthAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthDbContext _context;

        public AuthController(AuthDbContext context)
        {
            _context = context;
        }

        [HttpOptions]
        public IActionResult Preflight()
        {
            return NoContent();
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(new { message = "Invalid data" });
            }

            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == user.Email.ToLower()))
            {
                return BadRequest(new { message = "User already exists" });
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignIn loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest(new { message = "Invalid login data" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == loginModel.Email.ToLower());

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(new { message = "Login successful", user });
        }

        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }






    }
}

