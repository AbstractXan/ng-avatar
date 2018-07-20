import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar';
import { AvatarDisplayComponent } from './avatar-display/avatar-display.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    AvatarDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
