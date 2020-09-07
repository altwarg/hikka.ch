using System;

using Microsoft.AspNetCore.Http;

namespace Imageboard.Models {
    public class Post {
        public string Id { get; set; }
        public int No { get; set; }
        public DateTime DateTime { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public string Attachment { get; set; }
        public bool Sage { get; set; }
    }
}
