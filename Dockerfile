FROM node:12.9.1-slim

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1 unzip
# Set to a non-root built-in user `node`
#RUN usermod -aG sudo node
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app
# Bundle app source code
COPY --chown=node . .
 
RUN mkdir /home/node/oracle \
&& unzip instantclient-basic-linux.x64-19.6.0.0.0dbru.zip -d /home/node/oracle \
&& rm -f oracle-instantclient19.6*
ENV LD_LIBRARY_PATH=/home/node/oracle/instantclient_19_6:$LD_LIBRARY_PATH
RUN npm install --only=production 
# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8000

EXPOSE ${PORT}
CMD [ "node", "." ]

