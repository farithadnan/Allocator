using Altr.Backend.Models.Foundation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Altr.Backend.Models
{
    public class Technique : DocumentEntity
    {
        public Technique()
        {
            CategorySets = new List<CategorySet>();
        }

        public int TechniqueId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public virtual List<CategorySet> CategorySets { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class CategorySet : BaseEntity
    {
        public int TechniqueId { get; set; }
        public virtual Technique Technique { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Percent { get; set; }

    }
}
