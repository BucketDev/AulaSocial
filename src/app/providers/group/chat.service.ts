import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeType, DocumentChangeAction } from '@angular/fire/firestore';
import { FireAuthService } from '../auth/fire-auth.service';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/message-interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private collectionGroupName: string = '/groups'
  private collectionName: string = '/chat'

  constructor(private db: AngularFirestore,
              private fireAuth: FireAuthService) { }

  findAllByGroupId = (groupId: string) => 
    this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName, ref => ref.orderBy('creationDate', 'asc'))
      .snapshotChanges().pipe(map((documents: DocumentChangeAction<Message>[]) =>
        documents.map((action: DocumentChangeAction<Message>) => {
          const message: Message = action.payload.doc.data();
          const uid: string = action.payload.doc.id;
          return {uid, ...message};
        })
    ))
    
  save = (groupId: string, message: string) => {
    const {displayName, photoURL, uid} = this.fireAuth.user;
    return this.db.collection(this.collectionGroupName).doc(groupId)
      .collection(this.collectionName).add({creationDate: new Date, displayName, photoURL, userId: uid, message: message})
  }
}
