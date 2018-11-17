import { firestoreDb } from '../utils/firebaseUtils'

export default class FirebaseService {
    static getAll = async (node) => {
        const ref = firestoreDb.collection(node);
        const snapshot = await ref.get();
        let data = [];
        snapshot.forEach(doc => {
            data = [...data, doc.data()];
        });
        return data;
    }
    static pushData = async (node, objToSubmit) => {
        const nodeRef = firestoreDb.collection(node);
        const objRef = await nodeRef.add(objToSubmit);
        return objRef.id;
    };

    static getUniqueDataBy = async (node, id) => {
        const ref = firestoreDb.collection(node).doc(id);
        const doc = await ref.get();
        return doc.data();
    };

    static updateData = async (id, node, objToSubmit) => {
        const ref = firestoreDb.collection(node).doc(id);
        try {
            await firestoreDb.runTransaction(async t => {
                await t.get(ref);
                t.update(ref, objToSubmit);
            });
        } catch(err) {
            console.log(err);
        }
    };
}