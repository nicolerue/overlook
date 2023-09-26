/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --percent: 0.33;\n  --circumference: 282.7431px;\n}\n\n.hidden {\n  display: none;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: \"Inter\", sans-serif;\n}\n\nnav {\n  display: flex;\n  justify-content: space-between;\n}\n\n.home-btn,\n.signout-btn {\n  font-weight: bold;\n  font-size: 18px;\n}\n\n.page-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 50px;\n}\n\nh1 {\n  font-size: 50px;\n}\n\n.home-login {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n}\n\np,\nh2,\nlabel {\n  font-weight: bold;\n}\n\n.input-login,\n.search-customer {\n  height: 30px;\n  width: 250px;\n  padding-left: 10px;\n  padding-right: 10px;\n  align-items: start;\n}\n\ninput[type=text] {\n  font-size: 18px;\n}\n\n.secondary-font {\n  font-size: 32px;\n}\n\n.select-action {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 30px;\n}\n\nbutton,\n.login-btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 15px;\n  background-color: #d4d4d8;\n  color: #262626;\n  margin: 20px 20px;\n}\nbutton:hover,\n.login-btn:hover {\n  cursor: pointer;\n  font-weight: bold;\n  transform: scale(1.05);\n}\n\n.section-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n}\n\n.bookings-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n}\n\n.section-container-stats {\n  display: flex;\n  flex-direction: row;\n}\n\n.date-input,\n.date-input-manager {\n  height: 30px;\n  width: 200px;\n  font-size: 24px;\n  padding-left: 10px;\n  padding-right: 10px;\n  cursor: pointer;\n}\n.date-input:hover,\n.date-input-manager:hover {\n  cursor: pointer;\n  font-weight: bold;\n  transform: scale(1.05);\n}\n\n.rooms-display,\n.bookings-display {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 50vh;\n}\n\n.room-card,\n.booking-card {\n  border: 1px solid #d4d4d8;\n  padding: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.9);\n}\n\n.select-action-manager {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 30px;\n}\n\n.search-label-input-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n}\n\n.base-timer {\n  position: relative;\n  height: 250px;\n  width: 250px;\n}\n\n.timer-label-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 25px;\n}\n\n.base-timer__circle {\n  fill: none;\n  stroke: none;\n  fill: rgba(245, 245, 245, 0.5);\n}\n\n.base-timer__path-elapsed1 {\n  stroke: #ce7e00;\n  stroke-dasharray: 0 0;\n  stroke-width: 7px;\n  stroke-linecap: round;\n}\n\n.base-timer__label {\n  position: absolute;\n  width: 250px;\n  height: 250px;\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.occupied-percent {\n  font-size: 42px;\n}\n\n.percent-label {\n  display: flex;\n  background-color: #d4d4d8;\n  color: #262626;\n  padding: 10px 20px;\n  border-radius: 15px;\n}\n\n.circle-label-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n}\n\n.header-signin {\n  padding-top: 250px;\n}\n\n.revenue-avail-container {\n  display: flex;\n  flex-direction: column;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n}\n\n.bookings-container,\n.rooms-display .bookings-display {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 40vh;\n  align-items: start;\n}\n\n.rooms-display-stats {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 25vh;\n  align-items: start;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.scss"],"names":[],"mappings":"AAQA;EACE,eAAA;EACA,2BAAA;AAPF;;AAsEA;EACE,aAAA;AAnEF;;AAuEA;EACE,SAAA;EACA,UAAA;EACA,gCA/EU;AAWZ;;AAuEA;EACE,aAAA;EACA,8BAAA;AApEF;;AAuEA;;EAEE,iBAAA;EACA,eAAA;AApEF;;AAuEA;EAnEE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EA+DA,SAAA;AAjEF;;AAoEA;EACE,eAAA;AAjEF;;AAoEA;EA7EE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAyEA,SAAA;AA9DF;;AAiEA;;;EAGE,iBAAA;AA9DF;;AAiEA;;EAEE,YAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;AA9DF;;AAiEA;EACE,eAAA;AA9DF;;AAiEA;EACE,eAAA;AA9DF;;AAiEA;EA1GE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAsGA,SAAA;AA3DF;;AA6DA;;EAEE,kBAAA;EACA,YAAA;EACA,mBAAA;EACA,yBA5IiB;EA6IjB,cA9IgB;EA+IhB,iBAAA;AA1DF;AA2DE;;EA/EA,eAAA;EACA,iBAAA;EACA,sBAAA;AAwBF;;AA0DA;EA5HE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAwHA,SAAA;AApDF;;AAuDA;EAlIE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EA8HA,SAAA;AAjDF;;AAoDA;EACE,aAAA;EACA,mBAAA;AAjDF;;AAoDA;;EAEE,YAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;EAIA,eAAA;AApDF;AAiDE;;EA5GA,eAAA;EACA,iBAAA;EACA,sBAAA;AA+DF;;AAiDA;;EAEE,aAAA;EACA,kCAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;EACA,YAAA;AA9CF;;AAiDA;;EAzJE,yBAAA;EACA,aAAA;EACA,uCAAA;EAbA,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAkKA,0CAAA;AAzCF;;AA4CA;EA5KE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAwKA,SAAA;AAtCF;;AAyCA;EA7KE,aAAA;EACA,mBAAA;EACA,uBAAA;EA6KA,eAAA;AApCF;;AAuCA;EACE,kBAAA;EACA,aAAA;EACA,YAAA;AApCF;;AAuCA;EA7LE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAyLA,SAAA;AAjCF;;AAoCA;EAhKE,UAAA;EACA,YAAA;EAiKA,8BAAA;AAhCF;;AAmCA;EACE,eAhOa;EASb,qBAAA;EA4CA,iBAAA;EACA,qBAAA;AA6IF;;AAkCA;EA7LE,kBAAA;EACA,YAAA;EACA,aAAA;EAEA,MAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EAEA,eAAA;EArBA,aAAA;EACA,mBAAA;EACA,uBAAA;EAPA,aAAA;EACA,sBAAA;AA2LF;;AAwBA;EACE,eAAA;AArBF;;AAwBA;EACE,aAAA;EACA,yBAlPiB;EAmPjB,cApPgB;EAqPhB,kBAAA;EACA,mBAAA;AArBF;;AAwBA;EAhOE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EA4NA,SAAA;AAlBF;;AAqBA;EACE,kBAAA;AAlBF;;AAqBA;EA1OE,aAAA;EACA,sBAAA;EAIA,aAAA;EACA,mBAAA;EACA,uBAAA;EAsOA,SAAA;AAfF;;AAiBA;;EAEE,aAAA;EACA,8BAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;AAdF;;AAiBA;EACE,aAAA;EACA,kCAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;AAdF","sourcesContent":["//VARIABLES\n\n$main-font: \"Inter\", sans-serif;\n$main-color-dark: #262626;\n$main-color-light: #d4d4d8;\n$burnt-orange: #ce7e00;\n$radius: 45px;\n$circumference: 2 * 3.14159 * $radius;\n:root {\n  --percent: 0.33;\n  --circumference: #{$circumference};\n}\n\n@mixin calculateStrokeDashArray($dashLength, $gapLength) {\n  stroke-dasharray: $dashLength $gapLength;\n}\n\n@mixin style-main-font-dark() {\n  color: $main-color-dark;\n  font-family: $main-font;\n}\n\n@mixin style-main-font-light() {\n  color: $main-color-light;\n  font-family: $main-font;\n}\n\n@mixin flex-column() {\n  display: flex;\n  flex-direction: column;\n}\n\n@mixin align-justify-center() {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@mixin border-light() {\n  border: 1px solid $main-color-light;\n  padding: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n@mixin timer-text() {\n  position: absolute;\n  width: 250px;\n  height: 250px;\n\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  font-size: 18px;\n}\n\n@mixin timer-stroke() {\n  stroke-width: 7px;\n  stroke-linecap: round;\n}\n\n@mixin timer-base() {\n  fill: none;\n  stroke: none;\n}\n\n@mixin hover-basic() {\n  cursor: pointer;\n  font-weight: bold;\n  transform: scale(1.05);\n}\n\n.hidden {\n  display: none;\n}\n\n// ELEMENTS\n* {\n  margin: 0;\n  padding: 0;\n  font-family: $main-font;\n}\n\nnav {\n  display: flex;\n  justify-content: space-between;\n}\n\n.home-btn,\n.signout-btn {\n  font-weight: bold;\n  font-size: 18px;\n}\n\n.page-container {\n  @include flex-column;\n  @include align-justify-center();\n  gap: 50px;\n}\n\nh1 {\n  font-size: 50px;\n}\n\n.home-login {\n  @include flex-column;\n  @include align-justify-center();\n  gap: 20px;\n}\n\np,\nh2,\nlabel {\n  font-weight: bold;\n}\n\n.input-login,\n.search-customer {\n  height: 30px;\n  width: 250px;\n  padding-left: 10px;\n  padding-right: 10px;\n  align-items: start;\n}\n\ninput[type=\"text\"] {\n  font-size: 18px;\n}\n\n.secondary-font {\n  font-size: 32px;\n}\n\n.select-action {\n  @include flex-column;\n  @include align-justify-center();\n  gap: 30px;\n}\nbutton,\n.login-btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 15px;\n  background-color: $main-color-light;\n  color: $main-color-dark;\n  margin: 20px 20px;\n  &:hover {\n    @include hover-basic();\n  }\n}\n\n.section-container {\n  @include flex-column;\n  @include align-justify-center();\n  gap: 20px;\n}\n\n.bookings-container {\n  @include flex-column;\n  @include align-justify-center();\n  gap: 20px;\n}\n\n.section-container-stats {\n  display: flex;\n  flex-direction: row;\n}\n\n.date-input,\n.date-input-manager {\n  height: 30px;\n  width: 200px;\n  font-size: 24px;\n  padding-left: 10px;\n  padding-right: 10px;\n  &:hover {\n    @include hover-basic();\n  }\n  cursor: pointer;\n}\n\n.rooms-display,\n.bookings-display {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 50vh;\n}\n\n.room-card,\n.booking-card {\n  @include border-light();\n  @include flex-column();\n  @include align-justify-center;\n  background-color: rgba(255, 255, 255, 0.9);\n}\n\n.select-action-manager {\n  @include flex-column();\n  @include align-justify-center();\n  gap: 30px;\n}\n\n.search-label-input-container {\n  @include align-justify-center();\n  font-size: 18px;\n}\n\n.base-timer {\n  position: relative;\n  height: 250px;\n  width: 250px;\n}\n\n.timer-label-container {\n  @include flex-column();\n  @include align-justify-center();\n  gap: 25px;\n}\n\n.base-timer__circle {\n  @include timer-base();\n  fill: rgb(245, 245, 245, 50%);\n}\n\n.base-timer__path-elapsed1 {\n  stroke: $burnt-orange;\n  @include calculateStrokeDashArray(0, 0);\n  @include timer-stroke();\n}\n\n.base-timer__label {\n  @include timer-text();\n  @include align-justify-center();\n  @include flex-column();\n}\n\n.occupied-percent {\n  font-size: 42px;\n}\n\n.percent-label {\n  display: flex;\n  background-color: $main-color-light;\n  color: $main-color-dark;\n  padding: 10px 20px;\n  border-radius: 15px;\n}\n\n.circle-label-container {\n  @include flex-column();\n  @include align-justify-center;\n  gap: 15px;\n}\n\n.header-signin {\n  padding-top: 250px;\n}\n\n.revenue-avail-container {\n  @include flex-column();\n  @include align-justify-center;\n  gap: 15px;\n}\n.bookings-container,\n.rooms-display .bookings-display {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 40vh;\n  align-items: start;\n}\n\n.rooms-display-stats {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 50px;\n  overflow: scroll;\n  row-gap: 50px;\n  height: 25vh;\n  align-items: start;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNewBooking: () => (/* binding */ addNewBooking),
/* harmony export */   deleteBooking: () => (/* binding */ deleteBooking),
/* harmony export */   fetchAllBookings: () => (/* binding */ fetchAllBookings),
/* harmony export */   fetchAllCustomers: () => (/* binding */ fetchAllCustomers),
/* harmony export */   fetchAllRooms: () => (/* binding */ fetchAllRooms)
/* harmony export */ });
const fetchAllCustomers = fetch("https://overlook-api-gk76.vercel.app/api/v1/customers")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.customers;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

