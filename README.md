<h1 align="center">Blossom</h1>
<p align="center">🌸 Fullstack messenger app based on TypeScript & React & Express & PostgreSQL</p>


## 📖 Content
- [About](#-about)
- [Appearance](#-appearance)
- [Client](#-client)
- [Servers](#-servers)
- [Databases](#-databases)

## 🤔 About

This messenger is my graduation project. Designed to learn how WebSocket works, improve my skills in web application design and working with typescript. The messenger consists of two databases, four servers and an SPA client.

## 🌸 Appearance


<details>
<summary>Dark theme</summary>
<img src="https://github.com/xN8Tx/blossom-messenger/blob/main/screenshots/dark-theme.png"/>
</details>

<details>
<summary>Light theme</summary>
<img src="https://github.com/xN8Tx/blossom-messenger/blob/main/screenshots/light-theme.png"/>
</details>

---

## 💻 Client
Client is typical SPA application based on Vite & React & TypeScript.

### 💫 Features
- JWT auth
- Unit and screenshot tests
- Multilanguage
- Two colorscheme
- WebSocket data fetching
- Three layers of design
  - Client
  - State
  - WebSocket 

### 🕸️ Pages
- Auth - available only for unauthorized user. Use to get sign in or registration. Based on HTTP. 
- Settings - available only for authorized user. Use to customize settings like: appearance, language and your profile. Based on HTTP.
- Contacts - available only for authorized user. Use to add friends(contacts) to fast access for them and check their information. Based on HTTP.
- Chats - available only for authorized user. Use for chating. Based on HTTP and WebSocket

### 🦾 Packages
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Blossom React UI](https://github.com/xN8Tx/blossom-react-ui)
- [Axios](https://axios-http.com/)
- [i18n](https://www.i18next.com/)

**Another packages you can see [here](https://github.com/xN8Tx/blossom-messenger/blob/main/app/client/package.json)**


## 🔧 Servers
Server side contains four servers based on NodeJS & ExpressJS & TypeScript.

### Contains:
- [HTTP server](https://github.com/xN8Tx/blossom-messenger/tree/main/app/http-server) - created to work with auth, to access for first information, work with contacts and settings.
- [WS server](https://github.com/xN8Tx/blossom-messenger/tree/main/app/ws-server) – created to work with chating, CRUD operation with messages and CD operation with chats
- [File server](https://github.com/xN8Tx/blossom-messenger/tree/main/app/file-server) – created to save and aprocessing files.
- [Database server](https://github.com/xN8Tx/blossom-messenger/tree/main/app/database-server) - created to get access to all databases.

### 🦾 Packages
- [ExpressJS](https://expressjs.com/)
- [tsc-alias](https://www.npmjs.com/package/tsc-alias)
- [tsx](https://www.npmjs.com/package/tsx)

**Another packages you can see in each server ```package.json``` file**

## 💾 Databases
For this project i use two databases:
- [PostgreSQL](https://www.postgresql.org/) - for saving all information
- [Redis](https://redis.io/) - for saving auth codes

---

## 🗒️ TODO
- [ ] Add dynamic imports for client
- [ ] Rewritte file system
- [ ] Add postman tests
- [ ] Add e2e tests for client
- [ ] Check client screenshot tests
- [ ] Add husky
