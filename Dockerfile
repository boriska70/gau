FROM gaiaadm/nodejs:4.4.3

# use --build-arg option to pass system proxy, i.e. docker build --build-arg PROXY=http://web-proxy.israel.hp.com:8080 -t boriska70/gau .

ARG PROXY

ENV http_proxy $PROXY
ENV https_proxy $PROXY
RUN npm config set proxy $PROXY
RUN npm config set https-proxy $PROXY

# Set the working directory
WORKDIR /src

# Bundle app source
COPY . /src

RUN npm install
RUN npm install -g webpack
RUN webpack

ENV http_proxy ""
ENV https_proxy ""
RUN npm config rm proxy
RUN npm config rm https-proxy

EXPOSE  4000
CMD ["npm", "start"]