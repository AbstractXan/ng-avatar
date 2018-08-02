/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { DefaultAvatarOptions } from '../avatar.class';
export const /** @type {?} */ CONFIG = new InjectionToken('config');
export class AvatarService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.Avatarconfig = new DefaultAvatarOptions;
        if (config) {
            this.Avatarconfig = Object.assign({}, this.Avatarconfig, config);
        }
    }
    /**
     * @return {?}
     */
    getAvatarConfig() {
        return this.Avatarconfig;
    }
}
AvatarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AvatarService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] }
];
function AvatarService_tsickle_Closure_declarations() {
    /** @type {?} */
    AvatarService.prototype.Avatarconfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hdmF0YXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9hdmF0YXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBbUIsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RSxNQUFNLENBQUMsdUJBQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR25ELE1BQU07Ozs7SUFHSixZQUE2QixNQUFzQjs0QkFEcEMsSUFBSSxvQkFBb0I7UUFFckMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxZQUFZLHFCQUFPLElBQUksQ0FBQyxZQUFZLEVBQUksTUFBTSxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7OztJQUVELGVBQWU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7O1lBWkYsVUFBVTs7Ozs0Q0FJSyxNQUFNLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXZhdGFyT3B0aW9ucyAsIERlZmF1bHRBdmF0YXJPcHRpb25zIH0gZnJvbSAnLi4vYXZhdGFyLmNsYXNzJztcblxuZXhwb3J0IGNvbnN0IENPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbignY29uZmlnJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmF0YXJTZXJ2aWNlIHtcbiAgXG4gIEF2YXRhcmNvbmZpZyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucztcbiAgY29uc3RydWN0b3IoIEBJbmplY3QoQ09ORklHKSBjb25maWc6IElBdmF0YXJPcHRpb25zKXtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICB0aGlzLkF2YXRhcmNvbmZpZyA9IHsuLi50aGlzLkF2YXRhcmNvbmZpZywuLi5jb25maWd9O1xuICAgIH1cbiAgfVxuXG4gIGdldEF2YXRhckNvbmZpZygpe1xuICAgIHJldHVybiB0aGlzLkF2YXRhcmNvbmZpZztcbiAgfVxufVxuIl19