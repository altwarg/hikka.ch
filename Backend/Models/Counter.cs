using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Imageboard.Backend.Models {
    public class Counter {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public long Value { get; set; }
    }
}
