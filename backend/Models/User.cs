using System.ComponentModel.DataAnnotations;

namespace CollabZone.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [StringLength(12, MinimumLength = 12)]
        public string Aadhaar { get; set; }

    }
}
