// Server entry point — starts Express app on the configured port.

import { app } from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api/products`);
  console.log('Press Ctrl+C to stop the server.');
});
