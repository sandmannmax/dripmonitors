from requests_html import HTMLSession, HTML
import requests, json
from proxy import getRandomProxy
from datetime import datetime

class ProcessConfig:
  pipe = []
  hasConstant = False
  constant = None

class MonitorpageConfiguration:
  url = ''
  isHtml = False  
  
  productsConfig = ProcessConfig()
  idConfig = ProcessConfig()
  nameConfig = ProcessConfig()
  hrefConfig = ProcessConfig()
  imgConfig = ProcessConfig()
  priceConfig = ProcessConfig()
  activeConfig = ProcessConfig()
  soldOutConfig = ProcessConfig()
  hasSizesConfig = ProcessConfig()
  sizesConfig = ProcessConfig()
  sizesSoldOutConfig = ProcessConfig()
  allSizesAvailable = False
  soldOutCheckSizes = False

  hasParentProducts = True
  hasChildProducts = False
  childProductConfig = ProcessConfig()

class Command:
  command = []
  arguments = []

class Product:
  id = None
  monitorpageId = None
  name = None
  href = None
  img = None
  price = None
  active = None
  soldOut = None
  hasSizes = None
  sizes = None
  sizesSoldOut = None

def Run(config):
  # proxy = getRandomProxy('9fbc948ad0535ea239202ce0', 'DE')
  try:
    content = GetContent(config.url, config.isHtml)

    productsJson = Process(content, config.productsConfig)

    products = []

    if productsJson:
      for i in range(len(productsJson)):
        if config.hasParentProducts:
          products.append(GetProduct(productsJson[i], config))
        if config.hasChildProducts:
          childProducts = Process(productsJson[i], config.childProductConfig)
          if childProducts:
            for j in range(len(childProducts)):
              products.append(GetProduct(childProducts[j], config, productsJson[i]))

    productsCopy = products
    products = []
    for productCopy in productsCopy:
      foundSameProduct = False
      for product in products:
        if product.id == productCopy.id:
          foundSameProduct = True
          break
      if not foundSameProduct:
        products.append(productCopy)

    print(len(products))
    if len(products) > 0:
      print('id: ' + str(products[0].id))
      print('name: ' + str(products[0].name))
      print('href: ' + str(products[0].href))
      print('img: ' + str(products[0].img))
      print('price: ' + str(products[0].price))
      print('active: ' + str(products[0].active))
      print('soldOut: ' + str(products[0].soldOut))
      print('hasSizes: ' + str(products[0].hasSizes))
      print('sizes: ' + str(products[0].sizes))
      print('sizesSoldOut: ' + str(products[0].sizesSoldOut))
  except Exception as e:
    print('Exception: ' + str(e))

def GetProduct(productJson, config, parent = None):
  product = Product()
  product.id = Process(productJson, config.idConfig, parent)
  product.name = Process(productJson, config.nameConfig, parent)
  product.href = Process(productJson, config.hrefConfig, parent)
  product.img = Process(productJson, config.imgConfig, parent)  
  product.price = Process(productJson, config.priceConfig, parent)
  product.active = Process(productJson, config.activeConfig, parent)
  product.soldOut = Process(productJson, config.soldOutConfig, parent)
  product.hasSizes = Process(productJson, config.hasSizesConfig, parent)

  if product.hasSizes:
    product.sizes = Process(productJson, config.sizesConfig, parent)
    product.sizesSoldOut = Process(productJson, config.sizesSoldOutConfig, parent)
    if config.allSizesAvailable:
      product.sizesSoldOut = []
      for i in range(len(product.sizes)):
        product.sizesSoldOut.append(False)
    if config.soldOutCheckSizes:
      product.soldOut = (len(product.sizes) == 0)
  else:
    product.sizes = []
    product.sizesSoldOut = []
      
  return product

def GetContent(url, isHtml):
  # proxies = {
  #   'http': proxy.address,
  #   'https': proxy.address
  # }
  if isHtml:
    session = HTMLSession()    
    r = session.get(url, timeout=10)
    return r.html.html
  else:
    r = requests.get(url, timeout=10)
    return r.text

