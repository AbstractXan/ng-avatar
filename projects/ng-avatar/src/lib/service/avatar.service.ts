import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { IAvatarOptions , DefaultAvatarOptions } from '../avatar.class';

export const CONFIG = new InjectionToken('config');

@Injectable()
export class AvatarService {
  
  Avatarconfig = new DefaultAvatarOptions;
  constructor( @Inject(CONFIG) config: IAvatarOptions){
    if (config) {
      this.Avatarconfig = {...this.Avatarconfig, ...config};
    }
  }

  getAvatarConfig(){
    return this.Avatarconfig;
  }
}
