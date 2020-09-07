using System.Collections.Generic;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Imageboard.Models {
    public class Thread {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Board { get; set; }
        public int PostsCount { get; set; }
        public List<Post> Posts { get; set; }
    }
}
