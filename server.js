const app = require('./app')
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

// the listening part should be separated so that i can test app.js