using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;

using MongoDB.Driver;

using Imageboard.Models;

namespace Imageboard.Data.Repository {
    /// <summary>
    /// Boards collection repository. Encapsulates collection interaction logic
    /// </summary>
    public class BoardsRepository {
        private readonly DbContext context = null;

        public BoardsRepository(IConfiguration configuration) {
            this.context = new DbContext(configuration);
        }

        #region Sync methods
        /// <summary>
        /// Get all boards
        /// </summary>
        /// <returns>List of boards in Board collection</returns>
        public List<Board> GetBoards() {
            return this.context.Boards.Find(_ => true).ToList();
        }

        /// <summary>
        /// Clear repository
        /// </summary>
        public void Clear() {
            this.context.Boards.DeleteMany(_ => true);
        }

        /// <summary>
        /// Check if board with abbreviation exists
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>True if board exists; otherwise, false</returns>
        public bool BoardExists(string abbr) {
            return this.GetBoard(abbr) != null;
        }

        /// <summary>
        /// Add new board to collection
        /// </summary>
        /// <param name="newBoard">Board object</param>
        /// <returns>True if board added; false if board already exists</returns>
        public bool AddBoard(Board newBoard) {
            if (this.BoardExists(newBoard.Abbr)) {
                return false;
            }

            this.context.Boards.InsertOne(newBoard);
            return true;
        }

        /// <summary>
        /// Get board by abbreviation
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>Board object if board is found; otherwise, null</returns>
        public Board GetBoard(string abbr) {
            return this.context.Boards.Find(x => x.Abbr == abbr).FirstOrDefault();
        }

        /// <summary>
        /// Update existing board
        /// </summary>
        /// <param name="updatedBoard">Board object</param>
        /// <returns>True if board is updated; false if board not found</returns>
        public bool UpdateBoard(Board updatedBoard) {
            var result = this.context.Boards.ReplaceOne(x => x.Abbr == updatedBoard.Abbr, updatedBoard);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        /// <summary>
        /// Remove board by abbreviation
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>True if board is removed; false if board not found</returns>
        public bool RemoveBoard(string abbr) {
            var result = this.context.Boards.DeleteOne(x => x.Abbr == abbr);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
        #endregion

        #region Async methods
        /// <summary>
        /// Get all boards
        /// </summary>
        /// <returns>List of boards in Board collection</returns>
        public async Task<List<Board>> GetBoardsAsync() {
            return await this.context.Boards.Find(_ => true).ToListAsync();
        }

        /// <summary>
        /// Clear repository
        /// </summary>
        public async void ClearAsync() {
            await this.context.Boards.DeleteManyAsync(_ => true);
        }

        /// <summary>
        /// Check if board with abbreviation exists
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>True if board exists; otherwise, false</returns>
        public async Task<bool> BoardExistsAsync(string abbr) {
            return await this.GetBoardAsync(abbr) != null;
        }

        /// <summary>
        /// Add new board to collection
        /// </summary>
        /// <param name="newBoard">Board object</param>
        /// <returns>True if board added; false if board already exists</returns>
        public async Task<bool> AddBoardAsync(Board newBoard) {
            if (await this.BoardExistsAsync(newBoard.Abbr)) {
                return false;
            }

            await this.context.Boards.InsertOneAsync(newBoard);
            return true;
        }

        /// <summary>
        /// Get board by abbreviation
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>Board object if board is found; otherwise, null</returns>
        public async Task<Board> GetBoardAsync(string abbr) {
            return await this.context.Boards.Find(x => x.Abbr == abbr).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Update existing board
        /// </summary>
        /// <param name="updatedBoard">Board object</param>
        /// <returns>True if board is updated; false if board not found</returns>
        public async Task<bool> UpdateBoardAsync(Board updatedBoard) {
            var result = await this.context.Boards.ReplaceOneAsync(x => x.Abbr == updatedBoard.Abbr, updatedBoard);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        /// <summary>
        /// Remove board by abbreviation
        /// </summary>
        /// <param name="abbr">Abbreviation (e.g. 'b')</param>
        /// <returns>True if board is removed; false if board not found</returns>
        public async Task<bool> RemoveBoardAsync(string abbr) {
            var result = await this.context.Boards.DeleteOneAsync(x => x.Abbr == abbr);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
        #endregion
    }
}
