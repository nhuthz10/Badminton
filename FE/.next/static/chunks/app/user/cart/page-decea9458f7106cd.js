(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7865],{71785:function(e,n,t){Promise.resolve().then(t.bind(t,17856))},12784:function(e,n,t){"use strict";t.d(n,{s:function(){return u}});var r=t(47002),a=t(57437),o=t(45040),i=t(2265),s=t(33814),c=(0,i.createContext)(null),u=function(){return(0,i.useContext)(c)};n.Z=function(e){var n=e.children,t=(0,r._)((0,i.useState)(null),2),u=t[0],l=t[1];return(0,i.useEffect)(function(){var e=(0,o.io)("http://localhost:8080");return l(e),function(){e.disconnect()}},[]),(0,i.useEffect)(function(){if(u)return u.on("notify-order-succeed",function(e){var n;(0,s.Am)("".concat(null==e?void 0:null===(n=e.UserData)||void 0===n?void 0:n.email," vừa mới đặt h\xe0ng th\xe0nh c\xf4ng"),{position:"bottom-left",className:"toast-big",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"dark"})}),function(){u.off("notify-order-succeed")}},[u]),(0,a.jsx)(c.Provider,{value:u,children:n})}},17856:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return K}});var r=t(61943),a=t(7570),o=t(87029),i=t(47002),s=t(85993),c=t(11735),u=t(57437),l=t(2265),d=t(33896),h=t(51269),p=t(7590),m=t(66648),f=t(96747),v=t(13907),g=t(28743),x=t(21068),y=t(21857),N=t(10557),j=t(48058),I=t(58170),b=t(62429),P=t(70074),A=t(22599),S=t.n(A),_={layout:"vertical"},Z=function(e){var n=e.items,t=e.currency,s=e.showSpinner,d=e.paymentSuccess,h=(0,i._)((0,P.Up)(),2),p=h[0],m=p.isPending,f=p.options,v=h[1],g=(0,i._)((0,l.useState)(0),2),x=g[0],y=g[1],N=(0,i._)((0,l.useState)([]),2),j=N[0],I=N[1];return(0,l.useEffect)(function(){v({type:"resetOptions",value:(0,o._)((0,a._)({},f),{currency:t})})},[t,s]),(0,l.useEffect)(function(){var e=S().cloneDeep(n),t=0;e.forEach(function(e){e.unit_amount.value=Math.round(e.unit_amount.value/25e3),t+=e.unit_amount.value*e.quantity}),y(t),I(e)},[n]),(0,u.jsxs)(u.Fragment,{children:[s&&m&&(0,u.jsx)("div",{className:"spinner"}),(0,u.jsx)(P.ch,{style:_,disabled:!1,forceReRender:[_,t,x],fundingSource:void 0,createOrder:function(e,n){return n.order.create({purchase_units:[{amount:{currency_code:t,value:x,breakdown:{item_total:{currency_code:t,value:x}}},items:j}]}).then(function(e){return e})},onApprove:function(e,n){var t;return n.order.capture().then((t=(0,r._)(function(e){return(0,c.Jh)(this,function(n){return"COMPLETED"===e.status&&d(e),[2]})}),function(e){return t.apply(this,arguments)}))}})]})},k=function(e){var n=e.items,t=e.currency,r=e.paymentSuccess;return(0,u.jsx)("div",{children:(0,u.jsx)(P.Vv,{options:{clientId:"AQhbdsL0Bpipds9rzYllfI52xnRJKQK9rmOx7EOOWT6gB1nh2jWeonKrMc3g6Ql0co3CZYjbDwpg1_Fw",components:"buttons",currency:t},children:(0,u.jsx)(Z,{showSpinner:!1,currency:t,items:n,paymentSuccess:r})})})},z=t(38550),C=t(55496),w=t(70766),q=t(21159);t(70550);var O=t(31225),D=t(41131);t(58914);var E=t(33814),V=t(55922),L=new Intl.NumberFormat("vi-VN",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:0}),F=function(e){var n,t=e.setVoucherSelect,a=e.setVoucherPrice,o=e.setVoucherId,s=(0,i._)((0,l.useState)([]),2),d=s[0],h=s[1],p=(n=(0,r._)(function(){var e,n,t,r,a,o;return(0,c.Jh)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,(0,D.Yc)()];case 1:return(e=i.sent())&&0===e.errCode&&h(null==e?void 0:e.data),[3,3];case 2:return console.log(n=i.sent()),(null==n?void 0:null===(r=n.response)||void 0===r?void 0:null===(t=r.data)||void 0===t?void 0:t.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),dispatch((0,V.ni)())):E.Am.error(null==n?void 0:null===(o=n.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(){return n.apply(this,arguments)});(0,l.useEffect)(function(){p()},[]);var f=function(e){var n,t=new Date,r=new Date(+e)-t,a=Math.ceil(r/36e5);return n=a>24?"Hết hạn trong ".concat(Math.ceil(r/864e5)," ng\xe0y nữa"):"Hết hạn trong ".concat(a," giờ nữa"),(0,u.jsx)("p",{style:{color:"red",marginTop:"1rem"},children:n})};return(0,u.jsxs)("div",{className:"voucher-container",children:[(0,u.jsxs)("div",{className:"voucher-title",children:[(0,u.jsx)("button",{onClick:function(){return t(!1)},children:(0,u.jsx)(O.Z,{className:"back-icon"})}),(0,u.jsx)("h2",{children:"Voucher của bạn"})]}),(0,u.jsx)("div",{className:"voucher-content",children:d&&(null==d?void 0:d.length)>0&&d.map(function(e,n){return(0,u.jsxs)("button",{className:"voucher",onClick:function(){a(e.voucherPrice),o(e.voucherId),t(!1)},children:[(0,u.jsx)(m.default,{src:e.image,alt:"v",width:120,height:120,className:"voucher-image"}),(0,u.jsxs)("div",{className:"voucher-info",children:[(0,u.jsxs)("p",{children:[L.format(e.voucherPrice),(0,u.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}),f(e.timeEnd)]})]},n)})})]})},R=t(91606),T=t(16463),Y=t(90525),M=t(58433),J=t(81705),U=t(12784),B=new Intl.NumberFormat("vi-VN",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:0}),K=function(){var e,n,t,P,A,S,_,Z,O,D,L=(0,i._)((0,l.useState)("COD"),2),K=L[0],H=L[1],G=(0,i._)((0,l.useState)(null),2),W=G[0],X=G[1],Q=(0,i._)((0,l.useState)([]),2),$=Q[0],ee=Q[1],en=(0,i._)((0,l.useState)({}),2),et=en[0],er=en[1],ea=(0,i._)((0,l.useState)(!1),2),eo=ea[0],ei=ea[1],es=(0,i._)((0,l.useState)(0),2),ec=es[0],eu=es[1],el=(0,i._)((0,l.useState)(""),2),ed=el[0],eh=el[1],ep=(0,i._)((0,l.useState)(""),2),em=ep[0],ef=ep[1],ev=(0,i._)((0,l.useState)(0),2),eg=ev[0],ex=ev[1],ey=(0,q.v9)(function(e){return e.user.cartId}),eN=(0,q.v9)(function(e){return e.user.userInfo.id}),ej=(0,q.v9)(function(e){return e.cart.allProduct}),eI=(0,i._)((0,l.useState)(!1),2),eb=eI[0],eP=eI[1],eA=(0,i._)((0,l.useState)({}),2),eS=eA[0],e_=eA[1],eZ=(0,T.useRouter)(),ek=(0,U.s)(),ez=(0,q.I0)(),eC=(0,R.Nr)(et,500),ew=(e=(0,r._)(function(){var e,n,t,r,a,o,i,s,u,l;return(0,c.Jh)(this,function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),[4,(0,w.Rm)(eN)];case 1:return(e=c.sent())&&0===e.errCode&&e_({name:null==e?void 0:null===(n=e.data)||void 0===n?void 0:n.userName,phone:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.phoneNumber,address:null==e?void 0:null===(r=e.data)||void 0===r?void 0:r.deliveryAddressData[0],email:null==e?void 0:null===(a=e.data)||void 0===a?void 0:a.email}),[3,3];case 2:return(null==(o=c.sent())?void 0:null===(s=o.response)||void 0===s?void 0:null===(i=s.data)||void 0===i?void 0:i.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==o?void 0:null===(l=o.response)||void 0===l?void 0:null===(u=l.data)||void 0===u?void 0:u.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(){return e.apply(this,arguments)});(0,l.useEffect)(function(){X(new URLSearchParams(window.location.search).get("vnp_ResponseCode"))},[]),(0,l.useEffect)(function(){W&&("07"===W?(E.Am.error("Giao dịch bị nghi ngờ li\xean quan tới lừa đảo",{className:"toast-normal"}),eZ.push("/user/cart")):"09"===W?(E.Am.error("Thẻ/T\xe0i khoản của bạn chưa đăng k\xfd dịch vụ InternetBanking tại ng\xe2n h\xe0ng",{className:"toast-normal"}),eZ.push("/user/cart")):"10"===W?(E.Am.error("Bạn đ\xe3 x\xe1c thực th\xf4ng tin thẻ/t\xe0i khoản kh\xf4ng đ\xfang qu\xe1 3 lần",{className:"toast-normal"}),eZ.push("/user/cart")):"11"===W?(E.Am.error("Đ\xe3 hết hạn chờ thanh to\xe1n. Xin qu\xfd kh\xe1ch vui l\xf2ng thực hiện lại giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")):"12"===W?(E.Am.error("Thẻ/T\xe0i khoản của bạn bị kh\xf3a",{className:"toast-normal"}),eZ.push("/user/cart")):"13"===W?(E.Am.error("Bạn đ\xe3 nhập sai mật khẩu x\xe1c thực giao dịch (OTP). Xin qu\xfd kh\xe1ch vui l\xf2ng thực hiện lại giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")):"24"===W?(E.Am.error("Bạn đ\xe3 hủy giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")):"51"===W?(E.Am.error("T\xe0i khoản của bạn kh\xf4ng đủ số dư để thực hiện giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")):"65"===W?(E.Am.error("T\xe0i khoản của bạn đ\xe3 vượt qu\xe1 hạn mức giao dịch trong ng\xe0y",{className:"toast-normal"}),eZ.push("/user/cart")):"75"===W?(E.Am.error("Ng\xe2n h\xe0ng thanh to\xe1n đang bảo tr\xec",{className:"toast-normal"}),eZ.push("/user/cart")):"79"===W?(E.Am.error("Bạn đ\xe3 nhập sai mật khẩu thanh to\xe1n qu\xe1 số lần quy định. Xin qu\xfd kh\xe1ch vui l\xf2ng thực hiện lại giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")):"99"===W&&(E.Am.error("Đ\xe3 x\xe3y ra lỗi trong qu\xe1 tr\xecnh thanh to\xe1n. Xin qu\xfd kh\xe1ch vui l\xf2ng thực hiện lại giao dịch",{className:"toast-normal"}),eZ.push("/user/cart")))},[W]),(0,l.useEffect)(function(){ey&&eO()},[ey]),(0,l.useEffect)(function(){ew()},[]),(0,l.useEffect)(function(){ex(em-ec+3e4)},[ec,em]),(0,l.useEffect)(function(){0!==Object.keys(et).length&&eq(et)},[eC]),(0,l.useEffect)(function(){"PAYPAL"===K?eP(!0):eP(!1)},[K]),(0,l.useEffect)(function(){var e=ej.reduce(function(e,n){return n.totalPrice+e},0),n=(0,s._)(ej).map(function(e){return{id:e.productId,name:e.name,unit_amount:{currency_code:"USD",value:e.price},quantity:e.quantity}});ef(e),ee(n)},[ej]);var eq=(n=(0,r._)(function(e){var n,t,r,a,o,i;return(0,c.Jh)(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,(0,C.uA)(e)];case 1:return(n=s.sent())&&0===n.errCode&&eO(),[3,3];case 2:return console.log(t=s.sent()),(null==t?void 0:null===(a=t.response)||void 0===a?void 0:null===(r=a.data)||void 0===r?void 0:r.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==t?void 0:null===(i=t.response)||void 0===i?void 0:null===(o=i.data)||void 0===o?void 0:o.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(e){return n.apply(this,arguments)}),eO=(t=(0,r._)(function(){return(0,c.Jh)(this,function(e){switch(e.label){case 0:return[4,ez((0,Y.u0)({userId:eN}))];case 1:return e.sent(),[2]}})}),function(){return t.apply(this,arguments)}),eD=function(e){if(e.quantity>=2){var n=ej.map(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId?(0,o._)((0,a._)({},n),{quantity:n.quantity-1}):n});er({userId:eN,productId:e.productId,quantity:n.find(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId}).quantity,sizeId:e.sizeId,totalPrice:+n.find(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId}).quantity*(+e.price-+e.price*+e.discount/100)}),ez((0,Y.RL)(n))}},eE=function(e){if(e.quantity<e.quantitySize){var n=ej.map(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId?(0,o._)((0,a._)({},n),{quantity:n.quantity+1}):n});er({userId:eN,productId:e.productId,quantity:n.find(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId}).quantity,sizeId:e.sizeId,totalPrice:+n.find(function(n){return n.productId===e.productId&&n.sizeId===e.sizeId}).quantity*(+e.price-+e.price*+e.discount/100)}),ez((0,Y.RL)(n))}},eV=(P=(0,r._)(function(e){var n,t,r,a,o,i;return(0,c.Jh)(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,(0,C.ZW)(e.productId,e.sizeId,eN)];case 1:return(n=s.sent())&&0===n.errCode&&eO(),[3,3];case 2:return console.log(t=s.sent()),(null==t?void 0:null===(a=t.response)||void 0===a?void 0:null===(r=a.data)||void 0===r?void 0:r.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==t?void 0:null===(i=t.response)||void 0===i?void 0:null===(o=i.data)||void 0===o?void 0:o.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(e){return P.apply(this,arguments)}),eL=(A=(0,r._)(function(){var e,n,t,r,a,o,i,s,u,l,d,h;return(0,c.Jh)(this,function(c){switch(c.label){case 0:if(eS.phone)return[3,1];return E.Am.error("Vui l\xf2ng cập nhật số điện thoại để tiếp tục mua h\xe0ng",{className:"toast-normal"}),[3,12];case 1:if(eS.address)return[3,2];return E.Am.error("Vui l\xf2ng cập nhật địa chỉ để tiếp tục mua h\xe0ng"),[3,12];case 2:if(!((null==ej?void 0:ej.length)>0))return[3,11];if("COD"!==K)return[3,6];c.label=3;case 3:return c.trys.push([3,5,,6]),[4,(0,z.im)({cartId:ey,userId:eN,voucherId:ed,payment:K,totalPrice:eg,deliveryAddress:eS.address,status:1})];case 4:return(e=c.sent())&&0===e.errCode&&(eO(),E.Am.success("Đặt h\xe0ng th\xe0nh c\xf4ng",{className:"toast-normal"}),ek.emit("order-succeed",null==e?void 0:e.orderId),eZ.push("/user/orders/".concat(null==e?void 0:e.orderId))),[3,6];case 5:return console.log(n=c.sent()),(null==n?void 0:null===(r=n.response)||void 0===r?void 0:null===(t=r.data)||void 0===t?void 0:t.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==n?void 0:null===(o=n.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.message,{className:"toast-normal"}),[3,6];case 6:if("VNPAY"!==K)return[3,10];c.label=7;case 7:return c.trys.push([7,9,,10]),[4,(0,z.Du)({cartId:ey,userId:eN,voucherId:ed,payment:K,totalPrice:eg,deliveryAddress:eS.address,status:1})];case 8:return(i=c.sent())&&0===i.errCode&&(window.location.href=i.urlPayment),[3,10];case 9:return console.log(s=c.sent()),(null==s?void 0:null===(l=s.response)||void 0===l?void 0:null===(u=l.data)||void 0===u?void 0:u.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==s?void 0:null===(h=s.response)||void 0===h?void 0:null===(d=h.data)||void 0===d?void 0:d.message,{className:"toast-normal"}),[3,10];case 10:return[3,12];case 11:E.Am.error("Kh\xf4ng c\xf3 sản phẩm n\xe0o để đặt h\xe0ng",{className:"toast-normal"}),c.label=12;case 12:return[2]}})}),function(){return A.apply(this,arguments)}),eF=(S=(0,r._)(function(e){var n,t,r,a,o,i,s;return(0,c.Jh)(this,function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),n=e.purchase_units[0].payments.captures[0].id,[4,(0,z.im)({orderId:n+"-paypal",cartId:ey,userId:eN,voucherId:ed,payment:K,totalPrice:eg,deliveryAddress:eS.address,status:1})];case 1:return(t=c.sent())&&0===t.errCode&&(eO(),E.Am.success("Đặt h\xe0ng th\xe0nh c\xf4ng",{className:"toast-normal"}),ek.emit("order-succeed",null==t?void 0:t.orderId),eZ.push("/user/orders/".concat(null==t?void 0:t.orderId))),[3,3];case 2:return console.log(r=c.sent()),(null==r?void 0:null===(o=r.response)||void 0===o?void 0:null===(a=o.data)||void 0===a?void 0:a.errCode)===-4?(E.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),ez((0,V.ni)())):E.Am.error(null==r?void 0:null===(s=r.response)||void 0===s?void 0:null===(i=s.data)||void 0===i?void 0:i.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(e){return S.apply(this,arguments)});return(0,u.jsxs)("div",{className:"cart-page",children:[(0,u.jsx)("h1",{children:"Giỏ h\xe0ng của bạn"}),(0,u.jsx)("div",{className:"cart-container",children:(0,u.jsx)(J.Z,{theme:R.rS,children:(0,u.jsxs)(M.ZP,{container:!0,rowSpacing:{md:4,sm:4,xs:4},columnSpacing:{xl:4,lg:4},children:[(0,u.jsx)(M.ZP,{item:!0,xl:6,lg:6,md:12,sm:12,xs:12,children:(0,u.jsx)("div",{className:"cart-list-product",children:ej&&(null==ej?void 0:ej.length)>0&&(null==ej?void 0:ej.map(function(e,n){return(0,u.jsxs)("div",{style:{position:"relative"},children:[(0,u.jsxs)("div",{className:"product-item",children:[(0,u.jsxs)("div",{className:"product-infor",children:[(0,u.jsx)(m.default,{src:e.image,width:0,height:450,sizes:"100vw",alt:"product",className:"product-img"}),(0,u.jsxs)("div",{className:"wrap-name-price-product",children:[(0,u.jsx)("div",{className:"product-name",children:(0,u.jsx)("p",{children:e.name})}),(0,u.jsxs)("div",{className:"product-price",children:[(0,u.jsxs)("p",{style:{color:0!==e.discount?"rgba(0,0,0,.54)":"var(--primary-color)",textDecoration:0!==e.discount?"line-through":"",marginRight:10},children:[B.format(e.price),(0,u.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}),0!==e.discount?(0,u.jsxs)("p",{children:[B.format(e.price-e.price*e.discount/100),(0,u.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}):null]}),(0,u.jsx)("div",{className:"product-size",children:(0,u.jsxs)("p",{children:["K\xedch cỡ: ",e.sizeName]})}),(0,u.jsxs)("div",{className:"total-price",children:[(0,u.jsxs)("p",{children:[B.format(e.totalPrice),(0,u.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}),(0,u.jsxs)("div",{className:"quantity-btn",children:[(0,u.jsx)("button",{className:"subtract-btn",onClick:function(){return eD(e)},children:(0,u.jsx)(p.Z,{className:"subtract-icon"})}),(0,u.jsx)("p",{children:e.quantity}),(0,u.jsx)("button",{className:"add-btn",onClick:function(){return eE(e)},children:(0,u.jsx)(h.Z,{className:"add-icon"})})]})]})]})]}),(0,u.jsx)("button",{className:"delete-btn",onClick:function(){return eV(e)},children:(0,u.jsx)(d.Z,{className:"delete-icon"})})]}),(null==ej?void 0:ej.length)-1!==n?(0,u.jsx)("div",{className:"line"}):null]},n)}))})}),(0,u.jsx)(M.ZP,{item:!0,xl:6,lg:6,md:12,sm:12,xs:12,children:(0,u.jsx)("div",{className:"cart-order",children:eo?(0,u.jsx)(F,{setVoucherSelect:ei,setVoucherPrice:eu,setVoucherId:eh}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"order-detail",children:[(0,u.jsx)("h2",{children:"Th\xf4ng tin người nhận"}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{htmlFor:"name",className:"order-label",children:"Họ t\xean"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",error:(null==eS?void 0:null===(_=eS.name)||void 0===_?void 0:_.length)===0,inputProps:{id:"name",style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}},value:eS.name?eS.name:"",onChange:function(e){e_((0,o._)((0,a._)({},eS),{name:e.target.value}))}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{htmlFor:"phone",className:"order-label",children:"Số điện thoại"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",error:(null==eS?void 0:null===(Z=eS.phone)||void 0===Z?void 0:Z.length)===0||null==eS||!eS.phone,inputProps:{id:"phone",style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}},value:eS.phone?eS.phone:"",onChange:function(e){e_((0,o._)((0,a._)({},eS),{phone:e.target.value}))}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{htmlFor:"address",className:"order-label",children:"Địa chỉ"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",error:(null==eS?void 0:null===(O=eS.address)||void 0===O?void 0:O.length)===0||null==eS||!eS.address,inputProps:{id:"address",style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}},value:eS.address?eS.address:"",onChange:function(e){e_((0,o._)((0,a._)({},eS),{address:e.target.value}))}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{htmlFor:"email",className:"order-label",children:"Email"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",error:(null==eS?void 0:null===(D=eS.email)||void 0===D?void 0:D.length)===0,inputProps:{id:"email",style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}},value:eS.email?eS.email:"",onChange:function(e){e_((0,o._)((0,a._)({},eS),{email:e.target.value}))}})]})]}),(0,u.jsx)("div",{className:"line"}),(0,u.jsxs)("div",{className:"order-detail",children:[(0,u.jsx)("h2",{children:"Th\xf4ng tin đơn h\xe0ng"}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{className:"order-label",children:"Tổng cộng"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",value:em?B.format(em):0,inputProps:{style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{className:"order-label",children:"Giảm gi\xe1"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",value:"- ".concat(B.format(ec)),inputProps:{style:{textAlign:"right",color:"red"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{className:"order-label",children:"Ph\xed vận chuyển"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",value:B.format(3e4),inputProps:{style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}}})]}),(0,u.jsxs)("div",{className:"order-infor",children:[(0,u.jsx)("label",{className:"order-label",children:"Phải trả"}),(0,u.jsx)(f.Z,{className:"order-input",variant:"standard",value:eg?B.format(eg):0,inputProps:{style:{textAlign:"right"}},InputProps:{readOnly:!0,style:{fontSize:"var(--title-small-fontSize)"}}})]})]}),(0,u.jsx)("div",{className:"line"}),(0,u.jsxs)("div",{className:"order-detail",children:[(0,u.jsx)("h2",{children:"Phương thức thanh to\xe1n"}),(0,u.jsxs)(g.Z,{"aria-labelledby":"controlled-radio-buttons-group",name:"controlled-radio-buttons-group",className:"radio-group",onChange:function(e){eS.phone?eS.address?(null==ej?void 0:ej.length)===0&&"PAYPAL"===e.target.value?E.Am.error("Kh\xf4ng c\xf3 sản phẩm n\xe0o để đặt h\xe0ng",{className:"toast-normal"}):H(e.target.value):E.Am.error("Vui l\xf2ng cập nhật địa chỉ để tiếp tục mua h\xe0ng",{className:"toast-normal"}):E.Am.error("Vui l\xf2ng cập nhật số điện thoại để tiếp tục mua h\xe0ng",{className:"toast-normal"})},value:K,children:[(0,u.jsx)(x.Z,{value:"COD",control:(0,u.jsx)(v.Z,{sx:{"&.Mui-checked":{color:"var(--primary-color)"}}}),label:(0,u.jsxs)("span",{className:"radio-label",children:[(0,u.jsx)("p",{style:{fontSize:"var(--title-small-fontSize)",width:160},children:"Khi nhận h\xe0ng"}),(0,u.jsx)(y.Z,{style:{fontSize:"3rem",color:"COD"===K?"var(--primary-color)":null}})]}),sx:{"& .MuiSvgIcon-root":{fontSize:"2.5rem"}},className:"radio"}),(0,u.jsx)(x.Z,{value:"VNPAY",control:(0,u.jsx)(v.Z,{sx:{"&.Mui-checked":{color:"var(--primary-color)"}}}),label:(0,u.jsxs)("span",{className:"radio-label",children:[(0,u.jsx)("p",{style:{fontSize:"var(--title-small-fontSize)",width:160},children:"VNPAY"}),(0,u.jsx)(N.Z,{style:{fontSize:"3rem",color:"VNPAY"===K?"var(--primary-color)":null}})]}),sx:{"& .MuiSvgIcon-root":{fontSize:"2.5rem"}},className:"radio"}),(0,u.jsx)(x.Z,{value:"PAYPAL",control:(0,u.jsx)(v.Z,{sx:{"&.Mui-checked":{color:"var(--primary-color)"}}}),label:(0,u.jsxs)("span",{className:"radio-label",children:[(0,u.jsx)("p",{style:{fontSize:"var(--title-small-fontSize)",width:160},children:"PayPal"}),(0,u.jsx)(j.Z,{style:{fontSize:"3rem",color:"PAYPAL"===K?"var(--primary-color)":null}})]}),sx:{"& .MuiSvgIcon-root":{fontSize:"2.5rem"}},className:"radio"})]})]}),(0,u.jsx)("div",{className:"payment",style:{marginTop:"2.5rem"},children:eb&&(0,u.jsx)(k,{currency:"USD",paymentSuccess:eF,items:$})}),(0,u.jsx)("div",{className:"line"}),(0,u.jsxs)("div",{className:"voucher-wrapper",children:[(0,u.jsxs)("div",{className:"voucher-name",children:[(0,u.jsx)(I.Z,{className:"voucher-icon"}),(0,u.jsx)("p",{children:""===ed?"H\xe3y chọn m\xe3 voucher của bạn":ed})]}),(0,u.jsx)("button",{className:"voucher-btn",onClick:function(){ei(!0)},children:(0,u.jsx)("p",{children:"Chọn Voucher"})})]}),(0,u.jsxs)("button",{className:"order-btn",onClick:eL,children:[(0,u.jsx)(b.Z,{className:"order-icon"}),(0,u.jsx)("p",{children:"Đặt h\xe0ng"})]})]})})})]})})})]})}},15149:function(e,n,t){"use strict";t.d(n,{gf:function(){return i},v4:function(){return o}});var r=t(38472),a=r.Z.create({baseURL:"http://localhost:8080"});a.interceptors.response.use(function(e){return e.data});var o=r.Z.create({baseURL:"http://localhost:8080"});o.interceptors.response.use(function(e){return e.data});var i=r.Z.create({baseURL:"http://localhost:3010"});i.interceptors.response.use(function(e){return e.data}),n.ZP=a},90525:function(e,n,t){"use strict";t.d(n,{RL:function(){return f},u0:function(){return l}});var r,a=t(61943),o=t(11735),i=t(34036),s=t(55496),c=t(33814),u=t(55922),l=(0,i.hg)("cart/fetchAllProductCart",(r=(0,a._)(function(e,n){var t,r,a,i,l,d;return(0,o.Jh)(this,function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,(0,s.p2)(e.userId)];case 1:return(t=o.sent())&&0===t.errCode?n.dispatch(p(null==t?void 0:t.data)):n.dispatch(m()),[3,3];case 2:return r=o.sent(),n.dispatch(m()),console.log(r),(null==r?void 0:null===(i=r.response)||void 0===i?void 0:null===(a=i.data)||void 0===a?void 0:a.errCode)===-4?(c.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),n.dispatch((0,u.ni)())):c.Am.error(null==r?void 0:null===(d=r.response)||void 0===d?void 0:null===(l=d.data)||void 0===l?void 0:l.message,{className:"toast-normal"}),[3,3];case 3:return[2]}})}),function(e,n){return r.apply(this,arguments)})),d=(0,i.oM)({name:"cart",initialState:{allProduct:[],totalProduct:null},reducers:{fetchAllProductCartSuccess:function(e,n){e.allProduct=n.payload.products,e.totalProduct=n.payload.totalProduct},fetchAllProductCartFailed:function(e,n){e.allProduct=[],e.totalProduct=null},updateAllProduct:function(e,n){e.allProduct=n.payload}}}),h=d.actions,p=h.fetchAllProductCartSuccess,m=h.fetchAllProductCartFailed,f=h.updateAllProduct;n.ZP=d.reducer},55922:function(e,n,t){"use strict";t.d(n,{Ib:function(){return i},So:function(){return u},dG:function(){return c},n1:function(){return s},ni:function(){return o}});var r=(0,t(34036).oM)({name:"user",initialState:{login:!1,userInfo:[],favourites:[],cartId:null},reducers:{logIn:function(e,n){e.login=!0,e.userInfo=n.payload},logOut:function(e){e.login=!1,e.userInfo=[],e.favourites=[],e.cartId=null,localStorage.removeItem("isSaveLogin"),localStorage.removeItem("refresh_token"),localStorage.removeItem("access_token"),sessionStorage.removeItem("refresh_token"),sessionStorage.removeItem("access_token")},updateAvatar:function(e,n){e.userInfo.avatar=n.payload},updateFavourites:function(e,n){e.favourites=n.payload},updateCartId:function(e,n){e.cartId=n.payload}}}),a=r.actions,o=a.logOut,i=a.logIn,s=a.updateAvatar,c=a.updateFavourites,u=a.updateCartId;n.ZP=r.reducer},55496:function(e,n,t){"use strict";t.d(n,{Oc:function(){return o},ZW:function(){return c},bP:function(){return a},p2:function(){return i},uA:function(){return s}});var r=t(15149),a=function(e){return r.v4.post("/api/cart/create-cart",e)},o=function(e){return r.v4.post("/api/cart/add-product-to-cart",e)},i=function(e){return r.v4.get("/api/cart/get-all-product-cart?userId=".concat(e))},s=function(e){return r.v4.put("/api/cart/update-product-cart",e)},c=function(e,n,t){return r.v4.delete("/api/cart/delete-product-cart?productId=".concat(e,"&sizeId=").concat(n,"&userId=").concat(t))}},38550:function(e,n,t){"use strict";t.d(n,{Du:function(){return c},JY:function(){return i},Q2:function(){return s},Vb:function(){return o},im:function(){return a}});var r=t(15149),a=function(e){return r.v4.post("/api/order/create-order",e)},o=function(e,n,t,a){return r.v4.get("/api/order/get-all-order?userId=".concat(e,"&status=").concat(n,"&limit=").concat(t,"&page=").concat(a))},i=function(e,n){return r.v4.get("/api/order/get-order-detail?orderId=".concat(e,"&userId=").concat(n))},s=function(e){return r.v4.put("/api/order/cancle-order",e)},c=function(e){return r.v4.post("/api/order/create_payment_url",e)}},41131:function(e,n,t){"use strict";t.d(n,{Ct:function(){return c},G7:function(){return p},HA:function(){return i},LO:function(){return d},Ln:function(){return s},Pq:function(){return o},RZ:function(){return m},Ro:function(){return f},Uv:function(){return h},Yc:function(){return u},dj:function(){return x},ev:function(){return y},jm:function(){return a},kf:function(){return v},uY:function(){return g},wy:function(){return l}});var r=t(15149),a=function(e){return r.ZP.get("/api/product-type/get-product-type?productTypeId=".concat(e))},o=function(e,n,t,a){return r.ZP.get("/api/product-type/get-all-product-type?limit=".concat(e,"&page=").concat(n,"&name=").concat(t,"&pagination=").concat(a))},i=function(e,n,t){return r.ZP.get("/api/product/get-all-product?limit=".concat(e,"&page=").concat(n,"&name=").concat(encodeURIComponent(t)))},s=function(e){return r.ZP.get("/api/product/get-product?productId=".concat(e))},c=function(e,n,t,a,o){return r.ZP.get("/api/product/get-all-product-of-the-product-type?productTypeId=".concat(e,"&limit=").concat(n,"&page=").concat(t,"&sort=").concat(a,"&filter=").concat(o))},u=function(){return r.ZP.get("/api/voucher/get-all-voucher-user")},l=function(e){return r.v4.get("/api/product/get-product-feedback?userId=".concat(e))},d=function(e){return r.v4.post("/api/feedback/create-feedback",e)},h=function(e){return r.ZP.get("/api/feedback/get-all-feedback?productId=".concat(e))},p=function(e){return r.v4.put("/api/feedback/update-feedback",e)},m=function(e,n){return r.v4.delete("/api/feedback/delete-feedback?feedbackId=".concat(e,"&userId=").concat(n))},f=function(e,n){return r.ZP.get("/api/product/get-product-sale-off?limit=".concat(e,"&page=").concat(n))},v=function(e,n,t){return r.v4.get("/api/product/get-product-favourite?userId=".concat(t,"&limit=").concat(e,"&page=").concat(n))},g=function(e){return r.ZP.get("/api/product/get-product-name?productId=".concat(e))},x=function(e,n,t,a){return r.ZP.get("/api/brand/get-all-brand?limit=".concat(e,"&page=").concat(n,"&name=").concat(t,"&pagination=").concat(a))},y=function(e){return r.gf.get("/api/product/recommendation?productId=".concat(e))}},70766:function(e,n,t){"use strict";t.d(n,{Ak:function(){return f},C6:function(){return d},F$:function(){return c},Md:function(){return u},Rm:function(){return p},UW:function(){return x},VP:function(){return v},a5:function(){return y},gY:function(){return h},n8:function(){return g},p_:function(){return l},yX:function(){return m}});var r,a,o=t(61943),i=t(11735),s=t(15149),c=function(e,n){return s.ZP.post("/api/user/login-user",{email:e,password:n})},u=(r=(0,o._)(function(e){return(0,i.Jh)(this,function(n){switch(n.label){case 0:return[4,s.v4.get("/api/user/get-user-infor?userId=".concat(e))];case 1:return[2,n.sent()]}})}),function(e){return r.apply(this,arguments)}),l=function(e){return s.ZP.post("/api/user/register",e)},d=function(e){return s.ZP.post("/api/user/send-otp-code",{email:e})},h=function(e){return s.ZP.put("/api/user/change-password",e)},p=function(e){return s.v4.get("/api/user/get-user?id=".concat(e))},m=function(e){return s.v4.put("/api/user/update-user",e)},f=function(e){return s.v4.put("/api/user/change-password-profile",e)},v=function(e){return s.v4.post("/api/favourite/create-favourite",e)},g=function(e,n){return s.v4.delete("/api/favourite/delete-favourite?userId=".concat(e,"&productId=").concat(n))},x=function(e){return s.v4.get("/api/favourite/get-all-favourite?userId=".concat(e))},y=(a=(0,o._)(function(e){return(0,i.Jh)(this,function(n){switch(n.label){case 0:return[4,s.ZP.post("/api/user/refresh-token",{},{headers:{Authorization:"Bearer ".concat(e)}})];case 1:return[2,n.sent()]}})}),function(e){return a.apply(this,arguments)})},91606:function(e,n,t){"use strict";t.d(n,{Np:function(){return u},Nr:function(){return c},rS:function(){return l}});var r=t(47002),a=t(2265),o=t(94444),i=t(85955),s=t.n(i),c=function(e,n){var t=(0,r._)((0,a.useState)(e),2),o=t[0],i=t[1];return(0,a.useEffect)(function(){var t=setTimeout(function(){return i(e)},n);return function(){return clearTimeout(t)}},[e,n]),o},u=function(e){return e?e=s()(e,{lower:!0,locale:"vi"}):""},l=(0,o.Z)({breakpoints:{values:{xs:0,sm:576,md:768,lg:992,xl:1200}}})},70550:function(){},58914:function(){}},function(e){e.O(0,[9006,1866,3216,4036,1159,9562,6648,7746,4866,8433,2591,5040,5541,701,2971,7023,1744],function(){return e(e.s=71785)}),_N_E=e.O()}]);