#use the official node js image
FROM node:18

# set the working directory in he container
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install


COPY . .

# Expose the backend port
EXPOSE 5000

CMD [ "npm","start" ]