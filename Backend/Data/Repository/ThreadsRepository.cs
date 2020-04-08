using System.Collections.Generic;
using System.Threading.Tasks;

using Imageboard.Backend.Models;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace Imageboard.Backend.Data.Repository {
    /// <summary>
    /// Threads collection repository. Encapsulates collection interaction logic
    /// </summary>
    public class ThreadsRepository {
        private readonly DbContext context = null;

        public ThreadsRepository(IOptions<Settings> settings) {
            this.context = new DbContext(settings);
        }

        #region Sync methods
        /// <summary>
        /// Get all threads
        /// </summary>
        /// <returns>List of threads in Threads-collection</returns>
        public List<Thread> GetThreads() {
            return this.context.Threads.Find(_ => true).ToList();
        }

        /// <summary>
        /// Get all threads of board
        /// </summary>
        /// <param name="board">Boards abbreviation (e.g. 'b')</param>
        /// <returns>List of threads of certain in Threads collection</returns>
        public List<Thread> GetThreads(string board) {
            return this.context.Threads.Find(x => x.Board == board).ToList();
        }

        /// <summary>
        /// Clear repository
        /// </summary>
        public void Clear() {
            this.context.Threads.DeleteMany(_ => true);
        }

        /// <summary>
        /// Check if thread with id exists
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>True if thread exists; otherwise, false</returns>
        public bool ThreadExists(string id) {
            return this.GetThread(id) != null;
        }

        /// <summary>
        /// Add new thread to collection
        /// </summary>
        /// <param name="newThread">Thread object</param>
        /// <returns>True if thread added; false if thread already exists</returns>
        public bool AddThread(Thread newThread) {
            if (this.ThreadExists(newThread.Id)) {
                return false;
            }

            this.context.Threads.InsertOne(newThread);
            return true;
        }

        /// <summary>
        /// Get thread by id
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>Thread object if thread is found; otherwise, null</returns>
        public Thread GetThread(string id) {
            return this.context.Threads.Find(x => x.Id == id).FirstOrDefault();
        }

        /// <summary>
        /// Update existing thread
        /// </summary>
        /// <param name="updatedThread">Thread object</param>
        /// <returns>True if thread is updated; false if thread not found</returns>
        public bool UpdateThread(Thread updatedThread) {
            var result = this.context.Threads.ReplaceOne(x => x.Id == updatedThread.Id, updatedThread);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        /// <summary>
        /// Remove thread by id
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>True if thread is removed; false if thread not found</returns>
        public bool RemoveThread(string id) {
            var result = this.context.Threads.DeleteOne(x => x.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        /// <summary>
        /// Add new post to thread
        /// </summary>
        /// <param name="threadId">Thread id</param>
        /// <param name="post">Post object</param>
        /// <returns>True if post is added; false if thread not found</returns>
        public bool AddPost(string threadId, Post post) {
            if (this.ThreadExists(threadId)) {
                var thread = this.GetThread(threadId);
                thread.Posts.Add(post);
                thread.PostsCount = thread.Posts.Count;
                return this.UpdateThread(thread);
            }

            return false;
        }

        /// <summary>
        /// Get next sequence value for ids
        /// </summary>
        /// <param name="name">Sequence name</param>
        /// <returns>Next sequence value</returns>
        public long GetNextSequenceValue(string name) {
            var filter = Builders<Counter>.Filter.Eq(x => x.Name, name);
            var update = Builders<Counter>.Update.Inc(x => x.Value, 1);
            var counter = this.context.Counters.FindOneAndUpdate(filter, update);

            return counter.Value;
        }
        #endregion

        #region Async methods
        /// <summary>
        /// Get all threads
        /// </summary>
        /// <returns>List of threads in Threads-collection</returns>
        public async Task<List<Thread>> GetThreadsAsync() {
            return await this.context.Threads.Find(_ => true).ToListAsync();
        }

        /// <summary>
        /// Get all threads of board
        /// </summary>
        /// <param name="board">Boards abbreviation (e.g. 'b')</param>
        /// <returns>List of threads of certain in Threads collection</returns>
        public async Task<List<Thread>> GetThreadsAsync(string board) {
            return await this.context.Threads.Find(x => x.Board == board).ToListAsync();
        }

        /// <summary>
        /// Clear repository
        /// </summary>
        public async void ClearAsync() {
            await this.context.Threads.DeleteManyAsync(_ => true);
        }

        /// <summary>
        /// Check if thread with id exists
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>True if thread exists; otherwise, false</returns>
        public async Task<bool> ThreadExistsAsync(string id) {
            return await this.GetThreadAsync(id) != null;
        }

        /// <summary>
        /// Add new thread to collection
        /// </summary>
        /// <param name="newThread">Thread object</param>
        /// <returns>True if thread added; false if thread already exists</returns>
        public async Task<bool> AddThreadAsync(Thread newThread) {
            if (await this.ThreadExistsAsync(newThread.Id)) {
                return false;
            }

            await this.context.Threads.InsertOneAsync(newThread);
            return true;
        }

        /// <summary>
        /// Get thread by id
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>Thread object if thread is found; otherwise, null</returns>
        public async Task<Thread> GetThreadAsync(string id) {
            return await this.context.Threads.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Update existing thread
        /// </summary>
        /// <param name="updatedThread">Thread object</param>
        /// <returns>True if thread is updated; false if thread not found</returns>
        public async Task<bool> UpdateThreadAsync(Thread updatedThread) {
            var result = await this.context.Threads.ReplaceOneAsync(x => x.Id == updatedThread.Id, updatedThread);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        /// <summary>
        /// Remove thread by id
        /// </summary>
        /// <param name="id">Thread id</param>
        /// <returns>True if thread is removed; false if thread not found</returns>
        public async Task<bool> RemoveThreadAsync(string id) {
            var result = await this.context.Threads.DeleteOneAsync(x => x.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        /// <summary>
        /// Add new post to thread
        /// </summary>
        /// <param name="threadId">Thread id</param>
        /// <param name="post">Post object</param>
        /// <returns>True if post is added; false if thread not found</returns>
        public async Task<bool> AddPostAsync(string threadId, Post post) {
            if (await this.ThreadExistsAsync(threadId)) {
                var thread = await this.GetThreadAsync(threadId);
                thread.Posts.Add(post);
                thread.PostsCount = thread.Posts.Count;
                return await this.UpdateThreadAsync(thread);
            }

            return false;
        }

        /// <summary>
        /// Get next sequence value for ids
        /// </summary>
        /// <param name="name">Sequence name</param>
        /// <returns>Next sequence value</returns>
        public async Task<long> GetNextSequenceValueAsync(string name) {
            var filter = Builders<Counter>.Filter.Eq(x => x.Name, name);
            var update = Builders<Counter>.Update.Inc(x => x.Value, 1);
            var counter = await this.context.Counters.FindOneAndUpdateAsync(filter, update);

            return counter.Value;
        }
        #endregion
    }
}
