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
Package("org.quickcorp.qcobjects.cli.commands.jira.client_services", [
  Class("JiraCloud", Service, {
    name: "jira_cloud",
    external: true,
    useHTTP2: true,
    cached: false,
    method: "POST",
    headers: {
      "accept":"application/json",
      "content-type":"application/json"
    },
    basePath: "",
    url: "",
    withCredentials: false,
    _new_: function(o) {
      // service instantiated
      this.domain = `${o.domain}`;
      this.basePath = `https://${this.domain}/`;
      this.username_password = `${o.username}:${o.password}`;
      this.headers["authorization"] = `Basic ${Buffer.from(this.username_password).toString("base64")}`;
      this.url = this.basePath + o.apiMethod;
      this.data = o.data;
    },
    done: function(service,standardResponse) {
      // service loaded
      logger.debug(standardResponse);
    },
    fail: function (e){
        logger.debug(e);
    }
  })
]);
