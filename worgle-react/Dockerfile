FROM node:14-alpine as build
WORKDIR /worgle-react
COPY package*.json .
RUN npm install --production
COPY . .
RUN npm run build


FROM node:14-alpine
WORKDIR /worgle-react
COPY --from=build /worgle-react/build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000
