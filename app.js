const express = require(`express`);
// const inputValidation = require('./input_validation')

const app = express ();

// app.use(express.json({type: 'application/vnd.api+json'}));
// app.use(express.urlencoded({ extended: true })); 

// Allow for POST method and application/vnd.api+json Content-Type and Accept field
app.use((req, res, next) => {
    if (['GET'].includes(req.method)) {
        // Check Content-Type
        if (req.get('Content-Type') !== 'application/vnd.api+json') {
            return res.status(415).send({
                "errors": [
                    {
                        "status": "415",
                        "code": "unsupported-media-type",     
                        "title": "Unsupported Media Type",
                        "detail": "Content-Type must be application/vnd.api+json"
                    }
                ]
            });
        }
        // Check Accept
        if (req.get('Accept') !== 'application/vnd.api+json') {
          return res.status(406).send({
              "errors": [
                  {
                      "status": "406",
                      "code": "not-acceptable",     
                      "title": "Not Acceptable",
                      "detail": "Accept header must be application/vnd.api+json"
                  }
              ]
          });
      }
    } else {
      return res.status(405).send({
        "errors": [
            {
                "status": "405",
                "code": "method-not-allowed",     
                "title": "Method not allowed",
                "detail": "Request metod MUST be GET"
            }
        ]
    });
  }
    next();
});

// set response Content-Type to be 'application/vnd.api+json'
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/vnd.api+json');
  next();
});

app.get('/api/:date?',  (req,res) => {

  let date;

  if (! req.params.date) {
    date = new Date();  
  } else {
    // Date need an Integer with the UNIX time in milliseconds
    date = new Date(parseInt(req.params.date));
    if (isNaN(date)) {
      return res.status(400).send({
        "errors": [
          {
            "status": "400",
            "code": "invalid-date",          
            "title": "Invalid date",
            "detail": "The date provided is not in a valid format [UNIX timestamp expected]"
          }
        ]
      });
    }
  }
  res.status(200).json({
    "data": {
        "type": "date",
        "id": `date-${date.getTime()}`,
        "attributes": {
            "unix": `${date.getTime()}`,
            "utc": `${date.toUTCString()}`
        }
    }
  });
});

// Centralized error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      "errors": [
        {
          "status": `${error.status}`,
          "code": `${error.message}`,          
          "title": `${error.message}`
        }
      ]
  });
});

// Export the app instance for testing
module.exports = app;