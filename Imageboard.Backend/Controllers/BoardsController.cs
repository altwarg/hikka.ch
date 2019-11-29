using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Backend.Controllers {
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase {

        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetAllBoards() {
            return this.Ok(new object[] {
                new { abbr = "a", name = "Anime" },
                new { abbr = "b", name = "Random" },
                new { abbr = "d", name = "Discussions" },
                new { abbr = "int", name = "International" },
                new { abbr = "pr", name = "Programming" },
                new { abbr = "s", name = "Software" },
                new { abbr = "po", name = "Politics" },
                new { abbr = "vg", name = "Video games" },
                new { abbr = "zog", name = "Conspiration theories" },
            });
        }
    }
}