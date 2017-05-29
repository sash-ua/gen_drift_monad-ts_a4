import {NavigationExtras, Router} from "@angular/router";
import { Location } from '@angular/common';
import {State} from "monad-ts";
import {S} from "./interfaces/s";

export class StoreService<T> {
    state: State<S>;
    constructor(
        protected router: Router,
        protected location: Location
    ){}
    forward(){
        this.location.forward();
    }
    back(){
        this.location.back();
    }
    navigateTo(commands: any[], extras?: NavigationExtras){
        this._updateState({currentUrl: commands});
        this.router.navigate(this.state.get().currentUrl, extras).then((r)=>{
            if((!r && this.router.url.slice(1) !== commands.join('/')) ) console.error(new Error('StoreService.navigateTo()- navigation error'));
        });
    }
    manager<U>(v?: U ): S {
        if(v) {
            this._updateState(v)
        }
        return this.state.get();
    }
    _updateState<U>(v: U): void {
        this.state.put(c => this._changeObject(v)(c));
    }
    _changeObject<U>(v: U): Function{
        return (c: U): U=>{
            for(let k in v){
                if(v.hasOwnProperty(k)){
                    c[k]= v[k];
                }
            }
            return c;
        };
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.