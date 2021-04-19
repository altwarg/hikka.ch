using System.Threading.Tasks;

using Imageboard.Services;

using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Controllers {
    [Route("[controller]")]
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
