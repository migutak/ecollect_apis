FROM oraclelinux:8-slim

LABEL "provider"="Oracle"                                               \
  "issues"="https://github.com/oracle/docker-images/issues"

ARG release=19
ARG update=9

RUN  microdnf install oracle-release-el8 && \
  microdnf install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
  microdnf install nodejs &&\
  microdnf install iputils telnet -y &&\
  microdnf clean all

#RUN useradd -ms /bin/bash  node

WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production
COPY . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8000

EXPOSE ${PORT}
CMD [ "node", "." ]
# docker build -t migutak/ecollect_apis:5.3 .