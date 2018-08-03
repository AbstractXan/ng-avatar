import { Injectable, InjectionToken, Inject, ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers, NgModule } from '@angular/core';
import * as SVG_ from 'svg.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ defaultColor = '#29b6f6';
const /** @type {?} */ defaultLabelColor = '#f44336';
const /** @type {?} */ palette = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B'
];
/** @enum {number} */
const Size = {
    xs: 30,
    "extra-small": 30,
    sm: 40,
    small: 40,
    md: 50,
    medium: 50,
    lg: 60,
    large: 60,
    xl: 80,
    "extra-large": 80,
};
Size[Size.xs] = "xs";
Size[Size["extra-small"]] = "extra-small";
Size[Size.sm] = "sm";
Size[Size.small] = "small";
Size[Size.md] = "md";
Size[Size.medium] = "medium";
Size[Size.lg] = "lg";
Size[Size.large] = "large";
Size[Size.xl] = "xl";
Size[Size["extra-large"]] = "extra-large";
class DefaultAvatarOptions {
    constructor() {
        this.name = '';
        this.characters = 2;
        this.image = '';
        this.randomColor = false;
        this.bgColor = this.randomColor ? palette[Math.floor(Math.random() * palette.length)] : defaultColor;
        this.textColor = '#fff';
        this.size = Size['md'];
        this.fontSize = this.size * 0.4;
        this.rounded = true;
        this.radius = 0;
        this.margin = 0;
        this.label = '';
        this.labelBgColor = defaultLabelColor;
        this.labelTextColor = '#fff';
        this.active = true;
        this.uploadable = false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ CONFIG = new InjectionToken('config');
class AvatarService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ SVG = SVG_;
class Avatar {
    /**
     * @param {?} _el
     * @param {?} arg1
     * @param {?=} arg2
     */
    constructor(_el, arg1, arg2) {
        this._el = _el;
        this.arg1 = arg1;
        this.arg2 = arg2;
        if (!this.arg1) {
            return;
        }
        this.el = Avatar.getElement(_el);
        this.options = Avatar.getOptions(arg1, arg2);
        this.render();
    }
    /**
     * @param {?} color
     * @return {?}
     */
    static isDark(color) {
        let /** @type {?} */ r;
        let /** @type {?} */ b;
        let /** @type {?} */ g;
        let /** @type {?} */ hsp;
        let /** @type {?} */ a = color;
        if (a.match(/^rgb/)) {
            a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            r = a[1];
            g = a[2];
            b = a[3];
        }
        else {
            a = +('0x' + a.slice(1).replace(a.length < 5 && /./g, '$&$&'));
            r = a >> 16; // tslint:disable-line
            b = a >> 8 & 255; // tslint:disable-line
            g = a & 255; // tslint:disable-line
        }
        hsp = Math.sqrt(0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b));
        return (hsp < 200);
    }
    /**
     * @param {?} _el
     * @return {?}
     */
    static getElement(_el) {
        if (!_el) {
            throw new Error('Element not provided');
        }
        switch (typeof _el) {
            case 'string':
                const /** @type {?} */ el = document.getElementById((/** @type {?} */ (_el)));
                if (el) {
                    return (/** @type {?} */ (el));
                }
                else {
                    throw new Error('Element is not present');
                }
            default:
                return (/** @type {?} */ (_el));
        }
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    static expandProperty(value) {
        const /** @type {?} */ returnObj = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        if (value) {
            switch (typeof value) {
                case 'number':
                    returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = (/** @type {?} */ (value));
                    break;
                case 'string':
                    const /** @type {?} */ properties = (/** @type {?} */ (value)).split(' ').map((m) => +m.replace(/\D/g, ''));
                    switch (properties.length) {
                        case 1:
                            returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = properties[0];
                            break;
                        case 2:
                            returnObj.left = returnObj.right = properties[1];
                            break;
                        case 3:
                            returnObj.left = returnObj.right = properties[1];
                            returnObj.bottom = properties[2];
                            break;
                        case 4:
                            returnObj.right = properties[1];
                            returnObj.bottom = properties[2];
                            returnObj.left = properties[3];
                            break;
                    }
                    break;
            }
        }
        return returnObj;
    }
    /**
     * @param {?} arg1
     * @param {?=} arg2
     * @return {?}
     */
    static getOptions(arg1, arg2) {
        const /** @type {?} */ _default = new DefaultAvatarOptions();
        let /** @type {?} */ _options = Object.assign({}, _default);
        switch (typeof arg1) {
            case 'string':
                _options.name = (/** @type {?} */ (arg1));
                break;
            case 'object':
                if (!(/** @type {?} */ (arg1)).name) {
                    throw new Error('Name is required');
                }
                _options = Object.assign({}, _options, (/** @type {?} */ (arg1)));
                break;
        }
        if (arg2 && typeof arg2 === 'object') {
            _options = Object.assign({}, _options, (/** @type {?} */ (arg2)));
        }
        for (const /** @type {?} */ key in _options) {
            if (typeof _options[key] === 'undefined') {
                _options[key] = _default[key];
            }
        }
        if (typeof _options.size === 'string') {
            _options.size = Size[(/** @type {?} */ (_options.size))];
            if (!_options.size) {
                _options.size = Size['md'];
            }
        }
        _options.fontSize = (/** @type {?} */ (_options.size)) * 0.4;
        if (!Avatar.isDark((/** @type {?} */ (_options.bgColor)))) {
            _options.textColor = '#000';
        }
        if (_options.label && !Avatar.isDark((/** @type {?} */ (_options.labelBgColor)))) {
            _options.labelTextColor = '#000';
        }
        return Object.assign({}, _options);
    }
    /**
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    update(prop, value) {
        this.options = /** @type {?} */ (Object.assign({}, this.options, { [prop]: value }));
        this.render();
    }
    /**
     * @return {?}
     */
    render() {
        (/** @type {?} */ (this.el)).innerHTML = '';
        const /** @type {?} */ svgElement = SVG((/** @type {?} */ (this.el)));
        const { top, right, bottom, left } = Avatar.expandProperty(this.options.margin);
        const /** @type {?} */ size = this.getSize();
        this.options.fontSize = size * 0.4;
        svgElement.size(size + left + right, size + top + bottom);
        let /** @type {?} */ shape;
        let /** @type {?} */ uploadShape;
        let /** @type {?} */ uploadIcon;
        let /** @type {?} */ image;
        let /** @type {?} */ text;
        let /** @type {?} */ label;
        let /** @type {?} */ labelText;
        //Rounded
        //Boxed
        //Rounded Box (if radius is provided)
        if (this.options.rounded == true) {
            shape = svgElement
                .circle(size);
        }
        else {
            shape = svgElement
                .rect(size, size)
                .radius((/** @type {?} */ (this.options.radius)));
        }
        //Bg-Color
        //Active
        shape
            .fill(this.getBgColor())
            .attr('fill-opacity', this.options.active ? 1 : 0.5)
            .move(left, top);
        //image
        if (this.options.image) {
            const /** @type {?} */ that = this;
            image = svgElement.image(this.options.image).loaded(function () {
                let /** @type {?} */ c;
                if (that.options.rounded) {
                    c = svgElement.circle(size - 4);
                }
                else {
                    c = svgElement.rect(size - 4, size - 4).radius((/** @type {?} */ (that.options.radius)));
                }
                c.move(left + 2, top + 2);
                this.size(size)
                    .center((size / 2) + left, (size / 2) + top).clipWith(c);
            });
        }
        //text
        text = svgElement
            .text(this.getSlug())
            .attr('fill-opacity', this.options.active ? 1 : 0.8)
            .fill(this.options.textColor)
            .font({
            size: this.options.fontSize,
        })
            .center((size / 2) + left, (size / 2) + top);
        //label
        if (this.options.label) {
            label = svgElement
                .rect(size, size * 0.25)
                .radius(2)
                .fill(this.options.labelBgColor)
                .attr('fill-opacity', this.options.active ? 1 : 0.8)
                .move(left, top + size - (size * 0.25));
            labelText = svgElement
                .text(this.options.label)
                .fill(this.options.labelTextColor)
                .font({
                size: size * 0.25
            })
                .center((size / 2) + left, top + size - ((size * 0.25) / 2));
        }
        //upload
        if (this.options.uploadable == true) {
            if (this.options.rounded == true) {
                uploadShape = svgElement
                    .circle(size);
            }
            else {
                uploadShape = svgElement
                    .rect(size, size)
                    .radius((/** @type {?} */ (this.options.radius)));
            }
            uploadShape
                .fill("grey")
                .attr('fill-opacity', 0)
                .move(left, top);
            //UploadIcon
            const /** @type {?} */ that = this;
            uploadIcon = svgElement.image("../assets/images/camera.svg").loaded(function () {
                let /** @type {?} */ c;
                if (that.options.rounded) {
                    c = svgElement.circle(size - 4);
                }
                else {
                    c = svgElement.rect(size - 4, size - 4).radius((/** @type {?} */ (that.options.radius)));
                }
                c.move(left + 2, top + 2);
                this.size(size * 0.5)
                    .center((size / 2) + left, (size / 2) + top).clipWith(c)
                    .attr('opacity', 0);
            });
            svgElement.mouseover(function () {
                shape.attr('fill-opacity', 0.25);
                uploadShape
                    .attr('fill-opacity', 0.75);
                uploadIcon
                    .attr('opacity', 1);
                text.attr('fill-opacity', 0.25);
                if (label != null) {
                    label.attr('fill-opacity', 0);
                    labelText.attr('fill-opacity', 0.25);
                }
                if (image != null) {
                    image.attr('opacity', 0.25);
                }
            });
            svgElement.mouseout(function () {
                shape.attr('fill-opacity', 1);
                uploadShape.attr('fill-opacity', 0);
                uploadIcon.attr('opacity', 0);
                text.attr('fill-opacity', 1);
                if (label != null) {
                    label
                        .attr('fill-opacity', 1);
                    labelText.attr('fill-opacity', 1);
                }
                if (image != null) {
                    image.attr('opacity', 1);
                }
            });
        }
    }
    /**
     * @return {?}
     */
    getSlug() {
        //Return nothing if DNE
        if (!this.options.name) {
            return '';
        }
        var /** @type {?} */ initials;
        if (this.options.name && this.options.name.length) {
            const /** @type {?} */ nameInitials = this.options.name.match(/\b(\w)/g);
            if (nameInitials) {
                const /** @type {?} */ nameChars = nameInitials.slice(0, this.options.characters + 1).join('');
                initials = nameChars.toUpperCase();
            }
            else {
                initials = this.options.name[0];
            }
            //Return the set no. of characters
            return initials.slice(0, this.options.characters);
        }
    }
    /**
     * @return {?}
     */
    getBgColor() {
        if (this.options.randomColor) {
            return palette[Math.floor(Math.random() * palette.length)];
        }
        else {
            return this.options.bgColor;
        }
    }
    /**
     * @return {?}
     */
    getSize() {
        if (typeof this.options.size === 'number') {
            return this.options.size;
        }
        else if (typeof Size[(this.options.size)] == 'number') {
            return Size[(this.options.size)];
        }
        else {
            return Size['md'];
        }
    }
}
class AvatarComponent {
    /**
     * @param {?} el
     * @param {?} avatarService
     * @param {?} differs
     */
    constructor(el, avatarService, differs) {
        this.el = el;
        this.avatarService = avatarService;
        this.differs = differs;
        this.upload = new EventEmitter();
        this.differ = this.differs.find({}).create();
        this.options = this.avatarService.getAvatarConfig();
        this.avatar = new Avatar(this.el.nativeElement, this.image || this.name || this.options.name || this.options.image, this.options);
    }
    /**
     * @return {?}
     */
    EmitUpload() {
        if (this.uploadable == true) {
            this.upload.emit();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.options = this.avatarService.getAvatarConfig();
        this.options.name = (this.name) ? this.name : this.options.name;
        this.options.image = (this.image) ? this.image : this.options.image;
        this.options.bgColor = (this.bgColor) ? this.bgColor : this.options.bgColor;
        this.options.characters = (this.characters) ? this.characters : this.options.characters;
        this.options.textColor = (this.textColor) ? this.textColor : this.options.textColor;
        this.options.size = (this.size) ? this.size : this.options.size;
        this.options.fontSize = (this.fontSize) ? this.fontSize : this.options.fontSize;
        this.options.rounded = (this.rounded) ? this.rounded : this.options.rounded;
        this.options.radius = (this.radius) ? this.radius : this.options.radius;
        this.options.margin = (this.margin) ? this.margin : this.options.margin;
        this.options.randomColor = (this.randomColor) ? this.randomColor : this.options.randomColor;
        this.options.label = (this.label) ? this.label : this.options.label;
        this.options.labelBgColor = (this.labelBgColor) ? this.labelBgColor : this.options.labelBgColor;
        this.options.labelTextColor = (this.labelTextColor) ? this.labelTextColor : this.options.labelTextColor;
        this.options.active = (this.active) ? this.active : this.options.active;
        this.options.uploadable = (this.uploadable) ? this.uploadable : this.options.uploadable;
        var /** @type {?} */ changes = this.differ.diff(this.options);
        console.log(this.options);
        if (changes) {
            console.log('change detected');
            changes.forEachChangedItem(r => console.log('changed', r.key));
            changes.forEachChangedItem(r => this.avatar.update(r.key, r.currentValue));
            changes.forEachAddedItem(r => console.log('added ', r.key, r.currentValue));
            changes.forEachAddedItem(r => this.avatar.update(r.key, r.currentValue));
            changes.forEachRemovedItem(r => console.log('removed ', r.key));
            changes.forEachRemovedItem(r => this.avatar.update(r.key, r.currentValue));
            // this.avatar = new Avatar(this.el.nativeElement, this.image || this.name || this.options.name || this.options.image, this.options);
        }
        else {
            console.log('nothing changed');
        }
    }
}
AvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-avatar',
                template: `<!--  -->`,
                providers: [AvatarService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AvatarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: AvatarService },
    { type: KeyValueDiffers }
];
AvatarComponent.propDecorators = {
    options: [{ type: Input }],
    name: [{ type: Input }],
    characters: [{ type: Input }],
    image: [{ type: Input }],
    bgColor: [{ type: Input }],
    textColor: [{ type: Input }],
    size: [{ type: Input }],
    fontSize: [{ type: Input }],
    rounded: [{ type: Input }],
    radius: [{ type: Input }],
    margin: [{ type: Input }],
    randomColor: [{ type: Input }],
    label: [{ type: Input }],
    labelBgColor: [{ type: Input }],
    labelTextColor: [{ type: Input }],
    active: [{ type: Input }],
    uploadable: [{ type: Input }],
    upload: [{ type: Output }],
    EmitUpload: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AvatarModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CONFIG, AvatarService, Avatar, AvatarComponent, AvatarModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5jbGFzcy50cyIsIm5nOi8vYXZhdGFyL2xpYi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlLnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci9hdmF0YXIuY29tcG9uZW50LnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9ICcjMjliNmY2JztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMYWJlbENvbG9yID0gJyNmNDQzMzYnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdEludml0ZWRDb2xvciA9ICcjRkY5ODAwJztcclxuZXhwb3J0IGNvbnN0IHBhbGV0dGUgPSBbXHJcbiAgJyNmNDQzMzYnLFxyXG4gICcjRTkxRTYzJyxcclxuICAnIzlDMjdCMCcsXHJcbiAgJyM2NzNBQjcnLFxyXG4gICcjM0Y1MUI1JyxcclxuICAnIzIxOTZGMycsXHJcbiAgJyMwM0E5RjQnLFxyXG4gICcjMDBCQ0Q0JyxcclxuICAnIzAwOTY4OCcsXHJcbiAgJyM0Q0FGNTAnLFxyXG4gICcjOEJDMzRBJyxcclxuICAnI0NEREMzOScsXHJcbiAgJyNGRkMxMDcnLFxyXG4gICcjRkY5ODAwJyxcclxuICAnI0ZGNTcyMicsXHJcbiAgJyM3OTU1NDgnLFxyXG4gICcjOUU5RTlFJyxcclxuICAnIzYwN0Q4QidcclxuXTtcclxuXHJcbmV4cG9ydCBlbnVtIFNpemUge1xyXG4gIHhzID0gMzAsXHJcbiAgJ2V4dHJhLXNtYWxsJyA9IDMwLFxyXG4gIHNtID0gNDAsXHJcbiAgc21hbGwgPSA0MCxcclxuICBtZCA9IDUwLFxyXG4gIG1lZGl1bSA9IDUwLFxyXG4gIGxnID0gNjAsXHJcbiAgbGFyZ2UgPSA2MCxcclxuICB4bCA9IDgwLFxyXG4gICdleHRyYS1sYXJnZScgPSA4MFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBdmF0YXJPcHRpb25zIHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM/OiBudW1iZXI7XHJcbiAgaW1hZ2U/OiBzdHJpbmc7XHJcbiAgYmdDb2xvcj86IHN0cmluZztcclxuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgc2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICBmb250U2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkPzogYm9vbGVhbjtcclxuICByYWRpdXM/OiBudW1iZXI7XHJcbiAgbWFyZ2luPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yPzogYm9vbGVhbjtcclxuICBsYWJlbD86IHN0cmluZztcclxuICBsYWJlbEJnQ29sb3I/OiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgYWN0aXZlPzogYm9vbGVhbjtcclxuICB1cGxvYWRhYmxlPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ3NzUHJvcGVydHkge1xyXG4gIHRvcDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEF2YXRhck9wdGlvbnMgaW1wbGVtZW50cyBJQXZhdGFyT3B0aW9ucyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM6IG51bWJlcjtcclxuICBpbWFnZTogc3RyaW5nO1xyXG4gIGJnQ29sb3I6IHN0cmluZztcclxuICB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBzaXplOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgZm9udFNpemU6IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkOiBib29sZWFuO1xyXG4gIHJhZGl1czogbnVtYmVyO1xyXG4gIG1hcmdpbjogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yOiBib29sZWFuO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgbGFiZWxCZ0NvbG9yOiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I6IHN0cmluZztcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgdXBsb2FkYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMuY2hhcmFjdGVycyA9IDI7XHJcbiAgICB0aGlzLmltYWdlID0gJyc7XHJcbiAgICB0aGlzLnJhbmRvbUNvbG9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLnJhbmRvbUNvbG9yID8gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldIDogZGVmYXVsdENvbG9yO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICB0aGlzLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgdGhpcy5mb250U2l6ZSA9IHRoaXMuc2l6ZSAqIDAuNDtcclxuICAgIHRoaXMucm91bmRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnJhZGl1cyA9IDA7XHJcbiAgICB0aGlzLm1hcmdpbiA9IDA7XHJcbiAgICB0aGlzLmxhYmVsID0gJyc7XHJcbiAgICB0aGlzLmxhYmVsQmdDb2xvciA9IGRlZmF1bHRMYWJlbENvbG9yO1xyXG4gICAgdGhpcy5sYWJlbFRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMudXBsb2FkYWJsZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0aW9uVG9rZW4sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUF2YXRhck9wdGlvbnMgLCBEZWZhdWx0QXZhdGFyT3B0aW9ucyB9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBDT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2NvbmZpZycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyU2VydmljZSB7XG4gIFxuICBBdmF0YXJjb25maWcgPSBuZXcgRGVmYXVsdEF2YXRhck9wdGlvbnM7XG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KENPTkZJRykgY29uZmlnOiBJQXZhdGFyT3B0aW9ucyl7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5BdmF0YXJjb25maWcgPSB7Li4udGhpcy5BdmF0YXJjb25maWcsLi4uY29uZmlnfTtcbiAgICB9XG4gIH1cblxuICBnZXRBdmF0YXJDb25maWcoKXtcbiAgICByZXR1cm4gdGhpcy5BdmF0YXJjb25maWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcclxuICBDb21wb25lbnQsIFxyXG4gIEVsZW1lbnRSZWYsIFxyXG4gIElucHV0LCBcclxuICBPbkNoYW5nZXMsIFxyXG4gIEhvc3RMaXN0ZW5lciwgXHJcbiAgRXZlbnRFbWl0dGVyLCBcclxuICBPdXRwdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgU1ZHXyBmcm9tICdzdmcuanMnO1xyXG5jb25zdCBTVkcgPSBTVkdfO1xyXG5cclxuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zLCBJQ3NzUHJvcGVydHksIFNpemUsIHBhbGV0dGV9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XHJcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdmF0YXIge1xyXG4gIC8vIEhUTUwgRWxlbWVudFxyXG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZztcclxuICAvLyBBdmF0YXIgT3B0aW9ucyBcclxuICBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuXHJcbiAgLy9TZXQgdmFsdWVzIG9mIGVsZW1lbnQsIG9wdGlvbnMsXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCBwcml2YXRlIGFyZzE6IElBdmF0YXJPcHRpb25zIHwgc3RyaW5nLCBwcml2YXRlIGFyZzI/OiBJQXZhdGFyT3B0aW9ucykge1xyXG4gICAgaWYgKCF0aGlzLmFyZzEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbCA9IEF2YXRhci5nZXRFbGVtZW50KF9lbCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBBdmF0YXIuZ2V0T3B0aW9ucyhhcmcxLCBhcmcyKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNEYXJrKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIGxldCByOiBhbnk7XHJcbiAgICBsZXQgYjogYW55O1xyXG4gICAgbGV0IGc6IGFueTtcclxuICAgIGxldCBoc3A6IGFueTtcclxuICAgIGxldCBhOiBhbnkgPSBjb2xvcjtcclxuXHJcbiAgICBpZiAoYS5tYXRjaCgvXnJnYi8pKSB7XHJcbiAgICAgIGEgPSBhLm1hdGNoKC9ecmdiYT9cXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspKD86LFxccyooXFxkKyg/OlxcLlxcZCspPykpP1xcKSQvKTtcclxuICAgICAgciA9IGFbMV07XHJcbiAgICAgIGcgPSBhWzJdO1xyXG4gICAgICBiID0gYVszXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGEgPSArKCcweCcgKyBhLnNsaWNlKDEpLnJlcGxhY2UoXHJcbiAgICAgICAgICBhLmxlbmd0aCA8IDUgJiYgLy4vZywgJyQmJCYnXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICByID0gYSA+PiAxNjsgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgYiA9IGEgPj4gOCAmIDI1NTsgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgIGcgPSBhICYgMjU1OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgaHNwID0gTWF0aC5zcXJ0KFxyXG4gICAgICAwLjI5OSAqIChyICogcikgK1xyXG4gICAgICAwLjU4NyAqIChnICogZykgK1xyXG4gICAgICAwLjExNCAqIChiICogYilcclxuICAgICk7XHJcbiAgICByZXR1cm4gKGhzcCA8IDIwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudChfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgaWYgKCFfZWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBwcm92aWRlZCcpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0eXBlb2YgX2VsKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoX2VsIGFzIHN0cmluZykpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgcmV0dXJuIChlbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBpcyBub3QgcHJlc2VudCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gKF9lbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhwYW5kUHJvcGVydHkodmFsdWU/OiBzdHJpbmcgfCBudW1iZXIpOiBJQ3NzUHJvcGVydHkge1xyXG4gICAgY29uc3QgcmV0dXJuT2JqOiBJQ3NzUHJvcGVydHkgPSB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMFxyXG4gICAgfTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gKHZhbHVlIGFzIG51bWJlcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9ICh2YWx1ZSBhcyBzdHJpbmcpLnNwbGl0KCcgJykubWFwKChtOiBzdHJpbmcpID0+ICttLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xyXG4gICAgICAgICAgc3dpdGNoIChwcm9wZXJ0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLnRvcCA9IHJldHVybk9iai5ib3R0b20gPSByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMF07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoucmlnaHQgPSBwcm9wZXJ0aWVzWzFdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5ib3R0b20gPSBwcm9wZXJ0aWVzWzJdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcHJvcGVydGllc1szXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldE9wdGlvbnMoYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIGFyZzI/OiBJQXZhdGFyT3B0aW9ucyk6IElBdmF0YXJPcHRpb25zIHtcclxuICAgIGNvbnN0IF9kZWZhdWx0OiBJQXZhdGFyT3B0aW9ucyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucygpO1xyXG4gICAgbGV0IF9vcHRpb25zOiBJQXZhdGFyT3B0aW9ucyA9IHsgLi4uX2RlZmF1bHQgfTtcclxuICAgIHN3aXRjaCAodHlwZW9mIGFyZzEpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBfb3B0aW9ucy5uYW1lID0gKGFyZzEgYXMgc3RyaW5nKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICBpZiAoIShhcmcxIGFzIElBdmF0YXJPcHRpb25zKS5uYW1lKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgcmVxdWlyZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX29wdGlvbnMgPSB7IC4uLl9vcHRpb25zLCAuLi4oYXJnMSBhcyBJQXZhdGFyT3B0aW9ucykgfTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChhcmcyICYmIHR5cGVvZiBhcmcyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcyIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX29wdGlvbnMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBfb3B0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIF9vcHRpb25zW2tleV0gPSBfZGVmYXVsdFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9vcHRpb25zLnNpemUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWyhfb3B0aW9ucy5zaXplIGFzIGFueSldO1xyXG4gICAgICBpZiAoIV9vcHRpb25zLnNpemUpIHtcclxuICAgICAgICBfb3B0aW9ucy5zaXplID0gU2l6ZVsnbWQnXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfb3B0aW9ucy5mb250U2l6ZSA9IChfb3B0aW9ucy5zaXplIGFzIG51bWJlcikgKiAwLjQ7XHJcblxyXG4gICAgaWYgKCFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5iZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLnRleHRDb2xvciA9ICcjMDAwJztcclxuICAgIH1cclxuICAgIGlmIChfb3B0aW9ucy5sYWJlbCAmJiAhQXZhdGFyLmlzRGFyaygoX29wdGlvbnMubGFiZWxCZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLmxhYmVsVGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgLi4uX29wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxJQXZhdGFyT3B0aW9ucz57XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgW3Byb3BdOiB2YWx1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAodGhpcy5lbCBhcyBIVE1MRWxlbWVudCkuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCBzdmdFbGVtZW50ID0gU1ZHKCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICBjb25zdCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCB9ID0gQXZhdGFyLmV4cGFuZFByb3BlcnR5KHRoaXMub3B0aW9ucy5tYXJnaW4pO1xyXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG4gICAgXHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSBzaXplICogMC40O1xyXG4gICAgc3ZnRWxlbWVudC5zaXplKHNpemUgKyBsZWZ0ICsgcmlnaHQsIHNpemUgKyB0b3AgKyBib3R0b20pO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IHNoYXBlOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkU2hhcGUgOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkSWNvbjogYW55O1xyXG4gICAgbGV0IGltYWdlOiBhbnk7XHJcbiAgICBsZXQgdGV4dDogYW55O1xyXG4gICAgbGV0IGxhYmVsOiBhbnk7XHJcbiAgICBsZXQgbGFiZWxUZXh0OiBhbnk7XHJcblxyXG4gICAgLy9Sb3VuZGVkXHJcbiAgICAvL0JveGVkXHJcbiAgICAvL1JvdW5kZWQgQm94IChpZiByYWRpdXMgaXMgcHJvdmlkZWQpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdW5kZWQ9PXRydWUpIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLmNpcmNsZShzaXplKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0JnLUNvbG9yXHJcbiAgICAvL0FjdGl2ZVxyXG4gICAgc2hhcGVcclxuICAgICAgLmZpbGwodGhpcy5nZXRCZ0NvbG9yKCkpXHJcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuNSlcclxuICAgICAgLm1vdmUobGVmdCwgdG9wKTtcclxuICAgXHJcbiAgICAgIFxyXG4gICAgLy9pbWFnZVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWFnZSkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgaW1hZ2UgPSBzdmdFbGVtZW50LmltYWdlKHRoaXMub3B0aW9ucy5pbWFnZSkubG9hZGVkKGZ1bmN0aW9uKHRoaXM6IFNWR18uSW1hZ2UpIHtcclxuICAgICAgICBsZXQgYzogYW55O1xyXG4gICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQuY2lyY2xlKHNpemUgLSA0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy5tb3ZlKGxlZnQgKyAyLCB0b3AgKyAyKTtcclxuICAgICAgICB0aGlzLnNpemUoc2l6ZSlcclxuICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAgLy90ZXh0XHJcbiAgICAgdGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAudGV4dCh0aGlzLmdldFNsdWcoKSlcclxuICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgLmZpbGwodGhpcy5vcHRpb25zLnRleHRDb2xvcilcclxuICAgICAuZm9udCh7XHJcbiAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5mb250U2l6ZSxcclxuICAgICB9KVxyXG4gICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApO1xyXG5cclxuICAgIC8vbGFiZWxcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGFiZWwpIHtcclxuICAgICAgbGFiZWwgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSAqIDAuMjUpXHJcbiAgICAgICAgLnJhZGl1cygyKVxyXG4gICAgICAgIC5maWxsKHRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IpXHJcbiAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC44KVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCArIHNpemUgLSAoc2l6ZSAqIDAuMjUpKTtcclxuXHJcbiAgICAgIGxhYmVsVGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAudGV4dCh0aGlzLm9wdGlvbnMubGFiZWwpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yKVxyXG4gICAgICAgIC5mb250KHtcclxuICAgICAgICAgIHNpemU6IHNpemUgKiAwLjI1XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCB0b3AgKyBzaXplIC0gKChzaXplICogMC4yNSkgLyAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy91cGxvYWRcclxuICAgIGlmKHRoaXMub3B0aW9ucy51cGxvYWRhYmxlPT10cnVlKXtcclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICAgIHVwbG9hZFNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgICAgLmNpcmNsZShzaXplKTsgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAucmVjdChzaXplLCBzaXplKVxyXG4gICAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAuZmlsbChcImdyZXlcIilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMClcclxuICAgICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG5cclxuICAgICAgLy9VcGxvYWRJY29uXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB1cGxvYWRJY29uID0gc3ZnRWxlbWVudC5pbWFnZShcIi4uL2Fzc2V0cy9pbWFnZXMvY2FtZXJhLnN2Z1wiKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHXy5JbWFnZSkge1xyXG4gICAgICAgICAgbGV0IGM6IGFueTtcclxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMubW92ZShsZWZ0ICsgMiwgdG9wICsgMik7XHJcbiAgICAgICAgICB0aGlzLnNpemUoc2l6ZSowLjUpXHJcbiAgICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHN2Z0VsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjc1KTtcclxuICAgICAgICBcclxuICAgICAgICB1cGxvYWRJY29uXHJcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsIT1udWxsKXtcclxuICAgICAgICBsYWJlbC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMC4yNSk7fVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHVwbG9hZFNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHVwbG9hZEljb24uYXR0cignb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgbGFiZWxUZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMSk7fVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vUHJpbnQgSW5pdGlhbHNcclxuICBwcml2YXRlIGdldFNsdWcoKSB7XHJcbiAgICAvL1JldHVybiBub3RoaW5nIGlmIERORVxyXG4gICAgaWYoIXRoaXMub3B0aW9ucy5uYW1lKXtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIGluaXRpYWxzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lICYmIHRoaXMub3B0aW9ucy5uYW1lLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBuYW1lSW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZS5tYXRjaCgvXFxiKFxcdykvZyk7XHJcbiAgICAgIGlmIChuYW1lSW5pdGlhbHMpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBuYW1lQ2hhcnMgPSBuYW1lSW5pdGlhbHMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnMrMSkuam9pbignJyk7XHJcbiAgICAgICAgaW5pdGlhbHMgPSBuYW1lQ2hhcnMudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZVswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9SZXR1cm4gdGhlIHNldCBuby4gb2YgY2hhcmFjdGVyc1xyXG4gICAgICByZXR1cm4gaW5pdGlhbHMuc2xpY2UoMCx0aGlzLm9wdGlvbnMuY2hhcmFjdGVycylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQmdDb2xvclxyXG4gIHByaXZhdGUgZ2V0QmdDb2xvcigpe1xyXG4gICAgaWYodGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yKXtcclxuICAgICByZXR1cm4gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9HZXQgU2l6ZSBPZiBBdmF0YXIgRWxlbWVudFxyXG4gIHByaXZhdGUgZ2V0U2l6ZSgpe1xyXG4gICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy5zaXplID09PSAnbnVtYmVyJyl7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTsgXHJcbiAgICB9ZWxzZSBpZih0eXBlb2YgU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIFNpemVbKHRoaXMub3B0aW9ucy5zaXplKV07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIFNpemVbJ21kJ107XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmF0YXInLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSAgLS0+YCxcclxuICBwcm92aWRlcnM6IFtBdmF0YXJTZXJ2aWNlXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xyXG5cclxuICBhdmF0YXI6IEF2YXRhcjtcclxuICBASW5wdXQoKSBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBjaGFyYWN0ZXJzOm51bWJlcjtcclxuICBASW5wdXQoKSBpbWFnZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgYmdDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgdGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBzaXplOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9udFNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByb3VuZGVkOmJvb2xlYW47XHJcbiAgQElucHV0KCkgcmFkaXVzOm51bWJlcjtcclxuICBASW5wdXQoKSBtYXJnaW46bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByYW5kb21Db2xvcjpib29sZWFuO1xyXG4gIEBJbnB1dCgpIGxhYmVsIDpzdHJpbmc7XHJcbiAgQElucHV0KCkgbGFiZWxCZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbFRleHRDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgYWN0aXZlOmJvb2xlYW47XHJcbiAgQElucHV0KCkgdXBsb2FkYWJsZTpib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgdXBsb2FkOiBcclxuICAgIEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGRpZmZlcjphbnk7IFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgRW1pdFVwbG9hZCAoKXtcclxuICAgIGlmICh0aGlzLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICB0aGlzLnVwbG9hZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfSBcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2UsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XHJcbiAgICBcclxuICAgIHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG4gIFxyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5hdmF0YXJTZXJ2aWNlLmdldEF2YXRhckNvbmZpZygpO1xyXG4gICAgdGhpcy5hdmF0YXIgPSBuZXcgQXZhdGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5pbWFnZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5vcHRpb25zLm5hbWUgfHwgdGhpcy5vcHRpb25zLmltYWdlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMubmFtZSA9ICh0aGlzLm5hbWUpP3RoaXMubmFtZTp0aGlzLm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMub3B0aW9ucy5pbWFnZSA9ICh0aGlzLmltYWdlKT90aGlzLmltYWdlOnRoaXMub3B0aW9ucy5pbWFnZTtcclxuICAgIHRoaXMub3B0aW9ucy5iZ0NvbG9yID0gKHRoaXMuYmdDb2xvcik/dGhpcy5iZ0NvbG9yOnRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnM9KHRoaXMuY2hhcmFjdGVycyk/dGhpcy5jaGFyYWN0ZXJzOiB0aGlzLm9wdGlvbnMuY2hhcmFjdGVyczsgXHJcbiAgICB0aGlzLm9wdGlvbnMudGV4dENvbG9yID0odGhpcy50ZXh0Q29sb3IpP3RoaXMudGV4dENvbG9yOnRoaXMub3B0aW9ucy50ZXh0Q29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLnNpemUgPSh0aGlzLnNpemUpP3RoaXMuc2l6ZTogdGhpcy5vcHRpb25zLnNpemU7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSh0aGlzLmZvbnRTaXplKT90aGlzLmZvbnRTaXplOnRoaXMub3B0aW9ucy5mb250U2l6ZTsgXHJcbiAgICB0aGlzLm9wdGlvbnMucm91bmRlZCA9KHRoaXMucm91bmRlZCk/dGhpcy5yb3VuZGVkOnRoaXMub3B0aW9ucy5yb3VuZGVkIDsgXHJcbiAgICB0aGlzLm9wdGlvbnMucmFkaXVzID0oIHRoaXMucmFkaXVzKT8gdGhpcy5yYWRpdXM6dGhpcy5vcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMub3B0aW9ucy5tYXJnaW4gPSggdGhpcy5tYXJnaW4pPyB0aGlzLm1hcmdpbjogdGhpcy5vcHRpb25zLm1hcmdpbjtcclxuICAgIHRoaXMub3B0aW9ucy5yYW5kb21Db2xvciA9KHRoaXMucmFuZG9tQ29sb3IpP3RoaXMucmFuZG9tQ29sb3I6IHRoaXMub3B0aW9ucy5yYW5kb21Db2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWwgPSh0aGlzLmxhYmVsKT90aGlzLmxhYmVsOnRoaXMub3B0aW9ucy5sYWJlbCA7XHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yID0odGhpcy5sYWJlbEJnQ29sb3IpP3RoaXMubGFiZWxCZ0NvbG9yOnRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvciA9KHRoaXMubGFiZWxUZXh0Q29sb3IpP3RoaXMubGFiZWxUZXh0Q29sb3I6IHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuYWN0aXZlID0odGhpcy5hY3RpdmUpPyB0aGlzLmFjdGl2ZTp0aGlzLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgdGhpcy5vcHRpb25zLnVwbG9hZGFibGUgPSggdGhpcy51cGxvYWRhYmxlKT8gdGhpcy51cGxvYWRhYmxlOnRoaXMub3B0aW9ucy51cGxvYWRhYmxlO1xyXG5cclxuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZihjaGFuZ2VzKXtcclxuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBkZXRlY3RlZCcpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShyID0+IGNvbnNvbGUubG9nKCdjaGFuZ2VkJywgci5rZXkgKSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygnYWRkZWQgJyAsIHIua2V5ICwgci5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdyZW1vdmVkICcgLCByLmtleSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICAvLyB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zb2xlLmxvZygnbm90aGluZyBjaGFuZ2VkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF2YXRhckNvbXBvbmVudCB9IGZyb20gJy4vYXZhdGFyL2F2YXRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSwgQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IERlZmF1bHRBdmF0YXJPcHRpb25zLCBJQXZhdGFyT3B0aW9ucyB9IGZyb20gJy4vYXZhdGFyLmNsYXNzJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXZhdGFyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6W1xuICAgIEF2YXRhckNvbXBvbmVudFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBJQXZhdGFyT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnN7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBdmF0YXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9XG4gIH1cbiB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxBQUFPLHVCQUFNLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDdEMsQUFBTyx1QkFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUM7QUFDM0MsQUFDTyx1QkFBTSxPQUFPLEdBQUc7SUFDckIsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJEQTtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDckcsSUFBSSxDQUFDLFNBQVMsR0FB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Q0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsSUFBSSxDQUFDLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRTtRQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRSxDQUFFLElBQUksQ0FBQyxNQUFNLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRSxDQUFFLElBQUksQ0FBQyxNQUFNLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN4RixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRTtRQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUUsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBRTtRQUM1RixJ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