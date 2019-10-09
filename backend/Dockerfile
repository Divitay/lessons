FROM node:12-alpine as base

WORKDIR /app
COPY package*.json ./


FROM base AS dependencies

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=development


FROM base AS common

COPY . .
EXPOSE 3000
CMD node ./app/api/index.js


FROM common AS development

COPY --from=dependencies /app/node_modules ./node_modules
