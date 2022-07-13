using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Altr.Backend.Models.Foundation
{
    public class DocumentEntity
    {
        public string DocumentId { get; set; }
        public int RunningNumber { get; set; }
        public DateTime Date { get; set; }
        public string Remark { get; set; }
    }
}
