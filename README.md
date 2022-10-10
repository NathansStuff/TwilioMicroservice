# Twilio Microservice

### Installation

npm install
Create an .env file based on the .env.sample file

### Routes

| What                  | Request | Params            | Endpoint                   |
| --------------------- | ------- | ----------------- | -------------------------- |
| BaseUrl (Prod)        | -       | -                 | -                          |
| BaseUrl (Dev)         | -       | -                 | -                          |
| Get Code Sent via SMS | POST    | mobilePhone       | /authentication/requestsms |
| Check SMS Code        | POST    | mobilePhone, code | /authentication/verifySMS  |

## Route & Paramaters

##### authentication/requestsms

| Param       | Type   | Requirements                 | Required or Optional |
| ----------- | ------ | ---------------------------- | -------------------- |
| mobilePhone | String | 10 digists, starting with 04 | Required             |

##### authentication/verifySMS

| Param       | Type   | Requirements                 | Required or Optional |
| ----------- | ------ | ---------------------------- | -------------------- |
| mobilePhone | String | 10 digists, starting with 04 | Required             |
| code        | String | 6 digits                     | Required             |

## Responses

The service will always return a response in JSON format. Both the dev and prod servers will return two values, `status` and `message`.

The prod server will additionally return a `verification` JSON that is directly forwarded from Twilio.

Example (note that 'secret' denotes a env variable secret)

Note: To make this application more secure, the `verification` response could be filtered to not include these secrets.

```
{
    "status": "SUCCESSFUL",
    "message": "Sending SMS code request successful",
    "verification": {
        "sid": "secret",
        "serviceSid": "secret",
        "accountSid": "secret",
        "to": "+61424746969",
        "channel": "sms",
        "status": "pending",
        "valid": false,
        "lookup": {
            "carrier": null
        },
        "amount": null,
        "payee": null,
        "sendCodeAttempts": [
            {
                "attempt_sid": "secret",
                "channel": "sms",
                "time": "2022-10-10T10:24:57.792Z"
            }
        ],
        "dateCreated": "2022-10-10T10:24:57.000Z",
        "dateUpdated": "2022-10-10T10:24:57.000Z",
        "url": "https://verify.twilio.com/v2/Services/(secret)"
    }
}
```

Status code will be according to the enum below (from /types/EVerificationResponseStatus):

```
export enum EVerificationResponseStatus {
    SUCCESSFUL = 'SUCCESSFUL',
    INCORRECT_VERIFICATION_CODE = 'INCORRECT_VERIFICATION_CODE',
    INVALID_PARAMS = 'INVALID_PARAMS',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}
```
