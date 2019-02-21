#!/bin/bash -x

if [ -n "$1" ]
then
    docker-compose -f ./docker-compose.yml -f "./docker-compose.$1.yml" -p "$1" build
else
    docker-compose -p dev build
fi
