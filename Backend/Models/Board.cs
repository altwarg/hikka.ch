using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Imageboard.Models {
    public class Board {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Abbr { get; set; }
        public string Name { get; set; }
    }
}
