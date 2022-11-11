FROM nginx:1.19.6

WORKDIR /var/www

RUN apt-get update \
    && apt-get install -y cron bash wget certbot \
    && apt-get update -y \
    && mkdir -p ./certbot ./scripts \
    && rm -f /etc/nginx/conf.d/default.conf \
    && rm -f /etc/cron.d/certbot

WORKDIR /var/www/scripts

COPY *.sh .
RUN chmod +x ./*.sh


# This installs a Crontab entry which 
# runs "certbot renew" on several days a week at 03:22 AM

RUN echo "22 03 * * 2,7 root /scripts/renew.sh" >/etc/cron.d/certbot-renew

# Run both nginx and cron together
CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]