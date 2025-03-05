# Timestamp Microservice

This microservice provides an API that converts a given date into Unix and UTC timestamp formats.

## Endpoints

### 1. `/api/:date?`

- **GET** request with an optional `date` parameter.

### Responses:

- **Valid Date:**
  - A JSON object with two properties:
    - `unix`: Unix timestamp of the input date in milliseconds.
    - `utc`: UTC string representation of the input date in the format: `Thu, 01 Jan 1970 00:00:00 GMT`.
  
    Example:
    - Request: `/api/1451001600000`
    - Response: 
      ```json
      {
        "data":{
            "type": "date",
            "id": "date-1451001600000"
            "attributes": {
                "unix": 1451001600000,
                "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
            }
        }
      }
      ```

- **Empty Date Parameter:**
  - If no date is provided, the API will return the current timestamp in both `unix` and `utc` formats.

- **Invalid Date:**
  - If the input date is invalid, the API returns an object with the error message:
    ```json
    {
        "errors": [
          {
            "status": "400",
            "code": "invalid-date",          
            "title": "Invalid date",
            "detail": "The date provided is not in a valid format [UNIX timestamp expected]"
          }
        ]
    }
    ```

## Notes

- The API supports dates that can be parsed by JavaScript's `new Date(date_timestamp)`.
- The timestamp values are returned in **milliseconds**.