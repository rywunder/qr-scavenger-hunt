import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalDetailPage } from './animal-detail';

@NgModule({
  declarations: [
    AnimalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalDetailPage),
  ],
})
export class AnimalDetailPageModule {}
