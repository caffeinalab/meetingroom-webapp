FROM node:9-alpine
WORKDIR /app
ENTRYPOINT /app/entrypoint.sh
EXPOSE 3000
EXPOSE 3001
RUN apk --update add netcat-openbsd nano
COPY ./package*.json ./
RUN npm i 
COPY ./client/package*.json ./client/
RUN cd client && npm i 
COPY . .
RUN cd client && npm run build