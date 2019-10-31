import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  if ( context.auth!.token.admin !== true ) {
    return { err: 'Permission denied!' }
  }
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`
    }
  }).catch(err => err);
});

exports.addProfessorRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (professor)
  if ( context.auth!.token.admin !== true ) {
    return { err: 'Permission denied!' }
  }
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { professor: true });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made a professor`
    }
  }).catch(err => err);
});

exports.removeProfessorRole = functions.https.onCall((data, context) => {
  // get user and remove custom claim (professor)
  if ( context.auth!.token.admin !== true ) {
    return { err: 'Permission denied!' }
  }
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { professor: false });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made a professor`
    }
  }).catch(err => err);
});

exports.createUser = functions.auth.user().onCreate((userRecord, context) => {
  return admin.firestore().doc(`/users/${userRecord.uid}`).set({
    displayName: userRecord.displayName,
    email: userRecord.email,
    photoURL: userRecord.photoURL
  });
});