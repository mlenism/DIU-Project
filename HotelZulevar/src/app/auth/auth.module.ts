import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogComponent } from './log/log.component';

import { OauthService } from '../services/oauth.service';


@NgModule({
  declarations: [
    LogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    OauthService
  ]
})
export class AuthModule { }
