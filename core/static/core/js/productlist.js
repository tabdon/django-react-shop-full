var ProductList = React.createClass({

    // getInitialState method
    getInitialState: function() {
        this.api = new APIService();
        return {
            data: {
                objects: [],
                links: {
                    prev: null,
                    next: null
                }
            }
        };
    },

    // componentDidMount method
    componentDidMount: function() {
        this.api.getProducts(function(data) {
            this.setState({data: data});
        }.bind(this));
    },

    // paginateProducts method

    // render method
    render: function() {
        // var columns is the <div class="col-md-6"></div> element
        var columns = this.state.data.objects.chunk(this.props.columns).map(function(group, idx) {

            // var products will render the actual <h4> and <a>
            var products = group.map(function(product) {
                var productUrl = "#/p/" + product.product_id;
                return (
                    <h4 key={product.product_id}><a href={productUrl}>{product.name}</a></h4>
                );
            });

            return (
                <div key={idx} className="col-md-6 product-list">
                    {products}
                </div>
            );
        });

        return (
            <div>
                {columns}
            </div>
        );
    }

});
