#!/usr/bin/env node
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
const path = require("path");
const absolutePath = path.resolve( __dirname, "./" );

require("qcobjects");

require(absolutePath+"/org.quickcorp.qcobjects.defaultsettings.js");

if (CONFIG.get("useLegacyHTTP",false)){
  require(absolutePath+"/org.quickcorp.qcobjects.main.http.server.js");
} else {
  require(absolutePath+"/org.quickcorp.qcobjects.main.http2.server.js");
}

Class("Main",{
  _new_:()=>{
    const _ServerClass_ = (CONFIG.get("useLegacyHTTP",false))? (HTTPServer): (HTTP2Server);
    const app = New(_ServerClass_);
    app.start();

    logger.debug("initialized");
  }
});

let __main__ = New(Main);
