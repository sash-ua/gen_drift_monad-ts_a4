"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var d3_service_1 = require("../../services/d3.service");
var computation_service_1 = require("../../services/computation.service");
var error_handler_service_1 = require("../../services/error.handler.service");
var dialogs_service_1 = require("../../services/dialogs.service");
var dom_service_1 = require("../../services/dom.service");
var animations_service_1 = require("../../services/animations.service");
var specific_service_1 = require("../../services/specific.service");
var material_1 = require("@angular/material");
var store_1 = require("../../store/store");
var monad_ts_1 = require("monad-ts");
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
        var dT = monad_ts_1.debounceTime(this.onLaunch, 500);
        // Button 'Launch' handler. Produce D3 Graph after clicking and manage spinner.
        this.subsToEvent = Observable_1.Observable.fromEvent(this.launch.nativeElement, 'click')
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
        var F = new monad_ts_1.AsyncFlow(0)
            .bind(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: computation_service_1.ComputationService.rndmGen(15, 50),
            }));
        })
            .then(function (v) { return monad_ts_1.wait(v, 120); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: computation_service_1.ComputationService.rndmGen(55, 70),
                inputs: specific_service_1.SpecificService.applInputsData(self.store.state.get().inputs, self.SS.collectionDataInputs('input'))
            }));
            self.render(self.inputs, self.GV);
        })
            .then(function (v) { return monad_ts_1.wait(v, 100); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: computation_service_1.ComputationService.rndmGen(75, 95),
            }));
        })
            .then(function (v) { return monad_ts_1.wait(v, 100); })
            .then(function () {
            self.varSetter(self.store.manager({
                spn_tgl: 'in',
                spn_state_val: 100,
            }));
        })
            .then(function (v) { return monad_ts_1.wait(v, 250); })
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
    core_1.ViewChild("launch", { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], ModelingComponent.prototype, "launch", void 0);
__decorate([
    core_1.ViewChild("graphView", { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], ModelingComponent.prototype, "graphView", void 0);
__decorate([
    core_1.HostBinding('@routeAnimationRight'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "routeAnimationRight", void 0);
__decorate([
    core_1.HostBinding('style.position'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "position", void 0);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ModelingComponent.prototype, "clickHandler", null);
ModelingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'md-comp',
        template: "<section class=\"wrapper wrapper__modeling\">\n            <h2>Visualization</h2>\n            <form>\n                <app-input *ngFor=\"let input of inputs;\"\n                           [app-input-data]=\"input\"\n                           [mdTooltip]=\"input.toolTip\"\n                           [mdTooltipPosition]=\"TOOLTIP_POS\"\n                           [mdTooltipShowDelay]=\"TOOLTIP_D\"\n                           class=\"modeling__inputs\">\n                </app-input>\n                <button md-raised-button class=\"modeling__btn\" #launch>Launch</button>\n                <progress-spinner-d [spinner-start-val]=\"spn_state_val\"\n                                    [@openHide]=\"spn_tgl\">\n                </progress-spinner-d>\n            </form>\n            <div id=\"graphView\" #graphView></div>\n        </section>",
        styleUrls: ['modeling.component.css'],
        animations: [
            animations_service_1.AnimationsServices.animatonThreeStates('routeAnimationRight', { opacity: 1, transform: 'translateX(0)' }, [{ opacity: 0, transform: 'translateX(100%)' }, { opacity: 0, transform: 'translateX(100%)' }], ['0.4s ease-in', '0.4s ease-out']),
            animations_service_1.AnimationsServices.animatonTwoStates('openHide', ['in', 'out'], [{ display: 'block', opacity: 1, transform: 'translateZ(0)' }, { display: 'none', opacity: 0, transform: 'translateZ(0)' }], ['0ms ease-in', '0ms ease-out'])
        ],
        providers: [
            computation_service_1.ComputationService,
            error_handler_service_1.ErrorHandlerService,
            specific_service_1.SpecificService,
            dialogs_service_1.DialogsService,
            dom_service_1.DOMService,
            d3_service_1.D3Service
        ]
    }),
    __metadata("design:paramtypes", [d3_service_1.D3Service,
        computation_service_1.ComputationService,
        error_handler_service_1.ErrorHandlerService,
        specific_service_1.SpecificService,
        dialogs_service_1.DialogsService,
        dom_service_1.DOMService,
        core_1.Renderer2,
        material_1.MdDialog,
        store_1.Store])
], ModelingComponent);
exports.ModelingComponent = ModelingComponent;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
