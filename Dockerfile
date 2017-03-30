FROM node:4-onbuild
MAINTAINER Jeremiah_McCurdy

RUN echo 'FROM NODE Working'

# Create app directory
RUN mkdir /src
WORKDIR /src

RUN echo 'directory created'

# Bundle app source
ADD . /src

RUN echo 'files added to directory source'

RUN cd /src

RUN echo 'changed current directory to source'

RUN npm install --production --verbose

RUN echo 'node packages installed'

EXPOSE 3000

RUN echo 'port Exposed'

CMD ["node", "app.js"]

RUN echo 'application started'
