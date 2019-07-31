import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HelloWorldComponent } from './hello-world.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [HelloWorldComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [HelloWorldComponent]
})
export class HelloWorldModule { }
