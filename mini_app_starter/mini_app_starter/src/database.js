import firebase from 'firebase/app';
import 'firebase/firestore';

import config from '../db_config';

export const firedb = firebase.initializeApp(config);
export const db = firedb.firestore();


export async function addData(data) {
  // myData lesz a collection neve
  // a data változó a bemeneti paramétere az addData fügvénynek
  // ez bármilyen JS object lehet.
  const response = await db.collection('myData').add(data);
  // ha sikerült beleírni az adatbázisba akkor a response változó az
  // adatbázisba írt adat ID-jét adja vissza:
  console.log('Document written with id: ', response.id);
}
export async function getData() {
  const snapshot = await db.collection('myData').get();
  // a map function végigmegy a snapshot.docs tömbön, és vissza adja a
  // dokumentum adatait
  // return snapshot.docs.map(doc => doc.data());
  // hosszabban az előző sor:
  // létrehozunk egy üres tömböt
  const result = [];
  // végig megyünk a query-ből visszakapott snapshot-on
  for (const doc of snapshot.docs) {
    // hozzáfűzöd a documentum adatait a results tömb-höz
    result.push(doc.data());
  }
  return result;
}