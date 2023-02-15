import { doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { dbService, storageService } from 'api/firebase';
import { deleteObject, ref } from 'firebase/storage';

export const deletePostData: (
  category: string,
  countCategory: string,
  id: string,
  fileId: string | undefined,
  thumbnailId: string | undefined,
) => Promise<boolean> = async (category, countCategory, id, fileId, thumbnailId) => {
  try {
    if (fileId) {
      const fileRef = ref(storageService, `${category}/${fileId}`);
      await deleteObject(fileRef);
    }
    if (thumbnailId) {
      const thumbnailRef = ref(storageService, `${category}/${thumbnailId}`);
      await deleteObject(thumbnailRef);
    }
    await deleteDoc(doc(dbService, category, id));
    await deleteDoc(doc(dbService, `${category}Content`, id));
    await updateDoc(doc(dbService, 'meta', countCategory), {
      total: increment(-1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteMovieData = async (id: string) => {
  try {
    await deleteDoc(doc(dbService, 'movie', id));
    await updateDoc(doc(dbService, 'meta', 'movieCount'), {
      total: increment(-1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const deletePressData = async (id: string) => {
  try {
    await deleteDoc(doc(dbService, 'press', id));
    await updateDoc(doc(dbService, 'meta', 'pressCount'), {
      total: increment(-1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteNoticeData = async (id: string, fileId: string | undefined) => {
  try {
    if (fileId) {
      const fileRef = ref(storageService, `notice/${fileId}`);
      await deleteObject(fileRef);
    }
    await deleteDoc(doc(dbService, 'notice', id));
    await deleteDoc(doc(dbService, 'noticeContent', id));
    await updateDoc(doc(dbService, 'meta', 'noticeCount'), {
      total: increment(-1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteBoardData = async (id: string) => {
  try {
    await deleteDoc(doc(dbService, 'board', id));
    await deleteDoc(doc(dbService, 'boardContent', id));
    await updateDoc(doc(dbService, 'meta', 'boardCount'), {
      total: increment(-1),
    });
    return true;
  } catch (err) {
    return false;
  }
};
