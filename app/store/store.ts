
import {NavigationEnd, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { Location } from '@angular/common';
import {StoreService} from "./store.service";
import {State} from "monad-ts";
import {S} from "./interfaces/s";

@Injectable()
export class Store<T> extends StoreService<T>{
    public routerUrlSubscription$: any;
    private _URL: S = {currentUrl: ['']};

    constructor(
        router: Router,
        location: Location,
        private INIT_STATE: any
){
        super(router, location);

        this.routerUrlSubscription$ = this.router.events.subscribe((ev: NavigationEnd)=>{
            if(ev instanceof NavigationEnd) {
                this.state.put((v: S)=>{
                    v.currentUrl = [ev.url]; return v
                })
            }
        });
        // Initialize store's state. Required - _URL, optional - INIT_STATE prop.
        this.state = new State({...this._URL, ...INIT_STATE});
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.