import { ElementRef, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
import { IAvatarOptions, ICssProperty } from '../avatar.class';
import { AvatarService } from '../service/avatar.service';
export declare class Avatar {
    private _el;
    private arg1;
    private arg2;
    el: HTMLElement | string;
    options: IAvatarOptions;
    constructor(_el: HTMLElement | string, arg1: IAvatarOptions | string, arg2?: IAvatarOptions);
    static isDark(color: string): boolean;
    static getElement(_el: HTMLElement | string): HTMLElement;
    static expandProperty(value?: string | number): ICssProperty;
    static getOptions(arg1: IAvatarOptions | string, arg2?: IAvatarOptions): IAvatarOptions;
    update(prop: string, value: string | number): void;
    render(): void;
    private getSlug();
    private getBgColor();
    private getSize();
}
export declare class AvatarComponent implements DoCheck {
    private el;
    private avatarService;
    private differs;
    avatar: Avatar;
    options: IAvatarOptions;
    name: string;
    characters: number;
    image: string;
    bgColor: string;
    textColor: string;
    size: number | string;
    fontSize: number | string;
    rounded: boolean;
    radius: number;
    margin: number | string;
    randomColor: boolean;
    label: string;
    labelBgColor: string;
    labelTextColor: string;
    active: boolean;
    uploadable: boolean;
    upload: EventEmitter<any>;
    differ: any;
    EmitUpload(): void;
    constructor(el: ElementRef, avatarService: AvatarService, differs: KeyValueDiffers);
    ngDoCheck(): void;
}
