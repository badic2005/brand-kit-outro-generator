FROM node:latest as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
