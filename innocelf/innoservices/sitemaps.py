from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse


class StaticViewSiteMap(Sitemap):

    """
    Static view map for all the static pages
    """

    def items(self):
        return ['innoservices:home',
                'innoservices:technologies',
                'innoservices:contact-us',
                'innoservices:about-us-and-testimonials',
                'innoservices:privacy-policy',
                'innoservices:disclaimer',
                'innoservices:terms-and-conditions']

    def location(self, item):
        return reverse(item)
