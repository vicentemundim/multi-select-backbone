describe("FavoriteMovies", function() {
  var favoriteMovies, movie;

  beforeEach(function() {
    favoriteMovies = new FavoriteMovies
    movie = new Movie
  });

  it("should use localStorage", function() {
    expect(favoriteMovies.localStorage).not.toBeUndefined()
  });

  it("should sort by title", function() {
    var otherMovie = new Movie({title: 'A good movie'})
    movie.set({title: 'This should be last'})

    favoriteMovies.add(movie)
    favoriteMovies.add(otherMovie)

    expect(favoriteMovies.pluck('title')).toEqual([otherMovie.get('title'), movie.get('title')])
  });

  describe("when a movie is added", function() {
    it("should save the movie", function() {
      favoriteMovies.add(movie)
      expect(movie.isNew()).toBeFalsy()
    });
  });

  describe("when a movie is removed", function() {
    beforeEach(function() {
      favoriteMovies.add(movie)
    });

    it("should destroy the movie", function() {
      spyOn(movie, 'destroy')
      favoriteMovies.remove(movie)
      expect(movie.destroy).toHaveBeenCalled()
    });
  });
});