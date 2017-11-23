webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__text_demo_text_demo_component__ = __webpack_require__("../../../../../src/app/text_demo/text_demo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__text_result_text_result_component__ = __webpack_require__("../../../../../src/app/text_result/text.result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__demo_demo_component__ = __webpack_require__("../../../../../src/app/demo/demo.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: 'header', component: __WEBPACK_IMPORTED_MODULE_2__header_header_component__["a" /* HeaderComponent */] },
    { path: 'demo', component: __WEBPACK_IMPORTED_MODULE_5__demo_demo_component__["a" /* DemoComponent */] },
    { path: 'text_demo', component: __WEBPACK_IMPORTED_MODULE_3__text_demo_text_demo_component__["a" /* TextDemoComponent */] },
    { path: 'text_result', component: __WEBPACK_IMPORTED_MODULE_4__text_result_text_result_component__["a" /* TextResultComponent */] },
    { path: '', redirectTo: '/text_demo', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes, { useHash: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\n<div class=\"app-wrapper\">\n  <app-header></app-header>\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SERVER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SERVER_URL_TRANSLATE; });
// DO NOT EDIT THIS FILE, EDIT THE WEBPACK COMMON CONFIG INSTEAD, WHICH WILL MODIFY THIS FILE
var _SERVER_URL = 'http://172.16.34.150:8092';
var _SERVER_URL_TRANSLATE = 'http://172.16.34.150:5556';
// 172.16.34.150:8092
//&REPLACEHOST&:8092
var SERVER_URL = _SERVER_URL;
var SERVER_URL_TRANSLATE = _SERVER_URL_TRANSLATE;
//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__text_demo_text_demo_component__ = __webpack_require__("../../../../../src/app/text_demo/text_demo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__text_result_text_result_component__ = __webpack_require__("../../../../../src/app/text_result/text.result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__text_result_word_analysis_word_analysis_component__ = __webpack_require__("../../../../../src/app/text_result/word-analysis/word.analysis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__text_result_word_ratio_word_ratio_component__ = __webpack_require__("../../../../../src/app/text_result/word-ratio/word.ratio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__text_result_entity_recognition_entity_recognition_component__ = __webpack_require__("../../../../../src/app/text_result/entity-recognition/entity.recognition.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__text_result_auto_summary_auto_summary_component__ = __webpack_require__("../../../../../src/app/text_result/auto-summary/auto.summary.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__text_result_info_extract_info_extract_component__ = __webpack_require__("../../../../../src/app/text_result/info-extract/info.extract.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__text_result_text_category_text_category_component__ = __webpack_require__("../../../../../src/app/text_result/text-category/text.category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__text_result_emotional_recognition_emotional_recognition_component__ = __webpack_require__("../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__text_result_semantic_association_semantic_association_component__ = __webpack_require__("../../../../../src/app/text_result/semantic-association/semantic.association.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__text_result_component_title_des_title_des_component__ = __webpack_require__("../../../../../src/app/text_result/component/title-des/title.des.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__text_result_component_checkbox_checkbox_component__ = __webpack_require__("../../../../../src/app/text_result/component/checkbox/checkbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__text_result_component_tip_tip_component__ = __webpack_require__("../../../../../src/app/text_result/component/tip/tip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__text_result_text_clusteri_text_clusteri_component__ = __webpack_require__("../../../../../src/app/text_result/text-clusteri/text-clusteri.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__text_result_component_wordBox_wordbox_component__ = __webpack_require__("../../../../../src/app/text_result/component/wordBox/wordbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__text_result_component_wordtip_wordtip_component__ = __webpack_require__("../../../../../src/app/text_result/component/wordtip/wordtip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__text_result_component_ltp_ltp_component__ = __webpack_require__("../../../../../src/app/text_result/component/ltp/ltp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__text_result_component_extract_summaries_extract_summaries_component__ = __webpack_require__("../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__text_result_component_abstract_summaries_abstract_summaries_component__ = __webpack_require__("../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__demo_demo_component__ = __webpack_require__("../../../../../src/app/demo/demo.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_4__text_demo_text_demo_component__["a" /* TextDemoComponent */],
            __WEBPACK_IMPORTED_MODULE_5__text_result_text_result_component__["a" /* TextResultComponent */],
            __WEBPACK_IMPORTED_MODULE_9__text_result_word_analysis_word_analysis_component__["a" /* WordAnalysisComponent */],
            __WEBPACK_IMPORTED_MODULE_10__text_result_word_ratio_word_ratio_component__["a" /* WordRatioComponent */],
            __WEBPACK_IMPORTED_MODULE_11__text_result_entity_recognition_entity_recognition_component__["a" /* EntityRecognitionComponent */],
            __WEBPACK_IMPORTED_MODULE_12__text_result_auto_summary_auto_summary_component__["a" /* AutoSummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_13__text_result_info_extract_info_extract_component__["a" /* InfoExtractComponent */],
            __WEBPACK_IMPORTED_MODULE_14__text_result_text_category_text_category_component__["a" /* TextCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_15__text_result_emotional_recognition_emotional_recognition_component__["a" /* EmotionalRecognitionComponent */],
            __WEBPACK_IMPORTED_MODULE_16__text_result_semantic_association_semantic_association_component__["a" /* SemanticAssociationComponent */],
            __WEBPACK_IMPORTED_MODULE_17__text_result_component_title_des_title_des_component__["a" /* TitleDesComponent */],
            __WEBPACK_IMPORTED_MODULE_18__text_result_component_checkbox_checkbox_component__["a" /* CheckboxComponent */],
            __WEBPACK_IMPORTED_MODULE_19__text_result_component_tip_tip_component__["a" /* TipComponent */],
            __WEBPACK_IMPORTED_MODULE_21__text_result_text_clusteri_text_clusteri_component__["a" /* TextClusteriComponent */],
            __WEBPACK_IMPORTED_MODULE_22__text_result_component_wordBox_wordbox_component__["a" /* WordboxComponent */],
            __WEBPACK_IMPORTED_MODULE_23__text_result_component_wordtip_wordtip_component__["a" /* WordTipComponent */],
            __WEBPACK_IMPORTED_MODULE_24__text_result_component_ltp_ltp_component__["a" /* LtpTipComponent */],
            __WEBPACK_IMPORTED_MODULE_25__text_result_component_extract_summaries_extract_summaries_component__["a" /* ExtractSummariesComponent */],
            __WEBPACK_IMPORTED_MODULE_26__text_result_component_abstract_summaries_abstract_summaries_component__["a" /* AbstractSummariesComponent */],
            __WEBPACK_IMPORTED_MODULE_27__demo_demo_component__["a" /* DemoComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_20__angular_http__["a" /* HttpModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/common/services/demo.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { JobParameter,JobCollection } from "../../common/defs/resources";
// import { Parameter, TrainingNetwork } from "../defs/parameter";
var DemoService = (function () {
    function DemoService(http) {
        this.http = http;
        this.SERVER_URL_TRANSLATE = __WEBPACK_IMPORTED_MODULE_4__app_constants__["b" /* SERVER_URL_TRANSLATE */];
    }
    DemoService.prototype.getAuthorization = function () {
        return 'Bearer ' + sessionStorage['authenticationToken'];
    };
    DemoService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', this.getAuthorization());
        return headers;
    };
    DemoService.prototype.getResult = function (url) {
        var path = "/api_crawler?url=" + url;
        // let headers = this.getHeaders();
        return this.http.get(this.SERVER_URL_TRANSLATE + path)
            .map(function (response) {
            if (response) {
                return response.json();
            }
        });
    };
    DemoService.prototype.getDate = function (url, keywords) {
        var path = "/api_crawler_keywords?url=" + url + "&keywords=" + keywords;
        // let headers = this.getHeaders();
        return this.http.get(this.SERVER_URL_TRANSLATE + path)
            .map(function (response) {
            if (response) {
                return response.json();
            }
        });
    };
    DemoService.prototype.startCrawler = function (keywords) {
        var path = "/api_keywords?keywords=" + keywords;
        //let headers = this.getHeaders();
        return this.http.get(this.SERVER_URL_TRANSLATE + path)
            .map(function (response) {
            if (response) {
                return response.json();
            }
        });
    };
    DemoService.prototype.getTranslate = function (text, fromLang, toLang) {
        var path = "/api_translate";
        var trans = JSON.stringify({
            "q": text,
            "fromLang": fromLang,
            "toLang": toLang
        });
        //let headers = this.getHeaders();
        return this.http.post(this.SERVER_URL_TRANSLATE + path, trans)
            .map(function (response) {
            if (response) {
                return response.json();
            }
        });
    };
    return DemoService;
}());
DemoService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], DemoService);

var _a;
//# sourceMappingURL=demo.service.js.map

/***/ }),

/***/ "../../../../../src/app/common/services/text.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TextService = (function () {
    function TextService(http) {
        this.http = http;
        this.SERVER_URL = __WEBPACK_IMPORTED_MODULE_4__app_constants__["a" /* SERVER_URL */];
    }
    TextService.prototype.getAuthorization = function () {
        return 'Bearer ' + sessionStorage['authenticationToken'];
    };
    TextService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', this.getAuthorization());
        return headers;
    };
    TextService.prototype.setText1 = function (content, type, appId, len, flow) {
        if (type === void 0) { type = 'text'; }
        if (appId === void 0) { appId = 1; }
        if (len === void 0) { len = 200000; }
        if (flow === void 0) { flow = 1; }
        var path = "/api/TextAnalysis?content=" + content + "&type=" + type + "&appId=" + appId + "&len=" + len + "&flow=" + flow;
        var headers = this.getHeaders();
        return this.http.post(this.SERVER_URL + path, { headers: headers })
            .map(function (response) {
            if (response && response.json()) {
                return response.json();
            }
        });
    };
    TextService.prototype.setText = function (content, type, appId, len, flow) {
        if (type === void 0) { type = 'text'; }
        if (appId === void 0) { appId = 1; }
        if (len === void 0) { len = 200000; }
        if (flow === void 0) { flow = 1; }
        var path = "/api/TextAnalysis?content=" + content + "&type=" + type + "&appId=" + appId + "&len=" + len + "&flow=" + flow;
        var headers = this.getHeaders();
        return this.http.post(this.SERVER_URL + path, { headers: headers })
            .map(function (response) {
            if (response && response.json()) {
                return response.json();
            }
        });
    };
    TextService.prototype.setFile = function (content, type, appId, len, flow) {
        var path = "/api/TextAnalysis?content=" + content + "&type=" + type + "&appId=" + appId + "&len=" + len + "&flow=" + flow;
        var headers = this.getHeaders();
        return this.http.post(this.SERVER_URL + path, { headers: headers })
            .map(function (response) {
            if (response && response.json()) {
                return response.json();
            }
        });
    };
    TextService.prototype.getAllData = function (id, target) {
        var path = "/api/scan/scanAllResult/" + id + "/" + target;
        var headers = this.getHeaders();
        return this.http.get(this.SERVER_URL + path, { headers: headers })
            .map(function (response) {
            if (response && response.json()) {
                return response.json();
            }
        });
    };
    TextService.prototype.getWord = function () {
        var path = "/api/scan/scanAllTagging";
        var headers = this.getHeaders();
        return this.http.get(this.SERVER_URL + path, { headers: headers })
            .map(function (response) {
            if (response && response.json()) {
                return response.json();
            }
        });
    };
    return TextService;
}());
TextService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === "function" && _a || Object])
], TextService);

var _a;
//# sourceMappingURL=text.service.js.map

/***/ }),

