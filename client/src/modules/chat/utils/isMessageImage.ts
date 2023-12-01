const isMessageImage = (message: string) => {
  let row = '';
  for (let i = 0; i < 11; i++) {
    if (message[i] === undefined || null) return false;
    row += message[i];
  }

  if (row === 'data:image/') return true;
  return false;
};

export default isMessageImage;
