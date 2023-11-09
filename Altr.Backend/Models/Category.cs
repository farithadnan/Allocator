using Altr.Backend.Models.Foundation;
using System;
using System.ComponentModel.DataAnnotations;

namespace Altr.Backend.Models
{
    public class Category : DocumentEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
