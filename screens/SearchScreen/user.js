import { saveMediaToStorage } from './random'
import { firebase } from '../../firebase'

export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, `profileImage/${firebase.auth().currentUser.uid}`).then((res) => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                photoURL: res
            })
            .then(() => resolve())
            .catch(() => reject())
    })
})

export const saveUserField = (field, value) => new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update(obj)
        .then(() => resolve())
        .catch(() => reject())
})

 // query music function, checks firestore and compares user text input with firestore collection 'songs' data
export const queryMusic = (songName) => new Promise((resolve, reject) => {
    if (songName === '') {
        resolve([])
    }

    firebase.firestore()
        .collection('songs')
        .where('name', '>=', songName)
        .where('name', '<=', songName + '\uf8ff')
        .get()
        .then((snapshot) => {
            let songs = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            resolve(songs)
        })
        .catch(() => reject())
})

 // query user function, checks firestore and compares user text input with firestore collection 'users' data

export const queryUsers = (username) => new Promise((resolve, reject) => {
    if (username === '') {
        resolve([])
    }

    firebase.firestore()
        .collection('users')
        .where('username', '>=', username)
        .where('username', '<=', username + '\uf8ff')
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            resolve(users)
        })
        .catch(() => reject())
})

/**
 * fetches the doc corresponding to the id of a user.
 * 
 * @param {String} id of the user we want to fetch 
 * @returns {Promise<Object>} user object if successful.
 */
//  export async function getUserById(UID) {
//     return await firebase.database().ref(`users/${UID}`).once('value');
//   }
export const getUserById = (id) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((snapshot) => {
            resolve(snapshot.exists ? snapshot.data() : null)
        })
        .catch(() => reject())
})



