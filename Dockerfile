FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y v4l-utils alsa-utils ffmpeg libc6

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN rm -rf node_modules
RUN npm install
RUN npm rebuild @serialport/bindings

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

VOLUME /var/videos

EXPOSE 4000
CMD [ "npm", "start" ]