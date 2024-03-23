FROM node:20.11.0-alpine

COPY ./ /srv/service
WORKDIR /srv/service

ENV TERM "xterm-256color"
ENV TMPDIR "../../artifacts/tmp"

# Show Kubide debugs
ENV FORCE_COLOR 1
ENV DEBUG_COLORS "true"
ENV DEBUG "kubide*"
ENV ENV_KEY "KUBIDE"
ENV KUBIDE_sites_api_port "80"

RUN npm install

RUN npm run build

CMD npm run start
