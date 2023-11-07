import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'models/models';
import { FirebaseService } from './services/firebase.service';
import { UtilsService } from './services/utils.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  login:boolean = false;
  rol: 'estudiante'|'profesor' = null;
  constructor(private menu:MenuController,
   ) {
      
    }

    firebase = inject(FirebaseService)
    util = inject(UtilsService)

    signOut(){
      this.firebase.salir()
    }
  

  cerrarMenu()
  {
    this.menu.close('first');
  }
  
  
}
