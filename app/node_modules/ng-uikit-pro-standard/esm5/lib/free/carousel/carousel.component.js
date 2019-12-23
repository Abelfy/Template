/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';
import { isPlatformBrowser } from '@angular/common';
import { LEFT_ARROW, RIGHT_ARROW } from '../utils/keyboard-navigation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/** @enum {number} */
var Direction = {
    UNKNOWN: 0,
    NEXT: 1,
    PREV: 2,
};
export { Direction };
Direction[Direction.UNKNOWN] = 'UNKNOWN';
Direction[Direction.NEXT] = 'NEXT';
Direction[Direction.PREV] = 'PREV';
/**
 * Base element to create carousel
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(config, el, platformId, cdRef, renderer) {
        this.el = el;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this._destroy$ = new Subject();
        this.destroyed = false;
        this.animationEnd = true;
        this.isBrowser = false;
        this.isControls = true;
        this.class = '';
        this.type = '';
        this.animation = '';
        this.activeSlideChange = new EventEmitter(false);
        this.isBrowser = isPlatformBrowser(platformId);
        Object.assign(this, config);
    }
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        get: /**
         * @return {?}
         */
        function () {
            return this._slidesList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "activeSlide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentActiveSlide;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (this._slidesList && index !== this._currentActiveSlide) {
                this._select(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CarouselComponent.prototype.checkNavigation = /**
     * @return {?}
     */
    function () {
        if (this.type === 'carousel-multi-item') {
            return false;
        }
        return true;
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.checkDots = /**
     * @return {?}
     */
    function () {
        if (this.type === 'carousel-thumbnails') {
            return false;
        }
        return true;
    };
    /**
     * @param {?} slide
     * @return {?}
     */
    CarouselComponent.prototype.getImg = /**
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        return slide.el.nativeElement.querySelector('img').src;
    };
    Object.defineProperty(CarouselComponent.prototype, "interval", {
        get: /**
         * @return {?}
         */
        function () {
            return this._interval;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isBs4", {
        get: /**
         * @return {?}
         */
        function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed = true;
        this._destroy$.next();
        this._destroy$.complete();
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.play();
        this._slidesList.changes
            .pipe(takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} slidesList
         * @return {?}
         */
        function (slidesList) {
            _this._slidesList = slidesList;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._select(0);
            }), 0);
        }));
        if (this.activeSlideIndex) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._select(_this.activeSlideIndex);
                _this.activeSlideChange.emit({ relatedTarget: _this.activeSlide });
            }), 0);
        }
        else {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._select(0);
            }), 0);
        }
        if (this.isControls) {
            this.carouselIndicators = this.el.nativeElement.querySelectorAll('.carousel-indicators > li');
            if (this.carouselIndicators.length && this.activeSlideIndex) {
                this.renderer.addClass(this.carouselIndicators[this.activeSlideIndex], 'active');
            }
            else if (this.carouselIndicators.length) {
                this.renderer.addClass(this.carouselIndicators[0], 'active');
            }
        }
    };
    /**
     * @param {?=} action
     * @return {?}
     */
    CarouselComponent.prototype.swipe = /**
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.previousSlide();
            this.cdRef.markForCheck();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.nextSlide();
            this.cdRef.markForCheck();
        }
    };
    /**
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.nextSlide = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.restartTimer();
        // Start next slide, pause actual slide
        /** @type {?} */
        var videoList = this.el.nativeElement.getElementsByTagName('video');
        /** @type {?} */
        var direction = Direction.NEXT;
        /** @type {?} */
        var indexEl = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (var i = 0; i < videoList.length; i++) {
                if (i === indexEl) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Next', relatedTarget: this.activeSlide });
        }
    };
    /**
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.previousSlide = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.restartTimer();
        // Start previous slide, pause actual slide
        /** @type {?} */
        var videoList = this.el.nativeElement.getElementsByTagName('video');
        /** @type {?} */
        var direction = Direction.PREV;
        /** @type {?} */
        var indexel = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (var i = 0; i < videoList.length; i++) {
                if (i === indexel) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(direction, force), direction);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.PREV, force), Direction.PREV);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: this.activeSlide });
        }
    };
    /**
     * @protected
     * @param {?} goToIndex
     * @param {?=} direction
     * @return {?}
     */
    CarouselComponent.prototype.fadeAnimation = /**
     * @protected
     * @param {?} goToIndex
     * @param {?=} direction
     * @return {?}
     */
    function (goToIndex, direction) {
        var _this = this;
        /** @type {?} */
        var goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            this.animationEnd = false;
            goToSlide.directionNext = true;
            if (this.isBrowser) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var previous = _this.slides[_this._currentActiveSlide].el.nativeElement;
                    _this.renderer.setStyle(previous, 'opacity', '0');
                    _this.renderer.setStyle(previous, 'transition', 'all 600ms');
                    _this.renderer.setStyle(previous, 'display', 'block');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'display', 'block');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'transition', 'all 600ms');
                    if (direction === 1) {
                        _this.activeSlideChange.emit({ direction: 'Next', relatedTarget: _this.activeSlide });
                    }
                    else if (direction === 2) {
                        _this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: _this.activeSlide });
                    }
                    goToSlide.directionNext = false;
                    _this.animationEnd = true;
                    _this.activeSlide = goToIndex;
                    _this.activeSlideChange.emit({ direction: 'Next', relatedTarget: _this.activeSlide });
                    _this.play();
                    _this.cdRef.markForCheck();
                }), 0);
            }
        }
    };
    /**
     * @protected
     * @param {?} goToIndex
     * @param {?} direction
     * @return {?}
     */
    CarouselComponent.prototype.slideAnimation = /**
     * @protected
     * @param {?} goToIndex
     * @param {?} direction
     * @return {?}
     */
    function (goToIndex, direction) {
        var _this = this;
        /** @type {?} */
        var currentSlide = this.slides[this._currentActiveSlide];
        /** @type {?} */
        var goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            if (direction === Direction.NEXT) {
                this.animationEnd = false;
                goToSlide.directionNext = true;
                if (this.isBrowser) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        goToSlide.directionLeft = true;
                        currentSlide.directionLeft = true;
                        _this.cdRef.markForCheck();
                    }), 100);
                }
            }
            if (direction === Direction.PREV) {
                this.animationEnd = false;
                goToSlide.directionPrev = true;
                if (this.isBrowser) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        goToSlide.directionRight = true;
                        currentSlide.directionRight = true;
                        _this.cdRef.markForCheck();
                    }), 100);
                }
            }
            if (this.isBrowser) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    goToSlide.directionLeft = false;
                    goToSlide.directionNext = false;
                    currentSlide.directionLeft = false;
                    currentSlide.directionNext = false;
                    goToSlide.directionRight = false;
                    goToSlide.directionPrev = false;
                    currentSlide.directionRight = false;
                    currentSlide.directionPrev = false;
                    _this.animationEnd = true;
                    _this.activeSlide = goToIndex;
                    /** @type {?} */
                    var directionName;
                    if (direction === Direction.NEXT) {
                        directionName = 'Next';
                    }
                    else if (direction === Direction.PREV) {
                        directionName = 'Prev';
                    }
                    _this.activeSlideChange.emit({
                        direction: directionName,
                        relatedTarget: _this.activeSlide,
                    });
                    _this.play();
                    _this.cdRef.markForCheck();
                }), 700);
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.selectSlide = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.pause();
        if (this.animation === 'slide') {
            if (this.activeSlide < index) {
                this.slideAnimation(index, Direction.NEXT);
            }
            else if (this.activeSlide > index) {
                this.slideAnimation(index, Direction.PREV);
            }
        }
        else if (this.animation === 'fade') {
            if (index !== this.activeSlide) {
                this.fadeAnimation(index);
            }
        }
        this.play();
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.play = /**
     * @return {?}
     */
    function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
            this.cdRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.pause = /**
     * @return {?}
     */
    function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
            this.cdRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.getCurrentSlideIndex = /**
     * @return {?}
     */
    function () {
        return this.slides.findIndex((/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) { return slide.active; }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isLast = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index + 1 >= this.slides.length;
    };
    /**
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    CarouselComponent.prototype.findNextSlideIndex = /**
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    function (direction, force) {
        /** @type {?} */
        var nextSlideIndex = 0;
        if (!force && (this.isLast(this.activeSlide) && direction !== Direction.PREV && this.noWrap)) {
            return void 0;
        }
        switch (direction) {
            case Direction.NEXT:
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap
                        ? this._currentActiveSlide
                        : 0;
                break;
            case Direction.PREV:
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this.slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype._select = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        /** @type {?} */
        var currentSlide = this.slides[this._currentActiveSlide];
        if (currentSlide) {
            currentSlide.active = false;
        }
        /** @type {?} */
        var nextSlide = this.slides[index];
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
        }
        this.cdRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.restartTimer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.resetTimer();
        if (this.isBrowser) {
            /** @type {?} */
            var interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var nInterval = +_this.interval;
                    if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
                        _this.nextSlide();
                    }
                    else {
                        _this.pause();
                    }
                }), interval);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.resetTimer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = void 0;
            }
        }
    };
    /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    CarouselComponent.prototype.hasClass = /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    function (el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    };
    /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    CarouselComponent.prototype.classAdd = /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    function (el, className) {
        if (el.classList) {
            el.classList.add(className);
        }
        else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    };
    /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    CarouselComponent.prototype.removeClass = /**
     * @protected
     * @param {?} el
     * @param {?} className
     * @return {?}
     */
    function (el, className) {
        if (el.classList) {
            el.classList.remove(className);
        }
        else if (this.hasClass(el, className)) {
            /** @type {?} */
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CarouselComponent.prototype.keyboardControl = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.keyboard) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === RIGHT_ARROW) {
                this.nextSlide();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === LEFT_ARROW) {
                this.previousSlide();
            }
        }
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.el.nativeElement.focus();
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-carousel',
                    template: "<div\n  tabindex=\"0\"\n  (swipeleft)=\"swipe($event.type)\"\n  (swiperight)=\"swipe($event.type)\"\n  (mouseenter)=\"pause()\"\n  (mouseleave)=\"play()\"\n  (mouseup)=\"play()\"\n  class=\"carousel {{ class }} {{ type }}\"\n>\n  <div class=\"controls-top\" *ngIf=\"slides.length > 1 && !checkNavigation() && isControls\">\n    <a\n      mdbBtn\n      floating=\"true\"\n      [class.disabled]=\"activeSlide === 0 && noWrap\"\n      (click)=\"previousSlide()\"\n      ><i class=\"fas fa-chevron-left\"></i\n    ></a>\n    <a mdbBtn floating=\"true\" (click)=\"nextSlide()\" [class.disabled]=\"isLast(activeSlide) && noWrap\"\n      ><i class=\"fas fa-chevron-right\"></i\n    ></a>\n  </div>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    ></li>\n  </ol>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && !checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    >\n      <img class=\"d-block w-100 img-fluid\" src=\"{{ getImg(slidez) }}\" />\n    </li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  <a\n    class=\"carousel-control-prev\"\n    [class.disabled]=\"activeSlide === 0 && noWrap\"\n    (click)=\"previousSlide()\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Previous</span>\n  </a>\n  <a\n    class=\"carousel-control-next\"\n    (click)=\"nextSlide()\"\n    [class.disabled]=\"isLast(activeSlide) && noWrap\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mdb-color.lighten-5{background-color:#d0d6e2!important}.mdb-color.lighten-4{background-color:#b1bace!important}.mdb-color.lighten-3{background-color:#929fba!important}.mdb-color.lighten-2{background-color:#7283a7!important}.mdb-color.lighten-1{background-color:#59698d!important}.mdb-color{background-color:#45526e!important}.mdb-color-text{color:#45526e!important}.rgba-mdb-color-slight,.rgba-mdb-color-slight:after{background-color:rgba(69,82,110,.1)}.rgba-mdb-color-light,.rgba-mdb-color-light:after{background-color:rgba(69,82,110,.3)}.rgba-mdb-color-strong,.rgba-mdb-color-strong:after{background-color:rgba(69,82,110,.7)}.mdb-color.darken-1{background-color:#3b465e!important}.mdb-color.darken-2{background-color:#2e3951!important}.mdb-color.darken-3{background-color:#1c2a48!important}.mdb-color.darken-4{background-color:#1c2331!important}.red.lighten-5{background-color:#ffebee!important}.red.lighten-4{background-color:#ffcdd2!important}.red.lighten-3{background-color:#ef9a9a!important}.red.lighten-2{background-color:#e57373!important}.red.lighten-1{background-color:#ef5350!important}.red{background-color:#f44336!important}.red-text{color:#f44336!important}.rgba-red-slight,.rgba-red-slight:after{background-color:rgba(244,67,54,.1)}.rgba-red-light,.rgba-red-light:after{background-color:rgba(244,67,54,.3)}.rgba-red-strong,.rgba-red-strong:after{background-color:rgba(244,67,54,.7)}.red.darken-1{background-color:#e53935!important}.red.darken-2{background-color:#d32f2f!important}.red.darken-3{background-color:#c62828!important}.red.darken-4{background-color:#b71c1c!important}.red.accent-1{background-color:#ff8a80!important}.red.accent-2{background-color:#ff5252!important}.red.accent-3{background-color:#ff1744!important}.red.accent-4{background-color:#d50000!important}.pink.lighten-5{background-color:#fce4ec!important}.pink.lighten-4{background-color:#f8bbd0!important}.pink.lighten-3{background-color:#f48fb1!important}.pink.lighten-2{background-color:#f06292!important}.pink.lighten-1{background-color:#ec407a!important}.pink{background-color:#e91e63!important}.pink-text{color:#e91e63!important}.rgba-pink-slight,.rgba-pink-slight:after{background-color:rgba(233,30,99,.1)}.rgba-pink-light,.rgba-pink-light:after{background-color:rgba(233,30,99,.3)}.rgba-pink-strong,.rgba-pink-strong:after{background-color:rgba(233,30,99,.7)}.pink.darken-1{background-color:#d81b60!important}.pink.darken-2{background-color:#c2185b!important}.pink.darken-3{background-color:#ad1457!important}.pink.darken-4{background-color:#880e4f!important}.pink.accent-1{background-color:#ff80ab!important}.pink.accent-2{background-color:#ff4081!important}.pink.accent-3{background-color:#f50057!important}.pink.accent-4{background-color:#c51162!important}.purple.lighten-5{background-color:#f3e5f5!important}.purple.lighten-4{background-color:#e1bee7!important}.purple.lighten-3{background-color:#ce93d8!important}.purple.lighten-2{background-color:#ba68c8!important}.purple.lighten-1{background-color:#ab47bc!important}.purple{background-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.rgba-purple-slight,.rgba-purple-slight:after{background-color:rgba(156,39,176,.1)}.rgba-purple-light,.rgba-purple-light:after{background-color:rgba(156,39,176,.3)}.rgba-purple-strong,.rgba-purple-strong:after{background-color:rgba(156,39,176,.7)}.purple.darken-1{background-color:#8e24aa!important}.purple.darken-2{background-color:#7b1fa2!important}.purple.darken-3{background-color:#6a1b9a!important}.purple.darken-4{background-color:#4a148c!important}.purple.accent-1{background-color:#ea80fc!important}.purple.accent-2{background-color:#e040fb!important}.purple.accent-3{background-color:#d500f9!important}.purple.accent-4{background-color:#a0f!important}.deep-purple.lighten-5{background-color:#ede7f6!important}.deep-purple.lighten-4{background-color:#d1c4e9!important}.deep-purple.lighten-3{background-color:#b39ddb!important}.deep-purple.lighten-2{background-color:#9575cd!important}.deep-purple.lighten-1{background-color:#7e57c2!important}.deep-purple{background-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.rgba-deep-purple-slight,.rgba-deep-purple-slight:after{background-color:rgba(103,58,183,.1)}.rgba-deep-purple-light,.rgba-deep-purple-light:after{background-color:rgba(103,58,183,.3)}.rgba-deep-purple-strong,.rgba-deep-purple-strong:after{background-color:rgba(103,58,183,.7)}.deep-purple.darken-1{background-color:#5e35b1!important}.deep-purple.darken-2{background-color:#512da8!important}.deep-purple.darken-3{background-color:#4527a0!important}.deep-purple.darken-4{background-color:#311b92!important}.deep-purple.accent-1{background-color:#b388ff!important}.deep-purple.accent-2{background-color:#7c4dff!important}.deep-purple.accent-3{background-color:#651fff!important}.deep-purple.accent-4{background-color:#6200ea!important}.indigo.lighten-5{background-color:#e8eaf6!important}.indigo.lighten-4{background-color:#c5cae9!important}.indigo.lighten-3{background-color:#9fa8da!important}.indigo.lighten-2{background-color:#7986cb!important}.indigo.lighten-1{background-color:#5c6bc0!important}.indigo{background-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.rgba-indigo-slight,.rgba-indigo-slight:after{background-color:rgba(63,81,181,.1)}.rgba-indigo-light,.rgba-indigo-light:after{background-color:rgba(63,81,181,.3)}.rgba-indigo-strong,.rgba-indigo-strong:after{background-color:rgba(63,81,181,.7)}.indigo.darken-1{background-color:#3949ab!important}.indigo.darken-2{background-color:#303f9f!important}.indigo.darken-3{background-color:#283593!important}.indigo.darken-4{background-color:#1a237e!important}.indigo.accent-1{background-color:#8c9eff!important}.indigo.accent-2{background-color:#536dfe!important}.indigo.accent-3{background-color:#3d5afe!important}.indigo.accent-4{background-color:#304ffe!important}.blue.lighten-5{background-color:#e3f2fd!important}.blue.lighten-4{background-color:#bbdefb!important}.blue.lighten-3{background-color:#90caf9!important}.blue.lighten-2{background-color:#64b5f6!important}.blue.lighten-1{background-color:#42a5f5!important}.blue{background-color:#2196f3!important}.blue-text{color:#2196f3!important}.rgba-blue-slight,.rgba-blue-slight:after{background-color:rgba(33,150,243,.1)}.rgba-blue-light,.rgba-blue-light:after{background-color:rgba(33,150,243,.3)}.rgba-blue-strong,.rgba-blue-strong:after{background-color:rgba(33,150,243,.7)}.blue.darken-1{background-color:#1e88e5!important}.blue.darken-2{background-color:#1976d2!important}.blue.darken-3{background-color:#1565c0!important}.blue.darken-4{background-color:#0d47a1!important}.blue.accent-1{background-color:#82b1ff!important}.blue.accent-2{background-color:#448aff!important}.blue.accent-3{background-color:#2979ff!important}.blue.accent-4{background-color:#2962ff!important}.light-blue.lighten-5{background-color:#e1f5fe!important}.light-blue.lighten-4{background-color:#b3e5fc!important}.light-blue.lighten-3{background-color:#81d4fa!important}.light-blue.lighten-2{background-color:#4fc3f7!important}.light-blue.lighten-1{background-color:#29b6f6!important}.light-blue{background-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.rgba-light-blue-slight,.rgba-light-blue-slight:after{background-color:rgba(3,169,244,.1)}.rgba-light-blue-light,.rgba-light-blue-light:after{background-color:rgba(3,169,244,.3)}.rgba-light-blue-strong,.rgba-light-blue-strong:after{background-color:rgba(3,169,244,.7)}.light-blue.darken-1{background-color:#039be5!important}.light-blue.darken-2{background-color:#0288d1!important}.light-blue.darken-3{background-color:#0277bd!important}.light-blue.darken-4{background-color:#01579b!important}.light-blue.accent-1{background-color:#80d8ff!important}.light-blue.accent-2{background-color:#40c4ff!important}.light-blue.accent-3{background-color:#00b0ff!important}.light-blue.accent-4{background-color:#0091ea!important}.cyan.lighten-5{background-color:#e0f7fa!important}.cyan.lighten-4{background-color:#b2ebf2!important}.cyan.lighten-3{background-color:#80deea!important}.cyan.lighten-2{background-color:#4dd0e1!important}.cyan.lighten-1{background-color:#26c6da!important}.cyan{background-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.rgba-cyan-slight,.rgba-cyan-slight:after{background-color:rgba(0,188,212,.1)}.rgba-cyan-light,.rgba-cyan-light:after{background-color:rgba(0,188,212,.3)}.rgba-cyan-strong,.rgba-cyan-strong:after{background-color:rgba(0,188,212,.7)}.cyan.darken-1{background-color:#00acc1!important}.cyan.darken-2{background-color:#0097a7!important}.cyan.darken-3{background-color:#00838f!important}.cyan.darken-4{background-color:#006064!important}.cyan.accent-1{background-color:#84ffff!important}.cyan.accent-2{background-color:#18ffff!important}.cyan.accent-3{background-color:#00e5ff!important}.cyan.accent-4{background-color:#00b8d4!important}.teal.lighten-5{background-color:#e0f2f1!important}.teal.lighten-4{background-color:#b2dfdb!important}.teal.lighten-3{background-color:#80cbc4!important}.teal.lighten-2{background-color:#4db6ac!important}.teal.lighten-1{background-color:#26a69a!important}.teal{background-color:#009688!important}.teal-text{color:#009688!important}.rgba-teal-slight,.rgba-teal-slight:after{background-color:rgba(0,150,136,.1)}.rgba-teal-light,.rgba-teal-light:after{background-color:rgba(0,150,136,.3)}.rgba-teal-strong,.rgba-teal-strong:after{background-color:rgba(0,150,136,.7)}.teal.darken-1{background-color:#00897b!important}.teal.darken-2{background-color:#00796b!important}.teal.darken-3{background-color:#00695c!important}.teal.darken-4{background-color:#004d40!important}.teal.accent-1{background-color:#a7ffeb!important}.teal.accent-2{background-color:#64ffda!important}.teal.accent-3{background-color:#1de9b6!important}.teal.accent-4{background-color:#00bfa5!important}.green.lighten-5{background-color:#e8f5e9!important}.green.lighten-4{background-color:#c8e6c9!important}.green.lighten-3{background-color:#a5d6a7!important}.green.lighten-2{background-color:#81c784!important}.green.lighten-1{background-color:#66bb6a!important}.green{background-color:#4caf50!important}.green-text{color:#4caf50!important}.rgba-green-slight,.rgba-green-slight:after{background-color:rgba(76,175,80,.1)}.rgba-green-light,.rgba-green-light:after{background-color:rgba(76,175,80,.3)}.rgba-green-strong,.rgba-green-strong:after{background-color:rgba(76,175,80,.7)}.green.darken-1{background-color:#43a047!important}.green.darken-2{background-color:#388e3c!important}.green.darken-3{background-color:#2e7d32!important}.green.darken-4{background-color:#1b5e20!important}.green.accent-1{background-color:#b9f6ca!important}.green.accent-2{background-color:#69f0ae!important}.green.accent-3{background-color:#00e676!important}.green.accent-4{background-color:#00c853!important}.light-green.lighten-5{background-color:#f1f8e9!important}.light-green.lighten-4{background-color:#dcedc8!important}.light-green.lighten-3{background-color:#c5e1a5!important}.light-green.lighten-2{background-color:#aed581!important}.light-green.lighten-1{background-color:#9ccc65!important}.light-green{background-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.rgba-light-green-slight,.rgba-light-green-slight:after{background-color:rgba(139,195,74,.1)}.rgba-light-green-light,.rgba-light-green-light:after{background-color:rgba(139,195,74,.3)}.rgba-light-green-strong,.rgba-light-green-strong:after{background-color:rgba(139,195,74,.7)}.light-green.darken-1{background-color:#7cb342!important}.light-green.darken-2{background-color:#689f38!important}.light-green.darken-3{background-color:#558b2f!important}.light-green.darken-4{background-color:#33691e!important}.light-green.accent-1{background-color:#ccff90!important}.light-green.accent-2{background-color:#b2ff59!important}.light-green.accent-3{background-color:#76ff03!important}.light-green.accent-4{background-color:#64dd17!important}.lime.lighten-5{background-color:#f9fbe7!important}.lime.lighten-4{background-color:#f0f4c3!important}.lime.lighten-3{background-color:#e6ee9c!important}.lime.lighten-2{background-color:#dce775!important}.lime.lighten-1{background-color:#d4e157!important}.lime{background-color:#cddc39!important}.lime-text{color:#cddc39!important}.rgba-lime-slight,.rgba-lime-slight:after{background-color:rgba(205,220,57,.1)}.rgba-lime-light,.rgba-lime-light:after{background-color:rgba(205,220,57,.3)}.rgba-lime-strong,.rgba-lime-strong:after{background-color:rgba(205,220,57,.7)}.lime.darken-1{background-color:#c0ca33!important}.lime.darken-2{background-color:#afb42b!important}.lime.darken-3{background-color:#9e9d24!important}.lime.darken-4{background-color:#827717!important}.lime.accent-1{background-color:#f4ff81!important}.lime.accent-2{background-color:#eeff41!important}.lime.accent-3{background-color:#c6ff00!important}.lime.accent-4{background-color:#aeea00!important}.yellow.lighten-5{background-color:#fffde7!important}.yellow.lighten-4{background-color:#fff9c4!important}.yellow.lighten-3{background-color:#fff59d!important}.yellow.lighten-2{background-color:#fff176!important}.yellow.lighten-1{background-color:#ffee58!important}.yellow{background-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.rgba-yellow-slight,.rgba-yellow-slight:after{background-color:rgba(255,235,59,.1)}.rgba-yellow-light,.rgba-yellow-light:after{background-color:rgba(255,235,59,.3)}.rgba-yellow-strong,.rgba-yellow-strong:after{background-color:rgba(255,235,59,.7)}.yellow.darken-1{background-color:#fdd835!important}.yellow.darken-2{background-color:#fbc02d!important}.yellow.darken-3{background-color:#f9a825!important}.yellow.darken-4{background-color:#f57f17!important}.yellow.accent-1{background-color:#ffff8d!important}.yellow.accent-2{background-color:#ff0!important}.yellow.accent-3{background-color:#ffea00!important}.yellow.accent-4{background-color:#ffd600!important}.amber.lighten-5{background-color:#fff8e1!important}.amber.lighten-4{background-color:#ffecb3!important}.amber.lighten-3{background-color:#ffe082!important}.amber.lighten-2{background-color:#ffd54f!important}.amber.lighten-1{background-color:#ffca28!important}.amber{background-color:#ffc107!important}.amber-text{color:#ffc107!important}.rgba-amber-slight,.rgba-amber-slight:after{background-color:rgba(255,193,7,.1)}.rgba-amber-light,.rgba-amber-light:after{background-color:rgba(255,193,7,.3)}.rgba-amber-strong,.rgba-amber-strong:after{background-color:rgba(255,193,7,.7)}.amber.darken-1{background-color:#ffb300!important}.amber.darken-2{background-color:#ffa000!important}.amber.darken-3{background-color:#ff8f00!important}.amber.darken-4{background-color:#ff6f00!important}.amber.accent-1{background-color:#ffe57f!important}.amber.accent-2{background-color:#ffd740!important}.amber.accent-3{background-color:#ffc400!important}.amber.accent-4{background-color:#ffab00!important}.orange.lighten-5{background-color:#fff3e0!important}.orange.lighten-4{background-color:#ffe0b2!important}.orange.lighten-3{background-color:#ffcc80!important}.orange.lighten-2{background-color:#ffb74d!important}.orange.lighten-1{background-color:#ffa726!important}.orange{background-color:#ff9800!important}.orange-text{color:#ff9800!important}.rgba-orange-slight,.rgba-orange-slight:after{background-color:rgba(255,152,0,.1)}.rgba-orange-light,.rgba-orange-light:after{background-color:rgba(255,152,0,.3)}.rgba-orange-strong,.rgba-orange-strong:after{background-color:rgba(255,152,0,.7)}.orange.darken-1{background-color:#fb8c00!important}.orange.darken-2{background-color:#f57c00!important}.orange.darken-3{background-color:#ef6c00!important}.orange.darken-4{background-color:#e65100!important}.orange.accent-1{background-color:#ffd180!important}.orange.accent-2{background-color:#ffab40!important}.orange.accent-3{background-color:#ff9100!important}.orange.accent-4{background-color:#ff6d00!important}.deep-orange.lighten-5{background-color:#fbe9e7!important}.deep-orange.lighten-4{background-color:#ffccbc!important}.deep-orange.lighten-3{background-color:#ffab91!important}.deep-orange.lighten-2{background-color:#ff8a65!important}.deep-orange.lighten-1{background-color:#ff7043!important}.deep-orange{background-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.rgba-deep-orange-slight,.rgba-deep-orange-slight:after{background-color:rgba(255,87,34,.1)}.rgba-deep-orange-light,.rgba-deep-orange-light:after{background-color:rgba(255,87,34,.3)}.rgba-deep-orange-strong,.rgba-deep-orange-strong:after{background-color:rgba(255,87,34,.7)}.deep-orange.darken-1{background-color:#f4511e!important}.deep-orange.darken-2{background-color:#e64a19!important}.deep-orange.darken-3{background-color:#d84315!important}.deep-orange.darken-4{background-color:#bf360c!important}.deep-orange.accent-1{background-color:#ff9e80!important}.deep-orange.accent-2{background-color:#ff6e40!important}.deep-orange.accent-3{background-color:#ff3d00!important}.deep-orange.accent-4{background-color:#dd2c00!important}.brown.lighten-5{background-color:#efebe9!important}.brown.lighten-4{background-color:#d7ccc8!important}.brown.lighten-3{background-color:#bcaaa4!important}.brown.lighten-2{background-color:#a1887f!important}.brown.lighten-1{background-color:#8d6e63!important}.brown{background-color:#795548!important}.brown-text{color:#795548!important}.rgba-brown-slight,.rgba-brown-slight:after{background-color:rgba(121,85,72,.1)}.rgba-brown-light,.rgba-brown-light:after{background-color:rgba(121,85,72,.3)}.rgba-brown-strong,.rgba-brown-strong:after{background-color:rgba(121,85,72,.7)}.brown.darken-1{background-color:#6d4c41!important}.brown.darken-2{background-color:#5d4037!important}.brown.darken-3{background-color:#4e342e!important}.brown.darken-4{background-color:#3e2723!important}.blue-grey.lighten-5{background-color:#eceff1!important}.blue-grey.lighten-4{background-color:#cfd8dc!important}.blue-grey.lighten-3{background-color:#b0bec5!important}.blue-grey.lighten-2{background-color:#90a4ae!important}.blue-grey.lighten-1{background-color:#78909c!important}.blue-grey{background-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.rgba-blue-grey-slight,.rgba-blue-grey-slight:after{background-color:rgba(96,125,139,.1)}.rgba-blue-grey-light,.rgba-blue-grey-light:after{background-color:rgba(96,125,139,.3)}.rgba-blue-grey-strong,.rgba-blue-grey-strong:after{background-color:rgba(96,125,139,.7)}.blue-grey.darken-1{background-color:#546e7a!important}.blue-grey.darken-2{background-color:#455a64!important}.blue-grey.darken-3{background-color:#37474f!important}.blue-grey.darken-4{background-color:#263238!important}.grey.lighten-5{background-color:#fafafa!important}.grey.lighten-4{background-color:#f5f5f5!important}.grey.lighten-3{background-color:#eee!important}.grey.lighten-2{background-color:#e0e0e0!important}.grey.lighten-1{background-color:#bdbdbd!important}.grey{background-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.rgba-grey-slight,.rgba-grey-slight:after{background-color:rgba(158,158,158,.1)}.rgba-grey-light,.rgba-grey-light:after{background-color:rgba(158,158,158,.3)}.rgba-grey-strong,.rgba-grey-strong:after{background-color:rgba(158,158,158,.7)}.grey.darken-1{background-color:#757575!important}.grey.darken-2{background-color:#616161!important}.grey.darken-3{background-color:#424242!important}.grey.darken-4{background-color:#212121!important}.black{background-color:#000!important}.black-text{color:#000!important}.rgba-black-slight,.rgba-black-slight:after{background-color:rgba(0,0,0,.1)}.rgba-black-light,.rgba-black-light:after{background-color:rgba(0,0,0,.3)}.rgba-black-strong,.rgba-black-strong:after{background-color:rgba(0,0,0,.7)}.carousel-thumbnails .carousel-indicators .active,.white{background-color:#fff!important}.white-text{color:#fff!important}.rgba-white-slight,.rgba-white-slight:after{background-color:rgba(255,255,255,.1)}.rgba-white-light,.rgba-white-light:after{background-color:rgba(255,255,255,.3)}.rgba-white-strong,.rgba-white-strong:after{background-color:rgba(255,255,255,.7)}.rgba-stylish-slight{background-color:rgba(62,69,81,.1)}.rgba-stylish-light{background-color:rgba(62,69,81,.3)}.rgba-stylish-strong{background-color:rgba(62,69,81,.7)}.primary-color{background-color:#4285f4!important}.primary-color-dark{background-color:#0d47a1!important}.secondary-color{background-color:#a6c!important}.secondary-color-dark{background-color:#93c!important}.default-color{background-color:#2bbbad!important}.default-color-dark{background-color:#00695c!important}.info-color{background-color:#33b5e5!important}.info-color-dark{background-color:#09c!important}.success-color{background-color:#00c851!important}.success-color-dark{background-color:#007e33!important}.warning-color{background-color:#fb3!important}.warning-color-dark{background-color:#f80!important}.danger-color{background-color:#ff3547!important}.danger-color-dark{background-color:#c00!important}.elegant-color{background-color:#2e2e2e!important}.elegant-color-dark{background-color:#212121!important}.stylish-color{background-color:#4b515d!important}.stylish-color-dark{background-color:#3e4551!important}.unique-color{background-color:#3f729b!important}.unique-color-dark{background-color:#1c2331!important}.special-color{background-color:#37474f!important}.special-color-dark{background-color:#263238!important}.purple-gradient{background:linear-gradient(40deg,#ff6ec4,#7873f5)!important}.peach-gradient{background:linear-gradient(40deg,#ffd86f,#fc6262)!important}.aqua-gradient{background:linear-gradient(40deg,#2096ff,#05ffa3)!important}.blue-gradient{background:linear-gradient(40deg,#45cafc,#303f9f)!important}.purple-gradient-rgba{background:linear-gradient(40deg,rgba(255,110,196,.9),rgba(120,115,245,.9))!important}.peach-gradient-rgba{background:linear-gradient(40deg,rgba(255,216,111,.9),rgba(252,98,98,.9))!important}.aqua-gradient-rgba{background:linear-gradient(40deg,rgba(32,150,255,.9),rgba(5,255,163,.9))!important}.blue-gradient-rgba{background:linear-gradient(40deg,rgba(69,202,252,.9),rgba(48,63,159,.9))!important}.dark-grey-text,.dark-grey-text:focus,.dark-grey-text:hover{color:#4f4f4f!important}.hoverable{box-shadow:none;transition:.55s ease-in-out}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transition:.55s ease-in-out}.z-depth-0{box-shadow:none!important}.z-depth-1{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important}.z-depth-1-half{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)!important}.z-depth-2{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)!important}.z-depth-3{box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)!important}.z-depth-4{box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)!important}.z-depth-5{box-shadow:0 27px 24px 0 rgba(0,0,0,.2),0 40px 77px 0 rgba(0,0,0,.22)!important}.disabled,:disabled{pointer-events:none!important}a{cursor:pointer;text-decoration:none;color:#0275d8;transition:.2s ease-in-out}a:hover{text-decoration:none;color:#014c8c;transition:.2s ease-in-out}a.disabled:hover,a:disabled:hover{color:#0275d8}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}.carousel .carousel-control-next-icon,.carousel .carousel-control-prev-icon{width:2.25rem;height:2.25rem}.carousel .carousel-indicators li{width:.625rem;height:.625rem;border-radius:50%;cursor:pointer}.carousel-fade .carousel-item{opacity:0;transition-duration:.6s;transition-property:opacity}.carousel-fade .carousel-item-next.carousel-item-left,.carousel-fade .carousel-item-prev.carousel-item-right,.carousel-fade .carousel-item.active{opacity:1}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-right.active{opacity:0}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{-webkit-transform:translateX(0);transform:translateX(0)}@supports ((-webkit-transform-style:preserve-3d) or (transform-style:preserve-3d)){.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.carousel-control-next,.carousel-control-prev,.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:flex;overflow:hidden}.carousel,.carousel-multi-item,.carousel-thumbnails{outline:0}.carousel-fade .carousel-inner .carousel-item{opacity:0;transition-property:opacity}.carousel-fade .carousel-inner .active{opacity:1;transition:.6s}.carousel-fade .carousel-inner>.carousel-item.active,.carousel-fade .carousel-inner>.carousel-item.next.left,.carousel-fade .carousel-inner>.carousel-item.prev.right{opacity:1;transition:.6s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.carousel-multi-item{margin-bottom:5rem}.carousel-multi-item .carousel-inner .carousel-item.active,.carousel-multi-item .carousel-item-next,.carousel-multi-item .carousel-item-prev{display:block}.carousel-multi-item .carousel-inner.v-2 .carousel-item-next,.carousel-multi-item .carousel-inner.v-2 .carousel-item-prev,.carousel-multi-item .carousel-inner.v-2 .carousel-item.active{display:flex}.carousel-multi-item .carousel-inner.v-2 .carousel-item-next,.carousel-multi-item .carousel-inner.v-2 .carousel-item-right.active{-webkit-transform:translateX(33%);transform:translateX(33%)}.carousel-multi-item .carousel-inner.v-2 .carousel-item-left.active,.carousel-multi-item .carousel-inner.v-2 .carousel-item-prev{-webkit-transform:translateX(-33%);transform:translateX(-33%)}.carousel-multi-item .carousel-inner.v-2 .carousel-item-left,.carousel-multi-item .carousel-inner.v-2 .carousel-item-right{-webkit-transform:translateX(0);transform:translateX(0)}.carousel-multi-item .carousel-indicators li{height:1.25rem;width:1.25rem;max-width:1.25rem;background-color:#4285f4;margin-bottom:-3.75rem}.carousel-multi-item .carousel-indicators .active{height:1.56rem;width:1.56rem;max-width:1.56rem;background-color:#4285f4;border-radius:50%}.carousel-multi-item .controls-top{text-align:center;margin-bottom:1.88rem}.carousel-multi-item .controls-top .btn-floating{background:#4285f4}.carousel-multi-item .carousel-indicators{margin-bottom:-2em}.carousel-multi-item .card-cascade.narrower{margin-top:1.25rem;margin-bottom:.3rem}@media (min-width:768px){.carousel-multi-item .col-md-4{float:left;width:33.333333%;max-width:100%}}@media only screen and (max-width:992px){.carousel-multi-item .carousel-indicators li{margin-bottom:-1.88rem}}.carousel-thumbnails .carousel-indicators{white-space:nowrap;overflow-x:auto;width:initial;margin-left:initial;margin-right:initial;margin-bottom:-4.69rem;position:absolute;left:0}.carousel-thumbnails .carousel-indicators>li{width:initial;height:initial;text-indent:initial}.carousel-thumbnails .carousel-indicators>li .active img{opacity:1}.wrapper-carousel-fix .carousel-fade .active.carousel-item-left,.wrapper-carousel-fix .carousel-fade .active.carousel-item-right{transition:transform .6s;transition:transform .6s,-webkit-transform .6s;transition-property:opacity}.carousel-thumbnails{margin-bottom:5rem}.carousel-thumbnails .carousel-indicators li{height:auto;width:6.25rem;max-width:6.25rem;border:none}.carousel-thumbnails .carousel-indicators .active{height:auto;width:auto;opacity:1}.carousel-thumbnails .carousel-indicators img{max-width:6.25rem;height:auto;overflow:hidden;display:block}"]
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: CarouselConfig },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    CarouselComponent.propDecorators = {
        _slidesList: [{ type: ContentChildren, args: [SlideComponent,] }],
        noWrap: [{ type: Input }],
        noPause: [{ type: Input }],
        isControls: [{ type: Input }],
        keyboard: [{ type: Input }],
        class: [{ type: Input }],
        type: [{ type: Input }],
        animation: [{ type: Input }],
        activeSlideIndex: [{ type: Input }],
        activeSlideChange: [{ type: Output }],
        activeSlide: [{ type: Input }],
        interval: [{ type: Input }],
        play: [{ type: HostListener, args: ['mouseleave',] }],
        pause: [{ type: HostListener, args: ['mouseenter',] }],
        keyboardControl: [{ type: HostListener, args: ['keyup', ['$event'],] }],
        focus: [{ type: HostListener, args: ['click',] }]
    };
    return CarouselComponent;
}());
export { CarouselComponent };
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.SWIPE_ACTION;
    /** @type {?} */
    CarouselComponent.prototype._slidesList;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype._destroy$;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.currentInterval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.isPlaying;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.destroyed;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.animationEnd;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._currentActiveSlide;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.carouselIndicators;
    /** @type {?} */
    CarouselComponent.prototype.isBrowser;
    /** @type {?} */
    CarouselComponent.prototype.noWrap;
    /** @type {?} */
    CarouselComponent.prototype.noPause;
    /** @type {?} */
    CarouselComponent.prototype.isControls;
    /** @type {?} */
    CarouselComponent.prototype.keyboard;
    /** @type {?} */
    CarouselComponent.prototype.class;
    /** @type {?} */
    CarouselComponent.prototype.type;
    /** @type {?} */
    CarouselComponent.prototype.animation;
    /** @type {?} */
    CarouselComponent.prototype.activeSlideIndex;
    /** @type {?} */
    CarouselComponent.prototype.activeSlideChange;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._interval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7SUFHN0IsVUFBTztJQUNQLE9BQUk7SUFDSixPQUFJOzs7Ozs7Ozs7QUFNTjtJQW9GRSwyQkFDRSxNQUFzQixFQUNaLEVBQWMsRUFDSCxVQUFrQixFQUMvQixLQUF3QixFQUN4QixRQUFtQjtRQUhqQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBRWhCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFqRjdCLGlCQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxZ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QStCOzs7OztJQUMvQixzQ0FBNkI7Ozs7O0lBQzdCLHNDQUE0Qjs7Ozs7SUFFNUIseUNBQThCOzs7OztJQUM5QixnREFBc0M7Ozs7O0lBQ3RDLCtDQUFrQzs7SUFFbEMsc0NBQXVCOztJQUN2QixtQ0FBZ0M7O0lBQ2hDLG9DQUFpQzs7SUFFakMsdUNBQWtDOztJQUNsQyxxQ0FBa0M7O0lBRWxDLGtDQUFtQzs7SUFDbkMsaUNBQWtDOztJQUNsQyxzQ0FBdUM7O0lBQ3ZDLDZDQUFrQzs7SUFFbEMsOENBQXFGOzs7OztJQWFyRixzQ0FBNEI7Ozs7O0lBb0MxQiwrQkFBd0I7Ozs7O0lBRXhCLGtDQUFnQzs7Ozs7SUFDaEMscUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNCczMgfSBmcm9tICcuLi91dGlscy9uZzItYm9vdHN0cmFwLWNvbmZpZyc7XG5pbXBvcnQgeyBTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC5jb25maWcnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1cgfSBmcm9tICcuLi91dGlscy9rZXlib2FyZC1uYXZpZ2F0aW9uJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgVU5LTk9XTixcbiAgTkVYVCxcbiAgUFJFVixcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgdG8gY3JlYXRlIGNhcm91c2VsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIFNXSVBFX0FDVElPTiA9IHsgTEVGVDogJ3N3aXBlbGVmdCcsIFJJR0hUOiAnc3dpcGVyaWdodCcgfTtcblxuICBAQ29udGVudENoaWxkcmVuKFNsaWRlQ29tcG9uZW50KSBfc2xpZGVzTGlzdDogUXVlcnlMaXN0PFNsaWRlQ29tcG9uZW50PjtcbiAgcHVibGljIGdldCBzbGlkZXMoKTogU2xpZGVDb21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlc0xpc3QudG9BcnJheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50SW50ZXJ2YWw6IGFueTtcbiAgcHJvdGVjdGVkIGlzUGxheWluZzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBhbmltYXRpb25FbmQgPSB0cnVlO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRBY3RpdmVTbGlkZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgY2Fyb3VzZWxJbmRpY2F0b3JzOiBhbnk7XG5cbiAgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIG5vV3JhcDogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIG5vUGF1c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHVibGljIGlzQ29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHVibGljIGNsYXNzOiBTdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcHVibGljIHR5cGU6IFN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYW5pbWF0aW9uOiBTdHJpbmcgPSAnJztcbiAgQElucHV0KCkgYWN0aXZlU2xpZGVJbmRleDogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgYWN0aXZlU2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGFjdGl2ZVNsaWRlKGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2xpZGVzTGlzdCAmJiBpbmRleCAhPT0gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKSB7XG4gICAgICB0aGlzLl9zZWxlY3QoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWN0aXZlU2xpZGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbnRlcnZhbDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjaGVja05hdmlnYXRpb24oKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Nhcm91c2VsLW11bHRpLWl0ZW0nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNoZWNrRG90cygpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2Fyb3VzZWwtdGh1bWJuYWlscycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRJbWcoc2xpZGU6IGFueSkge1xuICAgIHJldHVybiBzbGlkZS5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgaW50ZXJ2YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWw7XG4gIH1cblxuICBwdWJsaWMgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IHZhbHVlO1xuICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNCczMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBjb25maWc6IENhcm91c2VsQ29uZmlnLFxuICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBsYXkoKTtcbiAgICB0aGlzLl9zbGlkZXNMaXN0LmNoYW5nZXNcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChzbGlkZXNMaXN0OiBRdWVyeUxpc3Q8U2xpZGVDb21wb25lbnQ+KSA9PiB7XG4gICAgICAgIHRoaXMuX3NsaWRlc0xpc3QgPSBzbGlkZXNMaXN0O1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3QoMCk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVTbGlkZUluZGV4KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2VsZWN0KHRoaXMuYWN0aXZlU2xpZGVJbmRleCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdCgwKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29udHJvbHMpIHtcbiAgICAgIHRoaXMuY2Fyb3VzZWxJbmRpY2F0b3JzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1pbmRpY2F0b3JzID4gbGknKTtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsSW5kaWNhdG9ycy5sZW5ndGggJiYgdGhpcy5hY3RpdmVTbGlkZUluZGV4KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jYXJvdXNlbEluZGljYXRvcnNbdGhpcy5hY3RpdmVTbGlkZUluZGV4XSwgJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhcm91c2VsSW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNhcm91c2VsSW5kaWNhdG9yc1swXSwgJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN3aXBlKGFjdGlvbiA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uID09PSB0aGlzLlNXSVBFX0FDVElPTi5MRUZUKSB7XG4gICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmV4dFNsaWRlKGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICAgIC8vIFN0YXJ0IG5leHQgc2xpZGUsIHBhdXNlIGFjdHVhbCBzbGlkZVxuICAgIGNvbnN0IHZpZGVvTGlzdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBEaXJlY3Rpb24uTkVYVDtcbiAgICBjb25zdCBpbmRleEVsID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uLCBmb3JjZSk7XG4gICAgaWYgKHZpZGVvTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBDaGVjayBmb3IgdmlkZW8gY2Fyb3VzZWxcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlkZW9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSBpbmRleEVsKSB7XG4gICAgICAgICAgdmlkZW9MaXN0W2ldLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWRlb0xpc3RbaV0ucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5hbmltYXRpb24gPT09ICdzbGlkZScpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIHRoaXMuc2xpZGVBbmltYXRpb24odGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLk5FWFQsIGZvcmNlKSwgRGlyZWN0aW9uLk5FWFQpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnZmFkZScpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIHRoaXMuZmFkZUFuaW1hdGlvbih0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uTkVYVCwgZm9yY2UpLCBEaXJlY3Rpb24uTkVYVCk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLk5FWFQsIGZvcmNlKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbjogJ05leHQnLCByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91c1NsaWRlKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICAgIC8vIFN0YXJ0IHByZXZpb3VzIHNsaWRlLCBwYXVzZSBhY3R1YWwgc2xpZGVcbiAgICBjb25zdCB2aWRlb0xpc3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ZpZGVvJyk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gRGlyZWN0aW9uLlBSRVY7XG4gICAgY29uc3QgaW5kZXhlbCA9IHRoaXMuZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbiwgZm9yY2UpO1xuICAgIGlmICh2aWRlb0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgLy8gQ2hlY2sgZm9yIHZpZGVvIGNhcm91c2VsXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZGVvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gaW5kZXhlbCkge1xuICAgICAgICAgIHZpZGVvTGlzdFtpXS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmlkZW9MaXN0W2ldLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb24gPT09ICdzbGlkZScpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIHRoaXMuc2xpZGVBbmltYXRpb24odGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uLCBmb3JjZSksIGRpcmVjdGlvbik7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24gPT09ICdmYWRlJykge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgdGhpcy5mYWRlQW5pbWF0aW9uKHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5QUkVWLCBmb3JjZSksIERpcmVjdGlvbi5QUkVWKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uUFJFViwgZm9yY2UpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgZGlyZWN0aW9uOiAnUHJldicsIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZhZGVBbmltYXRpb24oZ29Ub0luZGV4OiBudW1iZXIsIGRpcmVjdGlvbj86IGFueSkge1xuICAgIGNvbnN0IGdvVG9TbGlkZSA9IHRoaXMuc2xpZGVzW2dvVG9JbmRleF07XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmQpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uRW5kID0gZmFsc2U7XG5cbiAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25OZXh0ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuc2xpZGVzW3RoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZV0uZWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUocHJldmlvdXMsICdvcGFjaXR5JywgJzAnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHByZXZpb3VzLCAndHJhbnNpdGlvbicsICdhbGwgNjAwbXMnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHByZXZpb3VzLCAnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShnb1RvU2xpZGUuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGdvVG9TbGlkZS5lbC5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShnb1RvU2xpZGUuZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCAnYWxsIDYwMG1zJyk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246ICdOZXh0JywgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgZGlyZWN0aW9uOiAnUHJldicsIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbk5leHQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IGdvVG9JbmRleDtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246ICdOZXh0JywgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc2xpZGVBbmltYXRpb24oZ29Ub0luZGV4OiBudW1iZXIsIGRpcmVjdGlvbjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFNsaWRlID0gdGhpcy5zbGlkZXNbdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXTtcbiAgICBjb25zdCBnb1RvU2xpZGUgPSB0aGlzLnNsaWRlc1tnb1RvSW5kZXhdO1xuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5kKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZCA9IGZhbHNlO1xuICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTmV4dCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbkxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvbkxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kID0gZmFsc2U7XG5cbiAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvblByZXYgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25SaWdodCA9IHRydWU7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTGVmdCA9IGZhbHNlO1xuICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvbkxlZnQgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50U2xpZGUuZGlyZWN0aW9uTmV4dCA9IGZhbHNlO1xuICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25SaWdodCA9IGZhbHNlO1xuICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25QcmV2ID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvblJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvblByZXYgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRW5kID0gdHJ1ZTtcblxuICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBnb1RvSW5kZXg7XG5cbiAgICAgICAgICBsZXQgZGlyZWN0aW9uTmFtZTtcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uTmFtZSA9ICdOZXh0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbk5hbWUgPSAnUHJldic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uTmFtZSxcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgNzAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0U2xpZGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICBpZiAodGhpcy5hbmltYXRpb24gPT09ICdzbGlkZScpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlIDwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbihpbmRleCwgRGlyZWN0aW9uLk5FWFQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVNsaWRlID4gaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbihpbmRleCwgRGlyZWN0aW9uLlBSRVYpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24gPT09ICdmYWRlJykge1xuICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLmFjdGl2ZVNsaWRlKSB7XG4gICAgICAgIHRoaXMuZmFkZUFuaW1hdGlvbihpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIHBsYXkoKSB7XG4gICAgaWYgKCF0aGlzLmlzUGxheWluZykge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIHBhdXNlKCkge1xuICAgIGlmICghdGhpcy5ub1BhdXNlKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50U2xpZGVJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNsaWRlcy5maW5kSW5kZXgoKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0xhc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCArIDEgPj0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlOiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgbmV4dFNsaWRlSW5kZXggPSAwO1xuXG4gICAgaWYgKCFmb3JjZSAmJiAodGhpcy5pc0xhc3QodGhpcy5hY3RpdmVTbGlkZSkgJiYgZGlyZWN0aW9uICE9PSBEaXJlY3Rpb24uUFJFViAmJiB0aGlzLm5vV3JhcCkpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRGlyZWN0aW9uLk5FWFQ6XG4gICAgICAgIG5leHRTbGlkZUluZGV4ID0gIXRoaXMuaXNMYXN0KHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSlcbiAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSArIDFcbiAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcFxuICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXG4gICAgICAgICAgOiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGlyZWN0aW9uLlBSRVY6XG4gICAgICAgIG5leHRTbGlkZUluZGV4ID1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPiAwXG4gICAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSAtIDFcbiAgICAgICAgICAgIDogIWZvcmNlICYmIHRoaXMubm9XcmFwXG4gICAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZVxuICAgICAgICAgICAgOiB0aGlzLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkaXJlY3Rpb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaXNOYU4oaW5kZXgpKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuc2xpZGVzW3RoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZV07XG4gICAgaWYgKGN1cnJlbnRTbGlkZSkge1xuICAgICAgY3VycmVudFNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBuZXh0U2xpZGUgPSB0aGlzLnNsaWRlc1tpbmRleF07XG4gICAgaWYgKG5leHRTbGlkZSkge1xuICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICBuZXh0U2xpZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgICB9XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzdGFydFRpbWVyKCk6IGFueSB7XG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgaWYgKCFpc05hTihpbnRlcnZhbCkgJiYgaW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhaXNOYU4odGhpcy5pbnRlcnZhbCkgJiYgbkludGVydmFsID4gMCAmJiB0aGlzLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW50ZXJ2YWwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmN1cnJlbnRJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNDbGFzcyhlbDogYW55LCBjbGFzc05hbWU6IGFueSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICEhZWwuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzfCQpJykpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjbGFzc0FkZChlbDogYW55LCBjbGFzc05hbWU6IGFueSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmVDbGFzcyhlbDogYW55LCBjbGFzc05hbWU6IGFueSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbGFzc05hbWUgKyAnKFxcXFxzfCQpJyk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShyZWcsICcgJyk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKSBrZXlib2FyZENvbnRyb2woZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgZm9jdXMoKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbn1cbiJdfQ==