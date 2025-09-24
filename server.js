const express = require('express'); 
const app = express();

require('dotenv').config(); // ✅ Load env variables early

// ✅ Middleware (must come before routes)
app.use((req, res, next) => {
    if (req.method === 'DELETE') return next(); // skip parsing
    express.json()(req, res, next);
});

app.use(express.urlencoded({ extended: true })); // Parses form data
const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));// Swagger UI
// ✅ MongoDB connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// ✅ Custom DB connector (if used elsewhere)
const mongodb = require('./db/connect');

// ✅ All of our Routes
const routes = require('./routes');
app.use('/', routes);

// ✅ Root route
app.get('/', (req, res) => {
    res.send('Hello from the server! Write /users to see the users route, and write /contacts to see the contacts route.');
});

// ✅ 404 handler (after all routes)
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});

// ✅ Start server after DB is ready
const port = process.env.PORT || 8080;
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
        });
    }
});
