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