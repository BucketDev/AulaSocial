import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, DocumentData, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Homework } from 'src/app/models/homework.interface';
import { group } from '@angular/animations';
import { User } from 'src/app/models/user.interface';
import { FireAuthService } from '../auth/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private collectionGroupName: string = '/groups'
  private collectionUsersName: string = '/users'
  private collectionName: string = '/homework'

  constructor(private db: AngularFirestore,
              private fireStorage: AngularFireStorage,
              private fireAuth: FireAuthService) { }

  save = (groupId: string, homework: Homework) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, ...homework});

  findAll = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((documents: DocumentChangeAction<Homework>[]) => {
        return documents.map((action: DocumentChangeAction<Homework>) => {
          const homework: Homework = action.payload.doc.data();
          const uid: string = action.payload.doc.id;
          return { uid, ...homework };
        })
      }))

  addUser = (groupId: string, homeworkId: string) => 
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(homeworkId)
      .collection(this.collectionUsersName).add({creationDate: new Date(), uid: this.fireAuth.user.uid});
  
  findUsers = (groupId: string, homeworkId: string) => 
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(homeworkId)
      .collection(this.collectionUsersName).snapshotChanges().pipe(map((actions: DocumentChangeAction<User>[]) =>
      actions.map((action: DocumentChangeAction<User>) => {
        const user: User = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...user };
      })
    ))

  findAllFiles = (groupId: string, homeworkId: string) =>
    this.fireStorage.storage.ref(`groups/${groupId}/homework/${homeworkId}`).listAll()
}
