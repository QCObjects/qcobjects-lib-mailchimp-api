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

Package("org.quickcorp.qcobjects.cli.commands.version",[
  Class("CommandHandler",{
    switchCommander:null,
    syncGit: function (versionString,commitMsg, syncNpm = false){
      let _commands_ = [];
      if (syncNpm){
        _commands_ = _commands_.concat(
          [
            "git fetch --tags -f",
            `npm version "${versionString}" -m "${commitMsg}"`
          ]
        );
      }
      _commands_ = _commands_.concat(
        [
          `git add . && git commit -am "${commitMsg}"`,
          "git fetch origin --tags",
          "git tag -ln"
        ]);

      if (!syncNpm){
        _commands_ = _commands_.concat(
          [
            `git tag -a "v${versionString}" -m "${commitMsg}"`,
          ]
        );
      }

      _commands_ = _commands_.concat([
          "git push && git push --tags"
        ]
      );

      this.switchCommander.shellCommands(_commands_).then(function (response){
        logger.info("Synced to Git");
        logger.debug(response);
      }).catch (function (e){
        logger.info("Something went wrong trying to sync to git");
        logger.debug(e);
      });
    },
    parseVersionString: function (versionString){
      versionString = versionString.replace("\n","");
      let regexpVer = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
      let versionObject = {...versionString.match(regexpVer).groups};
      return versionObject;
    },
    getVersionStringFromFile: function (filename){
      let versionString;
      try {
        versionString = fs.readFileSync(filename).toString().replace("\n","");
      } catch (e){
        versionString = "0.0.1";
      }
      return versionString;
    },
    buildNewSemVersionString: function ({major,minor,patch}){
      return `${major}.${minor}.${patch}`;
    },
    parseVersionSuffix: function (versionString){
      versionString = versionString.replace("\n","");
      let versionObject = this.parseVersionString(versionString);
      let semVersionString = this.buildNewSemVersionString(versionObject);
      return versionString.replace(semVersionString,"");
    },
    buildNewVersionString: function ({major,minor,patch},suffix){
      let semVersionString = this.buildNewSemVersionString({major,minor,patch});
      return `${semVersionString}${suffix}`;
    },
    saveNewVersionFile: function (filename,versionString){
      fs.writeFileSync(filename,versionString);
    },
    choiceOption:{
      v_major: function (filename,options){
        filename = (typeof filename === "undefined")?("VERSION"):(filename);
        let versionString = this.getVersionStringFromFile(filename);
        let versionSuffix = this.parseVersionSuffix(versionString);
        let versionObject = this.parseVersionString(versionString);
        let major = parseInt(versionObject.major);
        let minor = parseInt(versionObject.minor);
        let patch = parseInt(versionObject.patch);
        let newVersion = this.buildNewVersionString({major:major+1,minor:minor,patch:patch},versionSuffix);
        this.saveNewVersionFile(filename,newVersion);
        if (options.syncGit){
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion,commitMsg, options.syncNpm);
        }
      },
      v_minor: function (filename,options){
        filename = (typeof filename === "undefined")?("VERSION"):(filename);
        let versionString = this.getVersionStringFromFile(filename);
        let versionSuffix = this.parseVersionSuffix(versionString);
        let versionObject = this.parseVersionString(versionString);
        let major = parseInt(versionObject.major);
        let minor = parseInt(versionObject.minor);
        let patch = parseInt(versionObject.patch);
        let newVersion = this.buildNewVersionString({major:major,minor:minor+1,patch:patch},versionSuffix);
        this.saveNewVersionFile(filename,newVersion);
        if (options.syncGit){
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion,commitMsg, options.syncNpm);
        }
      },
      v_patch: function (filename,options){
        filename = (typeof filename === "undefined")?("VERSION"):(filename);
        let versionString = this.getVersionStringFromFile(filename);
        let versionSuffix = this.parseVersionSuffix(versionString);
        let versionObject = this.parseVersionString(versionString);
        let major = parseInt(versionObject.major);
        let minor = parseInt(versionObject.minor);
        let patch = parseInt(versionObject.patch);
        let newVersion = this.buildNewVersionString({major:major,minor:minor,patch:patch+1},versionSuffix);
        this.saveNewVersionFile(filename,newVersion);
        if (options.syncGit){
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion,commitMsg, options.syncNpm);
        }
      },
      v_sync: function (filename, options){
        filename = (typeof filename === "undefined")?("VERSION"):(filename);
        var commandHandler = this;
         commandHandler.switchCommander.shellCommands([
           "echo $(git describe)"
         ]).then(function (response){
           let versionString = response[0].split("-")[0].slice(1).replace("\n","");
           console.log(versionString);
           let versionSuffix = commandHandler.parseVersionSuffix(versionString);
           let versionObject = commandHandler.parseVersionString(versionString);
           let major = parseInt(versionObject.major);
           let minor = parseInt(versionObject.minor);
           let patch = parseInt(versionObject.patch);
           let newVersion = commandHandler.buildNewVersionString({major:major,minor:minor,patch:patch},versionSuffix);
           commandHandler.saveNewVersionFile(filename,newVersion);
           var commitMsg = options.commitMsg || `Synced Version v${newVersion}`;
           commandHandler.switchCommander.shellCommands(
             [
               "git fetch --tags -f",
               `git add . && git commit -am "${commitMsg}"`,
               "git fetch origin --tags",
               "git tag -ln",
               `npm version "${newVersion}" --allow-same-version -m "${commitMsg}"`,
               "git push && git push --tags"
             ]
            ).then(function (response){
              console.log(response);
            });
         });
      },
      v_changelog: function (){
        let commandHandler = this;
        commandHandler.switchCommander.shellCommands(
          [
            "git tag -ln"
          ]
         ).then(function (response){
           var versionTags = response[0].split("\n").map(tag=>tag.split(" ").unique()).unique().map(
             tag=>{return {
               "version":tag[0],
               "major":tag[0].split(".")[0],
               "minor":tag[0].split(".")[0]+"."+tag[0].split(".")[1],
               "description":tag.slice(1).join(" ").trim()
             };}
           );
           var minorVersionTags = versionTags.filter(tag=>tag.version!=="").map(tag=>tag.version.split(".")[0] +"."+ tag.version.split(".")[1]).unique();
           var majorVersionTags = versionTags.filter(tag=>tag.version!=="").map(tag=>tag.version.split(".")[0]).unique();
           var history = minorVersionTags.map(minor=>{
             return {
               "major":minor.split(".")[0],
               "minor":minor,
               "history":"\n\t- "+versionTags.filter(tag=>tag.minor===minor).map(
                 function (tag){
                   return tag.description;
                 }
               ).filter(desc=>!desc.startsWith(minor.slice(1))).sort().unique().join("\n\t- ")
             };
           }).map(hist=>{return `## ${hist.major} -> ${hist.minor}` + "\n" + hist.history;}).join("\n");
           let subtitle = "This is an automatic Changelog history of versions generated using the command: **qcobjects v-changelog > CHANGELOG.md**";
           console.log("# Changelog \n\n"+subtitle+"\n\n"+history);

         });
      }
    },
    _new_({switchCommander}){
      let commandHandler = this;
      this.switchCommander = switchCommander;

      switchCommander.program.command("v-major [filename]")
        .option("--git, --sync-git", "Sync with Git")
        .option("--npm, --sync-npm", "Sync with NPM")
        .option("-m, --commit-msg [message]", "Commit Message")
        .description("Semantic Versioning: Upgrade to a new major version")
        .action(function(args, options){
            commandHandler.choiceOption.v_major.call(commandHandler,args,options);
        });
      switchCommander.program.command("v-minor [filename]")
        .option("--git, --sync-git", "Sync with Git")
        .option("--npm, --sync-npm", "Sync with NPM")
        .option("-m, --commit-msg [message]", "Commit Message")
        .description("Semantic Versioning: Upgrade to a new minor version")
        .action(function(args, options){
            commandHandler.choiceOption.v_minor.call(commandHandler,args,options);
        });

      switchCommander.program.command("v-patch [filename]")
        .option("--git, --sync-git", "Sync with Git")
        .option("--npm, --sync-npm", "Sync with NPM")
        .option("-m, --commit-msg [message]", "Commit Message")
        .description("Semantic Versioning: Upgrade to a new patch version")
        .action(function(args, options){
            commandHandler.choiceOption.v_patch.call(commandHandler,args,options);
        });

      switchCommander.program.command("v-sync [filename]")
        .option("-m, --commit-msg [message]", "Commit Message")
        .description("Semantic Versioning: Sync the version of NPM with version of GIT")
        .action(function(args, options){
            commandHandler.choiceOption.v_sync.call(commandHandler,args,options);
        });

      switchCommander.program.command("v-changelog")
        .description("Semantic Versioning: Shows a changelog using Semantic Versioning")
        .action(function(args, options){
            commandHandler.choiceOption.v_changelog.call(commandHandler,args,options);
        });

    }
  })
]);
