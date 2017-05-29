"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var store_service_1 = require("./store.service");
var monad_ts_1 = require("monad-ts");
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(router, location, INIT_STATE) {
        var _this = _super.call(this, router, location) || this;
        _this.INIT_STATE = INIT_STATE;
        _this._URL = { currentUrl: [''] };
        _this.routerUrlSubscription$ = _this.router.events.subscribe(function (ev) {
            if (ev instanceof router_1.NavigationEnd) {
                _this.state.put(function (v) {
                    v.currentUrl = [ev.url];
                    return v;
                });
            }
        });
        // Initialize store's state. Required - _URL, optional - INIT_STATE prop.
        _this.state = new monad_ts_1.State(__assign({}, _this._URL, INIT_STATE));
        return _this;
    }
    return Store;
}(store_service_1.StoreService));
Store = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        common_1.Location, Object])
], Store);
exports.Store = Store;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