const fetchAllRooms = fetch(`https://overlook-api-gk76.vercel.app/api/v1/rooms`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.rooms;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

const fetchAllBookings = fetch(`https://overlook-api-gk76.vercel.app/api/v1/bookings`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.bookings;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

const addNewBooking = function (roomObj, userObj, selectedDate) {
  return fetch("https://overlook-api-gk76.vercel.app/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify({
      userID: userObj.id,
      date: selectedDate,
      roomNumber: roomObj.number,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from POST request:", data);

      return fetch(`https://overlook-api-gk76.vercel.app/api/v1/bookings`)
        .then((res) => res.json())
        .then((updatedData) => {
          console.log("Updated data after adding a new booking:", updatedData);
          return updatedData;
        });
    })
    .catch((err) => {
      console.error("Error adding a new booking:", err);
      throw err;
    });
};

const deleteBooking = function (id) {
  fetch(`https://overlook-api-gk76.vercel.app/api/v1/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log("Response from DELETE request:", json))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayCustomerAvailableRooms: () => (/* binding */ displayCustomerAvailableRooms),
/* harmony export */   displayCustomerBookNewRoomPage: () => (/* binding */ displayCustomerBookNewRoomPage),
/* harmony export */   displayCustomerBookings: () => (/* binding */ displayCustomerBookings),
/* harmony export */   displayCustomerBookingsPage: () => (/* binding */ displayCustomerBookingsPage),
/* harmony export */   displayCustomerHomePage: () => (/* binding */ displayCustomerHomePage),
/* harmony export */   displayLoginPage: () => (/* binding */ displayLoginPage),
/* harmony export */   displayManageCustomerPage: () => (/* binding */ displayManageCustomerPage),
/* harmony export */   displayManagerAvailRoomCards: () => (/* binding */ displayManagerAvailRoomCards),
/* harmony export */   displayManagerAvailRooms: () => (/* binding */ displayManagerAvailRooms),
/* harmony export */   displayManagerCustomerBookings: () => (/* binding */ displayManagerCustomerBookings),
/* harmony export */   displayManagerCustomerStats: () => (/* binding */ displayManagerCustomerStats),
/* harmony export */   displayManagerHomePage: () => (/* binding */ displayManagerHomePage),
/* harmony export */   displayManagerRevenue: () => (/* binding */ displayManagerRevenue),
/* harmony export */   displayManagerStatsPage: () => (/* binding */ displayManagerStatsPage)
/* harmony export */ });
function displayLoginPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header header-signin">OVERLOOK HOTEL</h1>
      <section class="section-container">
        <form class="home-login">
          <div class="text-input-container">
            <label for="username">USERNAME:</label><br />
            <input
              class="input-login input-login-username"
              type="text"
              id="username"
              name="username"
              placeholder="username** or manager"
              required
            /><br />
          </div>
          <div class="text-input-container">
            <label for="password">PASSWORD:</label><br />
            <input
              class="input-login input-login-password"
              type="text"
              id="password"
              placeholder = "overlook2021"
              name="password"
              required
            />
          </div>
          <input type = "submit" value="LOGIN" class="login-btn secondary-font">
        </form>
      <p class="login-message"></p>
      </section>`;
}

function displayCustomerHomePage(name) {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">WELCOME ${name}</h1>
  <section class="section-container">
    <nav class="select-action">
      <button class="customer-view-bookings secondary-font">
        VIEW MY BOOKINGS
      </button>
      <button class="customer-book-room secondary-font">
        BOOK A NEW ROOM
      </button>
    </nav>
  </section>`;
}

function displayManagerHomePage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">WELCOME MANAGER</h1>
  <section class="section-container">
    <nav class="select-action-manager">
    
    <div class="select-date-container">
      <label for="date">SELECT A DATE</label><br />
      <input class="date-input-manager" type="date" min="2021/09/23" max="'2024/12/21" />
    </div>
    

      <button class="hidden manager-view-bookings-btn secondary-font">
        VIEW STATS
      </button>
      <div class="search-label-input-container">
        <label for="searchcustomer">SEARCH CUSTOMER:</label><br />
        <input
          class="search-customer"
          type="text"
          id="search-customer"
          name="search-customer"
        /><br />
      </div>
      <p class="manager-customer-search-message"></p>
    </nav>
  </section>`;
}

function displayCustomerBookingsPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">MY BOOKINGS</h1>
  <section class="section-container">
    <h2 class="customer-total-spent">Total Spent: $500</h2>
    <nav class="view-actions">
      <button class="customer-all-bookings secondary-font">
    ALL MY BOOKINGS
      </button>
      <button class="customer-past-bookings secondary-font">
        MY PAST BOOKINGS
      </button>
      <button class="customer-upcoming-bookings secondary-font">
    MY FUTURE BOOKINGS
    </button>
    </nav>
    <p class="bookings-message"></p>
    <div class="bookings-container">
     
      
    </div>
  </section>`;
}

function displayCustomerBookNewRoomPage(customerName) {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">${customerName}: BOOK A NEW ROOM</h1>
  <section class="section-container">
    <div class="select-date-container">
      <label for="date">SELECT A DATE</label><br />
      <input class="date-input" type="date" min="2021/09/23" max="'2024/12/21" />
    </div>
    <div class="select-room-type-container">
      <label for="room-type">FILTER BY ROOM TYPE</label>
      <select name="room-type" id="room-type">
        <option value="view-all">view all</option>
        <option value="suite">suite</option>
        <option value="single-room">single room</option>
        <option value="junior-suite">junior suite</option>
        <option value="residential-suite">residential suite</option>
      </select>
    </div>
    <p class="customer-booking-message"></p>
    <div class="rooms-display"></div>
  </section>
  `;
}

function displayCustomerAvailableRooms(arrayOfRoomObjs) {
  let roomsHTML = "";
  const roomContainer = document.querySelector(".rooms-display");

  arrayOfRoomObjs.forEach((roomObj) => {
    if (roomObj.bidet === true) {
      roomObj.bidet = "Yes";
    } else {
      roomObj.bidet = "No";
    }
    roomsHTML += `<div class="room-card" id=${roomObj.number}>
    <p>Room Number: ${roomObj.number}</p>
    <p>Room Type: ${roomObj.roomType}</p>
    <p>Bidet: ${roomObj.bidet}</p>
    <p>Bedsize: ${roomObj.bedSize}</p>
    <p>Number of Beds: ${roomObj.numBeds}</p>
    <p>Cost Per Night: ${roomObj.costPerNight}</p>
    <button class="book-btn" id=${roomObj.number}>Book This Room</button>
    </div>`;
  });
  roomContainer.innerHTML = roomsHTML;
}

function displayCustomerBookings(arrayOfRoomObjs) {
  let bookingsHTML = "";
  const bookingsContainer = document.querySelector(".bookings-container");

  arrayOfRoomObjs.forEach((bookingEl) => {
    bookingsHTML += ` <div class="single-booking-container booking-card">
        <p>Booking ID: ${bookingEl.id}  </p>
        <p>Date: ${bookingEl.date} </p>
        <p>Room Number: ${bookingEl.roomNumber} </p>
      </div>`;
  });
  bookingsContainer.innerHTML = bookingsHTML;
}

function displayManagerStatsPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header-manager-stats header">MANAGER STATS - 04/07/2022</h1>
    <section class="section-container section-container-stats">
      <div class="circle-label-container">
        <div class="base-timer">
          <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g class="base-timer__circle">
              <circle
                class="base-timer__path-elapsed1"
                cx="50"
                cy="50"
                r="45"
              />
            </g>
          </svg>
          <class id="base-timer-label" class="base-timer__label">
            <p class="occupied-percent">33%</p>
          </class>
        </div>
        <div class="percent-label">Percentage of Rooms Occupied for Selected Date</div>
      </div>
      <div class="revenue-avail-container">
      <h2 class="manager-revenue">Today's Total Revenue: $1200</h2>
      <h2 class="avail-rooms">Today's Available Rooms: 14</h2>
      </div>
    </section>
    <h3>Available Rooms</h3>
    <section class="rooms-display rooms-display-stats">
      <div class="room-card" id="1">
        <p>Room Number: 1</p>
        <p>Room Type: Residential Suite</p>
        <p>Bidet: True</p>
        <p>Bedsize: Queen</p>
        <p>Number of Beds: 1</p>
        <p>Cost Per Night: 358.4</p>
      </div>
    </section>`;
}

function displayManagerRevenue(revenue, date) {
  const revenueContainer = document.querySelector(".manager-revenue");

  revenueContainer.innerText = `${date} - Total Revenue: $${Math.round(
    revenue
  )}`;
}

function displayManagerAvailRooms(availRooms, date) {
  const availRoomsContainer = document.querySelector(".avail-rooms");

  availRoomsContainer.innerText = `${date} - Available Rooms: ${availRooms.length}`;
}

function displayManagerAvailRoomCards(arrOfRooms) {
  let roomsHTML = "";
  const roomsDisplayContainer = document.querySelector(".rooms-display");

  arrOfRooms.forEach((roomObj) => {
    if (roomObj.bidet === true) {
      roomObj.bidet = "Yes";
    } else {
      roomObj.bidet = "No";
    }
    roomsHTML += `<div class="room-card" id=${roomObj.number}>
    <p>Room Number: ${roomObj.number}</p>
    <p>Room Type: ${roomObj.roomType}</p>
    <p>Bidet: ${roomObj.bidet}</p>
    <p>Bedsize: ${roomObj.bedSize}</p>
    <p>Number of Beds: ${roomObj.numBeds}</p>
    <p>Cost Per Night: ${roomObj.costPerNight}</p>
   
    </div>`;
  });
  roomsDisplayContainer.innerHTML = roomsHTML;
}

function displayManageCustomerPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header header-customer">CUSTOMER: Leatha Ullrich</h1>
  <section class="section-container">
    <h2 class="customer-spending">Total Spent: $500</h2>
    <button class="manager-add-bookings secondary-font">
      ADD A BOOKING
    </button>
    <p class="manager-view-customer-message"></p>
    <section class="bookings-display">
      <div class="booking-card" id="5fwrgu4i7k55hl6sz">
        <p>id: 5fwrgu4i7k55hl6sz</p>
        <p>Date: 04/07/1992</p>
        <p>Room Number: 12</p>
        <button class="delete-btn" id="5fwrgu4i7k55hl6sz">
          Delete This Booking
        </button>
      </div>
    </section>
  </section>`;
}

