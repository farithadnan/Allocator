using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Altr.Backend.Models.Foundation
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            UpdateEntities = new List<string>();
            UpdateOneToManyEntities = new List<string>();
            UpdateManyToManyEntities = new List<string>();
        }

        [Key]
        public int Id { get; set; }

        [NotMapped]
        public List<string> UpdateEntities { get; set; }

        [NotMapped]
        public List<string> UpdateOneToManyEntities { get; set; }

        [NotMapped]
        public List<string> UpdateManyToManyEntities { get; set; }
    }
}
