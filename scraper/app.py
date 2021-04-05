import asyncio, grpc, os, requests
from scraper.proto.scraper.v1.scraper_pb2 import GetResponse, GetRequest
from scraper.proto.scraper.v1.scraper_pb2_grpc import add_ScraperServiceServicer_to_server, ScraperServiceServicer
from requests_html import HTMLSession

class ScraperService(ScraperServiceServicer):
  def Get(self, request, context):
    getResponse = GetResponse()
    getResponse.proxy_error = False
    try:
      proxies = {
        'http': request.proxy,
        'https': request.proxy
      }
      if request.is_html:
        session = HTMLSession()    
        r = session.get(request.url, proxies=proxies, timeout=10)
        getResponse.status_code = r.status_code
        getResponse.content = r.html.html
      else:
        r = requests.get(request.url, proxies=proxies, timeout=10)
        getResponse.status_code = r.status_code
        getResponse.content = r.text
      return getResponse
    except requests.exceptions.ProxyError as e:
      getResponse.proxy_error = True
      return getResponse
    except Exception as e:
      getResponse.error = str(e)
      return getResponse

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
  
  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)
  loop.run_until_complete(serve())