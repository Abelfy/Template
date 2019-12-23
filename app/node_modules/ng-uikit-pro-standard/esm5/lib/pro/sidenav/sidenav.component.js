/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { window } from './../../free/utils/facade/browser';
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent(platformId, el, renderer, _cdRef) {
        this.el = el;
        this.renderer = renderer;
        this._cdRef = _cdRef;
        this.slimSidenav = false;
        this.isBrowser = false;
        this._sidenavTransform = 'translateX(-100%)';
        this.fixed = true;
        this._side = 'left';
        this.isBrowser = isPlatformBrowser(platformId);
    }
    Object.defineProperty(SidenavComponent.prototype, "side", {
        get: /**
         * @return {?}
         */
        function () {
            return this._side;
        },
        set: /**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            if (position === 'left') {
                this._sidenavTransform = 'translateX(-100%)';
                this.renderer.removeClass(this.sideNav.nativeElement, 'side-nav-right');
            }
            else {
                this._sidenavTransform = 'translateX(100%)';
                this.renderer.addClass(this.sideNav.nativeElement, 'side-nav-right');
            }
            this._side = position;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SidenavComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.sidenavBreakpoint && this.sidenavBreakpoint >= window.innerWidth) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this._side === 'right') {
            this.renderer.addClass(this.sideNav.nativeElement, 'side-nav-right');
        }
        if (this.isBrowser) {
            /** @type {?} */
            var sidenav = this.el.nativeElement;
            /** @type {?} */
            var sidenavChildren = sidenav.children[0].children;
            /** @type {?} */
            var sidenavMask = this.el.nativeElement.querySelector('.sidenav-bg');
            /** @type {?} */
            var sidenavChildrenHeight = 0;
            if (sidenavMask) {
                for (var i = 0; i < sidenavChildren.length; i++) {
                    if (sidenavChildren[i].classList.contains('sidenav-bg')) {
                        continue;
                    }
                    else {
                        for (var j = 0; j < sidenavChildren[i].children.length; j++) {
                            sidenavChildrenHeight += sidenavChildren[i].children[j].scrollHeight;
                        }
                    }
                }
                this.renderer.setStyle(sidenavMask, 'min-height', sidenavChildrenHeight + 16 + 'px');
            }
            this.windwosWidth = window.innerWidth;
            if (this.sidenavBreakpoint) {
                if (this.fixed) {
                    this.renderer.addClass(document.body, 'fixed-sn');
                    if (this.windwosWidth < +this.sidenavBreakpoint + 1) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                    }
                }
                else {
                    this.renderer.addClass(document.body, 'hidden-sn');
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                    this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                    this.setShown(false);
                }
            }
            else {
                if (this.fixed) {
                    this.renderer.addClass(document.body, 'fixed-sn');
                    if (this.windwosWidth < 1441) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                    }
                }
                else {
                    this.renderer.addClass(document.body, 'hidden-sn');
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                    this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                    this.setShown(false);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.windwosResize = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            /** @type {?} */
            var currentWidth = this.windwosWidth;
            this.windwosWidth = window.innerWidth;
            if (this.sidenavBreakpoint) {
                if (this.fixed) {
                    if (this.windwosWidth < +this.sidenavBreakpoint + 1) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                    if (this.windwosWidth > +this.sidenavBreakpoint && this.shown) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.hideOverlay();
                        this.setShown(true);
                    }
                    else if (this.windwosWidth > +this.sidenavBreakpoint) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.hideOverlay();
                        this.setShown(true);
                    }
                }
                else {
                    if (this.windwosWidth > +this.sidenavBreakpoint) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.hideOverlay();
                        this.setShown(false);
                    }
                }
            }
            else {
                if (this.fixed && this.windwosWidth !== currentWidth) {
                    if (this.windwosWidth < 1441) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                    if (this.windwosWidth > 1440 && this.shown) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.hideOverlay();
                        this.setShown(true);
                    }
                    else if (this.windwosWidth > 1440) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.hideOverlay();
                        this.setShown(true);
                    }
                }
                else {
                    if (this.windwosWidth > 1440) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.hideOverlay();
                        this.setShown(false);
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            if (this.sidenavBreakpoint) {
                if (this.fixed) {
                    if (this.windwosWidth < +this.sidenavBreakpoint + 1) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                        this.showOverlay();
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                    }
                }
                else {
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                    this.setShown(true);
                    this.showOverlay();
                }
            }
            else {
                if (this.fixed) {
                    if (this.windwosWidth < 1441) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                        this.showOverlay();
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                        this.setShown(true);
                    }
                }
                else {
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', 'translateX(0%)');
                    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0%)');
                    this.setShown(true);
                    this.showOverlay();
                }
            }
            this._cdRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            if (this.sidenavBreakpoint) {
                if (this.fixed) {
                    if (this.windwosWidth < +this.sidenavBreakpoint + 1) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                        this.hideOverlay();
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                }
                else {
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                    this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                    this.setShown(false);
                    this.hideOverlay();
                }
            }
            else {
                if (this.fixed) {
                    if (this.windwosWidth < 1441) {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                        this.hideOverlay();
                    }
                    else {
                        this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                        this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                        this.setShown(false);
                    }
                }
                else {
                    this.renderer.setStyle(this.sideNav.nativeElement, 'transform', this._sidenavTransform);
                    this.renderer.setStyle(this.el.nativeElement, 'transform', this._sidenavTransform);
                    this.setShown(false);
                    this.hideOverlay();
                }
            }
            this._cdRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.shown) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.toggleSlim = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sidenavOverlay = this.el.nativeElement.querySelector('.sidenav-bg');
        /** @type {?} */
        var linksHeading = this.el.nativeElement.querySelectorAll('mdb-accordion-item-head');
        this.slimSidenav = !this.slimSidenav;
        linksHeading.forEach((/**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            if (_this.slimSidenav) {
                _this.renderer.addClass(el, 'overflow-hidden');
            }
            else {
                _this.renderer.removeClass(el, 'overflow-hidden');
            }
        }));
        this.renderer.addClass(this.sideNav.nativeElement, 'overflow-hidden');
        if (this.slimSidenav) {
            this.renderer.addClass(this.sideNav.nativeElement, 'slim');
            this.renderer.addClass(sidenavOverlay, 'slim');
        }
        else {
            this.renderer.removeClass(this.sideNav.nativeElement, 'slim');
            this.renderer.removeClass(sidenavOverlay, 'slim');
        }
        this._cdRef.markForCheck();
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.showOverlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.overlay.nativeElement, 'display', 'block');
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.renderer.setStyle(_this.overlay.nativeElement, 'opacity', '1');
        }), 0);
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.hideOverlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.setStyle(this.overlay.nativeElement, 'opacity', '0');
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.renderer.setStyle(_this.overlay.nativeElement, 'display', 'none');
        }), 200);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SidenavComponent.prototype.setShown = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.shown = value;
        }), 510);
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (document.body.classList.contains('hidden-sn')) {
            this.renderer.removeClass(document.body, 'hidden-sn');
        }
        else if (document.body.classList.contains('fixed-sn')) {
            this.renderer.removeClass(document.body, 'fixed-sn');
        }
    };
    SidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-sidenav, mdb-side-nav',
                    template: "<ul #sidenav id=\"slide-out\" class=\"{{ class }} side-nav\">\n  <ng-content></ng-content>\n</ul>\n\n<div\n  (click)=\"hide()\"\n  (touchstart)=\"hide()\"\n  #overlay\n  id=\"sidenav-overlay\"\n  style=\"display: none;\"\n></div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.white{background-color:#fff!important}.side-nav,.side-nav .search-form .form-control,.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.sn-bg-1{background-image:url(https://mdbootstrap.com/img/Photos/Others/sidenav1.jpg)}.sn-bg-2{background-image:url(https://mdbootstrap.com/img/Photos/Others/sidenav2.jpg)}.sn-bg-3{background-image:url(https://mdbootstrap.com/img/Photos/Others/sidenav3.jpg)}.sn-bg-4{background-image:url(https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg)}.side-nav{position:fixed;width:15rem;left:0;top:0;margin:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);height:100%;background-size:cover;background-repeat:no-repeat;background-position:center;z-index:1040;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;will-change:transform;backface-visibility:hidden;list-style-type:none;padding:0;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);transition:.5s;background-color:#2c2f34;overflow-y:auto}.side-nav.wide{width:15rem;transition-property:all;transition-duration:.2s,.2s,.35s;transition-timing-function:linear,linear,ease}.side-nav.wide .logo-wrapper.sn-ad-avatar-wrapper{height:5rem;padding:19px 10px;border-bottom:1px solid rgba(255,255,255,.65)}.side-nav.wide .logo-wrapper.sn-ad-avatar-wrapper a{line-height:2.6rem;color:#fff}.side-nav.wide .logo-wrapper.sn-ad-avatar-wrapper a span{padding-left:.7rem;margin-top:-1rem}.side-nav.wide .logo-wrapper.sn-ad-avatar-wrapper a img{max-width:2.5rem;padding:0}.side-nav.wide .collapsible a{padding-left:23px;transition:.3s ease-in-out}.side-nav.wide .collapsible a .sv-normal{opacity:1;transition:.1s linear}.side-nav.wide .collapsible a .sv-slim{opacity:0;display:none;transition:.1s linear}.side-nav.wide .collapsible .sv-slim-icon{padding-left:0;width:30px;height:36px;text-align:left;margin-right:0}.side-nav.wide .collapsible-body a{padding-left:47px}.side-nav.wide .fa-angle-down.rotate-icon{opacity:1;display:block}.side-nav.wide.slim{width:3.75rem;transition-property:top,bottom,width;transition-duration:.2s,.2s,.35s;transition-timing-function:linear,linear,ease;right:3.75rem}.side-nav.wide.slim .collapsible a{padding-left:23px;transition:.3s ease-in-out}.side-nav.wide.slim .collapsible a .sv-normal{opacity:0;transition:.1s linear}.side-nav.wide.slim .collapsible a .sv-slim{display:block;opacity:1;transition:.1s linear}.side-nav.wide.slim .collapsible .sv-slim-icon{padding-left:0;width:30px;height:36px;text-align:left;margin-right:0}.side-nav.wide.slim .fa-angle-down.rotate-icon{opacity:0;display:none}.side-nav>ul{max-height:100vh}.side-nav ul{list-style:none;padding-left:0}.side-nav ul li{padding:0}.side-nav.right-aligned{right:0;left:auto;-webkit-transform:translateX(100%);transform:translateX(100%)}.side-nav.side-nav-light .logo-wrapper{border-bottom:1px solid rgba(153,153,153,.3)}.side-nav.side-nav-light .logo-wrapper.sn-ad-avatar-wrapper{color:#555}.side-nav.side-nav-light .about{border-bottom:1px solid rgba(153,153,153,.3)}.side-nav.side-nav-light .about p{color:#555}.side-nav.side-nav-light .social{border-bottom:1px solid rgba(153,153,153,.3)}.side-nav.side-nav-light .social .fab,.side-nav.side-nav-light .social .far,.side-nav.side-nav-light .social .fas{color:#555}.side-nav.side-nav-light .search-form input[type=text]{border-bottom-color:rgba(153,153,153,.3);color:#555!important}.side-nav.side-nav-light .search-form input[type=text]::-webkit-input-placeholder{color:#555!important}.side-nav.side-nav-light .search-form input[type=text]::-moz-placeholder{color:#555!important}.side-nav.side-nav-light .search-form input[type=text]::-ms-input-placeholder{color:#555!important}.side-nav.side-nav-light .search-form input[type=text]::placeholder{color:#555!important}.side-nav.side-nav-light .collapsible a{color:#555}.side-nav.side-nav-light .collapsible-body a{background-color:rgba(0,0,0,.1)}.side-nav.side-nav-light .collapsible li .collapsible-header:hover{background-color:rgba(0,0,0,.05)}.side-nav.side-nav-light .collapsible li .collapsible-header.active{color:#4285f4;background-color:transparent}.side-nav.fixed{left:0;-webkit-transform:translateX(0);transform:translateX(0);position:fixed}.side-nav.fixed.right-aligned{right:0;left:auto}@media only screen and (max-width:1440px){.side-nav.fixed{-webkit-transform:translateX(-105%);transform:translateX(-105%)}.side-nav.fixed.right-aligned{-webkit-transform:translateX(105%);transform:translateX(105%)}}.side-nav .collapsible{margin:1rem 0 0;padding:0}.side-nav .collapsible li a:hover{background-color:rgba(0,0,0,.15)}.side-nav .collapsible>li{border-radius:2px}.side-nav .collapsible>li a.collapsible-header.active,.side-nav .collapsible>li a.collapsible-header:hover{background-color:rgba(255,255,255,.15)}.side-nav .collapsible ul{padding:0;list-style-type:none}.side-nav .collapsible a{color:#fff;font-weight:300;font-size:.8rem;height:36px;line-height:36px}.side-nav .collapsible a.active,.side-nav .collapsible a:hover{border-radius:2px}.side-nav .collapsible .fab,.side-nav .collapsible .far,.side-nav .collapsible .fas{font-size:.8rem;margin-right:13px}.side-nav .collapsible-body a{padding-left:47px;height:36px;line-height:36px;background-color:rgba(0,0,0,.15)}.side-nav a{display:block;font-size:1rem;height:56px;line-height:56px;padding-left:20px}.side-nav .fa-angle-down.rotate-icon{position:absolute;right:0;top:.8rem;margin-right:1.25rem}.side-nav .sidenav-bg{top:0;bottom:0;left:0;right:0;width:15rem;z-index:-1;background-attachment:fixed;position:fixed}.side-nav .sidenav-bg:after{width:100%;display:block;content:'';position:absolute;height:100%;top:0;left:0;bottom:0;z-index:-1;margin-bottom:-99999px;padding-bottom:99999px}.side-nav .logo-wrapper{border-bottom:1px solid rgba(153,153,153,.3);height:8.75rem}.side-nav .logo-wrapper a{height:8.75rem;width:15rem;padding:0}.side-nav .logo-wrapper img{height:auto;padding:20% 50px}@media (max-height:992px){.side-nav .logo-wrapper,.side-nav .logo-wrapper a{height:80px}.side-nav .logo-wrapper img{padding-top:7%;padding-bottom:7%}}.side-nav .logo-wrapper.sn-avatar-wrapper{padding:10% 33%}.side-nav .logo-wrapper.sn-avatar-wrapper img{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin:0;padding:0;max-width:90px}@media only screen and (max-height:992px){.side-nav .logo-wrapper.sn-avatar-wrapper{padding-left:40%;padding-right:40%}.side-nav .logo-wrapper.sn-avatar-wrapper img{max-width:50px}}.side-nav .logo-wrapper.sn-ad-avatar-wrapper{height:auto;margin-bottom:0}.side-nav .logo-wrapper.sn-ad-avatar-wrapper img{max-width:3.75rem;padding:1.25rem .63rem;float:left}.side-nav .logo-wrapper.sn-ad-avatar-wrapper p{font-size:.94rem;padding-top:1.25rem;padding-bottom:1.25rem;margin:0}.side-nav .about{padding:1rem;border-bottom:1px solid rgba(255,255,255,.65)}.side-nav .about p{margin-bottom:0;text-align:center}.side-nav .social{padding-top:0;text-align:center;border-bottom:1px solid rgba(255,255,255,.65)}.side-nav .social li{display:inline-block;padding-top:.6rem;padding-bottom:.6rem;margin:0}.side-nav .social a{margin:0;padding:0}.side-nav .social .fab,.side-nav .social .far,.side-nav .social .fas{font-size:.9rem;padding-right:.6rem;padding-left:.6rem;color:#dbe4e7;transition:.3s}.side-nav .social .fab:hover,.side-nav .social .far:hover,.side-nav .social .fas:hover{color:#afc4cb;transition:.3s}.side-nav .search-form{padding:0}.side-nav .search-form input[type=text]{border-bottom:1px solid rgba(255,255,255,.65);font-weight:300;padding-left:1.88rem}.side-nav .search-form input[type=text]::-webkit-input-placeholder{color:#fff}.side-nav .search-form input[type=text]::-moz-placeholder{color:#fff}.side-nav .search-form input[type=text]::-ms-input-placeholder{color:#fff}.side-nav .search-form input[type=text]::placeholder{color:#fff}.side-nav .search-form .form-control{margin-bottom:0}.drag-target{height:100%;width:10px;position:fixed;top:0;z-index:998}#sidenav-overlay{position:fixed;top:0;left:0;right:0;height:120vh;background-color:rgba(0,0,0,.5);z-index:997;will-change:opacity;transition:.5s}.transform-fix-input{-webkit-transform:translateX(0)!important;transform:translateX(0)!important}.side-nav .sidenav-bg::after{margin-bottom:unset;padding-bottom:unset}.side-nav.side-nav-right{left:auto;right:0!important}.side-nav.side-nav-light{background-color:#e5e5e5}.side-nav.side-nav-light .collapsible .card .card-header a h5{color:#555}.side-nav.side-nav-light .collapsible .card .card-header a:hover{background-color:rgba(0,0,0,.05)}.side-nav.side-nav-light .collapsible .card.active .card-header a{background-color:transparent}.side-nav.side-nav-light .collapsible .card.active .card-header a h5,.side-nav.side-nav-light .collapsible .card.active .card-header a h5 i{color:#4285f4}.side-nav.side-nav-light .collapsible .card-body li a{color:#555;background-color:rgba(0,0,0,.1)}.side-nav.side-nav-light .collapsible .card-body li a:hover{background-color:rgba(0,0,0,.15)}.side-nav.side-nav-light a{color:#555;font-weight:400}.side-nav.side-nav-light a .fa{color:#555}.side-nav.side-nav-light input[type=text]{border-bottom-color:rgba(153,153,153,.3);color:#555!important}.side-nav.side-nav-light input[type=text]::-webkit-input-placeholder{color:#555!important}.side-nav.side-nav-light input[type=text]::-moz-placeholder{color:#555!important}.side-nav.side-nav-light input[type=text]:-ms-input-placeholder{color:#555!important}.side-nav.side-nav-light input[type=text]:-moz-placeholder{color:#555!important}.side-nav::-webkit-scrollbar{width:4px;height:4px}.side-nav::-webkit-scrollbar-button:end:increment,.side-nav::-webkit-scrollbar-button:start:decrement{display:block;height:0;background-color:transparent}.side-nav::-webkit-scrollbar-track-piece{background-color:transparent;border-radius:0 0 4px 4px}.side-nav::-webkit-scrollbar-thumb:vertical{height:50px;background-color:#999;border-radius:4px}.side-nav input[type=text]:focus:not([readonly]){border-bottom:1px solid #4285f4;box-shadow:0 1px 0 0 #4285f4}.side-nav .collapsible .no-collase .rotate-icon{display:none}.side-nav .collapsible .card{background-color:transparent;border-bottom:0!important}.side-nav .collapsible .card .card-header{padding:0!important}.side-nav .collapsible .card .card-header a{transition:.3s;height:40px;line-height:40px;border-radius:2px;padding:0}.side-nav .collapsible .card .card-header a h5{padding-left:20px;font-size:.8rem;line-height:40px;font-weight:300;position:relative;color:#fff}.side-nav .collapsible .card .card-header a .fa{font-size:.8rem;margin-right:13px;padding:0}.side-nav .collapsible .card .card-header a .rotate-icon{top:13px;margin-right:20px}.side-nav .collapsible .card.active>mdb-accordion-item-head{background:rgba(255,255,255,.15)}.side-nav .collapsible .card.active .card-header a h5{font-weight:300}.side-nav .collapsible .card-body{padding:0!important}.side-nav .collapsible .card-body li a{background-color:rgba(0,0,0,.15);font-size:.8rem;line-height:32px;height:32px;padding-left:47px;font-weight:300;color:#fff}.side-nav .collapsible .card-body li:first-of-type{border-top:0!important;margin-top:0}.side-nav.wide .slim{width:3.75rem;transition-property:top,bottom,width;transition-duration:.2s,.2s,.35s;transition-timing-function:linear,linear,ease;right:3.75rem}.side-nav.wide .slim .collapsible a{padding-left:23px;transition:.3s ease-in-out}.side-nav.wide .slim .collapsible a .sv-normal{opacity:0;transition:.1s linear}.side-nav.wide .slim .collapsible a .sv-slim{display:block;opacity:1;transition:.1s linear}.side-nav.wide .slim .collapsible .sv-slim-icon{padding-left:0;width:30px;height:36px;text-align:left;margin-right:0}.side-nav.wide .slim .fa-angle-down.rotate-icon{opacity:0;display:none}.slim .mdb-accordion-indicator{display:none}doublenavbar #sidenav-overlay,doublenavbar .side-nav{transition:.2s}doublenavbar links,doublenavbar navlinks{display:flex}header{height:0!important}@media all and (min-width:992px){.double-nav logo{display:flex;flex-direction:row;align-items:center!important;align-self:center!important;width:100%!important}.double-nav .navbar-brand img{margin-top:2px}}@media (max-width:1440px){.double-nav .button-collapse{display:block;left:10px;top:25%;font-size:1.4rem;margin-top:-2px!important;margin-right:10px;margin-left:10px}}.double-nav .button-collapse-non-fixed{left:10px;font-size:1.5rem}@media (min-width:1440px){.double-nav .button-collapse-non-fixed{display:none}}@media all and (max-width:599px){.double-nav .button-collapse-non-fixed{margin-top:-6px}}@media (max-width:1440px){.double-nav .button-collapse-non-fixed{display:block;left:10px;top:15px;font-size:1.4rem;margin-right:10px;margin-left:10px}}.double-nav .hidden-nav-button-collapse{display:block!important}@media all and (min-width:600px) and (max-width:993px){.double-nav .button-collapse-non-fixed{top:10px;margin-top:5px}.double-nav .button-collapse-non-fixed.hidden-nav>i{top:5px!important;margin-top:-5px!important}.double-nav .hidden-nav-button-collapse{top:25%;margin-top:-3px}}@media all and (min-width:994px){.double-nav .hidden-nav-button-collapse{margin-top:-3px}}.double-nav .hidden-nav{display:block;top:13px;left:10px;font-size:1.5rem;margin-left:10px}.double-nav .dropdown .dropdown-menu{margin-left:-68px;display:none;position:absolute;-webkit-transform:translate3d(6px,49px,0);transform:translate3d(6px,49px,0);top:0;left:0;will-change:transform}.double-nav .mega-menu{margin-left:0!important;left:240px!important;width:calc(100% - 240px)!important}@media (max-width:1440px){.double-nav .mega-menu{left:0!important;width:100%!important}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ie-hidden-double-nav{box-sizing:content-box;max-height:40.5px}.breadcrumbs{margin-left:25px!important;margin-top:2px}.breadcrumbs img{margin-left:20px}.ie-double-nav{position:absolute;top:30%;right:0}nav.double-nav{min-height:50px!important}.nav-link{padding-top:0!important;padding-bottom:0!important}.button-collapse,.button-collapse-non-fixed{position:absolute;top:30%!important}.hidden-nav-button-collapse{position:absolute}}@media all and (-ms-high-contrast:none) and (max-width:599px),all and (-ms-high-contrast:active) and (max-width:599px){.ie-double-nav{margin-top:-4px}.ie-hidden-double-nav .ie-double-nav{margin-top:0}.button-collapse,.button-collapse-non-fixed{top:5px!important;margin-left:0!important;margin-right:0!important}}@media all and (-ms-high-contrast:none) and (min-width:600px) and (max-width:992px),all and (-ms-high-contrast:active) and (min-width:600px) and (max-width:992px){.button-collapse-non-fixed{margin-top:-4px!important}.button-collapse{margin-top:-6px!important}.ie-double-nav{margin-top:0!important}.hidden-nav-button-collapse i{margin-top:10px!important}.breadcrumbs p{margin-top:-8px!important}}@media all and (-ms-high-contrast:none) and (min-width:993px) and (max-width:1441px),all and (-ms-high-contrast:active) and (min-width:993px) and (max-width:1441px){.button-collapse,.button-collapse-non-fixed{margin-top:-6px!important}.breadcrumbs>p{margin-top:-2px!important}.navbar-brand>img{margin-top:-2px}.breadcrumbs-non-fixed p{margin-top:2px!important}.hidden-nav-button-collapse{position:absolute!important;margin-left:10px!important}}@media all and (-ms-high-contrast:none) and (min-width:1441px),all and (-ms-high-contrast:active) and (min-width:1441px){.hidden-nav-button-collapse{position:absolute!important;margin-left:10px!important}.button-collapse-non-fixed{margin-top:-5px}.breadcrumbs>.navbar-brand img{margin-top:-2px}}@supports (-ms-ime-align:auto){.ie-hidden-double-nav{box-sizing:content-box;max-height:40.5px}.breadcrumbs{margin-left:25px!important;margin-top:2px}.breadcrumbs img{margin-left:20px}.ie-double-nav{position:absolute;top:30%;right:0}nav.double-nav{min-height:50px!important}.nav-link{padding-top:0!important;padding-bottom:0!important}.button-collapse,.button-collapse-non-fixed{position:absolute;top:30%!important}.hidden-nav-button-collapse{position:absolute}@media all and (max-width:599px){.ie-double-nav{margin-top:-4px}.ie-hidden-double-nav .ie-double-nav{margin-top:0}.button-collapse,.button-collapse-non-fixed{top:5px!important;margin-left:0!important;margin-right:0!important}}@media all and (min-width:600px) and (max-width:992px){.button-collapse-non-fixed{margin-top:-4px!important}.button-collapse{margin-top:-6px!important}.ie-double-nav{margin-top:0!important}.hidden-nav-button-collapse i{margin-top:10px!important}.breadcrumbs p{margin-top:-8px!important}}@media all and (min-width:993px) and (max-width:1441px){.button-collapse,.button-collapse-non-fixed{margin-top:-6px!important}.breadcrumbs>p{margin-top:-2px!important}.breadcrumbs>.navbar-brand>img{margin-top:-2px}.breadcrumbs-non-fixed p{margin-top:2px!important}.hidden-nav-button-collapse{position:absolute!important;margin-left:10px!important}}@media all and (min-width:1441px){.hidden-nav-button-collapse{position:absolute!important;margin-left:10px!important}.button-collapse-non-fixed{margin-top:-5px}.breadcrumbs>.navbar-brand img{margin-top:-2px}}}"]
                }] }
    ];
    /** @nocollapse */
    SidenavComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    SidenavComponent.propDecorators = {
        class: [{ type: Input }],
        fixed: [{ type: Input }],
        sidenavBreakpoint: [{ type: Input }],
        side: [{ type: Input }],
        sideNav: [{ type: ViewChild, args: ['sidenav', { static: true },] }],
        overlay: [{ type: ViewChild, args: ['overlay', { static: true },] }],
        windwosResize: [{ type: HostListener, args: ['window:resize',] }]
    };
    return SidenavComponent;
}());
export { SidenavComponent };
if (false) {
    /** @type {?} */
    SidenavComponent.prototype.windwosWidth;
    /** @type {?} */
    SidenavComponent.prototype.shown;
    /** @type {?} */
    SidenavComponent.prototype.slimSidenav;
    /** @type {?} */
    SidenavComponent.prototype.isBrowser;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._sidenavTransform;
    /** @type {?} */
    SidenavComponent.prototype.class;
    /** @type {?} */
    SidenavComponent.prototype.fixed;
    /** @type {?} */
    SidenavComponent.prototype.sidenavBreakpoint;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._side;
    /** @type {?} */
    SidenavComponent.prototype.sideNav;
    /** @type {?} */
    SidenavComponent.prototype.overlay;
    /** @type {?} */
    SidenavComponent.prototype.el;
    /** @type {?} */
    SidenavComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUUzRDtJQXVDRSwwQkFDdUIsVUFBa0IsRUFDaEMsRUFBYyxFQUNkLFFBQW1CLEVBQ2xCLE1BQXlCO1FBRjFCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBakM1QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQVEsS0FBSyxDQUFDO1FBRXRCLHNCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBR2hDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFtQnJCLFVBQUssR0FBRyxNQUFNLENBQUM7UUFVckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBM0JELHNCQUNJLGtDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFFRCxVQUFTLFFBQWdCO1lBQ3ZCLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDO2dC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QUFNLEVBQUUsSUFBSSxFQUFFOzBCQUNyQyxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQ0FxRnJDLFlBQVksU0FBQyxlQUFlOztJQWtOL0IsdUJBQUM7Q0FBQSxBQTVVRCxJQTRVQztTQXJVWSxnQkFBZ0I7OztJQUMzQix3Q0FBNEI7O0lBQzVCLGlDQUFzQjs7SUFDdEIsdUNBQTJCOztJQUMzQixxQ0FBOEI7Ozs7O0lBRTlCLDZDQUFnRDs7SUFFaEQsaUNBQThCOztJQUM5QixpQ0FBNkI7O0lBQzdCLDZDQUFnQzs7Ozs7SUFrQmhDLGlDQUF1Qjs7SUFDdkIsbUNBQW1FOztJQUNuRSxtQ0FBNEQ7O0lBSTFELDhCQUFxQjs7SUFDckIsb0NBQTBCOzs7OztJQUMxQixrQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyB3aW5kb3cgfSBmcm9tICcuLy4uLy4uL2ZyZWUvdXRpbHMvZmFjYWRlL2Jyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc2lkZW5hdiwgbWRiLXNpZGUtbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICdzaWRlbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZW5hdi1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHVibGljIHdpbmR3b3NXaWR0aDogbnVtYmVyO1xuICBwdWJsaWMgc2hvd246IGJvb2xlYW47XG4gIHB1YmxpYyBzbGltU2lkZW5hdiA9IGZhbHNlO1xuICBwdWJsaWMgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcblxuICBwcml2YXRlIF9zaWRlbmF2VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTEwMCUpJztcblxuICBASW5wdXQoKSBwdWJsaWMgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGZpeGVkID0gdHJ1ZTtcbiAgQElucHV0KCkgc2lkZW5hdkJyZWFrcG9pbnQ6IGFueTtcblxuICBASW5wdXQoKVxuICBnZXQgc2lkZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2lkZTtcbiAgfVxuXG4gIHNldCBzaWRlKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICBpZiAocG9zaXRpb24gPT09ICdsZWZ0Jykge1xuICAgICAgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0xMDAlKSc7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAnc2lkZS1uYXYtcmlnaHQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDEwMCUpJztcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICdzaWRlLW5hdi1yaWdodCcpO1xuICAgIH1cbiAgICB0aGlzLl9zaWRlID0gcG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIF9zaWRlID0gJ2xlZnQnO1xuICBAVmlld0NoaWxkKCdzaWRlbmF2JywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIHNpZGVOYXY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ292ZXJsYXknLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgb3ZlcmxheTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaWRlbmF2QnJlYWtwb2ludCAmJiB0aGlzLnNpZGVuYXZCcmVha3BvaW50ID49IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuX3NpZGUgPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICdzaWRlLW5hdi1yaWdodCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IHNpZGVuYXYgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBzaWRlbmF2Q2hpbGRyZW4gPSBzaWRlbmF2LmNoaWxkcmVuWzBdLmNoaWxkcmVuO1xuICAgICAgY29uc3Qgc2lkZW5hdk1hc2sgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVuYXYtYmcnKTtcblxuICAgICAgbGV0IHNpZGVuYXZDaGlsZHJlbkhlaWdodCA9IDA7XG5cbiAgICAgIGlmIChzaWRlbmF2TWFzaykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZGVuYXZDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzaWRlbmF2Q2hpbGRyZW5baV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlbmF2LWJnJykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpZGVuYXZDaGlsZHJlbltpXS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBzaWRlbmF2Q2hpbGRyZW5IZWlnaHQgKz0gc2lkZW5hdkNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShzaWRlbmF2TWFzaywgJ21pbi1oZWlnaHQnLCBzaWRlbmF2Q2hpbGRyZW5IZWlnaHQgKyAxNiArICdweCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLndpbmR3b3NXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgICBpZiAodGhpcy5zaWRlbmF2QnJlYWtwb2ludCkge1xuICAgICAgICBpZiAodGhpcy5maXhlZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2ZpeGVkLXNuJyk7XG5cbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPCArdGhpcy5zaWRlbmF2QnJlYWtwb2ludCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24odHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2hpZGRlbi1zbicpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5maXhlZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2ZpeGVkLXNuJyk7XG5cbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPCAxNDQxKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93bihmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdoaWRkZW4tc24nKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICB3aW5kd29zUmVzaXplKCkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgY3VycmVudFdpZHRoID0gdGhpcy53aW5kd29zV2lkdGg7XG4gICAgICB0aGlzLndpbmR3b3NXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgaWYgKHRoaXMuc2lkZW5hdkJyZWFrcG9pbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZml4ZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPCArdGhpcy5zaWRlbmF2QnJlYWtwb2ludCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPiArdGhpcy5zaWRlbmF2QnJlYWtwb2ludCAmJiB0aGlzLnNob3duKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93bih0cnVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2luZHdvc1dpZHRoID4gK3RoaXMuc2lkZW5hdkJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPiArdGhpcy5zaWRlbmF2QnJlYWtwb2ludCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZml4ZWQgJiYgdGhpcy53aW5kd29zV2lkdGggIT09IGN1cnJlbnRXaWR0aCkge1xuICAgICAgICAgIGlmICh0aGlzLndpbmR3b3NXaWR0aCA8IDE0NDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPiAxNDQwICYmIHRoaXMuc2hvd24pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy53aW5kd29zV2lkdGggPiAxNDQwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93bih0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMud2luZHdvc1dpZHRoID4gMTQ0MCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICBpZiAodGhpcy5zaWRlbmF2QnJlYWtwb2ludCkge1xuICAgICAgICBpZiAodGhpcy5maXhlZCkge1xuICAgICAgICAgIGlmICh0aGlzLndpbmR3b3NXaWR0aCA8ICt0aGlzLnNpZGVuYXZCcmVha3BvaW50ICsgMSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICB0aGlzLnNldFNob3duKHRydWUpO1xuICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZml4ZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPCAxNDQxKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCUpJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93bih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24odHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgwJSknKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKDAlKScpO1xuICAgICAgICAgIHRoaXMuc2V0U2hvd24odHJ1ZSk7XG4gICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgaWYgKHRoaXMuc2lkZW5hdkJyZWFrcG9pbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZml4ZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy53aW5kd29zV2lkdGggPCArdGhpcy5zaWRlbmF2QnJlYWtwb2ludCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICB0aGlzLnNldFNob3duKGZhbHNlKTtcbiAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmZpeGVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMud2luZHdvc1dpZHRoIDwgMTQ0MSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgdGhpcy5fc2lkZW5hdlRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTaG93bihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCB0aGlzLl9zaWRlbmF2VHJhbnNmb3JtKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIHRoaXMuX3NpZGVuYXZUcmFuc2Zvcm0pO1xuICAgICAgICAgIHRoaXMuc2V0U2hvd24oZmFsc2UpO1xuICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLnNob3duKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNsaW0oKSB7XG4gICAgY29uc3Qgc2lkZW5hdk92ZXJsYXkgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVuYXYtYmcnKTtcbiAgICBjb25zdCBsaW5rc0hlYWRpbmcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWRiLWFjY29yZGlvbi1pdGVtLWhlYWQnKTtcbiAgICB0aGlzLnNsaW1TaWRlbmF2ID0gIXRoaXMuc2xpbVNpZGVuYXY7XG5cbiAgICBsaW5rc0hlYWRpbmcuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMuc2xpbVNpZGVuYXYpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbCwgJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbCwgJ292ZXJmbG93LWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnNpZGVOYXYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LWhpZGRlbicpO1xuXG4gICAgaWYgKHRoaXMuc2xpbVNpZGVuYXYpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5zaWRlTmF2Lm5hdGl2ZUVsZW1lbnQsICdzbGltJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHNpZGVuYXZPdmVybGF5LCAnc2xpbScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuc2lkZU5hdi5uYXRpdmVFbGVtZW50LCAnc2xpbScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhzaWRlbmF2T3ZlcmxheSwgJ3NsaW0nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNob3dPdmVybGF5KCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5vdmVybGF5Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheS5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBoaWRlT3ZlcmxheSgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheS5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheS5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdub25lJyk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHNldFNob3duKHZhbHVlOiBib29sZWFuKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNob3duID0gdmFsdWU7XG4gICAgfSwgNTEwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuLXNuJykpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2hpZGRlbi1zbicpO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpeGVkLXNuJykpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2ZpeGVkLXNuJyk7XG4gICAgfVxuICB9XG59XG4iXX0=