function displayManagerCustomerStats(name, totalSpent) {
  const headerCustomer = document.querySelector(".header-customer");

  const sortMessage = document.querySelector(".manager-view-customer-message");

  const customerSpending = document.querySelector(".customer-spending");
  headerCustomer.innerText = `CUSTOMER: ${name}`;

  customerSpending.innerText = `${name}'s total spending at Overlook: $${totalSpent}`;

  sortMessage.innerText = `${name}'s Bookings - sorted from most recent to least recent`;
}
function displayManagerCustomerBookings(customerBookingsArr) {
  let bookingsHTML = "";

  const bookingsDisplay = document.querySelector(".bookings-display");

  customerBookingsArr.forEach((bookingEl) => {
    bookingsHTML += `<div class="booking-card" id=${bookingEl.id}>
    <p>id: ${bookingEl.id}</p>
    <p>User ID: ${bookingEl.userID}</p>
    <p>Date: ${bookingEl.date}</p>
    <p>Room Number: ${bookingEl.roomNumber}</p>
    <button class="delete-btn" id=${bookingEl.id}>
      Delete This Booking
    </button>
  </div>`;
  });

  bookingsDisplay.innerHTML = bookingsHTML;
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   availableRooms: () => (/* binding */ availableRooms),
/* harmony export */   checkCustomerValid: () => (/* binding */ checkCustomerValid),
/* harmony export */   checkLogin: () => (/* binding */ checkLogin),
/* harmony export */   customerBookingsAll: () => (/* binding */ customerBookingsAll),
/* harmony export */   customerBookingsPast: () => (/* binding */ customerBookingsPast),
/* harmony export */   customerBookingsUpcoming: () => (/* binding */ customerBookingsUpcoming),
/* harmony export */   customerTotalCost: () => (/* binding */ customerTotalCost),
/* harmony export */   filterAvailRooms: () => (/* binding */ filterAvailRooms),
/* harmony export */   getCustomer: () => (/* binding */ getCustomer),
/* harmony export */   getCustomerName: () => (/* binding */ getCustomerName),
/* harmony export */   getCustomerObject: () => (/* binding */ getCustomerObject),
/* harmony export */   managerAvailableRoomsNum: () => (/* binding */ managerAvailableRoomsNum),
/* harmony export */   retrieveBookingObject: () => (/* binding */ retrieveBookingObject),
/* harmony export */   retrieveRoomObject: () => (/* binding */ retrieveRoomObject),
/* harmony export */   totalPercentOccupied: () => (/* binding */ totalPercentOccupied),
/* harmony export */   totalRevenueDay: () => (/* binding */ totalRevenueDay),
/* harmony export */   viewUserBookingSpent: () => (/* binding */ viewUserBookingSpent),
/* harmony export */   viewUserBookings: () => (/* binding */ viewUserBookings),
/* harmony export */   viewUserBookingsDate: () => (/* binding */ viewUserBookingsDate)
/* harmony export */ });
//LOGIN FUNCTION//

