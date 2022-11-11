import asyncio, grpc, os, requests, redis, random
from scraper.proto.scraper.v1.scraper_pb2 import ScrapeRequest, ScrapeResponse, GetProxiesRequest, GetProxiesResponse, AddProxyRequest, AddProxyResponse, RemoveProxyRequest, RemoveProxyResponse, Proxy
from scraper.proto.scraper.v1.scraper_pb2_grpc import add_ScraperServiceServicer_to_server, ScraperServiceServicer
from requests_html import HTMLSession
from fake_useragent import UserAgent
from uuid import uuid4

class ScraperService(ScraperServiceServicer):
  def __init__(self):
    self.redisClient = redis.Redis(host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT'])
    self.redisClient.connect()
  def Scrape(self, request, context):
    getResponse = ScrapeResponse()
    getResponse.proxy_error = False
    try:
      proxies = self.getRandomProxy(request.cc)
      if proxies == None:
        getResponse.error = 'No Proxy available'
        return getResponse
      headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': str(UserAgent().random),
      }
      if request.js_rendering:
        session = HTMLSession()    
        r = session.get(request.url, headers=headers, proxies=proxies, timeout=10)
        getResponse.status_code = r.status_code
        getResponse.content = r.html.html
      else:
        r = requests.get(request.url, headers=headers, proxies=proxies, timeout=10)
        getResponse.status_code = r.status_code
        getResponse.content = r.text
      return getResponse
    except requests.exceptions.ProxyError as e:
      getResponse.proxy_error = True
      return getResponse
    except Exception as e:
      getResponse.error = str(e)
      return getResponse
  def GetProxies(self, request, context):
    getProxiesResponse = GetProxiesResponse()
    uuids = self.redisClient.smembers('proxy')
    proxies = []
    for uuid in uuids:
      name = 'proxy:' + uuid
      proxy = Proxy()
      proxy.proxy_uuid = uuid
      proxy.address = self.redisClient.hget(name, 'address')
      proxy.cc = self.redisClient.hget(name, 'cc')
      proxy.provider = self.redisClient.hget(name, 'provider')
      proxies.append(proxy)
    getProxiesResponse.proxies = proxies
    return getProxiesResponse
  def AddProxy(self, request, context):
    uuid = str(uuid4())
    name = 'proxy:' + uuid
    self.redisClient.hget(name, 'address', request.address)
    self.redisClient.hget(name, 'cc', request.cc)
    self.redisClient.hget(name, 'provider', request.provider)
    self.redisClient.sadd('proxy', uuid)
    self.redisClient.sadd('proxy:' + request.cc.lower(), uuid)
    return AddProxyResponse()
  def RemoveProxy(self, request, context):
    uuid = request.proxy_uuid
    name = 'proxy:' + uuid
    cc = self.redisClient.hget(name, 'cc')
    self.redisClient.hdel(name, 'address')
    self.redisClient.hdel(name, 'cc')
    self.redisClient.hdel(name, 'provider')
    self.redisClient.srem('proxy', uuid)
    self.redisClient.srem('proxy:' + cc.lower(), uuid)
    return RemoveProxyResponse()
  def getRandomProxy(self, cc):
    uuids = self.redisClient.smembers('proxy:' + cc.lower())
    count = len(uuids)
    if count > 0:
      randomIndex = random.randrange(0, count)
      uuid = uuids[randomIndex]
      name = 'proxy:' + uuid
      proxy = self.redisClient.hget(name, 'address')
      return {
        'http': proxy,
        'https': proxy
      }
    else:
      return None

async def serve():
  server = grpc.aio.server()
  add_ScraperServiceServicer_to_server(ScraperService(), server)
  server.add_insecure_port(os.environ['SCRAPER_HOST'] + ':' + os.environ['SCRAPER_PORT'])
  print('Server running on port ' + os.environ['SCRAPER_PORT'])
  await server.start()
  await server.wait_for_termination()

def run():
  if not os.environ['SCRAPER_HOST']:
    raise Exception('Environment variable SCRAPER_HOST is missing')
  if not os.environ['SCRAPER_PORT']:
    raise Exception('Environment variable SCRAPER_PORT is missing')
  if not os.environ['REDIS_HOST']:
    raise Exception('Environment variable REDIS_HOST is missing')
  if not os.environ['REDIS_PORT']:
    raise Exception('Environment variable REDIS_PORT is missing')
  
  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)
  loop.run_until_complete(serve())