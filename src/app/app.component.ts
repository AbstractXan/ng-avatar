import { Component,OnInit} from '@angular/core';

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
    if(this.rounded==true){
      this.rounded=false
    }
    else{
      this.rounded=true;
    }
  }

  toggleRandomColor(){
    if(this.randomColor==true){
      this.randomColor=false
    }
    else{
      this.randomColor=true;
    }
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
}