function checkLogin(customersArr, username, password) {
  if (username === "manager" && password === "overlook2021") {
    return `valid manager login`;
  } else {
    const usernameNum = username.slice(8, 10);
    const validCustomer = customersArr.find((customerEl) => {
      return customerEl.id === parseInt(usernameNum);
    });
    if (validCustomer && password === "overlook2021") {
      return `valid customer and valid password`;
    } else if (validCustomer && password !== "overlook2021") {
      return `Valid username, but incorrect password!`;
    } else if (!validCustomer) {
      return `Invalid username`;
    }
  }
}

function getCustomerName(customersArr, username) {
  const usernameNum = username.slice(8, 10);
  const validCustomer = customersArr.find((customerEl) => {
    return customerEl.id === parseInt(usernameNum);
  });
  return validCustomer.name.toUpperCase();
}

function getCustomerObject(customersArr, username) {
  const usernameNum = username.slice(8, 10);
  const validCustomer = customersArr.find((customerEl) => {
    return customerEl.id === parseInt(usernameNum);
  });
  return validCustomer;
}

//CUSTOMER FUNCTIONS

function getCustomer(customersArray, id) {
  const customer = customersArray.find((customerEl) => {
    return customerEl.id === id;
  });
  return customer;
}

function customerBookingsAll(customerObj, bookingsArray) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you haven't made a booking!`;
  }
}

