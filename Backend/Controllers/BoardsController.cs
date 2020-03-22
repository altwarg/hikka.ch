using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using Imageboard.Backend.Services;

namespace Imageboard.Backend.Controllers {
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase {
        private readonly BoardsService boardsService;

        public BoardsController(BoardsService boardsService) {
            this.boardsService = boardsService;
        }

        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAllBoards() {
            return Ok(this.boardsService.GetBoards());
        }
    }
}
