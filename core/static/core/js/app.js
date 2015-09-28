var container = document.getElementById('container');

var routes = {
    '/': function() {
        React.render(
          <ProductList columns="2" />,
            container
        );
    },
    '/p/:productId': function(productId) {
        React.render(
            <ProductDetail productId={productId} />,
            container
        )
    }
};

var router = Router(routes);
router.init('/');
