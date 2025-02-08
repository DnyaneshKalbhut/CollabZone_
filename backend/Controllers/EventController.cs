
using AuthAPI.Data;
using CollabZone.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventSchedular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AuthDbContext _context;

        public EventsController(AuthDbContext context)
        {
            _context = context;
        }

        // GET: api/events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();

            return events.Select(e => new {
                e.Id,
                e.Title,
                Start = e.Start.ToString("yyyy-MM-ddTHH:mm:ssZ"), // Format Start time
                End = e.EndTime.ToString("yyyy-MM-ddTHH:mm:ssZ")      // Format End time
            }).ToList();
        }


        // POST: api/events
        [HttpPost]
        public async Task<ActionResult<Event>> CreateEvent(Event eventData)
        {
            _context.Events.Add(eventData);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEvents), new { id = eventData.Id }, eventData);
        }
    }
}
