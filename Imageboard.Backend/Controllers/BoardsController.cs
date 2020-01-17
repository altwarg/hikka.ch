using Microsoft.AspNetCore.Mvc;

using Imageboard.Backend.Services;

namespace Imageboard.Backend.Controllers {
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase {
        private readonly BoardsService boardsService;

        public BoardsController(BoardsService boardsService) {
            this.boardsService = boardsService;
        }

        [HttpGet("getBoards")]
        [ProducesResponseType(200)]
        public IActionResult GetAllBoards() {
            return Ok(this.boardsService.GetBoards());
        }
    }
}
