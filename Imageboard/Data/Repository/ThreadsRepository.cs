using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

using Imageboard.Models;

namespace Imageboard.Data.Repository {
    /// <summary>
    /// Threads collection repository. Encapsulates collection interaction logic
    /// </summary>
    public class ThreadsRepository {
        private readonly DbContext context = null;

        public ThreadsRepository(IConfiguration configuration) {
            this.context = new DbContext(configuration);
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

        /// <summary>
        /// Add new attachment to GridFS
        /// </summary>
        /// <param name="attachment">Attachment</param>
        /// <returns>Uploaded attachment id</returns>
        public string AddAttachment(IFormFile attachment) {
             using (var stream = attachment.OpenReadStream()) {
                var options = new GridFSUploadOptions() {
                    Metadata = new BsonDocument() {
                        { "FileName", attachment.FileName },
                        { "ContentType", attachment.ContentType },
                        { "Size", attachment.Length }
                    }
                };

                var objectId = this.context.FileStorage.UploadFromStream(attachment.FileName, stream, options);
                return objectId.ToString();
            }
        }

        /// <summary>
        /// Get an attachment by object id
        /// </summary>
        /// <param name="id">Object id</param>
        /// <returns>File if it does exists; otherwise, null</returns>
        public Attachment GetAttachment(string id) {
            using (var databaseStream = this.context.FileStorage.OpenDownloadStream(new ObjectId(id))) {
                var memoryStream = new MemoryStream();
                databaseStream.CopyTo(memoryStream);

                return new Attachment() {
                    Stream = memoryStream,
                    FileName = databaseStream.FileInfo.Metadata.GetValue("FileName").ToString(),
                    ContentType = databaseStream.FileInfo.Metadata.GetValue("ContentType").ToString(),
                    Size = databaseStream.FileInfo.Metadata.GetValue("Size").ToInt64()
                };
            }
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

        /// <summary>
        /// Add new attachment to GridFS
        /// </summary>
        /// <param name="attachment">Attachment</param>
        /// <returns>Uploaded attachment id</returns>
        public async Task<string> AddAttachmentAsync(IFormFile attachment) {
            using (var stream = attachment.OpenReadStream()) {
                var options = new GridFSUploadOptions() {
                    Metadata = new BsonDocument() {
                        { "FileName", attachment.FileName },
                        { "ContentType", attachment.ContentType },
                        { "Size", attachment.Length }
                    }
                };

                var objectId = await this.context.FileStorage.UploadFromStreamAsync(attachment.FileName, stream, options);
                return objectId.ToString();
            }
        }

        /// <summary>
        /// Get an attachment by object id
        /// </summary>
        /// <param name="id">Object id</param>
        /// <returns>File if it does exists; otherwise, null</returns>
        public async Task<Attachment> GetAttachmentAsync(string id) {
            using (var databaseStream = await this.context.FileStorage.OpenDownloadStreamAsync(new ObjectId(id))) {
                var memoryStream = new MemoryStream();
                await databaseStream.CopyToAsync(memoryStream);

                return new Attachment() {
                    Stream = memoryStream,
                    FileName = databaseStream.FileInfo.Metadata.GetValue("FileName").ToString(),
                    ContentType = databaseStream.FileInfo.Metadata.GetValue("ContentType").ToString(),
                    Size = databaseStream.FileInfo.Metadata.GetValue("Size").ToInt64()
                };
            }
        }
        #endregion
    }
}
