import { InjectionToken } from '@angular/core';
import { IAvatarOptions, DefaultAvatarOptions } from '../avatar.class';
export declare const CONFIG: InjectionToken<{}>;
export declare class AvatarService {
    Avatarconfig: DefaultAvatarOptions;
    constructor(config: IAvatarOptions);
    getAvatarConfig(): DefaultAvatarOptions;
}
