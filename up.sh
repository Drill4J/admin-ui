#!/bin/bash -x

if [ -n "$1" ]
then
    docker-compose -f ./docker-compose.yml -f "./docker-compose.$1.yml" -p "$1" up -d
else
    docker-compose -p dev up -d
fi
