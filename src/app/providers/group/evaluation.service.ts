import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Evaluation } from 'src/app/models/evaluation.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private collectionGroupName: string = '/groups'
  private collectionName: string = '/evaluations'

  constructor(private db: AngularFirestore,
              private fireStorage: AngularFireStorage) { }

  save = (groupId: string, evaluation: Evaluation) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, ...evaluation});

  findAll = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Evaluation>[]) =>
      actions.map((action: DocumentChangeAction<Evaluation>) => {
        const evaluation: Evaluation = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...evaluation };
      })
  ))
}
