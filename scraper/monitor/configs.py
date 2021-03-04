from scraper.types.monitorpage_config import MonitorpageConfig

def getFootlockerConfig():
  config = MonitorpageConfig()
  config.url = 'https://www.footlocker.de/api/products/search?query=herren%20schuhe&pageSize=20'
  config.isHtml = True

  config.productsConfig.pipe = ['json()', 'select(products)']
  config.idConfig.pipe = ['select(sku)']
  config.nameConfig.pipe = ['select(name)', 'save()', 'reset()', 'select(baseOptions)', 'selectNum(0)', 'select(selected)', 'select(style)', 'save()', 'join( - )']
  config.hrefConfig.pipe = ['select(name)', 'replace(-, )', 'strip()', 'replace( ,-)', 'save()', 'reset()', 'select(sku)', 'save()', 'join(/)', 'prependString(https://www.footlocker.de/de/product/)', 'appendString(.html)']
  config.imgConfig.pipe = ['select(images)', 'selectNum(0)', 'select(url)']
  config.priceConfig.pipe = ['select(price)', 'select(value)', 'string()', 'appendString( EUR)']

  config.activeConfig.hasConstant = True
  config.activeConfig.constant = True

  config.soldOutConfig.hasConstant = True
  config.soldOutConfig.constant = False

  config.hasSizesConfig.hasConstant = True
  config.hasSizesConfig.constant = False
  
  return config

def getZalandoConfig():
  config = MonitorpageConfig()
  config.url = 'https://www.zalando.de/herrenschuhe-sneaker/'
  config.isHtml = True

  config.productsConfig.pipe = ['xpath(//*[@id="z-nvg-cognac-props"])', 'sub(9,-3)', 'json()', 'select(articles)']

  config.idConfig.pipe = ['select(sku)', 'prependString(zalando_)']

  config.nameConfig.pipe = ['if(brand_name,1)', 'loadParent()', 'select(brand_name)', 'save()', 'reset()', 'select(name)', 'save()', 'join( )']

  config.hrefConfig.pipe = ['select(url_key)', 'prependString(https://www.zalando.de/)', 'appendString(.html)']

  config.imgConfig.pipe = ['select(media)', 'selectNum(0)', 'select(path)', 'prependString(https://img01.ztat.net/article/)']

  config.priceConfig.pipe = ['select(price)', 'select(promotional)', 'sub(0,-2)', 'replace(\',\',\'.\')', 'appendString( EUR)']

  config.activeConfig.hasConstant = True
  config.activeConfig.constant = True

  config.soldOutConfig.hasConstant = True
  config.soldOutConfig.constant = True

  config.hasSizesConfig.hasConstant = True
  config.hasSizesConfig.constant = True

  config.sizesConfig.pipe = ['select(sizes)']
  config.allSizesAvailable = True
  config.soldOutCheckSizes = True

  config.hasChildProducts = True
  config.copyToChildKeys = ['brand_name']
  config.childProductConfig.pipe = ['select(family_articles)']
  
  return config

def getNikeConfig():
  config = MonitorpageConfig()
  config.url = 'https://api.nike.com/product_feed/threads/v2/?anchor=0&count=60&filter=marketplace%28DE%29&filter=language%28de%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title'
  config.isHtml = True
  config.hasParentProducts = False
  config.hasChildProducts = True
  config.childProductConfig.pipe = ['select(productInfo)']

  config.productsConfig.pipe = ['json()', 'select(objects)']

  config.idConfig.pipe = ['select(merchProduct)', 'select(id)']

  config.nameConfig.pipe = ['if(productContent,14)', 'loadParent()', 'select(publishedContent)', 'select(properties)', 'select(title)', 'save()', 'loadParent()', 'select(publishedContent)', 'select(properties)', 'select(coverCard)', 'select(properties)', 'select(title)', 'save()', 'join( )', 'break()', 'select(productContent)', 'select(fullTitle)']

  config.hrefConfig.pipe = ['if(productContent,7)', 'loadParent()', 'select(publishedContent)', 'select(properties)', 'select(seo)', 'select(slug)', 'prependString(https://www.nike.com/de/launch/t/)', 'break()', 'select(productContent)', 'select(slug)', 'prependString(https://www.nike.com/de/launch/t/)']

  config.imgConfig.pipe = ['select(imageUrls)', 'select(productImageUrl)']

  config.priceConfig.pipe = ['select(merchPrice)', 'select(currentPrice)', 'string()', 'appendString( EUR)']

  config.activeConfig.pipe = ['if(launchView,4)', 'select(merchProduct)', 'select(status)', 'ifequals(ACTIVE)', 'break()', 'select(launchView)', 'select(startEntryDate)', 'toDatetime(%Y-%m-%dT%H:%M:%S.%fZ)', 'dateIsNotInFuture()']

  config.soldOutConfig.pipe = ['select(availability)', 'select(available)', 'invert()']

  config.hasSizesConfig.hasConstant = True
  config.hasSizesConfig.constant = True

  config.sizesConfig.pipe = ['select(skus)', 'selectAll(nikeSize)']

  config.sizesSoldOutConfig.pipe = ['select(availableSkus)', 'selectAll(available)', 'invertAll()']
  
  return config
