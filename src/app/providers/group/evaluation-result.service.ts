import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';

import { EvaluationResult } from 'src/app/models/evaluation-result.interface';
import { FireAuthService } from '../auth/fire-auth.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EvaluationResultService {

  private collectionGroupName: string = '/groups';
  private collectionEvaluationName: string = '/evaluations';
  private collectionUsersName: string = '/users';
  private collectionName: string = '/results';

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (groupId: string, evaluationId: string, results: EvaluationResult[]) => {
    const userRef = this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionUsersName).doc(this.fireAuth.user.uid).ref;
    
    return userRef.set({ email: this.fireAuth.user.email, photoURL: this.fireAuth.user.photoURL, creationDate: new Date })
      .then(() => {
        const batch = this.db.firestore.batch();
        results.forEach((result: EvaluationResult) => {
          batch.set(userRef.collection(this.collectionName).doc(result.uid), {...result});
        })
        return batch.commit();
      }); 
  }

  findAllUsers = (groupId: string, evaluationId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionUsersName).snapshotChanges().pipe(map((actions: DocumentChangeAction<User>[]) =>
      actions.map((action: DocumentChangeAction<User>) => {
        const user: User = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...user };
      })
  ))

  findAll = (groupId: string, evaluationId: string, userId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionUsersName).doc(userId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<EvaluationResult>[]) =>
      actions.map((action: DocumentChangeAction<EvaluationResult>) => {
        const result: EvaluationResult = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...result };
      })
  ))
}
