import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './bottom-menu.component';
import { LocalStorageService } from '../shared/localstorage.service';

@NgModule({
  imports : [
    CommonModule,
    IonicModule.forRoot(),
    
  ],
  declarations: [
    BottomMenuComponent],
    exports: [BottomMenuComponent],
  entryComponents: [],
  providers : [LocalStorageService]
})



export class BottomMenuModule {}

