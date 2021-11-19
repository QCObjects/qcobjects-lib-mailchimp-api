"use strict";
/**
 * QCObjects ESLint Config
 * ________________________
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

require("qcobjects");
require("qcobjects-sdk");
var qc_globals = {};
global.ClassesList.map(c=>qc_globals[c.classFactory.__definition.__classType]="readonly");
module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
      "eslint:recommended"
    ],
    "globals": Object.assign(qc_globals,{
      "global": "readonly",
      "logger": "readonly",
      "VO": "readonly",
      "i18n_messages": "readonly",
      "i18n_messages_es": "readonly",
      "_DOMCreateElement": "readonly",
      "NotificationComponent": "readonly",
      "TransitionEffect": "readonly",
      "Effect": "readonly",
      "Tag": "readonly",
      "_super_": "readonly",
      "isBrowser": "readonly",
      "CONFIG": "readonly",
      "Controller": "readonly",
      "View": "readonly",
      "Model": "readonly",
      "Component": "readonly",
      "Import": "readonly",
      "Ready": "readonly",
      "Package": "readonly",
      "Class": "readonly",
      "JSONService": "readonly",
      "New": "readonly",
      "ClassFactory": "readonly",
      "serviceLoader": "readonly",
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly",
      "BackendMicroservice": "readonly",
      "Processor": "readonly",
      "RegisterWidget": "readonly",
      "ComplexStorageCache": "readonly",
      "_Crypt": "readonly",
      "SessionUserToken": "readonly",
      "ComponentURI": "readonly",
      "_DataStringify": "readonly",
      "Timer": "readonly",
      "SourceCSS": "readonly",
      "SourceJS": "readonly",
      "Service": "readonly"
    }),
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-unused-vars": 1,
      "no-undef": 1
    }
};
