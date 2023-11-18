import sharp from 'sharp';

class ImageAPI {
  async madeWebpFromBase64(data: string) {
    try {
      const base64Data = data;

      const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Image, 'base64');

      const sharpData = await sharp(buffer).toFormat('webp').toBuffer();
      const result = 'data:image/webp;base64,' + sharpData.toString('base64');
      return result;
    } catch (error) {
      console.log(
        '[ERROR] Error in imageAPI.madeWebpFromBase64. Error: ' + error,
      );
    }
  }
}

const imageAPI = new ImageAPI();

export default imageAPI;
