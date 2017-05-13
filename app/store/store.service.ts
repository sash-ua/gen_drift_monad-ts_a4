import {State} from "monad-ts";
import {NavigationExtras, Router} from "@angular/router";
import {StateStore} from "./store";

export class StoreService<T>{
    state: State<StateStore>;
    constructor(
        public router: Router
    ){}
    navigateTo(commands: any[], extras?: NavigationExtras){
        this._updateState({currentUrl: commands});
        this.router.navigate(this.state.get().currentUrl, extras).then((r)=>{
            if((!r && this.router.url.slice(1) !== commands.join('/')) ) console.log(new Error('StoreService.navigateTo()- navigation error'));
        });
    }
    manager(v?: typeof StateStore ){
        v ? this._updateState(v) : null;
        return this.state.get();
    }
    _updateState(v: typeof StateStore): void {
        for(let k in v){
            if(v.hasOwnProperty(k)){
                this.state.put(c => {
                    c[k] = v[k];
                    return c
                });
            }
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.