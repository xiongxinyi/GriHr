#!/usr/bin/env bash

local_port=8080
docker_port=8080
docker_tag=vue-hr

containerId=$(docker ps -a | grep -w "${docker_tag}" | awk '{print $1}')
if [ "$containerId" != "" ] ;
then
  # 停掉容器
  docker stop "$containerId"
  # 删除容器
  docker rm "$containerId"
  echo "成功删除容器"
fi

# 查询镜像是否存在，存在则删除
imageId=$(docker images | grep -w "${docker_tag}" | awk '{print $3}')
if [ "$imageId" != "" ] ;
then
  # 删除镜像
  docker rmi -f "$imageId"
  echo "成功删除镜像"
fi

# 构建镜像
docker build . -t ${docker_tag}
echo '成功构建镜像'
# 启动容器
docker run -d -p ${local_port}:${docker_port} ${docker_tag}
echo "容器${docker_tag}已成功启动"

