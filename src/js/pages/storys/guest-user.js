import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../utils/firebase';

const GuestUser = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const uploadButton = document.querySelector('#uploadButton');
    uploadButton.addEventListener('click', () => this._uploadData());
  },

  async _uploadData() {
    const user = getAuth(auth).currentUser;
    const db = getFirestore();
    const storysCollection = collection(db, 'storys');

    try {
      const storyData = {
        // Tambahkan data yang ingin diunggah oleh guest user
        title: 'Guest User Story',
        content: 'This is a story uploaded by a guest user.',
        author: 'Guest User',
      };

      await addDoc(storysCollection, storyData);
      alert('Data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data. Please try again.');
    }
  },
};

export default GuestUser;