function customerBookingsUpcoming(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id && bookingEl.date > date) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you have no upcoming bookings!`;
  }
}

function customerBookingsPast(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id && bookingEl.date < date) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you haven't made a booking!`;
  }
}

function customerTotalCost(customerObj, bookingsArr, roomsArr) {
  return bookingsArr.reduce((acc, curr) => {
    if (curr.userID === customerObj.id) {
      const roomMatch = roomsArr.find((roomEl) => {
        return roomEl.number === curr.roomNumber;
      });
      if (roomMatch) {
        acc += roomMatch.costPerNight;
      }
    }
    return Math.round(acc);
  }, 0);
}

function availableRooms(date, roomsArr, bookingsArr) {
  const bookedRoomNumbers = bookingsArr
    .filter((bookingEl) => bookingEl.date === date)
    .map((bookingEl) => bookingEl.roomNumber);

  if (bookedRoomNumbers.length === 0) {
    return roomsArr;
  } else {
    return roomsArr.filter(
      (roomEl) => !bookedRoomNumbers.includes(roomEl.number)
    );
  }
}

function filterAvailRooms(availRoomsArr, roomType) {
  const filteredRooms = availRoomsArr.filter((availRoomsEl) => {
    return availRoomsEl.roomType === roomType;
  });
  if (!filteredRooms) {
    return [];
  }
  return filteredRooms;
}