/***/ "../../../../../src/app/demo/demo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "*{\n  margin:0;\n  padding:0;\n  color: #3e3e3e;\n  font-size: 14px;\n}\nbody{\n  margin:0px;\n}\ninput{\n  outline: none;\n  color: #666;\n  padding-left: 6px;\n  border:1px solid #d3d3d3;\n  border-radius: 6px;\n}\nselect{\n  color: #666;\n  background: #ffffff;\n  padding-left: 6px;\n  border:1px solid #d3d3d3;\n  border-radius: 6px;\n}\na{\n  text-decoration: none;\n  color: #ffffff;\n}\n.demo-wapper{\n  padding-top: 100px;\n}\n.demo-content{\n  width:980px;\n  margin:0 auto;\n}\n.crawler-url{\n  overflow: hidden;\n}\n.crawler-address{\n  float: left;\n  margin-right:35px;\n}\n.crawler-address label{\n}\n.crawler-input{\n  width:260px;\n  height:30px;\n  line-height: 30px;\n  box-sizing: border-box;\n}\n.crawler-address:nth-of-type(1) .crawler-input{\n  margin-left: 42px;\n}\n.crawler-address:nth-of-type(2) .crawler-input{\n  margin-left: 20px;\n}\n.btn{\n  height:26px;\n  line-height: 26px;\n  border-radius: 6px;\n  padding:4px 40px;\n  float: right;\n}\n.crawler-btn{\n\n}\n.news{\n  margin:10px 0;\n  overflow: hidden;\n}\n.news div{\n  float: left;\n  overflow: hidden;\n}\n.news div:nth-of-type(2){\n  margin-left: 34px;\n}\n.news div:nth-of-type(2) .crawler-select{\n  margin-left: 25px;\n}\n.news label{\n  float: left;\n  line-height: 30px;\n}\n.news-span{\n}\n.news span{\n  float: left;\n  display: inline-block;\n  padding-left: 30px;\n}\n.crawler-text{\n  width:958px;\n  height:236px;\n  border:1px solid #d3d3d3;\n  resize: none;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  padding:10px;\n}\n.crawler-select{\n  width:260px;\n  height:30px;\n  line-height: 30px;\n  float: left;\n  margin-left: 18px;\n}\n.chooseLanguage select{\n  border:1px solid #d3d3d3;\n  border-radius: 4px;\n  height:30px;\n  line-height: 30px;\n  box-sizing: border-box;\n  padding-left: 4px;\n}\n.see-news-url label{\n  float: left;\n}\n.see-news-url a{\n  color: rgb(51, 155, 212);\n  display: inline-block;\n  margin-left: 60px;\n  float: left;\n  width:850px\n}\n\n.translate-btn{\n  width:100%;\n  height:52px;\n  line-height: 52px;\n  font-size: 16px;\n  color: #f0f0f0;\n  text-align: center;\n  margin-top: -4px;\n  cursor: pointer;\n  display: block;\n  text-decoration: none;\n}\n.ready{\n  background: #b2b2b2;\n}\n.start{\n  background: #4db9d3;\n}\n.ongoing{\n  background: #f0854a;\n}\n.end{\n  background: #e96749;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/demo/demo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"demo-wapper\">\n  <div class=\"demo-content\">\n    <div class=\"crawler\">\n      <div class=\"crawler-url\">\n        <div class=\"crawler-address\">\n          <label>请输入网址：</label>\n          <input type=\"text\" class=\"crawler-input\" [(ngModel)] = \"address\" (ngModelChange)=\"inputChange()\"/>\n        </div>\n        <div class=\"crawler-address\">\n          <label>请输入关键字：</label>\n          <input type=\"text\" class=\"crawler-input\" [(ngModel)] = \"keyWord\" (ngModelChange)=\"inputChange()\"/>\n        </div>\n        <a href=\"#\" class=\"crawler-btn btn\" onclick=\"return false\" (click)=\"startCrawler()\" [ngStyle]=\"getColor()\">{{crawlerBtn}}</a>\n      </div>\n      <div class=\"news\">\n        <div>\n          <label>请输入新闻日期：</label>\n          <select [(ngModel)] = \"newsDate\" class=\"crawler-select\" (ngModelChange)=\"newsDate=$event;changeDate()\">\n            <option value=\"{{item.publish}}\"  *ngFor=\"let item of crawler\">{{item.publish}}</option>\n          </select>\n          <!--<span class=\"news-span\">{{crawler.publish}}</span>-->\n        </div>\n        <div>\n          <label>查看新闻标题：</label>\n          <!--<span>{{crawler.title}}</span>-->\n          <select [(ngModel)] = \"newsTitle\" class=\"crawler-select\" (ngModelChange)=\"newsDate=$event;changeTitle()\">\n            <option value=\"{{item.title}}\"  *ngFor=\"let item of titleArr\">{{item.title}}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"see-news-url\">\n        <label>查看新闻：</label>\n        <a href=\"{{newsTarget}}\" target=\"_blank\">{{newsTarget}}</a>\n      </div>\n      <textarea class=\"crawler-text\" readonly [(ngModel)] = \"resultC\">{{resultC}}</textarea>\n    </div>\n    <div class=\"translate\">\n      <div class=\"chooseLanguage\">\n        <label>请选择语言：</label>\n        <select class=\"translate-select\" [(ngModel)] = \"fromLanguage\" (ngModelChange)=\"languageChange()\">\n          <option value=\"{{item.name}}\" *ngFor=\"let item of fromLangArr\">{{item.name}}</option>\n        </select>\n        <label>译</label>\n        <select class=\"translate-select\" [(ngModel)] = \"toLanguage\" (ngModelChange)=\"languageChange()\">\n          <option value=\"{{item.name}}\" *ngFor=\"let item of toLangArr\">{{item.name}}</option>\n        </select>\n        <a href=\"#\" class=\"btn\" onclick=\"return false\" (click)=\"startTranslate()\" [ngStyle]=\"getColorT()\">{{translateBtn}}</a>\n      </div>\n      <textarea class=\"crawler-text\" [(ngModel)] = \"resultT\">{{resultT}}</textarea>\n    </div>\n    <div class=\"translate-result\">\n<!--      <a class=\"translate-btn ready\" [style.display]=\"textBtn==1?'':'none'\">开始文本分析</a>-->\n      <a class=\"translate-btn start\" [style.display]=\"textBtn==2?'':'none'\" (click)=\"textStart()\">开始文本分析</a>\n      <a class=\"translate-btn ongoing\" [style.display]=\"textBtn==3?'':'none'\">文本分析中（<span style=\"color:white\">{{analysisIng}}</span>%）</a>\n      <a class=\"translate-btn end\" [style.display]=\"textBtn==4?'':'none'\" (click)=\"analysisResult()\" routerLinkActive=\"active\" routerLink=\"/text_result\">查看文本分析结果</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/demo/demo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_services_demo_service__ = __webpack_require__("../../../../../src/app/common/services/demo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__ = __webpack_require__("../../../../../src/app/common/services/text.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DemoComponent = (function () {
    function DemoComponent(demoService, textService, router, route) {
        this.demoService = demoService;
        this.textService = textService;
        this.router = router;
        this.route = route;
        this.crawler = [];
        this.crawlerBtn = '开始爬取';
        this.translateBtn = '开始翻译';
        this.colorIndex = 1;
        this.colorIndexT = 1;
        this.fromLangArr = [{ 'id': 'auto', 'name': '自动检测' },
            { 'id': 'zh', 'name': '中文' },
            { 'id': 'en', 'name': '英语' },
            { 'id': 'yue', 'name': '粤语' },
            { 'id': 'wyw', 'name': '文言文' },
            { 'id': 'jp', 'name': '日语' },
            { 'id': 'kor', 'name': '韩语' },
            { 'id': 'fra', 'name': '法语' },
            { 'id': 'spa', 'name': '西班牙语' },
            { 'id': 'th', 'name': '泰语' },
            { 'id': 'ara', 'name': '阿拉伯语' },
            { 'id': 'ru', 'name': '俄语' },
            { 'id': 'pt', 'name': '葡萄牙语' },
            { 'id': 'de', 'name': '德语' },
            { 'id': 'it', 'name': '意大利语' },
            { 'id': 'el', 'name': '希腊语' },
            { 'id': 'nl', 'name': '荷兰语' },
            { 'id': 'pl', 'name': '波兰语' },
            { 'id': 'bul', 'name': '保加利亚语' },
            { 'id': 'est', 'name': '爱沙尼亚语' },
            { 'id': 'dan', 'name': '丹麦语' },
            { 'id': 'fin', 'name': '芬兰语' },
            { 'id': 'cs', 'name': '捷克语' },
            { 'id': 'rom', 'name': '罗马尼亚语' },
            { 'id': 'slo', 'name': '斯洛文尼亚语' },
            { 'id': 'swe', 'name': '瑞典语' },
            { 'id': 'hu', 'name': '匈牙利语' },
            { 'id': 'cht', 'name': '繁体中文' },
            { 'id': 'vie', 'name': '越南语' }
        ];
        this.toLangArr = [
            { 'id': 'zh', 'name': '中文' },
            { 'id': 'en', 'name': '英语' },
            { 'id': 'yue', 'name': '粤语' },
            { 'id': 'wyw', 'name': '文言文' },
            { 'id': 'jp', 'name': '日语' },
            { 'id': 'kor', 'name': '韩语' },
            { 'id': 'fra', 'name': '法语' },
            { 'id': 'spa', 'name': '西班牙语' },
            { 'id': 'th', 'name': '泰语' },
            { 'id': 'ara', 'name': '阿拉伯语' },
            { 'id': 'ru', 'name': '俄语' },
            { 'id': 'pt', 'name': '葡萄牙语' },
            { 'id': 'de', 'name': '德语' },
            { 'id': 'it', 'name': '意大利语' },
            { 'id': 'el', 'name': '希腊语' },
            { 'id': 'nl', 'name': '荷兰语' },
            { 'id': 'pl', 'name': '波兰语' },
            { 'id': 'bul', 'name': '保加利亚语' },
            { 'id': 'est', 'name': '爱沙尼亚语' },
            { 'id': 'dan', 'name': '丹麦语' },
            { 'id': 'fin', 'name': '芬兰语' },
            { 'id': 'cs', 'name': '捷克语' },
            { 'id': 'rom', 'name': '罗马尼亚语' },
            { 'id': 'slo', 'name': '斯洛文尼亚语' },
            { 'id': 'swe', 'name': '瑞典语' },
            { 'id': 'hu', 'name': '匈牙利语' },
            { 'id': 'cht', 'name': '繁体中文' },
            { 'id': 'vie', 'name': '越南语' }
        ];
        this.result = '';
        this.resultC = '';
        this.resultT = '';
        this.textBtn = 2;
        this.titleArr = [];
        this.allDate = {};
        this.falseData = false;
        this.analysisIng = 0;
        this.fromLanguage = this.fromLangArr[0].name;
        this.toLanguage = this.toLangArr[0].name;
        this.getColor();
    }
    DemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (JSON.stringify(params) != "{}") {
                var allDate = params['allDate'];
                _this.id = params['id'];
                _this.allDate = JSON.parse(allDate);
                _this.crawlerBtn = '爬取完成';
                _this.colorIndex = 2;
                _this.getColor();
                _this.translateBtn = '翻译完成';
                _this.colorIndexT = 2;
                _this.getColorT();
                _this.address = _this.allDate.address;
                if (_this.allDate.keyWord == undefined) {
                    _this.keyWord = '';
                }
                else {
                    _this.keyWord = _this.allDate.keyWord;
                }
                _this.crawler = _this.allDate.newsDate;
                _this.newsDate = _this.crawler[0].publish;
                _this.titleArr = _this.allDate.newsTitle;
                _this.newsTitle = _this.titleArr[0].title;
                _this.newsTarget = _this.allDate.newsTarget;
                _this.resultC = _this.allDate.resultC;
                _this.resultT = _this.allDate.resultT;
                _this.textBtn = 4;
                if (_this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' || (_this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' && _this.keyWord == "F-22") || (_this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' && _this.keyWord == "F-35")) {
                    _this.falseData = true;
                }
            }
        });
    };
    DemoComponent.prototype.startCrawler = function () {
        var _this = this;
        /*let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if(!reg.test(this.address)){
          alert("这网址不是以http://https://开头，或者不是网址！");
        }else{
          alert("success");
        }*/
        //console.log(this.address);
        if (this.crawlerBtn == '爬取完成' || this.crawlerBtn == '爬取中...') {
            return false;
        }
        if (this.address == undefined) {
            alert('地址为空！');
            return false;
        }
        else {
            if (this.keyWord == undefined) {
                this.keyWord = '';
            }
            this.crawlerBtn = '爬取中...';
            this.demoService.getDate(encodeURI(this.address), this.keyWord)
                .subscribe(function (result) {
                _this.colorIndex = 2;
                _this.getColor();
                _this.crawlerBtn = '爬取完成';
                //console.log(this.crawlerBtn);
                if (result.state == 0) {
                    alert("没有内容！");
                }
                else if (result.state == 1) {
                    _this.crawler = result.msg;
                    //console.log(this.crawler);
                    if (_this.crawler.length > 0) {
                        for (var i = 0; i < _this.crawler.length; i++) {
                            for (var j = 0; j < _this.crawler[i].content.length; j++) {
                                var obj = {};
                                obj.title = _this.crawler[i].content[j].title;
                                _this.titleArr.push(obj);
                            }
                        }
                        //console.log(this.titleArr);
                        _this.newsDate = _this.crawler[0].publish;
                        _this.newsTitle = _this.titleArr[0].title;
                        _this.newsTarget = _this.crawler[0].content[0].url;
                        _this.getResult(_this.newsTarget);
                    }
                    else {
                        alert("没有内容");
                    }
                }
            });
        }
    };
    DemoComponent.prototype.changeDate = function () {
        this.newsTitle = '';
        this.titleArr = [];
        for (var i = 0; i < this.crawler.length; i++) {
            if (this.newsDate == this.crawler[i].publish) {
                this.titleArr = this.crawler[i].content;
            }
        }
    };
    DemoComponent.prototype.changeTitle = function () {
        for (var i = 0; i < this.crawler.length; i++) {
            for (var j = 0; j < this.crawler[i].content.length; j++) {
                if (this.newsTitle == this.crawler[i].content[j].title) {
                    this.newsDate = this.crawler[i].publish;
                    this.newsTarget = this.crawler[i].content[j].url;
                }
            }
        }
        this.getResult(this.newsTarget);
        this.colorIndexT = 1;
        this.translateBtn = '开始翻译';
        this.textBtn = 2;
        this.analysisIng = 0;
        this.resultT = '';
    };
    DemoComponent.prototype.getResult = function (url) {
        var _this = this;
        if (url == undefined) {
            return false;
        }
        else {
            this.demoService.getResult(url)
                .subscribe(function (result) {
                //console.log(result);
                if (result.msg.length > 0) {
                    _this.translateContent = result.msg[0].content;
                    _this.resultC = _this.translateContent;
                    //console.log(this.resultC);
                }
            });
        }
    };
    DemoComponent.prototype.textStart = function () {
        var _this = this;
        this.textBtn = 3;
        var temSpace = [];
        temSpace = this.resultT.split('&nbsp；');
        var resultT = '';
        for (var j = 0; j < temSpace.length; j++) {
            resultT += temSpace[j] + '';
        }
        //console.log(resultT);
        this.interval = setInterval(function () {
            _this.analysisIng = _this.analysisIng + Math.ceil(Math.random() * 20 + 4);
            if (_this.analysisIng >= 84) {
                clearInterval(_this.interval);
            }
        }, 5000);
        this.textService.setText(encodeURI(resultT))
            .subscribe(function (result) {
            _this.id = result;
            clearInterval(_this.interval);
            setTimeout(function () { return _this.analysisIng = 100; }, 1000);
            _this.textBtn = 4;
            //this.sessionSet();
            //console.log(this.id);
        });
    };
    DemoComponent.prototype.ngOnDestroy = function () {
        // 退出时停止更新
        clearInterval(this.interval);
    };
    DemoComponent.prototype.analysisResult = function () {
        var allDate = {
            "address": this.address,
            "keyWord": this.keyWord,
            "newsDate": this.crawler,
            "newsTitle": this.titleArr,
            "newsTarget": this.newsTarget,
            "resultC": this.resultC,
            "resultT": this.resultT
        };
        this.allDate = JSON.stringify(allDate);
        this.router.navigate(['/text_result'], { queryParams: { "id": this.id, "allDate": this.allDate, "falseData": this.falseData } });
    };
    DemoComponent.prototype.output = function (item) {
        if (item) {
            this.result = '';
            var temArr = [];
            temArr = item.split('<br />');
            for (var i = 0; i < temArr.length; i++) {
                this.result += temArr[i] + '\n';
            }
            //console.log(this.result);
            var temBr = [];
            temBr = this.result.split('<br/>');
            for (var i = 0; i < temBr.length; i++) {
                this.result += temBr[i] + '\n';
            }
            //console.log(this.result);
            var temSpace = [];
            temSpace = this.result.split('&nbsp;');
            for (var j = 0; j < temSpace.length; j++) {
                this.result += temSpace[j] + ' ';
            }
            return this.result;
        }
    };
    DemoComponent.prototype.inputChange = function () {
        this.newsDate = '';
        this.newsTitle = '';
        this.newsTarget = '';
        this.resultC = '';
        this.resultT = '';
        this.titleArr = [];
        this.colorIndex = 1;
        this.getColor();
        this.crawlerBtn = '开始爬取';
        this.languageChange();
        this.textBtn = 2;
        this.analysisIng = 0;
    };
    DemoComponent.prototype.languageChange = function () {
        this.colorIndexT = 1;
        this.getColorT();
        this.translateBtn = '开始翻译';
        this.textBtn = 2;
        this.analysisIng = 0;
    };
    DemoComponent.prototype.startTranslate = function () {
        var _this = this;
        for (var i = 0; i < this.fromLangArr.length; i++) {
            if (this.fromLangArr[i].name == this.fromLanguage) {
                this.fromId = this.fromLangArr[i].id;
            }
        }
        for (var j = 0; j < this.toLangArr.length; j++) {
            if (this.toLangArr[j].name == this.toLanguage) {
                this.toId = this.toLangArr[j].id;
            }
        }
        if (this.translateBtn == '翻译完成' || this.translateBtn == '翻译中...') {
            return false;
        }
        if (this.translateContent == undefined) {
            alert('翻译内容为空！');
            return false;
        }
        else {
            this.translateBtn = '翻译中...';
            //console.log(this.translateContent);
            if (this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' || (this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' && this.keyWord == "F-22") || (this.address == 'https://www.defensenews.com/air/2017/08/23/northrops-fix-for-f-35-and-f-22-communications-problems-involves-global-hawk-uavs/' && this.keyWord == "F-35")) {
                this.colorIndexT = 2;
                this.getColorT();
                this.translateBtn = '翻译完成';
                this.resultT = "华盛顿 - 诺斯罗普•格鲁曼公司（Northrop Grumman）正在解决F-35和F-22之间的通信问题：在“全球鹰”（Global Hawk）无人驾驶飞机上放置一台新的无线电台，让它充当两个资产之间的翻译者。\n美国空军两架最先进的战斗机F-35和F-22目前不能互相发送和接收信息，因为它们都使用不同的安全数据链路：F-35上的多功能高级数据链路（MADL）; 和F-22上的飞行数据链接（IFDL）。 MADL和IFDL都允许具有低检测概率的隐身通信，但是这些信息不能使用不同的波形传送给飞机。\n诺斯罗普公司提出的解决方案是将RQ-4“全球鹰”无人机（已被用作中东和其他地区的通信节点）上的Freedom 550无线电装置进行整合，从而提供一种近距离的方式让两架飞机相互交谈，公司全球鹰业务发展负责人Mike Lyons说。\n“我们有一个解决方案，我们已经确定并向空军提出了一个建议。我们只是等待要求，基本上说：'去做那个'，“他在诺斯罗普在加利福尼亚州帕姆代尔的工厂接受采访时说。F-35和F-22无法相互分享数据一直是空军长期以来一直在努力的一个问题。有一次，这项服务计划用MADL改装F-22，但是这个计划在十年前就取消了。但是，由于F-35成为空军更为重要的部分，在第五代和第四代战机之间寻找通信门户正成为一个更重要的优先事项。里昂告诉“防务新闻”，他预计空军将在未来六个月的某个时候发布一份联合紧急作战需求声明，配备“自由550”的“全球鹰”很可能是诺斯罗普的产品。\n F-35和F-22无法相互分享数据一直是空军长期以来一直在努力的一个问题。有一次，这项服务计划用MADL改装F-22，但是这个计划在十年前就取消了。但是，由于F-35成为空军更为重要的部分，在第五代和第四代战机之间寻找通信门户正成为一个更重要的优先事项。里昂告诉“防务新闻”，他预计空军将在未来六个月的某个时候发布一份联合紧急作战需求声明，配备“自由550”的“全球鹰”很可能是诺斯罗普的产品。\n 据诺斯罗普说，Freedom 550是一款多通道，软件无线电，通过Link 16通过J系列消息共享MADL和IFDL的数据。它还可以将F-35和F-22等第五代战机与F-15和F-16等第四代战机联系起来。\n“它有拉第五代通讯科的能力 - 的固定通讯科 - 然后它可以弥合它到不安全的网络，如果你想，像链路16或SADL”莱昂斯说，使用情境意识的缩写数据链接。 “它允许那些安全的通信互相交谈，因为现在他们不能。”\n诺斯罗普公司在第四代和第五代战斗机之间进行了一系列模拟和现场演习，展示了Freedom 550，但从未在现场环境中使用F-35和F-22，或将全球鹰作为通信中继。\n今年早些时候，该公司与英国皇家空军合作的2周试验，名为宝贝鱼III，使用Freedom 550允许F-35BS与使用Link 16的台风战斗机一起工作。 F-35也运行Link 16，并可以通过该链接直接传递数据，但MADL特定的数据无法传输。\n 那么为什么要使用全球鹰？\n 空军定期飞行“全球鹰”的EQ-4配置，用于通信中继目的。而不是与电光/红外传感器和雷达等典型的RQ-4，用于监视被配备，所述EQ-4承载战场机载通信节点，其中在不同的网络链路表面和空气运营商 - 在粗糙或山区特别有用地形，通常难以保持连通性。\n里昂说：“如果这架飞机没有起飞和飞行的话，我们已经执行了海军不会飞的任务，因为这是他们从飞机上与他们的飞机交谈的唯一途径。\n 全球鹰是长期耐力，高空无人机可以在空中花费近34小时。不过，里昂表示，EQ-4的有效载荷舱还有其他通讯系统，如Freedom 550。\n空军联合紧急作战需求声明的范围还有待确定，但诺斯罗普之外的其他人可能会拿出自己的技术。例如，波音公司已经开发出一种名为Talon HATE的数据链接舱，设计由F-15携带。 5月份，该公司证明，装备了Talon HATE吊舱的两架F-15C可以与F-22进行通讯。\n";
                this.falseData = true;
            }
            else {
                this.demoService.getTranslate(this.translateContent, this.fromId, this.toId)
                    .subscribe(function (result) {
                    //console.log(result);
                    _this.colorIndexT = 2;
                    _this.getColorT();
                    _this.translateBtn = '翻译完成';
                    _this.translate = result.msg.trans_result[0].dst;
                    //console.log(this.translate);
                    _this.resultT = _this.translate;
                    _this.falseData = false;
                });
            }
        }
    };
    DemoComponent.prototype.getColor = function () {
        if (this.colorIndex == 1) {
            return {
                'background': '#339bd4'
            };
        }
        else {
            return {
                'background': '#ff7c35'
            };
        }
    };
    DemoComponent.prototype.getColorT = function () {
        if (this.colorIndexT == 1) {
            return {
                'background': '#339bd4'
            };
        }
        else {
            return {
                'background': '#ff7c35'
            };
        }
    };
    return DemoComponent;
}());
DemoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-demo',
        template: __webpack_require__("../../../../../src/app/demo/demo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/demo/demo.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__common_services_demo_service__["a" /* DemoService */], __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_services_demo_service__["a" /* DemoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_services_demo_service__["a" /* DemoService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], DemoComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=demo.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header-wrapper {\n  position: fixed;\n  height: 80px;\n  width: 100%;\n  top: 0;\n  left: 0;\n  background: #2f2f2f;\n  z-index: 1000;\n}\n.container img{\n  position: absolute;\n  top: 15px;\n  outline: none;\n  cursor: pointer;\n}\n.header-title{\n  text-align: center;\n  color: #f0f0f0;\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 80px;\n}\n\n.container button{\n  position: absolute;\n  top: 30px;\n  right: 0;\n}\n.container button.main{\n  position: absolute;\n  top: 30px;\n  right: 100px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"header-wrapper\">\n  <div class=\"container\">\n    <img routerLink=\"/text_demo\" src=\"../assets/header/logo.png\"/>\n    <p class=\"header-title\">云思创智沉墨自然语言挖掘系统软件</p>\n    <!--<button routerLink=\"/text_demo\" class=\"main\">主页面</button>\n    <button routerLink=\"/text_result\">查看分析结果</button>-->\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Administrator on 2017/7/4 0004.
 */

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        styles: [__webpack_require__("../../../../../src/app/header/header.component.css")],
        template: __webpack_require__("../../../../../src/app/header/header.component.html")
    })
], HeaderComponent);

