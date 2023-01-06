const configuration = () => ({
  clerk: { apiKey: process.env.CLERK_API_KEY },
  database: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
});

export default configuration;