//MANAGER FUNCTIONS

function managerAvailableRoomsNum(date, roomsArr, bookingsArr) {
  const bookedRoomNumbers = bookingsArr
    .filter((bookingEl) => bookingEl.date === date)
    .map((bookingEl) => bookingEl.roomNumber);

  if (bookedRoomNumbers.length === 0) {
    return roomsArr;
  } else {
    const availRooms = roomsArr.filter(
      (roomEl) => !bookedRoomNumbers.includes(roomEl.number)
    );
    return availRooms;
  }
}

function totalRevenueDay(date, roomsArr, bookingsArr) {
  const bookedRooms = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date === date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (bookedRooms) {
    return bookedRooms.reduce((acc, curr) => {
      const roomMatch = roomsArr.find((roomEl) => {
        return roomEl.number === curr;
      });
      if (roomMatch) {
        acc += roomMatch.costPerNight;
      }
      return acc;
    }, 0);
  }
}

function totalPercentOccupied(date, bookingsArr, roomsArr) {
  const bookedRooms = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date === date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (bookedRooms) {
    return Math.round((bookedRooms.length / roomsArr.length) * 100);
  } else {
    return 0;
  }
}

function viewUserBookings(customerName, customersArr, bookingsArr) {
  const customerID = customersArr.find((customerEl) => {
    return (
      customerEl.name === customerName ||
      customerEl.name.toLowerCase() === customerName ||
      customerEl.name.toUpperCase() === customerName
    );
  }).id;
  const filteredBookings = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.userID === customerID;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return filteredBookings;
}

function viewUserBookingsDate(customerBookingsArr) {
  let bookingsArr = [];
  customerBookingsArr.forEach((bookingEl) => {
    bookingsArr.push({
      date: `${bookingEl.date}`,
      roomNumber: parseInt(bookingEl.roomNumber),
    });
  });
  return bookingsArr;
}

function viewUserBookingSpent(customerBookingsArr, roomsArr) {
  return customerBookingsArr.reduce((acc, curr) => {
    const roomMatch = roomsArr.find((roomEl) => {
      return curr.roomNumber === roomEl.number;
    });

    if (roomMatch) {
      acc += roomMatch.costPerNight;
    }
    return Math.round(acc);
  }, 0);
}

function checkCustomerValid(customerArr, customerName) {
  const validCustomer = customerArr.find((customerEl) => {
    return (
      customerEl.name === customerName ||
      customerEl.name.toLowerCase() === customerName ||
      customerEl.name.toUpperCase() === customerName
    );
  });
  if (validCustomer) {
    return validCustomer;
  } else {
    return undefined;
  }
}

function retrieveRoomObject(roomsArr, id) {
  return roomsArr.find((roomEl) => {
    return roomEl.number === parseInt(id);
  });
}

function retrieveBookingObject(bookingsArr, date, roomNum) {
  return bookingsArr.find((bookingEl) => {
    return (
      bookingEl.date === date &&
      parseInt(bookingEl.roomNumber) === parseInt(roomNum)
    );
  });
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hotel.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_hotel_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
//IMPORTS



("./api-calls");







//QUERY SELECTORS
const homeBtn = document.querySelector(".home-btn");
const signoutBtn = document.querySelector(".signout-btn");

// GLOBAL VARIABLES
let dataAllCustomers = null;
let dataAllRooms = null;
let dataAllBookings = [];
let currentCustomer = {};
let todayDate = getCurrentDate();
let todayPercentage = null;
let managerDate = null;
let currentUser = null;
let customerDate = null;

// PAGE LOAD

Promise.all([_api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchAllCustomers, _api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchAllRooms, _api_calls__WEBPACK_IMPORTED_MODULE_1__.fetchAllBookings]).then(
  ([fetchAllCustomersResult, fetchAllRoomsResult, fetchAllBookingsResult]) => {
    dataAllCustomers = fetchAllCustomersResult;
    dataAllRooms = fetchAllRoomsResult;
    dataAllBookings = fetchAllBookingsResult;
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayLoginPage)();
    removeNavButtons();

    const pageContainer = document.querySelector("body");
    pageContainer.style.backgroundImage = `linear-gradient(
      rgba(249, 249, 249, 0.4),
      rgba(249, 249, 249, 0.4)
    ), url(./images/hotel.jpg)`;
    pageContainer.style.backgroundSize = "cover";
    pageContainer.style.height = "100vh";
    pageContainer.style.overflow = "scroll";
    pageContainer.style.backgroundRepeat = "no-repeat";
  }
);

