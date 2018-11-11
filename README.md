# api-base
A starting point for node/express apis

## dotenv
A dotenv file will need to be added, preferably with the following values and can be adjusted as needed:

### base 
| key | value |
| --- | --- |
| PROD | true/false |
| LETSENCRYPT_FULLCHAIN | lets encrypt fullchain key |
| LETSENCRYPT_PRIV | lets encrypt private key |

### postgres
| key | value |
| --- | --- |
| PG_HOST | db host name |
| PG_PORT | db port # |
| PG_DB | db name |
| PG_USER | username |
| PG_PWD | password |