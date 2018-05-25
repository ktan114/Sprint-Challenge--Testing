const mongoose = require('mongoose');
const request = require('supertest');

const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = { title: "Sonic", genre: "actions", releaseDate: "A long time ago" }

    const game = await Game.create(newGame);
    
  })

  afterEach(() => {
    //   // clear collection.
    Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST /games', () => {
    it('should check if games are being properly posted',  () => {
      
      // arrange

      const newGame = { title: "Sonic", genre: "actions", releaseDate: "A long time ago" }

      // assert

      expect(newGame.title).toBe("Sonic");
    })

    it('should return an error if title or genre is missing' , async () => { 
      // arrange
      const noGenreGame = { title: "Sonic", releaseDate: "A long time ago" }
      const noTitleGame = { genre: "action", releaseDate: "A long time ago" }

      // act
      const ggame = request(server).post('/api/games').send(noGenreGame);
      const tgame = request(server).post('/api/games').send(noTitleGame);

      // assert
      expect(500);
      expect(500);

    })
  })

  // test the GET here
  describe('GET /games' , () => {
    it('should return games from the database', () => {

      request(server).get('/api/games').expect(res => res.length > 0);
    })
  })

  // Test the DELETE here
});
