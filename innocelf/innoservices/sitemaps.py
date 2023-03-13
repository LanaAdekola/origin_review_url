from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from .models import BlogPost


class StaticViewSiteMap(Sitemap):

    """
    Static view map for all the static pages
    """

    change_frequency = 'monthly'
    priority = 0.8
    protocol = 'https'

    def items(self):
        return ['innoservices:home',
                'innoservices:knowledge-home',
                'innoservices:about-us',
                'innoservices:frequently-asked-questions',
                'innoservices:privacy-policy',
                'innoservices:disclaimer',
                'innoservices:terms-and-conditions']

    def location(self, item):
        return reverse(item)



class BlogSiteMap(Sitemap):
    """
    Sitemap for all the blogs that will be written
    """
    change_frequency = 'monthly'
    priority = 0.7
    protocol = 'http'

    def items(self):
        return BlogPost.objects.all()

    def location(self, obj):
        return '/knowledge-home/%d' % obj.pk
