import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { IonicModule } from '@ionic/angular';

import { ClassificationPageRoutingModule } from './classification-routing.module';

import { ClassificationPage } from './classification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ClassificationPageRoutingModule
  ],
  declarations: [ClassificationPage]
})
export class ClassificationPageModule {}
