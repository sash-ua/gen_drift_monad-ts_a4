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
require("rxjs/add/operator/do");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/let");
require("rxjs/add/observable/from");
var d3_service_1 = require("../../services/d3.service");
var computation_service_1 = require("../../services/computation.service");
var error_handler_service_1 = require("../../services/error.handler.service");
var dialogs_service_1 = require("../../services/dialogs.service");
var dom_service_1 = require("../../services/dom.service");
var animations_service_1 = require("../../services/animations.service");
var specific_service_1 = require("../../services/specific.service");
var material_1 = require("@angular/material");
var store_1 = require("../../store/store");
var ModelingComponent = (function () {
    function ModelingComponent(D3, CS, ES, SS, DS, DOMS, renderer, dialog) {
        this.D3 = D3;
        this.CS = CS;
        this.ES = ES;
        this.SS = SS;
        this.DS = DS;
        this.DOMS = DOMS;
        this.renderer = renderer;
        this.dialog = dialog;
        this.routeAnimationRight = true;
        this.position = 'absolute';
        this.varSetter();
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
        var GV = this.graphView.nativeElement;
        // Generate graph while rendering page.
        this.render(this.inputs, GV);
        // Button 'Lunch' handler. Produce D3 Graph after clicking and manage spinner.
        this.subsToEvent = Observable_1.Observable.fromEvent(this.launch.nativeElement, 'click')
            .let(function (obs) {
            return obs.do(function () {
                store_1.spnstValSt_0();
                _this.varSetter();
            })
                .debounceTime(4)
                .do(function () {
                store_1.spnTglIn();
                _this.varSetter();
            });
        })
            .debounceTime(300)
            .do(function () {
            store_1.spnstValSt_1();
            store_1.inputs(_this.SS.collectionDataInputs('input'));
            _this.varSetter();
            _this.render(_this.inputs, GV);
        })
            .debounceTime(300)
            .let(function (obs) {
            return obs.do(function () {
                store_1.spnstValSt_2();
                _this.varSetter();
            })
                .debounceTime(100)
                .do(function () {
                store_1.spnTglOut();
                _this.varSetter();
            });
        })
            .subscribe(function () { }, function (e) { _this.ES.handleError(e); });
    };
    // Variables resetter. When app state changed it reassign application's variables.
    ModelingComponent.prototype.varSetter = function () {
        (_a = store_1.STATE_STORE.get(), this.SVG_COMPS = _a.SVG_COMPS, this.svg_attrs = _a.svg_attrs, this.MW_TITLE = _a.MW_TITLE, this.TOOLTIP_POS = _a.TOOLTIP_POS, this.TOOLTIP_D = _a.TOOLTIP_D, this.spn_tgl = _a.spn_tgl, this.spn_state_val = _a.spn_state_val, this.inputs = _a.inputs);
        var _a;
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
    __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object)
], ModelingComponent.prototype, "launch", void 0);
__decorate([
    core_1.ViewChild("graphView", { read: core_1.ElementRef }),
    __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object)
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
            animations_service_1.AnimationsServices.animatonTwoStates('openHide', ['in', 'out'], [{ display: 'block', opacity: 1, transform: 'translateZ(0)' }, { display: 'none', opacity: 0, transform: 'translateZ(0)' }], ['300ms ease-in', '200ms ease-out'])
        ],
        providers: [
            computation_service_1.ComputationService,
            error_handler_service_1.ErrorHandlerService,
            specific_service_1.SpecificService,
            dialogs_service_1.DialogsService,
            dom_service_1.DOMService,
            d3_service_1.D3Service,
        ]
    }),
    __metadata("design:paramtypes", [d3_service_1.D3Service,
        computation_service_1.ComputationService,
        error_handler_service_1.ErrorHandlerService,
        specific_service_1.SpecificService,
        dialogs_service_1.DialogsService,
        dom_service_1.DOMService, typeof (_c = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" && _c || Object, typeof (_d = typeof material_1.MdDialog !== "undefined" && material_1.MdDialog) === "function" && _d || Object])
], ModelingComponent);
exports.ModelingComponent = ModelingComponent;
var _a, _b, _c, _d;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
