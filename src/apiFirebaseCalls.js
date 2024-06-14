import { setDoc, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase'



export async function querySnapshot(collection, document) {
    try {const docRef = doc(db, `${collection}`, `${document}`);
        const docSnap = await getDoc(docRef);
        return docSnap
    } catch(error) {
        console.log(error)
        throw error
    }
}

export async function addNewUser(email){
    try {const userRef = doc(db, `users/${email}`)
        const userData = {
            firstName: "",
            lastName: "",
            myEvents:[]
        }
        await setDoc(userRef, userData)
    } catch(error){ 
        console.log(error)
        throw error
    }
}

export async function getCollection(collection, document) {
    const docRef = doc(db, collection, document);
    try{ const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        }  
    } catch(error) {
         console.log("No such document!", error);
         throw error
    }
}

export async function upDateMyEvents(id, data) {
    try {
         await updateDoc(doc(db, "users", id), {
            myEvents: arrayUnion(data)
          });;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function addAnEvent(id, data) {
    try {
         await setDoc(doc(db, "events", id), {         
          }, { merge: true });
    } catch (error) {
        console.log(error)
        throw error
    }
} 

export async function upDateEventAttendees(id, data) {
    try {
         await updateDoc(doc(db, "events", id), {
            signedUpUsers:arrayUnion(data)
          });
    } catch (error) {
        console.log(error)
        throw error
    }
}