//EVENT LISTENERS
homeBtn.addEventListener("click", navigateHome);
signoutBtn.addEventListener("click", signout);
window.addEventListener("click", login);
window.addEventListener("click", customerViewBookings);
window.addEventListener("click", customerBookNewRoom);
window.addEventListener("click", customerAvailableRooms);
window.addEventListener("click", customerViewAllBookings);
window.addEventListener("click", customerViewPastBookings);
window.addEventListener("click", customerViewFutureBookings);
window.addEventListener("click", managerViewStats);
window.addEventListener("keypress", managerViewCustomer);
window.addEventListener("click", managerBookRoomForCustomer);
window.addEventListener("change", filterByRoomType);
window.addEventListener("click", customerBookRoom);
window.addEventListener("click", managerDeleteBooking);

//FUNCTIONS

function viewNavButtons() {
  homeBtn.classList.remove("hidden");
  signoutBtn.classList.remove("hidden");
}

function removeNavButtons() {
  homeBtn.classList.add("hidden");
  signoutBtn.classList.add("hidden");
}

function navigateHome() {
  if (currentUser === "customer") {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerHomePage)(currentCustomer.name.toUpperCase());
  } else if (currentUser === "manager") {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerHomePage)();
  }
}

function signout() {
  currentUser = "";
  currentCustomer = {};
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayLoginPage)();
  removeNavButtons();
}
function login(e) {
  const loginMessage = document.querySelector(".login-message");
  const usernameInput = document.querySelector(".input-login-username");
  const passwordInput = document.querySelector(".input-login-password");

  if (e.target.classList.contains("login-btn")) {
    const loginCheck = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.checkLogin)(
      dataAllCustomers,
      usernameInput.value,
      passwordInput.value
    );
    if (loginCheck === `Valid username, but incorrect password!`) {
      loginMessage.innerText = loginCheck;
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (loginCheck === `Invalid username`) {
      loginMessage.innerText = loginCheck;
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (loginCheck === `valid manager login`) {
      currentUser = "manager";
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerHomePage)();
      viewNavButtons();
    } else if (loginCheck === `valid customer and valid password`) {
      currentUser = "customer";
      const customerName = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.getCustomerName)(
        dataAllCustomers,
        usernameInput.value
      );
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerHomePage)(customerName);
      currentCustomer = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.getCustomerObject)(
        dataAllCustomers,
        usernameInput.value
      );
      viewNavButtons();
    }
  }
}

function customerViewBookings(e) {
  if (e.target.classList.contains("customer-view-bookings")) {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookingsPage)();
    updateCustomerSpending();
  }
}

function customerBookNewRoom(e) {
  if (e.target.classList.contains("customer-book-room")) {
    const customerName = currentCustomer.name;
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookNewRoomPage)(customerName);
  }
}

function customerAvailableRooms(e) {
  if (e.target.classList.contains("date-input")) {
    const value = document.querySelector(".date-input");

    value.addEventListener("change", function () {
      const selectedDate = this.value;
      const formattedDate = selectedDate.replaceAll("-", "/");
      customerDate = formattedDate;
      const availableRoomsArr = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.availableRooms)(
        customerDate,
        dataAllRooms,
        dataAllBookings
      );
      if (availableRoomsArr.length === 0) {
        const message = document.querySelector(".customer-booking-message");
        message.innerText = `Sorry, there are no available rooms for your selected dates`;
      } else {
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(availableRoomsArr);
      }
    });
  }
}

function filterByRoomType(e) {
  if (e.target.id === "room-type") {
    const value = e.target.value;
    const availableRoomsArr = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.availableRooms)(
      customerDate,
      dataAllRooms,
      dataAllBookings
    );

    if (value === "view-all") {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(availableRoomsArr);
    } else if (value === "suite") {
      let filteredRooms = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.filterAvailRooms)(availableRoomsArr, "suite");
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(filteredRooms);
    } else if (value === "single-room") {
      let filteredRooms = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.filterAvailRooms)(availableRoomsArr, "single room");
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(filteredRooms);
    } else if (value === "junior-suite") {
      let filteredRooms = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.filterAvailRooms)(availableRoomsArr, "junior suite");
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(filteredRooms);
    } else if (value === "residential-suite") {
      let filteredRooms = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.filterAvailRooms)(
        availableRoomsArr,
        "residential suite"
      );

      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerAvailableRooms)(filteredRooms);
    }
  }
}
function customerViewAllBookings(e) {
  if (e.target.classList.contains("customer-all-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");

    const allBookingsArr = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.customerBookingsAll)(
      currentCustomer,
      dataAllBookings
    );

    if (allBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = allBookingsArr;
    } else {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookings)(allBookingsArr);
      bookingsMessage.innerText = `ALL ${currentCustomer.name.toUpperCase()}'S BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE MOST RECENT DATES`;
    }
  }
}

function customerViewPastBookings(e) {
  if (e.target.classList.contains("customer-past-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");
    const pastBookingsArr = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.customerBookingsPast)(
      currentCustomer,
      dataAllBookings,
      todayDate
    );

    if (pastBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = pastBookingsArr;
    } else {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookings)(pastBookingsArr);
      bookingsMessage.innerText = `${currentCustomer.name.toUpperCase()}'S PAST BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE MOST RECENT DATES`;
    }
  }
}

