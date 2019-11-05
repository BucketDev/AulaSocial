import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, QuerySnapshot, QueryDocumentSnapshot, DocumentData, DocumentChangeType } from '@angular/fire/firestore';

import { Evaluation } from 'src/app/models/evaluation.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private collectionGroupName: string = '/groups'
  private collectionUsersName: string = '/users'
  private collectionName: string = '/evaluations'

  constructor(private db: AngularFirestore) { }

  save = (groupId: string, evaluation: Evaluation) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, ...evaluation});

  findAllByGroupId = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((documents: DocumentChangeAction<Evaluation>[]) => {
      return documents.map((action: DocumentChangeAction<Evaluation>) => {
        const evaluation: Evaluation = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...evaluation };
      })
    }))
  
  findAllAdminByGroupId = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).get().pipe(map((snapshot: QuerySnapshot<Evaluation>) => {
        return snapshot.docs.map((document: QueryDocumentSnapshot<Evaluation>) => {
          const evaluation: Evaluation = document.data();
          const uid: string = document.id;
          return {uid, groupId, ...evaluation}
      })
    }))

  findUsers = (groupId: string, evaluationId: string) => 
  this.db.collection(this.collectionGroupName).doc(groupId)
    .collection(this.collectionName).doc(evaluationId)
    .collection(this.collectionUsersName).snapshotChanges().pipe(map((actions: DocumentChangeAction<User>[]) =>
    actions.map((action: DocumentChangeAction<User>) => {
      const user: User = action.payload.doc.data();
      const uid: string = action.payload.doc.id;
      return { uid, ...user };
    })
  ))

  delete = (groupId: string, evaluationId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(evaluationId).delete();
  
  updateEvent = (gropId: string, evaluationId: string, eventId: string) =>
    this.db.collection(this.collectionGroupName).doc(gropId)
      .collection(this.collectionName).doc(evaluationId).update({ eventId })
}
