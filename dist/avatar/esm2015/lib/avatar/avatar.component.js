/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers } from '@angular/core';
import * as SVG from 'svg.js';
import { DefaultAvatarOptions, Size, palette } from '../avatar.class';
import { AvatarService } from '../service/avatar.service';
export class Avatar {
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
export class AvatarComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFFTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sRUFBRSxvQkFBb0IsRUFBZ0MsSUFBSSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRCxNQUFNOzs7Ozs7SUFPSixZQUFvQixHQUF5QixFQUFVLElBQTZCLEVBQVUsSUFBcUI7UUFBL0YsUUFBRyxHQUFILEdBQUcsQ0FBc0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUF5QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWlCO1FBQ2pILEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBYTtRQUN6QixxQkFBSSxDQUFNLENBQUM7UUFDWCxxQkFBSSxDQUFNLENBQUM7UUFDWCxxQkFBSSxDQUFNLENBQUM7UUFDWCxxQkFBSSxHQUFRLENBQUM7UUFD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QyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDbkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9B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WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDaEM7S0FDRjs7O1lBcEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUExV0MsVUFBVTtZQVlILGFBQWE7WUFMcEIsZUFBZTs7O3NCQXdXZCxLQUFLO21CQUNMLEtBQUs7eUJBQ0wsS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7MEJBQ0wsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBRUwsTUFBTTt5QkFJTixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcclxuICBDb21wb25lbnQsIFxyXG4gIEVsZW1lbnRSZWYsIFxyXG4gIElucHV0LCBcclxuICBPbkNoYW5nZXMsIFxyXG4gIEhvc3RMaXN0ZW5lciwgXHJcbiAgRXZlbnRFbWl0dGVyLCBcclxuICBPdXRwdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgU1ZHIGZyb20gJ3N2Zy5qcyc7XHJcblxyXG5pbXBvcnQgeyBEZWZhdWx0QXZhdGFyT3B0aW9ucywgSUF2YXRhck9wdGlvbnMsIElDc3NQcm9wZXJ0eSwgU2l6ZSwgcGFsZXR0ZX0gZnJvbSAnLi4vYXZhdGFyLmNsYXNzJztcclxuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhciB7XHJcbiAgLy8gSFRNTCBFbGVtZW50XHJcbiAgZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nO1xyXG4gIC8vIEF2YXRhciBPcHRpb25zIFxyXG4gIG9wdGlvbnM6IElBdmF0YXJPcHRpb25zO1xyXG5cclxuICAvL1NldCB2YWx1ZXMgb2YgZWxlbWVudCwgb3B0aW9ucyxcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcsIHByaXZhdGUgYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIHByaXZhdGUgYXJnMj86IElBdmF0YXJPcHRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJnMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmVsID0gQXZhdGFyLmdldEVsZW1lbnQoX2VsKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IEF2YXRhci5nZXRPcHRpb25zKGFyZzEsIGFyZzIpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0RhcmsoY29sb3I6IHN0cmluZykge1xyXG4gICAgbGV0IHI6IGFueTtcclxuICAgIGxldCBiOiBhbnk7XHJcbiAgICBsZXQgZzogYW55O1xyXG4gICAgbGV0IGhzcDogYW55O1xyXG4gICAgbGV0IGE6IGFueSA9IGNvbG9yO1xyXG5cclxuICAgIGlmIChhLm1hdGNoKC9ecmdiLykpIHtcclxuICAgICAgYSA9IGEubWF0Y2goL15yZ2JhP1xcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKykoPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KSk/XFwpJC8pO1xyXG4gICAgICByID0gYVsxXTtcclxuICAgICAgZyA9IGFbMl07XHJcbiAgICAgIGIgPSBhWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9ICsoJzB4JyArIGEuc2xpY2UoMSkucmVwbGFjZShcclxuICAgICAgICAgIGEubGVuZ3RoIDwgNSAmJiAvLi9nLCAnJCYkJidcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHIgPSBhID4+IDE2OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgICBiID0gYSA+PiA4ICYgMjU1OyAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgZyA9IGEgJiAyNTU7ICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgICBoc3AgPSBNYXRoLnNxcnQoXHJcbiAgICAgIDAuMjk5ICogKHIgKiByKSArXHJcbiAgICAgIDAuNTg3ICogKGcgKiBnKSArXHJcbiAgICAgIDAuMTE0ICogKGIgKiBiKVxyXG4gICAgKTtcclxuICAgIHJldHVybiAoaHNwIDwgMjAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFbGVtZW50KF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBpZiAoIV9lbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgbm90IHByb3ZpZGVkJyk7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZWwpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChfZWwgYXMgc3RyaW5nKSk7XHJcbiAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gKGVsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGlzIG5vdCBwcmVzZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAoX2VsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBleHBhbmRQcm9wZXJ0eSh2YWx1ZT86IHN0cmluZyB8IG51bWJlcik6IElDc3NQcm9wZXJ0eSB7XHJcbiAgICBjb25zdCByZXR1cm5PYmo6IElDc3NQcm9wZXJ0eSA9IHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICByaWdodDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwXHJcbiAgICB9O1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgIHJldHVybk9iai50b3AgPSByZXR1cm5PYmouYm90dG9tID0gcmV0dXJuT2JqLmxlZnQgPSByZXR1cm5PYmoucmlnaHQgPSAodmFsdWUgYXMgbnVtYmVyKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gKHZhbHVlIGFzIHN0cmluZykuc3BsaXQoJyAnKS5tYXAoKG06IHN0cmluZykgPT4gK20ucmVwbGFjZSgvXFxEL2csICcnKSk7XHJcbiAgICAgICAgICBzd2l0Y2ggKHByb3BlcnRpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1swXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICByZXR1cm5PYmouYm90dG9tID0gcHJvcGVydGllc1syXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmxlZnQgPSBwcm9wZXJ0aWVzWzNdO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0T3B0aW9ucyhhcmcxOiBJQXZhdGFyT3B0aW9ucyB8IHN0cmluZywgYXJnMj86IElBdmF0YXJPcHRpb25zKTogSUF2YXRhck9wdGlvbnMge1xyXG4gICAgY29uc3QgX2RlZmF1bHQ6IElBdmF0YXJPcHRpb25zID0gbmV3IERlZmF1bHRBdmF0YXJPcHRpb25zKCk7XHJcbiAgICBsZXQgX29wdGlvbnM6IElBdmF0YXJPcHRpb25zID0geyAuLi5fZGVmYXVsdCB9O1xyXG4gICAgc3dpdGNoICh0eXBlb2YgYXJnMSkge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIF9vcHRpb25zLm5hbWUgPSAoYXJnMSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIGlmICghKGFyZzEgYXMgSUF2YXRhck9wdGlvbnMpLm5hbWUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmFtZSBpcyByZXF1aXJlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcxIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyZzIgJiYgdHlwZW9mIGFyZzIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIF9vcHRpb25zID0geyAuLi5fb3B0aW9ucywgLi4uKGFyZzIgYXMgSUF2YXRhck9wdGlvbnMpIH07XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBfb3B0aW9ucykge1xyXG4gICAgICBpZiAodHlwZW9mIF9vcHRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgX29wdGlvbnNba2V5XSA9IF9kZWZhdWx0W2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgX29wdGlvbnMuc2l6ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgX29wdGlvbnMuc2l6ZSA9IFNpemVbKF9vcHRpb25zLnNpemUgYXMgYW55KV07XHJcbiAgICAgIGlmICghX29wdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9vcHRpb25zLmZvbnRTaXplID0gKF9vcHRpb25zLnNpemUgYXMgbnVtYmVyKSAqIDAuNDtcclxuXHJcbiAgICBpZiAoIUF2YXRhci5pc0RhcmsoKF9vcHRpb25zLmJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMudGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgaWYgKF9vcHRpb25zLmxhYmVsICYmICFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5sYWJlbEJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMubGFiZWxUZXh0Q29sb3IgPSAnIzAwMCc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyAuLi5fb3B0aW9ucyB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHByb3A6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgdGhpcy5vcHRpb25zID0gPElBdmF0YXJPcHRpb25zPntcclxuICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICBbcHJvcF06IHZhbHVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgICh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBTVkcoKHRoaXMuZWwgYXMgSFRNTEVsZW1lbnQpKTtcclxuICAgIGNvbnN0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0IH0gPSBBdmF0YXIuZXhwYW5kUHJvcGVydHkodGhpcy5vcHRpb25zLm1hcmdpbik7XHJcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRTaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9IHNpemUgKiAwLjQ7XHJcbiAgICBzdmdFbGVtZW50LnNpemUoc2l6ZSArIGxlZnQgKyByaWdodCwgc2l6ZSArIHRvcCArIGJvdHRvbSk7XHJcblxyXG4gICAgXHJcbiAgICBsZXQgc2hhcGU6IGFueTtcclxuICAgIGxldCB1cGxvYWRTaGFwZSA6IGFueTtcclxuICAgIGxldCB1cGxvYWRJY29uOiBhbnk7XHJcbiAgICBsZXQgaW1hZ2U6IGFueTtcclxuICAgIGxldCB0ZXh0OiBhbnk7XHJcbiAgICBsZXQgbGFiZWw6IGFueTtcclxuICAgIGxldCBsYWJlbFRleHQ6IGFueTtcclxuXHJcbiAgICAvL1JvdW5kZWRcclxuICAgIC8vQm94ZWRcclxuICAgIC8vUm91bmRlZCBCb3ggKGlmIHJhZGl1cyBpcyBwcm92aWRlZClcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICBzaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAuY2lyY2xlKHNpemUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSlcclxuICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vQmctQ29sb3JcclxuICAgIC8vQWN0aXZlXHJcbiAgICBzaGFwZVxyXG4gICAgICAuZmlsbCh0aGlzLmdldEJnQ29sb3IoKSlcclxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC41KVxyXG4gICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG4gICBcclxuICAgICAgXHJcbiAgICAvL2ltYWdlXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltYWdlKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpbWFnZSA9IHN2Z0VsZW1lbnQuaW1hZ2UodGhpcy5vcHRpb25zLmltYWdlKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHLkltYWdlKSB7XHJcbiAgICAgICAgbGV0IGM6IGFueTtcclxuICAgICAgICBpZiAodGhhdC5vcHRpb25zLnJvdW5kZWQpIHtcclxuICAgICAgICAgIGMgPSBzdmdFbGVtZW50LmNpcmNsZShzaXplIC0gNCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGMgPSBzdmdFbGVtZW50LnJlY3Qoc2l6ZSAtIDQsIHNpemUgLSA0KS5yYWRpdXMoKHRoYXQub3B0aW9ucy5yYWRpdXMgYXMgbnVtYmVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGMubW92ZShsZWZ0ICsgMiwgdG9wICsgMik7XHJcbiAgICAgICAgdGhpcy5zaXplKHNpemUpXHJcbiAgICAgICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCAoc2l6ZSAvIDIpICsgdG9wKS5jbGlwV2l0aChjKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgIC8vdGV4dFxyXG4gICAgIHRleHQgPSBzdmdFbGVtZW50XHJcbiAgICAgLnRleHQodGhpcy5nZXRTbHVnKCkpXHJcbiAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC44KVxyXG4gICAgIC5maWxsKHRoaXMub3B0aW9ucy50ZXh0Q29sb3IpXHJcbiAgICAgLmZvbnQoe1xyXG4gICAgICBzaXplOiB0aGlzLm9wdGlvbnMuZm9udFNpemUsXHJcbiAgICAgfSlcclxuICAgICAuY2VudGVyKChzaXplIC8gMikgKyBsZWZ0LCAoc2l6ZSAvIDIpICsgdG9wKTtcclxuXHJcbiAgICAvL2xhYmVsXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmxhYmVsKSB7XHJcbiAgICAgIGxhYmVsID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC5yZWN0KHNpemUsIHNpemUgKiAwLjI1KVxyXG4gICAgICAgIC5yYWRpdXMoMilcclxuICAgICAgICAuZmlsbCh0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yKVxyXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuOClcclxuICAgICAgICAubW92ZShsZWZ0LCB0b3AgKyBzaXplIC0gKHNpemUgKiAwLjI1KSk7XHJcblxyXG4gICAgICBsYWJlbFRleHQgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnRleHQodGhpcy5vcHRpb25zLmxhYmVsKVxyXG4gICAgICAgIC5maWxsKHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvcilcclxuICAgICAgICAuZm9udCh7XHJcbiAgICAgICAgICBzaXplOiBzaXplICogMC4yNVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgdG9wICsgc2l6ZSAtICgoc2l6ZSAqIDAuMjUpIC8gMikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdXBsb2FkXHJcbiAgICBpZih0aGlzLm9wdGlvbnMudXBsb2FkYWJsZT09dHJ1ZSl7XHJcbiAgICAgIFxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJvdW5kZWQ9PXRydWUpIHtcclxuICAgICAgICB1cGxvYWRTaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAgIC5jaXJjbGUoc2l6ZSk7IFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVwbG9hZFNoYXBlID0gc3ZnRWxlbWVudFxyXG4gICAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSlcclxuICAgICAgICAgIC5yYWRpdXMoKHRoaXMub3B0aW9ucy5yYWRpdXMgYXMgbnVtYmVyKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwbG9hZFNoYXBlXHJcbiAgICAgICAgLmZpbGwoXCJncmV5XCIpXHJcbiAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApXHJcbiAgICAgICAgLm1vdmUobGVmdCwgdG9wKTtcclxuXHJcbiAgICAgIC8vVXBsb2FkSWNvblxyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgdXBsb2FkSWNvbiA9IHN2Z0VsZW1lbnQuaW1hZ2UoXCIuLi9hc3NldHMvaW1hZ2VzL2NhbWVyYS5zdmdcIikubG9hZGVkKGZ1bmN0aW9uKHRoaXM6IFNWRy5JbWFnZSkge1xyXG4gICAgICAgICAgbGV0IGM6IGFueTtcclxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucm91bmRlZCkge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYyA9IHN2Z0VsZW1lbnQucmVjdChzaXplIC0gNCwgc2l6ZSAtIDQpLnJhZGl1cygodGhhdC5vcHRpb25zLnJhZGl1cyBhcyBudW1iZXIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMubW92ZShsZWZ0ICsgMiwgdG9wICsgMik7XHJcbiAgICAgICAgICB0aGlzLnNpemUoc2l6ZSowLjUpXHJcbiAgICAgICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIChzaXplIC8gMikgKyB0b3ApLmNsaXBXaXRoKGMpXHJcbiAgICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHN2Z0VsZW1lbnQubW91c2VvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGVcclxuICAgICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjc1KTtcclxuICAgICAgICBcclxuICAgICAgICB1cGxvYWRJY29uXHJcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcblxyXG4gICAgICAgIGlmKGxhYmVsIT1udWxsKXtcclxuICAgICAgICBsYWJlbC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcclxuICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMC4yNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMC4yNSk7fVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgIHVwbG9hZFNoYXBlLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHVwbG9hZEljb24uYXR0cignb3BhY2l0eScsIDApO1xyXG4gICAgICAgIHRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgICAgbGFiZWxcclxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgbGFiZWxUZXh0LmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGlmKGltYWdlIT1udWxsKXtpbWFnZS5hdHRyKCdvcGFjaXR5JywgMSk7fVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vUHJpbnQgSW5pdGlhbHNcclxuICBwcml2YXRlIGdldFNsdWcoKSB7XHJcbiAgICAvL1JldHVybiBub3RoaW5nIGlmIERORVxyXG4gICAgaWYoIXRoaXMub3B0aW9ucy5uYW1lKXtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIGluaXRpYWxzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lICYmIHRoaXMub3B0aW9ucy5uYW1lLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBuYW1lSW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZS5tYXRjaCgvXFxiKFxcdykvZyk7XHJcbiAgICAgIGlmIChuYW1lSW5pdGlhbHMpIHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBuYW1lQ2hhcnMgPSBuYW1lSW5pdGlhbHMuc2xpY2UoMCwgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnMrMSkuam9pbignJyk7XHJcbiAgICAgICAgaW5pdGlhbHMgPSBuYW1lQ2hhcnMudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5pdGlhbHMgPSB0aGlzLm9wdGlvbnMubmFtZVswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9SZXR1cm4gdGhlIHNldCBuby4gb2YgY2hhcmFjdGVyc1xyXG4gICAgICByZXR1cm4gaW5pdGlhbHMuc2xpY2UoMCx0aGlzLm9wdGlvbnMuY2hhcmFjdGVycylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQmdDb2xvclxyXG4gIHByaXZhdGUgZ2V0QmdDb2xvcigpe1xyXG4gICAgaWYodGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yKXtcclxuICAgICByZXR1cm4gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9HZXQgU2l6ZSBPZiBBdmF0YXIgRWxlbWVudFxyXG4gIHByaXZhdGUgZ2V0U2l6ZSgpe1xyXG4gICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy5zaXplID09PSAnbnVtYmVyJyl7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTsgXHJcbiAgICB9ZWxzZSBpZih0eXBlb2YgU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIFNpemVbKHRoaXMub3B0aW9ucy5zaXplKV07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIFNpemVbJ21kJ107XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmF0YXInLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSAgLS0+YCxcclxuICBwcm92aWRlcnM6IFtBdmF0YXJTZXJ2aWNlXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhckNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xyXG5cclxuICBhdmF0YXI6IEF2YXRhcjtcclxuICBASW5wdXQoKSBvcHRpb25zOiBJQXZhdGFyT3B0aW9ucztcclxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcclxuICBASW5wdXQoKSBjaGFyYWN0ZXJzOm51bWJlcjtcclxuICBASW5wdXQoKSBpbWFnZTpzdHJpbmc7XHJcbiAgQElucHV0KCkgYmdDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgdGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBzaXplOm51bWJlcnxzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9udFNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByb3VuZGVkOmJvb2xlYW47XHJcbiAgQElucHV0KCkgcmFkaXVzOm51bWJlcjtcclxuICBASW5wdXQoKSBtYXJnaW46bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSByYW5kb21Db2xvcjpib29sZWFuO1xyXG4gIEBJbnB1dCgpIGxhYmVsIDpzdHJpbmc7XHJcbiAgQElucHV0KCkgbGFiZWxCZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbFRleHRDb2xvcjpzdHJpbmc7XHJcbiAgQElucHV0KCkgYWN0aXZlOmJvb2xlYW47XHJcbiAgQElucHV0KCkgdXBsb2FkYWJsZTpib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgdXBsb2FkOiBcclxuICAgIEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGRpZmZlcjphbnk7IFxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgRW1pdFVwbG9hZCAoKXtcclxuICAgIGlmICh0aGlzLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICB0aGlzLnVwbG9hZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfSBcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGF2YXRhclNlcnZpY2U6IEF2YXRhclNlcnZpY2UsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XHJcbiAgICBcclxuICAgIHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG4gIFxyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5hdmF0YXJTZXJ2aWNlLmdldEF2YXRhckNvbmZpZygpO1xyXG4gICAgdGhpcy5hdmF0YXIgPSBuZXcgQXZhdGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5pbWFnZSB8fCB0aGlzLm5hbWUgfHwgdGhpcy5vcHRpb25zLm5hbWUgfHwgdGhpcy5vcHRpb25zLmltYWdlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMubmFtZSA9ICh0aGlzLm5hbWUpP3RoaXMubmFtZTp0aGlzLm9wdGlvbnMubmFtZTtcclxuICAgIHRoaXMub3B0aW9ucy5pbWFnZSA9ICh0aGlzLmltYWdlKT90aGlzLmltYWdlOnRoaXMub3B0aW9ucy5pbWFnZTtcclxuICAgIHRoaXMub3B0aW9ucy5iZ0NvbG9yID0gKHRoaXMuYmdDb2xvcik/dGhpcy5iZ0NvbG9yOnRoaXMub3B0aW9ucy5iZ0NvbG9yO1xyXG4gICAgdGhpcy5vcHRpb25zLmNoYXJhY3RlcnM9KHRoaXMuY2hhcmFjdGVycyk/dGhpcy5jaGFyYWN0ZXJzOiB0aGlzLm9wdGlvbnMuY2hhcmFjdGVyczsgXHJcbiAgICB0aGlzLm9wdGlvbnMudGV4dENvbG9yID0odGhpcy50ZXh0Q29sb3IpP3RoaXMudGV4dENvbG9yOnRoaXMub3B0aW9ucy50ZXh0Q29sb3I7IFxyXG4gICAgdGhpcy5vcHRpb25zLnNpemUgPSh0aGlzLnNpemUpP3RoaXMuc2l6ZTogdGhpcy5vcHRpb25zLnNpemU7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9udFNpemUgPSh0aGlzLmZvbnRTaXplKT90aGlzLmZvbnRTaXplOnRoaXMub3B0aW9ucy5mb250U2l6ZTsgXHJcbiAgICB0aGlzLm9wdGlvbnMucm91bmRlZCA9KHRoaXMucm91bmRlZCk/dGhpcy5yb3VuZGVkOnRoaXMub3B0aW9ucy5yb3VuZGVkIDsgXHJcbiAgICB0aGlzLm9wdGlvbnMucmFkaXVzID0oIHRoaXMucmFkaXVzKT8gdGhpcy5yYWRpdXM6dGhpcy5vcHRpb25zLnJhZGl1cztcclxuICAgIHRoaXMub3B0aW9ucy5tYXJnaW4gPSggdGhpcy5tYXJnaW4pPyB0aGlzLm1hcmdpbjogdGhpcy5vcHRpb25zLm1hcmdpbjtcclxuICAgIHRoaXMub3B0aW9ucy5yYW5kb21Db2xvciA9KHRoaXMucmFuZG9tQ29sb3IpP3RoaXMucmFuZG9tQ29sb3I6IHRoaXMub3B0aW9ucy5yYW5kb21Db2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWwgPSh0aGlzLmxhYmVsKT90aGlzLmxhYmVsOnRoaXMub3B0aW9ucy5sYWJlbCA7XHJcbiAgICB0aGlzLm9wdGlvbnMubGFiZWxCZ0NvbG9yID0odGhpcy5sYWJlbEJnQ29sb3IpP3RoaXMubGFiZWxCZ0NvbG9yOnRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvciA9KHRoaXMubGFiZWxUZXh0Q29sb3IpP3RoaXMubGFiZWxUZXh0Q29sb3I6IHRoaXMub3B0aW9ucy5sYWJlbFRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuYWN0aXZlID0odGhpcy5hY3RpdmUpPyB0aGlzLmFjdGl2ZTp0aGlzLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgdGhpcy5vcHRpb25zLnVwbG9hZGFibGUgPSggdGhpcy51cGxvYWRhYmxlKT8gdGhpcy51cGxvYWRhYmxlOnRoaXMub3B0aW9ucy51cGxvYWRhYmxlO1xyXG5cclxuICAgIHZhciBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZihjaGFuZ2VzKXtcclxuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSBkZXRlY3RlZCcpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShyID0+IGNvbnNvbGUubG9nKCdjaGFuZ2VkJywgci5rZXkgKSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiBjb25zb2xlLmxvZygnYWRkZWQgJyAsIHIua2V5ICwgci5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcblxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdyZW1vdmVkICcgLCByLmtleSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShyID0+IHRoaXMuYXZhdGFyLnVwZGF0ZShyLmtleSxyLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICAvLyB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zb2xlLmxvZygnbm90aGluZyBjaGFuZ2VkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4iXX0=