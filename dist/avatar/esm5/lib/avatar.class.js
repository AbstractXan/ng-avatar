/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export var /** @type {?} */ defaultColor = '#29b6f6';
export var /** @type {?} */ defaultLabelColor = '#f44336';
export var /** @type {?} */ defaultInvitedColor = '#FF9800';
export var /** @type {?} */ palette = [
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
export { Size };
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
/**
 * @record
 */
export function IAvatarOptions() { }
function IAvatarOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IAvatarOptions.prototype.name;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.characters;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.image;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.bgColor;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.textColor;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.size;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.fontSize;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.rounded;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.radius;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.margin;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.randomColor;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.label;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.labelBgColor;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.labelTextColor;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.active;
    /** @type {?|undefined} */
    IAvatarOptions.prototype.uploadable;
}
/**
 * @record
 */
export function ICssProperty() { }
function ICssProperty_tsickle_Closure_declarations() {
    /** @type {?} */
    ICssProperty.prototype.top;
    /** @type {?} */
    ICssProperty.prototype.right;
    /** @type {?} */
    ICssProperty.prototype.bottom;
    /** @type {?} */
    ICssProperty.prototype.left;
}
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
export { DefaultAvatarOptions };
function DefaultAvatarOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultAvatarOptions.prototype.name;
    /** @type {?} */
    DefaultAvatarOptions.prototype.characters;
    /** @type {?} */
    DefaultAvatarOptions.prototype.image;
    /** @type {?} */
    DefaultAvatarOptions.prototype.bgColor;
    /** @type {?} */
    DefaultAvatarOptions.prototype.textColor;
    /** @type {?} */
    DefaultAvatarOptions.prototype.size;
    /** @type {?} */
    DefaultAvatarOptions.prototype.fontSize;
    /** @type {?} */
    DefaultAvatarOptions.prototype.rounded;
    /** @type {?} */
    DefaultAvatarOptions.prototype.radius;
    /** @type {?} */
    DefaultAvatarOptions.prototype.margin;
    /** @type {?} */
    DefaultAvatarOptions.prototype.randomColor;
    /** @type {?} */
    DefaultAvatarOptions.prototype.label;
    /** @type {?} */
    DefaultAvatarOptions.prototype.labelBgColor;
    /** @type {?} */
    DefaultAvatarOptions.prototype.labelTextColor;
    /** @type {?} */
    DefaultAvatarOptions.prototype.active;
    /** @type {?} */
    DefaultAvatarOptions.prototype.uploadable;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxDQUFDLHFCQUFNLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDdEMsTUFBTSxDQUFDLHFCQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztBQUMzQyxNQUFNLENBQUMscUJBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxxQkFBTSxPQUFPLEdBQUc7SUFDckIsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0YsSUFBQTtJQWtCRTtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNyRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7S0FDekI7K0JBbEdIO0lBbUdDLENBQUE7QUFwQ0QsZ0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9ICcjMjliNmY2JztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMYWJlbENvbG9yID0gJyNmNDQzMzYnO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdEludml0ZWRDb2xvciA9ICcjRkY5ODAwJztcclxuZXhwb3J0IGNvbnN0IHBhbGV0dGUgPSBbXHJcbiAgJyNmNDQzMzYnLFxyXG4gICcjRTkxRTYzJyxcclxuICAnIzlDMjdCMCcsXHJcbiAgJyM2NzNBQjcnLFxyXG4gICcjM0Y1MUI1JyxcclxuICAnIzIxOTZGMycsXHJcbiAgJyMwM0E5RjQnLFxyXG4gICcjMDBCQ0Q0JyxcclxuICAnIzAwOTY4OCcsXHJcbiAgJyM0Q0FGNTAnLFxyXG4gICcjOEJDMzRBJyxcclxuICAnI0NEREMzOScsXHJcbiAgJyNGRkMxMDcnLFxyXG4gICcjRkY5ODAwJyxcclxuICAnI0ZGNTcyMicsXHJcbiAgJyM3OTU1NDgnLFxyXG4gICcjOUU5RTlFJyxcclxuICAnIzYwN0Q4QidcclxuXTtcclxuXHJcbmV4cG9ydCBlbnVtIFNpemUge1xyXG4gIHhzID0gMzAsXHJcbiAgJ2V4dHJhLXNtYWxsJyA9IDMwLFxyXG4gIHNtID0gNDAsXHJcbiAgc21hbGwgPSA0MCxcclxuICBtZCA9IDUwLFxyXG4gIG1lZGl1bSA9IDUwLFxyXG4gIGxnID0gNjAsXHJcbiAgbGFyZ2UgPSA2MCxcclxuICB4bCA9IDgwLFxyXG4gICdleHRyYS1sYXJnZScgPSA4MFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBdmF0YXJPcHRpb25zIHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM/OiBudW1iZXI7XHJcbiAgaW1hZ2U/OiBzdHJpbmc7XHJcbiAgYmdDb2xvcj86IHN0cmluZztcclxuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgc2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICBmb250U2l6ZT86IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkPzogYm9vbGVhbjtcclxuICByYWRpdXM/OiBudW1iZXI7XHJcbiAgbWFyZ2luPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yPzogYm9vbGVhbjtcclxuICBsYWJlbD86IHN0cmluZztcclxuICBsYWJlbEJnQ29sb3I/OiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I/OiBzdHJpbmc7XHJcbiAgYWN0aXZlPzogYm9vbGVhbjtcclxuICB1cGxvYWRhYmxlPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ3NzUHJvcGVydHkge1xyXG4gIHRvcDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEF2YXRhck9wdGlvbnMgaW1wbGVtZW50cyBJQXZhdGFyT3B0aW9ucyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNoYXJhY3RlcnM6IG51bWJlcjtcclxuICBpbWFnZTogc3RyaW5nO1xyXG4gIGJnQ29sb3I6IHN0cmluZztcclxuICB0ZXh0Q29sb3I6IHN0cmluZztcclxuICBzaXplOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgZm9udFNpemU6IG51bWJlciB8IHN0cmluZztcclxuICByb3VuZGVkOiBib29sZWFuO1xyXG4gIHJhZGl1czogbnVtYmVyO1xyXG4gIG1hcmdpbjogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhbmRvbUNvbG9yOiBib29sZWFuO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgbGFiZWxCZ0NvbG9yOiBzdHJpbmc7XHJcbiAgbGFiZWxUZXh0Q29sb3I6IHN0cmluZztcclxuICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgdXBsb2FkYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgIHRoaXMuY2hhcmFjdGVycyA9IDI7XHJcbiAgICB0aGlzLmltYWdlID0gJyc7XHJcbiAgICB0aGlzLnJhbmRvbUNvbG9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLnJhbmRvbUNvbG9yID8gcGFsZXR0ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwYWxldHRlLmxlbmd0aCldIDogZGVmYXVsdENvbG9yO1xyXG4gICAgdGhpcy50ZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICB0aGlzLnNpemUgPSBTaXplWydtZCddO1xyXG4gICAgdGhpcy5mb250U2l6ZSA9IHRoaXMuc2l6ZSAqIDAuNDtcclxuICAgIHRoaXMucm91bmRlZCA9IHRydWU7XHJcbiAgICB0aGlzLnJhZGl1cyA9IDA7XHJcbiAgICB0aGlzLm1hcmdpbiA9IDA7XHJcbiAgICB0aGlzLmxhYmVsID0gJyc7XHJcbiAgICB0aGlzLmxhYmVsQmdDb2xvciA9IGRlZmF1bHRMYWJlbENvbG9yO1xyXG4gICAgdGhpcy5sYWJlbFRleHRDb2xvciA9ICcjZmZmJztcclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMudXBsb2FkYWJsZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=