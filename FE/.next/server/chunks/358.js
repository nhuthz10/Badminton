exports.id=358,exports.ids=[358],exports.modules={58359:()=>{},93739:()=>{},29566:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,12994,23)),Promise.resolve().then(a.t.bind(a,96114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,79671,23)),Promise.resolve().then(a.t.bind(a,41868,23)),Promise.resolve().then(a.t.bind(a,84759,23))},36790:(e,t,a)=>{Promise.resolve().then(a.bind(a,73350)),Promise.resolve().then(a.bind(a,31573))},31573:(e,t,a)=>{"use strict";a.d(t,{default:()=>P});var r=a(10326),o=a(66455),s=a(33265),l=a(68018),c=a(25151);a(45996);var d=a(25215),i=a(83548),n=a(18201),p=a(68887),u=a(36926);let h={getItem:e=>"true"===localStorage.getItem("isSaveLogin")?localStorage.getItem(e):sessionStorage.getItem(e),setItem:(e,t)=>{"true"===localStorage.getItem("isSaveLogin")?localStorage.setItem(e,t):sessionStorage.setItem(e,t)}},g=({children:e})=>{let t=(0,o.I0)(),a=!1,s=[],l=e=>{s.push(e)},d=e=>{s.forEach(t=>t(e)),s=[]},g=async()=>{if(a)return new Promise(e=>{l(t=>{e(t)})});a=!0;try{let e=h.getItem("refresh_token"),t=await (0,p.a5)(e);return h.setItem("access_token",t.access_token),a=!1,d(t.access_token),t.access_token}catch(e){throw a=!1,console.error("Failed to refresh token",e),t((0,u.ni)()),c.Am.error("Phi\xean đăng nhập đ\xe3 hết hạn",{className:"toast-normal"}),e}};return i.v4.interceptors.request.use(async e=>{let a=h.getItem("access_token"),r=h.getItem("refresh_token");if(!a||!r)return t((0,u.ni)()),c.Am.error("Phi\xean đăng nhập đ\xe3 hết hạn",{className:"toast-normal"}),Promise.reject("No tokens available");let o=new Date,s=(0,n.o)(a),l=(0,n.o)(r);if(!(s?.exp<o.getTime()/1e3))return e.headers.Authorization=`Bearer ${a}`,e;if(!(l?.exp>o.getTime()/1e3))return t((0,u.ni)()),c.Am.error("Phi\xean đăng nhập đ\xe3 hết hạn",{className:"toast-normal"}),Promise.reject("Refresh token expired");try{let t=await g();return e.headers.Authorization=`Bearer ${t}`,e}catch(e){return Promise.reject(e)}},e=>Promise.reject(e)),r.jsx(r.Fragment,{children:e})},m=(0,s.default)(async()=>{},{loadableGenerated:{modules:["Providers.js -> redux-persist/integration/react"]},ssr:!1}),P=({children:e})=>(0,r.jsxs)(o.zt,{store:l.ZP,children:[r.jsx(m,{loading:null,persistor:l.Dj,children:r.jsx(d.Z,{children:r.jsx(g,{children:e})})}),r.jsx(c.Ix,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"dark"})]})},25215:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i,s:()=>d});var r=a(10326),o=a(80057),s=a(17577),l=a(25151);let c=(0,s.createContext)(null),d=()=>(0,s.useContext)(c),i=({children:e})=>{let[t,a]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let e=(0,o.io)("http://localhost:8080");return a(e),()=>{e.disconnect()}},[]),(0,s.useEffect)(()=>{if(t)return t.on("notify-order-succeed",e=>{(0,l.Am)(`${e?.UserData?.email} vừa mới đặt h\xe0ng th\xe0nh c\xf4ng`,{position:"bottom-left",className:"toast-big",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"dark"})}),()=>{t.off("notify-order-succeed")}},[t]),r.jsx(c.Provider,{value:t,children:e})}},83548:(e,t,a)=>{"use strict";a.d(t,{ZP:()=>c,gf:()=>l,v4:()=>s});var r=a(44099);let o=r.Z.create({baseURL:"http://localhost:8080"});o.interceptors.response.use(e=>e.data);let s=r.Z.create({baseURL:"http://localhost:8080"});s.interceptors.response.use(e=>e.data);let l=r.Z.create({baseURL:"http://localhost:3010"});l.interceptors.response.use(e=>e.data);let c=o},73350:(e,t,a)=>{"use strict";a.d(t,{default:()=>l});var r=a(10326),o=a(17577),s=a(96931);a(47774);let l=()=>((0,o.useEffect)(()=>{window.ZaloChatWidget&&window.ZaloChatWidget()},[]),(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"zalo-chat-widget","data-oaid":"2253048925575254414","data-welcome-message":"Rất vui khi được hỗ trợ bạn!","data-autopopup":"30","data-width":"","data-height":""}),r.jsx(s.default,{strategy:"lazyOnload",src:"https://sp.zalo.me/plugins/sdk.js"})]}))},39774:(e,t,a)=>{"use strict";a.d(t,{ZP:()=>n});var r=a(87313),o=a(35410),s=a(25151),l=a(36926);(0,r.hg)("cart/fetchAllProductCart",async(e,t)=>{try{let a=await (0,o.C)(e?.limit,e?.page);a&&0===a.errCode?t.dispatch(d(a)):t.dispatch(i())}catch(e){t.dispatch(i()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}});let c=(0,r.oM)({name:"blog",initialState:{allBlog:[]},reducers:{fetchAllBlogSuccess:(e,t)=>{e.allBlog=t.payload},fetchAllBlogFailed:(e,t)=>{e.allBlog=[]}}}),{fetchAllBlogSuccess:d,fetchAllBlogFailed:i}=c.actions,n=c.reducer},97576:(e,t,a)=>{"use strict";a.d(t,{RL:()=>p,ZP:()=>u,u0:()=>c});var r=a(87313),o=a(94709),s=a(25151),l=a(36926);let c=(0,r.hg)("cart/fetchAllProductCart",async(e,t)=>{try{let a=await (0,o.p2)(e.userId);a&&0===a.errCode?t.dispatch(i(a?.data)):t.dispatch(n())}catch(e){t.dispatch(n()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}}),d=(0,r.oM)({name:"cart",initialState:{allProduct:[],totalProduct:null},reducers:{fetchAllProductCartSuccess:(e,t)=>{e.allProduct=t.payload.products,e.totalProduct=t.payload.totalProduct},fetchAllProductCartFailed:(e,t)=>{e.allProduct=[],e.totalProduct=null},updateAllProduct:(e,t)=>{e.allProduct=t.payload}}}),{fetchAllProductCartSuccess:i,fetchAllProductCartFailed:n,updateAllProduct:p}=d.actions,u=d.reducer},82515:(e,t,a)=>{"use strict";a.d(t,{ZP:()=>n});var r=a(87313),o=a(52690),s=a(25151),l=a(36926);(0,r.hg)("admin/fetchAllOrderRedux",async(e,t)=>{try{let a=await (0,o.Vb)(e?.userId,e?.status,e?.limit,e?.page);a&&0===a.errCode?t.dispatch(d(a)):t.dispatch(i())}catch(e){t.dispatch(i()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}});let c=(0,r.oM)({name:"search",initialState:{allOrder:[]},reducers:{fetchAllOrderSuccess:(e,t)=>{e.allOrder=t.payload},fetchAllOrderFailed:(e,t)=>{e.allOrder=[]}}}),{fetchAllOrderSuccess:d,fetchAllOrderFailed:i}=c.actions,n=c.reducer},21940:(e,t,a)=>{"use strict";a.d(t,{A6:()=>o,ZP:()=>s});let r=(0,a(87313).oM)({name:"pagination",initialState:{page:1},reducers:{handleChangePage:(e,t)=>{e.page=t.payload}}}),{handleChangePage:o}=r.actions,s=r.reducer},77110:(e,t,a)=>{"use strict";a.d(t,{OU:()=>h,ZP:()=>$,th:()=>c,uu:()=>g,xt:()=>m});var r=a(87313),o=a(76924),s=a(25151),l=a(36926);(0,r.hg)("admin/fetchAllBrandRedux",async(e,t)=>{try{let a=await (0,o.HA)(e?.limit,e?.page,e?.name);a&&0===a.errCode?t.dispatch(i(a)):t.dispatch(n())}catch(e){t.dispatch(n()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}}),(0,r.hg)("admin/fetchAllBrandRedux",async(e,t)=>{try{e?.filter&&(e.filter=JSON.stringify(e?.filter));let a=await (0,o.Ct)(e?.productTypeId,e?.limit,e?.page,e?.sort,e?.filter);a&&0===a.errCode?t.dispatch(p(a)):t.dispatch(u())}catch(e){t.dispatch(n()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}}),(0,r.hg)("admin/fetchAllBrandRedux",async(e,t)=>{try{let a=await (0,o.dj)(e?.limit,e?.page,e?.name,e?.pagination);a&&0===a.errCode?t.dispatch(I(a)):t.dispatch(A())}catch(e){t.dispatch(A()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn"),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message)}}),(0,r.hg)("admin/fetchAllProductTypeRedux",async(e,t)=>{try{let a=await (0,o.Pq)(e?.limit,e?.page,e?.name,e?.pagination);a&&0===a.errCode?t.dispatch(b(a)):t.dispatch(C())}catch(e){t.dispatch(C()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn"),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message)}}),(0,r.hg)("admin/fetchAllProductSaleOffRedux",async(e,t)=>{try{let a=await (0,o.Ro)(e?.limit,e?.page);a&&0===a.errCode?t.dispatch(P(a)):t.dispatch(f())}catch(e){t.dispatch(f()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}});let c=(0,r.hg)("admin/fetchAllProductFavouriteRedux",async(e,t)=>{try{let a=await (0,o.kf)(e?.limit,e?.page,e?.userId);a&&0===a.errCode?t.dispatch(v(a)):t.dispatch(y())}catch(e){t.dispatch(y()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}}),d=(0,r.oM)({name:"product",initialState:{isLoading:!1,allProducts:[],allBrand:[],allProductType:[],allProductSaleOff:[],allProductFavourite:[],allProductOfTheProductType:[],filter:{},sort:[]},reducers:{loadingProduct:(e,t)=>{e.isLoading=t.payload},fetchAllProductSuccess:(e,t)=>{e.allProducts=t.payload},fetchAllProductFailed:(e,t)=>{e.allProducts=[]},fetchAllProductOfTheProductTypeSuccess:(e,t)=>{e.allProductOfTheProductType=t.payload},fetchAllProductOfTheProductTypeFailed:(e,t)=>{e.allProductOfTheProductType=[]},handleSortProduct:(e,t)=>{e.sort=t.payload},handleFilterProduct:(e,t)=>{e.filter=t.payload},fetchAllProductSaleOffSuccess:(e,t)=>{e.allProductSaleOff=t.payload},fetchAllProductSaleOffFailed:(e,t)=>{e.allProductSaleOff=[]},fetchAllProductFavouriteSuccess:(e,t)=>{e.allProductFavourite=t.payload},fetchAllProductFavouriteFailed:(e,t)=>{e.allProductFavourite=[]},fetchAllBrandSuccess:(e,t)=>{e.allBrand=t.payload},fetchAllBrandFailed:(e,t)=>{e.allBrand=[]},fetchAllProductTypeSuccess:(e,t)=>{e.allProductType=t.payload},fetchAllProductTypeFailed:(e,t)=>{e.allProductType=[]}}}),{fetchAllProductSuccess:i,fetchAllProductFailed:n,fetchAllProductOfTheProductTypeSuccess:p,fetchAllProductOfTheProductTypeFailed:u,loadingProduct:h,handleSortProduct:g,handleFilterProduct:m,fetchAllProductSaleOffSuccess:P,fetchAllProductSaleOffFailed:f,fetchAllProductFavouriteSuccess:v,fetchAllProductFavouriteFailed:y,fetchAllBrandSuccess:I,fetchAllBrandFailed:A,fetchAllProductTypeSuccess:b,fetchAllProductTypeFailed:C}=d.actions,$=d.reducer},98536:(e,t,a)=>{"use strict";a.d(t,{Ib:()=>n,ZP:()=>p});var r=a(87313),o=a(76924),s=a(25151),l=a(36926);(0,r.hg)("admin/fetchAllProductSearchRedux",async(e,t)=>{try{let a=await (0,o.HA)(e?.limit,e?.page,e?.name);a&&0===a.errCode?t.dispatch(d(a)):t.dispatch(i())}catch(e){t.dispatch(i()),console.log(e),e?.response?.data?.errCode===-4?(s.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),t.dispatch((0,l.ni)())):s.Am.error(e?.response?.data?.message,{className:"toast-normal"})}});let c=(0,r.oM)({name:"search",initialState:{allResultSearch:[],searchText:""},reducers:{fetchAllProductSearchSuccess:(e,t)=>{e.allResultSearch=t.payload},fetchAllProductSearchFailed:(e,t)=>{e.allResultSearch=[]},handleChangSearchText:(e,t)=>{e.searchText=t.payload}}}),{fetchAllProductSearchSuccess:d,fetchAllProductSearchFailed:i,handleChangSearchText:n}=c.actions,p=c.reducer},68018:(e,t,a)=>{"use strict";a.d(t,{Dj:()=>v,ZP:()=>y,mh:()=>m});var r=a(87313),o=a(41762),s=a(48589),l=a(77398),c=a(36926),d=a(21940),i=a(77110),n=a(98536),p=a(82515),u=a(97576),h=a(39774);let g={getItem:e=>Promise.resolve(null),setItem:(e,t)=>Promise.resolve(t),removeItem:e=>Promise.resolve()},m=e=>{g=e?(0,l.Z)("session"):(0,l.Z)("local")},P={storage:{getItem:e=>g.getItem(e),setItem:(e,t)=>g.setItem(e,t),removeItem:e=>g.removeItem(e)},stateReconciler:s.Z,key:"user",whitelist:["login","userInfo","favourites","cartId"]},f=(0,r.xC)({reducer:{user:(0,o.OJ)(P,c.ZP),order:p.ZP,cart:u.ZP,pagination:d.ZP,product:i.ZP,search:n.ZP,blog:h.ZP},middleware:e=>e({serializableCheck:{ignoredActions:[o._P,o.I2,o.E7,o.ex,o.e,o.Nz]}})}),v=(0,o.p5)(f),y=f},36926:(e,t,a)=>{"use strict";a.d(t,{Ib:()=>s,So:()=>d,ZP:()=>i,dG:()=>c,n1:()=>l,ni:()=>o});let r=(0,a(87313).oM)({name:"user",initialState:{login:!1,userInfo:[],favourites:[],cartId:null},reducers:{logIn:(e,t)=>{e.login=!0,e.userInfo=t.payload},logOut:e=>{e.login=!1,e.userInfo=[],e.favourites=[],e.cartId=null,localStorage.removeItem("isSaveLogin"),localStorage.removeItem("refresh_token"),localStorage.removeItem("access_token"),sessionStorage.removeItem("refresh_token"),sessionStorage.removeItem("access_token")},updateAvatar:(e,t)=>{e.userInfo.avatar=t.payload},updateFavourites:(e,t)=>{e.favourites=t.payload},updateCartId:(e,t)=>{e.cartId=t.payload}}}),{logOut:o,logIn:s,updateAvatar:l,updateFavourites:c,updateCartId:d}=r.actions,i=r.reducer},35410:(e,t,a)=>{"use strict";a.d(t,{C:()=>o,w:()=>s});var r=a(83548);let o=(e,t)=>r.ZP.get(`/api/blog/get-all-user-blog?limit=${e}&page=${t}`),s=e=>r.ZP.get(`/api/blog/get-blog?blogId=${e}`)},94709:(e,t,a)=>{"use strict";a.d(t,{Oc:()=>s,ZW:()=>d,bP:()=>o,p2:()=>l,uA:()=>c});var r=a(83548);let o=e=>r.v4.post("/api/cart/create-cart",e),s=e=>r.v4.post("/api/cart/add-product-to-cart",e),l=e=>r.v4.get(`/api/cart/get-all-product-cart?userId=${e}`),c=e=>r.v4.put("/api/cart/update-product-cart",e),d=(e,t,a)=>r.v4.delete(`/api/cart/delete-product-cart?productId=${e}&sizeId=${t}&userId=${a}`)},52690:(e,t,a)=>{"use strict";a.d(t,{Du:()=>d,JY:()=>l,Q2:()=>c,Vb:()=>s,im:()=>o});var r=a(83548);let o=e=>r.v4.post("/api/order/create-order",e),s=(e,t,a,o)=>r.v4.get(`/api/order/get-all-order?userId=${e}&status=${t}&limit=${a}&page=${o}`),l=(e,t)=>r.v4.get(`/api/order/get-order-detail?orderId=${e}&userId=${t}`),c=e=>r.v4.put("/api/order/cancle-order",e),d=e=>r.v4.post("/api/order/create_payment_url",e)},76924:(e,t,a)=>{"use strict";a.d(t,{Ct:()=>d,G7:()=>h,HA:()=>l,LO:()=>p,Ln:()=>c,Pq:()=>s,RZ:()=>g,Ro:()=>m,Uv:()=>u,Yc:()=>i,dj:()=>f,ev:()=>v,jm:()=>o,kf:()=>P,wy:()=>n});var r=a(83548);let o=e=>r.ZP.get(`/api/product-type/get-product-type?productTypeId=${e}`),s=(e,t,a,o)=>r.ZP.get(`/api/product-type/get-all-product-type?limit=${e}&page=${t}&name=${a}&pagination=${o}`),l=(e,t,a)=>r.ZP.get(`/api/product/get-all-product?limit=${e}&page=${t}&name=${encodeURIComponent(a)}`),c=e=>r.ZP.get(`/api/product/get-product?productId=${e}`),d=(e,t,a,o,s)=>r.ZP.get(`/api/product/get-all-product-of-the-product-type?productTypeId=${e}&limit=${t}&page=${a}&sort=${o}&filter=${s}`),i=()=>r.ZP.get("/api/voucher/get-all-voucher-user"),n=e=>r.v4.get(`/api/product/get-product-feedback?userId=${e}`),p=e=>r.v4.post("/api/feedback/create-feedback",e),u=e=>r.ZP.get(`/api/feedback/get-all-feedback?productId=${e}`),h=e=>r.v4.put("/api/feedback/update-feedback",e),g=(e,t)=>r.v4.delete(`/api/feedback/delete-feedback?feedbackId=${e}&userId=${t}`),m=(e,t)=>r.ZP.get(`/api/product/get-product-sale-off?limit=${e}&page=${t}`),P=(e,t,a)=>r.v4.get(`/api/product/get-product-favourite?userId=${a}&limit=${e}&page=${t}`),f=(e,t,a,o)=>r.ZP.get(`/api/brand/get-all-brand?limit=${e}&page=${t}&name=${a}&pagination=${o}`),v=e=>r.gf.get(`/api/product/recommendation?productId=${e}`)},68887:(e,t,a)=>{"use strict";a.d(t,{Ak:()=>p,C6:()=>c,F$:()=>o,Md:()=>s,Rm:()=>i,UW:()=>g,VP:()=>u,a5:()=>m,gY:()=>d,n8:()=>h,p_:()=>l,yX:()=>n});var r=a(83548);let o=(e,t)=>r.ZP.post("/api/user/login-user",{email:e,password:t}),s=async e=>await r.v4.get(`/api/user/get-user-infor?userId=${e}`),l=e=>r.ZP.post("/api/user/register",e),c=e=>r.ZP.post("/api/user/send-otp-code",{email:e}),d=e=>r.ZP.put("/api/user/change-password",e),i=e=>r.v4.get(`/api/user/get-user?id=${e}`),n=e=>r.v4.put("/api/user/update-user",e),p=e=>r.v4.put("/api/user/change-password-profile",e),u=e=>r.v4.post("/api/favourite/create-favourite",e),h=(e,t)=>r.v4.delete(`/api/favourite/delete-favourite?userId=${e}&productId=${t}`),g=e=>r.v4.get(`/api/favourite/get-all-favourite?userId=${e}`),m=async e=>await r.ZP.post("/api/user/refresh-token",{},{headers:{Authorization:`Bearer ${e}`}})},21574:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>f,generateMetadata:()=>P});var r=a(19510),o=a(1723),s=a.n(o),l=a(68570);let c=(0,l.createProxy)(String.raw`D:\Web\FE_Badminton\src\Providers.js`),{__esModule:d,$$typeof:i}=c;c.default;let n=(0,l.createProxy)(String.raw`D:\Web\FE_Badminton\src\Providers.js#default`);var p=a(71615);let u=(0,l.createProxy)(String.raw`D:\Web\FE_Badminton\src\components\ZaloChat\ZaloChat.js`),{__esModule:h,$$typeof:g}=u;u.default;let m=(0,l.createProxy)(String.raw`D:\Web\FE_Badminton\src\components\ZaloChat\ZaloChat.js#default`);async function P(){let e=(0,p.headers)(),t=e.get("x-url")||"",a=e.get("host")||"";return{title:"Trang Chủ - Cửa H\xe0ng Đồ Cầu L\xf4ng Ch\xednh H\xe3ng",description:"Ch\xe0o mừng đến với cửa h\xe0ng đồ cầu l\xf4ng ch\xednh h\xe3ng. Ch\xfang t\xf4i cung cấp vợt cầu l\xf4ng, gi\xe0y cầu l\xf4ng, quần \xe1o v\xe0 phụ kiện chất lượng cao với gi\xe1 tốt nhất.",alternates:{canonical:"./"},metadataBase:process.env.FRONTEND_URL,metadataBase:"https://e-commerce-xi-sepia.vercel.app",openGraph:{title:"Trang Chủ - Cửa H\xe0ng Đồ Cầu L\xf4ng Ch\xednh H\xe3ng",description:"The React Framework for the Web",url:t,siteName:a,images:[{url:"https://res.cloudinary.com/daphxc3ye/image/upload/v1719301372/Badminton/home_page_vpq2yc.png"}]}}}function f({children:e}){return r.jsx("html",{lang:"en",children:(0,r.jsxs)("body",{className:s().className,children:[r.jsx(n,{children:e}),r.jsx(m,{})]})})}a(90278)},90278:()=>{},47774:()=>{}};