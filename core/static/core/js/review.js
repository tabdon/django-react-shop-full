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