function customerViewFutureBookings(e) {
  if (e.target.classList.contains("customer-upcoming-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");
    const upcomingBookingsArr = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.customerBookingsUpcoming)(
      currentCustomer,
      dataAllBookings,
      todayDate
    );

    if (upcomingBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = upcomingBookingsArr;
    } else {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookings)(upcomingBookingsArr);
      bookingsMessage.innerText = `${currentCustomer.name.toUpperCase()}'S UPCOMING BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE CLOSEST UPCOMING DATES`;
    }
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

function updateCustomerSpending() {
  const totalSpentContainer = document.querySelector(".customer-total-spent");
  const total = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.customerTotalCost)(
    currentCustomer,
    dataAllBookings,
    dataAllRooms
  );

  totalSpentContainer.innerText = `TOTAL SPENT: $${total}`;
}

function managerViewStats(e) {
  if (e.target.classList.contains("date-input-manager")) {
    const value = document.querySelector(".date-input-manager");
    const viewStatsBtn = document.querySelector(".manager-view-bookings-btn");
    value.addEventListener("change", function () {
      const selectedDate = this.value;
      viewStatsBtn.classList.remove("hidden");
      managerDate = selectedDate.replaceAll("-", "/");
      todayPercentage = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.totalPercentOccupied)(
        managerDate,
        dataAllBookings,
        dataAllRooms
      );
    });
  }

  if (
    e.target.classList.contains("manager-view-bookings-btn") &&
    managerDate !== null
  ) {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerStatsPage)();
    updateManagerStats();
    updateManagerRevenue();
    updateManagerAvailRooms();
  }
}

function updateManagerStats() {
  const managerHeader = document.querySelector(".header-manager-stats");

  const percentageCircle = document.querySelector(".occupied-percent");

  percentageCircle.innerText = `${todayPercentage}%`;
  managerHeader.innerText = `MANAGER STATS - ${managerDate}`;

  updatePercentage(todayPercentage / 100);
}

function updatePercentage(newPercentage) {
  const circumference = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--circumference"
    )
  );
  const dashLength = newPercentage * circumference;
  const gapLength = (1 - newPercentage) * circumference;
  document.documentElement.style.setProperty("--percent", newPercentage);
  const elapsedPath = document.querySelector(".base-timer__path-elapsed1");
  elapsedPath.style.strokeDasharray = `${dashLength}px ${gapLength}px`;
}

function updateManagerRevenue() {
  const revenue = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.totalRevenueDay)(managerDate, dataAllRooms, dataAllBookings);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerRevenue)(revenue, managerDate);
}
function updateManagerAvailRooms() {
  const availRooms = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.managerAvailableRoomsNum)(
    managerDate,
    dataAllRooms,
    dataAllBookings
  );
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerAvailRooms)(availRooms, managerDate);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerAvailRoomCards)(availRooms);
}

function managerViewCustomer(e) {
  if (e.target.classList.contains("search-customer") && e.key === "Enter") {
    const managerSearchMessageContainer = document.querySelector(
      ".manager-customer-search-message"
    );
    const customerName = e.target.value;
    const validCustomer = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.checkCustomerValid)(dataAllCustomers, customerName);
    if (validCustomer) {
      currentCustomer = validCustomer;
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManageCustomerPage)();
      const customerBookings = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.viewUserBookings)(
        customerName,
        dataAllCustomers,
        dataAllBookings
      );
      const customerSpending = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.viewUserBookingSpent)(
        customerBookings,
        dataAllRooms
      );
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerCustomerStats)(customerName, customerSpending);
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayManagerCustomerBookings)(customerBookings);
    } else {
      managerSearchMessageContainer.innerText = `${customerName} is not found.`;
      setTimeout(() => {
        managerSearchMessageContainer.innerText = "";
      }, 2500);
    }
  }
}

function managerBookRoomForCustomer(e) {
  if (e.target.classList.contains("manager-add-bookings")) {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.displayCustomerBookNewRoomPage)(currentCustomer.name);
  }
}

function customerBookRoom(e) {
  if (
    e.target.classList.contains("book-btn") &
    (e.target.innerText === `Book This Room`)
  ) {
    const room = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.retrieveRoomObject)(dataAllRooms, e.target.id);
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.addNewBooking)(room, currentCustomer, customerDate)
      .then((updatedData) => {
        dataAllBookings = updatedData.bookings;
      })
      .catch((err) => {
        e.target.innerText === `Error adding a new booking: ${err}`;
      });
    e.target.innerText = `✓ Booked`;
    e.target.style.backgroundColor = "#ce7e00";
    e.target.style.color = "#FFFFFF";
  } else if (
    e.target.classList.contains("book-btn") &&
    e.target.innerText === `✓ Booked`
  ) {
    e.target.innerText = `Book This Room`;
    e.target.style.backgroundColor = "#d4d4d8";
    e.target.style.color = "#262626";
    const roomNum = e.target.id;
    const roomToDeleteObj = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.retrieveBookingObject)(
      dataAllBookings,
      customerDate,
      roomNum
    );
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.deleteBooking)(roomToDeleteObj.id);
  }
}

function managerDeleteBooking(e) {
  if (e.target.classList.contains("delete-btn")) {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.deleteBooking)(e.target.id);
    e.target.innerText = `DELETED`;
    e.target.style.backgroundColor = "#ce7e00";
    e.target.style.color = "#FFFFFF";
  }
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
