import{j as e}from"./jsx-runtime-2ef3df91.js";import{P as A,m as E,u as R,c as z}from"./store.mock-5096766e.js";import{L as P,B as $}from"./index-66b97638.js";import{i as L,r as B,s as H,f as D,m as h}from"./SendedIcon-ce9bd0d0.js";import{A as G,i as _}from"./image.mock-efad184a.js";import{H as J}from"./Heading-3a7e6c5f.js";import{P as M}from"./Paragraph-8307fc79.js";import{u as K}from"./index-a5f9f58e.js";import{u as Q}from"./useTranslation-44b592a3.js";import"./index-e03f90b5.js";import"./_commonjsHelpers-725317a4.js";import"./index-ac92abf8.js";import"./toPropertyKey-9eaa4611.js";import"./index-a0e00e07.js";import"./i18nInstance-1f8a4d28.js";const W="_text_yy5jf_1",X="_icon_yy5jf_7",v={text:W,icon:X};function j({messages:a,notification:r}){const{t:i}=Q(),t=K(l=>l.user.data.id);if(a.length===0)return e.jsx(e.Fragment,{});const s=a[a.length-1],c=L(s.message);let m=s.message;!c&&s.message.length>27&&(m=s.message.slice(0,25)+"...");const n=Number(t)===Number(s.userId),d=!n&&Number(r)>0,o=n&&s.status===!0,x=n&&s.status===!1;return e.jsxs("div",{className:v.text,children:[e.jsx(M,{size:"m",color:"message",children:c?e.jsx("b",{children:i("chat.image")}):m}),d&&e.jsx("div",{className:v.icon,children:e.jsx(M,{size:"s",color:"user",children:r})}),o&&e.jsx("img",{src:B,alt:""}),x&&e.jsx("img",{src:H,alt:""})]})}try{j.displayName="Text",j.__docgenInfo={description:"",displayName:"Text",props:{messages:{defaultValue:null,description:"",name:"messages",required:!0,type:{name:"Messages[]"}},notification:{defaultValue:null,description:"",name:"notification",required:!0,type:{name:"number"}}}}}catch{}const Y="_wrapper_ekiqo_1",Z="_body_ekiqo_8",ee="_title_ekiqo_15",y={wrapper:Y,body:Z,title:ee};function I({chatId:a,title:r,avatar:i,user:t,messages:s,notification:c}){const m=`/chat/${a}`,n=i!==null?i:t.avatar,d=r.length!==0?r:`${t.firstName} ${t.lastName}`,o=s.length>0,x=o&&s[s.length-1],l=o&&D(x.date);return e.jsxs(P,{to:m,className:y.wrapper,children:[e.jsx(G,{isLink:!1,avatar:n,firstName:d,size:"s",status:t.status}),e.jsxs("div",{className:y.body,children:[e.jsxs("div",{className:y.title,children:[e.jsx(J,{size:"s",children:d}),o&&e.jsx(M,{size:"s",color:"message",children:l})]}),e.jsx(j,{messages:s,notification:c})]})]})}try{I.displayName="ChatItem",I.__docgenInfo={description:"",displayName:"ChatItem",props:{chatId:{defaultValue:null,description:"",name:"chatId",required:!0,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},avatar:{defaultValue:null,description:"",name:"avatar",required:!0,type:{name:"string | null"}},notification:{defaultValue:null,description:"",name:"notification",required:!0,type:{name:"number"}},user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"User"}},messages:{defaultValue:null,description:"",name:"messages",required:!0,type:{name:"Messages[]"}}}}}catch{}const he={title:"Chat Components/Sidebar Chat Item",component:I,tags:["autodocs"],decorators:[a=>e.jsx(A,{store:E,children:e.jsx($,{children:e.jsx("div",{style:{width:"270px"},children:e.jsx(a,{})})})})],args:{}},u={args:{chatId:1,title:"",avatar:_,notification:10,user:R.data,messages:[h.messageFromUser]}},p={args:{chatId:1,title:"",avatar:_,notification:10,user:R.data,messages:[h.readEditMessageFromUser]}},g={args:{chatId:1,title:"",avatar:_,notification:0,user:z.data[2].user,messages:[h.readMessage]}},f={args:{chatId:1,title:"",avatar:_,notification:10,user:z.data[2].user,messages:[h.readMessage]}};var k,N,F;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: user.data,
    messages: [messagesMock.messageFromUser]
  }
}`,...(F=(N=u.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var b,C,U;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: user.data,
    messages: [messagesMock.readEditMessageFromUser]
  }
}`,...(U=(C=p.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};var q,O,w;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 0,
    user: chat.data![2].user,
    messages: [messagesMock.readMessage]
  }
}`,...(w=(O=g.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var S,T,V;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: chat.data![2].user,
    messages: [messagesMock.readMessage]
  }
}`,...(V=(T=f.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};const _e=["OnlineFromUser","OnlineFromUserRead","OnlineFromComp","OnlineFromCompNotification"];export{g as OnlineFromComp,f as OnlineFromCompNotification,u as OnlineFromUser,p as OnlineFromUserRead,_e as __namedExportsOrder,he as default};
//# sourceMappingURL=SidebarChatItem.stories-41b41d2e.js.map
