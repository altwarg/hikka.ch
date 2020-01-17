using System;

namespace Imageboard.Backend.Models {
    public class Post {
        public string Id { get; set; }
        public int No { get; set; }
        public string DateTime { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}
