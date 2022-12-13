import { getDoc, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { dbService, storageService } from 'api/firebase';
import { deleteObject, ref } from 'firebase/storage';

export const deleteBoardData: (
  category: string,
  countCategory: string,
  id: string,
  fileId: string | undefined,
  thumbnailId: string | undefined,
) => Promise<void> = async (category, countCategory, id, fileId, thumbnailId) => {
  if (fileId) {
    const fileRef = ref(storageService, `${category}/${fileId}`);
    await deleteObject(fileRef);
  }
  if (thumbnailId) {
    const thumbnailRef = ref(storageService, `${category}/${thumbnailId}`);
    await deleteObject(thumbnailRef);
  }
  await deleteDoc(doc(dbService, category, id));
  await updateDoc(doc(dbService, 'meta', countCategory), {
    total: increment(-1),
  });
};
