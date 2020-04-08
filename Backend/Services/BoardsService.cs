using System.Collections.Generic;
using System.Threading.Tasks;

using Imageboard.Backend.Data.Repository;
using Imageboard.Backend.Models;

using Microsoft.Extensions.Options;

namespace Imageboard.Backend.Services {
    public class BoardsService {
        private readonly BoardsRepository repository = null;

        public BoardsService(IOptions<Settings> settings) {
            this.repository = new BoardsRepository(settings);
        }

        public async Task<List<Board>> GetBoardsAsync() {
            return await this.repository.GetBoardsAsync();
        }
    }
}
