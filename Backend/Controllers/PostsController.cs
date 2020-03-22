using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using Imageboard.Backend.DTO;
using Imageboard.Backend.Services;

namespace Imageboard.Backend.Controllers {
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase {
        private readonly ThreadsService threadsService;

        public PostsController(ThreadsService threadsService) {
            this.threadsService = threadsService;
        }

        [HttpPost("new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CreatePost([FromBody] NewPostDTO data) {
            if (this.threadsService.ThreadExists(data.Thread)) {
                return Created(nameof(CreatePost), this.threadsService.CreatePost(data));
            } else {
                return NotFound();
            }
        }
    }
}
