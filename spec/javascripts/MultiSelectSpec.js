describe("MultiSelect", function() {
  var available, selected, multiSelect,
      Selected = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage('test-models')
      })

  beforeEach(function() {
    loadFixtures('index.html')

    available  = new Backbone.Collection
    selected   = new Selected

    // fetch and clear the selected list
    selected.fetch()
    selected.each(function (model) { model.destroy() })
    selected.reset()
  });

  function createMultiSelect() {
    multiSelect = new MultiSelect({
      el: $('.multi-select'),
      available: available,
      selected: selected
    })
  }

  describe("listing", function() {
    it("should list all available models", function() {
      createMultiSelect()

      var availableModels = $('.available ul li').map(function () {
        return $.trim($('span', this).text())
      }).get()

      expect(availableModels).toEqual(['A title', 'Other title'])
    });

    it("should list an empty list of selected models", function() {
      createMultiSelect()

      var selectedModels = $('.selected ul li').map(function () {
        return $.trim($('span', this).text())
      }).get()

      expect(selectedModels).toEqual([])
    });

    describe("when there are some models selected", function() {
      var model

      beforeEach(function() {
        model = new Backbone.Model({id: 2, title: 'Other title'})
        selected.add(model)
        model.save()
      });

      it("should only list models that are not selected in available listing", function() {
        createMultiSelect()

        var availableModels = $('.available ul li').map(function () {
          return $.trim($('span', this).text())
        }).get()

        expect(availableModels).toEqual(['A title'])
      });

      it("should list selected models selected listing", function() {
        createMultiSelect()

        var selectedModels = $('.selected ul li').map(function () {
          return $.trim($('span', this).text())
        }).get()

        expect(selectedModels).toEqual(['Other title'])
      });
    });
  });

  describe("selecting", function() {
    it("should add the model to the selected list, removing it from the available list", function() {
      createMultiSelect()

      $('.available ul li[data-id=1] .add').click()

      expect($('.available ul li[data-id=1]')).not.toExist()
      expect($('.selected ul li[data-id=1]')).toExist()
    });

    it("should remove the model from the selected list, adding it again to the available list", function() {
      createMultiSelect()

      $('.available ul li[data-id=1] .add').click()
      $('.selected ul li[data-id=1] .remove').click()

      expect($('.available ul li[data-id=1]')).toExist()
      expect($('.selected ul li[data-id=1]')).not.toExist()
    });
  });
});