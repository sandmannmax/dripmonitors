import asyncio
import grpc
import scraper_pb2
import scraper_pb2_grpc
from requests_html import HTMLSession

class ScraperServiceServicer(scraper_pb2_grpc.ScraperServiceServicer):
  def GetHtml(self, request, context):
    session = HTMLSession()
    proxies = {
      'http': request.proxy_address,
      'https': request.proxy_address
    }
    r = session.get(request.url, proxies=proxies, timeout=10)
    return scraper_pb2.GetHtmlResponse(html=r.html.html)

async def serve():
  server = grpc.aio.server()
  scraper_pb2_grpc.add_ScraperServiceServicer_to_server(ScraperServiceServicer(), server)
  server.add_insecure_port('[::]:50069')
  await server.start()
  await server.wait_for_termination()


if __name__ == '__main__':
  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)
  loop.run_until_complete(serve())