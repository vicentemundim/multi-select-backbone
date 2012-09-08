(function (window) {
  var BaseContainerView = Backbone.View.extend({
    initialize: function () {
      this.template = _(this.$('script').html()).template()

      this.collection.on('reset',  this.render, this)
      this.collection.on('remove', this.render, this)
      this.collection.on('add',    this.render, this)

      this.setup()
    },

    setup: function () {
      // reimplement this
    },

    render: function () {
      this.$('ul').html(this.template({collection: this.collection.toJSON()}))
    },

    retrieveModelFrom: function (target) {
      return this.collection.get($(target).parents('li').data('id'))
    }
  })

  var AvailableView = BaseContainerView.extend({
    events: {
      "click .add": 'add'
    },

    setup: function () {
      this.collection.reset(this.$el.data('available'))
    },

    add: function (event) {
      event.preventDefault()
      this.trigger('multi-select:add', this.retrieveModelFrom(event.currentTarget))
    }
  })

  var SelectedView = BaseContainerView.extend({
    events: {
      "click .remove": 'remove'
    },

    setup: function () {
      this.collection.fetch()
    },

    remove: function (event) {
      event.preventDefault()
      this.trigger('multi-select:remove', this.retrieveModelFrom(event.currentTarget))
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

  window.MultiSelect = MultiSelect
})(window)
