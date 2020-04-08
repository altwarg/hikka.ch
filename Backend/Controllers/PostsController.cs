using System.Threading.Tasks;

using Imageboard.Backend.Data.DTO;
using Imageboard.Backend.Services;

using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Backend.Controllers {
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase {
        private readonly ThreadsService threadsService;

        public PostsController(ThreadsService threadsService) {
            this.threadsService = threadsService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> CreatePost([FromBody] NewPostDTO data) {
            var updatedThread = await this.threadsService.CreatePost(data);
            if (updatedThread == null) {
                return NotFound();
            }

            return Created(nameof(CreatePost), updatedThread);
        }
    }
}
