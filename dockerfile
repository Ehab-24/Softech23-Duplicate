FROM node:18

WORKDIR /

COPY Server/package*.json ./
RUN yarn

COPY Server/ ./

COPY Customer/package*.json ./Customer/
RUN cd Customer && yarn
COPY Customer/ ./Customer/

COPY Client/package*.json ./Client/
RUN cd Client && yarn
COPY Client/ ./Client/

EXPOSE 4000
EXPOSE 5173

CMD ["yarn", "dev"]

RUN cd Customer
CMD ["yarn", "dev"]
