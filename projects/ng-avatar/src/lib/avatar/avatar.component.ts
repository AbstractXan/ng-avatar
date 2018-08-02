import { 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  Input, 
  OnChanges, 
  HostListener, 
  EventEmitter, 
  Output,
  DoCheck,
  KeyValueDiffers
} from '@angular/core';
import * as SVG_ from 'svg.js';
const SVG = SVG_;

import { DefaultAvatarOptions, IAvatarOptions, ICssProperty, Size, palette} from '../avatar.class';
import { AvatarService } from '../service/avatar.service';

export class Avatar {
  // HTML Element
  el: HTMLElement | string;
  // Avatar Options 
  options: IAvatarOptions;

  //Set values of element, options,
  constructor(private _el: HTMLElement | string, private arg1: IAvatarOptions | string, private arg2?: IAvatarOptions) {
    if (!this.arg1) {
      return;
    }
    this.el = Avatar.getElement(_el);
    this.options = Avatar.getOptions(arg1, arg2);
    this.render();
  }

  static isDark(color: string) {
    let r: any;
    let b: any;
    let g: any;
    let hsp: any;
    let a: any = color;

    if (a.match(/^rgb/)) {
      a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = a[1];
      g = a[2];
      b = a[3];
    } else {
      a = +('0x' + a.slice(1).replace(
          a.length < 5 && /./g, '$&$&'
        )
      );
      r = a >> 16;        // tslint:disable-line
      b = a >> 8 & 255;   // tslint:disable-line
      g = a & 255;        // tslint:disable-line
    }
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    return (hsp < 200);
  }

  static getElement(_el: HTMLElement | string): HTMLElement {
    if (!_el) {
      throw new Error('Element not provided');
    }
    switch (typeof _el) {
      case 'string':
        const el = document.getElementById((_el as string));
        if (el) {
          return (el as HTMLElement);
        } else {
          throw new Error('Element is not present');
        }
      default:
        return (_el as HTMLElement);
    }
  }

  static expandProperty(value?: string | number): ICssProperty {
    const returnObj: ICssProperty = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    if (value) {
      switch (typeof value) {
        case 'number':
          returnObj.top = returnObj.bottom = returnObj.left = returnObj.right = (value as number);
          break;
        case 'string':
          const properties = (value as string).split(' ').map((m: string) => +m.replace(/\D/g, ''));
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

  static getOptions(arg1: IAvatarOptions | string, arg2?: IAvatarOptions): IAvatarOptions {
    const _default: IAvatarOptions = new DefaultAvatarOptions();
    let _options: IAvatarOptions = { ..._default };
    switch (typeof arg1) {
      case 'string':
        _options.name = (arg1 as string);
        break;
      case 'object':
        if (!(arg1 as IAvatarOptions).name) {
          throw new Error('Name is required');
        }
        _options = { ..._options, ...(arg1 as IAvatarOptions) };
        break;
    }
    if (arg2 && typeof arg2 === 'object') {
      _options = { ..._options, ...(arg2 as IAvatarOptions) };
    }
    for (const key in _options) {
      if (typeof _options[key] === 'undefined') {
        _options[key] = _default[key];
      }
    }
    if (typeof _options.size === 'string') {
      _options.size = Size[(_options.size as any)];
      if (!_options.size) {
        _options.size = Size['md'];
      }
    }
    
    _options.fontSize = (_options.size as number) * 0.4;

    if (!Avatar.isDark((_options.bgColor as any))) {
      _options.textColor = '#000';
    }
    if (_options.label && !Avatar.isDark((_options.labelBgColor as any))) {
      _options.labelTextColor = '#000';
    }
    return { ..._options };
  }

  update(prop: string, value: string | number) {
    this.options = <IAvatarOptions>{
      ...this.options,
      [prop]: value
    };
    this.render();
  }

  render() {
    (this.el as HTMLElement).innerHTML = '';
    const svgElement = SVG((this.el as HTMLElement));
    const { top, right, bottom, left } = Avatar.expandProperty(this.options.margin);
    const size = this.getSize();
    
    this.options.fontSize = size * 0.4;
    svgElement.size(size + left + right, size + top + bottom);

    
    let shape: any;
    let uploadShape : any;
    let uploadIcon: any;
    let image: any;
    let text: any;
    let label: any;
    let labelText: any;

    //Rounded
    //Boxed
    //Rounded Box (if radius is provided)
    if (this.options.rounded==true) {
      shape = svgElement
        .circle(size);
    } else {
      shape = svgElement
        .rect(size, size)
        .radius((this.options.radius as number));
     
    }

    //Bg-Color
    //Active
    shape
      .fill(this.getBgColor())
      .attr('fill-opacity', this.options.active ? 1 : 0.5)
      .move(left, top);
   
      
    //image
    if (this.options.image) {
      const that = this;
      image = svgElement.image(this.options.image).loaded(function(this: SVG_.Image) {
        let c: any;
        if (that.options.rounded) {
          c = svgElement.circle(size - 4);
        } else {
          c = svgElement.rect(size - 4, size - 4).radius((that.options.radius as number));
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
    if(this.options.uploadable==true){
      
      if (this.options.rounded==true) {
        uploadShape = svgElement
          .circle(size); 
      } else {
        uploadShape = svgElement
          .rect(size, size)
          .radius((this.options.radius as number));
      }

      uploadShape
        .fill("grey")
        .attr('fill-opacity', 0)
        .move(left, top);

      //UploadIcon
      const that = this;
      uploadIcon = svgElement.image("../assets/images/camera.svg").loaded(function(this: SVG_.Image) {
          let c: any;
          if (that.options.rounded) {
            c = svgElement.circle(size - 4);
          } else {
            c = svgElement.rect(size - 4, size - 4).radius((that.options.radius as number));
          }
          c.move(left + 2, top + 2);
          this.size(size*0.5)
            .center((size / 2) + left, (size / 2) + top).clipWith(c)
            .attr('opacity',0);
        });
      
      svgElement.mouseover(function(){
        shape.attr('fill-opacity', 0.25);
        uploadShape
          .attr('fill-opacity', 0.75);
        
        uploadIcon
          .attr('opacity', 1);
        text.attr('fill-opacity', 0.25);

        if(label!=null){
        label.attr('fill-opacity', 0);
        labelText.attr('fill-opacity', 0.25);
        }
        
        if(image!=null){image.attr('opacity', 0.25);}
      })

      svgElement.mouseout(function(){
        shape.attr('fill-opacity', 1);
        uploadShape.attr('fill-opacity', 0);
        uploadIcon.attr('opacity', 0);
        text.attr('fill-opacity', 1);
        if(label!=null){
          label
            .attr('fill-opacity', 1);
          labelText.attr('fill-opacity', 1);
          }
        if(image!=null){image.attr('opacity', 1);}
      })
    }
  }


  //Print Initials
  private getSlug() {
    //Return nothing if DNE
    if(!this.options.name){
      return '';
    }
    var initials;
    if (this.options.name && this.options.name.length) {
      const nameInitials = this.options.name.match(/\b(\w)/g);
      if (nameInitials) {
        
        const nameChars = nameInitials.slice(0, this.options.characters+1).join('');
        initials = nameChars.toUpperCase();

      } else {
        initials = this.options.name[0];
      }

      //Return the set no. of characters
      return initials.slice(0,this.options.characters)
    }
  }

  //BgColor
  private getBgColor(){
    if(this.options.randomColor){
     return palette[Math.floor(Math.random() * palette.length)];
    }
    else{
      return this.options.bgColor;
    }
  }

  //Get Size Of Avatar Element
  private getSize(){
    if(typeof this.options.size === 'number'){
      return this.options.size; 
    }else if(typeof Size[(this.options.size)]== 'number'){
      return Size[(this.options.size)];
    }else{
      return Size['md'];
    }
    
  }
  
}


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  providers: [AvatarService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AvatarComponent implements DoCheck {

  avatar: Avatar;
  @Input() options: IAvatarOptions;
  @Input() name:string;
  @Input() characters:number;
  @Input() image:string;
  @Input() bgColor:string;
  @Input() textColor:string;
  @Input() size:number|string;
  @Input() fontSize:number|string;
  @Input() rounded:boolean;
  @Input() radius:number;
  @Input() margin:number|string;
  @Input() randomColor:boolean;
  @Input() label :string;
  @Input() labelBgColor:string;
  @Input() labelTextColor:string;
  @Input() active:boolean;
  @Input() uploadable:boolean;

  @Output() upload: 
    EventEmitter<any> = new EventEmitter<any>();

  differ:any; 
  @HostListener('click') EmitUpload (){
    if (this.uploadable==true){
      this.upload.emit();
    }
  } 
  
  constructor(private el: ElementRef, private avatarService: AvatarService, private differs: KeyValueDiffers) {
    
    this.differ = this.differs.find({}).create();
  
    this.options = this.avatarService.getAvatarConfig();
    this.avatar = new Avatar(this.el.nativeElement, this.image || this.name || this.options.name || this.options.image, this.options);
    
  }

  ngDoCheck() {
    this.options = this.avatarService.getAvatarConfig();
    this.options.name = (this.name)?this.name:this.options.name;
    this.options.image = (this.image)?this.image:this.options.image;
    this.options.bgColor = (this.bgColor)?this.bgColor:this.options.bgColor;
    this.options.characters=(this.characters)?this.characters: this.options.characters; 
    this.options.textColor =(this.textColor)?this.textColor:this.options.textColor; 
    this.options.size =(this.size)?this.size: this.options.size;
    this.options.fontSize =(this.fontSize)?this.fontSize:this.options.fontSize; 
    this.options.rounded =(this.rounded)?this.rounded:this.options.rounded ; 
    this.options.radius =( this.radius)? this.radius:this.options.radius;
    this.options.margin =( this.margin)? this.margin: this.options.margin;
    this.options.randomColor =(this.randomColor)?this.randomColor: this.options.randomColor; 
    this.options.label =(this.label)?this.label:this.options.label ;
    this.options.labelBgColor =(this.labelBgColor)?this.labelBgColor:this.options.labelBgColor ; 
    this.options.labelTextColor =(this.labelTextColor)?this.labelTextColor: this.options.labelTextColor; 
    this.options.active =(this.active)? this.active:this.options.active;
    this.options.uploadable =( this.uploadable)? this.uploadable:this.options.uploadable;

    var changes = this.differ.diff(this.options);

    console.log(this.options);
    if(changes){
      console.log('change detected');
      changes.forEachChangedItem(r => console.log('changed', r.key ));
      changes.forEachChangedItem(r => this.avatar.update(r.key,r.currentValue));

      changes.forEachAddedItem(r => console.log('added ' , r.key , r.currentValue));
      changes.forEachAddedItem(r => this.avatar.update(r.key,r.currentValue));

      changes.forEachRemovedItem(r => console.log('removed ' , r.key));
      changes.forEachRemovedItem(r => this.avatar.update(r.key,r.currentValue));
      // this.avatar = new Avatar(this.el.nativeElement, this.image || this.name || this.options.name || this.options.image, this.options);
    
    }else{
      console.log('nothing changed');
    }
  }

  
}
