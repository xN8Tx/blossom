import { $fileHttp } from '@/api/httpApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAvatar = async (data: any): Promise<string | null> => {
  const avatarId = data.avatar;

  if (!avatarId) return null;

  const avatarRes = await $fileHttp.get(avatarId.toString(), {
    responseType: 'blob',
  });

  if (avatarRes.status !== 200) return null;

  const avatarBlob = await avatarRes.data;

  const avatarUrl = URL.createObjectURL(avatarBlob);
  return avatarUrl;
};

export default getAvatar;
