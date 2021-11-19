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
Package("org.qcobjects.controllers.slider",[
  Class("SliderController",Controller,{
    dependencies:[],
    component:null,
    slideIndex:0,
    duration:7100,
    interval: null,
    sliderHandlerName: null,
    _new_:function (o){
      this.__new__(o);
      var controller=this;
      var component = controller.component;
      controller._componentRoot = (component.shadowed)?(component.shadowRoot):(component.body);
      //TODO: Implement
      controller.sliderHandlerName = "slider_"+controller.component.__instanceID.toString();
      global.set(controller.sliderHandlerName,this);
    },
    stop: function (){
      if (this.interval != null){
        clearInterval(this.interval);
      }
    },
    plusSlidesAndStop: function (n){
      this.stop();
      this.plusSlides(n);
    },
    plusSlides: function (n) {
      this.showSlides(this.slideIndex += n);
    },
    currentSlide: function (n) {
      this.stop();
      this.showSlides(this.slideIndex = n);
    },
    automate: function (){
      var controller = this;
      controller.interval = setInterval(function (){
        controller.plusSlides(1);
      },controller.duration);
    },
    showSlides: function (n) {
      var controller = this;
      var slides = controller._componentRoot.subelements(".qcoSlides");
      var dots = controller._componentRoot.subelements(".qcoSlider__dots--dot");

      if (n > (slides.length-1)) {
        controller.slideIndex = 0;
      }
      if (n < 0) {
        controller.slideIndex = 0;
      }
      slides.map((slide)=>{
        Fade.apply(slide,1,0);
      });
      dots.map((dot)=>{
        dot.classList.remove("active");
      });
      try {
        dots[controller.slideIndex].classList.add("active");
      }catch (e){
        logger.debug("Something went wrong when trying to activate a slide");
        logger.debug(e.message);
      }
      setTimeout(function (){
        slides.map((slide)=>{
          slide.style.display="none";
        });
        try {
          slides[controller.slideIndex].style.display = "block";
          Fade.apply(slides[controller.slideIndex],0,1);

        }catch (e){
          logger.debug("Something went wrong when trying to show a slide");
          logger.debug(e.message);
        }
      },700);
    },
    fillDots: function (){
      var controller = this;
      var slides = controller._componentRoot.subelements(".qcoSlides");
      slides.map((slide,index)=>{
        var dotHTML = document.createElement("span");
        var dotContent = `<span class="qcoSlider__dots--dot" onclick="global.get('${controller.sliderHandlerName}').currentSlide(${index})"></span>`;
        dotHTML.innerHTML = dotContent;
        controller._componentRoot.subelements(".qcoSlider__dots")[0].append(dotHTML);
      });

    },
    done: function (){
      var controller = this;
      var slides = controller._componentRoot.subelements(".qcoSlides");
      slides.map((slide)=>{
        slide.style.display="none";
      });
      setTimeout(function (){
        controller.fillDots();
        controller.slideIndex = 0;
        controller.showSlides(this.slideIndex);
        controller.automate();
      },3000);

    }
  })

]);

}).call(null);
