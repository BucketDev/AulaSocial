import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, QueryDocumentSnapshot, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { FireAuthService } from '../auth/fire-auth.service';
import { Forum } from 'src/app/models/forum.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private collectionGroupName: string = '/groups'
  private collectionName: string = '/forums'
  public forumId: string

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (groupId: string, forum: Forum) => {
    const {displayName, photoURL, email} = this.fireAuth.user;
    return this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, displayName, photoURL, email, ...forum});
  }

  findAllByGroupId = (groupId: string) => 
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).snapshotChanges().pipe(map((documents: DocumentChangeAction<Forum>[]) =>
        documents.map((action: DocumentChangeAction<Forum>) => {
          const forum: Forum= action.payload.doc.data();
          const uid: string = action.payload.doc.id;
          return {uid, ...forum};
        })
      ))
  
  findAllAdminByGroupId = (groupId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).get().pipe(map((snapshot: QuerySnapshot<Forum>) => {
        return snapshot.docs.map((document: QueryDocumentSnapshot<Forum>) => {
          const forum: Forum = document.data();
          const uid: string = document.id;
          return {uid, groupId, ...forum}
      })
    }))

  findById = (groupId: string, forumId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(forumId).get().pipe(map((snapshot: DocumentSnapshot<Forum>) => {
        return {uid: snapshot.id, ...snapshot.data()}
      }))

  delete = (groupId: string, forumId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).doc(forumId).delete();
}
