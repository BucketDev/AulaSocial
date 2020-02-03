import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { FireAuthService } from '../auth/fire-auth.service';

import { Group } from '../../models/group.interface';
import { Student } from 'src/app/models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName = '/groups';
  groupId: string;
  students: Student[];

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (group: Group) => this.db.collection(this.collectionName).add({
    owner: this.fireAuth.user.displayName, photoURL: this.fireAuth.user.photoURL,  ...group, creationDate: new Date()
  });

  findAll = () => this.db.collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Group>[]) =>
    actions.map((action: DocumentChangeAction<Group>) => {
      const group: Group = action.payload.doc.data();
      const uid: string = action.payload.doc.id;
      return { uid, ...group };
    })
  ))

  findByGroupId = (groupId: string) => this.db.collection(this.collectionName).doc(groupId).get()
    .pipe(map((snapshot: DocumentSnapshot<Group>) => {
      return {...snapshot.data()}
  }))

  getAttendees = () => this.students.map((student: Student) => { return { email: student.email } });

  delete = (groupId: string) => this.db.collection(this.collectionName).doc(groupId).delete();

}
