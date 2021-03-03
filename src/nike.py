import json
import requests
from proto.scraper.v1.scraper_pb2 import Product

def GetProducts(proxy):
  products = []
  location = 'DE';
  language = 'de';
  for i in range(3):
    url = 'https://api.nike.com/product_feed/threads/v2/?anchor=' + str(i*60) + '&count=60&filter=marketplace%28' + location + '%29&filter=language%28' + language + '%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title'
    proxies = {
      'http': proxy,
      'https': proxy
    }
    response = requests.get(url, proxies=proxies, timeout=10)
    script = response.html.xpath('//*[@id="z-nvg-cognac-props"]', first=True)
    content = script.text
    data = json.loads(content[9:-3])
    articles = data['articles']
    for article in articles:
      products.append(GetProduct(article))
      break
      if len(article['family_articles']) > 0:
        for article_family in article['family_articles']:
          p = GetProduct(article_family)
          if p not in products:
            products.append(p)
  return products

def GetProduct(article):
  product = Product()
  product.id = 'zalando_' + article['sku']
  product.name = article['brand_name'] + ' ' + article['name'].split('-')[0]
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