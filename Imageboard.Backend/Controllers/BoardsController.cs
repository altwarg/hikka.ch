﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Imageboard.Backend.Controllers {
    [Route("api/boards")]
    [ApiController]
    public class BoardsController : ControllerBase {
        [HttpGet("getBoards")]
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

        [HttpGet("threadInfo")]
        [ProducesResponseType(200)]
        public IActionResult GetThreadInfo() {
            return this.Ok(new object[] {
                new {
                    id = "208372400",
                    datetime = "25/11/19 (Mon) 22:13:07",
                    isOP = true,
                    message = "Tpaдициoнных гoлoвных yбopoв тpeд.",
                    no = 1
                },
                new {
                    id = "208379002",
                    datetime = "25/11/19 (Mon) 22:18:29",
                    isOP = false,
                    message = "Сажа, скрыл",
                    no = 2
                },
                new {
                    id = "208380297",
                    datetime = "25/11/19 (Mon) 22:18:31",
                    isOP = false,
                    message = "bump",
                    no = 3
                },
                new {
                    id = "208380355",
                    datetime = "25/11/19 (Mon) 22:19:07",
                    isOP = true,
                    message = "Чего скрыл-то?",
                    no = 4
                },
                new {
                    id = "208380360",
                    datetime = "25/11/19 (Mon) 22:19:57",
                    isOP = false,
                    message = "оп, где суп?",
                    no = 5
                },
                new {
                    id = "208380297",
                    datetime = "25/11/19 (Mon) 22:41:07",
                    isOP = false,
                    message = "ГОЛОВА, ДАЙ ДЕНЕГ!",
                    no = 6
                },
                new {
                    id = "208380642",
                    datetime = "25/11/19 (Mon) 23:01:01",
                    isOP = false,
                    message = "wow, these russians are very aggressive... (¬_¬ )",
                    no = 7
                },
            });
        }
    }
}
