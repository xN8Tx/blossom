function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz|()[]{}_1234567890';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const createFileId = () => {
  const timestamp = Date.now();
  const randomNumbers = Math.floor(Math.random() * 60);
  const randomString = generateRandomString(randomNumbers);

  const name = `${timestamp}` + `${randomString}`;

  return name;
};

export default createFileId;
