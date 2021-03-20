# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: scraper/v1/scraper.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='scraper/v1/scraper.proto',
  package='scraper.v1',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x18scraper/v1/scraper.proto\x12\nscraper.v1\"L\n\nGetRequest\x12\x10\n\x03url\x18\x01 \x01(\tR\x03url\x12\x14\n\x05proxy\x18\x02 \x01(\tR\x05proxy\x12\x16\n\x06isHtml\x18\x03 \x01(\x08R\x06isHtml\"W\n\x0bGetResponse\x12\x18\n\x07success\x18\x01 \x01(\x08R\x07success\x12\x18\n\x07\x63ontent\x18\x02 \x01(\tR\x07\x63ontent\x12\x14\n\x05\x65rror\x18\x03 \x01(\tR\x05\x65rror2J\n\x0eScraperService\x12\x38\n\x03Get\x12\x16.scraper.v1.GetRequest\x1a\x17.scraper.v1.GetResponse\"\x00\x62\x06proto3'
)




_GETREQUEST = _descriptor.Descriptor(
  name='GetRequest',
  full_name='scraper.v1.GetRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='url', full_name='scraper.v1.GetRequest.url', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='url', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='proxy', full_name='scraper.v1.GetRequest.proxy', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='proxy', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='isHtml', full_name='scraper.v1.GetRequest.isHtml', index=2,
      number=3, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='isHtml', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=40,
  serialized_end=116,
)


_GETRESPONSE = _descriptor.Descriptor(
  name='GetResponse',
  full_name='scraper.v1.GetResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='success', full_name='scraper.v1.GetResponse.success', index=0,
      number=1, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='success', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='content', full_name='scraper.v1.GetResponse.content', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='content', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='error', full_name='scraper.v1.GetResponse.error', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='error', file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=118,
  serialized_end=205,
)

DESCRIPTOR.message_types_by_name['GetRequest'] = _GETREQUEST
DESCRIPTOR.message_types_by_name['GetResponse'] = _GETRESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

GetRequest = _reflection.GeneratedProtocolMessageType('GetRequest', (_message.Message,), {
  'DESCRIPTOR' : _GETREQUEST,
  '__module__' : 'scraper.v1.scraper_pb2'
  # @@protoc_insertion_point(class_scope:scraper.v1.GetRequest)
  })
_sym_db.RegisterMessage(GetRequest)

GetResponse = _reflection.GeneratedProtocolMessageType('GetResponse', (_message.Message,), {
  'DESCRIPTOR' : _GETRESPONSE,
  '__module__' : 'scraper.v1.scraper_pb2'
  # @@protoc_insertion_point(class_scope:scraper.v1.GetResponse)
  })
_sym_db.RegisterMessage(GetResponse)



_SCRAPERSERVICE = _descriptor.ServiceDescriptor(
  name='ScraperService',
  full_name='scraper.v1.ScraperService',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=207,
  serialized_end=281,
  methods=[
  _descriptor.MethodDescriptor(
    name='Get',
    full_name='scraper.v1.ScraperService.Get',
    index=0,
    containing_service=None,
    input_type=_GETREQUEST,
    output_type=_GETRESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_SCRAPERSERVICE)

DESCRIPTOR.services_by_name['ScraperService'] = _SCRAPERSERVICE

# @@protoc_insertion_point(module_scope)
