using System.IO;

namespace Imageboard.Models {
    public class Attachment {
        public MemoryStream Stream { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long Size { get; set; }
    }
}
