// Server entry point — creates and starts the Express application

import { createApp } from './app';
import { SERVER_PORT } from './constants/app.constants';

const startServer = (): void => {
  const app = createApp();

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
    console.log(`Products API: http://localhost:${SERVER_PORT}/api/products`);
  });
};

startServer();
