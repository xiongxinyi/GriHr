FROM node:lts-alpine AS Builder
WORKDIR /app
COPY package*.json ./
RUN npm install --registry=registry.npm.taobao.org
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# 用本地的配置文件替换 nginx 镜像里的默认配置
COPY deploy/default.conf /etc/nginx/conf.d/default.conf
# 将发布好的目录复制到容器 nginx 默认目录
COPY --from=Builder /app/dist /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]