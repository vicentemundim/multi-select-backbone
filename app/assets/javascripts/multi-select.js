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
    this.$('ul').html(this.template({collection: this.collection.toJSON()}))
  },

  add: function (event) {
    var model = this.collection.get($(event.currentTarget).parents('li').data('id'))

    event.preventDefault()

    this.trigger('multi-select:add', model)
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
    this.$('ul').html(this.template({collection: this.collection.toJSON()}))
  },

  remove: function (event) {
    var model = this.collection.get($(event.currentTarget).parents('li').data('id'))

    event.preventDefault()

    this.trigger('multi-select:remove', model)
  }
})

var MultiSelect = Backbone.View.extend({
  initialize: function () {
    this.available = this.options.available
    this.selected = this.options.selected

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