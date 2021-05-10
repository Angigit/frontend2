import 'firebase/auth';
import { firedb } from './database';


export async function signUp(email, password) {
  // hibakezelés
  try {
    const user = await firedb.auth().createUserWithEmailAndPassword(email, password);
    console.log(user);
    return user;
  } catch (error) {
    //console.log(error);
    window.alert(error.message);
  }
}

export async function signIn(email, password) {
  try {
    const user = await firedb.auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function signOut() {
  try {
    const user = await firedb.auth().signOut();
  } catch (error) {
    console.log(error);
  }
}

export function loginStatus() {
  return new Promise((resolve, reject) => {
    firedb.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject('no user');
      }
    });
  });
}

export async function resetPassword(email) {
  try {
    await firedb.auth().sendPasswordResetEmail(email);
    console.log('email sent');
  } catch (e) {
    console.log('error: ', e);
  }
}