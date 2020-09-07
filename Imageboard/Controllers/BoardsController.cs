using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Imageboard.Services;

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
