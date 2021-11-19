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

```
MAILCHIMP_API_KEY
MAILCHIMP_API_SERVER
MAILCHIMP_API_LIST
```

3. In the code of your microservice, you can import the module using the Import function

```javascript
  Import ("qcobjects-lib-mailchimp-api");
```

5. Usage instructions: 
  
  Inside the microservice function you can use the following code:

```javascript
let microservice = this; // this is the microservice instance

  Promise.all (
    CONFIG.get("mailchimp_api").map(
      api => mailchimpApi.subscribe(
        mailchimpApi.parseApi(api).apiKey,
        mailchimpApi.parseApi(api).server,
        mailchimpApi.parseApi(api).listId,
        formData
      ))
  ).then (() => {
    microservice.done();
  }).catch(e => {
    logger.debug(e.toString());
  });
```

Learn more about MailChimp official API in the [MailChimp Documentation website](https://mailchimp.com/developer/marketing/api/)

This lib is based on the official MailChimp API (https://github.com/mailchimp/mailchimp-marketing-node)

6. Test the integration

```shell
npm test
```

7. Start the QCObjects HTTP2 Server

```shell
qcobjects-server
```
If you haven't installed QCObjects before, learn more about [Installing QCObjects here](https://docs.qcobjects.org/#installing)
