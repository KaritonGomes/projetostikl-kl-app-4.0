import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiometricService {

  logoutTimer = new BehaviorSubject(0);

  constructor(private modalCtrl: ModalController) {

   }

   resetLogoutTimer(){
     this.logoutTimer.next(10);
   }
   
   decreaseTimer(){
    setTimeout(()=>{
      if(this.logoutTimer.value == 0){
      }else{
          this.logoutTimer.next(this.logoutTimer.value -1);
          this.decreaseTimer();
      }
    }, 1000)
   }


}
