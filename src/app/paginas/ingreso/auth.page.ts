import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private alertController: AlertController, private router:Router) {
    
  }

//RUTAS
  home(){
    this.router.navigate(['/home'])
  }
  registro(){
    this.router.navigate(['/registro'])
  }
  recuperar(){
    this.router.navigate(['/recuperar'])
  }

  

  formulario = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    })

   


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

      this.firebase.signIn(this.formulario.value as User).then(res=>{
        this.getUserInfo(res.user.uid)
        this.utilsvc.routerLink('/menu')
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

 
  async getUserInfo(uid : string){
    if(this.formulario.valid){
      const loading = await this.utilsvc.loading()
      await loading.present()


      let path = `users/${uid}`

      this.firebase.getDocument(path).then((user: User)=>{
      this.utilsvc.saveInLocalStorage('user',user)
      this.utilsvc.routerLink('/menu')
      this.formulario.reset()
    
      this.utilsvc.Toast({
        message: `Bienvenido, ${user.name}`,
        duration: 1500,
        color: 'primary',
        position: "middle",
        icon: 'person-circle-outline'
      })
    





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
