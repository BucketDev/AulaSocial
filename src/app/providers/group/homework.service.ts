import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { FireAuthService } from '../auth/fire-auth.service';
import { Homework } from 'src/app/models/homework.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private collectionGroupName: string = '/groups'
  private collectionName: string = '/homework'

  constructor(private db: AngularFirestore,
              private fireStorage: AngularFireStorage,
              private fireAuth: FireAuthService) { }

  save = (groupId: string, homework: Homework) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, ...homework});

  findAll = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Homework>[]) =>
      actions.map((action: DocumentChangeAction<Homework>) => {
        const homework: Homework = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...homework };
      })
  ))

  findAllFiles = (groupId: string, homeworkId: string) =>
    this.fireStorage.storage.ref(`groups/${groupId}/homework/${homeworkId}`).listAll()
}
