# QCObjects Lib Mailchimp API

QCObjects Lib to subscribe users to a Mailchimp list using official API.

## Instructions

1. Install this dependency in your project using npm

```shell
npm i --save qcobjects-lib-mailchimp-api
```

2. In your config.json file, create the following settings

```shell
{
  "mailchimp_api": [
    "$MAILCHIMP_API(MAILCHIMP_API_KEY,MAILCHIMP_API_SERVER,MAILCHIMP_API_LIST)"
  ],
}
```

Above settings will bring the API Key values from the following environment variables:

MAILCHIMP_API_KEY
MAILCHIMP_API_SERVER
MAILCHIMP_API_LIST

Learn more about NodeMailer in the official [NodeMailer Documentation website](https://nodemailer.com/about/)

1. Test the integration

```shell
npm test
```

4. Start the QCObjects HTTP2 Server

```shell
qcobjects-server
```
If you haven't installed QCObjects before, learn more about [Installing QCObjects here](https://docs.qcobjects.org/#installing)
