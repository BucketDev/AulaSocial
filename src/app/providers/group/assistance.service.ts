import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, QueryDocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';
import {FireAuthService} from '../auth/fire-auth.service';
import {Assistance} from '../../models/assistance.interface';
import {map} from 'rxjs/operators';
import {Evaluation} from '../../models/evaluation.interface';
import {Student} from '../../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private collectionGroupName = '/groups';
  private collectionName = '/assistance';

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  saveAssistance = (uid: string, assistance: Assistance) =>
    this.db.collection(this.collectionGroupName).doc(uid)
      .collection(this.collectionName).doc(assistance.uid).set(assistance)

  findByUid = (uid: string) =>
    this.db.collection(this.collectionGroupName).doc(uid)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Assistance>[]) =>
        actions.map((document: DocumentChangeAction<Assistance>) => document.payload.doc.data())
    ))
}
