FROM alpine:latest

ARG PB_VERSION=0.22.21

RUN apk add --no-cache \
    unzip \
    ca-certificates

# Téléchargement et installation de PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN rm /tmp/pb.zip

EXPOSE 8080

# Démarrage de PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]