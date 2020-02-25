namespace Imageboard.Backend.Models {
    public interface IImageboardDBSettings {
        string BoardsCollectionName { get; set; }
        string ThreadsCollectionName { get; set; }
        string CountersCollectionName { get; set; }
        string DatabaseName { get; set; }
        string ConnectionString { get; set; }
    }

    public class ImageboardDBSettings : IImageboardDBSettings {
        public string BoardsCollectionName { get; set; }
        public string ThreadsCollectionName { get; set; }
        public string CountersCollectionName { get; set; }
        public string DatabaseName { get; set; }
        public string ConnectionString { get; set; }
    }
}
