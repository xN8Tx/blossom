import{r as ne,s as oe,i as ie,f as ce,m as n}from"./SendedIcon-ce9bd0d0.js";import{j as r}from"./jsx-runtime-2ef3df91.js";import{r as m}from"./index-e03f90b5.js";import{P as O}from"./Paragraph-8307fc79.js";import{i as me}from"./index-a0e00e07.js";import{u as de}from"./useTranslation-44b592a3.js";import"./_commonjsHelpers-725317a4.js";import"./i18nInstance-1f8a4d28.js";const ue="_container_1ijhd_1",le="_wrapper_1ijhd_12",ge="_body_1ijhd_19",pe="_info_1ijhd_22",fe="_time_1ijhd_48",_e="_imageWrapper_1ijhd_86",je="_load_1ijhd_1",be="_image_1ijhd_86",i={container:ue,wrapper:le,body:ge,info:pe,time:fe,imageWrapper:_e,load:je,image:be};function D({message:e,isUser:s,status:a}){const o=a?ne:oe;return r.jsxs("div",{className:i.body,children:[r.jsx(O,{size:"x",color:"user",children:e}),s&&r.jsx("img",{src:o})]})}try{D.displayName="Body",D.__docgenInfo={description:"",displayName:"Body",props:{message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}},isUser:{defaultValue:null,description:"",name:"isUser",required:!0,type:{name:"boolean"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:'boolean | "loading"'}}}}}catch{}const ye=(e,s="0px")=>{const[a,o]=m.useState(!1);return m.useEffect(()=>{const t=new IntersectionObserver(([c])=>{o(c.isIntersecting)},{rootMargin:s});return e.current&&t.observe(e.current),()=>{e.current&&t.unobserve(e.current)}},[e,s]),a};function x({message:e}){const s=m.useRef(null),a=ye(s),[o,t]=m.useState(!1),{id:c}=me();return m.useEffect(()=>{if(!a)return()=>{};if(!s.current)return()=>{};if(s.current.src!==`http://192.168.0.27:5173/chat/${c}`)return()=>{};let d=!1,u;const l=()=>{d=!0};new Promise(te=>{document.addEventListener("mousemove",l),document.addEventListener("scroll",l),u=setInterval(()=>{if(d)return te(s.current.src=e)},300)}).then(()=>{document.removeEventListener("mousemove",l),document.removeEventListener("scroll",l),t(!0),clearInterval(u)})},[s,a]),r.jsx("div",{className:i.imageWrapper,"is-loaded":o.toString(),"is-image":!0,children:r.jsx("img",{src:"",className:i.image,ref:s})})}try{x.displayName="Image",x.__docgenInfo={description:"",displayName:"Image",props:{message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}}}}}catch{}function Ue(){const{t:e}=de();return r.jsx("div",{className:i.info,children:r.jsx(O,{size:"xs",color:"message",children:e("chat.edited")})})}function v({isDate:e,isEdit:s,isUser:a,status:o,message:t}){return ie(t)?r.jsx(x,{message:t}):r.jsxs("div",{className:i.wrapper,"is-date":e.toString(),children:[r.jsx(D,{message:t,isUser:a,status:o}),s&&r.jsx(Ue,{})]})}try{v.displayName="Wrapper",v.__docgenInfo={description:"",displayName:"Wrapper",props:{isDate:{defaultValue:null,description:"",name:"isDate",required:!0,type:{name:"boolean"}},isUser:{defaultValue:null,description:"",name:"isUser",required:!0,type:{name:"boolean"}},isEdit:{defaultValue:null,description:"",name:"isEdit",required:!0,type:{name:"boolean"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:'boolean | "loading"'}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}}}}}catch{}function E({date:e}){const s=ce(e);return r.jsx("div",{className:i.time,children:r.jsx(O,{size:"xs",color:"message",children:s})})}try{E.displayName="Time",E.__docgenInfo={description:"",displayName:"Time",props:{date:{defaultValue:null,description:"",name:"date",required:!0,type:{name:"string"}}}}}catch{}const Me=m.memo(({isDate:e,isUser:s,messageObj:a})=>{const{id:o,message:t,date:c,status:d,isEdit:u}=a;return r.jsxs("div",{className:i.container,"is-user":s.toString(),"data-id":o.toString(),"is-active":"false",children:[e&&r.jsx(E,{date:c}),r.jsx(v,{isDate:e,isEdit:u,isUser:s,status:d,message:t})]})}),Ce={title:"Chat Components/Message",component:Me,tags:["autodocs"],args:{}},g={args:{isDate:!1,isUser:!0,messageObj:n.message}},p={args:{isDate:!1,isUser:!0,messageObj:n.readMessage}},f={args:{isDate:!1,isUser:!0,messageObj:n.editMessage}},_={args:{isDate:!0,isUser:!0,messageObj:n.readEditMessage}},j={args:{isDate:!0,isUser:!0,messageObj:n.readEditMessage}},b={args:{isDate:!1,isUser:!1,messageObj:n.message}},y={args:{isDate:!1,isUser:!1,messageObj:n.readMessage}},U={args:{isDate:!1,isUser:!1,messageObj:n.editMessage}},M={args:{isDate:!0,isUser:!1,messageObj:n.readEditMessage}},h={args:{isDate:!0,isUser:!1,messageObj:n.readEditMessage}};var I,S,N;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.message
  }
}`,...(N=(S=g.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var C,k,q;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.readMessage
  }
}`,...(q=(k=p.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var V,F,L;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.editMessage
  }
}`,...(L=(F=f.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var W,w,R;_.parameters={..._.parameters,docs:{...(W=_.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    isDate: true,
    isUser: true,
    messageObj: messagesMock.readEditMessage
  }
}`,...(R=(w=_.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var T,P,z;j.parameters={...j.parameters,docs:{...(T=j.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    isDate: true,
    isUser: true,
    messageObj: messagesMock.readEditMessage
  }
}`,...(z=(P=j.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var B,$,H;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.message
  }
}`,...(H=($=b.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var A,G,J;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.readMessage
  }
}`,...(J=(G=y.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;U.parameters={...U.parameters,docs:{...(K=U.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.editMessage
  }
}`,...(X=(Q=U.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;M.parameters={...M.parameters,docs:{...(Y=M.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    isDate: true,
    isUser: false,
    messageObj: messagesMock.readEditMessage
  }
}`,...(ee=(Z=M.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var se,re,ae;h.parameters={...h.parameters,docs:{...(se=h.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    isDate: true,
    isUser: false,
    messageObj: messagesMock.readEditMessage
  }
}`,...(ae=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};const ke=["UserMessage","UserRead","UserEdit","UserFull","DateUserFull","CompMessage","CompRead","CompEdit","CompFull","DateCompFull"];export{U as CompEdit,M as CompFull,b as CompMessage,y as CompRead,h as DateCompFull,j as DateUserFull,f as UserEdit,_ as UserFull,g as UserMessage,p as UserRead,ke as __namedExportsOrder,Ce as default};
//# sourceMappingURL=Message.stories-85313227.js.map
