using System.Collections.Generic;

using MongoDB.Driver;

using Imageboard.Backend.Models;

namespace Imageboard.Backend.Services {
    public class BoardsService {
        #region Fields
        private readonly MongoClient client;
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<Board> boards;
        #endregion

        #region Constructor
        public BoardsService(IImageboardDBSettings settings) {
            this.client = new MongoClient(settings.ConnectionString);
            this.database = this.client.GetDatabase(settings.DatabaseName);
            this.boards = this.database.GetCollection<Board>(settings.BoardsCollectionName);
        }
        #endregion

        #region Methods
        public List<Board> GetBoards() {
            return this.boards.Find(x => true).ToList();
        }

        public bool BoardExists(string abbr) {
            if (this.boards.Find(x => x.Abbr == abbr).FirstOrDefault() == null) {
                return false;
            }

            return true;
        }

        public Board CreateBoard(Board board) {
            this.boards.InsertOne(board);
            return board;
        }

        public void UpdateBoard(string abbr, Board board) {
            this.boards.ReplaceOne(x => x.Abbr == abbr, board);
        }

        public void RemoveBoard(string abbr) {
            this.boards.DeleteOne(x => x.Abbr == abbr);
        }
        #endregion
    }
}
