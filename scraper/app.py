import asyncio, grpc, os
from scraper.proto.scraper.v1.scraper_pb2_grpc import add_ScraperServiceServicer_to_server
from scraper.monitor.run import ScraperService

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