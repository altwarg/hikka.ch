using System.Threading.Tasks;

using Imageboard.Backend.Services;

using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Backend.Controllers {
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase {
        private readonly BoardsService boardsService;

        public BoardsController(BoardsService boardsService) {
            this.boardsService = boardsService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllBoards() {
            return Ok(await this.boardsService.GetBoardsAsync());
        }
    }
}
