FROM node:12.13.1-alpine AS Builder
WORKDIR /tmp

COPY common/ ./common/
COPY server/ ./server/
COPY ui/ ./ui/
COPY .eslintrc.js ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install \
 && cd ui \
 && yarn build \
 && cd ../server \
 && yarn build

FROM node:12.13.1-alpine
ARG DATA_DIR=/data

WORKDIR /app

COPY package.json ./
COPY --from=Builder /tmp/node_modules/ ./node_modules/
COPY --from=Builder /tmp/server/node_modules ./server/node_modules/
COPY --from=Builder /tmp/dist/ ./dist/
COPY --from=Builder /tmp/build/common/ ./common/
COPY --from=Builder /tmp/build/server/src/ ./server/
COPY --from=Builder /tmp/server/package.json ./server

ENV PORT 80
ENV PUBLIC_DIR /app/dist
ENV DATA_DIR "${DATA_DIR}"

EXPOSE 80
VOLUME ${DATA_DIR}

WORKDIR /app/server

CMD [ "node", "--require", "dotenv/config", "--require", "module-alias/register", "main.js" ]
