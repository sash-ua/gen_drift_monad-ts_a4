var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, HostBinding, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { D3Service } from "../../services/d3.service";
import { ComputationService } from "../../services/computation.service";
import { ErrorHandlerService } from "../../services/error.handler.service";
import { DialogsService } from "../../services/dialogs.service";
import { DOMService } from "../../services/dom.service";
import { AnimationsServices } from "../../services/animations.service";
import { SpecificService } from "../../services/specific.service";
import { MdDialog } from "@angular/material";
import { Store } from "../../store/store";
import { AsyncFlow, wait, debounceTime } from "monad-ts";
var ModelingComponent = (function () {
    function ModelingComponent(D3, CS, ES, SS, DS, DOMS, renderer, dialog, store) {
        this.D3 = D3;
        this.CS = CS;
        this.ES = ES;
        this.SS = SS;
        this.DS = DS;
        this.DOMS = DOMS;
        this.renderer = renderer;
        this.dialog = dialog;
        this.store = store;
        this.routeAnimationRight = true;
        this.position = 'absolute';
        this.varSetter(this.store.manager());
    }
    // Set event listener on the host.
    ModelingComponent.prototype.clickHandler = function (e) {
        var TARGET = e.target;
        if (this.DOMS.compare(TARGET, this.SVG_COMPS)) {
            var SVG = this.DOMS.findHTMLElement(TARGET, 'svg', this.renderer);
            if (SVG.getAttribute('data-D3-graph')) {
                var SVGClONE = SVG.cloneNode(true);
                this.DOMS.attrSetter(SVGClONE, this.svg_attrs, this.renderer);
                this.DS.confirm(this.MW_TITLE, SVGClONE, this.dialog);
            }
        }
    };
    ;
    ModelingComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.GV = this.graphView.nativeElement;
        // Generate graph while rendering page.
        this.render(this.inputs, this.GV);
        // Function debounceTime(). Define invoked func. and timeout.
        var dT = debounceTime(this.onLaunch, 500);
        // Button 'Launch' handler. Produce D3 Graph after clicking and manage spinner.
        this.subsToEvent = Observable.fromEvent(this.launch.nativeElement, 'click')
            .subscribe(function () {
            // To pass `this` to onLaunch().
            dT(_this);
        }, function (e) { _this.ES.handleError(e); });
    };
    // Variables resetter. When app state changed it reassign application's variables.
    ModelingComponent.prototype.varSetter = function (v) {
        (this.SVG_COMPS = v.SVG_COMPS, this.svg_attrs = v.svg_attrs, this.MW_TITLE = v.MW_TITLE, this.TOOLTIP_POS = v.TOOLTIP_POS, this.TOOLTIP_D = v.TOOLTIP_D, this.spn_tgl = v.spn_tgl, this.spn_state_val = v.spn_state_val, this.inputs = v.inputs);
    };
    // Launch button event handler. To pass `this` through debounceTime(), takes it as argument.
    ModelingComponent.prototype.onLaunch = function (self) {
        var F = new AsyncFlow(0)
            .bind(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: ComputationService.rndmGen(15, 50),
            }));
        })
            .then(function (v) { return wait(v, 120); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: ComputationService.rndmGen(55, 70),
                inputs: SpecificService.applInputsData(self.store.state.get().inputs, self.SS.collectionDataInputs('input'))
            }));
            self.render(self.inputs, self.GV);
        })
            .then(function (v) { return wait(v, 100); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: ComputationService.rndmGen(75, 95),
            }));
        })
            .then(function (v) { return wait(v, 100); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: 100,
            }));
        })
            .then(function (v) { return wait(v, 250); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'out',
                spn_state_val: 0,
            }));
        });
    };
    // Render array type of Inputs with D3
    ModelingComponent.prototype.render = function (inputs, view) {
        var NG = this.CS.arrG(this.CS.NGen, this.CS.NRandom, inputs[0].preDefData, inputs[6].preDefData, inputs[5].preDefData, inputs[4].preDefData)([inputs[1].preDefData]);
        // Draw chart
        this.D3.drawChart(this.CS.arrG(this.CS.cmptnAlleles(this.CS.bounchCoin1, inputs[3].preDefData, this.CS.tossing1), NG)([inputs[2].preDefData]), 'Generations', 'A1', view, ['Eff. population size:', this.CS.harmonic1(NG), 'Generations: ', inputs[1].preDefData], inputs[1].preDefData);
    };
    return ModelingComponent;
}());
__decorate([
    ViewChild("launch", { read: ElementRef }),
    __metadata("design:type", ElementRef)
], ModelingComponent.prototype, "launch", void 0);
__decorate([
    ViewChild("graphView", { read: ElementRef }),
    __metadata("design:type", ElementRef)
], ModelingComponent.prototype, "graphView", void 0);
__decorate([
    HostBinding('@routeAnimationRight'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "routeAnimationRight", void 0);
__decorate([
    HostBinding('style.position'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "position", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ModelingComponent.prototype, "clickHandler", null);
ModelingComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'md-comp',
        template: "<section class=\"wrapper wrapper__modeling\">\n            <h2>Visualization</h2>\n            <form>\n                <app-input *ngFor=\"let input of inputs;\"\n                           [app-input-data]=\"input\"\n                           [mdTooltip]=\"input.toolTip\"\n                           [mdTooltipPosition]=\"TOOLTIP_POS\"\n                           [mdTooltipShowDelay]=\"TOOLTIP_D\"\n                           class=\"modeling__inputs\">\n                </app-input>\n                <button md-raised-button class=\"modeling__btn\" #launch>Launch</button>\n                <progress-spinner-d [spinner-start-val]=\"spn_state_val\"\n                                    [@openHide]=\"spn_tgl\">\n                </progress-spinner-d>\n            </form>\n            <div id=\"graphView\" #graphView></div>\n        </section>",
        styleUrls: ['modeling.component.css'],
        animations: [
            AnimationsServices.animatonThreeStates('routeAnimationRight', { opacity: 1, transform: 'translateX(0)' }, [{ opacity: 0, transform: 'translateX(100%)' }, { opacity: 0, transform: 'translateX(100%)' }], ['0.4s ease-in', '0.4s ease-out']),
            AnimationsServices.animatonTwoStates('openHide', ['in', 'out'], [{ display: 'block', opacity: 1, transform: 'translateZ(0)' }, { display: 'none', opacity: 0, transform: 'translateZ(0)' }], ['0ms ease-in', '0ms ease-out'])
        ],
        providers: [
            ComputationService,
            ErrorHandlerService,
            SpecificService,
            DialogsService,
            DOMService,
            D3Service
        ]
    }),
    __metadata("design:paramtypes", [D3Service,
        ComputationService,
        ErrorHandlerService,
        SpecificService,
        DialogsService,
        DOMService,
        Renderer2,
        MdDialog,
        Store])
], ModelingComponent);
export { ModelingComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
