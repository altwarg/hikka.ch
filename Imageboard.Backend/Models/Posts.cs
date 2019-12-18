using System;
using System.Collections.Generic;

namespace Imageboard.Backend.Models {
    public partial class Posts {
        public int Id { get; set; }
        public Guid Thread { get; set; }
        public int No { get; set; }
        public DateTime DateTime { get; set; }
        public string Message { get; set; }

        public virtual Threads ThreadNavigation { get; set; }
    }
}
