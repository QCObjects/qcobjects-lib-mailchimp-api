/**
 * QCObjects SDK 2.3
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
(function() {
"use strict";

Package("org.qcobjects.cloud.auth.session.usertoken",[
  Class ("SessionUserToken",Object, {
    user: {},
    __cache__: null,
    _new_ (o) {
      var __instance__ = this;
      this.__cache__ = new ComplexStorageCache(
        {
          index: __instance__.__instanceID.toString(),
          load () {
            var __token__;
            if (typeof navigator !== "undefined" && typeof origin !== "undefined"){
              __token__ = _Crypt.encrypt(`${navigator.userAgent}|${o.username}|${(+(new Date())).toString()}`,origin);
            } else {
              __token__ = _Crypt.encrypt(`${o.username}|${(+(new Date())).toString()}`,CONFIG.get("domain"));
            }
            __instance__.user = {
              priority:__instance__.__instanceID.toString(),
              token: __token__
            };
            return __instance__.user;
          },
          alternate (cacheController) {
            __instance__.user = cacheController.cache.getCached(__instance__.__instanceID.toString()); // setting dataObject with the cached value
            return;
          }
        });
    },
    generateIndex (s) {
      return (typeof Buffer !== "undefined")?(Buffer.from(s, "ascii").toString("base64")):(btoa(s));
    },
    getGlobalUser () {
      var username = [...arguments].join("|");
      var __index__ = "userToken_"+SessionUserToken.generateIndex(username);
      if (typeof global.get(__index__) === "undefined" || global.get(__index__) === null){
        global.set(__index__, New(SessionUserToken, {
          username: username
        }));
      }
      SessionUserToken.user = global.get(__index__).user;
      return global.get(__index__).user;
    },
    getGlobalUserToken () {
      return this.getGlobalUser(...arguments).token;
    },
    getGlobalUserId () {
      return this.getGlobalUser(...arguments).id;
    },
    getGlobalUserPriority () {
      return this.getGlobalUser(...arguments).priority;
    },
    getLoginCredentialsToken (username, password) {
      return _Crypt.encrypt(`${username}${password}`, this.getGlobalUserToken(username));
    },
    closeGlobalSession () {
      this.getGlobalUser(...arguments);
      var username = [...arguments].join("|");
      var __index__ = "userToken_"+SessionUserToken.generateIndex(username);
      if (typeof global.get(__index__) !== "undefined"){
        global.get(__index__).__cache__.clear();
        global.set(__index__, null);
        SessionUserToken.user = {};
      }
    }
  })
]);

}).call(null);
