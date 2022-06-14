FROM node as node
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/app /usr/share/nginx/html

# docker run -d -p 80:80 92c30433e989
# docker build -t dockaws-app .
# docker start loving_driscoll
# docker tag 92c3 julianshaw2000/dockaws-app
# docker push julianshaw2000/dockaws-app
