
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserI } from '../../../../models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  uid: string = null;
  info: UserI = null;

  constructor(
    private menu:MenuController
  ) { }

  async ngOnInit() {
    
    }
    verMenu(){
      this.menu.open('first');
    }
  

  }
 


 