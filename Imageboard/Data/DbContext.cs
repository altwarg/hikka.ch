using Microsoft.Extensions.Configuration;

using MongoDB.Driver;
using MongoDB.Driver.GridFS;

using Imageboard.Models;

namespace Imageboard.Data {
    /// <summary>
    /// MongoDB context. Encapsulates database connection logic
    /// </summary>
    public class DbContext {
        private readonly IMongoDatabase database = null;
        private readonly GridFSBucket bucket = null;
        private readonly string boards;
        private readonly string threads;
        private readonly string counters;

        public DbContext(IConfiguration configuration) {
            var client = new MongoClient(configuration.GetValue<string>("MongoConnection:ConnectionString"));
            this.database = client.GetDatabase(configuration.GetValue<string>("MongoConnection:Database"));
            this.bucket = new GridFSBucket(this.database, new GridFSBucketOptions() { BucketName = "Attachments" });
            this.boards = configuration.GetValue<string>("MongoConnection:Boards");
            this.threads = configuration.GetValue<string>("MongoConnection:Threads");
            this.counters = configuration.GetValue<string>("MongoConnection:Counters");
        }

        public IMongoCollection<Board> Boards {
            get { return this.database.GetCollection<Board>(this.boards); }
        }

        public IMongoCollection<Thread> Threads {
            get { return this.database.GetCollection<Thread>(this.threads); }
        }

        public IMongoCollection<Counter> Counters {
            get { return this.database.GetCollection<Counter>(this.counters); }
        }

        public GridFSBucket FileStorage {
            get { return this.bucket; }
        }
    }
}
