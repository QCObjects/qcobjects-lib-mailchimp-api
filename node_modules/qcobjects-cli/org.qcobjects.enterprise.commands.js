/**
 * QCObjects CLI 2.3.x
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
"use strict";
const fs = require("fs");
const path = require("path");
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+"/";
const templatePwaPath = path.resolve( __dirname, "./templates/pwa/" )+"/";
const package_config = require(absolutePath+"/package.json");
const { exec,execSync } = require("child_process");

Class ("QCObjectsEnterprise", {
  install (switchCommander) {
    let instance = this;
    return instance.installEnterprise(license, email);
  },
  upgrade (switchCommander){
    let instance = this;
    const readline = require("readline");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var emailQuestion = function (){
      rl.question(`
  [NOTE: No information will be sent to a server until I got your consent]

  Please tell me your e-Mail (\u{1F48C}):
  `, (email) => {
        const asterisk = "*";
        if (email !== ""){
          var phoneNumberQuestion = function (){
            rl.question ("Please tell me your phone number (\u{1F919}): \n", (phonenumber) => {
              if (phonenumber !== ""){
                rl.question (`
  Please select one of the following options (type a number):

  1.- \u{1F640} This is your first interaction \u{1F60D} with QCObjects Enterprise Edition \u{1F3E2},
  you want to send your email and phone number to one of our executives to process your
  inquiry, pay the license (when aplies) and receive a new fresh license number
  that will free up to you the most advanced features for large companies

  2.- \u{2714} Your assigned executive \u{1F9D1} has given to you a new fresh QCObjects Enterprise Edition License Number
  and you want to enter it to follow up with the next steps.

  3.- \u{1F3C3} You want to quit this form, as you got here accidentally
  (You should think about it. It's not a coincidence, It's destiny \u{1F600}).

  Please enter the number of the option and press [enter]: `, (interaction_option)=> {
                  logger.infoEnabled=true;

                  switch (interaction_option) {
                    case "1":
                      switchCommander.register(email,phonenumber).then(function (response){
                        logger.info(`\u{1F44F} Congrats! You have been successfully registered to the cloud! \u{1F44F}
  One of our executives will be in touch with you as soon as possible to give you the next steps
  to get a new License Number and start using QCObjects Entrprise Edition!

  (In the meantime, you can continue using all the features of the QCObjects Community Edition)
  `);
                        rl.close();
                      }).catch ((e)=>{
                        rl.close();
                      });
                      break;
                    case "2":
                      rl.stdoutMuted = true;
                      rl._writeToOutput = function _writeToOutput(stringToWrite) {
                        if (rl.stdoutMuted)
                          rl.output.write("*");
                        else
                          rl.output.write(stringToWrite);
                      };
                      rl.question("Please tell me the number of license that your executive has given to you: \n", (license) => {
                        rl.stdoutMuted = false;
                        instance.installEnterprise(license, email);

                        rl.close();
                      });

                      break;
                    default:
                      logger.info("\u{1F937} You can continue to use QCObjects Community Edition, see you! \u{1F64B} ");
                      rl.close();
                      break;
                  }

                });

              } else {
                console.log(`You need to enter a Phone Number if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
                phoneNumberQuestion();
              }
            });
          };
          phoneNumberQuestion();

        } else {
          console.log(`You need to enter a real e-Mail adress if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
          emailQuestion();
        }
      });

    };
    emailQuestion();

  },
  installEnterprise (license, email) {
    const asterisk = "*";
    var license = CONFIG.get("enterprise-license", license);
    var email = CONFIG.get("enterprise-email", email);

    logger.info(`Your entered license number is ${asterisk.repeat(license.length)} and the email that you have entered is ${email}`);
    logger.info("Now, I'm installing QCObjects Enterprise Edition in your computer...");
    let cmdDownloadGit = `npm i --force -g git+https://license:${license}@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git`;
    exec(cmdDownloadGit,(err,stdout,stderr)=>{
      if(!err){
        exec("qcobjects --version",(err,stdout,stderr)=>{
          if (stdout.lastIndexOf("Enterprise Edition")!==-1){
            logger.info("\u{1F44F} Congrats! Now you have installed QCObjects Entrprise Edition! \u{1F44F}");
            logger.info(`You can test it using:
> qcobjects --version

To find more help, type the command:

> qcobjects --help

Enjoy!
`);
          } else {
            console.log("\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition");
            console.log("Ask your executive to help");
          }
        });

      } else {
        console.log("\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition");
        if (stderr.lastIndexOf("Authentication failed")!==-1){
          console.log("Please ask to your executive for the right license number");
        } else {
          console.log(stderr);
        }
      }
    }).stdout.on("data", function(data) {
        console.log(data);
    });

  }

})
