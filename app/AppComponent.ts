import {Component} from "@angular/core";
import "hammerjs";
import {Store} from "./store/store";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    template:
    `<div (swipe)="onSwipe($event)" class="wrapper">
        <header>
            <h1 class="header__title introduction__txt">Genetic drift</h1>
        </header>
        <main>
            <nav>
                <ul class="nav">
                    <li class="nav__el">
                        <a routerLink="/instruction" routerLinkActive="active" [class.activeR]="active" class="nav_link link">Introduction</a>
                    </li>
                    <li class="nav__el">
                        <a routerLink="/modeling" routerLinkActive="active" [class.activeR]="active" class="nav_link link">Modeling</a>
                    </li>
                </ul>
            </nav>
            <div class="line-stub"></div>
            <router-outlet></router-outlet>
        </main>
    </div>`,
    styleUrls: ['app.component.css'],
    providers: []
})

export class AppComponent<T> {
    constructor(
        private store: Store<T>
    ){}
    onSwipe(e: HammerInput){
        if(e.offsetDirection === 4){
            this.store.navigateTo((['instruction']));
        } else if (e.offsetDirection === 2){
            this.store.navigateTo((['modeling']));
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.