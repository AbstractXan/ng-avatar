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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBaUIsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFhakUsTUFBTTs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXVCO1FBQ3BDLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQTtLQUNGOzs7WUFyQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUM7b0JBQ04sZUFBZTtpQkFDaEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlLCBDT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zIH0gZnJvbSAnLi9hdmF0YXIuY2xhc3MnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBdmF0YXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgQXZhdGFyQ29tcG9uZW50XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IElBdmF0YXJPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEF2YXRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH1cbiAgfVxuIH1cbiJdfQ==