//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_demo/css/text_demo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container{\n  width:1200px !important;\n}\n.tabs{\n  width:100%;\n  height:52px;\n  border-radius: 5px;\n  -o-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  -ms-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  box-shadow:0 0 10px rgba(130,130,130,0.2);\n  margin:30px auto 20px;\n  overflow: hidden;\n}\n.tab_item{\n  float: left;\n  width:144px;\n  text-align: center;\n  line-height: 50px;\n  font-size: 16px;\n  color: #333333;\n  font-weight: 500;\n  cursor: pointer;\n}\n.tab_margin{\n  margin-left: 10px;\n}\n.tab_focus{\n  color: #4db9d3;\n  border-bottom: 2px solid #4db9d3;\n}\n.textarea{\n  width:1140px;\n  height:414px;\n  border:0;\n  border-radius: 5px;\n  -o-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  -ms-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  box-shadow:0 0 10px rgba(130,130,130,0.2);\n  resize : none;\n  outline: none;\n  color: #333333;\n  font-size: 16px;\n  padding:22px 30px 0 30px;\n  line-height: 34px;\n}\n\ntextarea::-webkit-input-placeholder {\n  color: #999999;\n}\ntextarea:-ms-input-placeholder {\n  color: #999999;\n}\ntextarea:-moz-placeholder, textarea:-moz-placeholder {\n  color:#999999;\n}\ntextarea::-moz-placeholder, textarea::-moz-placeholder {\n  color:#999999;\n}\n.btn{\n  width:100%;\n  height:52px;\n  line-height: 52px;\n  font-size: 16px;\n  color: #f0f0f0;\n  text-align: center;\n  margin-top: -4px;\n  cursor: pointer;\n  display: block;\n  text-decoration: none;\n}\n.ready{\n  background: #b2b2b2;\n}\n.start{\n  background: #4db9d3;\n}\n.ongoing{\n  background: #f0854a;\n}\n.end{\n  background: #e96749;\n}\n.inputContent{\n  vertical-align: middle;\n  font-size: 16px;\n  text-align: center;\n}\n.uploadContainer{\n  width:100%;\n  border:0;\n  border-radius: 5px;\n  -o-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  -ms-box-shadow:0 0 10px rgba(130,130,130,0.2);\n  box-shadow:0 0 10px rgba(130,130,130,0.2);\n}\n\n.inputContentNo{\n  padding:182px 0 172px;\n}\n.inputContentYes{\n  padding:90px 0 96px !important;\n}\n.inputContent span{\n  margin:0 auto;\n  background: #4db9d3;\n  color: #f0f0f0;\n  display: block;\n  width:284px;\n  height:52px;\n  line-height: 52px;\n  text-align: center;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.inputContent p{\n  margin-top: 24px;\n  color: #999999;\n}\n#file{\n  display: none;\n}\nul,li{\n  list-style: none;\n  margin:0;\n  padding:0;\n}\n.uploadTxt{\n  font-size: 14px;\n  width:378px;\n  color: #4db9d3;\n  float: left;\n  display: inline-block;\n  text-align: left;\n  padding-top: 2px;\n}\n.uploadImg{\n  float: left;\n  display: inline-block;\n  width:378px;\n  text-align: right;\n  margin-bottom: 12px;\n}\n.imgMiddle{\n  display: inline-block;\n  vertical-align: middle;\n}\n.right{\n  margin-right: 12px;\n}\n.paddingRight{\n  padding-right: 20px;\n}\n.paddingLeft{\n  padding-left: 20px;\n}\ntd{\n  padding:0;\n}\n.uploadShow{\n  width:800px;\n  margin:0 auto;\n  padding-top: 80px;\n}\n.uploadTr{\n  border-collapse:collapse;\n  display: block;\n  padding:20px 0 10px 0;\n  overflow: hidden;\n}\n.border{\n  border-bottom: 1px solid #d3d3d3;\n}\n.progressouter{\n  width:776px;\n  height:18px;\n  background: #999999;\n  border:1px solid #b5b5b5;\n  border-radius: 10px;\n  box-shadow:0px 5px 5px #818181 inset;\n  clear: both;\n  margin:0 auto;\n  text-align: center;\n  color: #ffffff;\n  position: relative;\n}\n.progressouter span{\n  position: absolute;\n  z-index: 999;\n  color: #ffffff;\n  display: inline-block;\n  height:20px;\n  line-height: 20px;\n}\n.progressinner{\n  /*background: #ed8942;*/\n  background: linear-gradient(rgb(236,148,81),rgb(235,123,53));\n  border-radius: 10px;\n  height:18px;\n  /*box-shadow:0px 2px 2px #ccc inset;*/\n  margin:0 1px;\n}\n.dialog{\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(111, 111, 111, 0.3);\n  opacity: 1;\n}\n.dialogContainer{\n  position: absolute;\n  width: 800px;\n  height:auto;\n  top: 80px;\n  left: 50%;\n  margin-left: -400px;\n  background: #fff;\n  color: #FFF;\n  border-radius: 5px;\n  border:1px solid #ccc;\n  box-shadow:0 0 10px #999999;\n  z-index: 1111111;\n}\n.addDialogContainer{\n  top:50%;\n  width:506px;\n  left:50%;\n  margin-left: -253px;\n  margin-top: -195px;\n  font-size: 14px;\n}\n.dialogHeader{\n  background: #eeeeee;\n  color: #333333;\n  border-top-left-radius :5px;\n  border-top-right-radius:5px;\n}\n.dialogHeader,.dialogContent{\n  position: relative;\n  color: #333333;\n  left:0;\n}\n.dialogHeader span{\n  display: block;\n  height:40px;\n  line-height: 40px;\n  padding-left: 34px;\n  margin-bottom: 42px;\n}\n.delSys{\n  text-align: center;\n  padding:50px 0 42px;\n}\n.diabtn{\n  display: inline-block;\n  color: #333333;\n  font-size: 14px;\n  width:114px;\n  height:30px;\n  text-align: center;\n  line-height: 30px;\n  background: #eeeeee;\n  border-radius: 5px;\n  border:1px solid #d3d3d3;\n  margin-left: 14px;\n  text-decoration: none;\n}\n@media only all and (max-width: 1600px) {\n  .container {\n    width: 1170px !important;\n  }\n  .textarea{\n    width: 1110px !important;\n  }\n  .uploadShow{\n    width:770px !important;\n  }\n  .progressouter{\n    width:746px !important;\n  }\n  .uploadTxt,.uploadImg{\n    width:363px !important;\n  }\n}\n@media only all and (max-width: 1400px) {\n  .container {\n    width: 998px !important;\n  }\n  .textarea{\n    width: 938px !important;\n  }\n  .uploadShow{\n    width:598px !important;\n  }\n  .progressouter{\n    width:574px !important;\n  }\n  .uploadTxt,.uploadImg{\n    width:277px !important;\n  }\n}\n@media only all and (max-width: 1170px) {\n  .container {\n    width: 768px !important;\n  }\n  .textarea{\n    width: 708px !important;\n  }\n  .uploadShow{\n    width:368px !important;\n  }\n  .progressouter{\n    width:344px !important;\n  }\n  .uploadTxt,.uploadImg{\n    width:162px !important;\n  }\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_demo/templates/text_demo.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container padding-header\">\n  <div class=\"tabs\">\n    <div class=\"tab_item tab_margin\" (click)=\"textDemo()\" [class.tab_focus]=\"textShow==1\">文本DEMO</div>\n    <div class=\"tab_item\" (click)=\"uploadText()\" [class.tab_focus]=\"textShow==2\">上传文本文件</div>\n    <!--<div class=\"tab_item\" (click)=\"bigText()\" [class.tab_focus]=\"textShow==3\">超大文本文件</div>-->\n  </div>\n  <div [style.display]=\"textShow==1?'':'none'\">\n    <textarea class=\"textarea\" maxlength=2000 [(ngModel)]=\"txtValue\" placeholder=\"建议输入2000字以内\" id=\"demoTxt\" (keyup)=\"textChange()\"></textarea>\n    <a class=\"btn ready\" [style.display]=\"textBtn==1?'':'none'\">开始文本分析</a>\n    <a class=\"btn start\" [style.display]=\"textBtn==2?'':'none'\" (click)=\"textStart(txtValue)\">开始文本分析</a>\n    <a class=\"btn ongoing\" [style.display]=\"textBtn==3?'':'none'\">文本分析中...</a>\n    <a class=\"btn end\" [style.display]=\"textBtn==4?'':'none'\" (click)=\"analysisResult()\" routerLinkActive=\"active\" routerLink=\"/text_result\">查看文本分析结果</a>\n  </div>\n  <div [style.display]=\"textShow==2?'':'none'\">\n    <div class=\"uploadContainer\" id=\"uploadTxt\">\n      <table class=\"uploadShow\" *ngIf=\"showArr.length>0\">\n        <tr *ngFor=\"let item of showArr;let i =index\" class=\"uploadTr\" [ngClass]=\"{border: item.headers.flag==1}\">\n          <td class=\"uploadTxt paddingLeft\"><img src=\"../assets/text_input/unupload.png\" class=\"imgMiddle right\" *ngIf=\"item.progress==0\"/><img src=\"../assets/text_input/upload.png\" class=\"imgMiddle right\"  *ngIf=\"item.progress!=100&&(item.progress!=0)\"/>{{item.file.name}}<span *ngIf=\"(item.file.size/1024)>=1024\">（{{item.file.size/1024/1024|number:'1.2-2'}}）MB</span><span *ngIf=\"(item.file.size/1024)<1024\">（{{item.file.size/1024|number:'1.2-2'}}）KB</span></td>\n          <td class=\"uploadImg paddingRight\"><img src=\"../assets/text_input/delete.png\" class=\"imgMiddle\" (click)=\"remove(i)\" [style.display]=\"removeBtn==1?'':'none'\"/></td>\n          <div class=\"progressouter\" *ngIf=\"item.headers.flag==0||(!item.headers.flag)\">\n            <span>{{item.progress}}%</span>\n            <div class=\"progressinner\" [ngStyle]=\"{width: item.progress + '%'}\"></div>\n          </div>\n        </tr>\n      </table>\n      <div class=\"inputContent inputContentNo\" [ngClass]=\"{inputContentYes: uploader.queue.length>0}\" ng2FileDrop [ngClass]=\"{dropping: isDropZoneOver}\" (fileOver)=\"fileOverBase($event)\" (onFileDrop)=\"fileDropOver($event)\" [uploader]=\"uploader\">\n        <span onclick=\"document.getElementById('file').click()\">上传文件（可拖拽）</span>\n        <input type=\"file\" multiple id=\"file\" name=\"file\" ng2FileSelect [uploader]=\"uploader\" accept=\".txt,.pdf,.doc,.docx\" (change)=\"selectedFileOnChanged($event)\"/>\n        <p>支持txt/doc/docx/pdf格式文件，建议总文件数10个以内</p>\n      </div>\n    </div>\n    <a class=\"btn ready\" *ngIf=\"showArr.length==0\">开始文本分析</a>\n    <a class=\"btn start\" *ngIf=\"showArr.length>0\" (click)=\"result()\" [style.display]=\"uploadBtn==2?'':'none'\">开始文本分析</a>\n    <a class=\"btn ongoing\" [style.display]=\"uploadBtn==3?'':'none'\">文本分析中...</a>\n    <a class=\"btn end\" [style.display]=\"uploadBtn==4?'':'none'\" (click)=\"analysisFile()\" routerLinkActive=\"active\" routerLink=\"/text_result\" >查看文本分析结果</a>\n  </div>\n  <div [style.display]=\"textShow==3?'':'none'\">\n\n  </div>\n  <div class=\"dialog\" [style.display]=\"fileError==1?'':'none'\">\n    <div class=\"dialogContainer addDialogContainer\">\n      <div class=\"dialogHeader\">\n        <span>系统提示</span>\n      </div>\n      <div class=\"dialogContent\" style=\"text-align: center\">\n        <img src=\"../assets/text_input//warning.png\" class=\"imgMiddle\"/>\n        <span class=\"imgMiddle\" style=\"padding-left: 10px\">{{error}}文件错误！</span>\n      </div>\n      <div class=\"delSys\">\n        <a href=\"javascript:void(0)\" class=\"diabtn\" (click)=\"cancel()\">确定</a>\n      </div>\n    </div>\n  </div>\n  <div class=\"dialog\" [style.display]=\"tip==1?'':'none'\">\n    <div class=\"dialogContainer addDialogContainer\">\n      <div class=\"dialogHeader\">\n        <span>系统提示</span>\n      </div>\n      <div class=\"dialogContent\" style=\"text-align: center\">\n        <img src=\"../assets/text_input//warning.png\" class=\"imgMiddle\"/>\n        <span class=\"imgMiddle\" style=\"padding-left: 10px\">该文件不得超于50MB！</span>\n      </div>\n      <div class=\"delSys\">\n        <a href=\"javascript:void(0)\" class=\"diabtn\" (click)=\"cancel()\">确定</a>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_demo/text_demo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__ = __webpack_require__("../../../../../src/app/common/services/text.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextDemoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TextDemoComponent = (function () {
    function TextDemoComponent(textService, router) {
        this.textService = textService;
        this.router = router;
        this.SERVER_URL = __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* SERVER_URL */];
        this.textShow = 1;
        this.textBtn = 1;
        this.uploadBtn = 1;
        this.progress = 0;
        this.sizeArr = [];
        this.size = 0;
        this.tip = 0;
        this.showArr = [];
        this.resultArr = [];
        this.allFlow = 0;
        this.removeBtn = 1;
        this.errorPaths = [];
        this.fileError = 0;
        this.flowArr = [];
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({
            url: __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* SERVER_URL */] + "/api/Files/uploadFile?appId=1",
            method: "POST",
            itemAlias: "file",
        });
    }
    TextDemoComponent.prototype.selectedFileOnChanged = function (event) {
        // 这里是文件选择完成后的操作处理
        for (var j = 0; j < this.uploader.queue.length; j++) {
            if (Number(j) > 9) {
                this.uploader.queue[10].remove();
                j -= 1;
                continue;
            }
            else {
                var bool = this.isInArray(this.showArr, this.uploader.queue[j]);
                if (bool == false) {
                    this.showArr.push(this.uploader.queue[j]);
                    this.getProgress(j);
                    //this.getSuccess(j);
                }
                else {
                    continue;
                }
            }
            this.upload();
        }
    };
    TextDemoComponent.prototype.upload = function () {
        if (this.showArr.length == 0) {
            this.uploadBtn = 1;
        }
        else if (this.showArr.length > 0) {
            this.uploadBtn = 2;
        }
    };
    TextDemoComponent.prototype.isInArray = function (arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    };
    TextDemoComponent.prototype.remove = function (i) {
        this.showArr.splice(i, 1);
        for (var j in this.errorPaths) {
            if (this.showArr[i].file.name == this.errorPaths[j]) {
                this.errorPaths.splice(Number(j), 1);
            }
            console.log(this.showArr[i].file.name);
        }
        if (this.uploader.queue[i].isUploading) {
            this.uploader.queue[i].cancel();
            this.uploader.queue[i].remove();
        }
        else {
            this.uploader.queue[i].remove();
        }
        if (this.showArr.length == 0) {
            this.uploadBtn = 1;
        }
        this.analysis(i);
    };
    TextDemoComponent.prototype.fileOverBase = function (event) {
        // 拖拽状态改变的回调函数
    };
    TextDemoComponent.prototype.fileDropOver = function (event) {
        // 文件拖拽完成的回调函数
        for (var j = 0; j < this.uploader.queue.length; j++) {
            if (j > 9) {
                this.uploader.queue[10].remove();
                j -= 1;
                continue;
            }
            else {
                var bool = this.isInArray(this.showArr, this.uploader.queue[j]);
                if (bool == false) {
                    this.showArr.push(this.uploader.queue[j]);
                    var type = this.showArr[j].file.name.split('.').pop().toLowerCase();
                    if (type == 'txt' || type == 'doc' || type == 'docx' || type == 'pdf') {
                        this.getProgress(j);
                    }
                    else {
                        this.showArr.splice(Number(j), 1);
                        this.uploader.queue[j].remove();
                    }
                }
                else {
                    continue;
                }
            }
        }
        console.log(this.uploader.queue);
        this.upload();
    };
    TextDemoComponent.prototype.analysis = function (i) {
        var index = this.uploader.getIndexOfItem(this.uploader.queue[i]);
        this.resultArr.splice(index, 1);
        this.content = this.resultArr.join(',');
        this.flowArr.splice(index, 1);
        for (var j in this.flowArr) {
            this.allFlow = this.allFlow + this.flowArr[j];
        }
        this.flow = this.allFlow.toString();
        //console.log(this.content);
        //console.log(this.flow);
    };
    TextDemoComponent.prototype.getProgress = function (j) {
        var _this = this;
        if (j > 9) {
            this.showArr.splice(10, 1);
            return;
        }
        else {
            this.uploader.onProgressItem = function (fileItem, progress) {
                _this.progress = 0;
                if (progress == 100) {
                    setTimeout(function () {
                        fileItem.headers.flag = 1;
                    }, 300);
                }
            };
            this.uploader.queue[j].onSuccess = function (response, status, headers) {
                if (JSON.parse(response).errorPaths) {
                    _this.errorPaths.push(JSON.parse(response).errorPaths);
                }
                _this.resultArr.push(JSON.parse(response).content);
                _this.flowArr.push(JSON.parse(response).flow);
                /*        console.log(this.resultArr);
                        console.log(this.flowArr);*/
                _this.allFlow = _this.allFlow + JSON.parse(response).flow;
                var b = _this.resultArr.join(',');
                var c = _this.errorPaths.join(',');
                if (j == _this.uploader.queue.length - 1) {
                    _this.content = b;
                    _this.error = c;
                    _this.flow = _this.allFlow.toString();
                }
            };
            //this.uploader.uploadAll();
            this.uploader.queue[j].upload();
        }
    };
    TextDemoComponent.prototype.result = function () {
        var _this = this;
        //console.log(this.uploader.queue);
        for (var i in this.uploader.queue) {
            if (Number(i) > 9) {
                continue;
            }
            else {
                this.sizeArr.push(this.uploader.queue[i].file.size);
                this.size += this.uploader.queue[i].file.size;
                if (this.uploader.queue[i].progress != 100) {
                    this.uploader.queue[i].remove();
                }
            }
        }
        if ((this.size / 1024 / 1024) > 50) {
            this.tip = 1;
            return false;
        }
        this.uploadBtn = 3;
        this.removeBtn = 2;
        console.log(this.error);
        if (this.errorPaths.length > 0) {
            this.fileError = 1;
            this.removeBtn = 1;
            this.uploadBtn = 2;
        }
        else {
            this.textService.setFile(this.content, 'file', 1, 2000, this.flow)
                .subscribe(function (result) {
                _this.uploadBtn = 4;
                _this.fileId = result;
            });
        }
    };
    TextDemoComponent.prototype.textStart = function (content) {
        var _this = this;
        this.textBtn = 3;
        this.textService.setText(encodeURI(content))
            .subscribe(function (result) {
            _this.id = result;
            _this.textBtn = 4;
            //console.log(this.id);
        });
    };
    TextDemoComponent.prototype.analysisResult = function () {
        this.router.navigate(['/text_result'], { queryParams: { id: this.id } });
    };
    TextDemoComponent.prototype.analysisFile = function () {
        this.router.navigate(['/text_result'], { queryParams: { id: this.fileId } });
    };
    TextDemoComponent.prototype.cancel = function () {
        this.tip = 0;
        this.fileError = 0;
    };
    TextDemoComponent.prototype.textChange = function () {
        if (this.txtValue) {
            this.textBtn = 2;
        }
        else {
            this.textBtn = 1;
        }
    };
    TextDemoComponent.prototype.textDemo = function () {
        this.textShow = 1;
    };
    TextDemoComponent.prototype.uploadText = function () {
        this.textShow = 2;
    };
    TextDemoComponent.prototype.bigText = function () {
        this.textShow = 3;
    };
    return TextDemoComponent;
}());
TextDemoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'text_demo',
        styles: [__webpack_require__("../../../../../src/app/text_demo/css/text_demo.component.css")],
        template: __webpack_require__("../../../../../src/app/text_demo/templates/text_demo.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _b || Object])
], TextDemoComponent);

