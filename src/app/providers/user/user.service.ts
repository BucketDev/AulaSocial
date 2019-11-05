import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.interface';
import { map } from 'rxjs/operators';
import { FireAuthService } from '../auth/fire-auth.service';
import { Group } from 'src/app/models/group.interface';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName: string = '/users'
  collectionGroupName: string = '/groups'

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (user: User) => this.db.collection(this.collectionName).doc(user.uid).set(user);

  findAll = () => this.db.collection(this.collectionName).get().pipe(map((querySnapshot: QuerySnapshot<User>) => {
    let users: User[] = [];
    querySnapshot.docs
      .forEach((documentSnapshot: QueryDocumentSnapshot<User>) => users.push(documentSnapshot.data()))
    return users;
  }));

  addGroup = (group: Group) => this.db.collection(this.collectionName).doc(this.fireAuth.user.uid)
    .collection(this.collectionGroupName).doc(group.uid).set({...group});

  removeGroup = (groupId: string) => this.db.collection(this.collectionName).doc(this.fireAuth.user.uid)
    .collection(this.collectionGroupName).doc(groupId).delete();

  removeGroupFromAllUsers = (groupId: string) => {
    this.db.collection(this.collectionName).get().forEach((snapshot: QuerySnapshot<User>) => {
      snapshot.docs.forEach((document: QueryDocumentSnapshot<User>) => {
        document.ref.firestore.collection(`${document.ref.path}${this.collectionGroupName}`).get()
          .then((groupSnapshot: QuerySnapshot<Group>) => {
            groupSnapshot.docs.forEach((documentGroup: QueryDocumentSnapshot<Group>) => {
              if (documentGroup.id === groupId) {
                documentGroup.ref.delete();
              }
            })
          })
      })
    })
  }

  findGroups = () => this.db.collection(this.collectionName).doc(this.fireAuth.user.uid)
    .collection(this.collectionGroupName).get().pipe(map((querySnapshot: QuerySnapshot<Group>) => {
      let groups: Group[] = [];
      querySnapshot.docs
        .forEach((documentSnapshot: QueryDocumentSnapshot<Group>) => groups.push(documentSnapshot.data()))
      return groups;
    }))

}
