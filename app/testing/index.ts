import { DebugElement }           from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

export * from './jasmine-matchers';
export * from './router-stubs';


 // Wait a tick, then detect changes
export function advance(f: ComponentFixture<any>): void {
    tick();
    f.detectChanges();
}


// Create custom DOM event the old fashioned way

// https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
// Although officially deprecated, some browsers (phantom) don't accept the preferred "new Event(eventName)"

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
//  Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler
export const ButtonClickEvents = {
    left:  { button: 0 },
    right: { button: 2 }
};

 // Simulate element click. Defaults to mouse left-button click event.
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}
 export function inInterval (v: number, int: number[]): number | boolean {
    return (typeof v === "number" && v >= int[0] && v <= int[1]) ? v : false;
 }

 // Copyright 2016 Google Inc. All Rights Reserved.
 // Use of this source code is governed by an MIT-style license that
 // can be found in the LICENSE file at http://angular.io/license
