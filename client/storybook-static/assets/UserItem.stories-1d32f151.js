import{j as e}from"./jsx-runtime-2ef3df91.js";import{L as x,B as y}from"./index-66b97638.js";import{P as j}from"./Paragraph-8307fc79.js";import{A as v,i as p}from"./image.mock-efad184a.js";import{H as W}from"./Heading-3a7e6c5f.js";import"./index-e03f90b5.js";import"./_commonjsHelpers-725317a4.js";import"./index-a0e00e07.js";const k="_container_19az5_1",q="_wrapper_19az5_7",o={container:k,wrapper:q};function t({avatar:r,firstName:n,lastName:f,username:g,id:_,status:N}){const h=`/contacts/user/${_}`;return e.jsxs(x,{to:h,className:o.container,children:[e.jsx(v,{isLink:!1,avatar:r,firstName:n,size:"s",status:N}),e.jsxs("div",{className:o.wrapper,children:[e.jsxs(W,{size:"s",color:"user",children:[n," ",f]}),e.jsxs(j,{size:"s",color:"user",children:["@",g]})]})]})}try{t.displayName="UserItem",t.__docgenInfo={description:"",displayName:"UserItem",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}},firstName:{defaultValue:null,description:"",name:"firstName",required:!0,type:{name:"string"}},lastName:{defaultValue:null,description:"",name:"lastName",required:!0,type:{name:"string"}},username:{defaultValue:null,description:"",name:"username",required:!0,type:{name:"string"}},avatar:{defaultValue:null,description:"",name:"avatar",required:!0,type:{name:"string"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"boolean"}}}}}catch{}const M={title:"Contact Components/User Item",component:t,tags:["autodocs"],args:{},decorators:[r=>e.jsx(y,{children:e.jsx(r,{})})]},a={args:{avatar:p,firstName:"Hello",lastName:"World",username:"helloWorld",status:!0,id:1}},s={args:{avatar:p,firstName:"Hello",lastName:"World",username:"helloWorld",status:!1,id:1}};var l,i,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    avatar: imageMock,
    firstName: 'Hello',
    lastName: 'World',
    username: 'helloWorld',
    status: true,
    id: 1
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var u,c,d;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    avatar: imageMock,
    firstName: 'Hello',
    lastName: 'World',
    username: 'helloWorld',
    status: false,
    id: 1
  }
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const b=["Online","Offline"];export{s as Offline,a as Online,b as __namedExportsOrder,M as default};
//# sourceMappingURL=UserItem.stories-1d32f151.js.map
