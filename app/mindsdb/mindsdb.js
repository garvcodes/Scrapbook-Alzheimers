import MindsDB from 'mindsdb-js-sdk';

// NOTE: If you're using CommonJS module syntax instead of ES6 imports:
// const MindsDB = require("mindsdb-js-sdk").default;

try {
  await MindsDB.connect({
    user: 'garv5114@gmail.com',
    password: 'Garvsoham1115!'
  });
} catch(error) {
  // Failed to authenticate.
}

