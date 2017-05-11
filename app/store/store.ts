
import {ComputationService} from "../services/computation.service";
import {SpecificService} from "../services/specific.service";
import {ArrAttrSetter, Inputs} from "../types/types";
import {State} from "monad-ts";

export interface MConsts{
    TOOLTIP_D: number;
    TOOLTIP_POS: string;
    MW_TITLE: string ;
    SVG_COMPS: Array<string>;

}
export interface StateStore extends MConsts{
    spn_tgl: string;
    spn_state_val: number;
    inputs: Inputs;
    svg_attrs: ArrAttrSetter;
}
const MODELING_CONSTS: MConsts = {
    TOOLTIP_D: 100,
    TOOLTIP_POS: 'above',
    MW_TITLE: "Graph",
    SVG_COMPS: ['svg', 'g', 'tspan', 'text', 'path']
};

export const INIT_STATE: StateStore = {
    spn_tgl: 'out',
    spn_state_val: 0,
    inputs: [
        {preDefData: 1000, hint: 'Population', dvdrColor: 'warn', interval: [2], toolTip: 'Integer number from 2'},
        {preDefData: 100, hint: 'Generations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1'},
        {preDefData: 2, hint: 'Simulations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1'},
        {preDefData: 0.5, hint: 'Init. Alleles Balance', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.164'},
        {preDefData: 0.1, hint: 'Bottle Neck Probability', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.2'},
        {preDefData: 0.15, hint: 'Natural decline', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.77'},
        {preDefData: 0.2, hint: 'Natural growth', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.09'}
    ],
    svg_attrs: [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', SpecificService.dimension(0.35, 0.4)]],
    ...MODELING_CONSTS
};

// Create instance of State to keep variables' state.
export const STATE_STORE: State<StateStore> = new State(INIT_STATE);

// Create reducer functions to change a state of the app. In every reducer we should set all variables which change at
// least once in the app to prevent not sequential assignment of variables.
export function inputs(payload: Array<number>) {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'in';
        v.spn_state_val = ComputationService.rndmGen(25, 50);
        v.inputs = SpecificService.applInputsData(STATE_STORE.get().inputs, payload);
        return v;
    });
}
export function spnTglIn() {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'in';
        v.spn_state_val = ComputationService.rndmGen(15, 50);
        v.inputs = STATE_STORE.get().inputs;
        return v;
    });
}
export function spnTglOut() {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'out';
        v.spn_state_val = 100;
        v.inputs = STATE_STORE.get().inputs;
        return v;
    });
}
export function spnstValSt_0() {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'out';
        v.spn_state_val = 0;
        v.inputs = STATE_STORE.get().inputs;
        return v;
    });
}
export function spnstValSt_1() {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'in';
        v.spn_state_val = ComputationService.rndmGen(55, 70);
        v.inputs = STATE_STORE.get().inputs;
        return v;
    });
}
export function spnstValSt_2() {
    STATE_STORE.put((v: StateStore): StateStore => {
        v.spn_tgl = 'in';
        v.spn_state_val = ComputationService.rndmGen(75, 95);
        v.inputs = STATE_STORE.get().inputs;
        return v;
    });
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.