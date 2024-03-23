FROM node:18.12.0-alpine

ENV URI https://api.custody.onyze.com/v1/stats/generate-stats/
# ENV PASSWORD myQc7RScUz082aI
# ENV USER 1oEqK-6Id
ENV BASIC MW9FcUstNklkOm15UWM3UlNjVXowODJhSQ==

WORKDIR /srv/service

CMD wget --tries=1 --post-data ''  --header="Authorization: Basic ${BASIC}" ${URI} || echo "No works ${URI}"
