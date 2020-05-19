# sh-insight

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## To deploy
Make sure the data directory exists.
```
mkdir -p /var/opt/sh-insight/data/uploads
```

Allow DNS traffic on `podman0` virtual bridge.
```

```

```
docker build --tag sh-insight .
podman create --name sh-insight --publish 8200:80 --volume /var/opt/sh-insight/data:/data:Z --env-file /opt/sh-insight/.env sh-insight
cd /etc/systemd/system
podman generate systemd --name --files sh-insight
# Only need next line if you re-create the container
systemctl daemon-reload
systemctl enable --now container-sh-insight.service
```

## To manage
```
systemctl stop container-sh-insight
```


