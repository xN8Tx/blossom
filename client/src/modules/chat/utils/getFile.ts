import { $fileHttp } from '@/api/httpApi';

type getFileType = (
  uniqId: string
) => Promise<[string, 'image' | 'video' | 'file']>;

const getFile: getFileType = async (uniqId) => {
  let fileType: 'image' | 'video' | 'file';
  const fileExtension = uniqId.split('.').pop();

  if (fileExtension === 'webp') {
    fileType = 'image';
  } else if (fileExtension === 'webm') {
    fileType = 'video';
  } else {
    fileType = 'file';
  }

  const fileRes = await $fileHttp.get(uniqId, {
    responseType: 'blob',
  });

  const fileBlob = await fileRes.data;
  const fileUrl = URL.createObjectURL(fileBlob);

  return [fileUrl, fileType];
};

export default getFile;
