/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { DefaultAvatarOptions } from '../avatar.class';
export var /** @type {?} */ CONFIG = new InjectionToken('config');
var AvatarService = /** @class */ (function () {
    function AvatarService(config) {
        this.Avatarconfig = new DefaultAvatarOptions;
        if (config) {
            this.Avatarconfig = tslib_1.__assign({}, this.Avatarconfig, config);
        }
    }
    /**
     * @return {?}
     */
    AvatarService.prototype.getAvatarConfig = /**
     * @return {?}
     */
    function () {
        return this.Avatarconfig;
    };
    AvatarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AvatarService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] }
    ]; };
    return AvatarService;
}());
export { AvatarService };
function AvatarService_tsickle_Closure_declarations() {
    /** @type {?} */
    AvatarService.prototype.Avatarconfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9hdmF0YXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQW1CLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFeEUsTUFBTSxDQUFDLHFCQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFNakQsdUJBQTZCLE1BQXNCOzRCQURwQyxJQUFJLG9CQUFvQjtRQUVyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFlBQVksd0JBQU8sSUFBSSxDQUFDLFlBQVksRUFBSSxNQUFNLENBQUMsQ0FBQztTQUN0RDtLQUNGOzs7O0lBRUQsdUNBQWU7OztJQUFmO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7O2dCQVpGLFVBQVU7Ozs7Z0RBSUssTUFBTSxTQUFDLE1BQU07O3dCQVQ3Qjs7U0FNYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdGlvblRva2VuLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBdmF0YXJPcHRpb25zICwgRGVmYXVsdEF2YXRhck9wdGlvbnMgfSBmcm9tICcuLi9hdmF0YXIuY2xhc3MnO1xuXG5leHBvcnQgY29uc3QgQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdjb25maWcnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YXRhclNlcnZpY2Uge1xuICBcbiAgQXZhdGFyY29uZmlnID0gbmV3IERlZmF1bHRBdmF0YXJPcHRpb25zO1xuICBjb25zdHJ1Y3RvciggQEluamVjdChDT05GSUcpIGNvbmZpZzogSUF2YXRhck9wdGlvbnMpe1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIHRoaXMuQXZhdGFyY29uZmlnID0gey4uLnRoaXMuQXZhdGFyY29uZmlnLC4uLmNvbmZpZ307XG4gICAgfVxuICB9XG5cbiAgZ2V0QXZhdGFyQ29uZmlnKCl7XG4gICAgcmV0dXJuIHRoaXMuQXZhdGFyY29uZmlnO1xuICB9XG59XG4iXX0=