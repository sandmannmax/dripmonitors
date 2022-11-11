#!/bin/sh

mkdir -p /var/www/certbot/$1
certbot certonly --webroot -w /var/www/certbot/$1 -d $1