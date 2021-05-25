FROM oraclelinux:7-slim as builder

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs && \
     rm -rf /var/cache/yum

# Get a new image
FROM node:12-buster-slim

# Copy the Instant Client libraries, licenses and config file from the previous image
COPY --from=builder /usr/lib/oracle /usr/lib/oracle
COPY --from=builder /usr/share/oracle /usr/share/oracle
COPY --from=builder /etc/ld.so.conf.d/oracle-instantclient.conf /etc/ld.so.conf.d/oracle-instantclient.conf

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y libaio1 && \
  apt-get -y autoremove && apt-get -y clean && \
  ldconfig

#RUN useradd -ms /bin/bash  node

WORKDIR /home/node/app
RUN chown node:node -R /home/node/app
USER node
# Install app dependencies
COPY --chown=node package*.json ./
RUN npm install --production
COPY --chown=node . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8000

EXPOSE ${PORT}
CMD [ "node", "." ]
# docker build -t migutak/ecollect_apis:4.2 .