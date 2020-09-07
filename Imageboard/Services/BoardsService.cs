using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;

using Imageboard.Data.Repository;
using Imageboard.Models;

namespace Imageboard.Services {
    public class BoardsService {
        private readonly BoardsRepository repository = null;

        public BoardsService(IConfiguration configuration) {
            this.repository = new BoardsRepository(configuration);
        }

        public async Task<List<Board>> GetBoardsAsync() {
            return await this.repository.GetBoardsAsync();
        }
    }
}
