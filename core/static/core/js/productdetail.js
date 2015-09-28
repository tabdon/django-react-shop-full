var ProductDetail = React.createClass({
    getInitialState: function() {
        return {};
    },

    // componentDidMount method
    componentDidMount: function() {
        var api = new APIService();

        api.getProduct(this.props.productId, function(data) {
            this.setState(data);
        }.bind(this));
    },

    // renderModal method
    renderModal: function(e) {
        e.preventDefault();
        React.render(<PaymentModal product={this.state} />, document.querySelector('#payment-modal .modal-content'))
    },

    // render method
    render: function() {
        return (
            <article className="product clearfix">
                <div className="col-md-6">
                    <img className="img-thumbnail" src={this.state.image} />
                </div>
                <div className="col-md-6">
                    <h1>{this.state.name}</h1>
                    <h4 className="mfg">by {this.state.mfg}</h4>
                    <div className="description">{this.state.desc}</div>
                    <button type="button" className="btn btn-primary" onClick={this.renderModal}>Buy Now ${this.state.price}</button>
                </div>
                <ReviewSection productId={this.state.product_id} />
            </article>
        )
    }
});
