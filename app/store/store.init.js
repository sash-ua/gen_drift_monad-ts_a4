"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputsInit = [
    { preDefData: 1000, hint: 'Population', dvdrColor: 'warn', interval: [2], toolTip: 'Integer number from 2' },
    { preDefData: 100, hint: 'Generations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
    { preDefData: 2, hint: 'Simulations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
    { preDefData: 0.5, hint: 'Init. Alleles Balance', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.164' },
    { preDefData: 0.1, hint: 'Bottle Neck Probability', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.2' },
    { preDefData: 0.15, hint: 'Natural decline', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.77' },
    { preDefData: 0.2, hint: 'Natural growth', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.09' }
];
// Initial store state.
exports.INIT_STATE = {
    spn_tgl: 'out',
    spn_state_val: 0,
    inputs: exports.inputsInit,
    TOOLTIP_D: 100,
    TOOLTIP_POS: 'above',
    MW_TITLE: "Graph",
    SVG_COMPS: ['svg', 'g', 'tspan', 'text', 'path'],
    svg_attrs: [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', '45vw']]
};
//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 
