using Imageboard.Backend.Models;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace Imageboard.Backend.Data {
    /// <summary>
    /// MongoDB context. Encapsulates database connection logic
    /// </summary>
    public class DbContext {
        private readonly IMongoDatabase database = null;
        private readonly string boards;
        private readonly string threads;
        private readonly string counters;

        public DbContext(IOptions<Settings> settings) {
            var client = new MongoClient(settings.Value.ConnectionString);
            this.database = client.GetDatabase(settings.Value.Database);
            this.boards = settings.Value.Boards;
            this.threads = settings.Value.Threads;
            this.counters = settings.Value.Counters;
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
    }
}
