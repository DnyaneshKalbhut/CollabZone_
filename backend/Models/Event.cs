using System;
using System.ComponentModel.DataAnnotations;

namespace CollabZone.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime EndTime { get; set; }
    }
}
