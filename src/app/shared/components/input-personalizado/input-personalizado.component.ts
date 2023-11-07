import { Component, Input,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-personalizado',
  templateUrl: './input-personalizado.component.html',
  styleUrls: ['./input-personalizado.component.scss'],
})
export class InputPersonalizadoComponent  implements OnInit {

  @Input() control! : FormControl;
  @Input() type! : string;
  @Input() label! :  string;
  @Input() autocomplete! :  string;
  @Input() icon! :  string;

  isPassword!: boolean;
  hide:boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true
  }
  mostrarocultar(){
    this.hide = !this.hide
    if (this.hide) this.type = 'password'
    else this.type = 'text'
  }

}
