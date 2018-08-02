/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { CONFIG } from './service/avatar.service';
var AvatarModule = /** @class */ (function () {
    function AvatarModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AvatarModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: AvatarModule,
            providers: [
                {
                    provide: CONFIG, useValue: config,
                },
            ]
        };
    };
    AvatarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        AvatarComponent
                    ],
                    exports: [
                        AvatarComponent
                    ],
                },] },
    ];
    return AvatarModule;
}());
export { AvatarModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBaUIsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7O0lBZXhELG9CQUFPOzs7O0lBQWQsVUFBZSxNQUF1QjtRQUNwQyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTTtpQkFDbEM7YUFDRjtTQUNGLENBQUE7S0FDRjs7Z0JBckJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFDO3dCQUNOLGVBQWU7cUJBQ2hCO2lCQUNGOzt1QkFoQkQ7O1NBaUJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF2YXRhckNvbXBvbmVudCB9IGZyb20gJy4vYXZhdGFyL2F2YXRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSwgQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IERlZmF1bHRBdmF0YXJPcHRpb25zLCBJQXZhdGFyT3B0aW9ucyB9IGZyb20gJy4vYXZhdGFyLmNsYXNzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBdmF0YXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgQXZhdGFyQ29tcG9uZW50XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IElBdmF0YXJPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEF2YXRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH1cbiAgfVxuIH1cbiJdfQ==