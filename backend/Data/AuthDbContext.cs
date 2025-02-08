using Microsoft.EntityFrameworkCore;
using CollabZone.Models;


namespace AuthAPI.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>()
                .Property(e => e.EndTime) // Ensure EndTime is correctly mapped
                .HasColumnName("EndTime"); // Avoids using 'End'
        }
    }
}