from requests_html import HTMLSession, HTML
import requests, json
from datetime import datetime
from scraper.types.command import Command
from scraper.proto.scraper.v1.scraper_pb2 import Product, TestResponse, RunResponse
from scraper.proto.scraper.v1.scraper_pb2_grpc import ScraperServiceServicer

def Run(config, proxy):
  content = GetContent(config.url, proxy, config.is_html)
  productsJson = Process(content, config.products_config)
  products = []

  if productsJson:
    for i in range(len(productsJson)):
      if config.has_parent_products:
        products.append(GetProduct(productsJson[i], config))
      if config.hasChildProducts:
        childProducts = Process(productsJson[i], config.child_product_config)
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
  return products

def GetProduct(productJson, config, parent = None):
  product = Product()
  product.id = Process(productJson, config.id_config, parent)
  product.name = Process(productJson, config.name_config, parent)
  product.href = Process(productJson, config.href_config, parent)
  product.img = Process(productJson, config.img_config, parent)  
  product.price = Process(productJson, config.price_config, parent)
  product.active = Process(productJson, config.active_config, parent)
  product.sold_out = Process(productJson, config.soldOut_config, parent)
  product.has_sizes = Process(productJson, config.hasSizes_config, parent)

  if product.hasSizes:
    product.sizes = Process(productJson, config.sizes_config, parent)
    product.sizes_sold_out = Process(productJson, config.sizes_sold_out_config, parent)
    if config.all_sizes_available:
      product.sizes_sold_out = []
      for i in range(len(product.sizes)):
        product.sizes_sold_out.append(False)
    if config.sold_out_check_sizes:
      product.sold_out = (len(product.sizes) == 0)
  else:
    product.sizes = []
    product.sizes_sold_out = []
      
  return product

def GetContent(url, proxy, isHtml):
  proxies = {
    'http': proxy,
    'https': proxy
  }
  if isHtml:
    session = HTMLSession()    
    r = session.get(url, proxies=proxies, timeout=10)
    return r.html.html
  else:
    r = requests.get(url, proxies=proxies, timeout=10)
    return r.text

def Process(content, config, parent = None):
  if config.has_constant:
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

class ScraperService(ScraperServiceServicer):
  def Test(self, request, context):
    try:
      products = Run(request.config, request.proxy)
      return TestResponse(products=products, success=True)
    except Exception as e:
      print('Exception: ' + str(e))
      return TestResponse(success=False, message=str(e))

  def Run(self, request, context):
    try:
      products = Run(request.config, request.proxy)
      return RunResponse(products=products, success=True)
    except Exception as e:
      print('Exception: ' + str(e))
      return RunResponse(success=False, message=str(e))