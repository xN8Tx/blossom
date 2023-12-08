import{j as t}from"./jsx-runtime-2ef3df91.js";import{r as u}from"./index-e03f90b5.js";import{P as x}from"./Paragraph-8307fc79.js";import{u as y}from"./useTranslation-44b592a3.js";import"./_commonjsHelpers-725317a4.js";import"./i18nInstance-1f8a4d28.js";const $=(r,a)=>{const e=new Date(r),g=new Date().toLocaleDateString(),l=e.toLocaleDateString();return g===l?`${a("date.today")}, ${a(`date.${e.getMonth()+1}Month`)} ${e.getDate()}`:`${a(`date.${e.getDay()}Day`)}, ${a(`date.${e.getMonth()+1}Month`)} ${e.getDate()}`},h="_wrapper_q3kx7_1",w="_span_q3kx7_12",n={wrapper:h,span:w},M=u.memo(({date:r})=>{const{t:a}=y(),e=$(r,a);return t.jsxs("div",{className:n.wrapper,children:[t.jsx("span",{className:n.span}),t.jsx(x,{size:"s",color:"message",children:e}),t.jsx("span",{className:n.span})]})}),N={title:"Chat Components/Message Date",component:M,tags:["autodocs"],args:{}},s={args:{date:new Date().toString()}},o={args:{date:"Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)"}};var c,p,d;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    date: new Date().toString()
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,i,D;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)'
  }
}`,...(D=(i=o.parameters)==null?void 0:i.docs)==null?void 0:D.source}}};const k=["Today","WedSixDec"];export{s as Today,o as WedSixDec,k as __namedExportsOrder,N as default};
//# sourceMappingURL=MessageDate.stories-11463dbe.js.map
