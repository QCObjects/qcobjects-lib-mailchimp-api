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
Package("org.qcobjects.components.slider",[
  Class("SlideListComponent",Component,{
    name:"slidelist",
    tplsource: "inline",
    template: "<p>Loading...</p>",
    _new_ (o){
      o.body.setAttribute("controllerClass","DataGridController");
      var subcomponentClass = (o.body.getAttribute("subcomponentClass") !== null)?(o.body.getAttribute("subcomponentClass")):("GridItemComponent");
      o.body.setAttribute("subcomponentClass",subcomponentClass);
      _super_("Component","_new_").call(this,o);
    }
  }),
  Class("SlideItemComponent",Component,{
    name:"slider_item",
    template: `
    <div class="qcoSlides" style="display:none">
      <div class="qco-slider__numbertext">{{slideNumber}} / {{__dataLength}}</div>
      <img src="{{image}}" alt="{{name}}"/>
      <div class="qco-slider__text">
        <p>{{label}} <a href="{{link}}">{{category}}</a></p>
      </div>
    </div>
    `,
    tplsource: "inline",
    _new_:function (o){

      o.data.slideNumber = o.data.__dataIndex + 1;

      _super_("Component","_new_").call(this,o);
    }
  }),

  Class("SliderComponent",Component,{
    name:"slider",
    template: `
    <style>
    /* Slideshow container */

    :host a:hover,
    :host a:active,
    :host a:visited {
      color: #ffffff;
    }

     {
      color: #ffffff;
    }

    :host .prev {left:0;}
    .qco-slider__container {
      max-width: 100%;
      position: relative;
      margin: auto;
      height: 300px;
    }
    :host .qco-slider__container .qcoSlides img {
      object-fit: cover;
      width: 100%;
      height: 300px;
    }

    /* Next & previous buttons */
    :host .prev,
    :host .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      margin-top: -22px;
      padding: 16px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      background-color: rgba(1, 1, 1, 0.1);
    }

    /* Position the "next button" to the right */
    :host .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    :host .prev:hover,
    :host .next:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    /* Caption text */
    :host .qco-slider__text {
      color: #f2f2f2;
      font-size: 15px;
/*      padding: 8px 12px;*/
      position: absolute;
      bottom: 8px;
      width: 100%;
      text-align: center;
      text-shadow: -1px 1px 3px #111111;
      background-color: rgba(1,1,1,0.7);
    }

    /* Number text (1/3 etc) */
    :host .qco-slider__numbertext {
      color: #f2f2f2;
      text-shadow: 0px 2px 3px #111111;
      font-size: 12px;
      padding: 8px 12px;
      position: absolute;
      top: 0;
      padding-top: 0;
      margin-top: 10px;
    }

    /* The dots/bullets/indicators */
    :host .qcoSlider__dots {
      text-align: center;
      margin: 0 auto;
      padding: 0;
    }
    :host .qcoSlider__dots--dot {
      cursor: pointer;
      height: 10px;
      width: 10px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.6s ease;
    }

    :host .active,
    :host .qcoSlider__dots--dot:hover {
      background-color: #717171;
    }

    :host .qco-slider__container .qcoSlides img {
      border-radius: 30px 30px 0px 0px;
    }

    </style>

    <div class="qco-slider__container">
      <component name="slidelist" componentClass="SlideListComponent" subcomponentClass="SlideItemComponent" serviceClass="{{SERVICE_CLASS}}" ></component>

      <a class="prev" onclick="global.get('{{sliderHandler}}').plusSlidesAndStop(-1)">&#10094;</a>
      <a class="next" onclick="global.get('{{sliderHandler}}').plusSlidesAndStop(1)">&#10095;</a>
    </div>
    <br>

    <div class="qcoSlider__dots" style="text-align:center">
    </div>

    `,
    tplsource: "inline",
    shadowed: true,
    _new_(o){
      o.data.SERVICE_CLASS = o.body.getAttribute("serviceClass");
      o.data.sliderHandler = "slider_"+this.__instanceID.toString();
      o.body.setAttribute("controllerClass","SliderController");
      _super_("Component","_new_").call(this,o);
    }

  })
]);

}).call(null);
