import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
// import * as SVG from 'svg.js';
import { DefaultAvatarOptions, IAvatarOptions, ICssProperty, Size } from '../avatar.class';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {

  avatar: any;
  @Input()name: string;
  @Input()characters: number;
  @Input()image: string;
  @Input()bgColor: string;
  @Input()textColor: string;
  @Input()size: number | string;
  @Input()fontSize: number | string;
  @Input()rounded: boolean;
  @Input()radius: number;
  @Input()margin: number | string;
  @Input()randomColor: boolean;
  @Input()label: string;
  @Input()labelBgColor: string;
  @Input()labelTextColor: string;
  @Input()active: boolean;

  constructor(){
  }
  ngOnInit(){
    this.avatar = new Avatar;

    if(this.name != null){
      this.avatar.options.name=this.name;
    }

  }
}
  

  

class Avatar{
  options: IAvatarOptions
  constructor(){
    this.options = new DefaultAvatarOptions;
  }
}


