var StoreService = (function () {
    function StoreService(router) {
        this.router = router;
    }
    StoreService.prototype.navigateTo = function (commands, extras) {
        var _this = this;
        this._updateState({ currentUrl: commands });
        this.router.navigate(this.state.get().currentUrl, extras).then(function (r) {
            if ((!r && _this.router.url.slice(1) !== commands.join('/')))
                console.log(new Error('StoreService.navigateTo()- navigation error'));
        });
    };
    StoreService.prototype.manager = function (v) {
        v ? this._updateState(v) : null;
        return this.state.get();
    };
    StoreService.prototype._updateState = function (v) {
        var _loop_1 = function (k) {
            if (v.hasOwnProperty(k)) {
                this_1.state.put(function (c) {
                    c[k] = v[k];
                    return c;
                });
            }
        };
        var this_1 = this;
        for (var k in v) {
            _loop_1(k);
        }
    };
    return StoreService;
}());
export { StoreService };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
