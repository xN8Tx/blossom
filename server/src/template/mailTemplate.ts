export default function mailTemplate(code: number) {
  const wrapperStyle =
    'width: 100%; height: 500px;background-color: white; color:black; border-radius:20px; text-align:center;';
  const headingStyle =
    'font-family: Verdana,sans-serif; font-size: 32px; font-weight: bold; color: #131517';
  const paragraphStyle =
    'font-family: Verdana,sans-serif; font-size: 24px; font-weight: bold color: #131517';
  const codeStyle =
    'font-family: Verdana,sans-serif; font-size: 32px; font-weight: bold; color: #5051F9;';
  const linkStyle =
    'font-family: Verdana,sans-serif; font-size: 14px; color: black; font-weight: light; margin-top: 50px; color: #131517;';

  return `
    <div style='${wrapperStyle}'>
      <img src="https://sun9-80.userapi.com/impg/3N3MFJNGREj0TSJTQJxZoWX5JjQteywlUyJTlw/g_3Y1QumMRI.jpg?size=120x120&quality=95&sign=99ae95c19a3dc1e5df1ace07440700ac&type=album" />
      <h1 style='${headingStyle}'>Blossom Messenger</h1>
      <p style='${paragraphStyle}'>To activate your account use this code in app</p>
      <h2 style='${codeStyle}'>
        ${code}
      </h2>
      <a href=${process.env.ORIGIN_URL} style='${linkStyle}'>Messenger</a>
    </div>
  `;
}
