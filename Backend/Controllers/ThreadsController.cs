using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateThread([FromBody] NewThreadDTO data) {
            return Created(nameof(CreateThread), this.threadsService.CreateThread(data));
        }

        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetThreads(string board, int? limit) {
            if (board == null && limit == null) {
                return Ok(this.threadsService.GetAllThreads());
            }

            if (this.boardsService.BoardExists(board)) {
                return Ok(this.threadsService.GetThreads(board, limit.Value));
            } else {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetThreadById([FromRoute] string id) {
            var thread = this.threadsService.GetThread(id);

            if (thread != null) {
                return Ok(thread);
            } else {
                return NotFound();
            }
        }
    }
}
