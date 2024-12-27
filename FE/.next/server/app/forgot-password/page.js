(()=>{var e={};e.id=781,e.ids=[781],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},32081:e=>{"use strict";e.exports=require("child_process")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},24692:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>d,pages:()=>p,routeModule:()=>m,tree:()=>c}),r(89116),r(21574),r(35866);var s=r(23191),a=r(88716),o=r(37922),i=r.n(o),n=r(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let c=["",{children:["forgot-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,89116)),"D:\\Web\\FE_Badminton\\src\\app\\forgot-password\\page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,21574)),"D:\\Web\\FE_Badminton\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["D:\\Web\\FE_Badminton\\src\\app\\forgot-password\\page.js"],d="/forgot-password/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/forgot-password/page",pathname:"/forgot-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},39406:(e,t,r)=>{Promise.resolve().then(r.bind(r,61472))},61472:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var s=r(10326),a=r(29497),o=r(64105),i=r(74723),n=r(17577),l=r(25151),c=r(68887),p=r(35047),d=r(86475);r(49965);var u=r(36926);let m=()=>{let[e,t]=(0,n.useState)(!1),r=(0,p.useRouter)(),{register:m,handleSubmit:x,formState:{errors:g}}=(0,i.cI)(),h=async e=>{t(!0);try{let t=await (0,c.C6)(e.email);t&&0===t.errCode&&(l.Am.success("M\xe3 OPT đ\xe3 được gửi th\xe0nh c\xf4ng",{className:"toast-normal"}),r.push(`/change-password/${e.email}`))}catch(e){e?.response?.data?.errCode===2?l.Am.error("Email của bạn kh\xf4ng tồn tại",{className:"toast-normal"}):e?.response?.data?.errCode===-4?(l.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),dispatch((0,u.ni)())):l.Am.error(e?.response?.data?.message,{className:"toast-normal"})}finally{t(!1)}};return s.jsx(d.Z,{loading:e,children:(0,s.jsxs)("div",{className:"forgot-password-container",children:[s.jsx("h1",{className:"forgot-password-title",children:"Qu\xean mật khẩu"}),(0,s.jsxs)("div",{className:"forgot-password-content",children:[(0,s.jsxs)("div",{style:{height:"9rem"},children:[(0,s.jsxs)("div",{className:"forgot-password-email",children:[s.jsx(a.G,{className:"forgot-password-email-icon",icon:o.FU$}),s.jsx("input",{className:"forgot-password-email-input",placeholder:"Email",...m("email",{required:"Nhập email của bạn",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Email kh\xf4ng hợp lệ"}})})]}),g.email&&s.jsx("p",{className:"errer",children:g.email.message})]}),s.jsx("button",{className:"forgot-password-send",onClick:x(h),children:"Send OTP"})]})]})})}},86475:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var s=r(10326),a=r(19474),o=r.n(a),i=r(17577);let n=({children:e,loading:t,style:r})=>((0,i.useEffect)(()=>{t&&window.scrollTo({top:0,behavior:"smooth"})},[t]),(0,s.jsxs)("div",{className:"loading-container",style:{position:"relative",...r},children:[t&&s.jsx("div",{className:"loading-overlay",style:{position:"fixed",top:0,right:0,left:0,bottom:0,zIndex:"9999",background:"rgba(255, 255, 255, 0.4)"},children:s.jsx(o(),{color:"#FF8080",size:"100px",speedMultiplier:1.5,loading:!0,cssOverride:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:"99999"}})}),e]}))},89116:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>o,default:()=>n});var s=r(68570);let a=(0,s.createProxy)(String.raw`D:\Web\FE_Badminton\src\app\forgot-password\page.js`),{__esModule:o,$$typeof:i}=a;a.default;let n=(0,s.createProxy)(String.raw`D:\Web\FE_Badminton\src\app\forgot-password\page.js#default`)},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(66621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},49965:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,966,568,497,723,105,358],()=>r(24692));module.exports=s})();