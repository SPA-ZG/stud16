const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const port = 8080;  // Adjust the port as needed

// Serve static files from the 'public' directory
app.use(express.static('public', { extensions: ['html'] }));

// Use connect-history-api-fallback middleware to redirect all requests to index.html
app.use(history());

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
