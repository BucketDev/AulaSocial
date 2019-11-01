import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { FireAuthService } from '../auth/fire-auth.service';

import { Group } from '../../models/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private collectionName: string = '/groups'
  groupId: string;

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (group: Group) => this.db.collection(this.collectionName).add({
    owner: this.fireAuth.user.displayName,  ...group, creationDate: new Date()
  });

  findAll = () => this.db.collection(this.collectionName).snapshotChanges().pipe(map((actions: DocumentChangeAction<Group>[]) =>
    actions.map((action: DocumentChangeAction<Group>) => {
      const group: Group = action.payload.doc.data();
      const uid: string = action.payload.doc.id;
      return { uid, ...group };
    })
  ))
}
