using Microsoft.AspNetCore.Http;

namespace Imageboard.Data.DTO {
    public class NewPostDTO {
        public string Name { get; set; }
        public string Message { get; set; }
        public string Thread { get; set; }
        public IFormFile Attachment { get; set; }
        public string Sage { get; set; }
    }
}
