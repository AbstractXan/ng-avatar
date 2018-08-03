/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers } from '@angular/core';
import * as SVG_ from 'svg.js';
var /** @type {?} */ SVG = SVG_;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBRU4sZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUMvQixxQkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBRWpCLE9BQU8sRUFBRSxvQkFBb0IsRUFBZ0MsSUFBSSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRCxJQUFBO0lBTUUsaUNBQWlDO0lBQ2pDLGdCQUFvQixHQUF5QixFQUFVLElBQTZCLEVBQVUsSUFBcUI7UUFBL0YsUUFBRyxHQUFILEdBQUcsQ0FBc0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUF5QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWlCO1FBQ2pILEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVNLGFBQU07Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIscUJBQUksQ0FBTSxDQUFDO1FBQ1gscUJBQUksQ0FBTSxDQUFDO1FBQ1gs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QUFPLENBQUMsT0FBTyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUU7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUUsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFB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LE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQzs7U0FHM0U7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNoQztLQUNGOztnQkFwRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsV0FBVztvQkFDckIsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBM1dDLFVBQVU7Z0JBYUgsYUFBYTtnQkFOcEIsZUFBZTs7OzBCQXlXZCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSzt3QkFDTCxLQUFLOytCQUNMLEtBQUs7aUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBRUwsTUFBTTs2QkFJTixZQUFZLFNBQUMsT0FBTzs7MEJBell2Qjs7U0FnWGEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcclxuICBDb21wb25lbnQsIFxyXG4gIEVsZW1lbnRSZWYsIFxyXG4gIElucHV0LCBcclxuICBPbkNoYW5nZXMsIFxyXG4gIEhvc3RMaXN0ZW5lciwgXHJcbiAgRXZlbnRFbWl0dGVyLCBcclxuICBPdXRwdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgU1ZHXyBmcm9tICdzdmcuanMnO1xyXG5jb25zdCBTVkcgPSBTVkdfO1xyXG5cclxuaW1wb3J0IHsgRGVmYXVsdEF2YXRhck9wdGlvbnMsIElBdmF0YXJPcHRpb25zLCBJQ3NzUHJvcGVydHksIFNpemUsIHBhbGV0dGV9IGZyb20gJy4uL2F2YXRhci5jbGFzcyc7XHJcbmltcG9ydCB7IEF2YXRhclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2F2YXRhci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdmF0YXIge1xyXG4gIC8vIEhUTUwgRWxlbWVudFxyXG4gIGVsOiBIVE1MRWxlbWVudCB8IHN0cmluZztcclxuICAvLyBBdmF0YXIgT3B0aW9ucyBcclxuICBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuXHJcbiAgLy9TZXQgdmFsdWVzIG9mIGVsZW1lbnQsIG9wdGlvbnMsXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCBwcml2YXRlIGFyZzE6IElBdmF0YXJPcHRpb25zIHwgc3RyaW5nLCBwcml2YXRlIGFyZzI/OiBJQXZhdGFyT3B0aW9ucykge1xyXG4gICAgaWYgKCF0aGlzLmFyZzEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbCA9IEF2YXRhci5nZXRFbGVtZW50KF9lbCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBBdmF0YXIuZ2V0T3B0aW9ucyhhcmcxLCBhcmcyKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNEYXJrKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIGxldCByOiBhbnk7XHJcbiAgICBsZXQgYjogYW55O1xyXG4gICAgbGV0IGc6IGFueTtcclxuICAgIGxldCBoc3A6IGFueTtcclxuICAgIGxldCBhOiBhbnkgPSBjb2xvcjtcclxuXHJcbiAgICBpZiAoYS5tYXRjaCgvXnJnYi8pKSB7XHJcbiAgICAgIGEgPSBhLm1hdGNoKC9ecmdiYT9cXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspKD86LFxccyooXFxkKyg/OlxcLlxcZCspPykpP1xcKSQvKTtcclxuICAgICAgciA9IGFbMV07XHJcbiAgICAgIGcgPSBhWzJdO1xyXG4gICAgICBiID0gYVszXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGEgPSArKCcweCcgKyBhLnNsaWNlKDEpLnJlcGxhY2UoXHJcbiAgICAgICAgICBhLmxlbmd0aCA8IDUgJiYgLy4vZywgJyQmJCYnXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgICByID0gYSA+PiAxNjsgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgYiA9IGEgPj4gOCAmIDI1NTsgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgIGcgPSBhICYgMjU1OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgaHNwID0gTWF0aC5zcXJ0KFxyXG4gICAgICAwLjI5OSAqIChyICogcikgK1xyXG4gICAgICAwLjU4NyAqIChnICogZykgK1xyXG4gICAgICAwLjExNCAqIChiICogYilcclxuICAgICk7XHJcbiAgICByZXR1cm4gKGhzcCA8IDIwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RWxlbWVudChfZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgaWYgKCFfZWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG5vdCBwcm92aWRlZCcpO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh0eXBlb2YgX2VsKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoX2VsIGFzIHN0cmluZykpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgcmV0dXJuIChlbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBpcyBub3QgcHJlc2VudCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gKF9lbCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZXhwYW5kUHJvcGVydHkodmFsdWU/OiBzdHJpbmcgfCBudW1iZXIpOiBJQ3NzUHJvcGVydHkge1xyXG4gICAgY29uc3QgcmV0dXJuT2JqOiBJQ3NzUHJvcGVydHkgPSB7XHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgIGJvdHRvbTogMCxcclxuICAgICAgbGVmdDogMFxyXG4gICAgfTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gKHZhbHVlIGFzIG51bWJlcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9ICh2YWx1ZSBhcyBzdHJpbmcpLnNwbGl0KCcgJykubWFwKChtOiBzdHJpbmcpID0+ICttLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xyXG4gICAgICAgICAgc3dpdGNoIChwcm9wZXJ0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLnRvcCA9IHJldHVybk9iai5ib3R0b20gPSByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMF07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoubGVmdCA9IHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoucmlnaHQgPSBwcm9wZXJ0aWVzWzFdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5ib3R0b20gPSBwcm9wZXJ0aWVzWzJdO1xyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcHJvcGVydGllc1szXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldE9wdGlvbnMoYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIGFyZzI/OiBJQXZhdGFyT3B0aW9ucyk6IElBdmF0YXJPcHRpb25zIHtcclxuICAgIGNvbnN0IF9kZWZhdWx0OiBJQXZhdGFyT3B0aW9ucyA9IG5ldyBEZWZhdWx0QXZhdGFyT3B0aW9ucygpO1xyXG4gICAgbGV0IF9vcHRpb25zOiBJQXZhdGFyT3B0aW9ucyA9IHsgLi4uX2RlZmF1bHQgfTtcclxuICAgIHN3aXRjaCAodHlwZW9mIGFyZzEpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBfb3B0aW9ucy5uYW1lID0gKGFyZzEgYXMgc3RyaW5nKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICBpZiAoIShhcmcxIGFzIElBdmF0YXJPcHRpb25zKS5uYW1lKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgcmVxdWlyZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX29wdGlvbnMgPSB7IC4uLl9vcHRpb25zLCAuLi4oYXJnMSBhcyBJQXZhdGFyT3B0aW9ucykgfTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChhcmcyICYmIHR5cGVvZiBhcmcyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcyIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX29wdGlvbnMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBfb3B0aW9uc1trZXldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIF9vcHRpb25zW2tleV0gPSBfZGVmYXVsdFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9vcHRpb25zLnNpemUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWyhfb3B0aW9ucy5zaXplIGFzIGFueSldO1xyXG4gICAgICBpZiAoIV9vcHRpb25zLnNpemUpIHtcclxuICAgICAgICBfb3B0aW9ucy5zaXplID0gU2l6ZVsnbWQnXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfb3B0aW9ucy5mb250U2l6ZSA9IChfb3B0aW9ucy5zaXplIGFzIG51bWJlcikgKiAwLjQ7XHJcblxyXG4gICAgaWYgKCFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5iZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLnRleHRDb2xvciA9ICcjMDAwJztcclxuICAgIH1cclxuICAgIGlmIChfb3B0aW9ucy5sYWJlbCAmJiAhQXZhdGFyLmlzRGFyaygoX29wdGlvbnMubGFiZWxCZ0NvbG9yIGFzIGFueSkpKSB7XHJcbiAgICAgIF9vcHRpb25zLmxhYmVsVGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgLi4uX29wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxJQXZhdGFyT3B0aW9ucz57XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgW3Byb3BdOiB2YWx1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAodGhpcy5lbCBhcyBIVE1MRWxlbWVudCkuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCBzdmdFbGVtZW50ID0gU1ZHKCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICBjb25zdCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCB9ID0gQXZhdGFyLmV4cGFuZFByb3BlcnR5KHRoaXMub3B0aW9ucy5tYXJnaW4pO1xyXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG4gICAgXHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSBzaXplICogMC40O1xyXG4gICAgc3ZnRWxlbWVudC5zaXplKHNpemUgKyBsZWZ0ICsgcmlnaHQsIHNpemUgKyB0b3AgKyBib3R0b20pO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IHNoYXBlOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkU2hhcGUgOiBhbnk7XHJcbiAgICBsZXQgdXBsb2FkSWNvbjogYW55O1xyXG4gICAgbGV0IGltYWdlOiBhbnk7XHJcbiAgICBsZXQgdGV4dDogYW55O1xyXG4gICAgbGV0IGxhYmVsOiBhbnk7XHJcbiAgICBsZXQgbGFiZWxUZXh0OiBhbnk7XHJcblxyXG4gICAgLy9Sb3VuZGVkXHJcbiAgICAvL0JveGVkXHJcbiAgICAvL1JvdW5kZWQgQm94IChpZiByYWRpdXMgaXMgcHJvdmlkZWQpXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnJvdW5kZWQ9PXRydWUpIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLmNpcmNsZShzaXplKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0JnLUNvbG9yXHJcbiAgICAvL0FjdGl2ZVxyXG4gICAgc2hhcGVcclxuICAgICAgLmZpbGwodGhpcy5nZXRCZ0NvbG9yKCkpXHJcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuNSlcclxuICAgICAgLm1vdmUobGVmdCwgdG9wKTtcclxuICAgXHJcbiAgICAgIFxyXG4gICAgLy9pbWFnZVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWFnZSkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgaW1hZ2UgPSBzdmdFbGVtZW50LmltYWdlKHRoaXMub3B0aW9ucy5pbWFnZSkubG9hZGVkKGZ1bmN0aW9uKHRoaXM6IFNWR18uSW1hZ2UpIHtcclxuICAgICAgICBsZXQgYzogYW55O1xyXG4gICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQuY2lyY2xlKHNpemUgLSA0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy5tb3ZlKGxlZnQgKyAyLCB0b3AgKyAyKTtcclxuICAgICAgICB0aGlzLnNpemUoc2l6ZSlcclxuICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAgLy90ZXh0XHJcbiAgICAgdGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAudGV4dCh0aGlzLmdldFNsdWcoKSlcclxuICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgLmZpbGwodGhpcy5vcHRpb25zLnRleHRDb2xvcilcclxuICAgICAuZm9udCh7XHJcbiAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5mb250U2l6ZSxcclxuICAgICB9KVxyXG4gICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApO1xyXG5cclxuICAgIC8vbGFiZWxcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGFiZWwpIHtcclxuICAgICAgbGFiZWwgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSAqIDAuMjUpXHJcbiAgICAgICAgLnJhZGl1cygyKVxyXG4gICAgICAgIC5maWxsKHRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IpXHJcbiAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC44KVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCArIHNpemUgLSAoc2l6ZSAqIDAuMjUpKTtcclxuXHJcbiAgICAgIGxhYmVsVGV4dCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAudGV4dCh0aGlzLm9wdGlvbnMubGFiZWwpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yKVxyXG4gICAgICAgIC5mb250KHtcclxuICAgICAgICAgIHNpemU6IHNpemUgKiAwLjI1XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCB0b3AgKyBzaXplIC0gKChzaXplICogMC4yNSkgLyAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy91cGxvYWRcclxuICAgIGlmKHRoaXMub3B0aW9ucy51cGxvYWRhYmxlPT10cnVlKXtcclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICAgIHVwbG9hZFNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgICAgLmNpcmNsZShzaXplKTsgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAucmVjdChzaXplLCBzaXplKVxyXG4gICAgICAgICAgLnJhZGl1cygodGhpcy5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAuZmlsbChcImdyZXlcIilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMClcclxuICAgICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG5cclxuICAgICAgLy9VcGxvYWRJY29uXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB1cGxvYWRJY29uID0gc3ZnRWxlbWVudC5pbWFnZShcIi4uL2Fzc2V0cy9pbWFnZXMvY2FtZXJhLnN2Z1wiKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHXy5JbWFnZSkge1xyXG4gICAgICAgICAgbGV0IGM6IGFueTtcclxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMubW92ZShsZWZ0ICsgMiwgdG9wICsgMik7XHJcbiAgICAgICAgICB0aGlzLnNpemUoc2l6ZSowLjUpXHJcbiAgICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHN2Z0VsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjc1KTtcclxuICAgICAgICBcclxuICAgICAgICB1cGxvYWRJY29uXHJcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsIT1udWxsKXtcclxuICAgICAgICBsYWJlbC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMC4yNSk7fVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHVwbG9hZFNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHVwbG9hZEljb24uYXR0cignb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgbGFiZWxUZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMSk7fVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vUHJpbnQgSW5pdGlhbHNcclxuICBwcml2YXRlIGdldFNsdWcoKSB7XHJcbiAgICAvL1JldHVybiBub3RoaW5nIGlmIERORVxyXG4gICAgaWYoIXRoaXMub3B0aW9ucy5uYW1lKXtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIGluaXRpYWxzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lICYmIHRoaXMub3B0aW9ucy5uYW1lLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBuYW1lSW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZS5tYXRjaCgvXFxiKFxcdykvZyk7XHJcbiAgICAgIGlmIChuYW1lSW5pdGlhbHMpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBuYW1lQ2hhcnMgPSBuYW1lSW5pdGlhbHMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnMrMSkuam9pbignJyk7XHJcbiAgICAgICAgaW5pdGlhbHMgPSBuYW1lQ2hhcnMudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZVswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9SZXR1cm4gdGhlIHNldCBuby4gb2YgY2hhcmFjdGVyc1xyXG4gICAgICByZXR1cm4gaW5pdGlhbHMuc2xpY2UoMCx0aGlzLm9wdGlvbnMuY2hhcmFjdGVycylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQmdDb2xvclxyXG4gIHByaXZhdGUgZ2V0QmdDb2xvcigpe1xyXG4gICAgaWYodGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yKXtcclxuICAgICByZXR1cm4gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9HZXQgU2l6ZSBPZiBBdmF0YXIgRWxlbWVudFxyXG4gIHByaXZhdGUgZ2V0U2l6ZSgpe1xyXG4gICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy5zaXplID09PSAnbnVtYmVyJyl7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTsgXHJcbiAgICB9ZWxzZSBpZih0eXBlb2YgU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIFNpemVbKHRoaXMub3B0aW9ucy5zaXplKV07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIFNpemVbJ21kJ107XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmF0YXInLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSAgLS0+YCxcclxuICBwcm92aWRlcnM6IFtBdmF0YXJTZXJ2aWNlXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xyXG5cclxuICBhdmF0YXI6IEF2YXRhcjtcclxuICBASW5wdXQoKSBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBjaGFyYWN0ZXJzOm51bWJlcjtcclxuICBASW5wdXQoKSBpbWFnZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgYmdDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgdGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBzaXplOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9udFNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByb3VuZGVkOmJvb2xlYW47XHJcbiAgQElucHV0KCkgcmFkaXVzOm51bWJlcjtcclxuICBASW5wdXQoKSBtYXJnaW46bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByYW5kb21Db2xvcjpib29sZWFuO1xyXG4gIEBJbnB1dCgpIGxhYmVsIDpzdHJpbmc7XHJcbiAgQElucHV0KCkgbGFiZWxCZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbFRleHRDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgYWN0aXZlOmJvb2xlYW47XHJcbiAgQElucHV0KCkgdXBsb2FkYWJsZTpib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgdXBsb2FkOiBcclxuICAgIEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGRpZmZlcjphbnk7IFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgRW1pdFVwbG9hZCAoKXtcclxuICAgIGlmICh0aGlzLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICB0aGlzLnVwbG9hZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfSBcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2UsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XHJcbiAgICBcclxuICAgIHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG4gIFxyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5hdmF0YXJTZXJ2aWNlLmdldEF2YXRhckNvbmZpZygpO1xyXG4gICAgdGhpcy5hdmF0YXIgPSBuZXcgQXZhdGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5pbWFnZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5vcHRpb25zLm5hbWUgfHwgdGhpcy5vcHRpb25zLmltYWdlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMubmFtZSA9ICh0aGlzLm5hbWUpP3RoaXMubmFtZTp0aGlzLm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMub3B0aW9ucy5pbWFnZSA9ICh0aGlzLmltYWdlKT90aGlzLmltYWdlOnRoaXMub3B0aW9ucy5pbWFnZTtcclxuICAgIHRoaXMub3B0aW9ucy5iZ0NvbG9yID0gKHRoaXMuYmdDb2xvcik/dGhpcy5iZ0NvbG9yOnRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnM9KHRoaXMuY2hhcmFjdGVycyk/dGhpcy5jaGFyYWN0ZXJzOiB0aGlzLm9wdGlvbnMuY2hhcmFjdGVyczsgXHJcbiAgICB0aGlzLm9wdGlvbnMudGV4dENvbG9yID0odGhpcy50ZXh0Q29sb3IpP3RoaXMudGV4dENvbG9yOnRoaXMub3B0aW9ucy50ZXh0Q29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLnNpemUgPSh0aGlzLnNpemUpP3RoaXMuc2l6ZTogdGhpcy5vcHRpb25zLnNpemU7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSh0aGlzLmZvbnRTaXplKT90aGlzLmZvbnRTaXplOnRoaXMub3B0aW9ucy5mb250U2l6ZTsgXHJcbiAgICB0aGlzLm9wdGlvbnMucm91bmRlZCA9KHRoaXMucm91bmRlZCk/dGhpcy5yb3VuZGVkOnRoaXMub3B0aW9ucy5yb3VuZGVkIDsgXHJcbiAgICB0aGlzLm9wdGlvbnMucmFkaXVzID0oIHRoaXMucmFkaXVzKT8gdGhpcy5yYWRpdXM6dGhpcy5vcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMub3B0aW9ucy5tYXJnaW4gPSggdGhpcy5tYXJnaW4pPyB0aGlzLm1hcmdpbjogdGhpcy5vcHRpb25zLm1hcmdpbjtcclxuICAgIHRoaXMub3B0aW9ucy5yYW5kb21Db2xvciA9KHRoaXMucmFuZG9tQ29sb3IpP3RoaXMucmFuZG9tQ29sb3I6IHRoaXMub3B0aW9ucy5yYW5kb21Db2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWwgPSh0aGlzLmxhYmVsKT90aGlzLmxhYmVsOnRoaXMub3B0aW9ucy5sYWJlbCA7XHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yID0odGhpcy5sYWJlbEJnQ29sb3IpP3RoaXMubGFiZWxCZ0NvbG9yOnRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvciA9KHRoaXMubGFiZWxUZXh0Q29sb3IpP3RoaXMubGFiZWxUZXh0Q29sb3I6IHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuYWN0aXZlID0odGhpcy5hY3RpdmUpPyB0aGlzLmFjdGl2ZTp0aGlzLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgdGhpcy5vcHRpb25zLnVwbG9hZGFibGUgPSggdGhpcy51cGxvYWRhYmxlKT8gdGhpcy51cGxvYWRhYmxlOnRoaXMub3B0aW9ucy51cGxvYWRhYmxlO1xyXG5cclxuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZihjaGFuZ2VzKXtcclxuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBkZXRlY3RlZCcpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShyID0+IGNvbnNvbGUubG9nKCdjaGFuZ2VkJywgci5rZXkgKSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygnYWRkZWQgJyAsIHIua2V5ICwgci5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdyZW1vdmVkICcgLCByLmtleSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICAvLyB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zb2xlLmxvZygnbm90aGluZyBjaGFuZ2VkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4iXX0=