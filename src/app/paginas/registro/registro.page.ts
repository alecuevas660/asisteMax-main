import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  constructor(private alertController: AlertController, private router:Router) {}

 
  formulario = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),

    })

   


  //inyectar servicio firebase
  firebase = inject(FirebaseService)
  utilsvc = inject(UtilsService)

  ngOnInit() {
  }


  //ir a login
  login(){
    this.router.navigate(['/ingreso'])
  }


  async alerta() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Usuario no registrado',
      message: 'Registrate primero!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  

  async submit(){

    if(this.formulario.valid){

      const loading = await this.utilsvc.loading()
      await loading.present()

      this.firebase.signUp(this.formulario.value as User).then(async res=>{
        await this.firebase.updateUser(this.formulario.value.name)
        let uid = res.user.uid;
        this.formulario.controls.uid.setValue(uid)
        this.setUserInfo(uid)
        console.log(res)

      
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
      this.login()
    }
  }



  async setUserInfo(uid : string){
    if(this.formulario.valid){
      const loading = await this.utilsvc.loading()
      await loading.present()


      let path = `users/${uid}`
      delete this.formulario.value.password

      this.firebase.setDocument(path, this.formulario.value).then(async res=>{
      this.utilsvc.saveInLocalStorage('user', this.formulario.value)
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
      this.login()
    }
  }



}
