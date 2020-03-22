using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Imageboard.Backend.Models {
    public class Counter {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public long Value { get; set; }

        internal static long GetNextSequenceValue(string name, IMongoDatabase database) {
            var collection = database.GetCollection<Counter>("Counters");
            var filter = Builders<Counter>.Filter.Eq(x => x.Name, name);
            var update = Builders<Counter>.Update.Inc(x => x.Value, 1);
            var counter = collection.FindOneAndUpdate(filter, update);

            return counter.Value;
        }
    }
}
