const app = require('./app');
const port = 3030;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Path: backend/app.js
// Compare this snippet from backend/routes/index.js:
