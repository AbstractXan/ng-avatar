/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, HostListener, EventEmitter, Output, KeyValueDiffers } from '@angular/core';
import * as SVG_ from 'svg.js';
const /** @type {?} */ SVG = SVG_;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F2YXRhci8iLCJzb3VyY2VzIjpbImxpYi9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFFTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQy9CLHVCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFFakIsT0FBTyxFQUFFLG9CQUFvQixFQUFnQyxJQUFJLEVBQUUsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTFELE1BQU07Ozs7OztJQU9KLFlBQW9CLEdBQXlCLEVBQVUsSUFBNkIsRUFBVSxJQUFxQjtRQUEvRixRQUFHLEdBQUgsR0FBRyxDQUFzQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFDakgsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQztTQUNSO1FBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQ3pCLHFCQUFJLENBQU0sQ0FBQztRQUNYLHFCQUFJLENBQU0sQ0FBQztRQUNYLHFCQUFJLENB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Q3hFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUU7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUUsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMs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Q0FBQzs7U0FHM0U7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQTNXQyxVQUFVO1lBYUgsYUFBYTtZQU5wQixlQUFlOzs7c0JBeVdkLEtBQUs7bUJBQ0wsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7c0JBQ0wsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSzswQkFDTCxLQUFLO29CQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFFTCxNQUFNO3lCQUlOLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFxyXG4gIENvbXBvbmVudCwgXHJcbiAgRWxlbWVudFJlZiwgXHJcbiAgSW5wdXQsIFxyXG4gIE9uQ2hhbmdlcywgXHJcbiAgSG9zdExpc3RlbmVyLCBcclxuICBFdmVudEVtaXR0ZXIsIFxyXG4gIE91dHB1dCxcclxuICBEb0NoZWNrLFxyXG4gIEtleVZhbHVlRGlmZmVyc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBTVkdfIGZyb20gJ3N2Zy5qcyc7XHJcbmNvbnN0IFNWRyA9IFNWR187XHJcblxyXG5pbXBvcnQgeyBEZWZhdWx0QXZhdGFyT3B0aW9ucywgSUF2YXRhck9wdGlvbnMsIElDc3NQcm9wZXJ0eSwgU2l6ZSwgcGFsZXR0ZX0gZnJvbSAnLi4vYXZhdGFyLmNsYXNzJztcclxuaW1wb3J0IHsgQXZhdGFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvYXZhdGFyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF2YXRhciB7XHJcbiAgLy8gSFRNTCBFbGVtZW50XHJcbiAgZWw6IEhUTUxFbGVtZW50IHwgc3RyaW5nO1xyXG4gIC8vIEF2YXRhciBPcHRpb25zIFxyXG4gIG9wdGlvbnM6IElBdmF0YXJPcHRpb25zO1xyXG5cclxuICAvL1NldCB2YWx1ZXMgb2YgZWxlbWVudCwgb3B0aW9ucyxcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcsIHByaXZhdGUgYXJnMTogSUF2YXRhck9wdGlvbnMgfCBzdHJpbmcsIHByaXZhdGUgYXJnMj86IElBdmF0YXJPcHRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJnMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmVsID0gQXZhdGFyLmdldEVsZW1lbnQoX2VsKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IEF2YXRhci5nZXRPcHRpb25zKGFyZzEsIGFyZzIpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0RhcmsoY29sb3I6IHN0cmluZykge1xyXG4gICAgbGV0IHI6IGFueTtcclxuICAgIGxldCBiOiBhbnk7XHJcbiAgICBsZXQgZzogYW55O1xyXG4gICAgbGV0IGhzcDogYW55O1xyXG4gICAgbGV0IGE6IGFueSA9IGNvbG9yO1xyXG5cclxuICAgIGlmIChhLm1hdGNoKC9ecmdiLykpIHtcclxuICAgICAgYSA9IGEubWF0Y2goL15yZ2JhP1xcKChcXGQrKSxcXHMqKFxcZCspLFxccyooXFxkKykoPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KSk/XFwpJC8pO1xyXG4gICAgICByID0gYVsxXTtcclxuICAgICAgZyA9IGFbMl07XHJcbiAgICAgIGIgPSBhWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9ICsoJzB4JyArIGEuc2xpY2UoMSkucmVwbGFjZShcclxuICAgICAgICAgIGEubGVuZ3RoIDwgNSAmJiAvLi9nLCAnJCYkJidcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHIgPSBhID4+IDE2OyAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gICAgICBiID0gYSA+PiA4ICYgMjU1OyAgIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgZyA9IGEgJiAyNTU7ICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgICBoc3AgPSBNYXRoLnNxcnQoXHJcbiAgICAgIDAuMjk5ICogKHIgKiByKSArXHJcbiAgICAgIDAuNTg3ICogKGcgKiBnKSArXHJcbiAgICAgIDAuMTE0ICogKGIgKiBiKVxyXG4gICAgKTtcclxuICAgIHJldHVybiAoaHNwIDwgMjAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFbGVtZW50KF9lbDogSFRNTEVsZW1lbnQgfCBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICBpZiAoIV9lbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgbm90IHByb3ZpZGVkJyk7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHR5cGVvZiBfZWwpIHtcclxuICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChfZWwgYXMgc3RyaW5nKSk7XHJcbiAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gKGVsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGlzIG5vdCBwcmVzZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAoX2VsIGFzIEhUTUxFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBleHBhbmRQcm9wZXJ0eSh2YWx1ZT86IHN0cmluZyB8IG51bWJlcik6IElDc3NQcm9wZXJ0eSB7XHJcbiAgICBjb25zdCByZXR1cm5PYmo6IElDc3NQcm9wZXJ0eSA9IHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICByaWdodDogMCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICBsZWZ0OiAwXHJcbiAgICB9O1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgIHJldHVybk9iai50b3AgPSByZXR1cm5PYmouYm90dG9tID0gcmV0dXJuT2JqLmxlZnQgPSByZXR1cm5PYmoucmlnaHQgPSAodmFsdWUgYXMgbnVtYmVyKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gKHZhbHVlIGFzIHN0cmluZykuc3BsaXQoJyAnKS5tYXAoKG06IHN0cmluZykgPT4gK20ucmVwbGFjZSgvXFxEL2csICcnKSk7XHJcbiAgICAgICAgICBzd2l0Y2ggKHByb3BlcnRpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICByZXR1cm5PYmoudG9wID0gcmV0dXJuT2JqLmJvdHRvbSA9IHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1swXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5sZWZ0ID0gcmV0dXJuT2JqLnJpZ2h0ID0gcHJvcGVydGllc1sxXTtcclxuICAgICAgICAgICAgICByZXR1cm5PYmouYm90dG9tID0gcHJvcGVydGllc1syXTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIHJldHVybk9iai5yaWdodCA9IHByb3BlcnRpZXNbMV07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmJvdHRvbSA9IHByb3BlcnRpZXNbMl07XHJcbiAgICAgICAgICAgICAgcmV0dXJuT2JqLmxlZnQgPSBwcm9wZXJ0aWVzWzNdO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0T3B0aW9ucyhhcmcxOiBJQXZhdGFyT3B0aW9ucyB8IHN0cmluZywgYXJnMj86IElBdmF0YXJPcHRpb25zKTogSUF2YXRhck9wdGlvbnMge1xyXG4gICAgY29uc3QgX2RlZmF1bHQ6IElBdmF0YXJPcHRpb25zID0gbmV3IERlZmF1bHRBdmF0YXJPcHRpb25zKCk7XHJcbiAgICBsZXQgX29wdGlvbnM6IElBdmF0YXJPcHRpb25zID0geyAuLi5fZGVmYXVsdCB9O1xyXG4gICAgc3dpdGNoICh0eXBlb2YgYXJnMSkge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIF9vcHRpb25zLm5hbWUgPSAoYXJnMSBhcyBzdHJpbmcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgIGlmICghKGFyZzEgYXMgSUF2YXRhck9wdGlvbnMpLm5hbWUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmFtZSBpcyByZXF1aXJlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMsIC4uLihhcmcxIGFzIElBdmF0YXJPcHRpb25zKSB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyZzIgJiYgdHlwZW9mIGFyZzIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIF9vcHRpb25zID0geyAuLi5fb3B0aW9ucywgLi4uKGFyZzIgYXMgSUF2YXRhck9wdGlvbnMpIH07XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBfb3B0aW9ucykge1xyXG4gICAgICBpZiAodHlwZW9mIF9vcHRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgX29wdGlvbnNba2V5XSA9IF9kZWZhdWx0W2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgX29wdGlvbnMuc2l6ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgX29wdGlvbnMuc2l6ZSA9IFNpemVbKF9vcHRpb25zLnNpemUgYXMgYW55KV07XHJcbiAgICAgIGlmICghX29wdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgIF9vcHRpb25zLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9vcHRpb25zLmZvbnRTaXplID0gKF9vcHRpb25zLnNpemUgYXMgbnVtYmVyKSAqIDAuNDtcclxuXHJcbiAgICBpZiAoIUF2YXRhci5pc0RhcmsoKF9vcHRpb25zLmJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMudGV4dENvbG9yID0gJyMwMDAnO1xyXG4gICAgfVxyXG4gICAgaWYgKF9vcHRpb25zLmxhYmVsICYmICFBdmF0YXIuaXNEYXJrKChfb3B0aW9ucy5sYWJlbEJnQ29sb3IgYXMgYW55KSkpIHtcclxuICAgICAgX29wdGlvbnMubGFiZWxUZXh0Q29sb3IgPSAnIzAwMCc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyAuLi5fb3B0aW9ucyB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHByb3A6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgdGhpcy5vcHRpb25zID0gPElBdmF0YXJPcHRpb25zPntcclxuICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICBbcHJvcF06IHZhbHVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgICh0aGlzLmVsIGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBTVkcoKHRoaXMuZWwgYXMgSFRNTEVsZW1lbnQpKTtcclxuICAgIGNvbnN0IHsgdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0IH0gPSBBdmF0YXIuZXhwYW5kUHJvcGVydHkodGhpcy5vcHRpb25zLm1hcmdpbik7XHJcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRTaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9IHNpemUgKiAwLjQ7XHJcbiAgICBzdmdFbGVtZW50LnNpemUoc2l6ZSArIGxlZnQgKyByaWdodCwgc2l6ZSArIHRvcCArIGJvdHRvbSk7XHJcblxyXG4gICAgXHJcbiAgICBsZXQgc2hhcGU6IGFueTtcclxuICAgIGxldCB1cGxvYWRTaGFwZSA6IGFueTtcclxuICAgIGxldCB1cGxvYWRJY29uOiBhbnk7XHJcbiAgICBsZXQgaW1hZ2U6IGFueTtcclxuICAgIGxldCB0ZXh0OiBhbnk7XHJcbiAgICBsZXQgbGFiZWw6IGFueTtcclxuICAgIGxldCBsYWJlbFRleHQ6IGFueTtcclxuXHJcbiAgICAvL1JvdW5kZWRcclxuICAgIC8vQm94ZWRcclxuICAgIC8vUm91bmRlZCBCb3ggKGlmIHJhZGl1cyBpcyBwcm92aWRlZClcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucm91bmRlZD09dHJ1ZSkge1xyXG4gICAgICBzaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAuY2lyY2xlKHNpemUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgLnJlY3Qoc2l6ZSwgc2l6ZSlcclxuICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vQmctQ29sb3JcclxuICAgIC8vQWN0aXZlXHJcbiAgICBzaGFwZVxyXG4gICAgICAuZmlsbCh0aGlzLmdldEJnQ29sb3IoKSlcclxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIHRoaXMub3B0aW9ucy5hY3RpdmUgPyAxIDogMC41KVxyXG4gICAgICAubW92ZShsZWZ0LCB0b3ApO1xyXG4gICBcclxuICAgICAgXHJcbiAgICAvL2ltYWdlXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltYWdlKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpbWFnZSA9IHN2Z0VsZW1lbnQuaW1hZ2UodGhpcy5vcHRpb25zLmltYWdlKS5sb2FkZWQoZnVuY3Rpb24odGhpczogU1ZHXy5JbWFnZSkge1xyXG4gICAgICAgIGxldCBjOiBhbnk7XHJcbiAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5yb3VuZGVkKSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5jaXJjbGUoc2l6ZSAtIDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjID0gc3ZnRWxlbWVudC5yZWN0KHNpemUgLSA0LCBzaXplIC0gNCkucmFkaXVzKCh0aGF0Lm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLm1vdmUobGVmdCArIDIsIHRvcCArIDIpO1xyXG4gICAgICAgIHRoaXMuc2l6ZShzaXplKVxyXG4gICAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCkuY2xpcFdpdGgoYyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICAvL3RleHRcclxuICAgICB0ZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgIC50ZXh0KHRoaXMuZ2V0U2x1ZygpKVxyXG4gICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCB0aGlzLm9wdGlvbnMuYWN0aXZlID8gMSA6IDAuOClcclxuICAgICAuZmlsbCh0aGlzLm9wdGlvbnMudGV4dENvbG9yKVxyXG4gICAgIC5mb250KHtcclxuICAgICAgc2l6ZTogdGhpcy5vcHRpb25zLmZvbnRTaXplLFxyXG4gICAgIH0pXHJcbiAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCk7XHJcblxyXG4gICAgLy9sYWJlbFxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5sYWJlbCkge1xyXG4gICAgICBsYWJlbCA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAucmVjdChzaXplLCBzaXplICogMC4yNSlcclxuICAgICAgICAucmFkaXVzKDIpXHJcbiAgICAgICAgLmZpbGwodGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvcilcclxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmFjdGl2ZSA/IDEgOiAwLjgpXHJcbiAgICAgICAgLm1vdmUobGVmdCwgdG9wICsgc2l6ZSAtIChzaXplICogMC4yNSkpO1xyXG5cclxuICAgICAgbGFiZWxUZXh0ID0gc3ZnRWxlbWVudFxyXG4gICAgICAgIC50ZXh0KHRoaXMub3B0aW9ucy5sYWJlbClcclxuICAgICAgICAuZmlsbCh0aGlzLm9wdGlvbnMubGFiZWxUZXh0Q29sb3IpXHJcbiAgICAgICAgLmZvbnQoe1xyXG4gICAgICAgICAgc2l6ZTogc2l6ZSAqIDAuMjVcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jZW50ZXIoKHNpemUgLyAyKSArIGxlZnQsIHRvcCArIHNpemUgLSAoKHNpemUgKiAwLjI1KSAvIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3VwbG9hZFxyXG4gICAgaWYodGhpcy5vcHRpb25zLnVwbG9hZGFibGU9PXRydWUpe1xyXG4gICAgICBcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb3VuZGVkPT10cnVlKSB7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUgPSBzdmdFbGVtZW50XHJcbiAgICAgICAgICAuY2lyY2xlKHNpemUpOyBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cGxvYWRTaGFwZSA9IHN2Z0VsZW1lbnRcclxuICAgICAgICAgIC5yZWN0KHNpemUsIHNpemUpXHJcbiAgICAgICAgICAucmFkaXVzKCh0aGlzLm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1cGxvYWRTaGFwZVxyXG4gICAgICAgIC5maWxsKFwiZ3JleVwiKVxyXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKVxyXG4gICAgICAgIC5tb3ZlKGxlZnQsIHRvcCk7XHJcblxyXG4gICAgICAvL1VwbG9hZEljb25cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHVwbG9hZEljb24gPSBzdmdFbGVtZW50LmltYWdlKFwiLi4vYXNzZXRzL2ltYWdlcy9jYW1lcmEuc3ZnXCIpLmxvYWRlZChmdW5jdGlvbih0aGlzOiBTVkdfLkltYWdlKSB7XHJcbiAgICAgICAgICBsZXQgYzogYW55O1xyXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5yb3VuZGVkKSB7XHJcbiAgICAgICAgICAgIGMgPSBzdmdFbGVtZW50LmNpcmNsZShzaXplIC0gNCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjID0gc3ZnRWxlbWVudC5yZWN0KHNpemUgLSA0LCBzaXplIC0gNCkucmFkaXVzKCh0aGF0Lm9wdGlvbnMucmFkaXVzIGFzIG51bWJlcikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYy5tb3ZlKGxlZnQgKyAyLCB0b3AgKyAyKTtcclxuICAgICAgICAgIHRoaXMuc2l6ZShzaXplKjAuNSlcclxuICAgICAgICAgICAgLmNlbnRlcigoc2l6ZSAvIDIpICsgbGVmdCwgKHNpemUgLyAyKSArIHRvcCkuY2xpcFdpdGgoYylcclxuICAgICAgICAgICAgLmF0dHIoJ29wYWNpdHknLDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgc3ZnRWxlbWVudC5tb3VzZW92ZXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBzaGFwZS5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuICAgICAgICB1cGxvYWRTaGFwZVxyXG4gICAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDAuNzUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHVwbG9hZEljb25cclxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgdGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuXHJcbiAgICAgICAgaWYobGFiZWwhPW51bGwpe1xyXG4gICAgICAgIGxhYmVsLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xyXG4gICAgICAgIGxhYmVsVGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjI1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaW1hZ2UhPW51bGwpe2ltYWdlLmF0dHIoJ29wYWNpdHknLCAwLjI1KTt9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBzdmdFbGVtZW50Lm1vdXNlb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgdXBsb2FkU2hhcGUuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XHJcbiAgICAgICAgdXBsb2FkSWNvbi5hdHRyKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgdGV4dC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKTtcclxuICAgICAgICBpZihsYWJlbCE9bnVsbCl7XHJcbiAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICBsYWJlbFRleHQuYXR0cignZmlsbC1vcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgaWYoaW1hZ2UhPW51bGwpe2ltYWdlLmF0dHIoJ29wYWNpdHknLCAxKTt9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9QcmludCBJbml0aWFsc1xyXG4gIHByaXZhdGUgZ2V0U2x1ZygpIHtcclxuICAgIC8vUmV0dXJuIG5vdGhpbmcgaWYgRE5FXHJcbiAgICBpZighdGhpcy5vcHRpb25zLm5hbWUpe1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgaW5pdGlhbHM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWUgJiYgdGhpcy5vcHRpb25zLm5hbWUubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IG5hbWVJbml0aWFscyA9IHRoaXMub3B0aW9ucy5uYW1lLm1hdGNoKC9cXGIoXFx3KS9nKTtcclxuICAgICAgaWYgKG5hbWVJbml0aWFscykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG5hbWVDaGFycyA9IG5hbWVJbml0aWFscy5zbGljZSgwLCB0aGlzLm9wdGlvbnMuY2hhcmFjdGVycysxKS5qb2luKCcnKTtcclxuICAgICAgICBpbml0aWFscyA9IG5hbWVDaGFycy50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0aWFscyA9IHRoaXMub3B0aW9ucy5uYW1lWzBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL1JldHVybiB0aGUgc2V0IG5vLiBvZiBjaGFyYWN0ZXJzXHJcbiAgICAgIHJldHVybiBpbml0aWFscy5zbGljZSgwLHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9CZ0NvbG9yXHJcbiAgcHJpdmF0ZSBnZXRCZ0NvbG9yKCl7XHJcbiAgICBpZih0aGlzLm9wdGlvbnMucmFuZG9tQ29sb3Ipe1xyXG4gICAgIHJldHVybiBwYWxldHRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhbGV0dGUubGVuZ3RoKV07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmJnQ29sb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0dldCBTaXplIE9mIEF2YXRhciBFbGVtZW50XHJcbiAgcHJpdmF0ZSBnZXRTaXplKCl7XHJcbiAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnNpemUgPT09ICdudW1iZXInKXtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplOyBcclxuICAgIH1lbHNlIGlmKHR5cGVvZiBTaXplWyh0aGlzLm9wdGlvbnMuc2l6ZSldPT0gJ251bWJlcicpe1xyXG4gICAgICByZXR1cm4gU2l6ZVsodGhpcy5vcHRpb25zLnNpemUpXTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gU2l6ZVsnbWQnXTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuICBcclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWF2YXRhcicsXHJcbiAgdGVtcGxhdGU6IGA8IS0tICAtLT5gLFxyXG4gIHByb3ZpZGVyczogW0F2YXRhclNlcnZpY2VdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XHJcblxyXG4gIGF2YXRhcjogQXZhdGFyO1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IElBdmF0YXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNoYXJhY3RlcnM6bnVtYmVyO1xyXG4gIEBJbnB1dCgpIGltYWdlOnN0cmluZztcclxuICBASW5wdXQoKSBiZ0NvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSB0ZXh0Q29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNpemU6bnVtYmVyfHN0cmluZztcclxuICBASW5wdXQoKSBmb250U2l6ZTpudW1iZXJ8c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJvdW5kZWQ6Ym9vbGVhbjtcclxuICBASW5wdXQoKSByYWRpdXM6bnVtYmVyO1xyXG4gIEBJbnB1dCgpIG1hcmdpbjpudW1iZXJ8c3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJhbmRvbUNvbG9yOmJvb2xlYW47XHJcbiAgQElucHV0KCkgbGFiZWwgOnN0cmluZztcclxuICBASW5wdXQoKSBsYWJlbEJnQ29sb3I6c3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsVGV4dENvbG9yOnN0cmluZztcclxuICBASW5wdXQoKSBhY3RpdmU6Ym9vbGVhbjtcclxuICBASW5wdXQoKSB1cGxvYWRhYmxlOmJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKSB1cGxvYWQ6IFxyXG4gICAgRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgZGlmZmVyOmFueTsgXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBFbWl0VXBsb2FkICgpe1xyXG4gICAgaWYgKHRoaXMudXBsb2FkYWJsZT09dHJ1ZSl7XHJcbiAgICAgIHRoaXMudXBsb2FkLmVtaXQoKTtcclxuICAgIH1cclxuICB9IFxyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgYXZhdGFyU2VydmljZTogQXZhdGFyU2VydmljZSwgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMpIHtcclxuICAgIFxyXG4gICAgdGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XHJcbiAgXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmF2YXRhclNlcnZpY2UuZ2V0QXZhdGFyQ29uZmlnKCk7XHJcbiAgICB0aGlzLmF2YXRhciA9IG5ldyBBdmF0YXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmltYWdlIHx8IHRoaXMubmFtZSB8fCB0aGlzLm9wdGlvbnMubmFtZSB8fCB0aGlzLm9wdGlvbnMuaW1hZ2UsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuYXZhdGFyU2VydmljZS5nZXRBdmF0YXJDb25maWcoKTtcclxuICAgIHRoaXMub3B0aW9ucy5uYW1lID0gKHRoaXMubmFtZSk/dGhpcy5uYW1lOnRoaXMub3B0aW9ucy5uYW1lO1xyXG4gICAgdGhpcy5vcHRpb25zLmltYWdlID0gKHRoaXMuaW1hZ2UpP3RoaXMuaW1hZ2U6dGhpcy5vcHRpb25zLmltYWdlO1xyXG4gICAgdGhpcy5vcHRpb25zLmJnQ29sb3IgPSAodGhpcy5iZ0NvbG9yKT90aGlzLmJnQ29sb3I6dGhpcy5vcHRpb25zLmJnQ29sb3I7XHJcbiAgICB0aGlzLm9wdGlvbnMuY2hhcmFjdGVycz0odGhpcy5jaGFyYWN0ZXJzKT90aGlzLmNoYXJhY3RlcnM6IHRoaXMub3B0aW9ucy5jaGFyYWN0ZXJzOyBcclxuICAgIHRoaXMub3B0aW9ucy50ZXh0Q29sb3IgPSh0aGlzLnRleHRDb2xvcik/dGhpcy50ZXh0Q29sb3I6dGhpcy5vcHRpb25zLnRleHRDb2xvcjsgXHJcbiAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9KHRoaXMuc2l6ZSk/dGhpcy5zaXplOiB0aGlzLm9wdGlvbnMuc2l6ZTtcclxuICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9KHRoaXMuZm9udFNpemUpP3RoaXMuZm9udFNpemU6dGhpcy5vcHRpb25zLmZvbnRTaXplOyBcclxuICAgIHRoaXMub3B0aW9ucy5yb3VuZGVkID0odGhpcy5yb3VuZGVkKT90aGlzLnJvdW5kZWQ6dGhpcy5vcHRpb25zLnJvdW5kZWQgOyBcclxuICAgIHRoaXMub3B0aW9ucy5yYWRpdXMgPSggdGhpcy5yYWRpdXMpPyB0aGlzLnJhZGl1czp0aGlzLm9wdGlvbnMucmFkaXVzO1xyXG4gICAgdGhpcy5vcHRpb25zLm1hcmdpbiA9KCB0aGlzLm1hcmdpbik/IHRoaXMubWFyZ2luOiB0aGlzLm9wdGlvbnMubWFyZ2luO1xyXG4gICAgdGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yID0odGhpcy5yYW5kb21Db2xvcik/dGhpcy5yYW5kb21Db2xvcjogdGhpcy5vcHRpb25zLnJhbmRvbUNvbG9yOyBcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbCA9KHRoaXMubGFiZWwpP3RoaXMubGFiZWw6dGhpcy5vcHRpb25zLmxhYmVsIDtcclxuICAgIHRoaXMub3B0aW9ucy5sYWJlbEJnQ29sb3IgPSh0aGlzLmxhYmVsQmdDb2xvcik/dGhpcy5sYWJlbEJnQ29sb3I6dGhpcy5vcHRpb25zLmxhYmVsQmdDb2xvciA7IFxyXG4gICAgdGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yID0odGhpcy5sYWJlbFRleHRDb2xvcik/dGhpcy5sYWJlbFRleHRDb2xvcjogdGhpcy5vcHRpb25zLmxhYmVsVGV4dENvbG9yOyBcclxuICAgIHRoaXMub3B0aW9ucy5hY3RpdmUgPSh0aGlzLmFjdGl2ZSk/IHRoaXMuYWN0aXZlOnRoaXMub3B0aW9ucy5hY3RpdmU7XHJcbiAgICB0aGlzLm9wdGlvbnMudXBsb2FkYWJsZSA9KCB0aGlzLnVwbG9hZGFibGUpPyB0aGlzLnVwbG9hZGFibGU6dGhpcy5vcHRpb25zLnVwbG9hZGFibGU7XHJcblxyXG4gICAgdmFyIGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5vcHRpb25zKTtcclxuICAgIGlmKGNoYW5nZXMpe1xyXG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlIGRldGVjdGVkJyk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKHIgPT4gY29uc29sZS5sb2coJ2NoYW5nZWQnLCByLmtleSApKTtcclxuICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0ociA9PiB0aGlzLmF2YXRhci51cGRhdGUoci5rZXksci5jdXJyZW50VmFsdWUpKTtcclxuXHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShyID0+IGNvbnNvbGUubG9nKCdhZGRlZCAnICwgci5rZXkgLCByLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0ociA9PiB0aGlzLmF2YXRhci51cGRhdGUoci5rZXksci5jdXJyZW50VmFsdWUpKTtcclxuXHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKHIgPT4gY29uc29sZS5sb2coJ3JlbW92ZWQgJyAsIHIua2V5KSk7XHJcbiAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKHIgPT4gdGhpcy5hdmF0YXIudXBkYXRlKHIua2V5LHIuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgIC8vIHRoaXMuYXZhdGFyID0gbmV3IEF2YXRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuaW1hZ2UgfHwgdGhpcy5uYW1lIHx8IHRoaXMub3B0aW9ucy5uYW1lIHx8IHRoaXMub3B0aW9ucy5pbWFnZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIFxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGNoYW5nZWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG59XHJcbiJdfQ==