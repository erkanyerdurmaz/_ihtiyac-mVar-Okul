import { Component, ElementRef, ViewChild } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Urun } from '../urun-model';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

  yeniKayit()
  {
    this.deger.tarih = Math.floor(Date.now() /  1000);

    this.firestoreService.yeniKayit(this.deger,this.userID).then(sonuc=> { 
      console.log(sonuc.id); 
      this.deger.urun = null;
      this.deger.adet = null;
      this.deger.tarih = null;
      this.deger.adres=null;
      this.deger.okulad=null;
      this.deger.telno=null;
    }).catch(err => {console.log(err)});
  }

  kayitGuncelle(id, deger)
  {
    this.firestoreService.kayitGuncelle(id, deger, this.userID);
    console.log(deger)

  }

  kayitSil(id)
  {
    this.firestoreService.kayitSil(id,this.userID);
    console.log('Kayıt Silindi!')

  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kayıt Sil',
      message: 'Bu kaydı silmek istiyor musunuz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          handler: () => {
            this.kayitSil(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentAlertPrompt(kayit) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ürün Güncelle',
      inputs: [
        {
          name: 'urun',
          type: 'text',
          id: 'urunID',
          value: kayit.payload.doc.data().urun,
          placeholder: 'Ürün Giriniz'
        },
        {
          name: 'adet',
          type: 'number',
          id: 'adetID',
          value: kayit.payload.doc.data().adet,
          placeholder: 'Adet Giriniz'
        },
        {
          name: 'okulad',
          type: 'text',
          id: 'okuladID',
          value: kayit.payload.doc.data().adres,
          placeholder: 'Okul Adini Giriniz'
        },
        {
          name: 'adres',
          type: 'text',
          id: 'adresID',
          value: kayit.payload.doc.data().adres,
          placeholder: 'Okul Adresini Giriniz'
        },
        {
          name: 'telno',
          type: 'text',
          id: 'telnoID',
          value: kayit.payload.doc.data().adres,
          placeholder: 'Telefon Numarasi Giriniz'
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Güncelle',
          handler: (sonuc) => {
  
            let guncellenecekData = {'urun':null,'adet':null, tarih:null,adres:null,'okulad':null,telno:null};
  
            if (sonuc.urun !== '' && sonuc.adet !=='' && sonuc.adres !==''&& sonuc.okulad !==''&& sonuc.telno !=='' && (sonuc.urun !== kayit.payload.doc.data().urun || sonuc.adet !== kayit.payload.doc.data().adet || sonuc.adres !== kayit.payload.doc.data().adres|| sonuc.okulad !== kayit.payload.doc.data().okulad|| sonuc.telno !== kayit.payload.doc.data().telno)) {
              guncellenecekData.tarih = Math.floor(Date.now() / 1000);
              guncellenecekData.urun = sonuc.urun;
              guncellenecekData.adet = sonuc.adet;
              guncellenecekData.adres = sonuc.adres;
              guncellenecekData.okulad = sonuc.okulad;
              guncellenecekData.telno = sonuc.telno;
            this.kayitGuncelle(kayit.payload.doc.id, guncellenecekData);
            }
            else {
              console.log('Değişiklik Yok');
            }
            
  
          }
        }
      ]
    });
  
    await alert.present();
  }

}
