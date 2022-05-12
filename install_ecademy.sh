#!/bin/bash
mkdir ~/files
mkdir E-Cademy
cat >> E-Cademy/docker-compose.yml << EOF
version: '3.8'
services:
  mysqldb:
    image: yobasystems/alpine-mariadb:latest
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
      - db:/var/lib/mysql
    ports:
      - 3306:3306
    networks:
      network:
        ipv4_address: 172.18.0.3

    environment:
      - MYSQL_ROOT_PASSWORD=ayaptj
      - MYSQL_PASSWORD=prueba@1A
      - MYSQL_DATABASE=academia
      - MYSQL_USER=adminacad
      
  app:
    image: pibol/ecademy:latest
    depends_on:
      - mysqldb
    #build: ./
    restart: unless-stopped
    #env_file: ./.env
    ports:
      - 3000:3000
    networks:
      network:
        ipv4_address: 172.18.0.2
    environment:
      - DB_HOST=mysqldb
      - DB_USER=adminacad
      - DB_PASSWORD=prueba@1A
      - DB_NAME=academia
      - DB_PORT=3306
    stdin_open: true
    tty: true
    volumes:
      - /files:/home/node/app/src/public/files/documentos/
volumes: 
  db:
networks:
    network:
        ipam:
          config:
            - subnet: "172.18.0.0/16"

EOF
cd E-Cademy
docker-compose up -d
docker cp e-cademy_app_1:/home/node/app/BD/academia.sql ~/
docker cp ~/academia.sql e-cademy_mysqldb_1:/
