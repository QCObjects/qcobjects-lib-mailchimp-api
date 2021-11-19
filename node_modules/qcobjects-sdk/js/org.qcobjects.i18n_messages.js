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
Package("org.qcobjects.i18n_messages", [
  Class("i18n_messages",Object,{
    _load_i18n_packages_: function (){
      return CONFIG.get("i18n_languages",[]).map((i18n_packagename)=>{
        Import(`org.quickcorp.i18n_messages.${i18n_packagename}`);
      });
    },
    _new_: function() {
      var i18n = this;
      if (CONFIG.get("use_i18n")){
        CONFIG.set("lang", "en");
        if (!global.get("i18n")){
          global.set("i18n", {
            messages: i18n.messages
          });
        } else {
          global.set("i18n", {
            messages: global.get("i18n").messages.concat(i18n.messages)
          });
        }
      }
    }
  }),
  {
    _i18n_messages:i18n_messages._load_i18n_packages_()
  }
]);

}).call(null);
