/**
 * QCObjects MailchimpAPI
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
/*eslint no-unused-vars: "off"*/
/*eslint no-redeclare: "off"*/
/*eslint no-empty: "off"*/
/*eslint strict: "off"*/
/*eslint no-mixed-operators: "off"*/
/*eslint no-undef: "off"*/
/*eslint no-useless-escape: "off"*/
"use strict";
const fs = require("fs");
const path = require("path");
const absolutePath = path.resolve(__dirname, "./");
const templatesPath = path.resolve(absolutePath, "../../templates/");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");
var MAILCHIMP_API =  function () {return [...arguments].map(a=>process.env[a]).join("-");};
Processor.setProcessor(MAILCHIMP_API);

Package("com.qcobjects.backend.mailchimp",[
  Class ("MailchimpAPI", {
    microservice: null,
    parseData (formData, name) {
      return JSON.parse(formData.toString())[name];
    },

    parseApi (api) {
      return {
        apiKey: api.split("-")[0],
        server: api.split("-")[1],
        listId: api.split("-")[2]
      };
    },

    lists (apiKey, server) {
      mailchimp.setConfig({
        apiKey: apiKey,
        server: server,
      });

      const run = async () => {
        const response = await mailchimp.lists.getAllLists();
        return response;
      };
      return run ();
    },

    subscribe (apiKey, server, listId, formData, merge_fields) {
      let mailchimpApi = this;
      var email = mailchimpApi.parseData(formData, "email");

      var subscribeEmailToMailchimp = function (apiKey, server, listId, email) {
        return new Promise ( (resolve, reject) => {

          mailchimp.setConfig({
            apiKey: apiKey,
            server: server,
          });

          const subscriberHash = md5(email.toLowerCase());

          async function _subscribeToMailchimp_(email, listId, merge_fields) {
            var mailchimp_config = {
              email_address: email,
              status: "subscribed"
            };
            if (typeof merge_fields !== "undefined") {
              mailchimp_config.merge_fields = merge_fields;
            }
            try {
              const response = await mailchimp.lists.addListMember(listId, mailchimp_config);
              resolve (response);
            } catch (error) {
              reject (error);
            }
          }
          try {
            _subscribeToMailchimp_(email, listId, merge_fields);
          } catch (e) {
            reject (e);
          }
        });
      };

      return subscribeEmailToMailchimp (apiKey, server, listId, email)
      .then ((response) => {
        logger.debug(`This user ${email} is now ${response.status}.`);
      });
    },

    subscribeToAll (formData, merge_fields) {
      let mailchimpApi = this;
      return Promise.all (
        CONFIG.get("mailchimp_api").map(
          api => mailchimpApi.subscribe(
            mailchimpApi.parseApi(api).apiKey,
            mailchimpApi.parseApi(api).server,
            mailchimpApi.parseApi(api).listId,
            formData,
            merge_fields
          ))
      );
    }

  })
]);
