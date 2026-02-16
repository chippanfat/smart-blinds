# RabbitMQ TLS Setup

This directory contains the configuration for RabbitMQ with TLS enabled using mkcert.

## Directory Structure

```
rabbitmq/
├── certs/                    # TLS certificates (git-ignored)
│   ├── ca-cert.pem          # CA root certificate
│   ├── server-cert.pem      # Server certificate
│   └── server-key.pem       # Server private key
├── rabbitmq.conf            # RabbitMQ configuration
├── .gitignore
└── README.md
```

## Initial Setup

If you don't have the certificates yet, generate them:

```bash
# Make sure mkcert is installed
brew install mkcert

# Generate certificates
cd /path/to/smart-blinds
mkdir -p rabbitmq/certs
cd rabbitmq/certs

# Generate server certificates
mkcert -cert-file server-cert.pem \
       -key-file server-key.pem \
       localhost rabbitmq queue smart-blind-queue 127.0.0.1 ::1

# Copy CA certificate
cp "$(mkcert -CAROOT)/rootCA.pem" ca-cert.pem
```

## Configuration

The RabbitMQ container is configured with:

- **TLS AMQP**: Port 5671 (amqps://)
- **Non-TLS AMQP**: Port 5672 (amqp://) - for backward compatibility
- **TLS Management**: Port 15671 (https://)
- **Non-TLS Management**: Port 15672 (http://)

## Connection URLs

### With TLS (Recommended)
```
amqps://root:example@localhost:5671
```

### Without TLS (Development only)
```
amqp://root:example@localhost:5672
```

## Accessing Management UI

### With TLS
```
https://localhost:15671
```

### Without TLS
```
http://localhost:15672
```

**Default credentials:**
- Username: `root`
- Password: `example`

## Troubleshooting

### Certificate Issues

If you get certificate errors, ensure:
1. mkcert CA is installed: `mkcert -install`
2. Certificates are properly mounted in docker-compose.yml
3. The hub service has access to the CA certificate

### Connection Refused

If connections fail:
1. Check RabbitMQ logs: `docker logs smart-blind-queue`
2. Verify ports are exposed in docker-compose.yml
3. Ensure the correct URL scheme (amqps:// for TLS, amqp:// for non-TLS)

### Browser Warnings

When accessing the management UI via HTTPS, you may see a browser warning. This is normal with mkcert certificates. Click "Advanced" and proceed to the site.
