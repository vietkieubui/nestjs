FROM node:16-alpine as BUILD

WORKDIR /server
COPY ["package.json", "nest-cli.json", "tsconfig.build.json", "tsconfig.json", "/server/"]
RUN yarn 
COPY ["src", "/server/src/"]
COPY [".env", "/server/"]

CMD [ "yarn", "start:dev" ]
EXPOSE 8080
