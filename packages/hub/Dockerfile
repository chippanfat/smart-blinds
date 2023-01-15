###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /var/www/hub

COPY . /var/www/hub

RUN yarn --only=production

RUN yarn build

FROM development as production

WORKDIR /var/www/hub

COPY --from=development /var/www/hub/dist /var/www/hub
COPY --from=development /var/www/hub/node_modules /var/www/hub/node_modules

COPY X509-cert.pem /var/www/hub

EXPOSE 3001

CMD ["node", "main.js"]
