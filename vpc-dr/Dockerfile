FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG AWS_REGION=us-east-2
ENV AWS_REGION=${AWS_REGION}


CMD ["npx", "aws-cdk", "deploy", "VpcStack"]
