const configuration = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  clerk: { apiKey: process.env.CLERK_API_KEY },
  database: {
    name: process.env.DB_DATABASE,
    uri: process.env.DB_URI,

    auth: {
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    },

    certs: {
      ssl: true,
      sslValidate: true,
      sslKey: 'X509-cert.pem',
      sslCert: 'X509-cert.pem',
      authMechanism: 'MONGODB-X509',
    },
  },
  queue: {
    url: process.env.HUB_QUEUE_URL,
    name: process.env.HUB_QUEUE_NAME,
  },
});

export default configuration;
