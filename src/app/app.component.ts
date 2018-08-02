import { Component,OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
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


  constructor(){
    
  }
  
  ngOnInit(){
    this.image = "../assets/images/man.png";
  }
  
  toggleRounded(){
    this.rounded = !this.rounded;
  }

  toggleRandomColor(){
    this.randomColor = !this.randomColor;
  }

  toggleActive(){
  this.active = !this.active;
  }

  toggleUploadable(){
   this.uploadable = !this.uploadable;
  }

  uploadCalled(temp: any){
    console.log('UPload Called.')
  }
}
