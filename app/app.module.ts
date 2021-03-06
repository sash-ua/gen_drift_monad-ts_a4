// angular's modules
import {NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// UI
import {MyMaterialModule} from "./shared/my.material.module/my.material.module";
// Modules
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
// Components & services
import {AppComponent} from "./AppComponent";
import {ErrorHandlerService} from "./services/error.handler.service";
import {HammerConfig} from "./app.configs/hammerjs.config";
import {StoreModule} from "angust";

import {INIT_STATE} from "./store/store.init";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        CoreModule,
        BrowserAnimationsModule,
        MyMaterialModule,
        StoreModule.forRoot(INIT_STATE),
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [],
    providers: [
        ErrorHandlerService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
    ]
})
export class AppModule {}