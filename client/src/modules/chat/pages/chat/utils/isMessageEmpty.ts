const isMessageEmpty = (message: string) => {
  let isEmpty: boolean = true;

  [...message].forEach((char) => {
    if (char !== ' ') {
      isEmpty = false;
    }
  });

  return isEmpty;
};

export default isMessageEmpty;
