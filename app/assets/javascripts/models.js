var Movie = Backbone.Model.extend({})

var Movies = Backbone.Collection.extend({
  model: Movie,
  comparator: function (model) {
    return model.get('title')
  }
})

var FavoriteMovies = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('favorite-movies'),
  model: Movie,

  initialize: function () {
    this.on('add',    this.added, this)
    this.on('remove', this.removed, this)
  },

  comparator: function (model) {
    return model.get('title')
  },

  added: function (model) {
    model.save()
  },

  removed: function (model) {
    model.destroy()
  }
})
