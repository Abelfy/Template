/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, forwardRef, HostListener, } from '@angular/core';
import { MdbAutoCompleterComponent } from '../components/mdb-auto-completer.component';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils } from '../../../free/utils';
import { TAB, ESCAPE, ENTER } from '../../../free/utils/keyboard-navigation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/** @type {?} */
export const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MdbAutoCompleterDirective)),
    multi: true,
};
export class MdbAutoCompleterDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     * @param {?} platformId
     * @param {?} document
     */
    constructor(renderer, el, platformId, document) {
        this.renderer = renderer;
        this.el = el;
        this.document = document;
        this.ngModelChange = new EventEmitter();
        this.clearBtnClicked = new EventEmitter();
        this._destroy$ = new Subject();
        this._canOpenOnFocus = true;
        this.utils = new Utils();
        this._onChange = (/**
         * @return {?}
         */
        () => { });
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this.isBrowser = isPlatformBrowser(platformId);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._handleKeyDown(event);
        /** @type {?} */
        const isTabKey = event.keyCode === TAB;
        if (isTabKey) {
            this._hide();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleInput(event) {
        if (!this._isOpen()) {
            this._show();
        }
        this._onChange(event.target.value);
        this.mdbAutoCompleter.removeHighlight(0);
        this.mdbAutoCompleter.highlightRow(0);
        /** @type {?} */
        const clearButtonVisibility = event.target.value.length > 0 ? 'visible' : 'hidden';
        if (this.mdbAutoCompleter.clearButton) {
            /** @type {?} */
            const clearButton = this.el.nativeElement.parentElement.lastElementChild;
            this._setStyles(clearButton, { visibility: clearButtonVisibility });
        }
    }
    /**
     * @return {?}
     */
    _handleFocusIn() {
        if (!this._canOpenOnFocus) {
            this._canOpenOnFocus = true;
        }
        else {
            this._show();
        }
    }
    /*
    fix(completer): Resolve problem with closing autocompleter dropdown
    when not neccessary (eg. clicking on button which is not an mdb-option.
    Without calling this _hide() method, autocompleter dropdown won't close
    after switching focus programmatically to another element.
    */
    /**
     * @return {?}
     */
    _handleBlurIn() {
        this._canOpenOnFocus = this.document.activeElement !== this.el.nativeElement;
        this._onTouched();
    }
    /**
     * @return {?}
     */
    handleMouseDown() {
        this.mdbAutoCompleter.highlightRow(0);
    }
    /**
     * @private
     * @return {?}
     */
    _renderClearButton() {
        /** @type {?} */
        const el = this.renderer.createElement('button');
        this._setStyles(el, {
            position: 'absolute',
            top: '25%',
            right: '0',
            visibility: 'hidden',
        });
        this._addClass(el, ['mdb-autocomplete-clear', 'fa', 'fa-times']);
        this.renderer.setAttribute(el, 'type', 'button');
        this.renderer.setAttribute(el, 'tabindex', this.mdbAutoCompleter.clearButtonTabIndex.toString());
        this.listenToClearClick = this.renderer.listen(el, 'click', (/**
         * @return {?}
         */
        () => {
            this.clearBtnClicked.emit();
            this._onChange('');
        }));
        if (this.isBrowser) {
            /** @type {?} */
            const parent = this.utils.getClosestEl(this.el.nativeElement, '.md-form') || this.el.nativeElement;
            this.renderer.appendChild(parent, el);
        }
    }
    /**
     * @private
     * @template THIS
     * @this {THIS}
     * @param {?} target
     * @param {?} styles
     * @return {THIS}
     */
    _setStyles(target, styles) {
        Object.keys(styles).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        (prop) => {
            (/** @type {?} */ (this)).renderer.setStyle(target, prop, styles[prop]);
        }));
        return (/** @type {?} */ (this));
    }
    /**
     * @private
     * @param {?} target
     * @param {?} name
     * @return {?}
     */
    _addClass(target, name) {
        name.forEach((/**
         * @param {?} el
         * @return {?}
         */
        (el) => {
            this.renderer.addClass(target, el);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _clearInput() {
        this.el.nativeElement.value = '';
        this.ngModelChange.emit('');
        /** @type {?} */
        const clearButton = this.el.nativeElement.parentElement.lastElementChild;
        this._setStyles(clearButton, { visibility: 'hidden' });
    }
    /**
     * @return {?}
     */
    clear() {
        this._clearInput();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeyDown(event) {
        this.mdbAutoCompleter.navigateUsingKeyboard(event);
        /** @type {?} */
        const key = event.keyCode;
        if (key !== ESCAPE && key !== ENTER && key !== TAB) {
            this.mdbAutoCompleter.show();
        }
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    getCoords(elem) {
        if (this.isBrowser) {
            /** @type {?} */
            const box = elem.getBoundingClientRect();
            /** @type {?} */
            const body = document.body;
            /** @type {?} */
            const docEl = document.documentElement;
            /** @type {?} */
            const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            /** @type {?} */
            const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
            /** @type {?} */
            const clientTop = docEl.clientTop || body.clientTop || 0;
            /** @type {?} */
            const clientLeft = docEl.clientLeft || body.clientLeft || 0;
            /** @type {?} */
            const top = box.top + scrollTop - clientTop;
            /** @type {?} */
            const left = box.left + scrollLeft - clientLeft;
            return { top: Math.round(top), left: Math.round(left) };
        }
    }
    /**
     * @private
     * @return {?}
     */
    _isOpen() {
        return this.mdbAutoCompleter.isOpen();
    }
    /**
     * @private
     * @return {?}
     */
    _show() {
        this.mdbAutoCompleter.show();
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.mdbAutoCompleter.appendToBody) {
                if (this.utils.getClosestEl(this.el.nativeElement, '.modal-body')) {
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.renderer.setStyle(this.mdbAutoCompleter.dropdown.nativeElement, 'z-index', '1100');
                    }), 0);
                }
            }
        }), 0);
        this.listenFunc = this.renderer.listen('document', 'click', (/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (this.mdbAutoCompleter.dropdown &&
                !this.mdbAutoCompleter.dropdown.nativeElement.contains((/** @type {?} */ (event.target))) &&
                !this.el.nativeElement.contains((/** @type {?} */ (event.target)))) {
                this._hide();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _hide() {
        this.mdbAutoCompleter.hide();
        this.listenFunc();
    }
    /**
     * @private
     * @return {?}
     */
    _appendDropdownToInput() {
        /** @type {?} */
        const position = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const el = this.el.nativeElement;
        /** @type {?} */
        const style = window.getComputedStyle(this.el.nativeElement);
        /** @type {?} */
        const height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
            .map((/**
         * @param {?} key
         * @return {?}
         */
        key => parseInt(style.getPropertyValue(key), 10)))
            .reduce((/**
         * @param {?} prev
         * @param {?} cur
         * @return {?}
         */
        (prev, cur) => prev + cur));
        this.mdbAutoCompleter.parameters = {
            left: this.getCoords(el).left,
            top: this.getCoords(el).top + height,
            width: position.width,
            bottom: window.innerHeight - height - el.getBoundingClientRect().top,
            inputHeight: height,
        };
        this.mdbAutoCompleter.appendDropdown();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.mdbAutoCompleter
            .selectedItemChanged()
            .pipe(takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const displayedValue = this.mdbAutoCompleter && this.mdbAutoCompleter.displayValue
                ? this.mdbAutoCompleter.displayValue(item.text)
                : item.text;
            this.el.nativeElement.value = displayedValue;
            this._onChange(item.text);
            /** @type {?} */
            const clearButtonVisibility = this.el.nativeElement.value.length > 0 ? 'visible' : 'hidden';
            /** @type {?} */
            const clearButton = this.el.nativeElement.parentElement.lastElementChild;
            this._setStyles(clearButton, { visibility: clearButtonVisibility });
            if (item) {
                this._canOpenOnFocus = false;
                this.el.nativeElement.focus();
                this._hide();
            }
        }));
        this.mdbAutoCompleter.origin = this.el;
        this.mdbAutoCompleter
            .isDropdownOpen()
            .pipe(takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            if (state) {
                this._appendDropdownToInput();
            }
        }));
        if (this.mdbAutoCompleter.clearButton && this.isBrowser) {
            this._renderClearButton();
            /** @type {?} */
            const clearButton = this.el.nativeElement.parentElement.querySelectorAll('.mdb-autocomplete-clear')[0];
            this._clearButton = this.document.querySelector('.mdb-autocomplete-clear');
            this.renderer.listen(clearButton, 'focus', (/**
             * @return {?}
             */
            () => {
                ['click', 'keydown:space', 'keydown:enter'].forEach((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => this.renderer.listen(clearButton, event, (/**
                 * @return {?}
                 */
                () => {
                    this._clearInput();
                }))));
                this._setStyles(clearButton, {
                    transform: 'scale(1.2, 1.2)',
                    transition: '200ms',
                });
            }));
            this.renderer.listen(clearButton, 'click', (/**
             * @return {?}
             */
            () => {
                this._clearInput();
            }));
            this.renderer.listen(clearButton, 'mouseenter', (/**
             * @return {?}
             */
            () => {
                this._setStyles(clearButton, {
                    transform: 'scale(1.2, 1.2)',
                    transition: '200ms',
                });
            }));
            this.renderer.listen(clearButton, 'mouseleave', (/**
             * @return {?}
             */
            () => {
                this._setStyles(clearButton, {
                    transform: 'scale(1.0, 1.0)',
                    transition: '200ms',
                });
            }));
            this.renderer.listen(clearButton, 'blur', (/**
             * @return {?}
             */
            () => {
                this._setStyles(clearButton, {
                    transform: 'scale(1.0, 1.0)',
                    transition: '200ms',
                });
            }));
            if (this.el.nativeElement.disabled) {
                this.renderer.setAttribute(clearButton, 'disabled', 'true');
            }
            this._autocompleterInputChanges = new MutationObserver((/**
             * @param {?} mutations
             * @return {?}
             */
            (mutations) => {
                mutations.forEach((/**
                 * @param {?} mutation
                 * @return {?}
                 */
                (mutation) => {
                    if (mutation.attributeName === 'disabled') {
                        this.renderer.setAttribute(this._clearButton, 'disabled', 'true');
                    }
                }));
            }));
            this._autocompleterInputChanges.observe(this.el.nativeElement, {
                attributes: true,
                childList: true,
                characterData: true,
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._autocompleterInputChanges) {
            this._autocompleterInputChanges.disconnect();
        }
        if (this.listenToClearClick) {
            this.listenToClearClick();
        }
        if (this.listenFunc) {
            this.listenFunc();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        Promise.resolve(null).then((/**
         * @return {?}
         */
        () => (this.el.nativeElement.value = value)));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
MdbAutoCompleterDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[mdbAutoCompleter], textarea[mdbAutoCompleter]',
                // tslint:disable-next-line:no-host-metadata-property
                host: {
                    '(input)': '_handleInput($event)',
                    '(focusin)': '_handleFocusIn()',
                    '(blur)': '_handleBlurIn()',
                    '(mousedown)': '_handleMouseDown()',
                },
                exportAs: 'mdbAutoCompleterTrigger',
                providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR],
            },] }
];
/** @nocollapse */
MdbAutoCompleterDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MdbAutoCompleterDirective.propDecorators = {
    mdbAutoCompleter: [{ type: Input }],
    ngModelChange: [{ type: Output }],
    clearBtnClicked: [{ type: Output }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    _handleInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    _handleFocusIn: [{ type: HostListener, args: ['focusin',] }],
    _handleBlurIn: [{ type: HostListener, args: ['blur',] }],
    handleMouseDown: [{ type: HostListener, args: ['mousedown',] }]
};
if (false) {
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.mdbAutoCompleter;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.ngModelChange;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.clearBtnClicked;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype._autocompleterInputChanges;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype._clearButton;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype._canOpenOnFocus;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype.utils;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.listenToClearClick;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.listenFunc;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype.isBrowser;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype._onChange;
    /** @type {?} */
    MdbAutoCompleterDirective.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    MdbAutoCompleterDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWF1dG8tY29tcGxldGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1jb21wbGV0ZXIvZGlyZWN0aXZlcy9tZGItYXV0by1jb21wbGV0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFM0MsTUFBTSxPQUFPLCtCQUErQixHQUFRO0lBQ2xELE9BQU8sRUFBRSxpQkFBaUI7O0lBRTFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBY0QsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7OztJQXVFcEMsWUFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ0QsVUFB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QU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFtQmhDLFlBQVksU0FBQyxTQUFTOzRCQWV0QixZQUFZLFNBQUMsTUFBTTs4QkFPbkIsWUFBWSxTQUFDLFdBQVc7Ozs7SUFqRXpCLHFEQUFxRDs7SUFDckQsa0RBQWtEOztJQUNsRCxvREFBb0Q7Ozs7O0lBRXBELDhDQUFpRDs7Ozs7SUFFakQsK0RBQXFEOzs7OztJQUNyRCxpREFBMEI7Ozs7O0lBQzFCLG9EQUErQjs7Ozs7SUFDL0IsMENBQW1DOztJQUVuQyx1REFBNkI7O0lBQzdCLCtDQUFxQjs7SUFDckIsOENBQW1COztJQTJUbkIsOENBQTJDOztJQUUzQywrQ0FBc0I7Ozs7O0lBblFwQiw2Q0FBMkI7Ozs7O0lBQzNCLHVDQUFzQjs7Ozs7SUFFdEIsNkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9tZGItYXV0by1jb21wbGV0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IElTZWxlY3RlZE9wdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2VsZWN0ZWQtb3B0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9mcmVlL3V0aWxzJztcbmltcG9ydCB7IFRBQiwgRVNDQVBFLCBFTlRFUiB9IGZyb20gJy4uLy4uLy4uL2ZyZWUvdXRpbHMva2V5Ym9hcmQtbmF2aWdhdGlvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBNQVRfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJBdXRvQ29tcGxldGVyRGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFttZGJBdXRvQ29tcGxldGVyXSwgdGV4dGFyZWFbbWRiQXV0b0NvbXBsZXRlcl0nLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgJyhpbnB1dCknOiAnX2hhbmRsZUlucHV0KCRldmVudCknLFxuICAgICcoZm9jdXNpbiknOiAnX2hhbmRsZUZvY3VzSW4oKScsXG4gICAgJyhibHVyKSc6ICdfaGFuZGxlQmx1ckluKCknLFxuICAgICcobW91c2Vkb3duKSc6ICdfaGFuZGxlTW91c2VEb3duKCknLFxuICB9LFxuICBleHBvcnRBczogJ21kYkF1dG9Db21wbGV0ZXJUcmlnZ2VyJyxcbiAgcHJvdmlkZXJzOiBbTUFUX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYkF1dG9Db21wbGV0ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgbWRiQXV0b0NvbXBsZXRlcjogTWRiQXV0b0NvbXBsZXRlckNvbXBvbmVudDtcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNsZWFyQnRuQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIF9hdXRvY29tcGxldGVySW5wdXRDaGFuZ2VzOiBNdXRhdGlvbk9ic2VydmVyO1xuICBwcml2YXRlIF9jbGVhckJ1dHRvbjogYW55O1xuICBwcml2YXRlIF9jYW5PcGVuT25Gb2N1cyA9IHRydWU7XG4gIHByaXZhdGUgdXRpbHM6IFV0aWxzID0gbmV3IFV0aWxzKCk7XG5cbiAgbGlzdGVuVG9DbGVhckNsaWNrOiBGdW5jdGlvbjtcbiAgbGlzdGVuRnVuYzogRnVuY3Rpb247XG4gIGlzQnJvd3NlcjogYm9vbGVhbjtcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLl9oYW5kbGVLZXlEb3duKGV2ZW50KTtcbiAgICBjb25zdCBpc1RhYktleSA9IGV2ZW50LmtleUNvZGUgPT09IFRBQjtcbiAgICBpZiAoaXNUYWJLZXkpIHtcbiAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVJbnB1dChldmVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9pc09wZW4oKSkge1xuICAgICAgdGhpcy5fc2hvdygpO1xuICAgIH1cblxuICAgIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIucmVtb3ZlSGlnaGxpZ2h0KDApO1xuICAgIHRoaXMubWRiQXV0b0NvbXBsZXRlci5oaWdobGlnaHRSb3coMCk7XG5cbiAgICBjb25zdCBjbGVhckJ1dHRvblZpc2liaWxpdHkgPSBldmVudC50YXJnZXQudmFsdWUubGVuZ3RoID4gMCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xuICAgIGlmICh0aGlzLm1kYkF1dG9Db21wbGV0ZXIuY2xlYXJCdXR0b24pIHtcbiAgICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZDtcblxuICAgICAgdGhpcy5fc2V0U3R5bGVzKGNsZWFyQnV0dG9uLCB7IHZpc2liaWxpdHk6IGNsZWFyQnV0dG9uVmlzaWJpbGl0eSB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1c2luJylcbiAgX2hhbmRsZUZvY3VzSW4oKSB7XG4gICAgaWYgKCF0aGlzLl9jYW5PcGVuT25Gb2N1cykge1xuICAgICAgdGhpcy5fY2FuT3Blbk9uRm9jdXMgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLypcbmZpeChjb21wbGV0ZXIpOiBSZXNvbHZlIHByb2JsZW0gd2l0aCBjbG9zaW5nIGF1dG9jb21wbGV0ZXIgZHJvcGRvd25cbndoZW4gbm90IG5lY2Nlc3NhcnkgKGVnLiBjbGlja2luZyBvbiBidXR0b24gd2hpY2ggaXMgbm90IGFuIG1kYi1vcHRpb24uXG5XaXRob3V0IGNhbGxpbmcgdGhpcyBfaGlkZSgpIG1ldGhvZCwgYXV0b2NvbXBsZXRlciBkcm9wZG93biB3b24ndCBjbG9zZVxuYWZ0ZXIgc3dpdGNoaW5nIGZvY3VzIHByb2dyYW1tYXRpY2FsbHkgdG8gYW5vdGhlciBlbGVtZW50LlxuKi9cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIF9oYW5kbGVCbHVySW4oKSB7XG4gICAgdGhpcy5fY2FuT3Blbk9uRm9jdXMgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJylcbiAgaGFuZGxlTW91c2VEb3duKCkge1xuICAgIHRoaXMubWRiQXV0b0NvbXBsZXRlci5oaWdobGlnaHRSb3coMCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICkge1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXJDbGVhckJ1dHRvbigpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICB0aGlzLl9zZXRTdHlsZXMoZWwsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAnMjUlJyxcbiAgICAgIHJpZ2h0OiAnMCcsXG4gICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB9KTtcblxuICAgIHRoaXMuX2FkZENsYXNzKGVsLCBbJ21kYi1hdXRvY29tcGxldGUtY2xlYXInLCAnZmEnLCAnZmEtdGltZXMnXSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICBlbCxcbiAgICAgICd0YWJpbmRleCcsXG4gICAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuY2xlYXJCdXR0b25UYWJJbmRleC50b1N0cmluZygpXG4gICAgKTtcbiAgICB0aGlzLmxpc3RlblRvQ2xlYXJDbGljayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyQnRuQ2xpY2tlZC5lbWl0KCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZSgnJyk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9XG4gICAgICAgIHRoaXMudXRpbHMuZ2V0Q2xvc2VzdEVsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5tZC1mb3JtJykgfHwgdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnQsIGVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRTdHlsZXModGFyZ2V0OiBFbGVtZW50UmVmLCBzdHlsZXM6IGFueSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaCgocHJvcDogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRhcmdldCwgcHJvcCwgc3R5bGVzW3Byb3BdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENsYXNzKHRhcmdldDogRWxlbWVudFJlZiwgbmFtZTogc3RyaW5nW10pIHtcbiAgICBuYW1lLmZvckVhY2goKGVsOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGFyZ2V0LCBlbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jbGVhcklucHV0KCkge1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KCcnKTtcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgdGhpcy5fc2V0U3R5bGVzKGNsZWFyQnV0dG9uLCB7IHZpc2liaWxpdHk6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMuX2NsZWFySW5wdXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfaGFuZGxlS2V5RG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5tZGJBdXRvQ29tcGxldGVyLm5hdmlnYXRlVXNpbmdLZXlib2FyZChldmVudCk7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcblxuICAgIGlmIChrZXkgIT09IEVTQ0FQRSAmJiBrZXkgIT09IEVOVEVSICYmIGtleSAhPT0gVEFCKSB7XG4gICAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvb3JkcyhlbGVtOiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgYm94OiBDbGllbnRSZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICBjb25zdCBkb2NFbDogYW55ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICBjb25zdCBzY3JvbGxUb3A6IG51bWJlciA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgICBjb25zdCBzY3JvbGxMZWZ0OiBudW1iZXIgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cbiAgICAgIGNvbnN0IGNsaWVudFRvcDogbnVtYmVyID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgICBjb25zdCBjbGllbnRMZWZ0OiBudW1iZXIgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgICBjb25zdCB0b3A6IG51bWJlciA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3A7XG4gICAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0O1xuXG4gICAgICByZXR1cm4geyB0b3A6IE1hdGgucm91bmQodG9wKSwgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5tZGJBdXRvQ29tcGxldGVyLmlzT3BlbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuc2hvdygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubWRiQXV0b0NvbXBsZXRlci5hcHBlbmRUb0JvZHkpIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbHMuZ2V0Q2xvc2VzdEVsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5tb2RhbC1ib2R5JykpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tZGJBdXRvQ29tcGxldGVyLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgJzExMDAnKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5saXN0ZW5GdW5jID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuZHJvcGRvd24gJiZcbiAgICAgICAgIXRoaXMubWRiQXV0b0NvbXBsZXRlci5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkgJiZcbiAgICAgICAgIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZSgpIHtcbiAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuaGlkZSgpO1xuICAgIHRoaXMubGlzdGVuRnVuYygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwZW5kRHJvcGRvd25Ub0lucHV0KCkge1xuICAgIGNvbnN0IHBvc2l0aW9uOiBDbGllbnRSZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zdCBoZWlnaHQgPSBbJ2hlaWdodCcsICdwYWRkaW5nLXRvcCcsICdwYWRkaW5nLWJvdHRvbScsICdtYXJnaW4tdG9wJywgJ21hcmdpbi1ib3R0b20nXVxuICAgICAgLm1hcChrZXkgPT4gcGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShrZXkpLCAxMCkpXG4gICAgICAucmVkdWNlKChwcmV2LCBjdXIpID0+IHByZXYgKyBjdXIpO1xuXG4gICAgdGhpcy5tZGJBdXRvQ29tcGxldGVyLnBhcmFtZXRlcnMgPSB7XG4gICAgICBsZWZ0OiB0aGlzLmdldENvb3JkcyhlbCkubGVmdCxcbiAgICAgIHRvcDogdGhpcy5nZXRDb29yZHMoZWwpLnRvcCArIGhlaWdodCxcbiAgICAgIHdpZHRoOiBwb3NpdGlvbi53aWR0aCxcbiAgICAgIGJvdHRvbTogd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wLFxuICAgICAgaW5wdXRIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuXG4gICAgdGhpcy5tZGJBdXRvQ29tcGxldGVyLmFwcGVuZERyb3Bkb3duKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tZGJBdXRvQ29tcGxldGVyXG4gICAgICAuc2VsZWN0ZWRJdGVtQ2hhbmdlZCgpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoaXRlbTogSVNlbGVjdGVkT3B0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXllZFZhbHVlID1cbiAgICAgICAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIgJiYgdGhpcy5tZGJBdXRvQ29tcGxldGVyLmRpc3BsYXlWYWx1ZVxuICAgICAgICAgICAgPyB0aGlzLm1kYkF1dG9Db21wbGV0ZXIuZGlzcGxheVZhbHVlKGl0ZW0udGV4dClcbiAgICAgICAgICAgIDogaXRlbS50ZXh0O1xuXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGRpc3BsYXllZFZhbHVlO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZShpdGVtLnRleHQpO1xuICAgICAgICBjb25zdCBjbGVhckJ1dHRvblZpc2liaWxpdHkgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID4gMCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xuICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHRoaXMuX3NldFN0eWxlcyhjbGVhckJ1dHRvbiwgeyB2aXNpYmlsaXR5OiBjbGVhckJ1dHRvblZpc2liaWxpdHkgfSk7XG5cbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICB0aGlzLl9jYW5PcGVuT25Gb2N1cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLm1kYkF1dG9Db21wbGV0ZXIub3JpZ2luID0gdGhpcy5lbDtcblxuICAgIHRoaXMubWRiQXV0b0NvbXBsZXRlclxuICAgICAgLmlzRHJvcGRvd25PcGVuKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICB0aGlzLl9hcHBlbmREcm9wZG93blRvSW5wdXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5tZGJBdXRvQ29tcGxldGVyLmNsZWFyQnV0dG9uICYmIHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLl9yZW5kZXJDbGVhckJ1dHRvbigpO1xuICAgICAgY29uc3QgY2xlYXJCdXR0b24gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnLm1kYi1hdXRvY29tcGxldGUtY2xlYXInXG4gICAgICApWzBdO1xuXG4gICAgICB0aGlzLl9jbGVhckJ1dHRvbiA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kYi1hdXRvY29tcGxldGUtY2xlYXInKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xlYXJCdXR0b24sICdmb2N1cycsICgpID0+IHtcbiAgICAgICAgWydjbGljaycsICdrZXlkb3duOnNwYWNlJywgJ2tleWRvd246ZW50ZXInXS5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xlYXJCdXR0b24sIGV2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhcklucHV0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9zZXRTdHlsZXMoY2xlYXJCdXR0b24sIHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLjIsIDEuMiknLFxuICAgICAgICAgIHRyYW5zaXRpb246ICcyMDBtcycsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsZWFyQnV0dG9uLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NsZWFySW5wdXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihjbGVhckJ1dHRvbiwgJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NldFN0eWxlcyhjbGVhckJ1dHRvbiwge1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEuMiwgMS4yKScsXG4gICAgICAgICAgdHJhbnNpdGlvbjogJzIwMG1zJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oY2xlYXJCdXR0b24sICdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZXRTdHlsZXMoY2xlYXJCdXR0b24sIHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLjAsIDEuMCknLFxuICAgICAgICAgIHRyYW5zaXRpb246ICcyMDBtcycsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGNsZWFyQnV0dG9uLCAnYmx1cicsICgpID0+IHtcbiAgICAgICAgdGhpcy5fc2V0U3R5bGVzKGNsZWFyQnV0dG9uLCB7XG4gICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4wLCAxLjApJyxcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnMjAwbXMnLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGNsZWFyQnV0dG9uLCAnZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hdXRvY29tcGxldGVySW5wdXRDaGFuZ2VzID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb246IE11dGF0aW9uUmVjb3JkKSA9PiB7XG4gICAgICAgICAgaWYgKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2NsZWFyQnV0dG9uLCAnZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlcklucHV0Q2hhbmdlcy5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fYXV0b2NvbXBsZXRlcklucHV0Q2hhbmdlcykge1xuICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlcklucHV0Q2hhbmdlcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGlzdGVuVG9DbGVhckNsaWNrKSB7XG4gICAgICB0aGlzLmxpc3RlblRvQ2xlYXJDbGljaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5saXN0ZW5GdW5jKSB7XG4gICAgICB0aGlzLmxpc3RlbkZ1bmMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gKHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlKSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==