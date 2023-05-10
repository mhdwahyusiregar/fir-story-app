// import axios from 'axios';
// import Config from '../config/config';
// import Utils from '../utils/utils';
// import ApiEndpoint from '../config/api-endpoint';
import { auth, db, storage } from '../utils/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const Stories = {
  async getAll() {
    const storiesRef = collection(db, 'stories');
    const storiesQuery = query(storiesRef, where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(storiesQuery);

    const stories = [];
    querySnapshot.forEach((item) => {
      stories.push({
        id: item.id,
        ...item.data(),
      });
    });
    return stories;
  },

  async getById(id) {
    const storiesRef = doc(db, 'storiess', id);
    const docSnapshot = await getDoc(storiesRef);
    return docSnapshot.data();
  },

  async store({ description, photo }) {
    const storiesRef = collection(db, 'stories');
    const data = { description, photo };

    return await addDoc(storiesRef, {
      ...data,
      userId: auth.currentUser.uid,
    });
  },

  async storeEvidence(file) {
    const storageRef = ref(storage, `stories/${auth.currentUser.uid}/${file.name}`);
    return await uploadBytes(storageRef, file);
  },
  async getEvidenceURL(fileFullPath) {
    const storageRef = ref(storage, fileFullPath);
    return await getDownloadURL(storageRef);
  },
  async destroyEvidence(fileFullPath) {
    const desertRef = ref(storage, fileFullPath);
    return await deleteObject(desertRef);
  },

  async update({ id, name, description, photoUrl, createdAt, lat, lon }) {
    const storiesRef = doc(db, 'stories', id);
    const data = { name, description, photoUrl, createdAt, lat, lon };

    if (!data.photoUrl) delete data.photoUrl;

    return await updateDoc(storiesRef, data);
  },

  // async guest({ description, photo }) {
  //   const data = { description, photo };

  //   return await axios.post(ApiEndpoint.GUEST_USER_STORIES, data, {
  //     headers: {
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLVdHR0paSTQtX09tSDVyTmQiLCJpYXQiOjE2ODM1NDAwOTl9.OtTjY5nxUdmixg86BpMfHlsyOdKJQw1f4DavyJotQZY',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // },

  async updateProfile(user, { displayName = null } = {}) {
    return await updateProfile(user, {
      displayName,
    });
  },
};

export default Stories;
