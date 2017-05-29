"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreService = (function () {
    function StoreService(router, location) {
        this.router = router;
        this.location = location;
    }
    StoreService.prototype.forward = function () {
        this.location.forward();
    };
    StoreService.prototype.back = function () {
        this.location.back();
    };
    StoreService.prototype.navigateTo = function (commands, extras) {
        var _this = this;
        this._updateState({ currentUrl: commands });
        this.router.navigate(this.state.get().currentUrl, extras).then(function (r) {
            if ((!r && _this.router.url.slice(1) !== commands.join('/')))
                console.error(new Error('StoreService.navigateTo()- navigation error'));
        });
    };
    StoreService.prototype.manager = function (v) {
        if (v) {
            this._updateState(v);
        }
        return this.state.get();
    };
    StoreService.prototype._updateState = function (v) {
        var _this = this;
        this.state.put(function (c) { return _this._changeObject(v)(c); });
    };
    StoreService.prototype._changeObject = function (v) {
        return function (c) {
            for (var k in v) {
                if (v.hasOwnProperty(k)) {
                    c[k] = v[k];
                }
            }
            return c;
        };
    };
    return StoreService;
}());
exports.StoreService = StoreService;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
