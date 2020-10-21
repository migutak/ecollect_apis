FROM oraclelinux:7-slim as builder

ARG release=19
ARG update=5

RUN yum -y install oracle-release-el7
RUN yum-config-manager --enable ol7_oracle_instantclient
RUN yum -y install oracle-instantclient${release}.${update}-basiclite

RUN rm -rf /usr/lib/oracle/${release}.${update}/client64/bin
WORKDIR /usr/lib/oracle/${release}.${update}/client64/lib/
RUN rm -rf *jdbc* *occi* *mysql* *jar

# Get a new image
FROM node:12-buster-slim

# Copy the Instant Client libraries, licenses and config file from the previous image
COPY --from=builder /usr/lib/oracle /usr/lib/oracle
COPY --from=builder /usr/share/oracle /usr/share/oracle
COPY --from=builder /etc/ld.so.conf.d/oracle-instantclient.conf /etc/ld.so.conf.d/oracle-instantclient.conf

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y libaio1 && \
  apt-get -y autoremove && apt-get -y clean && \
  ldconfig

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package*.json ./

RUN npm install --production


# Bundle app source code
COPY --chown=node . .


# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8000

EXPOSE ${PORT}
CMD [ "node", "." ]
