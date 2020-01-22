using System;
using System.Collections.Generic;
using System.Linq;

using MongoDB.Driver;

using Imageboard.Backend.DTO;
using Imageboard.Backend.Models;
using MongoDB.Bson;

namespace Imageboard.Backend.Services {
    public class ThreadsService {
        private readonly MongoClient client;
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<Thread> threads;

        public ThreadsService(IImageboardDBSettings settings) {
            this.client = new MongoClient(settings.ConnectionString);
            this.database = this.client.GetDatabase(settings.DatabaseName);
            this.threads = this.database.GetCollection<Thread>(settings.ThreadsCollectionName);
        }

        public List<Thread> GetThreads(string abbr) {
            return this.threads.Find(x => x.Board == abbr).ToList();
        }

        public Thread GetThread(string id) {
            return this.threads.Find(x => x.Id == id).FirstOrDefault();
        }

        public List<Thread> GetAllThreads() {
            return this.threads.Find(x => true).ToList();
        }

        public bool ThreadExists(string id) {
            if (this.threads.Find(x => x.Id == id).FirstOrDefault() == null) {
                return false;
            }

            return true;
        }

        public Thread CreateThread(NewThreadDTO data) {
            var post = new Post() {
                Id = Counter.GetNextSequenceValue("postId", this.database).ToString(),
                No = 1,
                Name = !string.IsNullOrEmpty(data.Name) ? data.Name : null,
                DateTime = DateTime.Now.ToString("dd/MM/yyyy ddd HH:mm:ss"),
                Message = data.Message
            };

            var thread = new Thread() {
                Id = ObjectId.GenerateNewId().ToString(),
                Board = data.Board,
                Title = data.Title,
                PostsCount = 1,
                Posts = new List<Post>() { post }
            };

            this.threads.InsertOne(thread);
            return thread;
        }

        public Thread CreatePost(NewPostDTO data) {
            var thread = this.GetThread(data.Thread);
            var no = thread.Posts.Last().No + 1;

            var post = new Post() {
                Id = Counter.GetNextSequenceValue("postId", this.database).ToString(),
                No = no,
                Name = null,
                DateTime = DateTime.Now.ToString("dd/MM/yyyy ddd HH:mm:ss"),
                Message = data.Message
            };

            thread.Posts.Add(post);

            this.threads.ReplaceOne(x => x.Id == data.Thread, thread);
            return thread;
        }
    }
}
