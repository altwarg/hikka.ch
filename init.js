let db = connect('127.0.0.1:27017/Imageboard');

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

let boards = db.Boards.find();

print('Inserted values to "Boards" collection:\n');

while (boards.hasNext()) {
    printjson(boards.next());
}

print('\n\nInserted values to "Counters" collection:\n')

db.Counters.insert({
    Name: 'postId',
    Value: 0
});

let counters = db.Counters.find();

while (counters.hasNext()) {
    printjson(counters.next());
}
