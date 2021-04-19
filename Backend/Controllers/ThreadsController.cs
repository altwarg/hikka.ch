using System.Threading.Tasks;

using Imageboard.Data.DTO;
using Imageboard.Services;

using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Controllers {
    [Route("[controller]")]
    [ApiController]
    public class ThreadsController : ControllerBase {
        private readonly ThreadsService threadsService;
        private readonly BoardsService boardsService;

        public ThreadsController(ThreadsService threadsService, BoardsService boardsService) {
            this.threadsService = threadsService;
            this.boardsService = boardsService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> CreateThread([FromForm] NewThreadDTO data) {
            return Created(nameof(CreateThread), await this.threadsService.CreateThread(data));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetThreads(string board, int? limit) {
            if (board == null && limit == null) {
                return Ok(await this.threadsService.GetAllThreads());
            }

            var threads = await this.threadsService.GetThreads(board, limit.Value);

            if (threads == null) {
                return NotFound();
            }

            return Ok(threads);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetThreadById([FromRoute] string id) {
            var thread = await this.threadsService.GetThread(id);

            if (thread != null) {
                return Ok(thread);
            } else {
                return NotFound();
            }
        }
    }
}
