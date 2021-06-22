import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Urun } from '../urun-model';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-okulihtiyac',
  templateUrl: './okulihtiyac.page.html',
  styleUrls: ['./okulihtiyac.page.scss'],
})
export class OkulihtiyacPage {

  
  deger:Urun = {urun:null, adet:null, tarih:null,adres:null,okulad:null,telno:null};
  kayitlar:any;
  userID:string;

  constructor(private firestoreService:FirestoreService, private router:Router, private alertController:AlertController, private angularFireAuth:AngularFireAuth) {
    //Gerçek kullanım için buna gerek olmaz, kullanıcı login ya da register olduğu zaman UID, Ad Soyad, Eposta vb. bilgileri Storage'a atıp oradan gerektiği zaman çekmek en doğru yöntemdir.
    this.angularFireAuth.authState.subscribe(kullanici => {
      if (kullanici) {
        this.userID = kullanici.uid;
        console.log(this.userID);
        this.listele();
      } else {
        this.router.navigateByUrl('/welcome');
      }
    })

  }

  listele()
  {
    this.firestoreService.kayitlariOku('tarih','desc',this.userID).subscribe(sonuc => {this.kayitlar = sonuc; console.log(sonuc); }, err => { console.log(err);});

  }

 

  

  

 
            
  
          }
    ;
  
    
  



