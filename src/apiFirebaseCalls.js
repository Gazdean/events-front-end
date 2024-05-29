import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase'

export async function querySnapshot(collection, document) {
    const docRef = doc(db, `${collection}`, `${document}`);
    const docSnap = await getDoc(docRef);
    return docSnap
}

export async function addNewUser(email){
    const userRef = doc(db, `users/${email}`)
    const userData = {
        firstName: "",
        lastName: "",
        myEvents:[]
    }
    setDoc(userRef, userData)
}