from django.contrib.syndication.views import Feed
from django.urls import reverse
from .models import BlogPost

class BlogFeed(Feed):
    """
    Class represents the blog RSS feed
    """
    title = "Innocelf Blog"
    link = "/knowledge-home/"
    description = """At Innocelf we are determined to provide
    transparent intellectual property research and analysis. Transparency starts
    with sharing our knowledge about patents, trademarks and other IP related
    material. Our blog will help you understand the nuances of IP."""

    def items(self):
        return BlogPost.objects.all()

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.highlight_para

    def item_link(self, item):
        title_lowered = item.title.lower()
        title_lowered = title_lowered.replace(' ', '-')
        return '/knowledge-home/%s' % title_lowered
