import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarService, CONFIG } from './service/avatar.service';
import { DefaultAvatarOptions, IAvatarOptions } from './avatar.class';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvatarComponent
  ],
  exports:[
    AvatarComponent
  ],
})
export class AvatarModule {
  static forRoot(config?: IAvatarOptions): ModuleWithProviders{
    return {
      ngModule: AvatarModule,
      providers: [
        {
          provide: CONFIG, useValue: config,
        },
      ]
    }
  }
 }
