import grpc, os, sys
sys.path.append(os.path.realpath('.'))
from proto.proxy.v1.proxy_pb2_grpc import ProxyServiceStub
from proto.proxy.v1.proxy_pb2 import GetRandomProxyRequest

def getRandomProxy(monitorpage_id, cc):
  with grpc.insecure_channel(os.environ['PROXY_HOST'] + ':' + os.environ['PROXY_PORT']) as channel:
    stub = ProxyServiceStub(channel)
    response = stub.GetRandomProxy(GetRandomProxyRequest(monitorpage_id=monitorpage_id, cc=cc))
    if response.success:
      return response.proxy
    else:
      print(response.message)
      return None