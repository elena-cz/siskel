var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    // Switch like attribute to the opposite
    this.set('like', !this.get('like'));
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    this.on('change', function() { this.sort(); });
  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    // change comparator to field
    // call sort
    if (this.comparator === field) {
      console.log('reverse reverse');
      console.log(this);
      this.models.reverse();
    } else {
      this.comparator = field;
      console.log('first sort');
      this.sort();
    }
    
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.model.on('change', this.render, this);
    
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    this.collection.on('sort', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
