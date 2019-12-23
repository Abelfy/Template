/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentLoaderFactory } from '../utils/component-loader/component-loader.factory';
import { BsDropdownConfig } from './dropdown.config';
import { BsDropdownContainerComponent } from './dropdown-container.component';
import { BsDropdownState } from './dropdown.state';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { takeUntil } from 'rxjs/operators';
// tslint:disable-next-line:component-class-suffix
export class BsDropdownDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} _cis
     * @param {?} _config
     * @param {?} _state
     * @param {?} cdRef
     */
    constructor(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state, cdRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        this.cdRef = cdRef;
        this.dropupDefault = false;
        this._destroy$ = new Subject();
        this._isInlineOpen = false;
        this._subscriptions = [];
        this._isInited = false;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.shown = this._dropdown.shown;
        this.onHidden = this._dropdown.onHidden;
        this.hidden = this._dropdown.hidden;
        this.isOpenChange = this._state.isOpenChange;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
    }
    /**
     * This attribute indicates that the dropdown should be opened upwards
     * @return {?}
     */
    get isDropup() {
        if (this.dropup) {
            this._isDropupDefault = false;
            return this.dropup;
        }
        else if (this.dropupDefault) {
            this._isDropupDefault = true;
            return this.dropupDefault;
        }
        else if (this.dropupDefault && this.dropup) {
            this._isDropupDefault = false;
            return this.dropup;
        }
    }
    /**
     * Indicates that dropdown will be closed on item or document click,
     * and after pressing ESC
     * @param {?} value
     * @return {?}
     */
    set autoClose(value) {
        if (typeof value === 'boolean') {
            this._state.autoClose = value;
        }
    }
    /**
     * @return {?}
     */
    get autoClose() {
        return this._state.autoClose;
    }
    /**
     * Disables dropdown toggle and hides dropdown menu if opened
     * @param {?} value
     * @return {?}
     */
    set isDisabled(value) {
        this._isDisabled = value;
        this._state.isDisabledChange.emit(value);
        if (value) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        return this._isDisabled;
    }
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    get isOpen() {
        if (this._showInline) {
            return this._isInlineOpen;
        }
        return this._dropdown.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._showInline = !this.container;
        // attach DOM listeners
        this._dropdown.listen({
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            () => this.show()),
        });
        // toggle visibility on toggle element click
        this._state.toggleClick
            .pipe(takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.toggle(value)));
        // hide dropdown if set disabled while opened
        this._state.isDisabledChange.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            if (element === true) {
                this.hide();
            }
        }));
        // attach dropdown menu inside of dropdown
        if (this._showInline) {
            this._state.dropdownMenu.then((/**
             * @param {?} dropdownMenu
             * @return {?}
             */
            (dropdownMenu) => {
                this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            }));
        }
        this._state.isOpenChange.pipe(takeUntil(this._destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const dropdownContainer = this._elementRef.nativeElement.querySelector('.dropdown-menu');
                /** @type {?} */
                const left = dropdownContainer.getBoundingClientRect().left;
                if (dropdownContainer.classList.contains('dropdown-menu-right') &&
                    left <= dropdownContainer.clientWidth) {
                    if (left < 0) {
                        this._renderer.setStyle(dropdownContainer, 'right', left + 'px');
                    }
                    else {
                        this._renderer.setStyle(dropdownContainer, 'right', '0');
                    }
                }
            }), 0);
        }));
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    show() {
        if (this.isOpen || this.isDisabled) {
            return;
        }
        // material and dropup dropdown animation
        /** @type {?} */
        const button = this._elementRef.nativeElement.children[0];
        /** @type {?} */
        const container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        if (!container.parentNode.classList.contains('btn-group') &&
            !container.parentNode.classList.contains('dropdown') &&
            !this._isDropupDefault) {
            container.parentNode.classList.add('dropdown');
        }
        if (this.dropup && !this._isDropupDefault) {
            container.parentNode.classList.add('dropup-material');
        }
        if (button.tagName !== 'BUTTON') {
            if (button.tagName === 'A') {
                container.classList.add('a-various-dropdown');
            }
            else {
                container.classList.add('various-dropdown');
            }
        }
        else {
            if (button.classList.contains('btn-sm')) {
                container.classList.add('small-dropdown');
            }
            if (button.classList.contains('btn-md')) {
                container.classList.add('medium-dropdown');
            }
            if (button.classList.contains('btn-lg')) {
                container.classList.add('large-dropdown');
            }
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            container.classList.add('fadeInDropdown');
        }), 0);
        if (this._showInline) {
            this._isInlineOpen = true;
            if (container.parentNode.classList.contains('dropdown') ||
                container.parentNode.classList.contains('dropup-material')) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.onShown.emit(true);
                    this.shown.emit(true);
                }), 560);
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.onShown.emit(true);
                    this.shown.emit(true);
                }), 0);
            }
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu.then((/**
         * @param {?} dropdownMenu
         * @return {?}
         */
        dropdownMenu => {
            // check direction in which dropdown should be opened
            /** @type {?} */
            const _dropup = this.dropup === true || this.dropupDefault === true;
            this._state.direction = _dropup ? 'up' : 'down';
            /** @type {?} */
            const _placement = this.placement || (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement,
            });
            this._state.isOpenChange.emit(true);
        }));
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    hide() {
        if (!this.isOpen) {
            return;
        }
        /** @type {?} */
        const container = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        container.classList.remove('fadeInDropdown');
        if (container.parentNode.classList.contains('dropdown') ||
            container.parentNode.classList.contains('dropup-material')) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this._showInline) {
                    this._isInlineOpen = false;
                    this.onHidden.emit(true);
                    this.hidden.emit(true);
                    this.cdRef.markForCheck();
                }
                else {
                    this._dropdown.hide();
                }
                this._state.isOpenChange.emit(false);
            }), 560);
        }
        else {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this._showInline) {
                    this._isInlineOpen = false;
                    this.onHidden.emit(true);
                    this.hidden.emit(true);
                    this.cdRef.markForCheck();
                }
                else {
                    this._dropdown.hide();
                }
                this._state.isOpenChange.emit(false);
            }), 0);
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @param {?=} value
     * @return {?}
     */
    toggle(value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // clean up subscriptions and destroy dropdown
        this._destroy$.next();
        this._destroy$.complete();
        this._dropdown.dispose();
    }
}
BsDropdownDirective.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[mdbDropdown],[dropdown]',
                exportAs: 'bs-dropdown',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                providers: [BsDropdownState],
                styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.white{background-color:#fff!important}.dropdown .dropdown-menu .dropdown-item:active,.dropdown .dropdown-menu .dropdown-item:hover,.dropleft .dropdown-menu .dropdown-item:active,.dropleft .dropdown-menu .dropdown-item:hover,.dropright .dropdown-menu .dropdown-item:active,.dropright .dropdown-menu .dropdown-item:hover,.dropup-material .dropdown-menu .dropdown-item:active,.dropup-material .dropdown-menu .dropdown-item:hover,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.dropdown-menu .dropdown-item:active{background-color:#757575}.show>.dropdown-menu{display:block}.show>a{outline:0}.various-dropdown{-webkit-transform:translate3d(0,21px,0)!important;transform:translate3d(0,21px,0)!important}.a-various-dropdown{-webkit-transform:translate3d(0,29px,0)!important;transform:translate3d(0,29px,0)!important}.medium-dropdown{-webkit-transform:translate3d(0,36px,0)!important;transform:translate3d(0,36px,0)!important}.small-dropdown{-webkit-transform:translate3d(5px,34px,0)!important;transform:translate3d(5px,34px,0)!important}.large-dropdown{-webkit-transform:translate3d(5px,57px,0)!important;transform:translate3d(5px,57px,0)!important}.btn-group>.dropdown-menu{-webkit-transform:translate3d(0,43px,0);transform:translate3d(0,43px,0)}.dropup>.dropdown-menu{display:none;-webkit-transform:translate3d(117px,0,0)!important;transform:translate3d(117px,0,0)!important;will-change:transform}.dropup.show .dropdown-menu{display:block;opacity:0}.dropup.show .fadeInDropdown{opacity:1}.dropup-material.show .dropdown-menu{transition:.55s}.dropdown-menu{margin-top:5px;will-change:transform;display:none;position:absolute;-webkit-transform:translate3d(6px,49px,0);transform:translate3d(6px,49px,0);top:0;left:0;will-change:transform}.dropdown.show .dropdown-menu{display:block;opacity:0;transition:.55s}.dropdown.show .fadeInDropdown{opacity:1}.dropdown .dropdown-menu,.dropleft .dropdown-menu,.dropright .dropdown-menu,.dropup-material .dropdown-menu{padding:.5rem}.dropdown .dropdown-menu.dropdown-primary .dropdown-item.active,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:active,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-primary .dropdown-item.active,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:active,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropright .dropdown-menu.dropdown-primary .dropdown-item.active,.dropright .dropdown-menu.dropdown-primary .dropdown-item:active,.dropright .dropdown-menu.dropdown-primary .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item:hover{background-color:#4285f4!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-primary .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-danger .dropdown-item.active,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:active,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-danger .dropdown-item.active,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:active,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropright .dropdown-menu.dropdown-danger .dropdown-item.active,.dropright .dropdown-menu.dropdown-danger .dropdown-item:active,.dropright .dropdown-menu.dropdown-danger .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item:hover{background-color:#c00!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-danger .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-default .dropdown-item.active,.dropdown .dropdown-menu.dropdown-default .dropdown-item:active,.dropdown .dropdown-menu.dropdown-default .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-default .dropdown-item.active,.dropleft .dropdown-menu.dropdown-default .dropdown-item:active,.dropleft .dropdown-menu.dropdown-default .dropdown-item:hover,.dropright .dropdown-menu.dropdown-default .dropdown-item.active,.dropright .dropdown-menu.dropdown-default .dropdown-item:active,.dropright .dropdown-menu.dropdown-default .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-default .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-default .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-default .dropdown-item:hover{background-color:#2bbbad!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-default .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-default .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-default .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-default .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropright .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item:hover{background-color:#a6c!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-secondary .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-success .dropdown-item.active,.dropdown .dropdown-menu.dropdown-success .dropdown-item:active,.dropdown .dropdown-menu.dropdown-success .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-success .dropdown-item.active,.dropleft .dropdown-menu.dropdown-success .dropdown-item:active,.dropleft .dropdown-menu.dropdown-success .dropdown-item:hover,.dropright .dropdown-menu.dropdown-success .dropdown-item.active,.dropright .dropdown-menu.dropdown-success .dropdown-item:active,.dropright .dropdown-menu.dropdown-success .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-success .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-success .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-success .dropdown-item:hover{background-color:#00c851!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-success .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-success .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-success .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-success .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-info .dropdown-item.active,.dropdown .dropdown-menu.dropdown-info .dropdown-item:active,.dropdown .dropdown-menu.dropdown-info .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-info .dropdown-item.active,.dropleft .dropdown-menu.dropdown-info .dropdown-item:active,.dropleft .dropdown-menu.dropdown-info .dropdown-item:hover,.dropright .dropdown-menu.dropdown-info .dropdown-item.active,.dropright .dropdown-menu.dropdown-info .dropdown-item:active,.dropright .dropdown-menu.dropdown-info .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-info .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-info .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-info .dropdown-item:hover{background-color:#33b5e5!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-info .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-info .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-info .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-info .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-warning .dropdown-item.active,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:active,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-warning .dropdown-item.active,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:active,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropright .dropdown-menu.dropdown-warning .dropdown-item.active,.dropright .dropdown-menu.dropdown-warning .dropdown-item:active,.dropright .dropdown-menu.dropdown-warning .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item:hover{background-color:#fb3!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-warning .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-dark .dropdown-item.active,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:active,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-dark .dropdown-item.active,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:active,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropright .dropdown-menu.dropdown-dark .dropdown-item.active,.dropright .dropdown-menu.dropdown-dark .dropdown-item:active,.dropright .dropdown-menu.dropdown-dark .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item:hover{background-color:#2e2e2e!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-dark .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu.dropdown-ins .dropdown-item.active,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:active,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropleft .dropdown-menu.dropdown-ins .dropdown-item.active,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:active,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropright .dropdown-menu.dropdown-ins .dropdown-item.active,.dropright .dropdown-menu.dropdown-ins .dropdown-item:active,.dropright .dropdown-menu.dropdown-ins .dropdown-item:hover,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item.active,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item:active,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item:hover{background-color:#2e5e86!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.dropdown .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropdown .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropleft .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropright .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item.active.disabled,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item:active.disabled,.dropup-material .dropdown-menu.dropdown-ins .dropdown-item:hover.disabled{background-color:transparent;box-shadow:none}.dropdown .dropdown-menu .dropdown-item,.dropleft .dropdown-menu .dropdown-item,.dropright .dropdown-menu .dropdown-item,.dropup-material .dropdown-menu .dropdown-item{padding:.5rem;margin-left:0;font-size:.9rem}.dropdown .dropdown-menu .dropdown-item.disabled,.dropleft .dropdown-menu .dropdown-item.disabled,.dropright .dropdown-menu .dropdown-item.disabled,.dropup-material .dropdown-menu .dropdown-item.disabled{color:#868e96}.dropdown .dropdown-menu .dropdown-item.disabled:active,.dropdown .dropdown-menu .dropdown-item.disabled:focus,.dropdown .dropdown-menu .dropdown-item.disabled:hover,.dropleft .dropdown-menu .dropdown-item.disabled:active,.dropleft .dropdown-menu .dropdown-item.disabled:focus,.dropleft .dropdown-menu .dropdown-item.disabled:hover,.dropright .dropdown-menu .dropdown-item.disabled:active,.dropright .dropdown-menu .dropdown-item.disabled:focus,.dropright .dropdown-menu .dropdown-item.disabled:hover,.dropup-material .dropdown-menu .dropdown-item.disabled:active,.dropup-material .dropdown-menu .dropdown-item.disabled:focus,.dropup-material .dropdown-menu .dropdown-item.disabled:hover{box-shadow:none;color:#868e96!important;background-color:transparent!important}.dropdown .dropdown-menu .dropdown-item:active,.dropdown .dropdown-menu .dropdown-item:hover,.dropleft .dropdown-menu .dropdown-item:active,.dropleft .dropdown-menu .dropdown-item:hover,.dropright .dropdown-menu .dropdown-item:active,.dropright .dropdown-menu .dropdown-item:hover,.dropup-material .dropdown-menu .dropdown-item:active,.dropup-material .dropdown-menu .dropdown-item:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);background-color:#4285f4;border-radius:.125rem;transition:.1s linear}.navbar-nav .dropdown-menu-right{right:0;left:auto}.dropdown-menu.animated{-webkit-animation-duration:.55s;animation-duration:.55s;-webkit-animation-timing-function:ease;animation-timing-function:ease}"]
            }] }
];
/** @nocollapse */
BsDropdownDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory },
    { type: BsDropdownConfig },
    { type: BsDropdownState },
    { type: ChangeDetectorRef }
];
BsDropdownDirective.propDecorators = {
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    dropup: [{ type: Input }],
    dropupDefault: [{ type: Input }],
    isDropup: [{ type: HostBinding, args: ['class.dropup',] }],
    autoClose: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isOpen: [{ type: HostBinding, args: ['class.open',] }, { type: HostBinding, args: ['class.show',] }, { type: Input }],
    isOpenChange: [{ type: Output }],
    onShown: [{ type: Output }],
    shown: [{ type: Output }],
    onHidden: [{ type: Output }],
    hidden: [{ type: Output }]
};
if (false) {
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     * @type {?}
     */
    BsDropdownDirective.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     * @type {?}
     */
    BsDropdownDirective.prototype.triggers;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    BsDropdownDirective.prototype.container;
    /** @type {?} */
    BsDropdownDirective.prototype.dropup;
    /** @type {?} */
    BsDropdownDirective.prototype.dropupDefault;
    /**
     * Emits an event when isOpen change
     * @type {?}
     */
    BsDropdownDirective.prototype.isOpenChange;
    /**
     * Emits an event when the popover is shown
     * @type {?}
     */
    BsDropdownDirective.prototype.onShown;
    /** @type {?} */
    BsDropdownDirective.prototype.shown;
    /**
     * Emits an event when the popover is hidden
     * @type {?}
     */
    BsDropdownDirective.prototype.onHidden;
    /** @type {?} */
    BsDropdownDirective.prototype.hidden;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._destroy$;
    /** @type {?} */
    BsDropdownDirective.prototype._isInlineOpen;
    /** @type {?} */
    BsDropdownDirective.prototype._showInline;
    /** @type {?} */
    BsDropdownDirective.prototype._inlinedMenu;
    /** @type {?} */
    BsDropdownDirective.prototype._isDisabled;
    /** @type {?} */
    BsDropdownDirective.prototype._dropdown;
    /** @type {?} */
    BsDropdownDirective.prototype._subscriptions;
    /** @type {?} */
    BsDropdownDirective.prototype._isInited;
    /** @type {?} */
    BsDropdownDirective.prototype._isDropupDefault;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._cis;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype._state;
    /**
     * @type {?}
     * @private
     */
    BsDropdownDirective.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvZHJvcGRvd24vZHJvcGRvd24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVzNDLGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7Ozs7O0lBc0g5QixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGlCQUFtQyxFQUNuQyxJQUE0QixFQUM1QixPQUF5QixFQUN6QixNQUF1QixFQUN2QixLQUF3QjtRQU54QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsV0FBTSxH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TWpELDRDQUFzQjs7SUFDdEIsMENBQXFCOztJQUNyQiwyQ0FBdUQ7O0lBRXZELDBDQUFxQjs7SUFDckIsd0NBQXlEOztJQUN6RCw2Q0FBb0M7O0lBQ3BDLHdDQUFrQjs7SUFDbEIsK0NBQTBCOzs7OztJQUd4QiwwQ0FBK0I7Ozs7O0lBQy9CLHdDQUE0Qjs7Ozs7SUFDNUIsZ0RBQTJDOzs7OztJQUMzQyxtQ0FBb0M7Ozs7O0lBQ3BDLHNDQUFpQzs7Ozs7SUFDakMscUNBQStCOzs7OztJQUMvQixvQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuY2xhc3MnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJy4uL3V0aWxzL2NvbXBvbmVudC1sb2FkZXIvY29tcG9uZW50LWxvYWRlci5mYWN0b3J5JztcbmltcG9ydCB7IEJzRHJvcGRvd25Db25maWcgfSBmcm9tICcuL2Ryb3Bkb3duLmNvbmZpZyc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vZHJvcGRvd24uc3RhdGUnO1xuaW1wb3J0IHsgQnNDb21wb25lbnRSZWYgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2JzLWNvbXBvbmVudC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3Bkb3duLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnLi4vdXRpbHMvbmcyLWJvb3RzdHJhcC1jb25maWcnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJEcm9wZG93bl0sW2Ryb3Bkb3duXScsXG4gIGV4cG9ydEFzOiAnYnMtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnZHJvcGRvd24tbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbQnNEcm9wZG93blN0YXRlXSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIEJzRHJvcGRvd25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuICBASW5wdXQoKSBkcm9wdXA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyb3B1cERlZmF1bHQgPSBmYWxzZTtcbiAgLyoqXG4gICAqIFRoaXMgYXR0cmlidXRlIGluZGljYXRlcyB0aGF0IHRoZSBkcm9wZG93biBzaG91bGQgYmUgb3BlbmVkIHVwd2FyZHNcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZHJvcHVwJykgcHVibGljIGdldCBpc0Ryb3B1cCgpIHtcbiAgICBpZiAodGhpcy5kcm9wdXApIHtcbiAgICAgIHRoaXMuX2lzRHJvcHVwRGVmYXVsdCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMuZHJvcHVwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wdXBEZWZhdWx0KSB7XG4gICAgICB0aGlzLl9pc0Ryb3B1cERlZmF1bHQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuZHJvcHVwRGVmYXVsdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcHVwRGVmYXVsdCAmJiB0aGlzLmRyb3B1cCkge1xuICAgICAgdGhpcy5faXNEcm9wdXBEZWZhdWx0ID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5kcm9wdXA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHdpbGwgYmUgY2xvc2VkIG9uIGl0ZW0gb3IgZG9jdW1lbnQgY2xpY2ssXG4gICAqIGFuZCBhZnRlciBwcmVzc2luZyBFU0NcbiAgICovXG4gIEBJbnB1dCgpIHNldCBhdXRvQ2xvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuX3N0YXRlLmF1dG9DbG9zZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdXRvQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLmF1dG9DbG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyBkcm9wZG93biB0b2dnbGUgYW5kIGhpZGVzIGRyb3Bkb3duIG1lbnUgaWYgb3BlbmVkXG4gICAqL1xuICBASW5wdXQoKSBzZXQgaXNEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB0aGlzLl9zdGF0ZS5pc0Rpc2FibGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpXG4gIEBJbnB1dCgpXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc0lubGluZU9wZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kcm9wZG93bi5pc1Nob3duO1xuICB9XG5cbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGlzT3BlbiBjaGFuZ2VcbiAgICovXG4gIEBPdXRwdXQoKSBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25TaG93bjogRXZlbnRFbWl0dGVyPGFueT47XG4gIEBPdXRwdXQoKSBzaG93bjogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBAT3V0cHV0KCkgaGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBwcml2YXRlIF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNCczMoKTtcbiAgfVxuXG4gIF9pc0lubGluZU9wZW4gPSBmYWxzZTtcbiAgX3Nob3dJbmxpbmU6IGJvb2xlYW47XG4gIF9pbmxpbmVkTWVudTogRW1iZWRkZWRWaWV3UmVmPEJzRHJvcGRvd25NZW51RGlyZWN0aXZlPjtcblxuICBfaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgX2Ryb3Bkb3duOiBDb21wb25lbnRMb2FkZXI8QnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudD47XG4gIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBfaXNJbml0ZWQgPSBmYWxzZTtcbiAgX2lzRHJvcHVwRGVmYXVsdDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9jaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnksXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCc0Ryb3Bkb3duQ29uZmlnLFxuICAgIHByaXZhdGUgX3N0YXRlOiBCc0Ryb3Bkb3duU3RhdGUsXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgLy8gY3JlYXRlIGRyb3Bkb3duIGNvbXBvbmVudCBsb2FkZXJcbiAgICB0aGlzLl9kcm9wZG93biA9IHRoaXMuX2Npc1xuICAgICAgLmNyZWF0ZUxvYWRlcjxCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50PihcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZixcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJcbiAgICAgIClcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogQnNEcm9wZG93blN0YXRlLCB1c2VWYWx1ZTogdGhpcy5fc3RhdGUgfSk7XG5cbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl9kcm9wZG93bi5vblNob3duO1xuICAgIHRoaXMuc2hvd24gPSB0aGlzLl9kcm9wZG93bi5zaG93bjtcbiAgICB0aGlzLm9uSGlkZGVuID0gdGhpcy5fZHJvcGRvd24ub25IaWRkZW47XG4gICAgdGhpcy5oaWRkZW4gPSB0aGlzLl9kcm9wZG93bi5oaWRkZW47XG4gICAgdGhpcy5pc09wZW5DaGFuZ2UgPSB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2U7XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBkcm9wZG93biBzdGF0ZSBmcm9tIGNvbmZpZ1xuICAgIHRoaXMuX3N0YXRlLmF1dG9DbG9zZSA9IHRoaXMuX2NvbmZpZy5hdXRvQ2xvc2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBmaXg6IHNlZW1zIHRoZXJlIGFyZSBhbiBpc3N1ZSB3aXRoIGByb3V0ZXJMaW5rQWN0aXZlYFxuICAgIC8vIHdoaWNoIHJlc3VsdCBpbiBkdXBsaWNhdGVkIGNhbGwgbmdPbkluaXQgd2l0aG91dCBjYWxsIHRvIG5nT25EZXN0cm95XG4gICAgLy8gcmVhZCBtb3JlOiBodHRwczovL2dpdGh1Yi5jb20vdmFsb3Itc29mdHdhcmUvbmd4LWJvb3RzdHJhcC9pc3N1ZXMvMTg4NVxuICAgIGlmICh0aGlzLl9pc0luaXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0luaXRlZCA9IHRydWU7XG5cbiAgICB0aGlzLl9zaG93SW5saW5lID0gIXRoaXMuY29udGFpbmVyO1xuXG4gICAgLy8gYXR0YWNoIERPTSBsaXN0ZW5lcnNcbiAgICB0aGlzLl9kcm9wZG93bi5saXN0ZW4oe1xuICAgICAgdHJpZ2dlcnM6IHRoaXMudHJpZ2dlcnMsXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKSxcbiAgICB9KTtcblxuICAgIC8vIHRvZ2dsZSB2aXNpYmlsaXR5IG9uIHRvZ2dsZSBlbGVtZW50IGNsaWNrXG4gICAgdGhpcy5fc3RhdGUudG9nZ2xlQ2xpY2tcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4gdGhpcy50b2dnbGUodmFsdWUpKTtcblxuICAgIC8vIGhpZGUgZHJvcGRvd24gaWYgc2V0IGRpc2FibGVkIHdoaWxlIG9wZW5lZFxuICAgIHRoaXMuX3N0YXRlLmlzRGlzYWJsZWRDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBhdHRhY2ggZHJvcGRvd24gbWVudSBpbnNpZGUgb2YgZHJvcGRvd25cbiAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgdGhpcy5fc3RhdGUuZHJvcGRvd25NZW51LnRoZW4oKGRyb3Bkb3duTWVudTogQnNDb21wb25lbnRSZWY8QnNEcm9wZG93bk1lbnVEaXJlY3RpdmU+KSA9PiB7XG4gICAgICAgIHRoaXMuX2lubGluZWRNZW51ID0gZHJvcGRvd25NZW51LnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGRyb3Bkb3duTWVudS50ZW1wbGF0ZVJlZik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBkcm9wZG93bkNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLW1lbnUtcmlnaHQnKSAmJlxuICAgICAgICAgIGxlZnQgPD0gZHJvcGRvd25Db250YWluZXIuY2xpZW50V2lkdGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGxlZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93bkNvbnRhaW5lciwgJ3JpZ2h0JywgbGVmdCArICdweCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93bkNvbnRhaW5lciwgJ3JpZ2h0JywgJzAnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXG4gICAqIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIG1hdGVyaWFsIGFuZCBkcm9wdXAgZHJvcGRvd24gYW5pbWF0aW9uXG5cbiAgICBjb25zdCBidXR0b24gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG5cbiAgICBpZiAoXG4gICAgICAhY29udGFpbmVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4tZ3JvdXAnKSAmJlxuICAgICAgIWNvbnRhaW5lci5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24nKSAmJlxuICAgICAgIXRoaXMuX2lzRHJvcHVwRGVmYXVsdFxuICAgICkge1xuICAgICAgY29udGFpbmVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZHJvcHVwICYmICF0aGlzLl9pc0Ryb3B1cERlZmF1bHQpIHtcbiAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2Ryb3B1cC1tYXRlcmlhbCcpO1xuICAgIH1cbiAgICBpZiAoYnV0dG9uLnRhZ05hbWUgIT09ICdCVVRUT04nKSB7XG4gICAgICBpZiAoYnV0dG9uLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYS12YXJpb3VzLWRyb3Bkb3duJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFyaW91cy1kcm9wZG93bicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYnRuLXNtJykpIHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NtYWxsLWRyb3Bkb3duJyk7XG4gICAgICB9XG4gICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYnRuLW1kJykpIHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1kcm9wZG93bicpO1xuICAgICAgfVxuICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bi1sZycpKSB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsYXJnZS1kcm9wZG93bicpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmYWRlSW5Ecm9wZG93bicpO1xuICAgIH0sIDApO1xuXG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcbiAgICAgIHRoaXMuX2lzSW5saW5lT3BlbiA9IHRydWU7XG4gICAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24nKSB8fFxuICAgICAgICBjb250YWluZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B1cC1tYXRlcmlhbCcpXG4gICAgICApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vblNob3duLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5zaG93bi5lbWl0KHRydWUpO1xuICAgICAgICB9LCA1NjApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vblNob3duLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5zaG93bi5lbWl0KHRydWUpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXRlLmRyb3Bkb3duTWVudS50aGVuKGRyb3Bkb3duTWVudSA9PiB7XG4gICAgICAvLyBjaGVjayBkaXJlY3Rpb24gaW4gd2hpY2ggZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZFxuICAgICAgY29uc3QgX2Ryb3B1cCA9IHRoaXMuZHJvcHVwID09PSB0cnVlIHx8IHRoaXMuZHJvcHVwRGVmYXVsdCA9PT0gdHJ1ZTtcblxuICAgICAgdGhpcy5fc3RhdGUuZGlyZWN0aW9uID0gX2Ryb3B1cCA/ICd1cCcgOiAnZG93bic7XG4gICAgICBjb25zdCBfcGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQgfHwgKF9kcm9wdXAgPyAndG9wIGxlZnQnIDogJ2JvdHRvbSBsZWZ0Jyk7XG5cbiAgICAgIC8vIHNob3cgZHJvcGRvd25cbiAgICAgIHRoaXMuX2Ryb3Bkb3duXG4gICAgICAgIC5hdHRhY2goQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudClcbiAgICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxuICAgICAgICAucG9zaXRpb24oeyBhdHRhY2htZW50OiBfcGxhY2VtZW50IH0pXG4gICAgICAgIC5zaG93KHtcbiAgICAgICAgICBjb250ZW50OiBkcm9wZG93bk1lbnUudGVtcGxhdGVSZWYsXG4gICAgICAgICAgcGxhY2VtZW50OiBfcGxhY2VtZW50LFxuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXG4gICAqIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XG5cbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZUluRHJvcGRvd24nKTtcbiAgICBpZiAoXG4gICAgICBjb250YWluZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duJykgfHxcbiAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwLW1hdGVyaWFsJylcbiAgICApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fc2hvd0lubGluZSkge1xuICAgICAgICAgIHRoaXMuX2lzSW5saW5lT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLmhpZGRlbi5lbWl0KHRydWUpO1xuICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZHJvcGRvd24uaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfSwgNTYwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9zaG93SW5saW5lKSB7XG4gICAgICAgICAgdGhpcy5faXNJbmxpbmVPcGVuID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRydWUpO1xuICAgICAgICAgIHRoaXMuaGlkZGVuLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kcm9wZG93bi5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxuICAgKiB0aGUgcG9wb3Zlci5cbiAgICovXG4gIHRvZ2dsZSh2YWx1ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgZGVzdHJveSBkcm9wZG93blxuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Ryb3Bkb3duLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19