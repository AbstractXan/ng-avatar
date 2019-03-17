import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AvatarModule } from '../../projects/ng-avatar/src/lib/avatar.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AvatarModule.forRoot({name: "Priyansh Sangule", rounded: false})
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }