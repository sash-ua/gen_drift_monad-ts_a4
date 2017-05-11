import {ComponentFixture, TestBed, async, inject} from "@angular/core/testing";
import {AppComponent} from "./AppComponent";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import "hammerjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MyMaterialModule} from "./shared/my.material.module/my.material.module";

describe('AppComponent: ', ()=>{
    let el: HTMLElement;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let comp: AppComponent;
    const evStub4 = {offsetDirection: 4};
    const evStub2 = {offsetDirection: 2};
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports:[
                FormsModule,
                RouterTestingModule,
                MyMaterialModule,
                // RouterModule
            ],
            declarations: [
                AppComponent
            ],
            providers:[
                // Router
            ]
        })
            .compileComponents()
            .then(()=>{
                fixture = TestBed.createComponent(AppComponent);
                comp = fixture.componentInstance;
                de = fixture.debugElement.query(By.css('h1'));
                el = de.nativeElement.innerText;
                fixture.detectChanges();
            });
    }));

    it('should create the component', (()=>{
        expect(comp).toBeDefined();
    }));
    it('should get header>h1>innerText "Genetic drift"', (()=>{
        expect(el).toBe('Genetic drift');
    }));
    it('onSwipe - 1',
        inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigate');
            comp.onSwipe(evStub2);
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toEqual([ '/modeling' ]);
        })
    );
    it('onSwipe - 2',
        inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigate');
            comp.onSwipe(evStub4);
            const navArgs = spy.calls.first().args[0];
            expect(navArgs).toEqual([ '/instruction' ]);
        })
    );
});

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.