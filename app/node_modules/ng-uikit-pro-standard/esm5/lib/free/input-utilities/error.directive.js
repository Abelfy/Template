/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, HostBinding, ElementRef, Renderer2, ViewEncapsulation, Component, } from '@angular/core';
import { Utils } from '../utils';
/** @type {?} */
var defaultIdNumber = 0;
var MdbErrorDirective = /** @class */ (function () {
    function MdbErrorDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.id = "mdb-error-" + defaultIdNumber++;
        this.errorMsg = true;
        this.messageId = this.id;
        this.utils = new Utils();
    }
    /**
     * @private
     * @return {?}
     */
    MdbErrorDirective.prototype._calculateMarginTop = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parent = this.el.nativeElement.parentNode.querySelector('.form-check');
        /** @type {?} */
        var heightParent = parent ? parent.offsetHeight : null;
        if (heightParent) {
            /** @type {?} */
            var margin = heightParent / 12.5;
            this.el.nativeElement.style.top = heightParent + heightParent / margin + "px";
        }
    };
    /**
     * @return {?}
     */
    MdbErrorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var textarea = this.utils.getClosestEl(this.el.nativeElement, '.md-textarea');
        this._calculateMarginTop();
        if (textarea) {
            /** @type {?} */
            var height_1 = textarea.offsetHeight + 4 + 'px';
            this.renderer.setStyle(this.el.nativeElement, 'top', height_1);
            this.textareaListenFunction = this.renderer.listen(textarea, 'keyup', (/**
             * @return {?}
             */
            function () {
                height_1 = textarea.offsetHeight + 4 + 'px';
                _this.renderer.setStyle(_this.el.nativeElement, 'top', height_1);
            }));
        }
    };
    /**
     * @return {?}
     */
    MdbErrorDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.textareaListenFunction) {
            this.textareaListenFunction();
        }
    };
    MdbErrorDirective.decorators = [
        { type: Component, args: [{
                    selector: 'mdb-error',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: [".error-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#f44336}.success-message{position:absolute;top:40px;left:0;font-size:.8rem;color:#00c851}"]
                }] }
    ];
    /** @nocollapse */
    MdbErrorDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    MdbErrorDirective.propDecorators = {
        id: [{ type: Input }],
        errorMsg: [{ type: HostBinding, args: ['class.error-message',] }],
        messageId: [{ type: HostBinding, args: ['attr.id',] }]
    };
    return MdbErrorDirective;
}());
export { MdbErrorDirective };
if (false) {
    /** @type {?} */
    MdbErrorDirective.prototype.id;
    /** @type {?} */
    MdbErrorDirective.prototype.errorMsg;
    /** @type {?} */
    MdbErrorDirective.prototype.messageId;
    /** @type {?} */
    MdbErrorDirective.prototype.textareaListenFunction;
    /**
     * @type {?}
     * @private
     */
    MdbErrorDirective.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    MdbErrorDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    MdbErrorDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvaW5wdXQtdXRpbGl0aWVzL2Vycm9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxXQUFXLEVBRVgsVUFBVSxFQUNWLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7O0lBRTdCLGVBQWUsR0FBRyxDQUFDO0FBRXZCO0lBaUJFLDJCQUFvQixFQUFjLEVBQVUsUUFBbUI7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFUdEQsT0FBRSxHQUFHLGVBQWEsZUFBZSxFQUFJLENBQUM7UUFFWCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBSXBDLFVBQUssR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRStCLENBQUM7Ozs7O0lBRTNELCtDQUFtQjs7OztJQUEzQjs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7O1lBQ3RFLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDeEQsSUFBSSxZQUFZLEVBQUU7O2dCQUNWLE1BQU0sR0FBRyxZQUFZLEdBQUcsSUFBSTtZQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFNLFlBQVksR0FBRyxZQUFZLEdBQUcsTUFBTSxPQUFJLENBQUM7U0FDL0U7SUFDSCxDQUFDOzs7O0lBRUQsb0NBQVE7OztJQUFSO1FBQUEsaUJBWUM7O1lBWE8sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztRQUMvRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLFFBQVEsRUFBRTs7Z0JBQ1IsUUFBTSxHQUFHLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQU0sQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTzs7O1lBQUU7Z0JBQ3BFLFFBQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFNLENBQUMsQ0FBQztZQUMvRCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Z0JBOUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLDJCQUEyQjtvQkFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFmQyxVQUFVO2dCQUNWLFNBQVM7OztxQkFpQlIsS0FBSzsyQkFFTCxXQUFXLFNBQUMscUJBQXFCOzRCQUNqQyxXQUFXLFNBQUMsU0FBUzs7SUFvQ3hCLHdCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0F4Q1ksaUJBQWlCOzs7SUFDNUIsK0JBQStDOztJQUUvQyxxQ0FBb0Q7O0lBQ3BELHNDQUE0Qzs7SUFFNUMsbURBQWlDOzs7OztJQUVqQyxrQ0FBbUM7Ozs7O0lBRXZCLCtCQUFzQjs7Ozs7SUFBRSxxQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbnB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDb21wb25lbnQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmxldCBkZWZhdWx0SWROdW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZXJyb3InLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC11dGlsaXRpZXMtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYkVycm9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpZCA9IGBtZGItZXJyb3ItJHtkZWZhdWx0SWROdW1iZXIrK31gO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZXJyb3ItbWVzc2FnZScpIGVycm9yTXNnID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgbWVzc2FnZUlkID0gdGhpcy5pZDtcblxuICB0ZXh0YXJlYUxpc3RlbkZ1bmN0aW9uOiBGdW5jdGlvbjtcblxuICBwcml2YXRlIHV0aWxzOiBVdGlscyA9IG5ldyBVdGlscygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwcml2YXRlIF9jYWxjdWxhdGVNYXJnaW5Ub3AoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmZvcm0tY2hlY2snKTtcbiAgICBjb25zdCBoZWlnaHRQYXJlbnQgPSBwYXJlbnQgPyBwYXJlbnQub2Zmc2V0SGVpZ2h0IDogbnVsbDtcbiAgICBpZiAoaGVpZ2h0UGFyZW50KSB7XG4gICAgICBjb25zdCBtYXJnaW4gPSBoZWlnaHRQYXJlbnQgLyAxMi41O1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGAke2hlaWdodFBhcmVudCArIGhlaWdodFBhcmVudCAvIG1hcmdpbn1weGA7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLnV0aWxzLmdldENsb3Nlc3RFbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcubWQtdGV4dGFyZWEnKTtcbiAgICB0aGlzLl9jYWxjdWxhdGVNYXJnaW5Ub3AoKTtcbiAgICBpZiAodGV4dGFyZWEpIHtcbiAgICAgIGxldCBoZWlnaHQgPSB0ZXh0YXJlYS5vZmZzZXRIZWlnaHQgKyA0ICsgJ3B4JztcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9wJywgaGVpZ2h0KTtcblxuICAgICAgdGhpcy50ZXh0YXJlYUxpc3RlbkZ1bmN0aW9uID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGV4dGFyZWEsICdrZXl1cCcsICgpID0+IHtcbiAgICAgICAgaGVpZ2h0ID0gdGV4dGFyZWEub2Zmc2V0SGVpZ2h0ICsgNCArICdweCc7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndG9wJywgaGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRleHRhcmVhTGlzdGVuRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMudGV4dGFyZWFMaXN0ZW5GdW5jdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19