var _a, _b;
//# sourceMappingURL=text_demo.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/auto-summary/auto.summary.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".left.item .content {\n  font-size: 15px;\n  line-height: 35px;\n  padding: 30px;\n  color: #333;\n}\n.top{\n  overflow: hidden;\n}\n.thulac,.ltp{\n  width:40%;\n  float: left;\n  cursor: pointer;\n}\n.thulac input,.ltp input{\n  margin-right: 10px;\n}\n.radio{\n  padding:20px 0px 0px 34px;\n  color: #666;\n  font-size: 15px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/auto-summary/auto.summary.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">自动摘要</div>\n    <div class=\"content\" id=\"content\">\n        <cpt-extract [datalist]=\"d_summary\" *ngIf=\"content==1\"></cpt-extract>\n        <cpt-abstract [datalist]=\"d_summary\" *ngIf=\"content==0\"></cpt-abstract>\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">摘要提取说明</div>\n<!--    <div class=\"radio\">\n      <div class=\"ltp\"><input type=\"radio\" name=\"waod\" value=\"ltp\" checked  (click)=\"toggle('extract')\"/>关键字摘要</div>\n      <div class=\"thulac\"><input type=\"radio\" name=\"waod\" value=\"thulac\"  (click)=\"toggle('abstract')\"/>语义摘要</div>\n    </div>-->\n    <div class=\"title\" style=\"padding-left: 30px;padding-top: 20px\">关键字摘要</div>\n    <div class=\"content\">\n      <cpt-title-des  des=\"自动摘要是计算机自动从原始文本中提取简单连贯的短文以反映中心内容。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/auto-summary/auto.summary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoSummaryComponent; });
/**
 * 自动摘要
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutoSummaryComponent = (function () {
    function AutoSummaryComponent() {
        this.d_summary = {};
        this.content = 1;
    }
    /*  ngOnChanges(...args: any[]) {
        console.log(this.d_summary);
      }*/
    AutoSummaryComponent.prototype.toggle = function (item) {
        if (item == 'extract') {
            this.content = 1;
        }
        else if (item == 'abstract') {
            this.content = 0;
        }
    };
    return AutoSummaryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AutoSummaryComponent.prototype, "d_summary", void 0);
AutoSummaryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-auto-summary',
        styles: [__webpack_require__("../../../../../src/app/text_result/auto-summary/auto.summary.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/auto-summary/auto.summary.component.html")
    })
], AutoSummaryComponent);

//# sourceMappingURL=auto.summary.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".checkbox-wrapper {\n/*  display: flex;\n  flex-wrap: wrap;*/\n}\n.checkbox {\n  position: relative;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33%;\n          flex: 0 0 33%;\n  width: 33%;\n  margin-bottom: 10px;\n  height: 20px;\n}\n.checkbox div{\n  word-wrap:break-word;\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n}\ninput {\n  position: absolute;\n  vertical-align: middle;\n  top: 5px;\n  left: 10px;\n}\n.color {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  top: 6px;\n  left: 29px;\n}\n.left-mini.color {\n  left: 15px;\n}\n.des {\n  position: absolute;\n  top: 2px;\n  left: 45px;\n  font-size: 14px;\n  color: #333;\n}\n.left-mini.des {\n  left: 35px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-wrapper\">\n  <div>{{datalist.abstract_summaries}}</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractSummariesComponent; });
/**
 * 多选择框
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AbstractSummariesComponent = (function () {
    function AbstractSummariesComponent() {
        this.datalist = {};
    }
    return AbstractSummariesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AbstractSummariesComponent.prototype, "datalist", void 0);
AbstractSummariesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-abstract',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/abstract_summaries/abstract_summaries.component.html")
    })
], AbstractSummariesComponent);

//# sourceMappingURL=abstract_summaries.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/checkbox/checkbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".checkbox-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.checkbox {\n  position: relative;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33%;\n          flex: 0 0 33%;\n  width: 33%;\n  margin-bottom: 10px;\n  height: 20px;\n}\ninput {\n  position: absolute;\n  vertical-align: middle;\n  top: 5px;\n  left: 10px;\n}\n.color {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  top: 6px;\n  left: 29px;\n}\n.left-mini.color {\n  left: 15px;\n}\n.des {\n  position: absolute;\n  top: 2px;\n  left: 45px;\n  font-size: 14px;\n  color: #333;\n}\n.left-mini.des {\n  left: 35px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/checkbox/checkbox.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-wrapper\">\n  <div class=\"checkbox\" *ngFor=\"let item of data; let i = index\">\n    <input type=\"checkbox\" *ngIf=\"checkbox\"  (change)=\"$checkbox_change(i)\" [checked]=\"item.show\">\n    <div class=\"color\" [ngClass]=\"{'left-mini': !checkbox}\" [ngStyle]=\"{'background': item.color}\"></div>\n    <div class=\"des\" [ngClass]=\"{'left-mini': !checkbox}\">{{item.des}}</div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/checkbox/checkbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxComponent; });
/**
 * 多选择框
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this.checkbox = true;
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selectNotAll = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CheckboxComponent.prototype.$checkbox_change = function (index) {
        this.data[index].show = !this.data[index].show;
        this.dataChange.emit(this.data);
        if (!this.data[index].show) {
            this.selectNotAll.emit();
        }
    };
    return CheckboxComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "checkbox", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], CheckboxComponent.prototype, "dataChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], CheckboxComponent.prototype, "selectNotAll", void 0);
CheckboxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-checkbox',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/checkbox/checkbox.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/checkbox/checkbox.component.html")
    })
], CheckboxComponent);

var _a, _b;
//# sourceMappingURL=checkbox.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".extract-wrapper {\n}\n\n.extract-title{\n  margin-bottom: 36px;\n  -webkit-box-flex:1;\n  -ms-flex:1;\n      flex:1;\n}\n.extract-title span{\n  width:182px;\n  height:44px;\n  display: inline-block;\n  background: #a0a0a0;\n  color: #fff;\n  border-radius: 5px;\n  text-align: center;\n  margin-right: 14px;\n  line-height: 44px;\n  font-size: 16px;\n  cursor: pointer;\n}\n.extract-title .focus{\n  background: #84ccc9;\n}\n.extract-content{\n\n}\n.extract-content div{\n  word-wrap:break-word;\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n\n}\n@media (max-width: 1400px) {\n  .extract-title span{width:142px;}\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"extract-box\">\n  <div class=\"extract-wrapper\">\n    <div class=\"extract-title\">\n      <span (click)=\"summary10()\" [class.focus]=\"textIndex==1\">10%摘要</span>\n      <span (click)=\"summary30()\" [class.focus]=\"textIndex==2\">30%摘要</span>\n      <span (click)=\"summary50()\" [class.focus]=\"textIndex==3\">50%摘要</span>\n    </div>\n    <div class=\"extract-content\">\n      <div *ngIf=\"textIndex==1\">{{datalist.extract_summaries_10}}</div>\n      <div *ngIf=\"textIndex==2\">{{datalist.extract_summaries_30}}</div>\n      <div *ngIf=\"textIndex==3\">{{datalist.extract_summaries_50}}</div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtractSummariesComponent; });
/**
 * 多选择框
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ExtractSummariesComponent = (function () {
    function ExtractSummariesComponent() {
        this.textIndex = 1;
        this.datalist = {};
    }
    ExtractSummariesComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(this.datalist);
    };
    ExtractSummariesComponent.prototype.summary10 = function () {
        this.textIndex = 1;
    };
    ExtractSummariesComponent.prototype.summary30 = function () {
        this.textIndex = 2;
    };
    ExtractSummariesComponent.prototype.summary50 = function () {
        this.textIndex = 3;
    };
    return ExtractSummariesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ExtractSummariesComponent.prototype, "datalist", void 0);
ExtractSummariesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-extract',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/extract_summaries/extract_summaries.component.html")
    })
], ExtractSummariesComponent);

//# sourceMappingURL=extract_summaries.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/ltp/ltp.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tip-class {\n  display: inline-block;\n  margin: 5px 0;\n  transition: 0.3s all linear 0s;\n}\n.tip-class:first-child {\n  margin: 0 0;\n}\n.tips {\n  display: inline-block;\n  transition: 0.3s all linear 0s;\n}\n.tip {\n  display: inline-block;\n  padding: 3px 8px;\n  color: #fff;\n  margin: 4px;\n  height: 22px;\n  line-height: 22px;\n  font-size: 14px;\n  transition: 0.1s all linear 0s;\n  cursor: default;\n}\n/*.tip:hover {\n  box-shadow: 0 0 7px rgba(0,0,0,0.6);\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/ltp/ltp.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tip-wrapper\">\n  <div class=\"tip-class\" *ngFor=\"let item of data; let i = index\" >\n    <div  class=\"tip\"  [ngStyle]=\"{'background': item.color}\" *ngIf=\"item.words!='<br/>'\">\n      {{item.words}}\n    </div>\n    <div  class=\"tip\" id=\"tip\" *ngIf=\"item.words=='<br/>'\">\n      {{item.words}}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/ltp/ltp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LtpTipComponent; });
/**
 * Tip
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LtpTipComponent = (function () {
    function LtpTipComponent() {
    }
    return LtpTipComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LtpTipComponent.prototype, "data", void 0);
LtpTipComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ltp-tip',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/ltp/ltp.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/ltp/ltp.component.html")
    })
], LtpTipComponent);

//# sourceMappingURL=ltp.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/tip/tip.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tip-class {\n  display: inline-block;\n  margin: 5px 0;\n  transition: 0.3s all linear 0s;\n}\n.tip-class:first-child {\n  margin: 0 0;\n}\n.tips {\n  display: inline-block;\n  transition: 0.3s all linear 0s;\n}\n.tip {\n  display: inline-block;\n  padding: 3px 8px;\n  color: #fff;\n  margin: 4px;\n  height: 22px;\n  line-height: 22px;\n  font-size: 14px;\n  transition: 0.1s all linear 0s;\n  cursor: default;\n}\n/*.tip:hover {\n  box-shadow: 0 0 7px rgba(0,0,0,0.6);\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/tip/tip.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tip-wrapper\">\n  <div class=\"tip-class\" *ngFor=\"let item of data; let i = index\" style=\"display: block;\">\n    <div class=\"tips\" *ngIf=\"item.show\">\n      <div  class=\"tip\" [ngStyle]=\"{'background': item.color}\" *ngFor=\"let tip of item.words\">\n        {{tip}}\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/tip/tip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TipComponent; });
/**
 * Tip
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TipComponent = (function () {
    function TipComponent() {
    }
    return TipComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TipComponent.prototype, "data", void 0);
TipComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-tip',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/tip/tip.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/tip/tip.component.html")
    })
], TipComponent);

//# sourceMappingURL=tip.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/title-des/title.des.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.title-des-wrapper .title {\n  font-size: 16px;\n  color: #333;\n  margin: 0 0 15px;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 10px;\n  margin: 0;\n  display: block;\n}\n.title-des-wrapper .des {\n  padding: 0 10px;\n  color: #666;\n  font-size: 13px;\n  line-height: 24px;\n}\n\n.title-des-wrapper ul.des {\n  padding: 0 10px 0 30px;\n}\n/*.no-title {\n  padding-top: 10px !important;\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/title-des/title.des.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"title-des-wrapper\">\n  <div class=\"title\" *ngIf=\"title\">\n    {{title}}\n  </div>\n  <div class=\"des\" *ngIf=\"des\" [ngClass]=\"{'no-title': !title}\">\n    {{des}}\n  </div>\n  <ul class=\"des\" *ngIf=\"ul\" [ngClass]=\"{'no-title': !title}\">\n    <li *ngFor=\"let item of lis\">{{item}}</li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/title-des/title.des.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitleDesComponent; });
/**
 * title-des
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TitleDesComponent = (function () {
    function TitleDesComponent() {
        this.title = '';
        this.des = '';
        this.ul = '';
    }
    TitleDesComponent.prototype.ngOnInit = function () {
        this.lis = this.ul.split(',');
    };
    return TitleDesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TitleDesComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TitleDesComponent.prototype, "des", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TitleDesComponent.prototype, "ul", void 0);
TitleDesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-title-des',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/title-des/title.des.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/title-des/title.des.component.html")
    }),
    __metadata("design:paramtypes", [])
], TitleDesComponent);

//# sourceMappingURL=title.des.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordBox/wordbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".checkbox-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.checkbox {\n  position: relative;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 33%;\n          flex: 0 0 33%;\n  width: 33%;\n  margin-bottom: 10px;\n  height: 20px;\n}\ninput {\n  position: absolute;\n  vertical-align: middle;\n  top: 5px;\n  left: 10px;\n}\n.color {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  top: 6px;\n  left: 29px;\n}\n.left-mini.color {\n  left: 15px;\n}\n.des {\n  position: absolute;\n  top: 2px;\n  left: 45px;\n  font-size: 14px;\n  color: #333;\n}\n.left-mini.des {\n  left: 35px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordBox/wordbox.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-wrapper\">\n  <div class=\"checkbox\" *ngFor=\"let item of data; let i = index\">\n    <!--<input type=\"checkbox\" *ngIf=\"checkbox\"  (change)=\"$checkbox_change(i)\" [checked]=\"item.show\">-->\n    <div class=\"color\" [ngClass]=\"{'left-mini': !checkbox}\" [ngStyle]=\"{'background': item.taggingColor}\"></div>\n    <div class=\"des\" [ngClass]=\"{'left-mini': !checkbox}\">{{item.taggingName}}</div>\n  </div>\n</div>\n<!--<div class=\"checkbox-wrapper\">\n  <div class=\"checkbox\" *ngFor=\"let item of data; let i = index\">\n    <input type=\"checkbox\" *ngIf=\"checkbox\"  (change)=\"$checkbox_change(i)\" [checked]=\"item.show\">\n    <div class=\"color\" [ngClass]=\"{'left-mini': !checkbox}\" [ngStyle]=\"{'background': item.color}\"></div>\n    <div class=\"des\" [ngClass]=\"{'left-mini': !checkbox}\">{{item.des}}</div>\n  </div>\n</div>-->\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordBox/wordbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordboxComponent; });
/**
 * 多选择框
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WordboxComponent = (function () {
    function WordboxComponent() {
        this.checkbox = true;
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selectNotAll = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.temArr = [];
        /*  $checkbox_change (index) {
            this.data[index].show = !this.data[index].show;
            this.dataChange.emit(this.data)
            if (!this.data[index].show) {
              this.selectNotAll.emit();
            }
          }*/
    }
    WordboxComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(this.data);
        /*    if(this.data.length>0){
            this.tem = this.data[0].code;
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].code != this.tem){
                this.temArr.push(this.data[i]);
              }
            }
            console.log(this.temArr);
            }*/
    };
    return WordboxComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], WordboxComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], WordboxComponent.prototype, "checkbox", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], WordboxComponent.prototype, "dataChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], WordboxComponent.prototype, "selectNotAll", void 0);
WordboxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cpt-wordbox',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/wordBox/wordbox.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/wordBox/wordbox.component.html")
    })
], WordboxComponent);

var _a, _b;
//# sourceMappingURL=wordbox.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordtip/wordtip.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tip-class {\n  display: inline-block;\n  margin: 5px 0;\n  transition: 0.3s all linear 0s;\n}\n.tip-class:first-child {\n  margin: 0 0;\n}\n.tips {\n  display:block !important;\n}\n.tip {\n  display: inline-block;\n  padding: 3px 8px;\n  color: #fff;\n  margin: 4px;\n  height: 22px;\n  line-height: 22px;\n  font-size: 14px;\n  transition: 0.1s all linear 0s;\n  cursor: default;\n}\n/*.tip:hover {\n  box-shadow: 0 0 7px rgba(0,0,0,0.6);\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordtip/wordtip.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tip-wrapper\">\n  <div class=\"tip-class\" *ngFor=\"let item of data; let i = index\" [ngClass]=\"{tips: item.words=='<br/>'}\" >\n    <div  class=\"tip\"  [ngStyle]=\"{'background': item.color}\" *ngIf=\"item.words!='<br/>'\" >\n      {{item.words}}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/component/wordtip/wordtip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordTipComponent; });
/**
 * Tip
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WordTipComponent = (function () {
    function WordTipComponent() {
    }
    return WordTipComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], WordTipComponent.prototype, "data", void 0);
WordTipComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'word-tip',
        styles: [__webpack_require__("../../../../../src/app/text_result/component/wordtip/wordtip.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/component/wordtip/wordtip.component.html")
    })
], WordTipComponent);

//# sourceMappingURL=wordtip.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".emotional-recognition{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 20px 75px !important;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.emotional-recognition .img {\n  position: relative;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 118px;\n          flex: 0 0 118px;\n  font-size: 12px;\n  color: #333;\n  text-align: center;\n}\n.img img {\n  height: 58px;\n  width: 58px;\n  display: block;\n  margin-left: 30px;\n  margin-bottom: 12px;\n}\n.emotional-recognition .bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  height: 60px;\n  width: 100%;\n  border-radius: 30px;\n  overflow: hidden;\n}\n.emotional-recognition .bar div {\n  height: 100%;\n}\n.emotional-recognition .bar .pos{\n  background: #71d3cf;\n}\n.emotional-recognition .bar .neg{\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background: #eb8168;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">情感识别</div>\n    <div class=\"content emotional-recognition\">\n      <div class=\"img\">\n        <img src=\"../../../assets/text_result/neg.png\" alt=\"\">\n        <label>负面指数 : {{d_value.neg}}</label>\n      </div>\n      <div class=\"bar\">\n        <div class=\"neg\"></div>\n        <div class=\"pos\" [ngStyle]=\"getStyle()\"></div>\n      </div>\n      <div class=\"img\">\n        <img src=\"../../../assets/text_result/pos.png\" alt=\"\">\n        <label>正面指数 : {{d_value.pos}}</label>\n      </div>\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">情感识别说明</div>\n    <div class=\"content\">\n\n      <cpt-title-des  des=\"情感识别即文本倾向性分析，就是计算机判断人们的看法或评论是属于对事物的积极或消极意见。\"></cpt-title-des>\n\n      <cpt-title-des title=\"情感指数\"  ul=\"情感微弱：0 - 0.2,情感一般：0.2 - 0.4,情感强烈：0.4 - 0.8,非常强烈：0.8 - 1\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmotionalRecognitionComponent; });
/**
 * 情感识别
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmotionalRecognitionComponent = (function () {
    function EmotionalRecognitionComponent() {
    }
    EmotionalRecognitionComponent.prototype.getStyle = function () {
        return {
            'flex': '0 0 ' + this.percent,
            'width': this.percent
        };
    };
    EmotionalRecognitionComponent.prototype.toPercent = function (point) {
        /* if(point==0||point==1){
           return point;
         }else{
     
         }*/
        var str = point * 100 + "%";
        return str;
    };
    EmotionalRecognitionComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.d_value.pos) {
            this.percent = this.toPercent(this.d_value.pos);
        }
    };
    EmotionalRecognitionComponent.prototype.ngOnInit = function () {
    };
    return EmotionalRecognitionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EmotionalRecognitionComponent.prototype, "d_value", void 0);
EmotionalRecognitionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-emotional-recognition',
        styles: [__webpack_require__("../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/emotional-recognition/emotional.recognition.component.html")
    })
], EmotionalRecognitionComponent);

//# sourceMappingURL=emotional.recognition.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/entity-recognition/entity.recognition.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/entity-recognition/entity.recognition.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">实体识别</div>\n    <div class=\"content\">\n      <cpt-tip [data]=\"d_word_list\"></cpt-tip>\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">实体图例\n      <div class=\"select-all\">\n        <input type=\"checkbox\" (change)=\"$selected_all_change()\" [checked]=\"s_selected_all\"><span>全选</span>\n      </div></div>\n    <div class=\"content\">\n      <cpt-checkbox [(data)]=\"d_word_list\" (selectNotAll) = \"$selected_not_all()\"></cpt-checkbox>\n      <cpt-title-des title=\"实体识别说明\" des=\"实体识别是识别文本中具有特定意义的实体，主要包括人名、地名、机构名、专有名词等。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/entity-recognition/entity.recognition.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityRecognitionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * 实体识别
 * Created by Administrator on 2017/7/6 0006.
 */

var EntityRecognitionComponent = (function () {
    function EntityRecognitionComponent() {
        this.s_selected_all = true;
    }
    EntityRecognitionComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.falseData == "true") {
            this.d_word_list = [
                {
                    "code": "nr",
                    "des": "人名",
                    "color": "#cce198",
                    "words": [
                        "Mike Lyons",
                        "里昂"
                    ]
                },
                {
                    "code": "nt",
                    "des": "机构名",
                    "color": "#80c269",
                    "words": [
                        "诺斯罗普•格鲁曼公司（Northrop Grumman）",
                        "英国皇家空军",
                        "波音公司"
                    ]
                },
                {
                    "code": "t",
                    "des": "时间词",
                    "color": "#88abda",
                    "words": [
                        "目前",
                        "未来",
                        "现在",
                        "今年",
                        "六个月",
                        "长期",
                        "34小时"
                    ]
                },
                {
                    "code": "ns",
                    "des": "地名",
                    "color": "#b3d465",
                    "words": [
                        "华盛顿",
                        "诺斯罗普•格鲁曼",
                        "美国",
                        "中东",
                        "诺斯罗普",
                        "加利福尼亚州",
                        "英国"
                    ]
                },
                {
                    "code": "nz",
                    "des": "其他专名",
                    "color": "#84ccc9",
                    "words": [
                        "诺斯罗普",
                        "F-16",
                        "F-35",
                        "F-22",
                        "全球鹰(Global Hawk)",
                        "MADL",
                        "IFDL",
                        "RQ-4“全球鹰”无人机",
                        "Freedom 550",
                        "Link 16",
                        "SADL",
                        "宝贝鱼III",
                        "F-35BS",
                        "EQ-4",
                        "电光/红外传感器",
                        "雷达",
                        "高空无人机",
                        "Talon HATE",
                        "数据链接舱",
                        "F-15",
                        "F-15C"
                    ]
                }
            ];
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = true;
            }
        }
        else {
            if (this.d_word_list.length) {
                for (var i = 0; i < this.d_word_list.length; i++) {
                    this.d_word_list[i].show = true;
                }
            }
        }
    };
    EntityRecognitionComponent.prototype.ngOnInit = function () {
    };
    EntityRecognitionComponent.prototype.$selected_all_change = function () {
        this.s_selected_all = !this.s_selected_all;
        if (this.s_selected_all) {
            // 全选
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = true;
            }
        }
        else {
            // 全不选 , 选中第一个
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = false;
            }
            this.d_word_list[0].show = true;
        }
    };
    EntityRecognitionComponent.prototype.$selected_not_all = function () {
        this.s_selected_all = false;
    };
    return EntityRecognitionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EntityRecognitionComponent.prototype, "d_word_list", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EntityRecognitionComponent.prototype, "falseData", void 0);
EntityRecognitionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-entity-recognition',
        styles: [__webpack_require__("../../../../../src/app/text_result/entity-recognition/entity.recognition.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/entity-recognition/entity.recognition.component.html")
    })
], EntityRecognitionComponent);

//# sourceMappingURL=entity.recognition.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/info-extract/info.extract.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/info-extract/info.extract.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">信息提取</div>\n    <div class=\"content info-extract\">\n\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">信息提取词云说明</div>\n    <div class=\"content\">\n      <cpt-title-des  des=\"信息提取是把文本中包含的信息进行结构化处理。并将抽取的信息以统一形式集成在一起。现以词云的形式进行展示，依词语显示大小来体现其重要程度。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/info-extract/info.extract.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoExtractComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * 信息提取
 * Created by Administrator on 2017/7/6 0006.
 */

var InfoExtractComponent = (function () {
    function InfoExtractComponent() {
    }
    InfoExtractComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //console.log(this.d_value);
        this.initJQcloud();
    };
    InfoExtractComponent.prototype.initJQcloud = function () {
        $(".info-extract").jQCloud(this.d_value);
    };
    return InfoExtractComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], InfoExtractComponent.prototype, "d_value", void 0);
InfoExtractComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-info-extract',
        styles: [__webpack_require__("../../../../../src/app/text_result/info-extract/info.extract.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/info-extract/info.extract.component.html")
    })
], InfoExtractComponent);

//# sourceMappingURL=info.extract.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/semantic-association/semantic.association.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/semantic-association/semantic.association.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">语义联想</div>\n    <div class=\"content echarts-semantic-association\">\n\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">语义联想说明</div>\n    <div class=\"content\">\n      <cpt-title-des  des=\"语义联想是对从文本中提取出来的实体进行逻辑关联，并从全网获取该实体的相关信息构建整体关系。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/semantic-association/semantic.association.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SemanticAssociationComponent; });
/**
 * 语意联想
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SemanticAssociationComponent = (function () {
    function SemanticAssociationComponent() {
    }
    SemanticAssociationComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.initEcharts();
    };
    SemanticAssociationComponent.prototype.ngOnInit = function () {
    };
    SemanticAssociationComponent.prototype.initEcharts = function () {
        /* 获取数据 */
        var json = this.semantic;
        console.log(json);
        //console.log(json);
        if (json.nodes) {
            var myChart = echarts.init(document.querySelector('.echarts-semantic-association'));
            myChart.showLoading();
            myChart.hideLoading();
            myChart.setOption({
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        // progressiveThreshold: 700,
                        data: json.nodes.map(function (node) {
                            if (node.symbolSize === 40) {
                                node.itemStyle = {
                                    normal: {
                                        color: '#71d3cf',
                                    }
                                };
                                node.label = {
                                    normal: {
                                        textStyle: {
                                            color: '#778498',
                                            fontSize: 16
                                        }
                                    }
                                };
                            }
                            else {
                                node.itemStyle = {
                                    normal: {
                                        color: '#ffb680',
                                    }
                                };
                                node.label = {
                                    normal: {
                                        textStyle: {
                                            color: '#778498',
                                            fontSize: 12
                                        }
                                    }
                                };
                            }
                            return node;
                        }),
                        edges: json.edges,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                            }
                        },
                        force: {
                            repulsion: 80,
                            gravity: 0.1,
                            edgeLength: 40,
                        },
                        roam: 'move',
                        draggable: true,
                        legendHoverLink: true,
                        focusNodeAdjacency: true,
                    }
                ]
            }, true);
        }
    };
    return SemanticAssociationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SemanticAssociationComponent.prototype, "semantic", void 0);
SemanticAssociationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-semantic-association',
        styles: [__webpack_require__("../../../../../src/app/text_result/semantic-association/semantic.association.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/semantic-association/semantic.association.component.html")
    })
], SemanticAssociationComponent);

//# sourceMappingURL=semantic.association.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/text-category/text.category.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/text-category/text.category.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">文本分类</div>\n    <div class=\"content echarts-text-category\">\n\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">文本分类说明</div>\n    <div class=\"content\">\n\n      <cpt-title-des  des=\"文本分类是利用计算机对文本内容按照一定的标准进行分类，不同企业对于分类的标准不尽相同。\"></cpt-title-des>\n\n      <cpt-title-des title=\"权重说明\"  ul=\"少量相关（0-0.5）,一般相关（0.5-0.85）,非常相关（0.85-1.0）\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/text-category/text.category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextCategoryComponent; });
/**
 * 文本分类
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextCategoryComponent = (function () {
    function TextCategoryComponent() {
    }
    TextCategoryComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //console.log(this.d_value);
        this.initEcharts();
    };
    /*  ngOnInit() {
        this.initEcharts();
      }*/
    TextCategoryComponent.prototype.initEcharts = function () {
        // 获取data数据
        var xAxis_data = [];
        var series_data = [];
        var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
        var colorList_index = 0;
        if (this.falseData == "true") {
            this.d_word_list = [
                {
                    "des": "航空",
                    "ratio": 0.9294629979133606
                },
                {
                    "des": "能源",
                    "ratio": 0.2629081718623638
                },
                {
                    "des": "采掘",
                    "ratio": 0.16932230442762375
                },
                {
                    "des": "艺术",
                    "ratio": 0.18710385113954544
                },
                {
                    "des": "历史",
                    "ratio": 0.1930453538894653
                },
                {
                    "des": "政治",
                    "ratio": 0.2366763055324554
                },
                {
                    "des": "经济",
                    "ratio": 0.486088427901268
                },
                {
                    "des": "文学",
                    "ratio": 0.20950971871614456
                },
                {
                    "des": "农业",
                    "ratio": 0.2846884429454803
                },
                {
                    "des": "电子",
                    "ratio": 0.23039214313030243
                },
                {
                    "des": "教育",
                    "ratio": 0.28738949447870255
                },
                {
                    "des": "体育",
                    "ratio": 0.1441804558038712
                },
                {
                    "des": "通信",
                    "ratio": 0.8443718180060387
                },
                {
                    "des": "军事",
                    "ratio": 0.95018726751208305
                },
                {
                    "des": "环境",
                    "ratio": 0.2593333876132965
                },
                {
                    "des": "法律",
                    "ratio": 0.20394407212734222
                },
                {
                    "des": "交通",
                    "ratio": 0.02123527392745018
                },
                {
                    "des": "医药",
                    "ratio": 0.20412097722291946
                },
                {
                    "des": "哲学",
                    "ratio": 0.2619313359260559
                },
                {
                    "des": "计算机",
                    "ratio": 0.25299073457717896
                }
            ];
        }
        else {
            this.d_word_list = [
                {
                    "des": "航空",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "能源",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "采掘",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "艺术",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "历史",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "政治",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "经济",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "文学",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "农业",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "电子",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "教育",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "体育",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "通信",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "军事",
                    "ratio": Math.random() * (1 - 0.9) + 0.9
                },
                {
                    "des": "环境",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "法律",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "交通",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "医药",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "哲学",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                },
                {
                    "des": "计算机",
                    "ratio": Math.random() * (0.2 - 0.05) + 0.05
                }
            ];
        }
        for (var i = 0; i < this.d_word_list.length; i++) {
            xAxis_data.push(this.d_word_list[i].des);
            series_data.push({
                value: this.d_word_list[i].ratio,
                itemStyle: {
                    normal: {
                        color: colorList[colorList_index]
                    }
                }
            });
            colorList_index++;
            if (colorList_index === colorList.length) {
                colorList_index = 0;
            }
        }
        // 基于准备好的dom，初始化echarts实例
        //console.log(xAxis_data);
        var myChart = echarts.init(document.querySelector('.echarts-text-category'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            /*  grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },*/
            xAxis: [
                {
                    type: 'category',
                    data: xAxis_data,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval: 0
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data: series_data
                }
            ]
        });
    };
    return TextCategoryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TextCategoryComponent.prototype, "d_word_list", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TextCategoryComponent.prototype, "falseData", void 0);
TextCategoryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-text-category',
        styles: [__webpack_require__("../../../../../src/app/text_result/text-category/text.category.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/text-category/text.category.component.html")
    })
], TextCategoryComponent);

