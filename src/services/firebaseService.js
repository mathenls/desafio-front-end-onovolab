import { firestore } from '../utils/firebaseUtils'

export default class FirebaseService {
    static getAll = async (node) => {
        const ref = firestore.collection(node);
        const snapshot = await ref.get();
        let data = [];
        snapshot.forEach(doc => {
            data = [...data, doc.data()];
        });
        return data;
    }
    static pushData = async (node, objToSubmit) => {
        const nodeRef = firestore.collection(node);
        const objRef = await nodeRef.add(objToSubmit);
        return objRef.id;
    };

    static getUniqueDataBy = async (node, id) => {
        const ref = firestore.collection(node).doc(id);
        const doc = await ref.get();
        return doc.data();
    };

    static updateData = async (id, node, objToSubmit) => {
        const ref = firestore.collection(node).doc(id);
        try {
            await firestore.runTransaction(async t => {
                await t.get(ref);
                t.update(ref, objToSubmit);
            });
        } catch(err) {
            console.log(err);
        }
    };
}