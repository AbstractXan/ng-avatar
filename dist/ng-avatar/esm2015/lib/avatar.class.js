/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export const /** @type {?} */ defaultColor = '#29b6f6';
export const /** @type {?} */ defaultLabelColor = '#f44336';
export const /** @type {?} */ defaultInvitedColor = '#FF9800';
export const /** @type {?} */ palette = [
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
export class DefaultAvatarOptions {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXZhdGFyLyIsInNvdXJjZXMiOlsibGliL2F2YXRhci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxDQUFDLHVCQUFNLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDdEMsTUFBTSxDQUFDLHVCQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztBQUMzQyxNQUFNLENBQUMsdUJBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyx1QkFBTSxPQUFPLEdBQUc7SUFDckIsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0YsTUFBTTtJQWtCSjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNyRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7S0FDekI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3IgPSAnIzI5YjZmNic7XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0TGFiZWxDb2xvciA9ICcjZjQ0MzM2JztcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRJbnZpdGVkQ29sb3IgPSAnI0ZGOTgwMCc7XHJcbmV4cG9ydCBjb25zdCBwYWxldHRlID0gW1xyXG4gICcjZjQ0MzM2JyxcclxuICAnI0U5MUU2MycsXHJcbiAgJyM5QzI3QjAnLFxyXG4gICcjNjczQUI3JyxcclxuICAnIzNGNTFCNScsXHJcbiAgJyMyMTk2RjMnLFxyXG4gICcjMDNBOUY0JyxcclxuICAnIzAwQkNENCcsXHJcbiAgJyMwMDk2ODgnLFxyXG4gICcjNENBRjUwJyxcclxuICAnIzhCQzM0QScsXHJcbiAgJyNDRERDMzknLFxyXG4gICcjRkZDMTA3JyxcclxuICAnI0ZGOTgwMCcsXHJcbiAgJyNGRjU3MjInLFxyXG4gICcjNzk1NTQ4JyxcclxuICAnIzlFOUU5RScsXHJcbiAgJyM2MDdEOEInXHJcbl07XHJcblxyXG5leHBvcnQgZW51bSBTaXplIHtcclxuICB4cyA9IDMwLFxyXG4gICdleHRyYS1zbWFsbCcgPSAzMCxcclxuICBzbSA9IDQwLFxyXG4gIHNtYWxsID0gNDAsXHJcbiAgbWQgPSA1MCxcclxuICBtZWRpdW0gPSA1MCxcclxuICBsZyA9IDYwLFxyXG4gIGxhcmdlID0gNjAsXHJcbiAgeGwgPSA4MCxcclxuICAnZXh0cmEtbGFyZ2UnID0gODBcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXZhdGFyT3B0aW9ucyB7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBjaGFyYWN0ZXJzPzogbnVtYmVyO1xyXG4gIGltYWdlPzogc3RyaW5nO1xyXG4gIGJnQ29sb3I/OiBzdHJpbmc7XHJcbiAgdGV4dENvbG9yPzogc3RyaW5nO1xyXG4gIHNpemU/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgZm9udFNpemU/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgcm91bmRlZD86IGJvb2xlYW47XHJcbiAgcmFkaXVzPzogbnVtYmVyO1xyXG4gIG1hcmdpbj86IG51bWJlciB8IHN0cmluZztcclxuICByYW5kb21Db2xvcj86IGJvb2xlYW47XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbiAgbGFiZWxCZ0NvbG9yPzogc3RyaW5nO1xyXG4gIGxhYmVsVGV4dENvbG9yPzogc3RyaW5nO1xyXG4gIGFjdGl2ZT86IGJvb2xlYW47XHJcbiAgdXBsb2FkYWJsZT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNzc1Byb3BlcnR5IHtcclxuICB0b3A6IG51bWJlcjtcclxuICByaWdodDogbnVtYmVyO1xyXG4gIGJvdHRvbTogbnVtYmVyO1xyXG4gIGxlZnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRBdmF0YXJPcHRpb25zIGltcGxlbWVudHMgSUF2YXRhck9wdGlvbnMge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFyYWN0ZXJzOiBudW1iZXI7XHJcbiAgaW1hZ2U6IHN0cmluZztcclxuICBiZ0NvbG9yOiBzdHJpbmc7XHJcbiAgdGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgc2l6ZTogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIGZvbnRTaXplOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgcm91bmRlZDogYm9vbGVhbjtcclxuICByYWRpdXM6IG51bWJlcjtcclxuICBtYXJnaW46IG51bWJlciB8IHN0cmluZztcclxuICByYW5kb21Db2xvcjogYm9vbGVhbjtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGxhYmVsQmdDb2xvcjogc3RyaW5nO1xyXG4gIGxhYmVsVGV4dENvbG9yOiBzdHJpbmc7XHJcbiAgYWN0aXZlOiBib29sZWFuO1xyXG4gIHVwbG9hZGFibGU6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5uYW1lID0gJyc7XHJcbiAgICB0aGlzLmNoYXJhY3RlcnMgPSAyO1xyXG4gICAgdGhpcy5pbWFnZSA9ICcnO1xyXG4gICAgdGhpcy5yYW5kb21Db2xvciA9IGZhbHNlO1xyXG4gICAgdGhpcy5iZ0NvbG9yID0gdGhpcy5yYW5kb21Db2xvciA/IHBhbGV0dGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGFsZXR0ZS5sZW5ndGgpXSA6IGRlZmF1bHRDb2xvcjtcclxuICAgIHRoaXMudGV4dENvbG9yID0gJyNmZmYnO1xyXG4gICAgdGhpcy5zaXplID0gU2l6ZVsnbWQnXTtcclxuICAgIHRoaXMuZm9udFNpemUgPSB0aGlzLnNpemUgKiAwLjQ7XHJcbiAgICB0aGlzLnJvdW5kZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5yYWRpdXMgPSAwO1xyXG4gICAgdGhpcy5tYXJnaW4gPSAwO1xyXG4gICAgdGhpcy5sYWJlbCA9ICcnO1xyXG4gICAgdGhpcy5sYWJlbEJnQ29sb3IgPSBkZWZhdWx0TGFiZWxDb2xvcjtcclxuICAgIHRoaXMubGFiZWxUZXh0Q29sb3IgPSAnI2ZmZic7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLnVwbG9hZGFibGUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19