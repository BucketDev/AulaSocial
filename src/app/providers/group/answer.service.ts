import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Answer } from 'src/app/models/answer.interface';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private collectionGroupName: string = '/groups';
  private collectionEvaluationName: string = '/evaluations';
  private collectionQuestionName: string = '/questions';
  private collectionName: string = '/answers';

  constructor(private db: AngularFirestore) { }

  save = (groupId: string, evaluationId: string, questionId: string, answer: Answer) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionQuestionName).doc(questionId)
      .collection(this.collectionName).add(answer);

  findAll = (groupId: string, evaluationId: string, questionId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionQuestionName).doc(questionId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Answer>[]) =>
      actions.map((action: DocumentChangeAction<Answer>) => {
        const answer: Answer = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...answer };
      })
  ))
}