def Process(content, config, parent = None):
  if config.hasConstant:
    return config.constant

  if len(config.pipe) > 0:
    c = content
    storage = []
    i = 0
    while i < len(config.pipe):
      cmd = GetCommand(config.pipe[i])
      if cmd.command == 'json':
        c = json.loads(c)
      elif cmd.command == 'sub':
        start = int(cmd.arguments[0])
        end = int(cmd.arguments[1])
        c = c[start:end]
      elif cmd.command == 'xpath':
        xpath = cmd.arguments[0]
        html = HTML(html=c)
        c = html.xpath(xpath, first=True).text
      elif cmd.command == 'select':
        if cmd.arguments[0] in c:
          c = c[cmd.arguments[0]]
        else:
          c = None
      elif cmd.command == 'selectNum':
        c = c[int(cmd.arguments[0])]
      elif cmd.command == 'selectAll':
        newC = []
        if c != None:
          for o in c:
            newC.append(o[cmd.arguments[0]])
        c = newC
      elif cmd.command == 'prependString':
        c = cmd.arguments[0] + c
      elif cmd.command == 'appendString':
        c =  c + cmd.arguments[0]
      elif cmd.command == 'reset':
        c =  content
      elif cmd.command == 'loadParent':
        c = parent
        if parent == None:
          print('Loaded parent, but parent is None')
      elif cmd.command == 'join':
        c =  cmd.arguments[0].join(storage)
      elif cmd.command == 'save':
        storage.append(c)
      elif cmd.command == 'replace':
        c = c.replace(cmd.arguments[0], cmd.arguments[1])
      elif cmd.command == 'strip':
        c = c.strip(' ')
        while True:
          old = c
          c = c.replace('  ', ' ')
          if c == old:
            break
      elif cmd.command == 'string':
        c = str(c)
      elif cmd.command == 'break':
        break
      elif cmd.command == 'if':
        if cmd.arguments[0] in c:
          i += int(cmd.arguments[1])
      elif cmd.command == 'jump':
        i += int(cmd.arguments[0])
      elif cmd.command == 'ifequals':
        c = (c == cmd.arguments[0])
      elif cmd.command == 'invert':
        c = not c
      elif cmd.command == 'invertAll':
        newC = []
        for o in c:
          newC.append(not o)
        c = newC
      elif cmd.command == 'toDatetime':
        c = datetime.strptime(c, cmd.arguments[0])
      elif cmd.command == 'dateIsNotInFuture':
        c = (c <= datetime.now())
      i += 1

    return c
  else:
    return None

def GetCommand(commandString):
  cmd = Command()
  indexBracket = commandString.find('(')
  cmd.command = commandString[0:indexBracket]
  argumentsContent = commandString[indexBracket+1:-1]
  cmd.arguments = []
  dontSplit = False
  lastSplit = -1
  for i in range(len(argumentsContent)):
    if argumentsContent[i] == '\'':
      dontSplit = not dontSplit
    if argumentsContent[i] == ',' and not dontSplit:
      c = argumentsContent[lastSplit+1:i]
      if c[0] == '\'':
        c = c[1:]
      if c[-1] == '\'':
        c = c[:-1]
      lastSplit = i
      cmd.arguments.append(c)
    elif i == len(argumentsContent) - 1 and not dontSplit:
      c = argumentsContent[lastSplit+1:]
      if c[0] == '\'':
        c = c[1:]
      if c[-1] == '\'':
        c = c[:-1]
      lastSplit = i
      cmd.arguments.append(c)
  return cmd

def getFootlockerConfig():
  config = MonitorpageConfiguration()
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
  config = MonitorpageConfiguration()
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
  config = MonitorpageConfiguration()
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

Run(getFootlockerConfig())
Run(getZalandoConfig())
Run(getNikeConfig())