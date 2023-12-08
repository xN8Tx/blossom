import{j as e}from"./jsx-runtime-2ef3df91.js";import{M as o}from"./MainInput-a0c1e0a3.js";import{P as m}from"./PrimaryButton-528c50e1.js";import{P as y}from"./PasswordInput-be2feba1.js";import"./index-e03f90b5.js";import"./_commonjsHelpers-725317a4.js";import"./ButtonInput-667a5156.js";import"./useTranslation-44b592a3.js";import"./i18nInstance-1f8a4d28.js";const g="_form_v322c_1",w={form:g};function n({inputMode:s="text",children:l}){const x=h=>{h.preventDefault()};return e.jsx("form",{className:w.form,onClick:x,"inp-mode":s,children:l})}try{n.displayName="Form",n.__docgenInfo={description:"",displayName:"Form",props:{inputMode:{defaultValue:{value:"text"},description:"",name:"inputMode",required:!1,type:{name:"enum",value:[{value:'"text"'},{value:'"password"'}]}}}}}catch{}const F={title:"Auth Components/Form",component:n,tags:["autodocs"],args:{}},t={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(o,{value:"",onChange:()=>{},placeholder:"Input",type:"text"}),e.jsx(o,{value:"Some text",onChange:()=>{},placeholder:"Input 2",type:"text"}),e.jsx(m,{onClick:()=>{},children:"Button"})]})}},r={args:{inputMode:"password",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{value:"",onChange:()=>{},placeholder:"Input",type:"text"}),e.jsx(y,{password:"",setPassword:()=>{},setPasswordInputType:()=>{},passwordInputType:"password"}),e.jsx(m,{onClick:()=>{},children:"Button"})]})}};var a,p,u;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    children: <>
        <MainInput value='' onChange={() => {}} placeholder='Input' type='text' />
        <MainInput value='Some text' onChange={() => {}} placeholder='Input 2' type='text' />
        <PrimaryButton onClick={() => {}}>Button</PrimaryButton>
      </>
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,c,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    inputMode: 'password',
    children: <>
        <MainInput value='' onChange={() => {}} placeholder='Input' type='text' />
        <PasswordInput password='' setPassword={() => {}} setPasswordInputType={() => {}} passwordInputType='password' />
        <PrimaryButton onClick={() => {}}>Button</PrimaryButton>
      </>
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const k=["Classic","Password"];export{t as Classic,r as Password,k as __namedExportsOrder,F as default};
//# sourceMappingURL=Form.stories-9c0c687e.js.map
