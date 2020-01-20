using Microsoft.AspNetCore.Mvc;

using Imageboard.Backend.DTO;
using Imageboard.Backend.Services;

namespace Imageboard.Backend.Controllers {
    [Route("api/threads")]
    [ApiController]
    public class ThreadsController : ControllerBase {
        private readonly ThreadsService threadsService;
        private readonly BoardsService boardsService;

        public ThreadsController(ThreadsService threadsService, BoardsService boardsService) {
            this.threadsService = threadsService;
            this.boardsService = boardsService;
        }

        [HttpPost("new")]
        [ProducesResponseType(201)]
        public IActionResult CreateThread([FromBody] NewThreadDTO data) {
            return Created("", this.threadsService.CreateThread(data));
        }

        [HttpGet("all/{abbr}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetThreads([FromRoute] string abbr) {
            if (this.boardsService.BoardExists(abbr)) {
                return Ok(this.threadsService.GetThreads(abbr));
            } else {
                return NotFound();
            }
        }

        [HttpGet("all")]
        [ProducesResponseType(200)]
        public IActionResult GetAllThreads() {
            return Ok(this.threadsService.GetAllThreads());
        }

        [HttpPost("new/post/{threadId}")]
        [ProducesResponseType(201)]
        [ProducesResponseType(404)]
        public IActionResult CreatePost([FromRoute] string threadId, [FromBody] NewPostDTO data) {
            if (this.threadsService.ThreadExists(threadId)) {
                return Created("", this.threadsService.CreatePost(data));
            } else {
                return NotFound();
            }
        }
    }
}
