FROM python:3.6-slim

RUN apt -y update
RUN apt -y upgrade
RUN apt install -y build-essential
RUN apt install manpages-dev

WORKDIR /usr/src/app

RUN mkdir scraper

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./scraper ./scraper

CMD ["python", "-m", "scraper"]