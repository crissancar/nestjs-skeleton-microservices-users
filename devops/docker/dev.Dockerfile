FROM node:18.12.0-alpine

WORKDIR /srv/service

ENV TMPDIR "../../artifacts/tmp"

RUN ["pwd"]

RUN ["ls", "-lash"]

CMD ["npm", "run", "start:dev"]
