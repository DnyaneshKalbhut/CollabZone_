using AuthAPI.Data;
using CollabZone.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add DB Context
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    builder.WithOrigins("http://localhost:3000", "https://localhost:3000") // Add both HTTP & HTTPS
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Add SignalR services
builder.Services.AddSignalR(); // <-- Missing in your original code

var app = builder.Build();

// Enable CORS middleware before Authorization and Controllers
app.UseCors("AllowSpecificOrigin");

// Enable Swagger UI (for API documentation)
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// ✅ Map your SignalR Hub
app.MapHub<ChatHub>("/chat"); // Ensure ChatHub exists


// Run the application
app.Run();
