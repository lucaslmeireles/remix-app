FROM node:20-alpine
WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install
COPY ./ .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
RUN npx prisma generate
CMD ["npm", "run" ,"start"]