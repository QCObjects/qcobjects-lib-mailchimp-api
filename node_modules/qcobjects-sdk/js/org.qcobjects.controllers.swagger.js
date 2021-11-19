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
Package("org.qcobjects.controllers.swagger",[
  Class("SwaggerUIController",Controller,{
    dependencies:[],
    component:null,
		startSwaggerUI: function (){
      // Begin Swagger UI call region
      if (typeof SwaggerUIBundle !== "undefined"){
        /* eslint-disable no-undef */
        const ui = SwaggerUIBundle({
          url: CONFIG.get("swagger-ui-url","https://petstore.swagger.io/v2/swagger.json"),
          dom_id: "#"+CONFIG.get("swagger-ui-dom_id","swagger-ui"),
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout"
        });
        // End Swagger UI call region
        window.ui = ui;
      }

		},
		done: function (){
			var controller = this;
      controller.component.body.innerHTML = "<div id=\""+CONFIG.get("swagger-ui-dom_id","swagger-ui")+"\"></div>";
			var swaggerUIPackagePath = CONFIG.get("swagger-ui-package-path","node_modules/swagger-ui-dist/");

			this.dependencies.push(New(SourceJS,{
				url:swaggerUIPackagePath+"swagger-ui-standalone-preset.js",
				external:CONFIG.get("swagger-ui-external",false)
			}));
			this.dependencies.push(New(SourceCSS,{
				url:swaggerUIPackagePath+"swagger-ui.css",
				external:CONFIG.get("swagger-ui-external",false)
			}));
			this.dependencies.push(New(SourceJS,{
				url:swaggerUIPackagePath+"swagger-ui-bundle.js",
				external:CONFIG.get("swagger-ui-external",false),
				done:function (){
					controller.startSwaggerUI();
				}
			}));
		}
	})
]);

}).call(null);
