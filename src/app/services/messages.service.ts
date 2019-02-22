import { Injectable } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private db: AngularFirestore) { }

  private CollectionName = 'mensajes';

  getMensajes(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Mensaje>(this.CollectionName, ref => ref.orderBy('createdDate', 'desc')).get();
  }
  getMensajesNoLeidos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Mensaje>(this.CollectionName, ref => ref.where('leido', '==', false)).get();
  }
  saveMensaje(Mensaje: Mensaje): Promise<DocumentReference> {
    return this.db.collection(this.CollectionName).add(Mensaje);
  }
  deleteMensaje(idViajes: string): Promise<void> {
    return this.db.collection(this.CollectionName).doc(idViajes).delete();
  }
  /*editViajes(Viajes: ViajesViewModel): Promise<void> {
    return this.db.collection(this.ViajesCollectionName).doc(Viajes.id).update(Viajes);
  }*/
  /*editViajesPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.ViajesCollectionName).doc(id).update(obj);
  }*/
  
}