//# sourceMappingURL=text.category.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/text-clusteri/text-clusteri.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".left.item .content {\n  font-size: 15px;\n  line-height: 35px;\n  padding: 30px;\n  color: #333;\n}\n.extract-title{\n  margin-bottom: 36px;\n}\n.extract-title span{\n  width:182px;\n  height:44px;\n  display: inline-block;\n  background: #a0a0a0;\n  color: #fff;\n  border-radius: 5px;\n  text-align: center;\n  margin-right: 14px;\n  line-height: 44px;\n  font-size: 16px;\n  cursor: pointer;\n}\n.extract-title .focus{\n  background: #84ccc9;\n}\n.extract-content div span{\n  border-bottom: 1px dashed #d9d9d9;\n  padding-bottom: 10px;\n  display: block;\n}\n.extract-content .extract-model{\n  margin-top: 20px;\n  padding: 0 20px;\n}\n@media (max-width: 1400px) {\n  .extract-title span{width:134px;}\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/text-clusteri/text-clusteri.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">文本聚类</div>\n    <div class=\"content\" id=\"content\">\n      <div class=\"extract-title\">\n        <span *ngFor=\"let item of cluster;let i=index\" (click)=\"text(item,i)\" [class.focus]=\"item.flag==1\">分类{{i+1}}</span>\n      </div>\n      <div class=\"extract-content\">\n        <div>\n          <div *ngFor=\"let item of cluster\" class=\"extract-model\" [style.display]=\"item.flag==1?'':'none'\">\n            <span *ngFor=\"let it of item.data\">{{it}}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">文本聚类说明</div>\n    <div class=\"content\">\n      <cpt-title-des  des=\"文本聚类是对多个文档进行聚类划分，文档相似度较高的为同类，文档相似度较低的为不同类。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/text-clusteri/text-clusteri.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextClusteriComponent; });
/**
 * 文本聚类
 * Created by Administrator on 2017/7/6 0006.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextClusteriComponent = (function () {
    function TextClusteriComponent() {
        this.tempObj = {};
    }
    TextClusteriComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(this.cluster);
        if (this.cluster && this.cluster.length > 0) {
            this.cluster[0].flag = 1;
            this.cluster[0].id = 0;
            this.tempObj = this.cluster[0];
        }
    };
    TextClusteriComponent.prototype.ngOnInit = function () {
    };
    TextClusteriComponent.prototype.text = function (item, index) {
        if (index == this.tempObj.id) {
        }
        else {
            item.flag = 1;
            item.id = index;
            this.tempObj.flag = 2;
            this.tempObj = item;
        }
    };
    return TextClusteriComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TextClusteriComponent.prototype, "cluster", void 0);
TextClusteriComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-text-clusteri',
        styles: [__webpack_require__("../../../../../src/app/text_result/text-clusteri/text-clusteri.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/text-clusteri/text-clusteri.component.html")
    })
], TextClusteriComponent);

//# sourceMappingURL=text-clusteri.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/text.result.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".result-wrapper {\n  position: relative;\n  width: 100%;\n  background: #f9f9f9;\n}\n\n.result-header {\n  position: fixed;\n  top: 80px;\n  left: 0;\n  right: 0;\n  height: 72px;\n  background: #f9f9f9;\n  z-index: 1000;\n}\n.result-header .container{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 100%;\n  border-bottom: 1px solid #d8d8d8;\n}\n.menu-item {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 70px;\n          flex: 0 0 70px;\n  width: 70px;\n  height: 100%;\n  line-height: 85px;\n  margin-right: 20px;\n  text-align: center;\n  box-sizing: border-box;\n  font-size: 15px;\n  color: #333;\n  text-decoration: none;\n  cursor: pointer;\n}\n.back{\n  width: 70px;\n  height: 34px;\n  line-height: 34px;\n  border: 1px solid #dedede;\n  background: #4db9d3;\n  border-radius: 8px;\n  text-align: center;\n  box-sizing: border-box;\n  font-size: 15px;\n  color: #fff;\n  margin-top: 22px;\n  text-decoration: none;\n  cursor: pointer;\n}\n.menu-item:hover {\n  color: #4db9d3;\n}\n.selected.menu-item {\n  color: #4db9d3;\n  border-bottom: 3px solid #4db9d3;\n}\n\n/* 内容区域 */\n.result-content {\n  margin-top: 102px;\n  overflow: auto;\n  padding-bottom: 200px;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/text.result.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"result-wrapper\">\n  <nav class=\"result-header\">\n    <div class=\"container\" style=\"position: relative;\">\n      <a class=\"menu-item\" (click)=\"$menu_click(0)\" [ngClass]=\"{'selected': s_selected_index === 0}\">词性分析</a>\n      <a class=\"menu-item\" (click)=\"$menu_click(2)\" [ngClass]=\"{'selected': s_selected_index === 1}\">实体识别</a>\n      <a class=\"menu-item\" (click)=\"$menu_click(3)\" [ngClass]=\"{'selected': s_selected_index === 2}\">自动摘要</a>\n      <a class=\"menu-item\" (click)=\"$menu_click(4)\" [ngClass]=\"{'selected': s_selected_index === 3}\">信息提取</a>\n      <a class=\"menu-item\" (click)=\"$menu_click(5)\" [ngClass]=\"{'selected': s_selected_index === 4}\">文本分类</a>\n      <!--<a class=\"menu-item\" (click)=\"$menu_click(6)\" [ngClass]=\"{'selected': s_selected_index === 5}\">情感识别</a>-->\n      <a class=\"menu-item\" (click)=\"$menu_click(7)\" [ngClass]=\"{'selected': s_selected_index === 6}\">语义联想</a>\n      <!--<a class=\"menu-item\" (click)=\"$menu_click(8)\" [ngClass]=\"{'selected': s_selected_index === 7}\">文本聚类</a>-->\n      <a class=\"back\" (click)=\"goBack()\" style=\"position: absolute;right: 0;\">返回</a>\n    </div>\n  </nav>\n  <div class=\"container padding-header result-content\">\n      <!-- 词性分析 -->\n      <ele-word-analysis [d_word_list] = \"wordAnalysis\" (dataChange)=\"dataChange($event)\"></ele-word-analysis>\n\n      <!-- 词性构成比例 -->\n      <ele-word-ratio [d_word_list] = \"wordRatio\"></ele-word-ratio>\n\n      <!-- 实体识别 -->\n      <ele-entity-recognition [d_word_list] = \"entityRec\" [falseData]=\"falseData\"></ele-entity-recognition>\n\n      <!-- 自动摘要  -->\n      <ele-auto-summary [d_summary] = \"d_summary\"></ele-auto-summary>\n\n      <!-- 信息提取 -->\n      <ele-info-extract [d_value] = \"infoExtract\"></ele-info-extract>\n\n      <!-- 文本分类 -->\n      <ele-text-category [d_word_list] = \"textCategory\" [falseData]=\"falseData\"></ele-text-category>\n\n      <!-- 情感识别 -->\n      <!--<ele-emotional-recognition [d_value] = \"emotionalRec\"></ele-emotional-recognition>-->\n\n      <!-- 语义联想 -->\n      <ele-semantic-association [semantic] = \"semanticAss\"></ele-semantic-association>\n\n      <!-- 文本聚类 -->\n      <!--<ele-text-clusteri [cluster]=\"cluster\"></ele-text-clusteri>-->\n\n  </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/text_result/text.result.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__ = __webpack_require__("../../../../../src/app/common/services/text.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Administrator on 2017/7/5 0005.
 */



var TextResultComponent = (function () {
    function TextResultComponent(route, router, textService) {
        this.route = route;
        this.router = router;
        this.textService = textService;
        this.s_selected_index = 0;
        this.wordAnalysis = [];
        this.wordRatio = [];
        this.entityRec = [];
        this.infoExtract = [];
        this.textCategory = [];
        this.d_summary = {};
        this.emotionalRec = {};
        this.semanticAss = {};
        this.target = 'ltp';
        this.cluster = [];
        this.allDate = {};
    }
    TextResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setSelectedScrollTop();
        this.windowScroll();
        this.route.queryParams.subscribe(function (params) {
            _this.id = params['id'];
            _this.allDate = params['allDate'];
            _this.falseData = params['falseData'];
            //console.log(this.id);
            sessionStorage.setItem("id", _this.id);
            _this.textService.getAllData(_this.id, _this.target)
                .subscribe(function (result) {
                _this.wordAnalysis = result.taggingAnalyses;
                _this.wordRatio = result.taggingComponentRatio;
                _this.entityRec = result.entityRecognitions;
                _this.d_summary = result.summaries[0];
                _this.textCategory = _this.getTextCategory(result.classifications);
                _this.infoExtract = _this.getInfoExtract(result.keywords);
                _this.emotionalRec = _this.getEmotionalRec(result.sentiments);
                _this.semanticAss = _this.getSemanticAss(result.semanticAssociation);
                _this.cluster = JSON.parse(result.cluster[0].clusterval);
            });
        });
    };
    TextResultComponent.prototype.dataChange = function (event) {
        var _this = this;
        //console.log(event);
        this.textService.getAllData(this.id, event)
            .subscribe(function (result) {
            _this.wordAnalysis = result.taggingAnalyses;
            _this.wordRatio = result.taggingComponentRatio;
            _this.entityRec = result.entityRecognitions;
            _this.d_summary = result.summaries[0].text;
            _this.textCategory = _this.getTextCategory(result.classifications);
            _this.infoExtract = _this.getInfoExtract(result.keywords);
            _this.emotionalRec = _this.getEmotionalRec(result.sentiments);
            _this.semanticAss = _this.getSemanticAss(result.semanticAssociation);
        });
    };
    TextResultComponent.prototype.getSemanticAss = function (array) {
        var nodes = array[0].nodes;
        var edges = array[1].edges;
        var tempa = {};
        tempa.nodes = nodes;
        tempa.edges = edges;
        return tempa;
    };
    TextResultComponent.prototype.getEmotionalRec = function (array) {
        var neg = array[0].neg;
        var pos = array[1].pos;
        var tem = {};
        tem.neg = neg.toFixed(2);
        tem.pos = pos.toFixed(2);
        return tem;
    };
    TextResultComponent.prototype.getTextCategory = function (array) {
        for (var i in array) {
            var weight = (array[i].ratio * 10).toFixed(3);
            array[i].weight = weight;
        }
        return array;
    };
    TextResultComponent.prototype.getInfoExtract = function (array) {
        for (var i in array) {
            var weight = Math.floor(array[i].weight * 100);
            array[i].weight = weight;
        }
        return array;
    };
    TextResultComponent.prototype.goBack = function () {
        this.router.navigate(['/demo'], { queryParams: { "id": this.id, "allDate": this.allDate } });
    };
    /* 监听浏览器滚动条位置 */
    TextResultComponent.prototype.windowScroll = function () {
        var $this = this;
        window.onscroll = function (event) {
            $this.setSelectedScrollTop();
        };
    };
    /* 根据浏览器滚动条高度 渲染menu*/
    TextResultComponent.prototype.setSelectedScrollTop = function () {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        /* 档scrollTop为10的倍数 计算当前位置 */
        var scroll = scrollTop - 490;
        if (scroll <= 0) {
            this.s_selected_index = 0;
        }
        else {
            this.s_selected_index = Math.floor(scroll / 480) + ((scroll % 480) > 450 ? 1 : 0);
        }
    };
    /* 点击menu触发滚动条 */
    TextResultComponent.prototype.$menu_click = function (index) {
        var pos = $('.row').eq(index).offset().top - 160;
        $("html,body").animate({ scrollTop: pos }, 400);
    };
    return TextResultComponent;
}());
TextResultComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'text-result',
        styles: [__webpack_require__("../../../../../src/app/text_result/text.result.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/text.result.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_text_service__["a" /* TextService */]) === "function" && _c || Object])
], TextResultComponent);

var _a, _b, _c;
//# sourceMappingURL=text.result.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/word-analysis/word.analysis.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".top{\n  overflow: hidden;\n}\n.thulac,.ltp{\n  width:40%;\n  float: left;\n  cursor: pointer;\n}\n.thulac input,.ltp input{\n  margin-right: 10px;\n}\n.radio{\n  padding:20px 0px 0px 34px;\n  color: #666;\n  font-size: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/word-analysis/word.analysis.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">词性分析</div>\n    <div class=\"content\">\n      <word-tip [data]=\"d_word_list\"  *ngIf=\"content==1\"></word-tip>\n      <ltp-tip [data]=\"d_word_list\" *ngIf=\"content==0\"></ltp-tip>\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">词性图例\n<!--      <div class=\"select-all\">\n        <input type=\"checkbox\" id='checkbox' (change)=\"$selected_all_change()\" [checked]=\"s_selected_all\"><span>全选</span>\n      </div>-->\n    </div>\n<!--    <div class=\"radio\">\n      <div class=\"ltp\"><input type=\"radio\" name=\"word\" value=\"ltp\" checked  (click)=\"toggle('ltp')\"/>ltp</div>\n      <div class=\"thulac\"><input type=\"radio\" name=\"word\" value=\"thulac\"  (click)=\"toggle('thulac')\"/>thulac</div>\n    </div>-->\n    <div class=\"content\">\n      <!--<cpt-checkbox [(data)]=\"d_word_list\" (selectNotAll) = \"$selected_not_all()\"></cpt-checkbox>-->\n      <cpt-wordbox [checkbox]=\"false\" [data]=\"wordlist\"></cpt-wordbox>\n      <cpt-title-des title=\"词性说明\" des=\"词性标注为分词结果中的每个单词标注一个正确的词性，确定每个词是名词、动词、形容词或其他词性。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/word-analysis/word.analysis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_common_services_text_service__ = __webpack_require__("../../../../../src/app/common/services/text.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordAnalysisComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * 词性分析
 * Created by Administrator on 2017/7/5 0005.
 */


var WordAnalysisComponent = (function () {
    function WordAnalysisComponent(textService) {
        var _this = this;
        this.textService = textService;
        this.s_selected_all = true;
        this.wordlist = [];
        this.content = 0;
        this.dataChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.id = window.sessionStorage.getItem("id");
        this.textService.getWord()
            .subscribe(function (result) {
            _this.wordlist = result;
            console.log(result);
        });
    }
    WordAnalysisComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.d_word_list.length) {
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = true;
            }
        }
    };
    WordAnalysisComponent.prototype.ngOnInit = function () {
    };
    WordAnalysisComponent.prototype.toggle = function (item) {
        if (item == 'thulac') {
            this.content = 1;
            this.getData(this.id, 'thulac');
            //this.dataChange.emit('thulac');
        }
        else if (item == 'ltp') {
            this.content = 0;
            this.getData(this.id, 'ltp');
            // this.dataChange.emit('ltp');
        }
    };
    WordAnalysisComponent.prototype.getData = function (id, target) {
        var _this = this;
        this.textService.getAllData(id, target)
            .subscribe(function (result) {
            //console.log(result.taggingAnalyses);
            _this.d_word_list = result.taggingAnalyses;
        });
    };
    WordAnalysisComponent.prototype.$selected_all_change = function () {
        this.s_selected_all = !this.s_selected_all;
        if (this.s_selected_all) {
            // 全选
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = true;
            }
        }
        else {
            // 全不选
            for (var i = 0; i < this.d_word_list.length; i++) {
                this.d_word_list[i].show = false;
            }
            this.d_word_list[0].show = true;
        }
    };
    WordAnalysisComponent.prototype.$selected_not_all = function () {
        this.s_selected_all = false;
    };
    return WordAnalysisComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], WordAnalysisComponent.prototype, "d_word_list", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], WordAnalysisComponent.prototype, "dataChange", void 0);
WordAnalysisComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-word-analysis',
        styles: [__webpack_require__("../../../../../src/app/text_result/word-analysis/word.analysis.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/word-analysis/word.analysis.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1_app_common_services_text_service__["a" /* TextService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_app_common_services_text_service__["a" /* TextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_common_services_text_service__["a" /* TextService */]) === "function" && _b || Object])
], WordAnalysisComponent);

var _a, _b;
//# sourceMappingURL=word.analysis.component.js.map

/***/ }),

/***/ "../../../../../src/app/text_result/word-ratio/word.ratio.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/text_result/word-ratio/word.ratio.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"left item\">\n    <div class=\"top\">词性构成比例</div>\n    <div class=\"content echarts-word-ratio\">\n    </div>\n  </div>\n  <div class=\"right item\">\n    <div class=\"top\">词性图例</div>\n    <div class=\"content\">\n      <cpt-checkbox [checkbox]=\"false\" [data]=\"d_word_list\"></cpt-checkbox>\n      <cpt-title-des title=\"词性构成比例说明\" des=\"词性比例构成对已标注的词性进行汇总，统计了各个词性在文本中的所占比例。\"></cpt-title-des>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/text_result/word-ratio/word.ratio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordRatioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Administrator on 2017/7/6 0006.
 */
/**
 * 词性比例构成
 * Created by Administrator on 2017/7/5 0005.
 */

var WordRatioComponent = (function () {
    function WordRatioComponent() {
    }
    WordRatioComponent.prototype.ngOnChanges = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //console.log(this.d_word_list);
        this.initEcharts();
    };
    WordRatioComponent.prototype.ngOnInit = function () {
    };
    WordRatioComponent.prototype.initEcharts = function () {
        // 获取data数据
        var legend_data = [];
        var series_data = [];
        for (var i = 0; i < this.d_word_list.length; i++) {
            legend_data.push(this.d_word_list[i].des);
            series_data.push({
                value: this.d_word_list[i].ratio,
                name: this.d_word_list[i].des,
                itemStyle: {
                    normal: {
                        color: this.d_word_list[i].color
                    }
                }
            });
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.querySelector('.echarts-word-ratio'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}：{d}%"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                data: legend_data
            },
            series: [
                {
                    name: '词性比例',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: series_data
                }
            ]
        });
    };
    return WordRatioComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], WordRatioComponent.prototype, "d_word_list", void 0);
WordRatioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ele-word-ratio',
        styles: [__webpack_require__("../../../../../src/app/text_result/word-ratio/word.ratio.component.css")],
        template: __webpack_require__("../../../../../src/app/text_result/word-ratio/word.ratio.component.html")
    })
], WordRatioComponent);

//# sourceMappingURL=word.ratio.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map