FROM node:18

WORKDIR /app

COPY backend/package*.json ./

RUN yarn

COPY Server/ ./

COPY Customer/package*.json ./Customer/

RUN cd Customer && yarn

COPY Customer/ ./Customer/

COPY Client/package*.json ./Client/

RUN cd Client && yarn

COPY Client/ ./Client/

ENV MONGO_URL mongodb+srv:
ENV JWT_SECRET fasdmasklmsadsklaijsadl3849oa
ENV OPENAI_API_KEY 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

ENV CLIENT_ID 1040916026699-bo48igg5cqljc4gvp1jvt4f1au9gt90d.apps.googleusercontent.com
ENV CLIENT_SECRET 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
ENV CLIENT_URL http:

ENV STRIPE_KEY sk_test_51MjFDXE3V7A3gKYDYfZJtkn1IiopwYaWegOpmwQRcvKmgRrbL48WrEuHEHVnzvVl59CLE3AqA7WVFhdz8mwQuhL800VtOx3JRN
ENV STRIPE_PUBLISHABLE_KEY pk_test_51MjFDXE3V7A3gKYDSBSQoeiT0bWVwtfcx6XSZbGumfmId83KDFvGUsR5zQxOAXXWg423OTtcoRIaZqCuzw07mFOs00pwMhsnc5

EXPOSE 4000

CMD ["npm", "start"]