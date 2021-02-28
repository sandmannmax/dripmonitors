import asyncio
import grpc
from proto.scraper.v1.scraper_pb2 import GetHtmlResponse, GetProductsResponse
from proto.scraper.v1.scraper_pb2_grpc import ScraperServiceServicer, add_ScraperServiceServicer_to_server
from requests_html import HTMLSession
from zalando import GetProducts

class ScraperService(ScraperServiceServicer):
  def GetHtml(self, request, context):
    session = HTMLSession()
    proxies = {
      'http': request.proxy_address,
      'https': request.proxy_address
    }
    r = session.get(request.url, proxies=proxies, timeout=10)
    return GetHtmlResponse(html=r.html.html)

  def GetProducts(self, request, context):
    response = GetProductsResponse()
    if request.techname == 'zalando':
      response.products.extend(GetProducts(request.proxy_address))
    return response

async def serve():
  server = grpc.aio.server()
  add_ScraperServiceServicer_to_server(ScraperService(), server)
  server.add_insecure_port('[::]:50069')
  await server.start()
  await server.wait_for_termination()


if __name__ == '__main__':
  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)
  loop.run_until_complete(serve())