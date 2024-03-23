#!/bin/bash
registry=registry.gitlab.com/kubide-crew/skeleton/skeleton-api
tag=DEV

# Docker build and docker push to registry
docker build -f docker/pro.Dockerfile . -t $registry:"$tag" && docker push $registry:"$tag"
