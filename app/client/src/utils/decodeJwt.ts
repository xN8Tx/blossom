const decodeJWT = (token: string) => {
  try {
    if (!token.includes('.')) throw new Error();
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    alert(
      'Something went wrong! Could not decode the token! Please try again.'
    );
    return false;
  }
};

export default decodeJWT;
