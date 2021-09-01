import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgramPageRoutingModule } from './program-routing.module';
import { ProgramPage } from './program.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProgramPageRoutingModule],
  declarations: [ProgramPage],
})
export class ProgramPageModule {}
