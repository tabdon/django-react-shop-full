var Validator = function() {
    this.validationMap = {
        'email': 'validateEmail',
        'card': Stripe.validateCardNumber,
        'cvc': Stripe.validateCVC,
        'expiry': 'validateExpiry'
    };
};

Validator.prototype.validateEmail = function(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
};

// expiry is a string "mm / yy[yy]"
Validator.prototype.parseExpiry = function(value) {
    var month, prefix, year, _ref;

    value = value || '';

    value = value.replace(/\s/g, '');
    _ref = value.split('/', 2), month = _ref[0], year = _ref[1];

    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }

    month = parseInt(month, 10);
    year = parseInt(year, 10);

    return {
      month: month,
      year: year
    };
};

Validator.prototype.validateExpiry = function(value) {
    value = this.parseExpiry(value);

    var month = value.month,
        year = value.year,
        prefix = null;

    if (year.length === 2) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
    }

    return Stripe.validateExpiry(month.toString(), year.toString());
};

var PaymentForm = React.createClass({
    componentDidMount: function() {
        this.loadingElement = jQuery(this.getDOMNode()).find('.loading');
        this.loadingElement.hide();
        this.isLoading = false;
    },

    // displayMessage method
    displayMessage: function(css, message) {
        var messageEl = jQuery(this.getDOMNode()).find('.message');
        messageEl.addClass(css);
        messageEl.text(message);
    },

    // handleSubmit method
    handleSubmit: function(e) {
        e.preventDefault();
        if (!this.isLoading) {
            this.isLoading = true;
            this.loadingElement.show();

            var formData = {
                amount: this.props.product.price
            };

            var hasErrors = false;

            var self = this;
            var validator = new Validator();
            jQuery(this.getDOMNode()).find('.form-group').each(function (i, el) {
                var group = $(el);
                var formElement = group.find(':input');
                if (formElement.val() != '') {
                    var attrName = formElement.attr('name');

                    if (validator.validationMap.hasOwnProperty(attrName)) {
                        var func = validator.validationMap[attrName];

                        var isValid = false;

                        if (typeof func === 'function') {
                            isValid = func(formElement.val());
                        } else {
                            isValid = validator[func](formElement.val());
                        }

                        if (!isValid) {
                            group.addClass('has-error');
                            hasErrors = true;
                            return false; // continue to the next iteration
                        }
                    }

                    group.removeClass('has-error');
                    formData[attrName] = formElement.val();
                } else {
                    group.addClass('has-error');
                    hasErrors = true;
                }
            });

            if (!hasErrors) {
                formData.expiry = validator.parseExpiry(formData.expiry);
                var apiService = new APIService();
                apiService.makePayment(this.props.product, formData, function(data) {
                    self.displayMessage('text-success', 'Payment Successful');
                    self.isLoading = false;
                    self.loadingElement.hide();
                }, function(error) {
                    self.displayMessage('text-danger', self.generateErrorText(response.data));
                    self.isLoading = false;
                    self.loadingElement.hide();
                });

            } else {
                this.isLoading = false;
                this.loadingElement.hide();
            }
        }
    },

    // render method
    render: function() {
        return (
            <form name="form" className="form-horizontal" noValidate>
                <div className="form-group">
                    <label className="control-label col-sm-2 col-sm-offset-1">Full Name</label>
                    <div className="col-sm-8">
                        <input type="text" name="name" className="form-control" placeholder="Required" required/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">E-mail Address</label>
                    <div className="col-sm-8">
                        <input type="email" name="email" className="form-control" placeholder="Required" required/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">Card Number</label>
                    <div className="col-sm-8">
                        <input type="text" maxLength="20" name="card" autoComplete="off" className="form-control" required />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">CVC</label>
                    <div className="col-sm-8">
                        <input type="text" maxLength="4" name="cvc" autoComplete="off" className="form-control" required />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-3">Expiry Date</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="expiry" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary pull-left" onClick={this.handleSubmit}>Buy for ${this.props.product.price}</button>
                <div className="loading pull-left"></div>
                <div className="message pull-left"></div>
            </form>
        )
    }

});
