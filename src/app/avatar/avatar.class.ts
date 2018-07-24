export const defaultColor = '#29b6f6';
export const defaultLabelColor = '#f44336';
export const defaultInvitedColor = '#FF9800';
export const palette = [
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

export enum Size {
  xs = 30,
  'extra-small' = 30,
  sm = 40,
  small = 40,
  md = 50,
  medium = 50,
  lg = 60,
  large = 60,
  xl = 80,
  'extra-large' = 80
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
}

export interface ICssProperty {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class DefaultAvatarOptions implements IAvatarOptions {
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
  }
}
