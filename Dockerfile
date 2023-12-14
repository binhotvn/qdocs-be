
FROM node:18-alpine as development
WORKDIR /app
COPY package.json ./
COPY private_key ./private_key

RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:18-alpine as build
WORKDIR /app
COPY . .
COPY --from=development /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:18-alpine as production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=development /app/private_key ./private_key
# RUN mkdir /app/private_key/
RUN apk add --no-cache openssh-client  # Install openssh-client package

# RUN ssh-keygen -q -t rsa -N '' -f ./private_key/key_for_jwt
COPY --from=build /app/node_modules ./node_modules

CMD [ "yarn", "start:prod" ]