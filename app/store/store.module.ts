
import {NgModule} from "@angular/core";
import {Store} from "./store";

@NgModule({})
export class StoreModule {
    static provideStore() {
        return {
            ngModule: StoreModule,
            providers: [Store]

        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.