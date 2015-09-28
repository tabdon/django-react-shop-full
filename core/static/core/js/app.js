var container = document.getElementById('container');

var routes = {
    '/': function() {
        React.render(
          <ProductList columns="2" />,
            container
        );
    }
};

var router = Router(routes);
router.init('/');
