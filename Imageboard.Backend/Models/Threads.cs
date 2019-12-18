using System;
using System.Collections.Generic;

namespace Imageboard.Backend.Models {
    public partial class Threads {
        public Threads() {
            PostsNavigation = new HashSet<Posts>();
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid Board { get; set; }
        public int Posts { get; set; }

        public virtual Boards BoardNavigation { get; set; }
        public virtual ICollection<Posts> PostsNavigation { get; set; }
    }
}
