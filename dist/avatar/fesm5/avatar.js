import { __assign } from 'tslib';
import { Injectable, InjectionToken, Inject, ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers, NgModule } from '@angular/core';
import * as SVG_ from 'svg.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ defaultColor = '#29b6f6';
var /** @type {?} */ defaultLabelColor = '#f44336';
var /** @type {?} */ palette = [
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
var Size = {
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
var DefaultAvatarOptions = /** @class */ (function () {
    function DefaultAvatarOptions() {
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
    return DefaultAvatarOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ CONFIG = new InjectionToken('config');
var AvatarService = /** @class */ (function () {
    function AvatarService(config) {
        this.Avatarconfig = new DefaultAvatarOptions;
        if (config) {
            this.Avatarconfig = __assign({}, this.Avatarconfig, config);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ SVG = SVG_;
var Avatar = /** @class */ (function () {
    //Set values of element, options,
    function Avatar(_el, arg1, arg2) {
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
    Avatar.isDark = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ r;
        var /** @type {?} */ b;
        var /** @type {?} */ g;
        var /** @type {?} */ hsp;
        var /** @type {?} */ a = color;
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
    };
    /**
     * @param {?} _el
     * @return {?}
     */
    Avatar.getElement = /**
     * @param {?} _el
     * @return {?}
     */
    function (_el) {
        if (!_el) {
            throw new Error('Element not provided');
        }
        switch (typeof _el) {
            case 'string':
                var /** @type {?} */ el = document.getElementById((/** @type {?} */ (_el)));
                if (el) {
                    return (/** @type {?} */ (el));
                }
                else {
                    throw new Error('Element is not present');
                }
            default:
                return (/** @type {?} */ (_el));
        }
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    Avatar.expandProperty = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ returnObj = {
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
                    var /** @type {?} */ properties = (/** @type {?} */ (value)).split(' ').map(function (m) { return +m.replace(/\D/g, ''); });
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
    };
    /**
     * @param {?} arg1
     * @param {?=} arg2
     * @return {?}
     */
    Avatar.getOptions = /**
     * @param {?} arg1
     * @param {?=} arg2
     * @return {?}
     */
    function (arg1, arg2) {
        var /** @type {?} */ _default = new DefaultAvatarOptions();
        var /** @type {?} */ _options = __assign({}, _default);
        switch (typeof arg1) {
            case 'string':
                _options.name = (/** @type {?} */ (arg1));
                break;
            case 'object':
                if (!(/** @type {?} */ (arg1)).name) {
                    throw new Error('Name is required');
                }
                _options = __assign({}, _options, (/** @type {?} */ (arg1)));
                break;
        }
        if (arg2 && typeof arg2 === 'object') {
            _options = __assign({}, _options, (/** @type {?} */ (arg2)));
        }
        for (var /** @type {?} */ key in _options) {
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
        return __assign({}, _options);
    };
    /**
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    Avatar.prototype.update = /**
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    function (prop, value) {
        this.options = /** @type {?} */ (__assign({}, this.options, (_a = {}, _a[prop] = value, _a)));
        this.render();
        var _a;
    };
    /**
     * @return {?}
     */
    Avatar.prototype.render = /**
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.el)).innerHTML = '';
        var /** @type {?} */ svgElement = SVG((/** @type {?} */ (this.el)));
        var _a = Avatar.expandProperty(this.options.margin), top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
        var /** @type {?} */ size = this.getSize();
        this.options.fontSize = size * 0.4;
        svgElement.size(size + left + right, size + top + bottom);
        var /** @type {?} */ shape;
        var /** @type {?} */ uploadShape;
        var /** @type {?} */ uploadIcon;
        var /** @type {?} */ image;
        var /** @type {?} */ text;
        var /** @type {?} */ label;
        var /** @type {?} */ labelText;
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
            var /** @type {?} */ that_1 = this;
            image = svgElement.image(this.options.image).loaded(function () {
                var /** @type {?} */ c;
                if (that_1.options.rounded) {
                    c = svgElement.circle(size - 4);
                }
                else {
                    c = svgElement.rect(size - 4, size - 4).radius((/** @type {?} */ (that_1.options.radius)));
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
            var /** @type {?} */ that_2 = this;
            uploadIcon = svgElement.image("../assets/images/camera.svg").loaded(function () {
                var /** @type {?} */ c;
                if (that_2.options.rounded) {
                    c = svgElement.circle(size - 4);
                }
                else {
                    c = svgElement.rect(size - 4, size - 4).radius((/** @type {?} */ (that_2.options.radius)));
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
    };
    /**
     * @return {?}
     */
    Avatar.prototype.getSlug = /**
     * @return {?}
     */
    function () {
        //Return nothing if DNE
        if (!this.options.name) {
            return '';
        }
        var /** @type {?} */ initials;
        if (this.options.name && this.options.name.length) {
            var /** @type {?} */ nameInitials = this.options.name.match(/\b(\w)/g);
            if (nameInitials) {
                var /** @type {?} */ nameChars = nameInitials.slice(0, this.options.characters + 1).join('');
                initials = nameChars.toUpperCase();
            }
            else {
                initials = this.options.name[0];
            }
            //Return the set no. of characters
            return initials.slice(0, this.options.characters);
        }
    };
    /**
     * @return {?}
     */
    Avatar.prototype.getBgColor = /**
     * @return {?}
     */
    function () {
        if (this.options.randomColor) {
            return palette[Math.floor(Math.random() * palette.length)];
        }
        else {
            return this.options.bgColor;
        }
    };
    /**
     * @return {?}
     */
    Avatar.prototype.getSize = /**
     * @return {?}
     */
    function () {
        if (typeof this.options.size === 'number') {
            return this.options.size;
        }
        else if (typeof Size[(this.options.size)] == 'number') {
            return Size[(this.options.size)];
        }
        else {
            return Size['md'];
        }
    };
    return Avatar;
}());
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(el, avatarService, differs) {
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
    AvatarComponent.prototype.EmitUpload = /**
     * @return {?}
     */
    function () {
        if (this.uploadable == true) {
            this.upload.emit();
        }
    };
    /**
     * @return {?}
     */
    AvatarComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            changes.forEachChangedItem(function (r) { return console.log('changed', r.key); });
            changes.forEachChangedItem(function (r) { return _this.avatar.update(r.key, r.currentValue); });
            changes.forEachAddedItem(function (r) { return console.log('added ', r.key, r.currentValue); });
            changes.forEachAddedItem(function (r) { return _this.avatar.update(r.key, r.currentValue); });
            changes.forEachRemovedItem(function (r) { return console.log('removed ', r.key); });
            changes.forEachRemovedItem(function (r) { return _this.avatar.update(r.key, r.currentValue); });
            // this.avatar = new Avatar(this.el.nativeElement, this.image || this.name || this.options.name || this.options.image, this.options);
        }
        else {
            console.log('nothing changed');
        }
    };
    AvatarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-avatar',
                    template: "<!--  -->",
                    providers: [AvatarService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AvatarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: AvatarService },
        { type: KeyValueDiffers }
    ]; };
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
    return AvatarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CONFIG, AvatarService, Avatar, AvatarComponent, AvatarModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5jbGFzcy50cyIsIm5nOi8vYXZhdGFyL2xpYi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlLnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci9hdmF0YXIuY29tcG9uZW50LnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9ICcjMjliNmY2JztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMYWJlbENvbG9yID0gJyNmNDQzMzYnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdEludml0ZWRDb2xvciA9ICcjRkY5ODAwJztcclxuZXhwb3J0IGNvbnN0IHBhbGV0dGUgPSBbXHJcbiAgJyNmNDQzMzYnLFxyXG4gICcjRTkxRTYzJyxcclxuICAnIzlDMjdCMCcsXHJcbiAgJyM2NzNBQjcnLFxyXG4gICcjM0Y1MUI1JyxcclxuICAnIzIxOTZGMycsXHJcbiAgJyMwM0E5RjQnLFxyXG4gICcjMDBCQ0Q0JyxcclxuICAnIzAwOTY4OCcsXHJcbiAgJyM0Q0FGNTAnLFxyXG4gICcjOEJDMzRBJyxcclxuICAnI0NEREMzOScsXHJcbiAgJyNGRkMxMDcnLFxyXG4gICcjRkY5ODAwJyxcclxuICAnI0ZGNTcyMicsXHJcbiAgJyM3OTU1NDgnLFxyXG4gICcjOUU5RTlFJyxcclxuICAnIzYwN0Q4QidcclxuXTtcclxuXHJcbmV4cG9ydCBlbnVtIFNpemUge1xyXG4gIHhzID0gMzAsXHJcbiAgJ2V4dHJhLXNtYWxsJyA9IDMwLFxyXG4gIHNtID0gNDAsXHJcbiAgc21hbGwgPSA0MCxcclxuICBtZCA9IDUwLFxyXG4gIG1lZGl1bSA9IDUwLFxyXG4gIGxnID0gNjAsXHJcbiAgbGFyZ2UgPSA2MCxcclxuICB4bCA9IDgwLFxyXG4gICdleHRyYS1sYXJnZScgPSA4MFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBdmF0YXJPcHRpb25zIHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM/OiBudW1iZXI7XHJcbiAgaW1hZ2U/OiBzdHJpbmc7XHJcbiAgYmdDb2xvcj86IHN0cmluZztcclxuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgc2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICBmb250U2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkPzogYm9vbGVhbjtcclxuICByYWRpdXM/OiBudW1iZXI7XHJcbiAgbWFyZ2luPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yPzogYm9vbGVhbjtcclxuICBsYWJlbD86IHN0cmluZztcclxuICBsYWJlbEJnQ29sb3I/OiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgYWN0aXZlPzogYm9vbGVhbjtcclxuICB1cGxvYWRhYmxlPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ3NzUHJvcGVydHkge1xyXG4gIHRvcDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEF2YXRhck9wdGlvbnMgaW1wbGVtZW50cyBJQXZhdGFyT3B0aW9ucyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM6IG51bWJlcjtcclxuICBpbWFnZTogc3RyaW5nO1xyXG4gIGJnQ29sb3I6IHN0cmluZztcclxuICB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBzaXplOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgZm9udFNpemU6IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkOiBib29sZWFuO1xyXG4gIHJhZGl1czogbnVtYmVyO1xyXG4gIG1hcmdpbjogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yOiBib29sZWFuO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgbGFiZWxCZ0NvbG9yOiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I6IHN0cmluZztcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgdXBsb2FkYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMuY2hhcmFjdGVycyA9IDI7XHJcbiAgICB0aGlzLmltYWdlID0gJyc7XHJcbiAgICB0aGlzLnJhbmRvbUNvbG9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLnJhbmRvbUNvbG9yID8gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldIDogZGVmYXVsdENvbG9yO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICB0aGlzLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgdGhpcy5mb250U2l6ZSA9IHRoaXMuc2l6ZSAqIDAuNDtcclxuICAgIHRoaXMucm91bmRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnJhZGl1cyA9IDA7XHJcbiAgICB0aGlzLm1hcmdpbiA9IDA7XHJcbiAgICB0aGlzLmxhYmVsID0gJyc7XHJcbiAgICB0aGlzLmxhYmVsQmdDb2xvciA9IGRlZmF1bHRMYWJlbENvbG9yO1xyXG4gICAgdGhpcy5sYWJlbFRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMudXBsb2FkYWJsZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgSW5qZWN0aW9uVG9rZW4sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUF2YXRhck9wdGlvbnMgLCBEZWZhdWx0QXZhdGFyT3B0aW9ucyB9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBDT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2NvbmZpZycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXZhdGFyU2VydmljZSB7XG4gIFxuICBBdmF0YXJjb25maWcgPSBuZXcgRGVmYXVsdEF2YXRhck9wdGlvbnM7XG4gIGNvbnN0cnVjdG9yKCBASW5qZWN0KENPTkZJRykgY29uZmlnOiBJQXZhdGFyT3B0aW9ucyl7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgdGhpcy5BdmF0YXJjb25maWcgPSB7Li4udGhpcy5BdmF0YXJjb25maWcsLi4uY29uZmlnfTtcbiAgICB9XG4gIH1cblxuICBnZXRBdmF0YXJDb25maWcoKXtcbiAgICByZXR1cm4gdGhpcy5BdmF0YXJjb25maWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcclxuICBDb21wb25lbnQsIFxyXG4gIEVsZW1lbnRSZWYsIFxyXG4gIElucHV0LCBcclxuICBPbkNoYW5nZXMsIFxyXG4gIEhvc3RMaXN0ZW5lciwgXHJcbiAgRXZlbnRFbWl0dGVyLCBcclxuICBPdXRwdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgU1ZHXyBmcm9tICdzdmcuanMnO1xyXG5jb25zdCBTVkcgPSBTVkdfO1xyXG5cclxuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zLCBJQ3NzUHJvcGVydHksIFNpemUsIHBhbGV0dGV9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XHJcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdmF0YXIge1xyXG4gIC8vIEhUTUwgRWxlbWVudFxyXG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZztcclxuICAvLyBBdmF0YXIgT3B0aW9ucyBcclxuICBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuXHJcbiAgLy9TZXQgdmFsdWVzIG9mIGVsZW1lbnQsIG9wdGlvbnMsXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCBwcml2YXRlIGFyZzE6IElBdmF0YXJPcHRpb25zIHwgc3RyaW5nLCBwcml2YXRlIGFyZzI/OiBJQXZhdGFyT3B0aW9ucykge1xyXG4gICAgaWYgKCF0aGlzLmFyZzEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbCA9IEF2YXRhci5nZXRFbGVtZW50KF9lbCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBBdmF0YXIuZ2V0T3B0aW9ucyhhcmcxLCBhcmcyKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNEYXJrKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIGxldCByOiBhbnk7XHJcbiAgICBsZXQgYjogYW55O1xyXG4gICAgbGV0IGc6IGFueTtcclxuICAgIGxldCBoc3A6IGFueTtcclxuICAgIGxldCBhOiBhbnkgPSBjb2xvcjtcclxuXHJcbiAgICBpZiAoYS5tYXRjaCgvXnJnYi8pKSB7XHJcbiAgICAgIGEgPSBhLm1hdGNoKC9ecmdiYT9cXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspKD86LFxccyooXFxkKyg/OlxcLlxcZCspPykpP1xcKSQvKTtcclxuICAgICAgciA9IGFbMV07XHJcbiAgICAgIGcgPSBhWzJdO1xyXG4gICAgICBiID0gYVszXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGEgPSArKCcweCcgKyBhLnNsaWNlKDEpLnJlcGxhY2UoXHJcbiAgICAgICAgICBhLmxlbmd0aCA8IDUgJiYgLy4vZywgJyQmJCYnXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICByID0gYSA+PiAxNjsgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgYiA9IGEgPj4gOCAmIDI1NTsgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgIGcgPSBhICYgMjU1OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgaHNwID0gTWF0aC5zcXJ0KFxyXG4gICAgICAwLjI5OSAqIChyICogcikgK1xyXG4gICAgICAwLjU4NyAqIChnICogZykgK1xyXG4gICAgICAwLjExNCAqIChiICogYilcclxuICAgICk7XHJcbiAgICByZXR1cm4gKGhzcCA8IDIwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudChfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgaWYgKCFfZWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBwcm92aWRlZCcpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0eXBlb2YgX2VsKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoX2VsIGFzIHN0cmluZykpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgcmV0dXJuIChlbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBpcyBub3QgcHJlc2VudCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gKF9lbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhwYW5kUHJvcGVydHkodmFsdWU/OiBzdHJpbmcgfCBudW1iZXIpOiBJQ3NzUHJvcGVydHkge1xyXG4gICAgY29uc3QgcmV0dXJuT2JqOiBJQ3NzUHJvcGVydHkgPSB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMFxyXG4gICAgfTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gKHZhbHVlIGFzIG51bWJlcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9ICh2YWx1ZSBhcyBzdHJpbmcpLnNwbGl0KCcgJykubWFwKChtOiBzdHJpbmcpID0+ICttLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xyXG4gICAgICAgICAgc3dpdGNoIChwcm9wZXJ0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLnRvcCA9IHJldHVybk9iai5ib3R0b20gPSByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMF07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoucmlnaHQgPSBwcm9wZXJ0aWVzWzFdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5ib3R0b20gPSBwcm9wZXJ0aWVzWzJdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcHJvcGVydGllc1szXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldE9wdGlvbnMoYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIGFyZzI/OiBJQXZhdGFyT3B0aW9ucyk6IElBdmF0YXJPcHRpb25zIHtcclxuICAgIGNvbnN0IF9kZWZhdWx0OiBJQXZhdGFyT3B0aW9ucyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucygpO1xyXG4gICAgbGV0IF9vcHRpb25zOiBJQXZhdGFyT3B0aW9ucyA9IHsgLi4uX2RlZmF1bHQgfTtcclxuICAgIHN3aXRjaCAodHlwZW9mIGFyZzEpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBfb3B0aW9ucy5uYW1lID0gKGFyZzEgYXMgc3RyaW5nKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICBpZiAoIShhcmcxIGFzIElBdmF0YXJPcHRpb25zKS5uYW1lKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgcmVxdWlyZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX29wdGlvbnMgPSB7IC4uLl9vcHRpb25zLCAuLi4oYXJnMSBhcyBJQXZhdGFyT3B0aW9ucykgfTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChhcmcyICYmIHR5cGVvZiBhcmcyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcyIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX29wdGlvbnMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBfb3B0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIF9vcHRpb25zW2tleV0gPSBfZGVmYXVsdFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9vcHRpb25zLnNpemUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWyhfb3B0aW9ucy5zaXplIGFzIGFueSldO1xyXG4gICAgICBpZiAoIV9vcHRpb25zLnNpemUpIHtcclxuICAgICAgICBfb3B0aW9ucy5zaXplID0gU2l6ZVsnbWQnXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfb3B0aW9ucy5mb250U2l6ZSA9IChfb3B0aW9ucy5zaXplIGFzIG51bWJlcikgKiAwLjQ7XHJcblxyXG4gICAgaWYgKCFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5iZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLnRleHRDb2xvciA9ICcjMDAwJztcclxuICAgIH1cclxuICAgIGlmIChfb3B0aW9ucy5sYWJlbCAmJiAhQXZhdGFyLmlzRGFyaygoX29wdGlvbnMubGFiZWxCZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLmxhYmVsVGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgLi4uX29wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxJQXZhdGFyT3B0aW9ucz57XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgW3Byb3BdOiB2YWx1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAodGhpcy5lbCBhcyBIVE1MRWxlbWVudCkuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCBzdmdFbGVtZW50ID0gU1ZHKCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICBjb25zdCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCB9ID0gQXZhdGFyLmV4cGFuZFByb3BlcnR5KHRoaXMub3B0aW9ucy5tYXJnaW4pO1xyXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG4gICAgXHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSBzaXplICogMC40O1xyXG4gICAgc3ZnRWxlbWVudC5zaXplKHNpemUgKyBsZWZ0ICsgcmlnaHQsIHNpemUgKyB0b3AgKyBib3R0b20pO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IHNoYXBlOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkU2hhcGUgOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkSWNvbjogYW55O1xyXG4gICAgbGV0IGltYWdlOiBhbnk7XHJcbiAgICBsZXQgdGV4dDogYW55O1xyXG4gICAgbGV0IGxhYmVsOiBhbnk7XHJcbiAgICBsZXQgbGFiZWxUZXh0OiBhbnk7XHJcblxyXG4gICAgLy9Sb3VuZGVkXHJcbiAgICAvL0JveGVkXHJcbiAgICAvL1JvdW5kZWQgQm94IChpZiByYWRpdXMgaXMgcHJvdmlkZWQpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdW5kZWQ9PXRydWUpIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLmNpcmNsZShzaXplKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0JnLUNvbG9yXHJcbiAgICAvL0FjdGl2ZVxyXG4gICAgc2hhcGVcclxuICAgICAgLmZpbGwodGhpcy5nZXRCZ0NvbG9yKCkpXHJcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuNSlcclxuICAgICAgLm1vdmUobGVmdCwgdG9wKTtcclxuICAgXHJcbiAgICAgIFxyXG4gICAgLy9pbWFnZVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWFnZSkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgaW1hZ2UgPSBzdmdFbGVtZW50LmltYWdlKHRoaXMub3B0aW9ucy5pbWFnZSkubG9hZGVkKGZ1bmN0aW9uKHRoaXM6IFNWR18uSW1hZ2UpIHtcclxuICAgICAgICBsZXQgYzogYW55O1xyXG4gICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQuY2lyY2xlKHNpemUgLSA0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy5tb3ZlKGxlZnQgKyAyLCB0b3AgKyAyKTtcclxuICAgICAgICB0aGlzLnNpemUoc2l6ZSlcclxuICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAgLy90ZXh0XHJcbiAgICAgdGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAudGV4dCh0aGlzLmdldFNsdWcoKSlcclxuICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgLmZpbGwodGhpcy5vcHRpb25zLnRleHRDb2xvcilcclxuICAgICAuZm9udCh7XHJcbiAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5mb250U2l6ZSxcclxuICAgICB9KVxyXG4gICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApO1xyXG5cclxuICAgIC8vbGFiZWxcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGFiZWwpIHtcclxuICAgICAgbGFiZWwgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSAqIDAuMjUpXHJcbiAgICAgICAgLnJhZGl1cygyKVxyXG4gICAgICAgIC5maWxsKHRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IpXHJcbiAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC44KVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCArIHNpemUgLSAoc2l6ZSAqIDAuMjUpKTtcclxuXHJcbiAgICAgIGxhYmVsVGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAudGV4dCh0aGlzLm9wdGlvbnMubGFiZWwpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yKVxyXG4gICAgICAgIC5mb250KHtcclxuICAgICAgICAgIHNpemU6IHNpemUgKiAwLjI1XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCB0b3AgKyBzaXplIC0gKChzaXplICogMC4yNSkgLyAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy91cGxvYWRcclxuICAgIGlmKHRoaXMub3B0aW9ucy51cGxvYWRhYmxlPT10cnVlKXtcclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICAgIHVwbG9hZFNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgICAgLmNpcmNsZShzaXplKTsgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAucmVjdChzaXplLCBzaXplKVxyXG4gICAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAuZmlsbChcImdyZXlcIilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMClcclxuICAgICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG5cclxuICAgICAgLy9VcGxvYWRJY29uXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB1cGxvYWRJY29uID0gc3ZnRWxlbWVudC5pbWFnZShcIi4uL2Fzc2V0cy9pbWFnZXMvY2FtZXJhLnN2Z1wiKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHXy5JbWFnZSkge1xyXG4gICAgICAgICAgbGV0IGM6IGFueTtcclxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMubW92ZShsZWZ0ICsgMiwgdG9wICsgMik7XHJcbiAgICAgICAgICB0aGlzLnNpemUoc2l6ZSowLjUpXHJcbiAgICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHN2Z0VsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjc1KTtcclxuICAgICAgICBcclxuICAgICAgICB1cGxvYWRJY29uXHJcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsIT1udWxsKXtcclxuICAgICAgICBsYWJlbC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMC4yNSk7fVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHVwbG9hZFNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHVwbG9hZEljb24uYXR0cignb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgbGFiZWxUZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMSk7fVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vUHJpbnQgSW5pdGlhbHNcclxuICBwcml2YXRlIGdldFNsdWcoKSB7XHJcbiAgICAvL1JldHVybiBub3RoaW5nIGlmIERORVxyXG4gICAgaWYoIXRoaXMub3B0aW9ucy5uYW1lKXtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIGluaXRpYWxzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lICYmIHRoaXMub3B0aW9ucy5uYW1lLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBuYW1lSW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZS5tYXRjaCgvXFxiKFxcdykvZyk7XHJcbiAgICAgIGlmIChuYW1lSW5pdGlhbHMpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBuYW1lQ2hhcnMgPSBuYW1lSW5pdGlhbHMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnMrMSkuam9pbignJyk7XHJcbiAgICAgICAgaW5pdGlhbHMgPSBuYW1lQ2hhcnMudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZVswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9SZXR1cm4gdGhlIHNldCBuby4gb2YgY2hhcmFjdGVyc1xyXG4gICAgICByZXR1cm4gaW5pdGlhbHMuc2xpY2UoMCx0aGlzLm9wdGlvbnMuY2hhcmFjdGVycylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQmdDb2xvclxyXG4gIHByaXZhdGUgZ2V0QmdDb2xvcigpe1xyXG4gICAgaWYodGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yKXtcclxuICAgICByZXR1cm4gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9HZXQgU2l6ZSBPZiBBdmF0YXIgRWxlbWVudFxyXG4gIHByaXZhdGUgZ2V0U2l6ZSgpe1xyXG4gICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy5zaXplID09PSAnbnVtYmVyJyl7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTsgXHJcbiAgICB9ZWxzZSBpZih0eXBlb2YgU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIFNpemVbKHRoaXMub3B0aW9ucy5zaXplKV07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIFNpemVbJ21kJ107XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmF0YXInLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSAgLS0+YCxcclxuICBwcm92aWRlcnM6IFtBdmF0YXJTZXJ2aWNlXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xyXG5cclxuICBhdmF0YXI6IEF2YXRhcjtcclxuICBASW5wdXQoKSBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBjaGFyYWN0ZXJzOm51bWJlcjtcclxuICBASW5wdXQoKSBpbWFnZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgYmdDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgdGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBzaXplOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9udFNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByb3VuZGVkOmJvb2xlYW47XHJcbiAgQElucHV0KCkgcmFkaXVzOm51bWJlcjtcclxuICBASW5wdXQoKSBtYXJnaW46bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByYW5kb21Db2xvcjpib29sZWFuO1xyXG4gIEBJbnB1dCgpIGxhYmVsIDpzdHJpbmc7XHJcbiAgQElucHV0KCkgbGFiZWxCZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbFRleHRDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgYWN0aXZlOmJvb2xlYW47XHJcbiAgQElucHV0KCkgdXBsb2FkYWJsZTpib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgdXBsb2FkOiBcclxuICAgIEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGRpZmZlcjphbnk7IFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgRW1pdFVwbG9hZCAoKXtcclxuICAgIGlmICh0aGlzLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICB0aGlzLnVwbG9hZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfSBcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2UsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XHJcbiAgICBcclxuICAgIHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG4gIFxyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5hdmF0YXJTZXJ2aWNlLmdldEF2YXRhckNvbmZpZygpO1xyXG4gICAgdGhpcy5hdmF0YXIgPSBuZXcgQXZhdGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5pbWFnZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5vcHRpb25zLm5hbWUgfHwgdGhpcy5vcHRpb25zLmltYWdlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMubmFtZSA9ICh0aGlzLm5hbWUpP3RoaXMubmFtZTp0aGlzLm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMub3B0aW9ucy5pbWFnZSA9ICh0aGlzLmltYWdlKT90aGlzLmltYWdlOnRoaXMub3B0aW9ucy5pbWFnZTtcclxuICAgIHRoaXMub3B0aW9ucy5iZ0NvbG9yID0gKHRoaXMuYmdDb2xvcik/dGhpcy5iZ0NvbG9yOnRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnM9KHRoaXMuY2hhcmFjdGVycyk/dGhpcy5jaGFyYWN0ZXJzOiB0aGlzLm9wdGlvbnMuY2hhcmFjdGVyczsgXHJcbiAgICB0aGlzLm9wdGlvbnMudGV4dENvbG9yID0odGhpcy50ZXh0Q29sb3IpP3RoaXMudGV4dENvbG9yOnRoaXMub3B0aW9ucy50ZXh0Q29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLnNpemUgPSh0aGlzLnNpemUpP3RoaXMuc2l6ZTogdGhpcy5vcHRpb25zLnNpemU7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSh0aGlzLmZvbnRTaXplKT90aGlzLmZvbnRTaXplOnRoaXMub3B0aW9ucy5mb250U2l6ZTsgXHJcbiAgICB0aGlzLm9wdGlvbnMucm91bmRlZCA9KHRoaXMucm91bmRlZCk/dGhpcy5yb3VuZGVkOnRoaXMub3B0aW9ucy5yb3VuZGVkIDsgXHJcbiAgICB0aGlzLm9wdGlvbnMucmFkaXVzID0oIHRoaXMucmFkaXVzKT8gdGhpcy5yYWRpdXM6dGhpcy5vcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMub3B0aW9ucy5tYXJnaW4gPSggdGhpcy5tYXJnaW4pPyB0aGlzLm1hcmdpbjogdGhpcy5vcHRpb25zLm1hcmdpbjtcclxuICAgIHRoaXMub3B0aW9ucy5yYW5kb21Db2xvciA9KHRoaXMucmFuZG9tQ29sb3IpP3RoaXMucmFuZG9tQ29sb3I6IHRoaXMub3B0aW9ucy5yYW5kb21Db2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWwgPSh0aGlzLmxhYmVsKT90aGlzLmxhYmVsOnRoaXMub3B0aW9ucy5sYWJlbCA7XHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yID0odGhpcy5sYWJlbEJnQ29sb3IpP3RoaXMubGFiZWxCZ0NvbG9yOnRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvciA9KHRoaXMubGFiZWxUZXh0Q29sb3IpP3RoaXMubGFiZWxUZXh0Q29sb3I6IHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuYWN0aXZlID0odGhpcy5hY3RpdmUpPyB0aGlzLmFjdGl2ZTp0aGlzLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgdGhpcy5vcHRpb25zLnVwbG9hZGFibGUgPSggdGhpcy51cGxvYWRhYmxlKT8gdGhpcy51cGxvYWRhYmxlOnRoaXMub3B0aW9ucy51cGxvYWRhYmxlO1xyXG5cclxuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZihjaGFuZ2VzKXtcclxuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBkZXRlY3RlZCcpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShyID0+IGNvbnNvbGUubG9nKCdjaGFuZ2VkJywgci5rZXkgKSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygnYWRkZWQgJyAsIHIua2V5ICwgci5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdyZW1vdmVkICcgLCByLmtleSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICAvLyB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zb2xlLmxvZygnbm90aGluZyBjaGFuZ2VkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF2YXRhckNvbXBvbmVudCB9IGZyb20gJy4vYXZhdGFyL2F2YXRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZhdGFyU2VydmljZSwgQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcbmltcG9ydCB7IERlZmF1bHRBdmF0YXJPcHRpb25zLCBJQXZhdGFyT3B0aW9ucyB9IGZyb20gJy4vYXZhdGFyLmNsYXNzJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXZhdGFyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6W1xuICAgIEF2YXRhckNvbXBvbmVudFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBJQXZhdGFyT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnN7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBdmF0YXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9XG4gIH1cbiB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2Fzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsQUFBTyxxQkFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLEFBQU8scUJBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQzNDLEFBQ08scUJBQU0sT0FBTyxHQUFHO0lBQ3JCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDRixJQUFBO0lBa0JFO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFlBQVks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QUMsU0FBUyxHQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsSUFBSSxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFF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