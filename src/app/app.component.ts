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
    var newRounded = !this.rounded;
    this.rounded= newRounded;
  }

  toggleRandomColor(){
    var newRandomColor = !this.randomColor;
    this.randomColor = newRandomColor;
  }

  toggleActive(){
    if(this.active==true){
      this.active=false
    }
    else{
      this.active=true;
    }
  }

  toggleUploadable(){
    if(this.uploadable==true){
      this.uploadable=false
    }
    else{
      this.uploadable=true;
    }
  }

  uploadCalled(temp: any){
    console.log('UPload Called.')
  }
}
