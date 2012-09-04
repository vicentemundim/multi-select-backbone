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

var AvailableView = Backbone.View.extend({
  events: {
    "click .add": 'add'
  },

  initialize: function () {
    this.template = _(this.$('script').html()).template()

    this.collection.on('reset',  this.render, this)
    this.collection.on('remove', this.render, this)
    this.collection.on('add',    this.render, this)

    this.collection.reset(this.$el.data('available'))
  },

  render: function () {
    this.$('ul').html(this.template({movies: this.collection.toJSON()}))
  },

  add: function (event) {
    var movie = this.collection.get($(event.currentTarget).parents('li').data('id'))

    event.preventDefault()

    this.trigger('multi-select:add', movie)
  }
})

var SelectedView = Backbone.View.extend({
  events: {
    "click .remove": 'remove'
  },

  initialize: function () {
    this.template = _(this.$('script').html()).template()

    this.collection.on('reset',  this.render, this)
    this.collection.on('remove', this.render, this)
    this.collection.on('add',    this.render, this)

    this.collection.fetch()
  },

  render: function () {
    this.$('ul').html(this.template({movies: this.collection.toJSON()}))
  },

  remove: function (event) {
    var movie = this.collection.get($(event.currentTarget).parents('li').data('id'))

    event.preventDefault()

    this.trigger('multi-select:remove', movie)
  }
})

var MultiSelect = Backbone.View.extend({
  initialize: function () {
    this.available = new Movies
    this.selected = new FavoriteMovies

    this.selected.on('reset', this.updateAvailable, this)

    this.availableView = new AvailableView({el: this.$('.available'), collection: this.available})
    this.selectedView = new SelectedView({el: this.$('.selected'), collection: this.selected})

    this.availableView.on('multi-select:add', this.addToSelected, this)
    this.selectedView.on('multi-select:remove', this.removeFromSelected, this)
  },

  render: function () {
    this.availableView.render()
    this.selectedView.render()
  },

  updateAvailable: function () {
    this.available.remove(this.selected.toArray())
  },

  addToSelected: function (model) {
    this.available.remove(model)
    this.selected.add(model)
  },

  removeFromSelected: function (model) {
    this.selected.remove(model)
    this.available.add(model)
  }
})

$(function () {
  window.multiSelect = new MultiSelect({
    el: $('.multi-select')
  })
})