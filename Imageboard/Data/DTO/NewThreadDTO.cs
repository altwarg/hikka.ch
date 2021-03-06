using Microsoft.AspNetCore.Http;

namespace Imageboard.Data.DTO {
    public class NewThreadDTO {
        public string Title { get; set; }
        public string Board { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public IFormFile Attachment { get; set; }
    }
}
