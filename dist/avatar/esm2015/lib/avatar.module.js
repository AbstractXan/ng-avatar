/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { CONFIG } from './service/avatar.service';
export class AvatarModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: AvatarModule,
            providers: [
                {
                    provide: CONFIG, useValue: config,
                },
            ]
        };
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBaUIsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFjakUsTUFBTTs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXVCO1FBQ3BDLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQTtLQUNGOzs7WUFyQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUM7b0JBQ04sZUFBZTtpQkFDaEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlLCBDT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zIH0gZnJvbSAnLi9hdmF0YXIuY2xhc3MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEF2YXRhckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOltcbiAgICBBdmF0YXJDb21wb25lbnRcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogSUF2YXRhck9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJze1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQXZhdGFyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05GSUcsIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfVxuICB9XG4gfVxuIl19