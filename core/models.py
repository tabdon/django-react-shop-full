from django.conf import settings
from django.db import models
import stripe


class Product(models.Model):
    name = models.CharField(max_length=50)
    desc = models.TextField(max_length=500)
    mfg = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places=2, max_digits=7)  # allows for prices up to 99999.99
    image = models.URLField()

    def __unicode__(self):
        return self.name


class Order(models.Model):
    product = models.ForeignKey(Product)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    stripe_id = models.CharField(max_length=40)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        if not self.pk:
            #try:
            charge = stripe.Charge.create(
                amount=int(self.product.price * 100), # amount in cents, again
                currency="usd",
                card=self.stripe_id,
                description=self.email
            )
            #except stripe.CardError, e:
              # The card has been declined
            #  pass
        super(Order, self).save(force_insert, force_update, using, update_fields)


    def __unicode__(self):
        return u'{} - {}'.format(self.stripe_id, self.full_name)


class Review(models.Model):
    product = models.ForeignKey(Product)
    full_name = models.CharField(max_length=200)
    rating = models.IntegerField()
    comment = models.TextField(max_length=500)