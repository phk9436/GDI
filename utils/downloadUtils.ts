import { storageService } from 'api/firebase';
import { getBlob, ref } from 'firebase/storage';

export const downloadFile: (
  id: string | undefined,
  category: string,
  name: string | undefined,
) => Promise<void> = async (id, category, name) => {
  if (id === undefined || name === undefined) return;
  const fileRef = ref(storageService, `${category}/${id}`);
  const fileBlob = await getBlob(fileRef);
  const downloadUrl = window.URL.createObjectURL(fileBlob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = name;
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
