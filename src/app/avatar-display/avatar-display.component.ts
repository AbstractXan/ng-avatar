import { Component, OnInit , Input, OnChanges} from '@angular/core';
import { IAvatarOptions} from '../avatar.class' ;
@Component({
  selector: 'avatar-display',
  templateUrl: './avatar-display.component.html',
  styleUrls: ['./avatar-display.component.css']
})
export class AvatarDisplayComponent implements OnChanges {

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
  
  constructor() {
  }

  ngOnChanges() {
    
  }
}
