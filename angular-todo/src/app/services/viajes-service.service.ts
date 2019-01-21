import { Injectable } from '@angular/core';
import { Viajes } from 'src/app/models/viajes';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ViajesViewModel } from '../models/viajes-view-model';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(private db: AngularFirestore) { }

  private ViajesCollectionName = 'viajes';

  getViajes(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Viajes>(this.ViajesCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
  }
  getViaje(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.db.collection<Viajes>(this.ViajesCollectionName).doc(id).get();
  }
  getViajesDestacados(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Viajes>(this.ViajesCollectionName, ref => ref.where('destacado', '==', true)).get();
  }
  getViajesUltimoMomento() {
    let array: Observable<firebase.firestore.QuerySnapshot> = this.db.collection<Viajes>(this.ViajesCollectionName, ref => ref.limit(3)).get();
    return array;
  }
  saveViajes(Viajes: Viajes): Promise<DocumentReference> {
    return this.db.collection(this.ViajesCollectionName).add(Viajes);
  }
  editViajes(Viajes: ViajesViewModel): Promise<void> {
    return this.db.collection(this.ViajesCollectionName).doc(Viajes.id).update(Viajes);
  }
  /*editViajesPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.ViajesCollectionName).doc(id).update(obj);
  }*/
  deleteViajes(idViajes: string): Promise<void> {
    return this.db.collection(this.ViajesCollectionName).doc(idViajes).delete();
  }
}