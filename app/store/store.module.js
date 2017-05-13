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
var StoreModule = StoreModule_1 = (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function () {
        return {
            ngModule: StoreModule_1,
            providers: [store_1.Store]
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
