import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  constructor(private alertController: AlertController, private router:Router) {

  }

  
  formulario = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
      })

//RUTAS
  home(){
    this.router.navigate(['/home'])
  }
  registro(){
    this.router.navigate(['/registro'])
  }

  //inyectar servicio firebase
  firebase = inject(FirebaseService)
  utilsvc = inject(UtilsService)

  ngOnInit() {
  }

//ALERTA
  async alerta() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Usuario no registrado',
      message: 'Registrate primero!',
      buttons: ['OK'],
    });

    await alert.present();
  }

//ENTRAR
  async submit(){
    if(this.formulario.valid){

      const loading = await this.utilsvc.loading()
      await loading.present()

      this.firebase.sendRecoveryEmail(this.formulario.value.email).then(res=>{


        this.utilsvc.Toast({
          message: `Correo enviado con éxito`,
          duration: 1500,
          color: 'primary',
          position: "middle",
          icon: 'person-circle-outline'
        })
      

        this.utilsvc.routerLink('/auth')
        this.formulario.reset()




      }).catch(error => {
        console.log(error)
        this.utilsvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: "middle",
          icon: 'alert-circle-outline'
        })
       

      }).finally(() =>{
        loading.dismiss()
      })

    }
  }



}

