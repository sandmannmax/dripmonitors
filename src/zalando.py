import json
from requests_html import HTMLSession
from proto.scraper.v1.scraper_pb2 import Product

def GetProducts(proxy):
  products = []
  for i in range(3):
    url = 'https://www.zalando.de/herrenschuhe-sneaker/?p=' + str(i+1)
    session = HTMLSession()
    proxies = {
      'http': proxy,
      'https': proxy
    }
    response = session.get(url, proxies=proxies, timeout=10)
    script = response.html.xpath('//*[@id="z-nvg-cognac-props"]', first=True)
    content = script.text
    data = json.loads(content[9:-3])
    articles = data['articles']
    for article in articles:
      products.append(GetProduct(article))
      if len(article['family_articles']) > 0:
        for article_family in article['family_articles']:
          p = GetProduct(article_family)
          if p not in products:
            products.append(p)
  return products

def GetProduct(article):
  product = Product()
  product.id = 'zalando_' + article['sku']
  product.name = article['name']
  product.href = 'https://www.zalando.de/' + article['url_key'] + '.html'
  product.img = 'https://img01.ztat.net/article/' + article['media'][0]['path']
  price = article['price']['promotional']
  product.price = price[0:-2].replace(',', '.') + ' EUR'
  product.active = True
  product.has_sizes = True
  sizes = []
  sizesSoldOut = []
  for size in article['sizes']:
    sizes.append(size)
    sizesSoldOut.append(False)
  product.sold_out = len(sizes) == 0
  product.sizes.extend(sizes)
  product.sizes_sold_out.extend(sizesSoldOut)
  return product

GetProducts('')