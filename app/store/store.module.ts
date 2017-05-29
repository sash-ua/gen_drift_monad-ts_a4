
import {InjectionToken, NgModule} from "@angular/core";
import {Store} from "./store";
import {Location} from '@angular/common';
import {Router} from "@angular/router";

export function _storeFactory(router: Router, location: Location, init: any){
    return new Store(router, location, init);
}

export const _INITIAL_STATE = new InjectionToken('Token');

export function  provideStore(initState: any){
    return [
        {provide: Store, useFactory: _storeFactory, deps:[Router, Location, _INITIAL_STATE]},
        {provide: _INITIAL_STATE, useValue: initState},
    ]
}

@NgModule({})
export class StoreModule {
    static provideStore(INIT_STATE: any) {
        return {
            ngModule: StoreModule,
            providers: provideStore(INIT_STATE)
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.