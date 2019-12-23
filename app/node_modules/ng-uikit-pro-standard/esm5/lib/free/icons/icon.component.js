/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy, } from '@angular/core';
import { Utils } from '../utils';
var MdbIconComponent = /** @class */ (function () {
    function MdbIconComponent(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.fab = false;
        this.far = false;
        this.fal = false;
        this.fas = true;
        this.sizeClass = '';
        this.utils = new Utils();
    }
    /**
     * @return {?}
     */
    MdbIconComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.size) {
            this.sizeClass = "fa-" + this.size;
        }
        if (this._el.nativeElement.parentElement.classList.contains('md-form')) {
            this._renderer.addClass(this._el.nativeElement, 'prefix');
        }
        /** @type {?} */
        var classList = this._el.nativeElement.classList;
        this.fab = classList.contains('fab');
        this.far = classList.contains('far');
        this.fas = classList.contains('fas');
        this.fal = classList.contains('fal');
        /** @type {?} */
        var formWrapper = this.utils.getClosestEl(this._el.nativeElement, '.md-form') ||
            this.utils.getClosestEl(this._el.nativeElement, '.md-outline');
        if (formWrapper) {
            formWrapper.childNodes.forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) {
                if (el.tagName === 'INPUT') {
                    _this._renderer.listen(el, 'focus', (/**
                     * @return {?}
                     */
                    function () {
                        _this._renderer.addClass(_this._el.nativeElement, 'active');
                    }));
                    _this._renderer.listen(el, 'blur', (/**
                     * @return {?}
                     */
                    function () {
                        _this._renderer.removeClass(_this._el.nativeElement, 'active');
                    }));
                }
            }));
        }
    };
    MdbIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-icon',
                    template: "<i [ngClass]=\"{'fas': fas, 'far': far, 'fab': fab, 'fal': fal}\" class=\"fa-{{icon}} {{class}} {{classInside}} {{sizeClass}}\"></i>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    MdbIconComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    MdbIconComponent.propDecorators = {
        icon: [{ type: Input }],
        size: [{ type: Input }],
        class: [{ type: Input }],
        classInside: [{ type: Input }]
    };
    return MdbIconComponent;
}());
export { MdbIconComponent };
if (false) {
    /** @type {?} */
    MdbIconComponent.prototype.icon;
    /** @type {?} */
    MdbIconComponent.prototype.size;
    /** @type {?} */
    MdbIconComponent.prototype.class;
    /** @type {?} */
    MdbIconComponent.prototype.classInside;
    /** @type {?} */
    MdbIconComponent.prototype.fab;
    /** @type {?} */
    MdbIconComponent.prototype.far;
    /** @type {?} */
    MdbIconComponent.prototype.fal;
    /** @type {?} */
    MdbIconComponent.prototype.fas;
    /** @type {?} */
    MdbIconComponent.prototype.sizeClass;
    /** @type {?} */
    MdbIconComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    MdbIconComponent.prototype._el;
    /**
     * @type {?}
     * @private
     */
    MdbIconComponent.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9pY29ucy9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUVWLFNBQVMsRUFDVCx1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqQztJQW9CRSwwQkFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVGpFLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFFBQUcsR0FBRyxJQUFJLENBQUM7UUFFWCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWYsVUFBSyxHQUFVLElBQUksS0FBSyxFQUFFLENBQUM7SUFFeUMsQ0FBQzs7OztJQUVyRSxtQ0FBUTs7O0lBQVI7UUFBQSxpQkErQkM7UUE5QkMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFNLElBQUksQ0FBQyxJQUFNLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzNEOztZQUVLLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTO1FBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFFL0IsV0FBVyxHQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUM7UUFFaEUsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLEVBQU87Z0JBQ3JDLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7b0JBQzFCLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPOzs7b0JBQUU7d0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxDQUFDLEVBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTTs7O29CQUFFO3dCQUNoQyxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDL0QsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBckRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsa0pBQW9DO29CQUNwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBWEMsVUFBVTtnQkFFVixTQUFTOzs7dUJBV1IsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSzs7SUE2Q1IsdUJBQUM7Q0FBQSxBQXRERCxJQXNEQztTQWpEWSxnQkFBZ0I7OztJQUMzQixnQ0FBc0I7O0lBQ3RCLGdDQUFzQjs7SUFDdEIsaUNBQXVCOztJQUN2Qix1Q0FBNkI7O0lBRTdCLCtCQUFZOztJQUNaLCtCQUFZOztJQUNaLCtCQUFZOztJQUNaLCtCQUFXOztJQUVYLHFDQUFlOztJQUVmLGlDQUEyQjs7Ozs7SUFFZiwrQkFBdUI7Ozs7O0lBQUUscUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItaWNvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3NJbnNpZGU6IHN0cmluZztcblxuICBmYWIgPSBmYWxzZTtcbiAgZmFyID0gZmFsc2U7XG4gIGZhbCA9IGZhbHNlO1xuICBmYXMgPSB0cnVlO1xuXG4gIHNpemVDbGFzcyA9ICcnO1xuXG4gIHV0aWxzOiBVdGlscyA9IG5ldyBVdGlscygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuc2l6ZUNsYXNzID0gYGZhLSR7dGhpcy5zaXplfWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kLWZvcm0nKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3ByZWZpeCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIHRoaXMuZmFiID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWInKTtcbiAgICB0aGlzLmZhciA9IGNsYXNzTGlzdC5jb250YWlucygnZmFyJyk7XG4gICAgdGhpcy5mYXMgPSBjbGFzc0xpc3QuY29udGFpbnMoJ2ZhcycpO1xuICAgIHRoaXMuZmFsID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWwnKTtcblxuICAgIGNvbnN0IGZvcm1XcmFwcGVyID1cbiAgICAgIHRoaXMudXRpbHMuZ2V0Q2xvc2VzdEVsKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICcubWQtZm9ybScpIHx8XG4gICAgICB0aGlzLnV0aWxzLmdldENsb3Nlc3RFbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnLm1kLW91dGxpbmUnKTtcblxuICAgIGlmIChmb3JtV3JhcHBlcikge1xuICAgICAgZm9ybVdyYXBwZXIuY2hpbGROb2Rlcy5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsLCAnZm9jdXMnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsLCAnYmx1cicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=