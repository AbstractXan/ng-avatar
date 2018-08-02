export declare const defaultColor = "#29b6f6";
export declare const defaultLabelColor = "#f44336";
export declare const defaultInvitedColor = "#FF9800";
export declare const palette: string[];
export declare enum Size {
    xs = 30,
    'extra-small' = 30,
    sm = 40,
    small = 40,
    md = 50,
    medium = 50,
    lg = 60,
    large = 60,
    xl = 80,
    'extra-large' = 80,
}
export interface IAvatarOptions {
    name?: string;
    characters?: number;
    image?: string;
    bgColor?: string;
    textColor?: string;
    size?: number | string;
    fontSize?: number | string;
    rounded?: boolean;
    radius?: number;
    margin?: number | string;
    randomColor?: boolean;
    label?: string;
    labelBgColor?: string;
    labelTextColor?: string;
    active?: boolean;
    uploadable?: boolean;
}
export interface ICssProperty {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export declare class DefaultAvatarOptions implements IAvatarOptions {
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
    constructor();
}
