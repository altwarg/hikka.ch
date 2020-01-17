// Connecting to 'Imageboard' database. If it doesn't exists, MongoDB will eventually create it
let db = connect('127.0.0.1:27017/Imageboard');

// Inserting initial information about boards to 'Boards' collection. If it doesn't exists, MongoDB will eventually create it
db.Boards.insertMany([
    { Abbr: 'a', Name: 'Anime' },
    { Abbr: 'b', Name: 'Random' },
    { Abbr: 'd', Name: 'Discussions' },
    { Abbr: 'int', Name: 'International' },
    { Abbr: 'fl', Name: 'Foreign languages' },
    { Abbr: 'pr', Name: 'Programming' },
    { Abbr: 's', Name: 'Software' },
    { Abbr: 'po', Name: 'Politics' },
    { Abbr: 'vg', Name: 'Video games' },
    { Abbr: 'zog', Name: 'Conspiration theories' },
]);

// Set a reference to all documents in the 'Boards' collection of 'Imageboard' database
let boards = db.Boards.find();

// Iterating over the collection and printing the content
while (boards.hasNext()) {
    printjson(boards.next());
}
