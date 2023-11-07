import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth'
import { User } from '../interfaces/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {getFirestore, setDoc, doc, getDoc,updateDoc} from '@angular/fire/firestore'
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL} from "firebase/storage"
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  Firestore = inject(AngularFirestore);
  utilsvc = inject(UtilsService);
  storage = inject(AngularFireStorage)


  //IMAGEN
 async uploadImage(path: string, data_url :string){
  return uploadString(ref(getStorage(),path),data_url, 'data_url').then(()=>{
    return getDownloadURL(ref(getStorage(),path))
  })
  }



  //AUTENTICACIÓN

  salir(){
    getAuth().signOut()
    localStorage.removeItem('user')
    this.utilsvc.routerLink('/ingreso')
  }


  getAuth(){
   return getAuth()
  }
  //ACCESO
  signIn(user : User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  signUp(user : User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }
  updateUser( displayName: string){
    return updateProfile(getAuth().currentUser, {  displayName } )
  }



  //BASE DE DATOS
  setDocument(path: string, data: any){
    return setDoc( doc(getFirestore(), path), data );
  }

 async getDocument(path: string){
    return (await getDoc( doc(getFirestore(), path) ) ).data();
  }

  updateDocument(path: string, data:any){
    return updateDoc(doc(getFirestore(),path),data)
  }

  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email)
  }
}
