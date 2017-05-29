"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("./store");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
function _storeFactory(router, location, init) {
    return new store_1.Store(router, location, init);
}
exports._storeFactory = _storeFactory;
exports._INITIAL_STATE = new core_1.InjectionToken('Token');
function provideStore(initState) {
    return [
        { provide: store_1.Store, useFactory: _storeFactory, deps: [router_1.Router, common_1.Location, exports._INITIAL_STATE] },
        { provide: exports._INITIAL_STATE, useValue: initState },
    ];
}
exports.provideStore = provideStore;
var StoreModule = StoreModule_1 = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (INIT_STATE) {
        return {
            ngModule: StoreModule_1,
            providers: provideStore(INIT_STATE)
        };
    };
    return StoreModule;
}());
StoreModule = StoreModule_1 = __decorate([
    core_1.NgModule({})
], StoreModule);
exports.StoreModule = StoreModule;
var StoreModule_1;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
