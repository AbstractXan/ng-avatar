/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers } from '@angular/core';
import * as SVG from 'svg.js';
import { DefaultAvatarOptions, Size, palette } from '../avatar.class';
import { AvatarService } from '../service/avatar.service';
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
        var /** @type {?} */ _options = tslib_1.__assign({}, _default);
        switch (typeof arg1) {
            case 'string':
                _options.name = (/** @type {?} */ (arg1));
                break;
            case 'object':
                if (!(/** @type {?} */ (arg1)).name) {
                    throw new Error('Name is required');
                }
                _options = tslib_1.__assign({}, _options, (/** @type {?} */ (arg1)));
                break;
        }
        if (arg2 && typeof arg2 === 'object') {
            _options = tslib_1.__assign({}, _options, (/** @type {?} */ (arg2)));
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
        return tslib_1.__assign({}, _options);
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
        this.options = /** @type {?} */ (tslib_1.__assign({}, this.options, (_a = {}, _a[prop] = value, _a)));
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
export { Avatar };
function Avatar_tsickle_Closure_declarations() {
    /** @type {?} */
    Avatar.prototype.el;
    /** @type {?} */
    Avatar.prototype.options;
    /** @type {?} */
    Avatar.prototype._el;
    /** @type {?} */
    Avatar.prototype.arg1;
    /** @type {?} */
    Avatar.prototype.arg2;
}
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
export { AvatarComponent };
function AvatarComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AvatarComponent.prototype.avatar;
    /** @type {?} */
    AvatarComponent.prototype.options;
    /** @type {?} */
    AvatarComponent.prototype.name;
    /** @type {?} */
    AvatarComponent.prototype.characters;
    /** @type {?} */
    AvatarComponent.prototype.image;
    /** @type {?} */
    AvatarComponent.prototype.bgColor;
    /** @type {?} */
    AvatarComponent.prototype.textColor;
    /** @type {?} */
    AvatarComponent.prototype.size;
    /** @type {?} */
    AvatarComponent.prototype.fontSize;
    /** @type {?} */
    AvatarComponent.prototype.rounded;
    /** @type {?} */
    AvatarComponent.prototype.radius;
    /** @type {?} */
    AvatarComponent.prototype.margin;
    /** @type {?} */
    AvatarComponent.prototype.randomColor;
    /** @type {?} */
    AvatarComponent.prototype.label;
    /** @type {?} */
    AvatarComponent.prototype.labelBgColor;
    /** @type {?} */
    AvatarComponent.prototype.labelTextColor;
    /** @type {?} */
    AvatarComponent.prototype.active;
    /** @type {?} */
    AvatarComponent.prototype.uploadable;
    /** @type {?} */
    AvatarComponent.prototype.upload;
    /** @type {?} */
    AvatarComponent.prototype.differ;
    /** @type {?} */
    AvatarComponent.prototype.el;
    /** @type {?} */
    AvatarComponent.prototype.avatarService;
    /** @type {?} */
    AvatarComponent.prototype.differs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBRU4sZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssR0FBRyxNQUFNLFFBQVEsQ0FBQztBQUU5QixPQUFPLEVBQUUsb0JBQW9CLEVBQWdDLElBQUksRUFBRSxPQUFPLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFMUQsSUFBQTtJQU1FLGlDQUFpQztJQUNqQyxnQkFBb0IsR0FBeUIsRUFBVSxJQUE2QixFQUFVLElBQXFCO1FBQS9GLFFBQUcsR0FBSCxHQUFHLENBQXNCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBeUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUNqSCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDO1NBQ1I7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7Ozs7SUFFTSxhQUFNOzs7O0lBQWIsVUFBYyxLQUFhO1FBQ3pCLHFCQUFJLENBQU0sQ0FBQztRQUNYLHFCQUFJLENBQU0sQ0FBQztRQUNYLHFCQUFJLENBQU0sQ0FBQztRQUNYLHFCQUFJLEdBQVEs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QUMsT0FBTyxDQUFDLFVBQVUsR0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDbkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxD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QUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7O1NBRzNFO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDaEM7S0FDRjs7Z0JBcEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQTFXQyxVQUFVO2dCQVlILGFBQWE7Z0JBTHBCLGVBQWU7OzswQkF3V2QsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3lCQUVMLE1BQU07NkJBSU4sWUFBWSxTQUFDLE9BQU87OzBCQXhZdkI7O1NBK1dhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgXHJcbiAgQ29tcG9uZW50LCBcclxuICBFbGVtZW50UmVmLCBcclxuICBJbnB1dCwgXHJcbiAgT25DaGFuZ2VzLCBcclxuICBIb3N0TGlzdGVuZXIsIFxyXG4gIEV2ZW50RW1pdHRlciwgXHJcbiAgT3V0cHV0LFxyXG4gIERvQ2hlY2ssXHJcbiAgS2V5VmFsdWVEaWZmZXJzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIFNWRyBmcm9tICdzdmcuanMnO1xyXG5cclxuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zLCBJQ3NzUHJvcGVydHksIFNpemUsIHBhbGV0dGV9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XHJcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdmF0YXIge1xyXG4gIC8vIEhUTUwgRWxlbWVudFxyXG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZztcclxuICAvLyBBdmF0YXIgT3B0aW9ucyBcclxuICBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuXHJcbiAgLy9TZXQgdmFsdWVzIG9mIGVsZW1lbnQsIG9wdGlvbnMsXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCBwcml2YXRlIGFyZzE6IElBdmF0YXJPcHRpb25zIHwgc3RyaW5nLCBwcml2YXRlIGFyZzI/OiBJQXZhdGFyT3B0aW9ucykge1xyXG4gICAgaWYgKCF0aGlzLmFyZzEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbCA9IEF2YXRhci5nZXRFbGVtZW50KF9lbCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBBdmF0YXIuZ2V0T3B0aW9ucyhhcmcxLCBhcmcyKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNEYXJrKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIGxldCByOiBhbnk7XHJcbiAgICBsZXQgYjogYW55O1xyXG4gICAgbGV0IGc6IGFueTtcclxuICAgIGxldCBoc3A6IGFueTtcclxuICAgIGxldCBhOiBhbnkgPSBjb2xvcjtcclxuXHJcbiAgICBpZiAoYS5tYXRjaCgvXnJnYi8pKSB7XHJcbiAgICAgIGEgPSBhLm1hdGNoKC9ecmdiYT9cXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspKD86LFxccyooXFxkKyg/OlxcLlxcZCspPykpP1xcKSQvKTtcclxuICAgICAgciA9IGFbMV07XHJcbiAgICAgIGcgPSBhWzJdO1xyXG4gICAgICBiID0gYVszXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGEgPSArKCcweCcgKyBhLnNsaWNlKDEpLnJlcGxhY2UoXHJcbiAgICAgICAgICBhLmxlbmd0aCA8IDUgJiYgLy4vZywgJyQmJCYnXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICByID0gYSA+PiAxNjsgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgYiA9IGEgPj4gOCAmIDI1NTsgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgIGcgPSBhICYgMjU1OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgaHNwID0gTWF0aC5zcXJ0KFxyXG4gICAgICAwLjI5OSAqIChyICogcikgK1xyXG4gICAgICAwLjU4NyAqIChnICogZykgK1xyXG4gICAgICAwLjExNCAqIChiICogYilcclxuICAgICk7XHJcbiAgICByZXR1cm4gKGhzcCA8IDIwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudChfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgaWYgKCFfZWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBwcm92aWRlZCcpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0eXBlb2YgX2VsKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoX2VsIGFzIHN0cmluZykpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgcmV0dXJuIChlbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBpcyBub3QgcHJlc2VudCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gKF9lbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhwYW5kUHJvcGVydHkodmFsdWU/OiBzdHJpbmcgfCBudW1iZXIpOiBJQ3NzUHJvcGVydHkge1xyXG4gICAgY29uc3QgcmV0dXJuT2JqOiBJQ3NzUHJvcGVydHkgPSB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMFxyXG4gICAgfTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gKHZhbHVlIGFzIG51bWJlcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9ICh2YWx1ZSBhcyBzdHJpbmcpLnNwbGl0KCcgJykubWFwKChtOiBzdHJpbmcpID0+ICttLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xyXG4gICAgICAgICAgc3dpdGNoIChwcm9wZXJ0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLnRvcCA9IHJldHVybk9iai5ib3R0b20gPSByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMF07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoucmlnaHQgPSBwcm9wZXJ0aWVzWzFdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5ib3R0b20gPSBwcm9wZXJ0aWVzWzJdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcHJvcGVydGllc1szXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldE9wdGlvbnMoYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIGFyZzI/OiBJQXZhdGFyT3B0aW9ucyk6IElBdmF0YXJPcHRpb25zIHtcclxuICAgIGNvbnN0IF9kZWZhdWx0OiBJQXZhdGFyT3B0aW9ucyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucygpO1xyXG4gICAgbGV0IF9vcHRpb25zOiBJQXZhdGFyT3B0aW9ucyA9IHsgLi4uX2RlZmF1bHQgfTtcclxuICAgIHN3aXRjaCAodHlwZW9mIGFyZzEpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBfb3B0aW9ucy5uYW1lID0gKGFyZzEgYXMgc3RyaW5nKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICBpZiAoIShhcmcxIGFzIElBdmF0YXJPcHRpb25zKS5uYW1lKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgcmVxdWlyZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX29wdGlvbnMgPSB7IC4uLl9vcHRpb25zLCAuLi4oYXJnMSBhcyBJQXZhdGFyT3B0aW9ucykgfTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChhcmcyICYmIHR5cGVvZiBhcmcyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcyIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX29wdGlvbnMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBfb3B0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIF9vcHRpb25zW2tleV0gPSBfZGVmYXVsdFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9vcHRpb25zLnNpemUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWyhfb3B0aW9ucy5zaXplIGFzIGFueSldO1xyXG4gICAgICBpZiAoIV9vcHRpb25zLnNpemUpIHtcclxuICAgICAgICBfb3B0aW9ucy5zaXplID0gU2l6ZVsnbWQnXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfb3B0aW9ucy5mb250U2l6ZSA9IChfb3B0aW9ucy5zaXplIGFzIG51bWJlcikgKiAwLjQ7XHJcblxyXG4gICAgaWYgKCFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5iZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLnRleHRDb2xvciA9ICcjMDAwJztcclxuICAgIH1cclxuICAgIGlmIChfb3B0aW9ucy5sYWJlbCAmJiAhQXZhdGFyLmlzRGFyaygoX29wdGlvbnMubGFiZWxCZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLmxhYmVsVGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgLi4uX29wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxJQXZhdGFyT3B0aW9ucz57XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgW3Byb3BdOiB2YWx1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAodGhpcy5lbCBhcyBIVE1MRWxlbWVudCkuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCBzdmdFbGVtZW50ID0gU1ZHKCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICBjb25zdCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCB9ID0gQXZhdGFyLmV4cGFuZFByb3BlcnR5KHRoaXMub3B0aW9ucy5tYXJnaW4pO1xyXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG4gICAgXHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSBzaXplICogMC40O1xyXG4gICAgc3ZnRWxlbWVudC5zaXplKHNpemUgKyBsZWZ0ICsgcmlnaHQsIHNpemUgKyB0b3AgKyBib3R0b20pO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IHNoYXBlOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkU2hhcGUgOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkSWNvbjogYW55O1xyXG4gICAgbGV0IGltYWdlOiBhbnk7XHJcbiAgICBsZXQgdGV4dDogYW55O1xyXG4gICAgbGV0IGxhYmVsOiBhbnk7XHJcbiAgICBsZXQgbGFiZWxUZXh0OiBhbnk7XHJcblxyXG4gICAgLy9Sb3VuZGVkXHJcbiAgICAvL0JveGVkXHJcbiAgICAvL1JvdW5kZWQgQm94IChpZiByYWRpdXMgaXMgcHJvdmlkZWQpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdW5kZWQ9PXRydWUpIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLmNpcmNsZShzaXplKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0JnLUNvbG9yXHJcbiAgICAvL0FjdGl2ZVxyXG4gICAgc2hhcGVcclxuICAgICAgLmZpbGwodGhpcy5nZXRCZ0NvbG9yKCkpXHJcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuNSlcclxuICAgICAgLm1vdmUobGVmdCwgdG9wKTtcclxuICAgXHJcbiAgICAgIFxyXG4gICAgLy9pbWFnZVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWFnZSkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgaW1hZ2UgPSBzdmdFbGVtZW50LmltYWdlKHRoaXMub3B0aW9ucy5pbWFnZSkubG9hZGVkKGZ1bmN0aW9uKHRoaXM6IFNWRy5JbWFnZSkge1xyXG4gICAgICAgIGxldCBjOiBhbnk7XHJcbiAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5yb3VuZGVkKSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5yZWN0KHNpemUgLSA0LCBzaXplIC0gNCkucmFkaXVzKCh0aGF0Lm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLm1vdmUobGVmdCArIDIsIHRvcCArIDIpO1xyXG4gICAgICAgIHRoaXMuc2l6ZShzaXplKVxyXG4gICAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCkuY2xpcFdpdGgoYyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvL3RleHRcclxuICAgICB0ZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgIC50ZXh0KHRoaXMuZ2V0U2x1ZygpKVxyXG4gICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuOClcclxuICAgICAuZmlsbCh0aGlzLm9wdGlvbnMudGV4dENvbG9yKVxyXG4gICAgIC5mb250KHtcclxuICAgICAgc2l6ZTogdGhpcy5vcHRpb25zLmZvbnRTaXplLFxyXG4gICAgIH0pXHJcbiAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCk7XHJcblxyXG4gICAgLy9sYWJlbFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYWJlbCkge1xyXG4gICAgICBsYWJlbCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAucmVjdChzaXplLCBzaXplICogMC4yNSlcclxuICAgICAgICAucmFkaXVzKDIpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvcilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgICAgLm1vdmUobGVmdCwgdG9wICsgc2l6ZSAtIChzaXplICogMC4yNSkpO1xyXG5cclxuICAgICAgbGFiZWxUZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC50ZXh0KHRoaXMub3B0aW9ucy5sYWJlbClcclxuICAgICAgICAuZmlsbCh0aGlzLm9wdGlvbnMubGFiZWxUZXh0Q29sb3IpXHJcbiAgICAgICAgLmZvbnQoe1xyXG4gICAgICAgICAgc2l6ZTogc2l6ZSAqIDAuMjVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIHRvcCArIHNpemUgLSAoKHNpemUgKiAwLjI1KSAvIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3VwbG9hZFxyXG4gICAgaWYodGhpcy5vcHRpb25zLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICBcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb3VuZGVkPT10cnVlKSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAuY2lyY2xlKHNpemUpOyBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cGxvYWRTaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cGxvYWRTaGFwZVxyXG4gICAgICAgIC5maWxsKFwiZ3JleVwiKVxyXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCk7XHJcblxyXG4gICAgICAvL1VwbG9hZEljb25cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHVwbG9hZEljb24gPSBzdmdFbGVtZW50LmltYWdlKFwiLi4vYXNzZXRzL2ltYWdlcy9jYW1lcmEuc3ZnXCIpLmxvYWRlZChmdW5jdGlvbih0aGlzOiBTVkcuSW1hZ2UpIHtcclxuICAgICAgICAgIGxldCBjOiBhbnk7XHJcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLnJvdW5kZWQpIHtcclxuICAgICAgICAgICAgYyA9IHN2Z0VsZW1lbnQuY2lyY2xlKHNpemUgLSA0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGMgPSBzdmdFbGVtZW50LnJlY3Qoc2l6ZSAtIDQsIHNpemUgLSA0KS5yYWRpdXMoKHRoYXQub3B0aW9ucy5yYWRpdXMgYXMgbnVtYmVyKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjLm1vdmUobGVmdCArIDIsIHRvcCArIDIpO1xyXG4gICAgICAgICAgdGhpcy5zaXplKHNpemUqMC41KVxyXG4gICAgICAgICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCAoc2l6ZSAvIDIpICsgdG9wKS5jbGlwV2l0aChjKVxyXG4gICAgICAgICAgICAuYXR0cignb3BhY2l0eScsMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBzdmdFbGVtZW50Lm1vdXNlb3ZlcihmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDAuMjUpO1xyXG4gICAgICAgIHVwbG9hZFNoYXBlXHJcbiAgICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMC43NSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdXBsb2FkSWNvblxyXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICB0ZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDAuMjUpO1xyXG5cclxuICAgICAgICBpZihsYWJlbCE9bnVsbCl7XHJcbiAgICAgICAgbGFiZWwuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XHJcbiAgICAgICAgbGFiZWxUZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDAuMjUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihpbWFnZSE9bnVsbCl7aW1hZ2UuYXR0cignb3BhY2l0eScsIDAuMjUpO31cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHN2Z0VsZW1lbnQubW91c2VvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBzaGFwZS5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKTtcclxuICAgICAgICB1cGxvYWRTaGFwZS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICB1cGxvYWRJY29uLmF0dHIoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICB0ZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIGlmKGxhYmVsIT1udWxsKXtcclxuICAgICAgICAgIGxhYmVsXHJcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKTtcclxuICAgICAgICAgIGxhYmVsVGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBpZihpbWFnZSE9bnVsbCl7aW1hZ2UuYXR0cignb3BhY2l0eScsIDEpO31cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvL1ByaW50IEluaXRpYWxzXHJcbiAgcHJpdmF0ZSBnZXRTbHVnKCkge1xyXG4gICAgLy9SZXR1cm4gbm90aGluZyBpZiBETkVcclxuICAgIGlmKCF0aGlzLm9wdGlvbnMubmFtZSl7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHZhciBpbml0aWFscztcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubmFtZSAmJiB0aGlzLm9wdGlvbnMubmFtZS5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgbmFtZUluaXRpYWxzID0gdGhpcy5vcHRpb25zLm5hbWUubWF0Y2goL1xcYihcXHcpL2cpO1xyXG4gICAgICBpZiAobmFtZUluaXRpYWxzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbmFtZUNoYXJzID0gbmFtZUluaXRpYWxzLnNsaWNlKDAsIHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzKzEpLmpvaW4oJycpO1xyXG4gICAgICAgIGluaXRpYWxzID0gbmFtZUNoYXJzLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluaXRpYWxzID0gdGhpcy5vcHRpb25zLm5hbWVbMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vUmV0dXJuIHRoZSBzZXQgbm8uIG9mIGNoYXJhY3RlcnNcclxuICAgICAgcmV0dXJuIGluaXRpYWxzLnNsaWNlKDAsdGhpcy5vcHRpb25zLmNoYXJhY3RlcnMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0JnQ29sb3JcclxuICBwcml2YXRlIGdldEJnQ29sb3IoKXtcclxuICAgIGlmKHRoaXMub3B0aW9ucy5yYW5kb21Db2xvcil7XHJcbiAgICAgcmV0dXJuIHBhbGV0dGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGFsZXR0ZS5sZW5ndGgpXTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYmdDb2xvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vR2V0IFNpemUgT2YgQXZhdGFyIEVsZW1lbnRcclxuICBwcml2YXRlIGdldFNpemUoKXtcclxuICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2l6ZSA9PT0gJ251bWJlcicpe1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemU7IFxyXG4gICAgfWVsc2UgaWYodHlwZW9mIFNpemVbKHRoaXMub3B0aW9ucy5zaXplKV09PSAnbnVtYmVyJyl7XHJcbiAgICAgIHJldHVybiBTaXplWyh0aGlzLm9wdGlvbnMuc2l6ZSldO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiBTaXplWydtZCddO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXZhdGFyJyxcclxuICB0ZW1wbGF0ZTogYDwhLS0gIC0tPmAsXHJcbiAgcHJvdmlkZXJzOiBbQXZhdGFyU2VydmljZV0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdmF0YXJDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcclxuXHJcbiAgYXZhdGFyOiBBdmF0YXI7XHJcbiAgQElucHV0KCkgb3B0aW9uczogSUF2YXRhck9wdGlvbnM7XHJcbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgY2hhcmFjdGVyczpudW1iZXI7XHJcbiAgQElucHV0KCkgaW1hZ2U6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJnQ29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHRleHRDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgc2l6ZTpudW1iZXJ8c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvbnRTaXplOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgcm91bmRlZDpib29sZWFuO1xyXG4gIEBJbnB1dCgpIHJhZGl1czpudW1iZXI7XHJcbiAgQElucHV0KCkgbWFyZ2luOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgcmFuZG9tQ29sb3I6Ym9vbGVhbjtcclxuICBASW5wdXQoKSBsYWJlbCA6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsQmdDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgbGFiZWxUZXh0Q29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFjdGl2ZTpib29sZWFuO1xyXG4gIEBJbnB1dCgpIHVwbG9hZGFibGU6Ym9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIHVwbG9hZDogXHJcbiAgICBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBkaWZmZXI6YW55OyBcclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIEVtaXRVcGxvYWQgKCl7XHJcbiAgICBpZiAodGhpcy51cGxvYWRhYmxlPT10cnVlKXtcclxuICAgICAgdGhpcy51cGxvYWQuZW1pdCgpO1xyXG4gICAgfVxyXG4gIH0gXHJcbiAgXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBhdmF0YXJTZXJ2aWNlOiBBdmF0YXJTZXJ2aWNlLCBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycykge1xyXG4gICAgXHJcbiAgICB0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcclxuICBcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuYXZhdGFyU2VydmljZS5nZXRBdmF0YXJDb25maWcoKTtcclxuICAgIHRoaXMuYXZhdGFyID0gbmV3IEF2YXRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuaW1hZ2UgfHwgdGhpcy5uYW1lIHx8IHRoaXMub3B0aW9ucy5uYW1lIHx8IHRoaXMub3B0aW9ucy5pbWFnZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5hdmF0YXJTZXJ2aWNlLmdldEF2YXRhckNvbmZpZygpO1xyXG4gICAgdGhpcy5vcHRpb25zLm5hbWUgPSAodGhpcy5uYW1lKT90aGlzLm5hbWU6dGhpcy5vcHRpb25zLm5hbWU7XHJcbiAgICB0aGlzLm9wdGlvbnMuaW1hZ2UgPSAodGhpcy5pbWFnZSk/dGhpcy5pbWFnZTp0aGlzLm9wdGlvbnMuaW1hZ2U7XHJcbiAgICB0aGlzLm9wdGlvbnMuYmdDb2xvciA9ICh0aGlzLmJnQ29sb3IpP3RoaXMuYmdDb2xvcjp0aGlzLm9wdGlvbnMuYmdDb2xvcjtcclxuICAgIHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzPSh0aGlzLmNoYXJhY3RlcnMpP3RoaXMuY2hhcmFjdGVyczogdGhpcy5vcHRpb25zLmNoYXJhY3RlcnM7IFxyXG4gICAgdGhpcy5vcHRpb25zLnRleHRDb2xvciA9KHRoaXMudGV4dENvbG9yKT90aGlzLnRleHRDb2xvcjp0aGlzLm9wdGlvbnMudGV4dENvbG9yOyBcclxuICAgIHRoaXMub3B0aW9ucy5zaXplID0odGhpcy5zaXplKT90aGlzLnNpemU6IHRoaXMub3B0aW9ucy5zaXplO1xyXG4gICAgdGhpcy5vcHRpb25zLmZvbnRTaXplID0odGhpcy5mb250U2l6ZSk/dGhpcy5mb250U2l6ZTp0aGlzLm9wdGlvbnMuZm9udFNpemU7IFxyXG4gICAgdGhpcy5vcHRpb25zLnJvdW5kZWQgPSh0aGlzLnJvdW5kZWQpP3RoaXMucm91bmRlZDp0aGlzLm9wdGlvbnMucm91bmRlZCA7IFxyXG4gICAgdGhpcy5vcHRpb25zLnJhZGl1cyA9KCB0aGlzLnJhZGl1cyk/IHRoaXMucmFkaXVzOnRoaXMub3B0aW9ucy5yYWRpdXM7XHJcbiAgICB0aGlzLm9wdGlvbnMubWFyZ2luID0oIHRoaXMubWFyZ2luKT8gdGhpcy5tYXJnaW46IHRoaXMub3B0aW9ucy5tYXJnaW47XHJcbiAgICB0aGlzLm9wdGlvbnMucmFuZG9tQ29sb3IgPSh0aGlzLnJhbmRvbUNvbG9yKT90aGlzLnJhbmRvbUNvbG9yOiB0aGlzLm9wdGlvbnMucmFuZG9tQ29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLmxhYmVsID0odGhpcy5sYWJlbCk/dGhpcy5sYWJlbDp0aGlzLm9wdGlvbnMubGFiZWwgO1xyXG4gICAgdGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvciA9KHRoaXMubGFiZWxCZ0NvbG9yKT90aGlzLmxhYmVsQmdDb2xvcjp0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yIDsgXHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWxUZXh0Q29sb3IgPSh0aGlzLmxhYmVsVGV4dENvbG9yKT90aGlzLmxhYmVsVGV4dENvbG9yOiB0aGlzLm9wdGlvbnMubGFiZWxUZXh0Q29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLmFjdGl2ZSA9KHRoaXMuYWN0aXZlKT8gdGhpcy5hY3RpdmU6dGhpcy5vcHRpb25zLmFjdGl2ZTtcclxuICAgIHRoaXMub3B0aW9ucy51cGxvYWRhYmxlID0oIHRoaXMudXBsb2FkYWJsZSk/IHRoaXMudXBsb2FkYWJsZTp0aGlzLm9wdGlvbnMudXBsb2FkYWJsZTtcclxuXHJcbiAgICB2YXIgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgaWYoY2hhbmdlcyl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UgZGV0ZWN0ZWQnKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygnY2hhbmdlZCcsIHIua2V5ICkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG5cclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKHIgPT4gY29uc29sZS5sb2coJ2FkZGVkICcgLCByLmtleSAsIHIuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG5cclxuICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygncmVtb3ZlZCAnICwgci5rZXkpKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0ociA9PiB0aGlzLmF2YXRhci51cGRhdGUoci5rZXksci5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgLy8gdGhpcy5hdmF0YXIgPSBuZXcgQXZhdGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5pbWFnZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5vcHRpb25zLm5hbWUgfHwgdGhpcy5vcHRpb25zLmltYWdlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgY29uc29sZS5sb2coJ25vdGhpbmcgY2hhbmdlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHJcbn1cclxuIl19