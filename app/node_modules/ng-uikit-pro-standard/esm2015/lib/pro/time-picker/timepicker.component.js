/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, HostListener, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
/** @type {?} */
export const TIME_PIRCKER_VALUE_ACCESSOT = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => ClockPickerComponent)),
    multi: true,
};
export class ClockPickerComponent {
    /**
     * @param {?} elem
     * @param {?} renderer
     * @param {?} _cdRef
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} platformId
     */
    constructor(elem, renderer, _cdRef, _ngZone, _document, platformId) {
        this.elem = elem;
        this.renderer = renderer;
        this._cdRef = _cdRef;
        this._ngZone = _ngZone;
        this._document = _document;
        this.twelvehour = false;
        this.darktheme = false;
        this.placeholder = '';
        this.label = '';
        this.duration = 300;
        this.showClock = false;
        this.disabled = false;
        this.outlineInput = false;
        this.openOnFocus = true;
        this.readonly = false;
        this.timeChanged = new EventEmitter();
        this.isOpen = false;
        this.isMobile = null;
        this.touchDevice = 'ontouchstart' in ((/** @type {?} */ (document.documentElement)));
        this.showHours = false;
        this.elements = document.getElementsByClassName('clockpicker');
        this.dialRadius = 135;
        this.outerRadius = 110;
        this.innerRadius = 80;
        this.tickRadius = 20;
        this.diameter = this.dialRadius * 2;
        this.isBrowser = false;
        this.hoursTicks = [];
        this.minutesTicks = [];
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
        this.touchSupported = 'ontouchstart' in window;
        this.mousedownEvent = 'mousedown' + (this.touchSupported ? ' touchstart' : '');
        this.mousemoveEvent = 'mousemove' + (this.touchSupported ? ' touchmove' : '');
        this.mouseupEvent = 'mouseup' + (this.touchSupported ? ' touchend' : '');
        this.isMouseDown = false;
        this.onChangeCb = (/**
         * @return {?}
         */
        () => { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        () => { });
        this.isBrowser = isPlatformBrowser(platformId);
        renderer.listen(this.elem.nativeElement, 'click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.showClock &&
                event.target &&
                this.elem.nativeElement !== event.target &&
                !this.elem.nativeElement.contains(event.target)) {
                this.showClock = false;
            }
            if (event.target.classList.contains('picker__holder')) {
                this.showClock = false;
            }
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ontouchmove(event) {
        this.mousedown(event);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.generateTick();
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
        this.isOpen = this.showClock;
        this._handleOutsideClick();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        ['mousedown', 'mouseup'].forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.renderer.listen(this.elem.nativeElement.querySelector('.clockpicker-plate'), event, (/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => {
                if (event === 'mousedown') {
                    this.mousedown(ev, false);
                    this.isMouseDown = true;
                }
                else {
                    this.isMouseDown = false;
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this.isBrowser) {
            // Fix for visible date / time picker input when picker plate is visible.
            try {
                /** @type {?} */
                const openedPicker = document.querySelector('.picker--opened');
                /** @type {?} */
                const allPickers = document.querySelectorAll('.picker');
                allPickers.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                (element) => {
                    this.renderer.setStyle(element, 'z-index', '0');
                }));
                this.renderer.setStyle(openedPicker, 'z-index', '1000');
            }
            catch (error) { }
        }
    }
    /**
     * @return {?}
     */
    checkDraw() {
        /** @type {?} */
        let value;
        /** @type {?} */
        const isHours = this.showHours;
        if (isHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        /** @type {?} */
        const unit = Math.PI / (isHours ? 6 : 30);
        /** @type {?} */
        const radian = value * unit;
        /** @type {?} */
        const radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius;
        /** @type {?} */
        const xd = Math.sin(radian) * radius;
        /** @type {?} */
        const yd = -Math.cos(radian) * radius;
        this.setHand(xd, yd, false);
    }
    /**
     * @param {?} e
     * @param {?=} space
     * @return {?}
     */
    mousedown(e, space) {
        /** @type {?} */
        const offset = this.plate.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const isTouch = /^touch/.test(e.type);
        /** @type {?} */
        const x0 = offset.left + this.dialRadius;
        /** @type {?} */
        const y0 = offset.top + this.dialRadius;
        /** @type {?} */
        const dx = (isTouch ? e.touches[0] : e).clientX - x0;
        /** @type {?} */
        const dy = (isTouch ? e.touches[0] : e).clientY - y0;
        /** @type {?} */
        const z = Math.sqrt(dx * dx + dy * dy);
        /** @type {?} */
        let moved = false;
        if (space &&
            (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this.showHours) {
            this.setHand(dx, dy, true);
        }
        else {
            this.setHand(dx, dy, false);
        }
        /** @type {?} */
        const mousemoveEventMethod = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            /** @type {?} */
            const x = event.clientX - x0;
            /** @type {?} */
            const y = event.clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            this._ngZone.run((/**
             * @return {?}
             */
            () => {
                this.setHand(x, y, false);
            }));
        });
        /** @type {?} */
        const mouseupEventMethod = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._document.removeEventListener(this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            /** @type {?} */
            const x = event.clientX - x0;
            /** @type {?} */
            const y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy) {
                this.setHand(x, y, false);
            }
            this.showMinutesClock();
            this._document.removeEventListener(this.mouseupEvent, mouseupEventMethod);
        });
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this._document.addEventListener(this.mousemoveEvent, mousemoveEventMethod);
            this._document.addEventListener(this.mouseupEvent, mouseupEventMethod);
        }));
    }
    /**
     * @return {?}
     */
    hideKeyboard() {
        // this set timeout needed for case when hideKeyborad
        // is called inside of 'onfocus' event handler
        try {
            setTimeout((/**
             * @return {?}
             */
            () => {
                // creating temp field
                /** @type {?} */
                const field = this.renderer.createElement('input');
                this.renderer.appendChild(this.elem.nativeElement, field);
                /** @type {?} */
                const inputReference = this.elem.nativeElement.lastElementChild;
                this.renderer.setAttribute(inputReference, 'type', 'text');
                this.renderer.setAttribute(inputReference, 'type', 'text');
                this.renderer.setStyle(inputReference, 'opacity', '0');
                this.renderer.setStyle(inputReference, '-webkit-user-modify', 'read-write-plaintext-only');
                // // hiding temp field from peoples eyes
                // // -webkit-user-modify is nessesary for Android 4.x
                // adding onfocus event handler for out temp field
                field.onfocus = (/**
                 * @return {?}
                 */
                () => {
                    // this timeout of 200ms is nessasary for Android 2.3.x
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.renderer.setStyle(field, 'display', 'none');
                        setTimeout((/**
                         * @return {?}
                         */
                        () => {
                            this.renderer.removeChild(this.elem.nativeElement, field);
                            document.body.focus();
                        }), 0);
                    }), 0);
                });
                // focusing it
                field.focus();
            }), 0);
        }
        catch (error) { }
    }
    /**
     * @return {?}
     */
    onFocusInput() {
        if (this.openOnFocus && !this.isOpen) {
            this.openBtnClicked();
        }
    }
    /**
     * @return {?}
     */
    openBtnClicked() {
        this.isOpen = true;
        this.showClock = true;
        this.showHours = true;
        this.checkDraw();
        if (this.isMobile) {
            this.hideKeyboard();
        }
        this._handleOutsideClick();
        this._cdRef.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    _handleOutsideClick() {
        /** @type {?} */
        const pickerHolder = this.elem.nativeElement.querySelector('.picker__holder');
        this.documentClickFun = this.renderer.listen(pickerHolder, 'click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const wrapper = this.elem.nativeElement.querySelector('.picker__wrap');
            if (this.isOpen && !wrapper.contains(event.target)) {
                this.close();
            }
        }));
    }
    /**
     * @return {?}
     */
    closeBtnClicked() {
        this.isOpen = false;
        /** @type {?} */
        const h = this.selectedHours.h;
        /** @type {?} */
        const m = this.selectedHours.m;
        /** @type {?} */
        const ampm = this.selectedHours.ampm;
        if (this.twelvehour) {
            this.endHours = h + ':' + m + ampm;
        }
        else {
            this.endHours = h + ':' + m;
        }
        this.onChangeCb(this.endHours);
        this.onTouchedCb();
        this.timeChanged.emit(this.endHours);
        this.showClock = false;
        if (this.documentClickFun) {
            this.documentClickFun();
        }
        this._cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    close() {
        this.isOpen = false;
        this.showClock = false;
        this.onTouchedCb();
        if (this.documentClickFun) {
            this.documentClickFun();
        }
        this._cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    clearTimeInput() {
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
        this._cdRef.markForCheck();
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    setHour(hour) {
        this.selectedHours.h = hour;
    }
    /**
     * @param {?} min
     * @return {?}
     */
    setMinute(min) {
        this.selectedHours.m = min;
    }
    /**
     * @param {?} ampm
     * @return {?}
     */
    setAmPm(ampm) {
        this.selectedHours.ampm = ampm;
    }
    /**
     * @return {?}
     */
    showHoursClock() {
        this.showHours = true;
        this.checkDraw();
    }
    /**
     * @return {?}
     */
    showMinutesClock() {
        this.showHours = false;
        this.checkDraw();
    }
    /**
     * @return {?}
     */
    generateTick() {
        if (this.twelvehour) {
            for (let i = 1; i < 13; i++) {
                /** @type {?} */
                const radian = (i / 6) * Math.PI;
                /** @type {?} */
                const radius = this.outerRadius;
                /** @type {?} */
                const tick = {
                    hour: i,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        else {
            for (let i = 0; i < 24; i++) {
                /** @type {?} */
                const radian = (i / 6) * Math.PI;
                /** @type {?} */
                const inner = i > 0 && i < 13;
                /** @type {?} */
                const radius = inner ? this.innerRadius : this.outerRadius;
                /** @type {?} */
                let h;
                if (i === 0) {
                    h = '0' + i.toString();
                }
                else {
                    h = i;
                }
                /** @type {?} */
                const tick = {
                    hour: h,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        for (let i = 0; i < 60; i += 5) {
            /** @type {?} */
            const radian = (i / 30) * Math.PI;
            /** @type {?} */
            let min = i.toString();
            if (i < 10) {
                min = '0' + i.toString();
            }
            /** @type {?} */
            const tick = {
                min: min,
                left: this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                top: this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} roundBy5
     * @return {?}
     */
    setHand(x, y, roundBy5) {
        /** @type {?} */
        let radian = Math.atan2(x, -y);
        /** @type {?} */
        const isHours = this.showHours;
        /** @type {?} */
        const unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
        /** @type {?} */
        const z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        const inner = isHours && z < (this.outerRadius + this.innerRadius) / 2;
        /** @type {?} */
        let radius = inner ? this.innerRadius : this.outerRadius;
        /** @type {?} */
        let value;
        if (this.showHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        if (this.twelvehour) {
            radius = this.outerRadius;
        }
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        else {
            if (isHours) {
                value = !inner ? value + 12 : value;
                value = value === 24 ? 0 : value;
                value = inner && value === 0 ? 12 : value;
                value = !inner && value === 12 ? 0 : value;
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
        }
        else {
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
            }
            else {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
            }
        }
        /** @type {?} */
        const cx1 = Math.sin(radian) * (radius - this.tickRadius);
        /** @type {?} */
        const cy1 = -Math.cos(radian) * (radius - this.tickRadius);
        /** @type {?} */
        const cx2 = Math.sin(radian) * radius;
        /** @type {?} */
        const cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this.showHours) {
            if (value < 10) {
                this.setHour('0' + value.toString());
            }
            else {
                this.setHour(value.toString());
            }
        }
        else {
            if (value < 10) {
                this.setMinute('0' + value.toString());
            }
            else {
                this.setMinute(value.toString());
            }
        }
        this._cdRef.markForCheck();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    offset(obj) {
        /** @type {?} */
        let left = 0;
        /** @type {?} */
        let top = 0;
        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while ((obj = obj.offsetParent));
        }
        return { left, top };
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _getFormattedTime(value) {
        /** @type {?} */
        const timeArr = value.split(':');
        /** @type {?} */
        const minutesVal = timeArr[1];
        /** @type {?} */
        const h = timeArr[0];
        /** @type {?} */
        const m = minutesVal.slice(0, 2);
        /** @type {?} */
        const ampm = minutesVal.length > 2 ? minutesVal.slice(-2) : '';
        return { h, m, ampm };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            this.showHours = true;
            /** @type {?} */
            const time = this._getFormattedTime(value);
            this.setHour(time.h);
            this.setMinute(time.m);
            this.setAmPm(time.ampm);
            this.endHours = value;
        }
        else {
            this.clearTimeInput();
        }
        this._cdRef.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCb = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCb = fn;
    }
}
ClockPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-time-picker',
                template: "<div class=\"tp\">\n  <div class=\"md-form\" [ngClass]=\"{ 'md-outline': outlineInput }\">\n    <input\n      (focus)=\"onFocusInput()\"\n      [disabled]=\"disabled\"\n      [tabindex]=\"tabIndex\"\n      [placeholder]=\"placeholder\"\n      [value]=\"endHours\"\n      type=\"text\"\n      class=\"form-control timepicker\"\n      (mousedown)=\"openBtnClicked()\"\n      [(ngModel)]=\"endHours\"\n      [readonly]=\"readonly\"\n    />\n    <label class=\"active\">{{ label }}</label>\n  </div>\n  <div\n    class=\"clockpicker picker\"\n    [hidden]=\"!showClock\"\n    [ngClass]=\"{ 'picker--opened': showClock, darktheme: darktheme }\"\n  >\n    <div class=\"picker__holder\">\n      <div class=\"picker__frame\">\n        <div class=\"picker__wrap\">\n          <div class=\"picker__box\">\n            <div class=\"picker__date-display\">\n              <div class=\"clockpicker-display\">\n                <div class=\"clockpicker-display-column\">\n                  <span\n                    class=\"clockpicker-span-hours text-primary\"\n                    [ngClass]=\"{ 'text-primary': showHours }\"\n                    (click)=\"showHoursClock()\"\n                  >\n                    {{ selectedHours.h }}</span\n                  >:<span\n                    class=\"clockpicker-span-minutes\"\n                    [ngClass]=\"{ 'text-primary': !showHours }\"\n                    (click)=\"showMinutesClock()\"\n                    >{{ selectedHours.m }}</span\n                  >\n                </div>\n                <div\n                  class=\"clockpicker-display-column clockpicker-display-am-pm\"\n                  *ngIf=\"twelvehour\"\n                >\n                  <div class=\"clockpicker-span-am-pm\">{{ selectedHours.ampm }}</div>\n                </div>\n              </div>\n            </div>\n            <div class=\"picker__calendar-container\">\n              <div class=\"clockpicker-plate\" #plate>\n                <div class=\"clockpicker-canvas\">\n                  <svg class=\"clockpicker-svg\" width=\"270\" height=\"270\" #svg>\n                    <g transform=\"translate(135,135)\" #g>\n                      <line\n                        x1=\"0\"\n                        y1=\"0\"\n                        x2=\"77.94228634059948\"\n                        y2=\"-45.00000000000001\"\n                        #hand\n                      ></line>\n                      <circle\n                        class=\"clockpicker-canvas-fg\"\n                        r=\"5\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #fg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bg\"\n                        r=\"20\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #bg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bearing\"\n                        cx=\"0\"\n                        cy=\"0\"\n                        r=\"2\"\n                        #bearing\n                      ></circle>\n                    </g>\n                  </svg>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-hours\"\n                  #hoursPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': !showHours }\"\n                  [ngStyle]=\"{ visibility: !showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of hoursTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 140%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                    id=\"{{ tick.hour }}\"\n                  >\n                    {{ tick.hour }}\n                  </div>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-minutes\"\n                  #minutesPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': showHours }\"\n                  [ngStyle]=\"{ visibility: showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of minutesTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 120%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                  >\n                    {{ tick.min }}\n                  </div>\n                </div>\n              </div>\n              <div class=\"clockpicker-am-pm-block\" *ngIf=\"twelvehour\">\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button am-button\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'AM' }\"\n                  (click)=\"setAmPm('AM')\"\n                >\n                  AM\n                </button>\n\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button pm-button white-text\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'PM' }\"\n                  (click)=\"setAmPm('PM')\"\n                >\n                  PM\n                </button>\n              </div>\n            </div>\n            <div class=\"picker__footer\">\n              <button\n                type=\"button\"\n                *ngIf=\"buttonLabel\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"closeBtnClicked()\"\n              >\n                {{ buttonLabel }}\n              </button>\n              <button\n                type=\"button\"\n                *ngIf=\"!buttonLabel\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"closeBtnClicked()\"\n              >\n                Done\n              </button>\n\n              <button\n                type=\"button\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"clearTimeInput(); close()\"\n              >\n                Clear\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TIME_PIRCKER_VALUE_ACCESSOT],
                styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black,.picker__list-item:hover{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.picker__list-item,.white{background-color:#fff!important}.clockpicker-display .clockpicker-display-column #click-am.text-primary,.clockpicker-display .clockpicker-display-column #click-pm.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary,.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick,.darktheme .picker__box .picker__date-display .clockpicker-display,.darktheme .picker__box .picker__date-display .clockpicker-display .clockpicker-span-am-pm,.darktheme .picker__box .picker__footer button,.picker--focused .picker__list-item--selected,.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:focus:before,.picker--time .picker__button--clear:hover,.picker--time .picker__button--clear:hover:before,.picker__date-display,.picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary,.picker__list-item--selected,.picker__list-item--selected:hover,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.picker__input{cursor:default}.picker__input.picker__input--active{border-color:#0089ec}.picker{font-size:1rem;text-align:center;line-height:1.2;color:#000;position:absolute;z-index:10000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none/*!\n   * Default mobile-first, responsive styling for pickadate.js\n   * Demo: http://amsul.github.io/pickadate.js\n   */}.picker .picker__holder{width:100%;overflow-scrolling:touch;position:fixed;transition:background .15s ease-out,top .15s;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow-y:visible}.picker .picker__frame,.picker .picker__holder{bottom:0;left:0;right:0;top:100%}.picker .picker__frame{position:absolute;margin:0 auto;min-width:16rem;max-width:20.3125rem;width:18.75rem;max-height:21.875rem;opacity:0;transition:.15s ease-out}@media (min-height:40.125em){.picker .picker__frame{margin-bottom:7.5%}}.picker .picker__frame .picker__wrap{display:table;width:100%;height:100%}.picker .picker__box{background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.picker .picker__frame{overflow:visible;top:auto;bottom:-100%;max-height:80%}.picker .picker__frame .picker__wrap{display:block}.picker .picker__box{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24)}}.picker--opened .picker__holder{top:0;background:rgba(0,0,0,.32);zoom:1;transition:background .15s ease-out}.picker--opened .picker__frame{top:0;opacity:1}@media (min-height:35.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.datepicker.picker__input.picker__input--active,.timepicker.picker__input.picker__input--active{border-bottom:1px solid #e3f2fd}.picker__list{list-style:none;padding:.75em 0 4.2em;margin:0}.picker__list-item{border-bottom:1px solid #ddd;border-top:1px solid #ddd;margin-bottom:-1px;position:relative;padding:.75em 1.25em}@media (min-height:46.75em){.picker__list-item{padding:.5em 1em}}.picker__list-item:hover{cursor:pointer;background:#b1dcfb;border-color:#0089ec;z-index:10}.picker__list-item--highlighted{border-color:#0089ec;z-index:10}.picker--focused .picker__list-item--highlighted,.picker__list-item--highlighted:hover{cursor:pointer;color:#000;background:#b1dcfb}.picker--focused .picker__list-item--selected,.picker__list-item--selected,.picker__list-item--selected:hover{background:#0089ec;z-index:10}.picker--focused .picker__list-item--disabled,.picker__list-item--disabled,.picker__list-item--disabled:hover{background:#f5f5f5;border-color:#ddd;color:#ddd;cursor:default;z-index:auto}.picker--time .picker__button--clear{display:block;width:80%;margin:1em auto 0;padding:1em 1.25em;background:0 0;border:0;font-weight:500;font-size:.67em;text-align:center;text-transform:uppercase;color:#666}.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:hover{color:#000;background:#b1dcfb;border-color:#e20;cursor:pointer;outline:0}.picker--time .picker__button--clear:before{top:-.25em;color:#666;font-size:1.25em;font-weight:700}.picker--time .picker__frame{min-width:16rem;max-width:20rem}.picker--time .picker__box{font-size:1em;background:#f2f2f2;padding:0}@media (min-height:40.125em){.picker--time .picker__box{margin-bottom:5em}}/*!\n * ClockPicker v0.0.7 for jQuery (http://weareoutman.github.io/clockpicker/)\n * Copyright 2014 Wang Shenwei.\n * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)\n *\n * Further modified\n * Copyright 2015 Ching Yaw Hao.\n *\n * Bootstrap v3.1.1 (http://getbootstrap.com)\n * Copyright 2011-2014 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */.picker__date-display{text-align:center;background-color:#4285f4;padding-bottom:.9375rem;font-weight:300;margin-bottom:1rem}.picker__date-display .clockpicker-display{vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:#b2dfdb}.picker__date-display .clockpicker-display .clockpicker-display-column{float:left}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.picker__date-display .clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.picker__date-display .clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:#b2dfdb}.picker__date-display .clockpicker-display .clockpicker-span-hours,.picker__date-display .clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;transition:color .5s;cursor:pointer}.clockpicker-display{text-align:center;vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:#b2dfdb}.clockpicker-display .clockpicker-display-column{float:left}.clockpicker-display .clockpicker-display-column #click-am.text-primary,.clockpicker-display .clockpicker-display-column #click-pm.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse}.clockpicker-display .clockpicker-display-column #click-am,.clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:#b2dfdb}.clockpicker-display .clockpicker-span-hours,.clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;cursor:pointer;transition:color .5s}@-webkit-keyframes pulse{from,to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}}@keyframes pulse{from,to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}}.clockpicker-moving{cursor:move}.clockpicker-plate{background-color:#eee;border-radius:50%;width:16.875rem;height:16.875rem;overflow:visible;position:relative;margin:1.25rem auto auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.clockpicker-plate .clockpicker-canvas,.clockpicker-plate .clockpicker-dial{width:16.875rem;height:16.875rem;position:absolute;left:-1px;top:-1px}.clockpicker-plate .clockpicker-dial{transition:transform 350ms,opacity 350ms,-webkit-transform 350ms}.clockpicker-plate .clockpicker-dial .clockpicker-tick{border-radius:50%;color:#666;line-height:2.5rem;text-align:center;width:2.5rem;height:2.5rem;position:absolute;cursor:pointer;transition:background-color .3s;background-color:rgba(0,150,136,0)}.clockpicker-plate .clockpicker-dial .clockpicker-tick.active,.clockpicker-plate .clockpicker-dial .clockpicker-tick:hover{background-color:rgba(0,150,136,.25)}.clockpicker-plate .clockpicker-minutes{visibility:hidden}.clockpicker-plate .clockpicker-dial-out{opacity:0}.clockpicker-plate .clockpicker-hours.clockpicker-dial-out{-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}.clockpicker-plate .clockpicker-minutes.clockpicker-dial-out{-webkit-transform:scale(.8,.8);transform:scale(.8,.8)}.clockpicker-canvas{transition:opacity .3s}.clockpicker-canvas line{stroke:rgba(0,150,136,.25);stroke-width:1}.clockpicker-canvas-out{opacity:.25}.clockpicker-canvas-bearing{stroke:none;fill:rgba(0,77,64,.75)}.clockpicker-canvas-fg{stroke:none;fill:rgba(0,77,64,0)}.clockpicker-canvas-fg.active{fill:rgba(0,77,64,.5)}.clockpicker-canvas-bg{stroke:none;fill:rgba(0,150,136,.25)}.clockpicker-canvas-bg-trans{fill:rgba(0,150,136,.25)}.clockpicker-am-pm-block{margin-top:-.625rem;width:100%;height:3.125rem}.clockpicker-am-pm-block .clockpicker-button.am-button{height:2.8125rem;width:2.8125rem;float:left;border:0}.clockpicker-am-pm-block .clockpicker-button.pm-button{height:2.8125rem;width:2.8125rem;float:right;border:0}.btn-floating.btn-flat{color:#fff;padding:0;background:#4285f4}.btn-floating.btn-flat:hover{box-shadow:none}.btn-floating.btn-flat:focus,.btn-floating.btn-flat:hover{background-color:#5a95f5!important}.btn-floating.btn-flat.active{background-color:#0b51c5!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.picker__footer{width:100%}.picker__footer .clockpicker-button{margin:.9375rem auto auto;background-color:transparent;text-transform:uppercase}.picker__footer .clockpicker-button:focus{background-color:transparent}.picker__footer .clockpicker-button:active{background-color:rgba(0,150,136,.25)}.darktheme .picker__box{background-color:#212121}.darktheme .picker__box .picker__calendar-container .clockpicker-plate,.darktheme .picker__box .picker__date-display{background-color:transparent}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick{background-color:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick.active,.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick:hover{background-color:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas line{stroke:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bearing{fill:#fff}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg{fill:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg.active{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg{fill:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg-trans{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__footer .clockpicker-button:active{background-color:rgba(255,64,129,.25)}.hand-move .clockpicker-tick{cursor:all-scroll!important}.clockpicker-button{cursor:pointer;transition:.3s}.clockpicker-button:hover{background-color:rgba(0,150,136,.25)}.darktheme .clockpicker-button:hover{background-color:rgba(255,64,129,.25)}.validate-success.ng-valid .timepicker{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .tp label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .timepicker,.validate-error.ng-invalid.ng-touched .timepicker{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .tp label,.validate-error.ng-invalid.ng-touched .tp label{color:#f44336!important}.md-outline input:focus>label.active{color:#4285f4}.md-outline .timepicker{height:36px!important}.clockpicker-button.am-button,.clockpicker-button.pm-button{color:#fff!important}"]
            }] }
];
/** @nocollapse */
ClockPickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
ClockPickerComponent.propDecorators = {
    hoursPlate: [{ type: ViewChild, args: ['hoursPlate', { static: true },] }],
    minutesPlate: [{ type: ViewChild, args: ['minutesPlate', { static: true },] }],
    plate: [{ type: ViewChild, args: ['plate', { static: true },] }],
    svg: [{ type: ViewChild, args: ['svg', { static: true },] }],
    g: [{ type: ViewChild, args: ['g', { static: true },] }],
    hand: [{ type: ViewChild, args: ['hand', { static: true },] }],
    fg: [{ type: ViewChild, args: ['fg', { static: true },] }],
    bg: [{ type: ViewChild, args: ['bg', { static: true },] }],
    bearing: [{ type: ViewChild, args: ['bearing', { static: true },] }],
    twelvehour: [{ type: Input }],
    darktheme: [{ type: Input }],
    placeholder: [{ type: Input }],
    label: [{ type: Input }],
    duration: [{ type: Input }],
    showClock: [{ type: Input }],
    buttonLabel: [{ type: Input }],
    disabled: [{ type: Input }],
    tabIndex: [{ type: Input }],
    outlineInput: [{ type: Input }],
    openOnFocus: [{ type: Input }],
    readonly: [{ type: Input }],
    timeChanged: [{ type: Output }],
    ontouchmove: [{ type: HostListener, args: ['touchmove', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ClockPickerComponent.prototype.hoursPlate;
    /** @type {?} */
    ClockPickerComponent.prototype.minutesPlate;
    /** @type {?} */
    ClockPickerComponent.prototype.plate;
    /** @type {?} */
    ClockPickerComponent.prototype.svg;
    /** @type {?} */
    ClockPickerComponent.prototype.g;
    /** @type {?} */
    ClockPickerComponent.prototype.hand;
    /** @type {?} */
    ClockPickerComponent.prototype.fg;
    /** @type {?} */
    ClockPickerComponent.prototype.bg;
    /** @type {?} */
    ClockPickerComponent.prototype.bearing;
    /** @type {?} */
    ClockPickerComponent.prototype.twelvehour;
    /** @type {?} */
    ClockPickerComponent.prototype.darktheme;
    /** @type {?} */
    ClockPickerComponent.prototype.placeholder;
    /** @type {?} */
    ClockPickerComponent.prototype.label;
    /** @type {?} */
    ClockPickerComponent.prototype.duration;
    /** @type {?} */
    ClockPickerComponent.prototype.showClock;
    /** @type {?} */
    ClockPickerComponent.prototype.buttonLabel;
    /** @type {?} */
    ClockPickerComponent.prototype.disabled;
    /** @type {?} */
    ClockPickerComponent.prototype.tabIndex;
    /** @type {?} */
    ClockPickerComponent.prototype.outlineInput;
    /** @type {?} */
    ClockPickerComponent.prototype.openOnFocus;
    /** @type {?} */
    ClockPickerComponent.prototype.readonly;
    /** @type {?} */
    ClockPickerComponent.prototype.timeChanged;
    /** @type {?} */
    ClockPickerComponent.prototype.isOpen;
    /** @type {?} */
    ClockPickerComponent.prototype.isMobile;
    /** @type {?} */
    ClockPickerComponent.prototype.touchDevice;
    /** @type {?} */
    ClockPickerComponent.prototype.showHours;
    /** @type {?} */
    ClockPickerComponent.prototype.moveEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.tapEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.elements;
    /** @type {?} */
    ClockPickerComponent.prototype.elementNumber;
    /** @type {?} */
    ClockPickerComponent.prototype.dialRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.outerRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.innerRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.tickRadius;
    /** @type {?} */
    ClockPickerComponent.prototype.diameter;
    /** @type {?} */
    ClockPickerComponent.prototype.isBrowser;
    /** @type {?} */
    ClockPickerComponent.prototype.hoursTicks;
    /** @type {?} */
    ClockPickerComponent.prototype.minutesTicks;
    /** @type {?} */
    ClockPickerComponent.prototype.selectedHours;
    /** @type {?} */
    ClockPickerComponent.prototype.endHours;
    /** @type {?} */
    ClockPickerComponent.prototype.touchSupported;
    /** @type {?} */
    ClockPickerComponent.prototype.mousedownEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.mousemoveEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.mouseupEvent;
    /** @type {?} */
    ClockPickerComponent.prototype.isMouseDown;
    /** @type {?} */
    ClockPickerComponent.prototype.documentClickFun;
    /** @type {?} */
    ClockPickerComponent.prototype.onChangeCb;
    /** @type {?} */
    ClockPickerComponent.prototype.onTouchedCb;
    /** @type {?} */
    ClockPickerComponent.prototype.elem;
    /** @type {?} */
    ClockPickerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClockPickerComponent.prototype._cdRef;
    /**
     * @type {?}
     * @private
     */
    ClockPickerComponent.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    ClockPickerComponent.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWUtcGlja2VyL3RpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFOUQsTUFBTSxPQUFPLDJCQUEyQixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7O0lBRTFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBVUQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7O0lBc0QvQixZQUNTLElBQWdCLEVBQ2hCLFFBQW1CLEVBQ2xCLE1BQXlCLEVBQ3pCLE9BQWUsRUFDRyxTQUFjLEVBQ25CLFVBQWtCO1FBTGhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ0csY0FBUyxHQUFULFNBQVMsQ0FBSztRQTlDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6RSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFRLElBQUksQ0FBQztRQUNyQixnQkFBVyxHQUFHLGNBQWMsSUFBSSxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxlQUFlLEVBQU8sQ0FBQyxDQUFDO1FBQ2xFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJWCxhQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBR2pFLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxHQUFHLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDL0IsY0FBUyxHQUFRLEtBQUssQ0FBQztRQUV2QixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3RELGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZCxtQkFBYyxHQUFRLGNBQWMsSUFBSSxNQUFNLENBQUM7UUFDL0MsbUJBQWMsR0FBUSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLG1CQUFjLEdBQVEsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxpQkFBWSxHQUFRLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFxYnBCLGVBQVU7OztRQUFxQixHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7UUFDeEMsZ0JBQVc7OztRQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztRQTVhakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU87Ozs7UUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQy9ELElBQ0UsSUFBSSxDQUFDLFNBQVM7Z0JBQ2QsS0FBSyxDQUFDLE1BQU07Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLE1BQU07Z0JBQ3hDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDL0M7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDeEI7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFc0MsV0FBVyxDQUFDLEtBQVU7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUMzRCxLQUFLOzs7O1lBQ0wsQ0FBQyxFQUFPLEVBQUUsRUFBRTtnQkFDVixJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxFQUNGLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLHlFQUF5RTtZQUN6RSxJQUFJOztzQkFDSSxZQUFZLEdBQVEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQzs7c0JBQzdELFVBQVUsR0FBUSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO2dCQUM1RCxVQUFVLENBQUMsT0FBTzs7OztnQkFBQyxDQUFDLE9BQVksRUFBRSxFQUFFO29CQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLEVBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3pEO1lBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtTQUNuQjtJQUNILENBQUM7Ozs7SUFFRCxTQUFTOztZQUNILEtBQUs7O2NBQ0gsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTO1FBQzlCLElBQUksT0FBTyxFQUFFO1lBQ1gsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQzs7Y0FFSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O2NBQ3ZDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSTs7Y0FDckIsTUFBTSxHQUFHLE9BQU8sSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXOztjQUNqRixFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNOztjQUM5QixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU07UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxDQUFNLEVBQUUsS0FBVzs7Y0FDckIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFOztjQUM3RCxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztjQUMvQixFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVTs7Y0FDbEMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2NBQ2pDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUU7O2NBQzlDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUU7O2NBQzlDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7WUFDOUIsS0FBSyxHQUFHLEtBQUs7UUFFakIsSUFDRSxLQUFLO1lBQ0wsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDbEY7WUFDQSxPQUFPO1NBQ1I7UUFDRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7Y0FFSyxvQkFBb0I7Ozs7UUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQzFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7O2tCQUNsQixDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFOztrQkFDMUIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDbEMsT0FBTzthQUNSO1lBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQztZQUViLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7O2NBRUssa0JBQWtCOzs7O1FBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O2tCQUNiLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUU7O2tCQUMxQixDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixxREFBcUQ7UUFDckQsOENBQThDO1FBQzlDLElBQUk7WUFDRixVQUFVOzs7WUFBQyxHQUFHLEVBQUU7OztzQkFFUixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7c0JBQ3BELGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7Z0JBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO2dCQUMzRix5Q0FBeUM7Z0JBQ3pDLHNEQUFzRDtnQkFDdEQsa0RBQWtEO2dCQUNsRCxLQUFLLENBQUMsT0FBTzs7O2dCQUFHLEdBQUcsRUFBRTtvQkFDbkIsdURBQXVEO29CQUN2RCxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2pELFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUU7NEJBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3hCLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsY0FBYztnQkFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7UUFBQyxPQUFPLEtBQUssRUFBRSxHQUFFO0lBQ3BCLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVPLG1CQUFtQjs7Y0FDbkIsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztRQUM3RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU87Ozs7UUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFOztrQkFDM0UsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFFdEUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztjQUNkLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7O2NBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7O2NBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7UUFFcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3NCQUNyQixNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7O3NCQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVc7O3NCQUV6QixJQUFJLEdBQUc7b0JBQ1gsSUFBSSxFQUFFLENBQUM7b0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVU7b0JBQ25FLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVO2lCQUNuRTtnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtTQUNGO2FBQU07WUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFOztzQkFDckIsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFOztzQkFDMUIsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7O3NCQUN2QixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVzs7b0JBQ3RELENBQUM7Z0JBRUwsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNYLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUN4QjtxQkFBTTtvQkFDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNQOztzQkFFSyxJQUFJLEdBQUc7b0JBQ1gsSUFBSSxFQUFFLENBQUM7b0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVU7b0JBQ25FLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVO2lCQUNuRTtnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtTQUNGO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFOztrQkFDeEIsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFOztnQkFDN0IsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNWLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzFCOztrQkFDSyxJQUFJLEdBQUc7Z0JBQ1gsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVO2dCQUM3RSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDN0U7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7Ozs7SUFFRCxPQUFPLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxRQUFhOztZQUMvQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2NBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUzs7Y0FDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Y0FDL0MsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztjQUM1QixLQUFLLEdBQUcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7O1lBQ2xFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXOztZQUNwRCxLQUFLO1FBRVQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7UUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQy9CO1FBRUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2YsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDWjthQUNGO2lCQUFNO2dCQUNMLElBQUksUUFBUSxFQUFFO29CQUNaLEtBQUssSUFBSSxDQUFDLENBQUM7aUJBQ1o7Z0JBQ0QsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLEtBQUssR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDakMsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDMUMsS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLElBQUksUUFBUSxFQUFFO29CQUNaLEtBQUssSUFBSSxDQUFDLENBQUM7aUJBQ1o7Z0JBQ0QsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2FBQ0Y7U0FDRjtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3RFO2FBQU07WUFDTCxJQUFJLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7YUFDdEU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO2FBQzdFO1NBQ0Y7O2NBRUssR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Y0FDdkQsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDOztjQUNwRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNOztjQUMvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU07UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFOUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTTtZQUNMLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVE7O1lBQ1QsSUFBSSxHQUFHLENBQUM7O1lBQ1YsR0FBRyxHQUFHLENBQUM7UUFFVCxJQUFJLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDcEIsR0FBRztnQkFDRCxJQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDdEIsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUU7U0FDcEM7UUFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUFDLEtBQWE7O2NBQy9CLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Y0FDMUIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7O2NBRXZCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDOztjQUNkLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O2NBQzFCLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBRTlELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBS0QsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7a0JBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBMWdCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isb3ROQUEwQztnQkFFMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzs7YUFDekM7Ozs7WUFqQ0MsVUFBVTtZQVFWLFNBQVM7WUFJVCxpQkFBaUI7WUFDakIsTUFBTTs0Q0FnRkgsTUFBTSxTQUFDLFFBQVE7eUNBQ2YsTUFBTSxTQUFDLFdBQVc7Ozt5QkExRHBCLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzJCQUN4QyxTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtvQkFFMUMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7a0JBQ25DLFNBQVMsU0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNqQyxTQUFTLFNBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTttQkFDL0IsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7aUJBQ2xDLFNBQVMsU0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2lCQUNoQyxTQUFTLFNBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtzQkFDaEMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7eUJBRXJDLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLE1BQU07MEJBcUROLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUE1RXJDLDBDQUF5RTs7SUFDekUsNENBQTZFOztJQUU3RSxxQ0FBK0Q7O0lBQy9ELG1DQUEyRDs7SUFDM0QsaUNBQXVEOztJQUN2RCxvQ0FBNkQ7O0lBQzdELGtDQUF5RDs7SUFDekQsa0NBQXlEOztJQUN6RCx1Q0FBbUU7O0lBRW5FLDBDQUE0Qjs7SUFDNUIseUNBQTJCOztJQUMzQiwyQ0FBa0M7O0lBQ2xDLHFDQUFvQjs7SUFDcEIsd0NBQXdCOztJQUN4Qix5Q0FBMkI7O0lBQzNCLDJDQUE2Qjs7SUFDN0Isd0NBQTBCOztJQUMxQix3Q0FBdUI7O0lBQ3ZCLDRDQUE4Qjs7SUFDOUIsMkNBQTRCOztJQUM1Qix3Q0FBMEI7O0lBQzFCLDJDQUF5RTs7SUFDekUsc0NBQWU7O0lBQ2Ysd0NBQXFCOztJQUNyQiwyQ0FBa0U7O0lBQ2xFLHlDQUFrQjs7SUFDbEIseUNBQWtCOztJQUNsQix3Q0FBaUI7O0lBRWpCLHdDQUFpRTs7SUFDakUsNkNBQTBCOztJQUUxQiwwQ0FBaUI7O0lBQ2pCLDJDQUFrQjs7SUFDbEIsMkNBQWlCOztJQUNqQiwwQ0FBZ0I7O0lBQ2hCLHdDQUErQjs7SUFDL0IseUNBQXVCOztJQUV2QiwwQ0FBcUI7O0lBQ3JCLDRDQUF1Qjs7SUFDdkIsNkNBQXNEOztJQUN0RCx3Q0FBYzs7SUFFZCw4Q0FBK0M7O0lBQy9DLDhDQUErRTs7SUFDL0UsOENBQThFOztJQUM5RSw0Q0FBeUU7O0lBQ3pFLDJDQUFvQjs7SUFDcEIsZ0RBQTJCOztJQW9iM0IsMENBQXdDOztJQUN4QywyQ0FBbUM7O0lBbmJqQyxvQ0FBdUI7O0lBQ3ZCLHdDQUEwQjs7Ozs7SUFDMUIsc0NBQWlDOzs7OztJQUNqQyx1Q0FBdUI7Ozs7O0lBQ3ZCLHlDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFBMQVRGT1JNX0lELFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgTmdab25lLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRJTUVfUElSQ0tFUl9WQUxVRV9BQ0NFU1NPVDogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2xvY2tQaWNrZXJDb21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZGItdGltZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci1tb2R1bGUuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbVElNRV9QSVJDS0VSX1ZBTFVFX0FDQ0VTU09UXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENsb2NrUGlja2VyQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuICBAVmlld0NoaWxkKCdob3Vyc1BsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGhvdXJzUGxhdGU6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWludXRlc1BsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIG1pbnV0ZXNQbGF0ZTogRWxlbWVudFJlZjtcclxuXHJcbiAgQFZpZXdDaGlsZCgncGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgcGxhdGU6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnc3ZnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIHN2ZzogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGc6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnaGFuZCcsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBoYW5kOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2ZnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGZnOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JnJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGJnOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JlYXJpbmcnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgYmVhcmluZzogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KCkgdHdlbHZlaG91ciA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRhcmt0aGVtZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBTdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xyXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xyXG4gIEBJbnB1dCgpIHNob3dDbG9jayA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSB0YWJJbmRleDogYW55O1xyXG4gIEBJbnB1dCgpIG91dGxpbmVJbnB1dCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIG9wZW5PbkZvY3VzID0gdHJ1ZTtcclxuICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSB0aW1lQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBpc09wZW4gPSBmYWxzZTtcclxuICBpc01vYmlsZTogYW55ID0gbnVsbDtcclxuICB0b3VjaERldmljZSA9ICdvbnRvdWNoc3RhcnQnIGluIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgYXMgYW55KTtcclxuICBzaG93SG91cnMgPSBmYWxzZTtcclxuICBtb3ZlRXZlbnQ6IHN0cmluZztcclxuICB0YXBFdmVudDogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjbG9ja3BpY2tlcicpO1xyXG4gIHB1YmxpYyBlbGVtZW50TnVtYmVyOiBhbnk7XHJcblxyXG4gIGRpYWxSYWRpdXMgPSAxMzU7XHJcbiAgb3V0ZXJSYWRpdXMgPSAxMTA7XHJcbiAgaW5uZXJSYWRpdXMgPSA4MDtcclxuICB0aWNrUmFkaXVzID0gMjA7XHJcbiAgZGlhbWV0ZXIgPSB0aGlzLmRpYWxSYWRpdXMgKiAyO1xyXG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XHJcblxyXG4gIGhvdXJzVGlja3M6IGFueSA9IFtdO1xyXG4gIG1pbnV0ZXNUaWNrczogYW55ID0gW107XHJcbiAgc2VsZWN0ZWRIb3VyczogYW55ID0geyBoOiAnMTInLCBtOiAnMDAnLCBhbXBtOiAnQU0nIH07XHJcbiAgZW5kSG91cnMgPSAnJztcclxuXHJcbiAgdG91Y2hTdXBwb3J0ZWQ6IGFueSA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcclxuICBtb3VzZWRvd25FdmVudDogYW55ID0gJ21vdXNlZG93bicgKyAodGhpcy50b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2hzdGFydCcgOiAnJyk7XHJcbiAgbW91c2Vtb3ZlRXZlbnQ6IGFueSA9ICdtb3VzZW1vdmUnICsgKHRoaXMudG91Y2hTdXBwb3J0ZWQgPyAnIHRvdWNobW92ZScgOiAnJyk7XHJcbiAgbW91c2V1cEV2ZW50OiBhbnkgPSAnbW91c2V1cCcgKyAodGhpcy50b3VjaFN1cHBvcnRlZCA/ICcgdG91Y2hlbmQnIDogJycpO1xyXG4gIGlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgZG9jdW1lbnRDbGlja0Z1bjogRnVuY3Rpb247XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcclxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xyXG4gICAgcmVuZGVyZXIubGlzdGVuKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zaG93Q2xvY2sgJiZcclxuICAgICAgICBldmVudC50YXJnZXQgJiZcclxuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXHJcbiAgICAgICAgIXRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5zaG93Q2xvY2sgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGlja2VyX19ob2xkZXInKSkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Nsb2NrID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2htb3ZlJywgWyckZXZlbnQnXSkgb250b3VjaG1vdmUoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5tb3VzZWRvd24oZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdlbmVyYXRlVGljaygpO1xyXG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XHJcbiAgICAgIHRoaXMuaXNNb2JpbGUgPSAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzT3BlbiA9IHRoaXMuc2hvd0Nsb2NrO1xyXG4gICAgdGhpcy5faGFuZGxlT3V0c2lkZUNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBbJ21vdXNlZG93bicsICdtb3VzZXVwJ10uZm9yRWFjaCgoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihcclxuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvY2twaWNrZXItcGxhdGUnKSxcclxuICAgICAgICBldmVudCxcclxuICAgICAgICAoZXY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50ID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlZG93bihldiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICAvLyBGaXggZm9yIHZpc2libGUgZGF0ZSAvIHRpbWUgcGlja2VyIGlucHV0IHdoZW4gcGlja2VyIHBsYXRlIGlzIHZpc2libGUuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb3BlbmVkUGlja2VyOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGlja2VyLS1vcGVuZWQnKTtcclxuICAgICAgICBjb25zdCBhbGxQaWNrZXJzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGlja2VyJyk7XHJcbiAgICAgICAgYWxsUGlja2Vycy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxlbWVudCwgJ3otaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUob3BlbmVkUGlja2VyLCAnei1pbmRleCcsICcxMDAwJyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tEcmF3KCkge1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgY29uc3QgaXNIb3VycyA9IHRoaXMuc2hvd0hvdXJzO1xyXG4gICAgaWYgKGlzSG91cnMpIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkSG91cnMuaCwgMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRIb3Vycy5tLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1bml0ID0gTWF0aC5QSSAvIChpc0hvdXJzID8gNiA6IDMwKSxcclxuICAgICAgcmFkaWFuID0gdmFsdWUgKiB1bml0LFxyXG4gICAgICByYWRpdXMgPSBpc0hvdXJzICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEzID8gdGhpcy5pbm5lclJhZGl1cyA6IHRoaXMub3V0ZXJSYWRpdXMsXHJcbiAgICAgIHhkID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcclxuICAgICAgeWQgPSAtTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cztcclxuICAgIHRoaXMuc2V0SGFuZCh4ZCwgeWQsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIG1vdXNlZG93bihlOiBhbnksIHNwYWNlPzogYW55KSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBsYXRlLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgIGlzVG91Y2ggPSAvXnRvdWNoLy50ZXN0KGUudHlwZSksXHJcbiAgICAgIHgwID0gb2Zmc2V0LmxlZnQgKyB0aGlzLmRpYWxSYWRpdXMsXHJcbiAgICAgIHkwID0gb2Zmc2V0LnRvcCArIHRoaXMuZGlhbFJhZGl1cyxcclxuICAgICAgZHggPSAoaXNUb3VjaCA/IGUudG91Y2hlc1swXSA6IGUpLmNsaWVudFggLSB4MCxcclxuICAgICAgZHkgPSAoaXNUb3VjaCA/IGUudG91Y2hlc1swXSA6IGUpLmNsaWVudFkgLSB5MCxcclxuICAgICAgeiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICBsZXQgbW92ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHNwYWNlICYmXHJcbiAgICAgICh6IDwgdGhpcy5vdXRlclJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyB8fCB6ID4gdGhpcy5vdXRlclJhZGl1cyArIHRoaXMudGlja1JhZGl1cylcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dIb3Vycykge1xyXG4gICAgICB0aGlzLnNldEhhbmQoZHgsIGR5LCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0SGFuZChkeCwgZHksIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb3VzZW1vdmVFdmVudE1ldGhvZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHgwLFxyXG4gICAgICAgIHkgPSBldmVudC5jbGllbnRZIC0geTA7XHJcbiAgICAgIGlmICghbW92ZWQgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbW92ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRIYW5kKHgsIHksIGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1vdXNldXBFdmVudE1ldGhvZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5tb3VzZW1vdmVFdmVudCwgbW91c2Vtb3ZlRXZlbnRNZXRob2QpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0geDAsXHJcbiAgICAgICAgeSA9IGV2ZW50LmNsaWVudFggLSB5MDtcclxuICAgICAgaWYgKChzcGFjZSB8fCBtb3ZlZCkgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcclxuICAgICAgICB0aGlzLnNldEhhbmQoeCwgeSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd01pbnV0ZXNDbG9jaygpO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW91c2V1cEV2ZW50LCBtb3VzZXVwRXZlbnRNZXRob2QpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMubW91c2Vtb3ZlRXZlbnQsIG1vdXNlbW92ZUV2ZW50TWV0aG9kKTtcclxuICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm1vdXNldXBFdmVudCwgbW91c2V1cEV2ZW50TWV0aG9kKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGlkZUtleWJvYXJkKCkge1xyXG4gICAgLy8gdGhpcyBzZXQgdGltZW91dCBuZWVkZWQgZm9yIGNhc2Ugd2hlbiBoaWRlS2V5Ym9yYWRcclxuICAgIC8vIGlzIGNhbGxlZCBpbnNpZGUgb2YgJ29uZm9jdXMnIGV2ZW50IGhhbmRsZXJcclxuICAgIHRyeSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIGNyZWF0aW5nIHRlbXAgZmllbGRcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCBmaWVsZCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRSZWZlcmVuY2UgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0UmVmZXJlbmNlLCAndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXRSZWZlcmVuY2UsICd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGlucHV0UmVmZXJlbmNlLCAnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShpbnB1dFJlZmVyZW5jZSwgJy13ZWJraXQtdXNlci1tb2RpZnknLCAncmVhZC13cml0ZS1wbGFpbnRleHQtb25seScpO1xyXG4gICAgICAgIC8vIC8vIGhpZGluZyB0ZW1wIGZpZWxkIGZyb20gcGVvcGxlcyBleWVzXHJcbiAgICAgICAgLy8gLy8gLXdlYmtpdC11c2VyLW1vZGlmeSBpcyBuZXNzZXNhcnkgZm9yIEFuZHJvaWQgNC54XHJcbiAgICAgICAgLy8gYWRkaW5nIG9uZm9jdXMgZXZlbnQgaGFuZGxlciBmb3Igb3V0IHRlbXAgZmllbGRcclxuICAgICAgICBmaWVsZC5vbmZvY3VzID0gKCkgPT4ge1xyXG4gICAgICAgICAgLy8gdGhpcyB0aW1lb3V0IG9mIDIwMG1zIGlzIG5lc3Nhc2FyeSBmb3IgQW5kcm9pZCAyLjMueFxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZmllbGQsICdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgZmllbGQpO1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGZvY3VzaW5nIGl0XHJcbiAgICAgICAgZmllbGQuZm9jdXMoKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge31cclxuICB9XHJcblxyXG4gIG9uRm9jdXNJbnB1dCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wZW5PbkZvY3VzICYmICF0aGlzLmlzT3Blbikge1xyXG4gICAgICB0aGlzLm9wZW5CdG5DbGlja2VkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvd0Nsb2NrID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvd0hvdXJzID0gdHJ1ZTtcclxuICAgIHRoaXMuY2hlY2tEcmF3KCk7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICB0aGlzLmhpZGVLZXlib2FyZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faGFuZGxlT3V0c2lkZUNsaWNrKCk7XHJcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZU91dHNpZGVDbGljaygpIHtcclxuICAgIGNvbnN0IHBpY2tlckhvbGRlciA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWNrZXJfX2hvbGRlcicpO1xyXG4gICAgdGhpcy5kb2N1bWVudENsaWNrRnVuID0gdGhpcy5yZW5kZXJlci5saXN0ZW4ocGlja2VySG9sZGVyLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBpY2tlcl9fd3JhcCcpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXNPcGVuICYmICF3cmFwcGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VCdG5DbGlja2VkKCkge1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIGNvbnN0IGggPSB0aGlzLnNlbGVjdGVkSG91cnMuaDtcclxuICAgIGNvbnN0IG0gPSB0aGlzLnNlbGVjdGVkSG91cnMubTtcclxuICAgIGNvbnN0IGFtcG0gPSB0aGlzLnNlbGVjdGVkSG91cnMuYW1wbTtcclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVob3VyKSB7XHJcbiAgICAgIHRoaXMuZW5kSG91cnMgPSBoICsgJzonICsgbSArIGFtcG07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuZEhvdXJzID0gaCArICc6JyArIG07XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2IodGhpcy5lbmRIb3Vycyk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcbiAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQodGhpcy5lbmRIb3Vycyk7XHJcbiAgICB0aGlzLnNob3dDbG9jayA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tGdW4pIHtcclxuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRnVuKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0Nsb2NrID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0Z1bikge1xyXG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tGdW4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGNsZWFyVGltZUlucHV0KCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEhvdXJzID0geyBoOiAnMTInLCBtOiAnMDAnLCBhbXBtOiAnQU0nIH07XHJcbiAgICB0aGlzLmVuZEhvdXJzID0gJyc7XHJcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXIoaG91cjogU3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSG91cnMuaCA9IGhvdXI7XHJcbiAgfVxyXG5cclxuICBzZXRNaW51dGUobWluOiBTdHJpbmcpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRIb3Vycy5tID0gbWluO1xyXG4gIH1cclxuXHJcbiAgc2V0QW1QbShhbXBtOiBTdHJpbmcpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRIb3Vycy5hbXBtID0gYW1wbTtcclxuICB9XHJcblxyXG4gIHNob3dIb3Vyc0Nsb2NrKCkge1xyXG4gICAgdGhpcy5zaG93SG91cnMgPSB0cnVlO1xyXG4gICAgdGhpcy5jaGVja0RyYXcoKTtcclxuICB9XHJcblxyXG4gIHNob3dNaW51dGVzQ2xvY2soKSB7XHJcbiAgICB0aGlzLnNob3dIb3VycyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGVja0RyYXcoKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlVGljaygpIHtcclxuICAgIGlmICh0aGlzLnR3ZWx2ZWhvdXIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMzsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cztcclxuXHJcbiAgICAgICAgY29uc3QgdGljayA9IHtcclxuICAgICAgICAgIGhvdXI6IGksXHJcbiAgICAgICAgICBsZWZ0OiB0aGlzLmRpYWxSYWRpdXMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICAgICAgdG9wOiB0aGlzLmRpYWxSYWRpdXMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ob3Vyc1RpY2tzLnB1c2godGljayk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gNikgKiBNYXRoLlBJO1xyXG4gICAgICAgIGNvbnN0IGlubmVyID0gaSA+IDAgJiYgaSA8IDEzO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IGlubmVyID8gdGhpcy5pbm5lclJhZGl1cyA6IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICAgICAgbGV0IGg7XHJcblxyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICBoID0gJzAnICsgaS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpY2sgPSB7XHJcbiAgICAgICAgICBob3VyOiBoLFxyXG4gICAgICAgICAgbGVmdDogdGhpcy5kaWFsUmFkaXVzICsgTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgICAgIHRvcDogdGhpcy5kaWFsUmFkaXVzIC0gTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaG91cnNUaWNrcy5wdXNoKHRpY2spO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSArPSA1KSB7XHJcbiAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gMzApICogTWF0aC5QSTtcclxuICAgICAgbGV0IG1pbiA9IGkudG9TdHJpbmcoKTtcclxuICAgICAgaWYgKGkgPCAxMCkge1xyXG4gICAgICAgIG1pbiA9ICcwJyArIGkudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0aWNrID0ge1xyXG4gICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgIGxlZnQ6IHRoaXMuZGlhbFJhZGl1cyArIE1hdGguc2luKHJhZGlhbikgKiB0aGlzLm91dGVyUmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICAgIHRvcDogdGhpcy5kaWFsUmFkaXVzIC0gTWF0aC5jb3MocmFkaWFuKSAqIHRoaXMub3V0ZXJSYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMubWludXRlc1RpY2tzLnB1c2godGljayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRIYW5kKHg6IGFueSwgeTogYW55LCByb3VuZEJ5NTogYW55KSB7XHJcbiAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuMih4LCAteSk7XHJcbiAgICBjb25zdCBpc0hvdXJzID0gdGhpcy5zaG93SG91cnM7XHJcbiAgICBjb25zdCB1bml0ID0gTWF0aC5QSSAvIChpc0hvdXJzIHx8IHJvdW5kQnk1ID8gNiA6IDMwKTtcclxuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XHJcbiAgICBjb25zdCBpbm5lciA9IGlzSG91cnMgJiYgeiA8ICh0aGlzLm91dGVyUmFkaXVzICsgdGhpcy5pbm5lclJhZGl1cykgLyAyO1xyXG4gICAgbGV0IHJhZGl1cyA9IGlubmVyID8gdGhpcy5pbm5lclJhZGl1cyA6IHRoaXMub3V0ZXJSYWRpdXM7XHJcbiAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd0hvdXJzKSB7XHJcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZEhvdXJzLmgsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkSG91cnMubSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xyXG4gICAgICByYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyYWRpYW4gPCAwKSB7XHJcbiAgICAgIHJhZGlhbiA9IE1hdGguUEkgKiAyICsgcmFkaWFuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID0gTWF0aC5yb3VuZChyYWRpYW4gLyB1bml0KTtcclxuICAgIHJhZGlhbiA9IHZhbHVlICogdW5pdDtcclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVob3VyKSB7XHJcbiAgICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IDEyO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocm91bmRCeTUpIHtcclxuICAgICAgICAgIHZhbHVlICo9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gNjApIHtcclxuICAgICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgICAgdmFsdWUgPSAhaW5uZXIgPyB2YWx1ZSArIDEyIDogdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gMjQgPyAwIDogdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSBpbm5lciAmJiB2YWx1ZSA9PT0gMCA/IDEyIDogdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSAhaW5uZXIgJiYgdmFsdWUgPT09IDEyID8gMCA6IHZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyb3VuZEJ5NSkge1xyXG4gICAgICAgICAgdmFsdWUgKj0gNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSA2MCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb2NrcGlja2VyLWNhbnZhcy1mZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHZhbHVlICUgNSA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb2NrcGlja2VyLWNhbnZhcy1mZycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Nsb2NrcGlja2VyLWNhbnZhcy1mZyBhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN4MSA9IE1hdGguc2luKHJhZGlhbikgKiAocmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzKSxcclxuICAgICAgY3kxID0gLU1hdGguY29zKHJhZGlhbikgKiAocmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzKSxcclxuICAgICAgY3gyID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcclxuICAgICAgY3kyID0gLU1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XHJcblxyXG4gICAgdGhpcy5oYW5kLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4MicsIGN4MSk7XHJcbiAgICB0aGlzLmhhbmQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3kyJywgY3kxKTtcclxuICAgIHRoaXMuYmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gyKTtcclxuICAgIHRoaXMuYmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kyKTtcclxuICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gyKTtcclxuICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kyKTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93SG91cnMpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcclxuICAgICAgICB0aGlzLnNldEhvdXIoJzAnICsgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRIb3VyKHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsdWUgPCAxMCkge1xyXG4gICAgICAgIHRoaXMuc2V0TWludXRlKCcwJyArIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0TWludXRlKHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBvZmZzZXQob2JqOiBhbnkpIHtcclxuICAgIGxldCBsZWZ0ID0gMCxcclxuICAgICAgdG9wID0gMDtcclxuXHJcbiAgICBpZiAob2JqLm9mZnNldFBhcmVudCkge1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgbGVmdCArPSBvYmoub2Zmc2V0TGVmdDtcclxuICAgICAgICB0b3AgKz0gb2JqLm9mZnNldFRvcDtcclxuICAgICAgfSB3aGlsZSAoKG9iaiA9IG9iai5vZmZzZXRQYXJlbnQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IGxlZnQsIHRvcCB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Rm9ybWF0dGVkVGltZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0aW1lQXJyID0gdmFsdWUuc3BsaXQoJzonKTtcclxuICAgIGNvbnN0IG1pbnV0ZXNWYWwgPSB0aW1lQXJyWzFdO1xyXG5cclxuICAgIGNvbnN0IGggPSB0aW1lQXJyWzBdO1xyXG4gICAgY29uc3QgbSA9IG1pbnV0ZXNWYWwuc2xpY2UoMCwgMik7XHJcbiAgICBjb25zdCBhbXBtID0gbWludXRlc1ZhbC5sZW5ndGggPiAyID8gbWludXRlc1ZhbC5zbGljZSgtMikgOiAnJztcclxuXHJcbiAgICByZXR1cm4geyBoLCBtLCBhbXBtIH07XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZUNiOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XHJcbiAgb25Ub3VjaGVkQ2I6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5zaG93SG91cnMgPSB0cnVlO1xyXG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5fZ2V0Rm9ybWF0dGVkVGltZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2V0SG91cih0aW1lLmgpO1xyXG4gICAgICB0aGlzLnNldE1pbnV0ZSh0aW1lLm0pO1xyXG4gICAgICB0aGlzLnNldEFtUG0odGltZS5hbXBtKTtcclxuXHJcbiAgICAgIHRoaXMuZW5kSG91cnMgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xlYXJUaW1lSW5wdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNiID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiID0gZm47XHJcbiAgfVxyXG59XHJcbiJdfQ==