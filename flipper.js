if (__DEV__) {
    const { connectToDevTools } = require('react-devtools-core');
    connectToDevTools({
      host: 'localhost',
      port: 8097,
    });
  }
  