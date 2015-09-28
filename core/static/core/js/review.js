var Review = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentWillMount: function() {
        this.setState(this.props.review);
    },
    componentDidMount: function(prevProps, prevState) {
        jQuery(this.getDOMNode()).find('.rating').rating({
                        showCaption:false,
                        showClear:false,
                        size: 'xs',
                        readonly: true,
                        step:1
                    });
    },
    render: function() {
        return (
            <article className="review">
                <div className="name">{this.state.full_name}</div>
                <input type="number" readOnly className="rating" ref="rating" value={this.state.rating} />
                <p className="comment">{this.state.comment}</p>
            </article>
        )
    }
});

var ReviewList = React.createClass({
    render: function() {
        var reviews = this.props.data.map(function(review, idx) {
            return (
                <Review key={idx} review={review} />
            )
        });

        return (
            <div className="review-list">
                {reviews}
            </div>
        )
    }
});

var ReviewForm = React.createClass({
    getInitialState: function() {
        return {
            'full_name': null,
            rating: 0,
            comment: null
        }
    },

    // componentDidMount
    componentDidMount: function() {
        jQuery(this.getDOMNode()).find('.rating').rating({
                showCaption:false,
                showClear:false,
                size: 'xs',
                step:1
            }).on('rating.change', this.handleChange);
    },

    // handleChange
    handleChange: function(e) {
        var element = e.target;
        if (this.state.hasOwnProperty(element.id)) {
            var obj = {}
            obj[element.id] = element.value;

            this.setState(obj);
        }
    },

    // handleSubmit
    handleSubmit: function(e) {
        e.preventDefault();
        // ensure all properties have a value set
        var isComplete = true;
        for (var key in this.state) {
            if (this.state.hasOwnProperty(key)) {
                if (this.state[key] == null || (typeof this.state[key] === 'string' && this.state[key].length == 0)) {
                    isComplete = false;
                }
            }
        }

        if (isComplete && this.props.submitForm) {
            this.props.submitForm(this.state);
        }

        return;
    },

    // render
    render: function() {
        return (
            <div className="review-form clearfix">
                <form>
                    <div className="row">
                        <div className="form-group col-lg-6 clearfix">
                            <label>Your Name</label>
                            <input type="text" className="form-control" id="full_name" name="full_name" onChange={this.handleChange} placeholder="Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6 clearfix">
                            <label>Your Rating</label><br />
                            <input type="number" className="form-control rating" id="rating" name="rating" placeholder="Rating 1-5" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-12">
                            <label>Anything to Say?</label>
                            <textarea className="form-control" rows="3" id="comment" name="comment" onChange={this.handleChange} placeholder="Comment"></textarea>
                        </div>
                    </div>
                  <button type="submit" className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }

});

var ReviewSection = React.createClass({
    getInitialState: function() {
        return {reviews: []};
    },
    componentWillReceiveProps: function(props) {
        var api = new APIService();

        if (props.productId) {
            api.getProductReviews(props.productId, function(data) {
                this.setState({reviews: data.objects});
            }.bind(this));
        }
    },

    // createReview method

    // showReviewForm method

    render: function() {
        return (
            <section className="col-md-8 reviews">
                <h2>Product Reviews</h2>
                <ReviewList data={this.state.reviews} />
            </section>
        )
    }
});
