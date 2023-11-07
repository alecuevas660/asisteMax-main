import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputPersonalizadoComponent } from './components/input-personalizado/input-personalizado.component';

@NgModule({
  declarations: [HeaderComponent,InputPersonalizadoComponent],
  exports :[HeaderComponent,InputPersonalizadoComponent,ReactiveFormsModule
 ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule
  ]
})
export class SharedModule { }
