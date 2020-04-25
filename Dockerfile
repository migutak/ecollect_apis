FROM oraclelinux:7-slim

ARG release=19
ARG update=5
RUN useradd -ms /bin/bash oracle

RUN yum -y install curl \
&& curl --silent --location https://rpm.nodesource.com/setup_10.x | bash - \
&& yum -y install nodejs \
&& yum clean all \
&&  yum -y install oracle-release-el7 && yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
     rm -rf /var/cache/yum && \
     yum clean all

USER oracle
RUN mkdir -p /home/oracle/ecollect_apis
WORKDIR /home/oracle/ecollect_apis
COPY --chown=oracle . .
RUN npm install --only=production
# CMD ["sqlplus", "-v"]
EXPOSE 8000
CMD ["node","."]

# docker build -t 52.117.54.217:5000/ecollect_apis:2.0.0 -f dockerFile-oracleClient . 
# docker build -t 172.16.19.151:5000/ecollect_apis:2.0.0 -f dockerFile-oracleClient . 
# docker run -it --name apis -p 8000:8000 migutak/ecollect_apis:2.0.0