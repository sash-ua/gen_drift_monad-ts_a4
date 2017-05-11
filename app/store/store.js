"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var computation_service_1 = require("../services/computation.service");
var specific_service_1 = require("../services/specific.service");
var monad_ts_1 = require("monad-ts");
var MODELING_CONSTS = {
    TOOLTIP_D: 100,
    TOOLTIP_POS: 'above',
    MW_TITLE: "Graph",
    SVG_COMPS: ['svg', 'g', 'tspan', 'text', 'path']
};
exports.INIT_STATE = __assign({ spn_tgl: 'out', spn_state_val: 0, inputs: [
        { preDefData: 1000, hint: 'Population', dvdrColor: 'warn', interval: [2], toolTip: 'Integer number from 2' },
        { preDefData: 100, hint: 'Generations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
        { preDefData: 2, hint: 'Simulations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
        { preDefData: 0.5, hint: 'Init. Alleles Balance', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.164' },
        { preDefData: 0.1, hint: 'Bottle Neck Probability', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.2' },
        { preDefData: 0.15, hint: 'Natural decline', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.77' },
        { preDefData: 0.2, hint: 'Natural growth', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.09' }
    ], svg_attrs: [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', specific_service_1.SpecificService.dimension(0.35, 0.4)]] }, MODELING_CONSTS);
// Create instance of State to keep variables' state.
exports.STATE_STORE = new monad_ts_1.State(exports.INIT_STATE);
// Create reducer functions to change a state of the app. In every reducer we should set all variables which change at
// least once in the app to prevent not sequential assignment of variables.
function inputs(payload) {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'in';
        v.spn_state_val = computation_service_1.ComputationService.rndmGen(25, 50);
        v.inputs = specific_service_1.SpecificService.applInputsData(exports.STATE_STORE.get().inputs, payload);
        return v;
    });
}
exports.inputs = inputs;
function spnTglIn() {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'in';
        v.spn_state_val = computation_service_1.ComputationService.rndmGen(15, 50);
        v.inputs = exports.STATE_STORE.get().inputs;
        return v;
    });
}
exports.spnTglIn = spnTglIn;
function spnTglOut() {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'out';
        v.spn_state_val = 100;
        v.inputs = exports.STATE_STORE.get().inputs;
        return v;
    });
}
exports.spnTglOut = spnTglOut;
function spnstValSt_0() {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'out';
        v.spn_state_val = 0;
        v.inputs = exports.STATE_STORE.get().inputs;
        return v;
    });
}
exports.spnstValSt_0 = spnstValSt_0;
function spnstValSt_1() {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'in';
        v.spn_state_val = computation_service_1.ComputationService.rndmGen(55, 70);
        v.inputs = exports.STATE_STORE.get().inputs;
        return v;
    });
}
exports.spnstValSt_1 = spnstValSt_1;
function spnstValSt_2() {
    exports.STATE_STORE.put(function (v) {
        v.spn_tgl = 'in';
        v.spn_state_val = computation_service_1.ComputationService.rndmGen(75, 95);
        v.inputs = exports.STATE_STORE.get().inputs;
        return v;
    });
}
exports.spnstValSt_2 = spnstValSt_2;
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
