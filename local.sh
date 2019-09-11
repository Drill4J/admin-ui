#!/bin/bash -x
docker-compose -f ./docker-compose.local.yml pull && docker-compose -f ./docker-compose.local.yml up -d
