using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Imageboard.Data.DTO;
using Imageboard.Services;

namespace Imageboard.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class PostsController : ControllerBase {
        private readonly ThreadsService threadsService;

        public PostsController(ThreadsService threadsService) {
            this.threadsService = threadsService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> CreatePost([FromForm] NewPostDTO data) {
            var updatedThread = await this.threadsService.CreatePost(data);
            if (updatedThread == null) {
                return NotFound();
            }

            return Created(nameof(CreatePost), updatedThread);
        }

        [HttpGet("attachment/{id}")]
        public async Task<IActionResult> GetAttachment([FromRoute] string id) {
            var attachment = await this.threadsService.GetAttachment(id);
            return File(attachment.Stream, attachment.ContentType, attachment.FileName);
        }
    }
}
