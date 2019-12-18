using System;
using System.Collections.Generic;

namespace Imageboard.Backend.Models {
    public partial class Boards {
        public Boards() {
            Threads = new HashSet<Threads>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Abbr { get; set; }

        public virtual ICollection<Threads> Threads { get; set; }
    }
}
