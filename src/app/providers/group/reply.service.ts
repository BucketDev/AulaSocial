import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentData } from '@angular/fire/firestore';
import { FireAuthService } from '../auth/fire-auth.service';
import { map } from 'rxjs/operators';
import { Reply } from 'src/app/models/reply.interface';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private collectionGroupName: string = '/groups'
  private collectionForumsName: string = '/forums'
  private collectionName: string = '/replies'
  public forumId: string

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  save = (groupId: string, forumId: string, description: string) => {
    const {displayName, photoURL, email} = this.fireAuth.user;
    return this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionForumsName).doc(forumId)
      .collection(this.collectionName).add({creationDate: new Date, displayName, photoURL, email, description, claps: 0})
  }

  findAll = (groupId: string, forumId: string) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionForumsName).doc(forumId)
      .collection(this.collectionName, ref => ref.orderBy('claps', 'desc'))
      .snapshotChanges().pipe(map((documents: DocumentData[]) =>
        documents.map((document: DocumentData) => {
          const reply: Reply= document.payload.doc.data();
          const uid: string = document.payload.doc.id;
          return {uid, ...reply};
        })
    ))

  addClap = (groupId: string, forumId: string, replyId: string, clapNumber: number) =>
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionForumsName).doc(forumId)
      .collection(this.collectionName).doc(replyId).update({claps: clapNumber})
}
