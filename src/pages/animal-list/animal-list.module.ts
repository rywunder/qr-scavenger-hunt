import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimalListPage } from './animal-list';

@NgModule({
  declarations: [
    AnimalListPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimalListPage),
  ],
})
export class AnimalListPageModule {}
