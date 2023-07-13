import { storageService } from 'api/firebase';
import { getBlob, ref } from 'firebase/storage';
import { toast } from 'react-toastify';

interface IDownloadFile {
  (
    id: string | undefined,
    category: string,
    name: string | undefined,
  ): Promise<void>;
}

export const downloadFile: IDownloadFile = async (id, category, name) => {
  if (id === undefined || name === undefined) return;
  try {
    const fileRef = ref(storageService, `${category}/${id}`);
    const fileBlob = await getBlob(fileRef);
    const downloadUrl = window.URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = name;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    toast.error('알 수 없는 에러가 발생했습니다.');
  }
};
