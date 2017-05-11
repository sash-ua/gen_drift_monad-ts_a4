"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var AppComponent_1 = require("./AppComponent");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
require("hammerjs");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var my_material_module_1 = require("./shared/my.material.module/my.material.module");
describe('AppComponent: ', function () {
    var el;
    var fixture;
    var de;
    var comp;
    var evStub4 = { offsetDirection: 4 };
    var evStub2 = { offsetDirection: 2 };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                my_material_module_1.MyMaterialModule,
            ],
            declarations: [
                AppComponent_1.AppComponent
            ],
            providers: []
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(AppComponent_1.AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
            el = de.nativeElement.innerText;
            fixture.detectChanges();
        });
    }));
    it('should create the component', (function () {
        expect(comp).toBeDefined();
    }));
    it('should get header>h1>innerText "Genetic drift"', (function () {
        expect(el).toBe('Genetic drift');
    }));
    it('onSwipe - 1', testing_1.inject([router_1.Router], function (router) {
        var spy = spyOn(router, 'navigate');
        comp.onSwipe(evStub2);
        var navArgs = spy.calls.first().args[0];
        expect(navArgs).toEqual(['/modeling']);
    }));
    it('onSwipe - 2', testing_1.inject([router_1.Router], function (router) {
        var spy = spyOn(router, 'navigate');
        comp.onSwipe(evStub4);
        var navArgs = spy.calls.first().args[0];
        expect(navArgs).toEqual(['/instruction']);
    }));
});
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
