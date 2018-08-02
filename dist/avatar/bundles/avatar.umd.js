(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('svg.js'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('avatar', ['exports', '@angular/core', 'svg.js', '@angular/common'], factory) :
    (factory((global.avatar = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,core,SVG_,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
    var DefaultAvatarOptions = (function () {
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
    var /** @type {?} */ CONFIG = new core.InjectionToken('config');
    var AvatarService = (function () {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AvatarService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG,] }] }
            ];
        };
        return AvatarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ SVG = SVG_;
    var Avatar = (function () {
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
                        var /** @type {?} */ el = document.getElementById(((_el)));
                        if (el) {
                            return ((el));
                        }
                        else {
                            throw new Error('Element is not present');
                        }
                    default:
                        return ((_el));
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
                            returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = ((value));
                            break;
                        case 'string':
                            var /** @type {?} */ properties = ((value)).split(' ').map(function (m) { return +m.replace(/\D/g, ''); });
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
                        _options.name = ((arg1));
                        break;
                    case 'object':
                        if (!((arg1)).name) {
                            throw new Error('Name is required');
                        }
                        _options = __assign({}, _options, ((arg1)));
                        break;
                }
                if (arg2 && typeof arg2 === 'object') {
                    _options = __assign({}, _options, ((arg2)));
                }
                for (var /** @type {?} */ key in _options) {
                    if (typeof _options[key] === 'undefined') {
                        _options[key] = _default[key];
                    }
                }
                if (typeof _options.size === 'string') {
                    _options.size = Size[((_options.size))];
                    if (!_options.size) {
                        _options.size = Size['md'];
                    }
                }
                _options.fontSize = ((_options.size)) * 0.4;
                if (!Avatar.isDark(((_options.bgColor)))) {
                    _options.textColor = '#000';
                }
                if (_options.label && !Avatar.isDark(((_options.labelBgColor)))) {
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
                ((this.el)).innerHTML = '';
                var /** @type {?} */ svgElement = SVG(((this.el)));
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
                        .radius(((this.options.radius)));
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
                            c = svgElement.rect(size - 4, size - 4).radius(((that_1.options.radius)));
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
                            .radius(((this.options.radius)));
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
                            c = svgElement.rect(size - 4, size - 4).radius(((that_2.options.radius)));
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
    var AvatarComponent = (function () {
        function AvatarComponent(el, avatarService, differs) {
            this.el = el;
            this.avatarService = avatarService;
            this.differs = differs;
            this.upload = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'app-avatar',
                        template: "<!--  -->",
                        providers: [AvatarService],
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        AvatarComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: AvatarService },
                { type: core.KeyValueDiffers }
            ];
        };
        AvatarComponent.propDecorators = {
            options: [{ type: core.Input }],
            name: [{ type: core.Input }],
            characters: [{ type: core.Input }],
            image: [{ type: core.Input }],
            bgColor: [{ type: core.Input }],
            textColor: [{ type: core.Input }],
            size: [{ type: core.Input }],
            fontSize: [{ type: core.Input }],
            rounded: [{ type: core.Input }],
            radius: [{ type: core.Input }],
            margin: [{ type: core.Input }],
            randomColor: [{ type: core.Input }],
            label: [{ type: core.Input }],
            labelBgColor: [{ type: core.Input }],
            labelTextColor: [{ type: core.Input }],
            active: [{ type: core.Input }],
            uploadable: [{ type: core.Input }],
            upload: [{ type: core.Output }],
            EmitUpload: [{ type: core.HostListener, args: ['click',] }]
        };
        return AvatarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AvatarModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.CONFIG = CONFIG;
    exports.AvatarService = AvatarService;
    exports.Avatar = Avatar;
    exports.AvatarComponent = AvatarComponent;
    exports.AvatarModule = AvatarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5jbGFzcy50cyIsIm5nOi8vYXZhdGFyL2xpYi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlLnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci9hdmF0YXIuY29tcG9uZW50LnRzIiwibmc6Ly9hdmF0YXIvbGliL2F2YXRhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gJyMyOWI2ZjYnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdExhYmVsQ29sb3IgPSAnI2Y0NDMzNic7XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0SW52aXRlZENvbG9yID0gJyNGRjk4MDAnO1xyXG5leHBvcnQgY29uc3QgcGFsZXR0ZSA9IFtcclxuICAnI2Y0NDMzNicsXHJcbiAgJyNFOTFFNjMnLFxyXG4gICcjOUMyN0IwJyxcclxuICAnIzY3M0FCNycsXHJcbiAgJyMzRjUxQjUnLFxyXG4gICcjMjE5NkYzJyxcclxuICAnIzAzQTlGNCcsXHJcbiAgJyMwMEJDRDQnLFxyXG4gICcjMDA5Njg4JyxcclxuICAnIzRDQUY1MCcsXHJcbiAgJyM4QkMzNEEnLFxyXG4gICcjQ0REQzM5JyxcclxuICAnI0ZGQzEwNycsXHJcbiAgJyNGRjk4MDAnLFxyXG4gICcjRkY1NzIyJyxcclxuICAnIzc5NTU0OCcsXHJcbiAgJyM5RTlFOUUnLFxyXG4gICcjNjA3RDhCJ1xyXG5dO1xyXG5cclxuZXhwb3J0IGVudW0gU2l6ZSB7XHJcbiAgeHMgPSAzMCxcclxuICAnZXh0cmEtc21hbGwnID0gMzAsXHJcbiAgc20gPSA0MCxcclxuICBzbWFsbCA9IDQwLFxyXG4gIG1kID0gNTAsXHJcbiAgbWVkaXVtID0gNTAsXHJcbiAgbGcgPSA2MCxcclxuICBsYXJnZSA9IDYwLFxyXG4gIHhsID0gODAsXHJcbiAgJ2V4dHJhLWxhcmdlJyA9IDgwXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUF2YXRhck9wdGlvbnMge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgY2hhcmFjdGVycz86IG51bWJlcjtcclxuICBpbWFnZT86IHN0cmluZztcclxuICBiZ0NvbG9yPzogc3RyaW5nO1xyXG4gIHRleHRDb2xvcj86IHN0cmluZztcclxuICBzaXplPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIGZvbnRTaXplPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJvdW5kZWQ/OiBib29sZWFuO1xyXG4gIHJhZGl1cz86IG51bWJlcjtcclxuICBtYXJnaW4/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgcmFuZG9tQ29sb3I/OiBib29sZWFuO1xyXG4gIGxhYmVsPzogc3RyaW5nO1xyXG4gIGxhYmVsQmdDb2xvcj86IHN0cmluZztcclxuICBsYWJlbFRleHRDb2xvcj86IHN0cmluZztcclxuICBhY3RpdmU/OiBib29sZWFuO1xyXG4gIHVwbG9hZGFibGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDc3NQcm9wZXJ0eSB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgcmlnaHQ6IG51bWJlcjtcclxuICBib3R0b206IG51bWJlcjtcclxuICBsZWZ0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0QXZhdGFyT3B0aW9ucyBpbXBsZW1lbnRzIElBdmF0YXJPcHRpb25zIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgY2hhcmFjdGVyczogbnVtYmVyO1xyXG4gIGltYWdlOiBzdHJpbmc7XHJcbiAgYmdDb2xvcjogc3RyaW5nO1xyXG4gIHRleHRDb2xvcjogc3RyaW5nO1xyXG4gIHNpemU6IG51bWJlciB8IHN0cmluZztcclxuICBmb250U2l6ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJvdW5kZWQ6IGJvb2xlYW47XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgbWFyZ2luOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgcmFuZG9tQ29sb3I6IGJvb2xlYW47XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBsYWJlbEJnQ29sb3I6IHN0cmluZztcclxuICBsYWJlbFRleHRDb2xvcjogc3RyaW5nO1xyXG4gIGFjdGl2ZTogYm9vbGVhbjtcclxuICB1cGxvYWRhYmxlOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubmFtZSA9ICcnO1xyXG4gICAgdGhpcy5jaGFyYWN0ZXJzID0gMjtcclxuICAgIHRoaXMuaW1hZ2UgPSAnJztcclxuICAgIHRoaXMucmFuZG9tQ29sb3IgPSBmYWxzZTtcclxuICAgIHRoaXMuYmdDb2xvciA9IHRoaXMucmFuZG9tQ29sb3IgPyBwYWxldHRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhbGV0dGUubGVuZ3RoKV0gOiBkZWZhdWx0Q29sb3I7XHJcbiAgICB0aGlzLnRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIHRoaXMuc2l6ZSA9IFNpemVbJ21kJ107XHJcbiAgICB0aGlzLmZvbnRTaXplID0gdGhpcy5zaXplICogMC40O1xyXG4gICAgdGhpcy5yb3VuZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMucmFkaXVzID0gMDtcclxuICAgIHRoaXMubWFyZ2luID0gMDtcclxuICAgIHRoaXMubGFiZWwgPSAnJztcclxuICAgIHRoaXMubGFiZWxCZ0NvbG9yID0gZGVmYXVsdExhYmVsQ29sb3I7XHJcbiAgICB0aGlzLmxhYmVsVGV4dENvbG9yID0gJyNmZmYnO1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy51cGxvYWRhYmxlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXZhdGFyT3B0aW9ucyAsIERlZmF1bHRBdmF0YXJPcHRpb25zIH0gZnJvbSAnLi4vYXZhdGFyLmNsYXNzJztcblxuZXhwb3J0IGNvbnN0IENPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbignY29uZmlnJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmF0YXJTZXJ2aWNlIHtcbiAgXG4gIEF2YXRhcmNvbmZpZyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucztcbiAgY29uc3RydWN0b3IoIEBJbmplY3QoQ09ORklHKSBjb25maWc6IElBdmF0YXJPcHRpb25zKXtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICB0aGlzLkF2YXRhcmNvbmZpZyA9IHsuLi50aGlzLkF2YXRhcmNvbmZpZywuLi5jb25maWd9O1xuICAgIH1cbiAgfVxuXG4gIGdldEF2YXRhckNvbmZpZygpe1xuICAgIHJldHVybiB0aGlzLkF2YXRhcmNvbmZpZztcbiAgfVxufVxuIiwiaW1wb3J0IHsgXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFxyXG4gIENvbXBvbmVudCwgXHJcbiAgRWxlbWVudFJlZiwgXHJcbiAgSW5wdXQsIFxyXG4gIE9uQ2hhbmdlcywgXHJcbiAgSG9zdExpc3RlbmVyLCBcclxuICBFdmVudEVtaXR0ZXIsIFxyXG4gIE91dHB1dCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBTVkdfIGZyb20gJ3N2Zy5qcyc7XHJcbmNvbnN0IFNWRyA9IFNWR187XHJcblxyXG5pbXBvcnQgeyBEZWZhdWx0QXZhdGFyT3B0aW9ucywgSUF2YXRhck9wdGlvbnMsIElDc3NQcm9wZXJ0eSwgU2l6ZSwgcGFsZXR0ZX0gZnJvbSAnLi4vYXZhdGFyLmNsYXNzJztcclxuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhciB7XHJcbiAgLy8gSFRNTCBFbGVtZW50XHJcbiAgZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nO1xyXG4gIC8vIEF2YXRhciBPcHRpb25zIFxyXG4gIG9wdGlvbnM6IElBdmF0YXJPcHRpb25zO1xyXG5cclxuICAvL1NldCB2YWx1ZXMgb2YgZWxlbWVudCwgb3B0aW9ucyxcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcsIHByaXZhdGUgYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIHByaXZhdGUgYXJnMj86IElBdmF0YXJPcHRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJnMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmVsID0gQXZhdGFyLmdldEVsZW1lbnQoX2VsKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IEF2YXRhci5nZXRPcHRpb25zKGFyZzEsIGFyZzIpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0RhcmsoY29sb3I6IHN0cmluZykge1xyXG4gICAgbGV0IHI6IGFueTtcclxuICAgIGxldCBiOiBhbnk7XHJcbiAgICBsZXQgZzogYW55O1xyXG4gICAgbGV0IGhzcDogYW55O1xyXG4gICAgbGV0IGE6IGFueSA9IGNvbG9yO1xyXG5cclxuICAgIGlmIChhLm1hdGNoKC9ecmdiLykpIHtcclxuICAgICAgYSA9IGEubWF0Y2goL15yZ2JhP1xcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKykoPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KSk/XFwpJC8pO1xyXG4gICAgICByID0gYVsxXTtcclxuICAgICAgZyA9IGFbMl07XHJcbiAgICAgIGIgPSBhWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9ICsoJzB4JyArIGEuc2xpY2UoMSkucmVwbGFjZShcclxuICAgICAgICAgIGEubGVuZ3RoIDwgNSAmJiAvLi9nLCAnJCYkJidcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHIgPSBhID4+IDE2OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgICBiID0gYSA+PiA4ICYgMjU1OyAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgZyA9IGEgJiAyNTU7ICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgICBoc3AgPSBNYXRoLnNxcnQoXHJcbiAgICAgIDAuMjk5ICogKHIgKiByKSArXHJcbiAgICAgIDAuNTg3ICogKGcgKiBnKSArXHJcbiAgICAgIDAuMTE0ICogKGIgKiBiKVxyXG4gICAgKTtcclxuICAgIHJldHVybiAoaHNwIDwgMjAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFbGVtZW50KF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBpZiAoIV9lbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgbm90IHByb3ZpZGVkJyk7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZWwpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChfZWwgYXMgc3RyaW5nKSk7XHJcbiAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gKGVsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGlzIG5vdCBwcmVzZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAoX2VsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBleHBhbmRQcm9wZXJ0eSh2YWx1ZT86IHN0cmluZyB8IG51bWJlcik6IElDc3NQcm9wZXJ0eSB7XHJcbiAgICBjb25zdCByZXR1cm5PYmo6IElDc3NQcm9wZXJ0eSA9IHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICByaWdodDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwXHJcbiAgICB9O1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgIHJldHVybk9iai50b3AgPSByZXR1cm5PYmouYm90dG9tID0gcmV0dXJuT2JqLmxlZnQgPSByZXR1cm5PYmoucmlnaHQgPSAodmFsdWUgYXMgbnVtYmVyKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gKHZhbHVlIGFzIHN0cmluZykuc3BsaXQoJyAnKS5tYXAoKG06IHN0cmluZykgPT4gK20ucmVwbGFjZSgvXFxEL2csICcnKSk7XHJcbiAgICAgICAgICBzd2l0Y2ggKHByb3BlcnRpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1swXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICByZXR1cm5PYmouYm90dG9tID0gcHJvcGVydGllc1syXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmxlZnQgPSBwcm9wZXJ0aWVzWzNdO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0T3B0aW9ucyhhcmcxOiBJQXZhdGFyT3B0aW9ucyB8IHN0cmluZywgYXJnMj86IElBdmF0YXJPcHRpb25zKTogSUF2YXRhck9wdGlvbnMge1xyXG4gICAgY29uc3QgX2RlZmF1bHQ6IElBdmF0YXJPcHRpb25zID0gbmV3IERlZmF1bHRBdmF0YXJPcHRpb25zKCk7XHJcbiAgICBsZXQgX29wdGlvbnM6IElBdmF0YXJPcHRpb25zID0geyAuLi5fZGVmYXVsdCB9O1xyXG4gICAgc3dpdGNoICh0eXBlb2YgYXJnMSkge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIF9vcHRpb25zLm5hbWUgPSAoYXJnMSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIGlmICghKGFyZzEgYXMgSUF2YXRhck9wdGlvbnMpLm5hbWUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmFtZSBpcyByZXF1aXJlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcxIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyZzIgJiYgdHlwZW9mIGFyZzIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIF9vcHRpb25zID0geyAuLi5fb3B0aW9ucywgLi4uKGFyZzIgYXMgSUF2YXRhck9wdGlvbnMpIH07XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBfb3B0aW9ucykge1xyXG4gICAgICBpZiAodHlwZW9mIF9vcHRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgX29wdGlvbnNba2V5XSA9IF9kZWZhdWx0W2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgX29wdGlvbnMuc2l6ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgX29wdGlvbnMuc2l6ZSA9IFNpemVbKF9vcHRpb25zLnNpemUgYXMgYW55KV07XHJcbiAgICAgIGlmICghX29wdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9vcHRpb25zLmZvbnRTaXplID0gKF9vcHRpb25zLnNpemUgYXMgbnVtYmVyKSAqIDAuNDtcclxuXHJcbiAgICBpZiAoIUF2YXRhci5pc0RhcmsoKF9vcHRpb25zLmJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMudGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgaWYgKF9vcHRpb25zLmxhYmVsICYmICFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5sYWJlbEJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMubGFiZWxUZXh0Q29sb3IgPSAnIzAwMCc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyAuLi5fb3B0aW9ucyB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHByb3A6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgdGhpcy5vcHRpb25zID0gPElBdmF0YXJPcHRpb25zPntcclxuICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICBbcHJvcF06IHZhbHVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgICh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBTVkcoKHRoaXMuZWwgYXMgSFRNTEVsZW1lbnQpKTtcclxuICAgIGNvbnN0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0IH0gPSBBdmF0YXIuZXhwYW5kUHJvcGVydHkodGhpcy5vcHRpb25zLm1hcmdpbik7XHJcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRTaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9IHNpemUgKiAwLjQ7XHJcbiAgICBzdmdFbGVtZW50LnNpemUoc2l6ZSArIGxlZnQgKyByaWdodCwgc2l6ZSArIHRvcCArIGJvdHRvbSk7XHJcblxyXG4gICAgXHJcbiAgICBsZXQgc2hhcGU6IGFueTtcclxuICAgIGxldCB1cGxvYWRTaGFwZSA6IGFueTtcclxuICAgIGxldCB1cGxvYWRJY29uOiBhbnk7XHJcbiAgICBsZXQgaW1hZ2U6IGFueTtcclxuICAgIGxldCB0ZXh0OiBhbnk7XHJcbiAgICBsZXQgbGFiZWw6IGFueTtcclxuICAgIGxldCBsYWJlbFRleHQ6IGFueTtcclxuXHJcbiAgICAvL1JvdW5kZWRcclxuICAgIC8vQm94ZWRcclxuICAgIC8vUm91bmRlZCBCb3ggKGlmIHJhZGl1cyBpcyBwcm92aWRlZClcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICBzaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAuY2lyY2xlKHNpemUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSlcclxuICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vQmctQ29sb3JcclxuICAgIC8vQWN0aXZlXHJcbiAgICBzaGFwZVxyXG4gICAgICAuZmlsbCh0aGlzLmdldEJnQ29sb3IoKSlcclxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC41KVxyXG4gICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG4gICBcclxuICAgICAgXHJcbiAgICAvL2ltYWdlXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltYWdlKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpbWFnZSA9IHN2Z0VsZW1lbnQuaW1hZ2UodGhpcy5vcHRpb25zLmltYWdlKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHXy5JbWFnZSkge1xyXG4gICAgICAgIGxldCBjOiBhbnk7XHJcbiAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5yb3VuZGVkKSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5yZWN0KHNpemUgLSA0LCBzaXplIC0gNCkucmFkaXVzKCh0aGF0Lm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLm1vdmUobGVmdCArIDIsIHRvcCArIDIpO1xyXG4gICAgICAgIHRoaXMuc2l6ZShzaXplKVxyXG4gICAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCkuY2xpcFdpdGgoYyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvL3RleHRcclxuICAgICB0ZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgIC50ZXh0KHRoaXMuZ2V0U2x1ZygpKVxyXG4gICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuOClcclxuICAgICAuZmlsbCh0aGlzLm9wdGlvbnMudGV4dENvbG9yKVxyXG4gICAgIC5mb250KHtcclxuICAgICAgc2l6ZTogdGhpcy5vcHRpb25zLmZvbnRTaXplLFxyXG4gICAgIH0pXHJcbiAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCk7XHJcblxyXG4gICAgLy9sYWJlbFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYWJlbCkge1xyXG4gICAgICBsYWJlbCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAucmVjdChzaXplLCBzaXplICogMC4yNSlcclxuICAgICAgICAucmFkaXVzKDIpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvcilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgICAgLm1vdmUobGVmdCwgdG9wICsgc2l6ZSAtIChzaXplICogMC4yNSkpO1xyXG5cclxuICAgICAgbGFiZWxUZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC50ZXh0KHRoaXMub3B0aW9ucy5sYWJlbClcclxuICAgICAgICAuZmlsbCh0aGlzLm9wdGlvbnMubGFiZWxUZXh0Q29sb3IpXHJcbiAgICAgICAgLmZvbnQoe1xyXG4gICAgICAgICAgc2l6ZTogc2l6ZSAqIDAuMjVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIHRvcCArIHNpemUgLSAoKHNpemUgKiAwLjI1KSAvIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3VwbG9hZFxyXG4gICAgaWYodGhpcy5vcHRpb25zLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICBcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb3VuZGVkPT10cnVlKSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAuY2lyY2xlKHNpemUpOyBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cGxvYWRTaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cGxvYWRTaGFwZVxyXG4gICAgICAgIC5maWxsKFwiZ3JleVwiKVxyXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCk7XHJcblxyXG4gICAgICAvL1VwbG9hZEljb25cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHVwbG9hZEljb24gPSBzdmdFbGVtZW50LmltYWdlKFwiLi4vYXNzZXRzL2ltYWdlcy9jYW1lcmEuc3ZnXCIpLmxvYWRlZChmdW5jdGlvbih0aGlzOiBTVkdfLkltYWdlKSB7XHJcbiAgICAgICAgICBsZXQgYzogYW55O1xyXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5yb3VuZGVkKSB7XHJcbiAgICAgICAgICAgIGMgPSBzdmdFbGVtZW50LmNpcmNsZShzaXplIC0gNCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5yZWN0KHNpemUgLSA0LCBzaXplIC0gNCkucmFkaXVzKCh0aGF0Lm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYy5tb3ZlKGxlZnQgKyAyLCB0b3AgKyAyKTtcclxuICAgICAgICAgIHRoaXMuc2l6ZShzaXplKjAuNSlcclxuICAgICAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCkuY2xpcFdpdGgoYylcclxuICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW92ZXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBzaGFwZS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuICAgICAgICB1cGxvYWRTaGFwZVxyXG4gICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDAuNzUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHVwbG9hZEljb25cclxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgdGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuXHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgIGxhYmVsLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIGxhYmVsVGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaW1hZ2UhPW51bGwpe2ltYWdlLmF0dHIoJ29wYWNpdHknLCAwLjI1KTt9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBzdmdFbGVtZW50Lm1vdXNlb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XHJcbiAgICAgICAgdXBsb2FkSWNvbi5hdHRyKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgdGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKTtcclxuICAgICAgICBpZihsYWJlbCE9bnVsbCl7XHJcbiAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgaWYoaW1hZ2UhPW51bGwpe2ltYWdlLmF0dHIoJ29wYWNpdHknLCAxKTt9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9QcmludCBJbml0aWFsc1xyXG4gIHByaXZhdGUgZ2V0U2x1ZygpIHtcclxuICAgIC8vUmV0dXJuIG5vdGhpbmcgaWYgRE5FXHJcbiAgICBpZighdGhpcy5vcHRpb25zLm5hbWUpe1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgaW5pdGlhbHM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWUgJiYgdGhpcy5vcHRpb25zLm5hbWUubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IG5hbWVJbml0aWFscyA9IHRoaXMub3B0aW9ucy5uYW1lLm1hdGNoKC9cXGIoXFx3KS9nKTtcclxuICAgICAgaWYgKG5hbWVJbml0aWFscykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG5hbWVDaGFycyA9IG5hbWVJbml0aWFscy5zbGljZSgwLCB0aGlzLm9wdGlvbnMuY2hhcmFjdGVycysxKS5qb2luKCcnKTtcclxuICAgICAgICBpbml0aWFscyA9IG5hbWVDaGFycy50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0aWFscyA9IHRoaXMub3B0aW9ucy5uYW1lWzBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL1JldHVybiB0aGUgc2V0IG5vLiBvZiBjaGFyYWN0ZXJzXHJcbiAgICAgIHJldHVybiBpbml0aWFscy5zbGljZSgwLHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9CZ0NvbG9yXHJcbiAgcHJpdmF0ZSBnZXRCZ0NvbG9yKCl7XHJcbiAgICBpZih0aGlzLm9wdGlvbnMucmFuZG9tQ29sb3Ipe1xyXG4gICAgIHJldHVybiBwYWxldHRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhbGV0dGUubGVuZ3RoKV07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJnQ29sb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0dldCBTaXplIE9mIEF2YXRhciBFbGVtZW50XHJcbiAgcHJpdmF0ZSBnZXRTaXplKCl7XHJcbiAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnNpemUgPT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplOyBcclxuICAgIH1lbHNlIGlmKHR5cGVvZiBTaXplWyh0aGlzLm9wdGlvbnMuc2l6ZSldPT0gJ251bWJlcicpe1xyXG4gICAgICByZXR1cm4gU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gU2l6ZVsnbWQnXTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuICBcclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWF2YXRhcicsXHJcbiAgdGVtcGxhdGU6IGA8IS0tICAtLT5gLFxyXG4gIHByb3ZpZGVyczogW0F2YXRhclNlcnZpY2VdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XHJcblxyXG4gIGF2YXRhcjogQXZhdGFyO1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IElBdmF0YXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNoYXJhY3RlcnM6bnVtYmVyO1xyXG4gIEBJbnB1dCgpIGltYWdlOnN0cmluZztcclxuICBASW5wdXQoKSBiZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSB0ZXh0Q29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSBmb250U2l6ZTpudW1iZXJ8c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJvdW5kZWQ6Ym9vbGVhbjtcclxuICBASW5wdXQoKSByYWRpdXM6bnVtYmVyO1xyXG4gIEBJbnB1dCgpIG1hcmdpbjpudW1iZXJ8c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJhbmRvbUNvbG9yOmJvb2xlYW47XHJcbiAgQElucHV0KCkgbGFiZWwgOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbEJnQ29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsVGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBhY3RpdmU6Ym9vbGVhbjtcclxuICBASW5wdXQoKSB1cGxvYWRhYmxlOmJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKSB1cGxvYWQ6IFxyXG4gICAgRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgZGlmZmVyOmFueTsgXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBFbWl0VXBsb2FkICgpe1xyXG4gICAgaWYgKHRoaXMudXBsb2FkYWJsZT09dHJ1ZSl7XHJcbiAgICAgIHRoaXMudXBsb2FkLmVtaXQoKTtcclxuICAgIH1cclxuICB9IFxyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZSwgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMpIHtcclxuICAgIFxyXG4gICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XHJcbiAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuYXZhdGFyU2VydmljZS5nZXRBdmF0YXJDb25maWcoKTtcclxuICAgIHRoaXMub3B0aW9ucy5uYW1lID0gKHRoaXMubmFtZSk/dGhpcy5uYW1lOnRoaXMub3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5vcHRpb25zLmltYWdlID0gKHRoaXMuaW1hZ2UpP3RoaXMuaW1hZ2U6dGhpcy5vcHRpb25zLmltYWdlO1xyXG4gICAgdGhpcy5vcHRpb25zLmJnQ29sb3IgPSAodGhpcy5iZ0NvbG9yKT90aGlzLmJnQ29sb3I6dGhpcy5vcHRpb25zLmJnQ29sb3I7XHJcbiAgICB0aGlzLm9wdGlvbnMuY2hhcmFjdGVycz0odGhpcy5jaGFyYWN0ZXJzKT90aGlzLmNoYXJhY3RlcnM6IHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzOyBcclxuICAgIHRoaXMub3B0aW9ucy50ZXh0Q29sb3IgPSh0aGlzLnRleHRDb2xvcik/dGhpcy50ZXh0Q29sb3I6dGhpcy5vcHRpb25zLnRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9KHRoaXMuc2l6ZSk/dGhpcy5zaXplOiB0aGlzLm9wdGlvbnMuc2l6ZTtcclxuICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9KHRoaXMuZm9udFNpemUpP3RoaXMuZm9udFNpemU6dGhpcy5vcHRpb25zLmZvbnRTaXplOyBcclxuICAgIHRoaXMub3B0aW9ucy5yb3VuZGVkID0odGhpcy5yb3VuZGVkKT90aGlzLnJvdW5kZWQ6dGhpcy5vcHRpb25zLnJvdW5kZWQgOyBcclxuICAgIHRoaXMub3B0aW9ucy5yYWRpdXMgPSggdGhpcy5yYWRpdXMpPyB0aGlzLnJhZGl1czp0aGlzLm9wdGlvbnMucmFkaXVzO1xyXG4gICAgdGhpcy5vcHRpb25zLm1hcmdpbiA9KCB0aGlzLm1hcmdpbik/IHRoaXMubWFyZ2luOiB0aGlzLm9wdGlvbnMubWFyZ2luO1xyXG4gICAgdGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yID0odGhpcy5yYW5kb21Db2xvcik/dGhpcy5yYW5kb21Db2xvcjogdGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbCA9KHRoaXMubGFiZWwpP3RoaXMubGFiZWw6dGhpcy5vcHRpb25zLmxhYmVsIDtcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgPSh0aGlzLmxhYmVsQmdDb2xvcik/dGhpcy5sYWJlbEJnQ29sb3I6dGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvciA7IFxyXG4gICAgdGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yID0odGhpcy5sYWJlbFRleHRDb2xvcik/dGhpcy5sYWJlbFRleHRDb2xvcjogdGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yOyBcclxuICAgIHRoaXMub3B0aW9ucy5hY3RpdmUgPSh0aGlzLmFjdGl2ZSk/IHRoaXMuYWN0aXZlOnRoaXMub3B0aW9ucy5hY3RpdmU7XHJcbiAgICB0aGlzLm9wdGlvbnMudXBsb2FkYWJsZSA9KCB0aGlzLnVwbG9hZGFibGUpPyB0aGlzLnVwbG9hZGFibGU6dGhpcy5vcHRpb25zLnVwbG9hZGFibGU7XHJcblxyXG4gICAgdmFyIGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zKTtcclxuICAgIGlmKGNoYW5nZXMpe1xyXG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlIGRldGVjdGVkJyk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gY29uc29sZS5sb2coJ2NoYW5nZWQnLCByLmtleSApKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0ociA9PiB0aGlzLmF2YXRhci51cGRhdGUoci5rZXksci5jdXJyZW50VmFsdWUpKTtcclxuXHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdhZGRlZCAnICwgci5rZXkgLCByLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiB0aGlzLmF2YXRhci51cGRhdGUoci5rZXksci5jdXJyZW50VmFsdWUpKTtcclxuXHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKHIgPT4gY29uc29sZS5sb2coJ3JlbW92ZWQgJyAsIHIua2V5KSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgIC8vIHRoaXMuYXZhdGFyID0gbmV3IEF2YXRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuaW1hZ2UgfHwgdGhpcy5uYW1lIHx8IHRoaXMub3B0aW9ucy5uYW1lIHx8IHRoaXMub3B0aW9ucy5pbWFnZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIFxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGNoYW5nZWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdmF0YXJTZXJ2aWNlLCBDT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zIH0gZnJvbSAnLi9hdmF0YXIuY2xhc3MnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBdmF0YXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czpbXG4gICAgQXZhdGFyQ29tcG9uZW50XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IElBdmF0YXJPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyc3tcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEF2YXRhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH1cbiAgfVxuIH1cbiJdLCJuYW1lcyI6WyJJbmplY3Rpb25Ub2tlbiIsIkluamVjdGFibGUiLCJJbmplY3QiLCJ0c2xpYl8xLl9fYXNzaWduIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJFbGVtZW50UmVmIiwiS2V5VmFsdWVEaWZmZXJzIiwiSW5wdXQiLCJPdXRw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