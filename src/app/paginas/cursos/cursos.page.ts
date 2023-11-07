
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { query, collection, onSnapshot, getFirestore} from '@firebase/firestore';
import { OnInit } from '@angular/core';
import { last } from 'rxjs/operators';
import { ClaseI } from '../../../../models/models';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage {
  clases: any[]= [];
  username:string='';
  
    constructor(

      private menu:MenuController,
   
    ) {
    }
    async ngOnInit() {
    }
    verMenu(){
      this.menu.open('first');
    }
    //get all courses from the user
    
    }
