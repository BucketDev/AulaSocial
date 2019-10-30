import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
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
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { professor: false });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made a professor`
    }
  }).catch(err => err);
});