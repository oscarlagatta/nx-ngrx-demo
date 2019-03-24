import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { reducers } from '.';
import { CustomersEffects } from './customers/customers.effects';
import { environment } from '@env/environment.prod';
import { ProjectsEffects } from './projects/projects.effects';

@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }), // restrict extension to log-only mode , // retains last 10 states
    EffectsModule.forRoot([CustomersEffects, ProjectsEffects])
  ],
  declarations: []
})
export class StateModule {}
