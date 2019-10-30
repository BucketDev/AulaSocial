import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName: string = '/users'

  constructor(private db: AngularFirestore) { }

  save = (user: User) => this.db.collection(this.collectionName).doc(user.uid).set(user);

  findAll = () => this.db.collection(this.collectionName).get().pipe(map((querySnapshot: QuerySnapshot<User>) => {
    let users: User[] = [];
    querySnapshot.docs
      .forEach((documentSnapshot: QueryDocumentSnapshot<User>) => users.push(documentSnapshot.data()))
    return users;
  }));

}
