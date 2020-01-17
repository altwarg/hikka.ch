using System;
using System.Collections.Generic;

using MongoDB.Driver;

using Imageboard.Backend.DTO;
using Imageboard.Backend.Models;
using MongoDB.Bson;

namespace Imageboard.Backend.Services {
    public class ThreadsService {
        private readonly MongoClient client;
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<Thread> threads;
        private long count;

        public ThreadsService(IImageboardDBSettings settings) {
            this.client = new MongoClient(settings.ConnectionString);
            this.database = this.client.GetDatabase(settings.DatabaseName);
            this.threads = this.database.GetCollection<Thread>(settings.ThreadsCollectionName);
            this.count = 0;
        }

        public List<Thread> GetThreads(string abbr) {
            return this.threads.Find(x => x.Board == abbr).ToList();
        }

        public Thread CreateThread(NewThreadDTO data) {
            this.count += 1;

            var post = new Post() {
                Id = this.count.ToString(),
                No = 1,
                Name = !string.IsNullOrEmpty(data.Name) ? data.Name : null,
                DateTime = DateTime.Now.ToLongDateString(),
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
    }
}
