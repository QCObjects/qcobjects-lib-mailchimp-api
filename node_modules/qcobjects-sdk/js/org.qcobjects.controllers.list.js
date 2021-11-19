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
Package("org.qcobjects.controllers.list",[
  Class("ListController",Controller,{
    dependencies:[],
    component:null,
    _new_:function (o){
      this.__new__(o);
      var controller=this;
      controller._componentRoot = (controller.component.shadowed)?(controller.component.shadowRoot):(controller.component.body);

      controller.labelField = controller.component.body.getAttribute("label-field");
      controller.valueField = controller.component.body.getAttribute("value-field");
      controller.rows=controller.component.body.getAttribute("rows");
      controller.rows=(controller.rows !== null)?(controller.rows):(controller.component.rows);
      controller.cols=1;
      logger.debug("ListController INIT");
    },
    getPageIndex: function (page, totalPage, totalElements) {
      page = new Number(page);
      page = (page>0)?(page-1):(0);
      totalPage = new Number(totalPage);
      totalElements = new Number(totalElements);
      return [totalElements*page/ totalPage, (totalElements*page/ totalPage) + totalElements/totalPage];
    },
    addSubcomponents:function (){
      var controller = this;
      controller.component.subcomponents = [];
      var layout = controller.component.body.getAttribute("layout");
      var basePath = CONFIG.get("listBasePath",CONFIG.get("remoteSDKPath"));
      var cssLayout = "";
      if (layout === "horizontal"){
        cssLayout = `@import url("${basePath}css/components/horizontal-list.css");`;
      } else {
        cssLayout = `@import url("${basePath}css/components/list.css");`;
      }
      controller._componentRoot.innerHTML = `<style>${cssLayout}</style><ul></ul>`;
      logger.debug(_DataStringify(controller.component.data));
      try {
        var subcomponentClass = controller.component.body.getAttribute("subcomponentClass");
        if (subcomponentClass != null){
          var offset;
          var limit;
          var pagesNumber;
          var list = [...controller.component.data];
          var paginateIn = controller.component.body.getAttribute("paginate-in");
          paginateIn = (paginateIn !== null)?(paginateIn):("client");
          if (paginateIn === "client"){
            var page = controller.component.body.getAttribute("page-number");
            page = (isNaN(page) || page === null)?(-1):(page);
            if (page !== -1){
              pagesNumber = controller.component.body.getAttribute("total-pages");
              pagesNumber = (isNaN(pagesNumber))?(1):(pagesNumber);
              offset = controller.getPageIndex(page, pagesNumber, list.length)[0];
              limit = controller.getPageIndex(page, pagesNumber, list.length)[1];
            } else {
              offset = 0;
              limit = list.length;
              pagesNumber = 1;
            }
            list = list.slice(offset,limit);
          } else {
            offset = 0;
            limit = list.length;
            pagesNumber = 1;
          }
          list.map(
            function (record,dataIndex){
                try {
                  var _body = _DOMCreateElement("li");
                  record.label = record[controller.labelField];
                  record.value = record[controller.valueField];
                  var subcomponent = New(ClassFactory(subcomponentClass),{
                    data:{
                      label:record[controller.labelField],
                      value:record[controller.valueField],
                      __dataIndex:dataIndex,
                      __page:page,
                      __totalPages:pagesNumber,
                      __limit:limit,
                      __offset:offset
                    },
                    templateURI:ComponentURI({
                      "COMPONENTS_BASE_PATH":CONFIG.get("componentsBasePath"),
                      "COMPONENT_NAME":ClassFactory(subcomponentClass).name,
                      "TPLEXTENSION":CONFIG.get("tplextension"),
                      "TPL_SOURCE":ClassFactory(subcomponentClass).tplsource
                    }),
                    body:_body,
                    template:ClassFactory(subcomponentClass).template
                  });
                  subcomponent.done = controller.component.done.bind(subcomponent);
                  try {
                    if (subcomponent){
                      subcomponent.data.__dataIndex = dataIndex;
                      if (controller.component.data.hasOwnProperty.call(controller.component.data,"length")){
                        subcomponent.data.__dataLength = controller.component.data.length;
                      }
                      logger.debug("adding subcomponent to body");
                      controller._componentRoot.subelements("ul").map(ul=>ul.append(subcomponent));
                      try {
                        controller.component.subcomponents.push(subcomponent);
                      }catch (e){
                        logger.debug("ERROR LOADING SUBCOMPONENT IN DATAGRID");
                      }
                    } else {
                      logger.debug("ERROR LOADING SUBCOMPONENT IN DATAGRID");
                    }
                  }catch (e){
                    logger.debug("ERROR LOADING SUBCOMPONENT IN DATAGRID");
                  }

                } catch (e) {
                  logger.debug("ERROR LOADING SUBCOMPONENT IN DATAGRID");
                }
            }
          );
        } else {
          logger.debug("NO SUBCOMPONENT CLASS IN COMPONENT");
        }

      } catch (e){
        logger.debug("No data for component");
      }
    },
    cssGrid: function (){
      var controller=this;
      var component = controller.component;
      var _componentRoot = (component.shadowed)?(component.shadowRoot):(component.body);
      if (typeof controller.rows !== "undefined" && typeof controller.cols !== "undefined"){
        var s = _DOMCreateElement("style");
        var templateRows = "auto ".repeat(controller.rows);
        var templateCols = "auto ".repeat(controller.cols);
        var className = "grid"+this.__instanceID.toString();
        s.innerHTML = "."+className+" { \
                          display: grid; \
                          grid-template-rows: "+templateRows+"; \
                          grid-template-columns: "+templateCols+"; \
                          margin:0 auto; \
                      }";
        _componentRoot.append(s);
        _componentRoot.classList.add(className);
      }
    },
    done:function (){
      var controller = this;
      controller.cssGrid();

      var componentInstance = controller.component;
      logger.debug("ListController DONE");
      var serviceClass = controller.component.body.getAttribute("serviceClass");
      if (serviceClass != null){
        var offset;
        var limit;
        var paginateIn = componentInstance.body.getAttribute("paginate-in");
        paginateIn = (paginateIn !== null)?(paginateIn):("client");
        if (paginateIn === "server"){
          var page = componentInstance.body.getAttribute("page-number");
          page = (isNaN(page) || page === null)?(-1):(page);
          var pagesNumber;
          if (page !== -1){
            var serverDataCount = (controller.component.body.getAttribute("server-data-count")!==null)?(controller.component.body.getAttribute("server-data-count")):(1);
            pagesNumber = controller.component.body.getAttribute("total-pages");
            pagesNumber = (isNaN(pagesNumber))?(1):(pagesNumber);
            offset = controller.getPageIndex(page, pagesNumber, serverDataCount)[0];
            limit = controller.getPageIndex(page, pagesNumber, serverDataCount)[1];
            // send params in jsonrpc 2.0 style
            componentInstance.serviceData = (typeof componentInstance.serviceData !== "undefined")?(componentInstance.serviceData):({});
            componentInstance.serviceData.params = (typeof componentInstance.serviceData.params !== "undefined")?(componentInstance.serviceData.params):({});
            componentInstance.serviceData.params.offset = offset;
            componentInstance.serviceData.params.limit = limit;
          }
        }

        serviceLoader(New(ClassFactory(serviceClass),{
            data:componentInstance.serviceData
        })).then(
          (successfulResponse)=>{
            // This will show the service response as a plain text
            logger.debug("DONE SERVICE COMPONENT");
            successfulResponse.service.JSONresponse = JSON.parse(successfulResponse.service.template);
            if (typeof successfulResponse.service.JSONresponse.result !== "undefined"){
              logger.debug(_DataStringify(successfulResponse.service.JSONresponse.result));
              componentInstance.data = successfulResponse.service.JSONresponse.result;
            } else {
              componentInstance.data = successfulResponse.service.JSONresponse;
            }
            controller.addSubcomponents();

          },
          (failedResponse)=>{
            logger.debug(failedResponse);
          }).catch ((e)=>{
            logger.debug("Something went wrong when calling the service from: "+serviceClass);
            logger.debug(e.message);
          });

      }

    }

  })
]);

}).call(null);
