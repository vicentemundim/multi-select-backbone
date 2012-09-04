class HomeController < ApplicationController
  def index
    @available_movies = [
      {title: "The Shawshank Redemption", year: 1994 },
      {title: "The Godfather", year: 1972},
      {title: "Pulp fiction", year: 1994},
      {title: "Schindler's List", year: 1993},
      {title: "The Dark Knight", year: 2008},
      {title: "The Lord of the Rings: The Return of the King", year: 2003},
      {title: "Fight club", year: 1999},
      {title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980},
      {title: "Inception", year: 2010},
      {title: "The Matrix", year: 1999},
      {title: "Forrest Gump", year: 1994},
      {title: "Raiders of the Lost Arc", year: 1981},
      {title: "Terminator 2: Judgment Day", year: 1991},
      {title: "Saving Private Ryan", year: 1998},
    ].each_with_index { |movie, index| movie[:id] = index + 1 }
  end
end
