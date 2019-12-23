/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { document, navigator, window } from '../utils/facade/browser';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent } from './modalBackdrop.component';
import { ClassName, DISMISS_REASONS, modalConfigDefaults } from './modal.options';
import { ComponentLoaderFactory } from '../utils/component-loader/component-loader.factory';
/** @type {?} */
const TRANSITION_DURATION = 300;
/** @type {?} */
const BACKDROP_TRANSITION_DURATION = 150;
/**
 * Mark any code with directive to show it's content in modal
 */
// tslint:disable-next-line:component-class-suffix
export class ModalDirective {
    /**
     * @param {?} _element
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} clf
     */
    constructor(_element, _viewContainerRef, _renderer, clf) {
        this._element = _element;
        this._renderer = _renderer;
        /**
         * This event fires immediately when the `show` instance method is called.
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onShow = new EventEmitter();
        this.open = new EventEmitter();
        /**
         * This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onShown = new EventEmitter();
        this.opened = new EventEmitter();
        /**
         * This event is fired immediately when the hide instance method has been called.
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onHide = new EventEmitter();
        this.close = new EventEmitter();
        /**
         * This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onHidden = new EventEmitter();
        this.closed = new EventEmitter();
        // seems like an Options
        this.isAnimated = true;
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this.utils = new Utils();
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    }
    /**
     * allows to set modal configuration via element property
     * @param {?} conf
     * @return {?}
     */
    set config(conf) {
        this._config = this.getConfig(conf);
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @return {?}
     */
    get isShown() {
        return this._isShown;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        this.utils.focusTrapModal(event, this._element);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    }
    // todo: consider preventing default and stopping propagation
    /**
     * @return {?}
     */
    onEsc() {
        if (this.config.keyboard) {
            this.dismissReason = DISMISS_REASONS.ESC;
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._config = this._config || this.getConfig();
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this._config.show) {
                this.show();
            }
        }), 0);
    }
    /* Public methods */
    /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    toggle() {
        return this._isShown ? this.hide() : this.show();
    }
    /**
     * Allows to manually open modal
     * @return {?}
     */
    show() {
        this.dismissReason = null;
        this.onShow.emit(this);
        this.open.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (document && document.body) {
            if (document.body.classList.contains(ClassName.OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.addClass(document.body, ClassName.OPEN);
            }
        }
        this.showBackdrop((/**
         * @return {?}
         */
        () => {
            this.showElement();
        }));
        if (!this.config.backdrop && this.config.ignoreBackdropClick) {
            this._renderer.setStyle(this._element.nativeElement, 'position', 'fixed');
            if (navigator.userAgent.indexOf('Safari') !== -1 &&
                navigator.userAgent.indexOf('Chrome') === -1) {
                this._renderer.setStyle(this._element.nativeElement, 'overflow', 'unset');
                this._renderer.setStyle(this._element.nativeElement, 'overflow-y', 'unset');
                this._renderer.setStyle(this._element.nativeElement, 'overflow-x', 'unset');
            }
        }
    }
    /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    hide(event) {
        if (event) {
            event.preventDefault();
        }
        // fix(modal): resolved problem with not pausing iframe/video when closing modal
        /** @type {?} */
        const iframeElements = Array.from(this._element.nativeElement.querySelectorAll('iframe'));
        /** @type {?} */
        const videoElements = Array.from(this._element.nativeElement.querySelectorAll('video'));
        iframeElements.forEach((/**
         * @param {?} iframe
         * @return {?}
         */
        (iframe) => {
            /** @type {?} */
            const srcAttribute = iframe.getAttribute('src');
            this._renderer.setAttribute(iframe, 'src', srcAttribute);
        }));
        videoElements.forEach((/**
         * @param {?} video
         * @return {?}
         */
        (video) => {
            video.pause();
        }));
        this.onHide.emit(this);
        this.close.emit(this);
        if (!this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.removeClass(this._element.nativeElement, ClassName.IN);
        if (!isBs3()) {
            this._renderer.removeClass(this._element.nativeElement, ClassName.SHOW);
        }
        if (this.isAnimated) {
            this.timerHideModal = setTimeout((/**
             * @return {?}
             */
            () => this.hideModal()), TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    }
    /**
     * Private methods \@internal
     * @protected
     * @param {?=} config
     * @return {?}
     */
    getConfig(config) {
        return Object.assign({}, modalConfigDefaults, config);
    }
    /**
     *  Show dialog
     * \@internal
     * @protected
     * @return {?}
     */
    showElement() {
        if (!this._element.nativeElement.parentNode ||
            this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            if (document && document.body) {
                document.body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this.isAnimated) {
            Utils.reflow(this._element.nativeElement);
        }
        this._renderer.addClass(this._element.nativeElement, ClassName.IN);
        if (!isBs3()) {
            this._renderer.addClass(this._element.nativeElement, ClassName.SHOW);
        }
        /** @type {?} */
        const transitionComplete = (/**
         * @return {?}
         */
        () => {
            if (this._config.focus) {
                this._element.nativeElement.focus();
            }
            this.onShown.emit(this);
            this.opened.emit(this);
        });
        if (this.isAnimated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    hideModal() {
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop((/**
         * @return {?}
         */
        () => {
            if (!this.isNested) {
                if (document && document.body) {
                    this._renderer.removeClass(document.body, ClassName.OPEN);
                }
            }
            this.resetAdjustments();
            this.focusOtherModal();
            this.onHidden.emit(this);
            this.closed.emit(this);
        }));
    }
    /**
     * \@internal
     * @protected
     * @param {?=} callback
     * @return {?}
     */
    showBackdrop(callback) {
        if (this._isShown &&
            this.config.backdrop &&
            (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(ModalBackdropComponent)
                .to('body')
                .show({ isAnimated: this.isAnimated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this.isAnimated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            /** @type {?} */
            const callbackRemove = (/**
             * @return {?}
             */
            () => {
                this.removeBackdrop();
                if (callback) {
                    callback();
                }
            });
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    removeBackdrop() {
        this._backdrop.hide();
    }
    /**
     * @protected
     * @return {?}
     */
    focusOtherModal() {
        try {
            /** @type {?} */
            const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[mdbModal]');
            if (!otherOpenedModals.length) {
                return;
            }
            otherOpenedModals[otherOpenedModals.length - 1].nativeElement.focus();
        }
        catch (error) { }
    }
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    resetAdjustments() {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    }
    /** Scroll bar tricks */
    /**
     * \@internal
     * @protected
     * @return {?}
     */
    checkScrollbar() {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    }
    /**
     * @protected
     * @return {?}
     */
    setScrollbar() {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right') || 0, 10);
    }
    // thx d.walsh
    /**
     * @protected
     * @return {?}
     */
    getScrollbarWidth() {
        /** @type {?} */
        const scrollDiv = this._renderer.createElement('div', void 0);
        this._renderer.appendChild(document.body, scrollDiv);
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        /** @type {?} */
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    }
}
ModalDirective.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[mdbModal]',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mdb-modal, mdbModal',
                styles: [".img-fluid,.modal-dialog.cascading-modal.modal-avatar .modal-header,.video-fluid{max-width:100%;height:auto}.flex-center{display:flex;justify-content:center;align-items:center;height:100%}.flex-center p{margin:0}.flex-center ul{text-align:center}.flex-center ul li{margin-bottom:1rem}.flex-center ul li:last-of-type{margin-bottom:0}.hr-light{border-top:1px solid #fff}.hr-dark{border-top:1px solid #666}.w-responsive{width:75%}@media (max-width:740px){.w-responsive{width:100%}}.collapsible-body{display:none}.jumbotron{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border-radius:.125rem;background-color:#fff}.bg-primary{background-color:#4285f4!important}a.bg-primary:focus,a.bg-primary:hover,button.bg-primary:focus,button.bg-primary:hover{background-color:#1266f1!important}.border-primary{border-color:#4285f4!important}.bg-danger{background-color:#ff3547!important}a.bg-danger:focus,a.bg-danger:hover,button.bg-danger:focus,button.bg-danger:hover{background-color:#ff0219!important}.border-danger{border-color:#ff3547!important}.bg-warning{background-color:#fb3!important}a.bg-warning:focus,a.bg-warning:hover,button.bg-warning:focus,button.bg-warning:hover{background-color:#fa0!important}.border-warning{border-color:#fb3!important}.bg-success{background-color:#00c851!important}a.bg-success:focus,a.bg-success:hover,button.bg-success:focus,button.bg-success:hover{background-color:#00953c!important}.border-success{border-color:#00c851!important}.bg-info{background-color:#33b5e5!important}a.bg-info:focus,a.bg-info:hover,button.bg-info:focus,button.bg-info:hover{background-color:#1a9bcb!important}.border-info{border-color:#33b5e5!important}.bg-default{background-color:#2bbbad!important}a.bg-default:focus,a.bg-default:hover,button.bg-default:focus,button.bg-default:hover{background-color:#219287!important}.border-default{border-color:#2bbbad!important}.bg-secondary{background-color:#a6c!important}a.bg-secondary:focus,a.bg-secondary:hover,button.bg-secondary:focus,button.bg-secondary:hover{background-color:#9540bf!important}.border-secondary{border-color:#a6c!important}.bg-dark{background-color:#212121!important}a.bg-dark:focus,a.bg-dark:hover,button.bg-dark:focus,button.bg-dark:hover{background-color:#080808!important}.border-dark{border-color:#212121!important}.bg-light{background-color:#e0e0e0!important}a.bg-light:focus,a.bg-light:hover,button.bg-light:focus,button.bg-light:hover{background-color:#c7c7c7!important}.border-light{border-color:#e0e0e0!important}.card-img-100{width:100px;height:100px}.card-img-64{width:64px;height:64px}.mml-1{margin-left:-.25rem!important}.flex-1{flex:1}body.modal-open{overflow:auto}.modal-dialog .modal-content .modal-header{border-top-left-radius:.125rem;border-top-right-radius:.125rem}.modal-dialog.cascading-modal .close{opacity:1;text-shadow:none;color:#fff;outline:0}.modal-dialog.cascading-modal .modal-header{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem}.modal-dialog.cascading-modal .modal-header .title .fab,.modal-dialog.cascading-modal .modal-header .title .far,.modal-dialog.cascading-modal .modal-header .title .fas{margin-right:9px}.modal-dialog.cascading-modal .modal-c-tabs .md-tabs{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);display:flex}.modal-dialog.cascading-modal .modal-c-tabs .md-tabs li{flex:1}.modal-dialog.cascading-modal .modal-c-tabs .md-tabs li a{text-align:center}.modal-dialog.cascading-modal .modal-c-tabs .tab-content{box-shadow:unset;padding:1.7rem 0 0}.modal-dialog.cascading-modal.modal-avatar .modal-header img{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);margin-left:auto;margin-right:auto;width:130px}.modal-dialog.modal-notify.modal-primary .modal-header{background-color:#4285f4}.modal-dialog.modal-notify.modal-primary .fab,.modal-dialog.modal-notify.modal-primary .far,.modal-dialog.modal-notify.modal-primary .fas{color:#4285f4}.modal-dialog.modal-notify.modal-primary .badge{background-color:#4285f4}.modal-dialog.modal-notify.modal-primary .btn .fab,.modal-dialog.modal-notify.modal-primary .btn .far,.modal-dialog.modal-notify.modal-primary .btn .fas{color:#fff}.modal-dialog.modal-notify.modal-primary .btn.btn-outline-primary .fab,.modal-dialog.modal-notify.modal-primary .btn.btn-outline-primary .far,.modal-dialog.modal-notify.modal-primary .btn.btn-outline-primary .fas{color:#4285f4}.modal-dialog.modal-notify.modal-danger .fab,.modal-dialog.modal-notify.modal-danger .far,.modal-dialog.modal-notify.modal-danger .fas{color:#ff3547}.modal-dialog.modal-notify.modal-danger .btn .fab,.modal-dialog.modal-notify.modal-danger .btn .far,.modal-dialog.modal-notify.modal-danger .btn .fas{color:#fff}.modal-dialog.modal-notify.modal-danger .btn.btn-outline-danger .fab,.modal-dialog.modal-notify.modal-danger .btn.btn-outline-danger .far,.modal-dialog.modal-notify.modal-danger .btn.btn-outline-danger .fas{color:#ff3547}.modal-dialog.modal-notify.modal-warning .fab,.modal-dialog.modal-notify.modal-warning .far,.modal-dialog.modal-notify.modal-warning .fas{color:#fb3}.modal-dialog.modal-notify.modal-warning .btn .fab,.modal-dialog.modal-notify.modal-warning .btn .far,.modal-dialog.modal-notify.modal-warning .btn .fas{color:#fff}.modal-dialog.modal-notify.modal-warning .btn.btn-outline-warning .fab,.modal-dialog.modal-notify.modal-warning .btn.btn-outline-warning .far,.modal-dialog.modal-notify.modal-warning .btn.btn-outline-warning .fas{color:#fb3}.modal-dialog.modal-notify.modal-success .fab,.modal-dialog.modal-notify.modal-success .far,.modal-dialog.modal-notify.modal-success .fas{color:#00c851}.modal-dialog.modal-notify.modal-success .btn .fab,.modal-dialog.modal-notify.modal-success .btn .far,.modal-dialog.modal-notify.modal-success .btn .fas{color:#fff}.modal-dialog.modal-notify.modal-success .btn.btn-outline-success .fab,.modal-dialog.modal-notify.modal-success .btn.btn-outline-success .far,.modal-dialog.modal-notify.modal-success .btn.btn-outline-success .fas{color:#00c851}.modal-dialog.modal-notify.modal-info .fab,.modal-dialog.modal-notify.modal-info .far,.modal-dialog.modal-notify.modal-info .fas{color:#33b5e5}.modal-dialog.modal-notify.modal-info .btn .fab,.modal-dialog.modal-notify.modal-info .btn .far,.modal-dialog.modal-notify.modal-info .btn .fas{color:#fff}.modal-dialog.modal-notify.modal-info .btn.btn-outline-info .fab,.modal-dialog.modal-notify.modal-info .btn.btn-outline-info .far,.modal-dialog.modal-notify.modal-info .btn.btn-outline-info .fas{color:#33b5e5}@media (min-width:768px){.modal .modal-dialog.modal-top{top:0}.modal .modal-dialog.modal-left{left:0}.modal .modal-dialog.modal-right{right:0}.modal .modal-dialog.modal-bottom{bottom:0}.modal .modal-dialog.modal-top-left{top:10px;left:10px}.modal .modal-dialog.modal-top-right{top:10px;right:10px}.modal .modal-dialog.modal-bottom-left{bottom:10px;left:10px}.modal .modal-dialog.modal-bottom-right{bottom:10px;right:10px}}@media (min-width:992px){.modal.modal-scrolling{position:relative}.modal.modal-scrolling .modal-dialog{position:fixed;z-index:1050}.modal.modal-content-clickable{top:auto;bottom:auto}.modal.modal-content-clickable .modal-dialog{position:fixed}.modal .modal-fluid{width:100%;max-width:100%}.modal .modal-fluid .modal-content{width:100%}.modal .modal-frame{position:absolute;margin:0!important;width:100%;max-width:100%!important}.modal .modal-frame.modal-bottom{bottom:0}.modal .modal-frame.modal-dialog{height:inherit}.modal .modal-full-height{position:absolute;display:flex;margin:0;width:400px;min-height:100%;height:auto;min-height:100%;top:0;right:0}.modal .modal-full-height.modal-bottom,.modal .modal-full-height.modal-top{display:block;width:100%;max-width:100%;height:auto}.modal .modal-full-height.modal-top{bottom:auto}.modal .modal-full-height.modal-bottom{min-height:0;top:auto}.modal .modal-full-height .modal-content{width:100%}.modal .modal-full-height.modal-lg{width:90%;max-width:90%}.modal .modal-side{position:absolute;bottom:10px;right:10px;margin:0;width:400px}}@media (min-width:992px) and (min-width:992px){.modal .modal-full-height.modal-lg{width:800px;max-width:800px}}@media (min-width:992px) and (min-width:1200px){.modal .modal-full-height.modal-lg{width:1000px;max-width:1000px}}body.scrollable{overflow-y:auto}.modal-dialog .modal-content{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.125rem;border:0}.modal{padding-right:0!important}@media (min-width:768px){.modal .modal-dialog.modal-top{top:0;left:0;right:0}.modal .modal-dialog.modal-left{left:0}.modal .modal-dialog.modal-right{right:0}.modal .modal-dialog.modal-bottom>.modal-content{position:absolute;bottom:0}.modal .modal-dialog.modal-top-left{top:10px;left:10px}.modal .modal-dialog.modal-top-right{top:10px;right:10px}.modal .modal-dialog.modal-bottom-left{left:10px;bottom:10px}.modal .modal-dialog.modal-bottom-right{right:10px;bottom:10px}.modal-sm{max-width:300px}}.modal .modal-side.modal-top{top:0}.modal .modal-side.modal-left{left:0}.modal .modal-side.modal-right{right:0}.modal .modal-side.modal-bottom{bottom:0}.modal .modal-side.modal-top-left{top:10px;left:10px}.modal .modal-side.modal-top-right{top:10px;right:10px}.modal .modal-side.modal-bottom-left{left:10px;bottom:10px}.modal .modal-side.modal-bottom-right{right:10px;bottom:10px}.modal.fade.top:not(.show) .modal-dialog{-webkit-transform:translate3d(0,-25%,0);transform:translate3d(0,-25%,0)}.modal.fade.left:not(.show) .modal-dialog{-webkit-transform:translate3d(-25%,0,0);transform:translate3d(-25%,0,0)}.modal.fade.right:not(.show) .modal-dialog{-webkit-transform:translate3d(25%,0,0);transform:translate3d(25%,0,0)}.modal.fade.bottom:not(.show) .modal-dialog{-webkit-transform:translate3d(0,25%,0);transform:translate3d(0,25%,0)}.modal.fade.in{opacity:1}.modal.fade.in .modal-dialog{-webkit-transform:translate(0,0);transform:translate(0,0)}.modal.fade.in .modal-dialog .relative{display:inline-block}.modal.modal-scrolling{position:relative}.modal.modal-scrolling .modal-dialog{position:fixed;z-index:1050}.modal.modal-content-clickable{top:auto;bottom:auto}.modal.modal-content-clickable .modal-dialog{position:fixed}.modal .modal-fluid{max-width:100%}.modal .modal-fluid .modal-content{width:100%}.modal .modal-frame{position:absolute;max-width:100%;margin:0}@media (max-width:767px){.modal .modal-frame{padding:.5rem}}.modal .modal-frame.modal-bottom{bottom:0}.modal .modal-full-height{display:flex;position:absolute;width:400px;min-height:100%;margin:0;top:0;right:0}@media (max-width:576px){.modal .modal-full-height{width:100%;padding:.5rem}}@media (max-width:992px){.modal .modal-full-height{width:100%;height:unset;position:unset}.modal .modal-full-height.modal-left,.modal .modal-full-height.modal-right,.modal .modal-full-height.modal-top{margin:1.75rem auto;min-height:unset}.modal .modal-full-height.modal-bottom,.modal .modal-full-height.modal-left,.modal .modal-full-height.modal-right,.modal .modal-full-height.modal-top{margin-left:auto;margin-right:auto}}@media (min-width:768px) and (max-width:992px){.modal .modal-full-height.modal-bottom{margin-bottom:1.75rem}.modal .modal-full-height.modal-bottom .modal-content{bottom:1rem}}.modal .modal-full-height.modal-bottom,.modal .modal-full-height.modal-top{display:block;width:100%;height:auto}.modal .modal-full-height.modal-top{bottom:auto}.modal .modal-full-height.modal-bottom{bottom:0}.modal .modal-full-height .modal-content{width:100%}.modal .modal-full-height.modal-lg{max-width:90%;width:90%}@media (min-width:992px){.modal .modal-full-height.modal-lg{max-width:800px;width:800px}}@media (min-width:1200px){.modal .modal-full-height.modal-lg{max-width:1000px;width:1000px}}.modal .modal-side{position:absolute;right:10px;bottom:10px;margin:0;min-width:100px}@media (max-width:768px){.modal .modal-full-height.modal-bottom{margin-top:1.75rem}.modal .modal-side{padding-left:.5rem}}.modal-dialog.cascading-modal{margin-top:10%}.modal-dialog.cascading-modal .modal-header{text-align:center;margin:-2rem 1rem 1rem;padding:1.5rem;border:none;flex-direction:column}.modal-dialog.cascading-modal .modal-header .close{margin-right:2.5rem}.modal-dialog.cascading-modal .modal-header.white-text .close{color:#fff;opacity:1}.modal-dialog.cascading-modal .modal-header .title{width:100%;margin-bottom:0;font-size:1.25rem}.modal-dialog.cascading-modal .modal-header .title .fa{margin-right:9px}.modal-dialog.cascading-modal .modal-header .social-buttons{margin-top:1.5rem}.modal-dialog.cascading-modal .modal-header .social-buttons a{font-size:1rem}.modal-dialog.cascading-modal .modal-c-tabs .md-tabs{margin:-1.5rem 1rem 0}.modal-dialog.cascading-modal .modal-body,.modal-dialog.cascading-modal .modal-footer{color:#616161;padding-right:2rem;padding-left:2rem}.modal-dialog.cascading-modal .modal-body .additional-option,.modal-dialog.cascading-modal .modal-footer .additional-option{text-align:center;margin-top:1rem}.modal-dialog.cascading-modal.modal-avatar{margin-top:6rem}.modal-dialog.cascading-modal.modal-avatar .modal-header{box-shadow:none;margin:-6rem 2rem -1rem}.modal-dialog.modal-notify .heading{margin:0;padding:.3rem;color:#fff;font-size:1.15rem}.modal-dialog.modal-notify .modal-header{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border:0}.modal-dialog.modal-notify .close{opacity:1}.modal-dialog.modal-notify .modal-body{padding:1.5rem;color:#616161}.modal-dialog.modal-notify .btn-outline-secondary-modal{background-color:transparent}.modal-dialog.modal-notify.modal-info .modal-header{background-color:#5394ff}.modal-dialog.modal-notify.modal-info .fa{color:#5394ff}.modal-dialog.modal-notify.modal-info .badge{background-color:#5394ff}.modal-dialog.modal-notify.modal-info .btn-primary-modal{background:#5394ff}.modal-dialog.modal-notify.modal-info .btn-primary-modal:active,.modal-dialog.modal-notify.modal-info .btn-primary-modal:focus,.modal-dialog.modal-notify.modal-info .btn-primary-modal:hover{background-color:#6da4ff!important}.modal-dialog.modal-notify.modal-info .btn-primary-modal.active{background-color:#0059ec!important}.modal-dialog.modal-notify.modal-info .btn-outline-secondary-modal{border:2px solid #5394ff;color:#5394ff!important}.modal-dialog.modal-notify.modal-warning .modal-header{background-color:#ff8e38}.modal-dialog.modal-notify.modal-warning .fa{color:#ff8e38}.modal-dialog.modal-notify.modal-warning .badge{background-color:#ff8e38}.modal-dialog.modal-notify.modal-warning .btn-primary-modal{background:#ff8e38}.modal-dialog.modal-notify.modal-warning .btn-primary-modal:active,.modal-dialog.modal-notify.modal-warning .btn-primary-modal:focus,.modal-dialog.modal-notify.modal-warning .btn-primary-modal:hover{background-color:#ff9c52!important}.modal-dialog.modal-notify.modal-warning .btn-primary-modal.active{background-color:#d15a00!important}.modal-dialog.modal-notify.modal-warning .btn-outline-secondary-modal{border:2px solid #ff8e38;color:#ff8e38!important}.modal-dialog.modal-notify.modal-success .modal-header{background-color:#01d36b}.modal-dialog.modal-notify.modal-success .fa{color:#01d36b}.modal-dialog.modal-notify.modal-success .badge{background-color:#01d36b}.modal-dialog.modal-notify.modal-success .btn-primary-modal{background:#01d36b}.modal-dialog.modal-notify.modal-success .btn-primary-modal:active,.modal-dialog.modal-notify.modal-success .btn-primary-modal:focus,.modal-dialog.modal-notify.modal-success .btn-primary-modal:hover{background-color:#01ec78!important}.modal-dialog.modal-notify.modal-success .btn-primary-modal.active{background-color:#016d38!important}.modal-dialog.modal-notify.modal-success .btn-outline-secondary-modal{border:2px solid #01d36b;color:#01d36b!important}.modal-dialog.modal-notify.modal-danger .modal-header{background-color:#ff4b4b}.modal-dialog.modal-notify.modal-danger .fa{color:#ff4b4b}.modal-dialog.modal-notify.modal-danger .badge{background-color:#ff4b4b}.modal-dialog.modal-notify.modal-danger .btn-primary-modal{background:#ff4b4b}.modal-dialog.modal-notify.modal-danger .btn-primary-modal:active,.modal-dialog.modal-notify.modal-danger .btn-primary-modal:focus,.modal-dialog.modal-notify.modal-danger .btn-primary-modal:hover{background-color:#ff6565!important}.modal-dialog.modal-notify.modal-danger .btn-primary-modal.active{background-color:#e40000!important}.modal-dialog.modal-notify.modal-danger .btn-outline-secondary-modal{border:2px solid #ff4b4b;color:#ff4b4b!important}.modal-sm .modal-content{margin:0 auto;max-width:300px}.modal .modal-fluid,.modal .modal-frame{width:100%;max-width:100%}.modal-ext .modal-content .modal-header{text-align:center}.modal-ext .modal-content .options{float:left}.modal-ext .modal-content .modal-body .text-xs-center fieldset{margin-top:20px}.modal-ext .modal-content .call{margin-top:1rem}.modal-ext .modal-content .modal-body{padding:2rem 2rem 1rem}.modal-content:not(.card-image) .close{position:absolute;right:15px}.modal-cart li p{margin:5px;font-weight:400}.modal-cart li p .badge{margin-left:10px;margin-top:3px;font-weight:400;position:absolute}.modal-cart li p .quantity{font-size:16px;margin-right:7px;font-weight:300}.modal-cart .cartPageLink{margin-left:10px}.modal-cart .cartPageLink a{text-decoration:underline;color:#666}.modal-cart .total{float:right;font-weight:400}.cf-phone{margin-left:7px}.side-modal{position:fixed;height:100%;width:100%;z-index:9999}.side-modal .modal-dialog{position:absolute;bottom:10px;right:10px;width:400px;margin:10px}@media (max-width:760px){.side-modal .modal-dialog{display:none}}.side-modal .modal-header{padding:1rem}.side-modal .modal-header .heading{margin:0;padding:0}.side-modal .modal-content{border:none}.modal-dynamic>:first-child{display:flex;flex-direction:column;height:100%}.side-modal.fade:not(.show) .modal-dialog{-webkit-transform:translate3d(25%,0,0);transform:translate3d(25%,0,0)}.transparent-bd{opacity:0!important}.modal-backdrop,.modal-backdrop.in{opacity:.5}#exampleModalScroll{overflow-x:hidden;overflow-y:auto}.modal-open .modal{overflow-x:hidden;overflow-y:hidden}.form-dark .card-image{background-size:100%}"]
            }] }
];
/** @nocollapse */
ModalDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ComponentLoaderFactory }
];
ModalDirective.propDecorators = {
    config: [{ type: Input }],
    onShow: [{ type: Output }],
    open: [{ type: Output }],
    onShown: [{ type: Output }],
    opened: [{ type: Output }],
    onHide: [{ type: Output }],
    close: [{ type: Output }],
    onHidden: [{ type: Output }],
    closed: [{ type: Output }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onEsc: [{ type: HostListener, args: ['keydown.esc',] }]
};
if (false) {
    /**
     * This event fires immediately when the `show` instance method is called.
     * @type {?}
     */
    ModalDirective.prototype.onShow;
    /** @type {?} */
    ModalDirective.prototype.open;
    /**
     * This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)
     * @type {?}
     */
    ModalDirective.prototype.onShown;
    /** @type {?} */
    ModalDirective.prototype.opened;
    /**
     * This event is fired immediately when the hide instance method has been called.
     * @type {?}
     */
    ModalDirective.prototype.onHide;
    /** @type {?} */
    ModalDirective.prototype.close;
    /**
     * This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
     * @type {?}
     */
    ModalDirective.prototype.onHidden;
    /** @type {?} */
    ModalDirective.prototype.closed;
    /** @type {?} */
    ModalDirective.prototype.isAnimated;
    /**
     * This field contains last dismiss reason.
     * Possible values: `backdrop-click`, `esc` and `null` (if modal was closed by direct call of `.hide()`).
     * @type {?}
     */
    ModalDirective.prototype.dismissReason;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._config;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._isShown;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.isBodyOverflowing;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.originalBodyPadding;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.scrollbarWidth;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.timerHideModal;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.timerRmBackDrop;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype.backdrop;
    /**
     * @type {?}
     * @private
     */
    ModalDirective.prototype._backdrop;
    /** @type {?} */
    ModalDirective.prototype._dialog;
    /** @type {?} */
    ModalDirective.prototype.isNested;
    /** @type {?} */
    ModalDirective.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._element;
    /**
     * @type {?}
     * @protected
     */
    ModalDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvbW9kYWxzL21vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFFaEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O01BRXRGLG1CQUFtQixHQUFHLEdBQUc7O01BQ3pCLDRCQUE0QixHQUFHLEdBQUc7Ozs7QUFXeEMsa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxjQUFjOzs7Ozs7O0lBb0Z6QixZQUNZLFFBQW9CLEVBQzlCLGlCQUFtQyxFQUN6QixTQUFvQixFQUM5QixHQUEyQjtRQUhqQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBRXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7Ozs7O1FBMUVmLFdBQU0sR0FBaUMsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDMUUsU0FBSSxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQzs7Ozs7UUFHeEUsWUFBTyxHQUFpQyxJQUFJLFlBQVks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Q0FBQztvQkFjaEMsWUFBWSxTQUFDLGFBQWE7Ozs7Ozs7SUEvRDNCLGdDQUEyRjs7SUFDM0YsOEJBQXlGOzs7OztJQUd6RixpQ0FBNEY7O0lBQzVGLGdDQUEyRjs7Ozs7SUFHM0YsZ0NBQTJGOztJQUMzRiwrQkFBMEY7Ozs7O0lBRzFGLGtDQUE2Rjs7SUFDN0YsZ0NBQTJGOztJQUczRixvQ0FBeUI7Ozs7OztJQUd6Qix1Q0FBbUM7Ozs7O0lBTW5DLGlDQUFzQzs7Ozs7SUFDdEMsa0NBQTJCOzs7OztJQUUzQiwyQ0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQzs7Ozs7SUFDbEMsd0NBQTZCOzs7OztJQUU3Qix3Q0FBa0M7Ozs7O0lBQ2xDLHlDQUFtQzs7Ozs7SUFHbkMsa0NBQXlEOzs7OztJQUN6RCxtQ0FBMkQ7O0lBRTNELGlDQUFhOztJQUViLGtDQUFpQjs7SUFFakIsK0JBQTJCOzs7OztJQTZCekIsa0NBQThCOzs7OztJQUU5QixtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGRvY3VtZW50LCBuYXZpZ2F0b3IsIHdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL2ZhY2FkZS9icm93c2VyJztcblxuaW1wb3J0IHsgaXNCczMgfSBmcm9tICcuLi91dGlscy9uZzItYm9vdHN0cmFwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmNsYXNzJztcbmltcG9ydCB7IE1vZGFsQmFja2Ryb3BDb21wb25lbnQgfSBmcm9tICcuL21vZGFsQmFja2Ryb3AuY29tcG9uZW50JztcbmltcG9ydCB7IENsYXNzTmFtZSwgRElTTUlTU19SRUFTT05TLCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBNb2RhbE9wdGlvbnMgfSBmcm9tICcuL21vZGFsLm9wdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyIH0gZnJvbSAnLi4vdXRpbHMvY29tcG9uZW50LWxvYWRlci9jb21wb25lbnQtbG9hZGVyLmNsYXNzJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICcuLi91dGlscy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuZmFjdG9yeSc7XG5cbmNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDA7XG5jb25zdCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwO1xuXG4vKiogTWFyayBhbnkgY29kZSB3aXRoIGRpcmVjdGl2ZSB0byBzaG93IGl0J3MgY29udGVudCBpbiBtb2RhbCAqL1xuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiTW9kYWxdJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWxzLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWRiLW1vZGFsLCBtZGJNb2RhbCcsXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNb2RhbERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBhbGxvd3MgdG8gc2V0IG1vZGFsIGNvbmZpZ3VyYXRpb24gdmlhIGVsZW1lbnQgcHJvcGVydHkgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBjb25maWcoY29uZjogTW9kYWxPcHRpb25zIHwgYW55KSB7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5nZXRDb25maWcoY29uZik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBNb2RhbE9wdGlvbnMgfCBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKiogVGhpcyBldmVudCBmaXJlcyBpbW1lZGlhdGVseSB3aGVuIHRoZSBgc2hvd2AgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZC4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHB1YmxpYyBvblNob3c6IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW46IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICAvKiogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBoYXMgYmVlbiBtYWRlIHZpc2libGUgdG8gdGhlIHVzZXIgKHdpbGwgd2FpdCBmb3IgQ1NTIHRyYW5zaXRpb25zIHRvIGNvbXBsZXRlKSAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgcHVibGljIG9uU2hvd246IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW5lZDogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGltbWVkaWF0ZWx5IHdoZW4gdGhlIGhpZGUgaW5zdGFuY2UgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkhpZGU6IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlOiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcbiAgLyoqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbW9kYWwgaGFzIGZpbmlzaGVkIGJlaW5nIGhpZGRlbiBmcm9tIHRoZSB1c2VyICh3aWxsIHdhaXQgZm9yIENTUyB0cmFuc2l0aW9ucyB0byBjb21wbGV0ZSkuICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1vdXRwdXQtb24tcHJlZml4XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlZDogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG5cbiAgLy8gc2VlbXMgbGlrZSBhbiBPcHRpb25zXG4gIHB1YmxpYyBpc0FuaW1hdGVkID0gdHJ1ZTtcbiAgLyoqIFRoaXMgZmllbGQgY29udGFpbnMgbGFzdCBkaXNtaXNzIHJlYXNvbi5cbiAgIFBvc3NpYmxlIHZhbHVlczogYGJhY2tkcm9wLWNsaWNrYCwgYGVzY2AgYW5kIGBudWxsYCAoaWYgbW9kYWwgd2FzIGNsb3NlZCBieSBkaXJlY3QgY2FsbCBvZiBgLmhpZGUoKWApLiAqL1xuICBwdWJsaWMgZGlzbWlzc1JlYXNvbjogc3RyaW5nIHwgYW55O1xuXG4gIHB1YmxpYyBnZXQgaXNTaG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bjtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29uZmlnOiBNb2RhbE9wdGlvbnMgfCBhbnk7XG4gIHByb3RlY3RlZCBfaXNTaG93biA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBpc0JvZHlPdmVyZmxvd2luZyA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgb3JpZ2luYWxCb2R5UGFkZGluZyA9IDA7XG4gIHByb3RlY3RlZCBzY3JvbGxiYXJXaWR0aCA9IDA7XG5cbiAgcHJvdGVjdGVkIHRpbWVySGlkZU1vZGFsOiBhbnkgPSAwO1xuICBwcm90ZWN0ZWQgdGltZXJSbUJhY2tEcm9wOiBhbnkgPSAwO1xuXG4gIC8vIHJlZmVyZW5jZSB0byBiYWNrZHJvcCBjb21wb25lbnRcbiAgcHJvdGVjdGVkIGJhY2tkcm9wOiBDb21wb25lbnRSZWY8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG4gIHByaXZhdGUgX2JhY2tkcm9wOiBDb21wb25lbnRMb2FkZXI8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG4gIC8vIHRvZG86IGltcGxlbWVudCBfZGlhbG9nXG4gIF9kaWFsb2c6IGFueTtcblxuICBpc05lc3RlZCA9IGZhbHNlO1xuXG4gIHV0aWxzOiBVdGlscyA9IG5ldyBVdGlscygpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBvbktleURvd24oZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudXRpbHMuZm9jdXNUcmFwTW9kYWwoZXZlbnQsIHRoaXMuX2VsZW1lbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25DbGljayhldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcuaWdub3JlQmFja2Ryb3BDbGljayB8fFxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnIHx8XG4gICAgICBldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRpc21pc3NSZWFzb24gPSBESVNNSVNTX1JFQVNPTlMuQkFDS1JET1A7XG4gICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgfVxuXG4gIC8vIHRvZG86IGNvbnNpZGVyIHByZXZlbnRpbmcgZGVmYXVsdCBhbmQgc3RvcHBpbmcgcHJvcGFnYXRpb25cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2MnKVxuICBwdWJsaWMgb25Fc2MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICB0aGlzLmRpc21pc3NSZWFzb24gPSBESVNNSVNTX1JFQVNPTlMuRVNDO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgY2xmOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5XG4gICkge1xuICAgIHRoaXMuX2JhY2tkcm9wID0gY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PihcbiAgICAgIF9lbGVtZW50LFxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICBfcmVuZGVyZXJcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IGFueSB7XG4gICAgdGhpcy5jb25maWcgPSB2b2lkIDA7XG4gICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcbiAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcC5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiBhbnkge1xuICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2NvbmZpZyB8fCB0aGlzLmdldENvbmZpZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zaG93KSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgLyogUHVibGljIG1ldGhvZHMgKi9cblxuICAvKiogQWxsb3dzIHRvIG1hbnVhbGx5IHRvZ2dsZSBtb2RhbCB2aXNpYmlsaXR5ICovXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICB9XG5cbiAgLyoqIEFsbG93cyB0byBtYW51YWxseSBvcGVuIG1vZGFsICovXG4gIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IG51bGw7XG4gICAgdGhpcy5vblNob3cuZW1pdCh0aGlzKTtcbiAgICB0aGlzLm9wZW4uZW1pdCh0aGlzKTtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lckhpZGVNb2RhbCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJSbUJhY2tEcm9wKTtcblxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpO1xuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5PUEVOKSkge1xuICAgICAgICB0aGlzLmlzTmVzdGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIENsYXNzTmFtZS5PUEVOKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zaG93QmFja2Ryb3AoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93RWxlbWVudCgpO1xuICAgIH0pO1xuICAgIGlmICghdGhpcy5jb25maWcuYmFja2Ryb3AgJiYgdGhpcy5jb25maWcuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnZml4ZWQnKTtcblxuICAgICAgaWYgKFxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93JywgJ3Vuc2V0Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAndW5zZXQnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteCcsICd1bnNldCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgY2xvc2UgbW9kYWwgKi9cbiAgcHVibGljIGhpZGUoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBmaXgobW9kYWwpOiByZXNvbHZlZCBwcm9ibGVtIHdpdGggbm90IHBhdXNpbmcgaWZyYW1lL3ZpZGVvIHdoZW4gY2xvc2luZyBtb2RhbFxuICAgIGNvbnN0IGlmcmFtZUVsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJykpO1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpKTtcblxuICAgIGlmcmFtZUVsZW1lbnRzLmZvckVhY2goKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHNyY0F0dHJpYnV0ZTogYW55ID0gaWZyYW1lLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaWZyYW1lLCAnc3JjJywgc3JjQXR0cmlidXRlKTtcbiAgICB9KTtcblxuICAgIHZpZGVvRWxlbWVudHMuZm9yRWFjaCgodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpID0+IHtcbiAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uSGlkZS5lbWl0KHRoaXMpO1xuICAgIHRoaXMuY2xvc2UuZW1pdCh0aGlzKTtcblxuICAgIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySGlkZU1vZGFsKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lclJtQmFja0Ryb3ApO1xuXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ2xhc3NOYW1lLklOKTtcbiAgICBpZiAoIWlzQnMzKCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ2xhc3NOYW1lLlNIT1cpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgIHRoaXMudGltZXJIaWRlTW9kYWwgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZU1vZGFsKCksIFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBQcml2YXRlIG1ldGhvZHMgQGludGVybmFsICovXG4gIHByb3RlY3RlZCBnZXRDb25maWcoY29uZmlnPzogTW9kYWxPcHRpb25zKTogTW9kYWxPcHRpb25zIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbW9kYWxDb25maWdEZWZhdWx0cywgY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgU2hvdyBkaWFsb2dcbiAgICogIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJvdGVjdGVkIHNob3dFbGVtZW50KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgKSB7XG4gICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgMCk7XG5cbiAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICBVdGlscy5yZWZsb3codGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENsYXNzTmFtZS5JTik7XG4gICAgaWYgKCFpc0JzMygpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENsYXNzTmFtZS5TSE9XKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgdGhpcy5vblNob3duLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLm9wZW5lZC5lbWl0KHRoaXMpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICBzZXRUaW1lb3V0KHRyYW5zaXRpb25Db21wbGV0ZSwgVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGhpZGVNb2RhbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMuc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc05lc3RlZCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIENsYXNzTmFtZS5PUEVOKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5yZXNldEFkanVzdG1lbnRzKCk7XG4gICAgICB0aGlzLmZvY3VzT3RoZXJNb2RhbCgpO1xuICAgICAgdGhpcy5vbkhpZGRlbi5lbWl0KHRoaXMpO1xuICAgICAgdGhpcy5jbG9zZWQuZW1pdCh0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHNob3dCYWNrZHJvcChjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5faXNTaG93biAmJlxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgJiZcbiAgICAgICghdGhpcy5iYWNrZHJvcCB8fCAhdGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc1Nob3duKVxuICAgICkge1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgdGhpcy5fYmFja2Ryb3BcbiAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxuICAgICAgICAudG8oJ2JvZHknKVxuICAgICAgICAuc2hvdyh7IGlzQW5pbWF0ZWQ6IHRoaXMuaXNBbmltYXRlZCB9KTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLl9iYWNrZHJvcC5fY29tcG9uZW50UmVmO1xuXG4gICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AuaW5zdGFuY2UuaXNTaG93biA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBjYWxsYmFja1JlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHRoaXMudGltZXJSbUJhY2tEcm9wID0gc2V0VGltZW91dChjYWxsYmFja1JlbW92ZSwgQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja1JlbW92ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVtb3ZlQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzT3RoZXJNb2RhbCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3RoZXJPcGVuZWRNb2RhbHMgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnLmluW21kYk1vZGFsXSdcbiAgICAgICk7XG4gICAgICBpZiAoIW90aGVyT3BlbmVkTW9kYWxzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvdGhlck9wZW5lZE1vZGFsc1tvdGhlck9wZW5lZE1vZGFscy5sZW5ndGggLSAxXS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCByZXNldEFkanVzdG1lbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3BhZGRpbmdMZWZ0JywgJycpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3BhZGRpbmdSaWdodCcsICcnKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGwgYmFyIHRyaWNrcyAqL1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBjaGVja1Njcm9sbGJhcigpOiB2b2lkIHtcbiAgICB0aGlzLmlzQm9keU92ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGlmICghZG9jdW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXG4gICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0JykgfHwgMCxcbiAgICAgIDEwXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRoeCBkLndhbHNoXG4gIHByb3RlY3RlZCBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHNjcm9sbERpdiA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHZvaWQgMCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgc2Nyb2xsRGl2KTtcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLlNDUk9MTEJBUl9NRUFTVVJFUjtcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xuICB9XG59XG4iXX0=