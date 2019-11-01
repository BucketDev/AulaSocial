import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Student } from 'src/app/models/student.interface';
import { FireAuthService } from '../auth/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private collectionGroupName: string = '/groups'
  private collectionName: string = '/students'

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  findAll = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Student>[]) =>
      actions.map((action: DocumentChangeAction<Student>) => {
        const student: Student = action.payload.doc.data();
        const uid: string = action.payload.doc.id;
        return { uid, ...student };
      })
  ))

  save = (groupId: string) => {
    let {uid, photoURL, email} = this.fireAuth.user;
    return this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(uid).set({ uid, photoURL, email, joinedAt: new Date() })
  };

  delete = (groupId: string) => {
    return this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(this.fireAuth.user.uid).delete();
  }
}
