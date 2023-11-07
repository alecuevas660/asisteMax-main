import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { mensajess } from '../../../../models/models';
import { User } from 'src/app/interfaces/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage{
  username:string='';
  mensaje: mensajess[]=[];
  subjects;
  cuadrados: any[] = [
    {id: 1, name: 'Escanear Qr', src: 'assets/icon/codigo-qr.png', background: 'rgba(27,150,181, 0.1)', url: '/qrfinal'},
    {id: 2, name: 'Mis Datos', src: 'assets/icon/informacion-personal.png', background: 'rgba(106,100,255, 0.1)', url: '/perfil'},
    {id: 3, name: 'Asignaturas', src: 'assets/icon/libro.png', background: 'rgba(255, 196, 9, 0.1)', url: '/cursos'},
    {id: 4, name: 'Asistencia', src: 'assets/icon/prueba.png', background: 'rgba(27,150,181, 0.1)', url: '/miasistencia'},
  ]

    constructor(
      private router:Router,
      private activatedRouter:ActivatedRoute,
      private menu:MenuController,
    ){
      this.activatedRouter.queryParams.subscribe(params=>{
        if(this.router.getCurrentNavigation().extras.state){
          let usuario=this.router.getCurrentNavigation().extras.state.miusuario;
          console.log("Llego el state: " + usuario.username);
          this.username=usuario.username;
        }   
      })
    
    
    }
    firebase = inject(FirebaseService)
    utilsvc = inject(UtilsService)

    user(): User{
      return this.utilsvc.getFromLocalStorage('user')
    
    }
    verMenu(){
   

  }
}