describe("Movies", function() {
  var movies, movie;

  beforeEach(function() {
    movies = new Movies
    movie = new Movie
  });

  it("should sort by title", function() {
    var otherMovie = new Movie({title: 'A good movie'})
    movie.set({title: 'This should be last'})

    movies.add(movie)
    movies.add(otherMovie)

    expect(movies.pluck('title')).toEqual([otherMovie.get('title'), movie.get('title')])
  });
});