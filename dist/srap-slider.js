/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/srap-slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/srap-slider.js":
/*!***************************!*\
  !*** ./js/srap-slider.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class SrapSlider {\r\n    \r\n    constructor (speed = 1, timingFunction = 'ease-in-out') {\r\n        this.sliderInit(speed, timingFunction);\r\n        this.indicatorsInit();\r\n        this.addEvent();\r\n    }\r\n\r\n    sliderInit(speed, timingFunction) {\r\n        this.srapSlider = document.querySelector('.srap-slider');\r\n        this.prevBtn = document.querySelector('.prevBtn');\r\n        this.nextBtn = document.querySelector('.nextBtn');\r\n        this.slides = document.querySelectorAll('.srap-slider .slide');\r\n        this.activeIndex = 0;\r\n        this.slideDirection = 'toRight';\r\n        this.slideSpeed = speed; // second\r\n        this.timeoutDuration = speed * 1000 + 100;\r\n\r\n        for(let slide of this.slides) {\r\n            slide.style.transitionDuration = `${this.slideSpeed}s`;\r\n            slide.style.animationDuration = `${this.slideSpeed}s`;\r\n            slide.style.transitionTimingFunction = `${timingFunction}`;\r\n            slide.style.animationTimingFunction = `${timingFunction}`;\r\n        }\r\n\r\n        // this.sliderAutoSlide();\r\n    }\r\n\r\n    // sliderAutoSlide() {\r\n    //     this.autoSlide = setInterval(() => {\r\n    //         this.toRight();\r\n    //     }, 4000);\r\n    // }\r\n\r\n    indicatorsInit() {\r\n        this.sliderIndicators = document.querySelector('.slider-indicators');\r\n        let indicatorsHTML = '';\r\n        for(let i = 0; i < this.slides.length; i++) {\r\n            indicatorsHTML += `<li class=\"indicator\" data-indicator-index=\"${i}\"></li>`;\r\n        }\r\n        this.sliderIndicators.innerHTML = indicatorsHTML;\r\n        this.indicators = document.querySelectorAll('.indicator');\r\n        this.indicators[this.activeIndex].classList.add('indicator-active');\r\n    }\r\n\r\n    addEvent() {\r\n        this.toRight = this.toRight.bind(this);\r\n        this.toLeft = this.toLeft.bind(this);\r\n        this.indicatorsClick = this.indicatorsClick.bind(this);\r\n\r\n        this.nextBtn.addEventListener('click', this.toRight);\r\n        this.prevBtn.addEventListener('click', this.toLeft);\r\n        for(let indicator of this.indicators) {\r\n            indicator.addEventListener('click', this.indicatorsClick);\r\n        }\r\n    }\r\n\r\n    removeEvent() {\r\n        this.nextBtn.removeEventListener('click', this.toRight);\r\n        this.prevBtn.removeEventListener('click', this.toLeft);\r\n        for(let indicator of this.indicators) {\r\n            indicator.removeEventListener('click', this.indicatorsClick);\r\n        }\r\n    }\r\n\r\n    toRight() {\r\n        // clearInterval(this.autoSlide);\r\n        this.slideDirection = 'toRight';\r\n        this.changeIndicator(this.activeIndex);\r\n        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev', 'active-next');\r\n        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next', 'active-prev');\r\n        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');\r\n        this.slides[this.activeIndex].classList.add('active-prev');\r\n        if(this.activeIndex === this.slides.length - 1) this.activeIndex = 0;\r\n        else this.activeIndex++;\r\n        this.slides[this.activeIndex].classList.add('active-from-right');\r\n        this.removeEvent();\r\n        setTimeout(() => {\r\n            this.addEvent();\r\n        }, this.timeoutDuration);\r\n        // setTimeout(() => {\r\n        //     this.autoSlide = setInterval(() => {\r\n        //         this.toRight();\r\n        //     }, 4000);\r\n        // }, 4000);\r\n    }\r\n\r\n    toLeft() {\r\n        // clearInterval(this.autoSlide);\r\n        this.slideDirection = 'toLeft';\r\n        this.changeIndicator(this.activeIndex);\r\n        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev');\r\n        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next');\r\n        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');\r\n        this.slides[this.activeIndex].classList.add('active-next');\r\n        if(this.activeIndex == 0) this.activeIndex = this.slides.length - 1;\r\n        else this.activeIndex--;\r\n        this.slides[this.activeIndex].classList.add('active-from-left');\r\n        this.removeEvent();\r\n        setTimeout(() => {\r\n            this.addEvent();\r\n        }, this.timeoutDuration);\r\n        // setTimeout(() => {\r\n        //     this.autoSlide = setInterval(() => {\r\n        //         this.toRight();\r\n        //     }, 4000);\r\n        // }, 4000);\r\n    }\r\n\r\n    indicatorsClick(eventObject) {\r\n        this.changeIndicator(eventObject);\r\n        if(+eventObject.target.dataset.indicatorIndex == this.activeIndex) return false;\r\n        let toLeft = false;\r\n        if(+eventObject.target.dataset.indicatorIndex < this.activeIndex) toLeft = true;\r\n        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev');\r\n        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next');\r\n        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');\r\n        if(!toLeft) {\r\n            this.slides[this.activeIndex].classList.add('active-prev');\r\n            this.activeIndex = +eventObject.target.dataset.indicatorIndex;\r\n            this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');\r\n            this.slides[this.activeIndex].classList.add('active-from-right');\r\n        }\r\n        else {\r\n            this.slides[this.activeIndex].classList.add('active-next');\r\n            this.activeIndex = +eventObject.target.dataset.indicatorIndex;\r\n            this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');\r\n            this.slides[this.activeIndex].classList.add('active-from-left');\r\n        }\r\n        this.removeEvent();\r\n        setTimeout(() => {\r\n            this.addEvent();\r\n        }, this.timeoutDuration);\r\n    }\r\n\r\n    changeIndicator(eventObject) {\r\n        if(typeof eventObject == 'object') {\r\n            this.indicators[this.activeIndex].classList.remove('indicator-active');\r\n            this.indicators[eventObject.target.dataset.indicatorIndex].classList.add('indicator-active');\r\n        }\r\n        else if(typeof eventObject == 'number') {\r\n            this.indicators[this.activeIndex].classList.remove('indicator-active');\r\n            (this.slideDirection == 'toRight') ? this.indicators[this.checkIndex(this.activeIndex + 1)].classList.add('indicator-active') : (this.slideDirection == 'toLeft') ? this.indicators[this.checkIndex(this.activeIndex - 1)].classList.add('indicator-active') : this.error = true;\r\n        }\r\n    }\r\n\r\n    checkIndex(i) {\r\n        if(i > this.slides.length - 1) return i - this.slides.length;\r\n        else if(i < 0) return i + this.slides.length;\r\n        else return i;\r\n    }\r\n}\r\n\r\nnew SrapSlider(1, 'ease-in-out');\n\n//# sourceURL=webpack:///./js/srap-slider.js?");

/***/ })

/******/ });