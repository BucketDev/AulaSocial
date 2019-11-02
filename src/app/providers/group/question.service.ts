import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Question } from 'src/app/models/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private collectionGroupName: string = '/groups'
  private collectionEvaluationName: string = '/evaluations'
  private collectionName: string = '/questions'

  constructor(private db: AngularFirestore) { }

  save = (groupId: string, evaluationId: string, question: Question) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionName).add(question);

  findAll = (groupId: string, evaluationId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionEvaluationName).doc(evaluationId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Question>[]) =>
      actions.map((action: DocumentChangeAction<Question>) => {
        const question: Question = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...question };
      })
  ))
}
