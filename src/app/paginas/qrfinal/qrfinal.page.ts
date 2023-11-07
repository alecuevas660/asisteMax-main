
import { Component, Query} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { querystring } from '@firebase/util';
import { query, collection, onSnapshot, getFirestore} from '@firebase/firestore';
import { ClaseI, UserI } from '../../../../models/models';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-qrfinal',
  templateUrl: './qrfinal.page.html',
  styleUrls: ['./qrfinal.page.scss'],
})

export class QrfinalPage {
  asistencia: UserI;
  code:any;
  username: any;
  clases: any[]= [];

  
    constructor(
  
      private menu:MenuController,
      private barcodeScanner: BarcodeScanner,
    ) {
      
  
  
    }
    ngOnInit() {
    }
  
    verMenu(){
      this.menu.open('first');
    }
      

    //create a function to save all the clases from firebase in a array
   

      /*try {
        const courses = await this.db.getCollection('Clases').toPromise();
        courses.forEach(course => this.clases.push(course));
      } catch (err) {
        console.error(err);
      }
      console.log(this.clases);
    }
  }
      /*console.log(this.clases);
            console.log(this.clases);
            let fechas: any = this.clases.fechas;
            let asistencia: any = this.clases.asistencia;
            let data: any = {
              asignatura: this.code,
              fechas: fechas.concat(new Date()),
              asistencia: asistencia + 1,
            }
            console.log(data);
            this.db.setDoc(data, 'Clases', this.code).then((res) => {
              console.log('Asistencia añadida');
            })
            console.log('Class exists, assitance added')

          }
        else{
          //if dont existe create a new class on firebase
          let fechas: any = [new Date()];
          this.db.createDoc({
            asignatura: this.code,
            fechas: fechas,
            asistencia: 1,
          }, 'Clases', this.code);
          console.log('Class created');
        }
      }

    }
    
    





    /*this.database.createDoc(data).then((res) => {
      console.log('se a creado correctamente',res);
      this.animacion.showLoading;
      this.animacion.presentToast('Ha quedado presente');
      
    })*/


  }