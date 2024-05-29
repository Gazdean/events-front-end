import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase'

export async function querySnapshot(collection, document) {
    const docRef = doc(db, `${collection}`, `${document}`);
    const docSnap = await getDoc(docRef);
    return docSnap
}