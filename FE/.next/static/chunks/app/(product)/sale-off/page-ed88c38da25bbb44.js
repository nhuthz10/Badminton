(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4202],{47144:function(e,n,r){Promise.resolve().then(r.bind(r,76974))},76974:function(e,n,r){"use strict";r.r(n);var t=r(61943),i=r(7570),o=r(47002),u=r(11735),s=r(57437),a=r(2265),c=r(62279),l=r(60761),d=r(95888),p=r(51005),f=r(70766),m=r(55922),v=r(87138),h=r(66648),g=r(21159),x=r(33814),j=r(58433),N=r(81705),y=r(91606);r(70249);var w=new Intl.NumberFormat("vi-VN",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:0});n.default=function(){var e,n=(0,o._)((0,a.useState)([]),2),r=n[0],I=n[1],b=(0,g.v9)(function(e){var n;return null===(n=e.user.userInfo)||void 0===n?void 0:n.id}),P=(0,g.v9)(function(e){var n;return null===(n=e.user)||void 0===n?void 0:n.favourites}),k=(0,g.v9)(function(e){return e.product.allProductSaleOff.data}),Z=(0,g.I0)();(0,a.useEffect)(function(){P&&(null==P?void 0:P.length)>0?I(null==k?void 0:k.map(function(e){var n=(0,i._)({},e);return n.favourite=null==P?void 0:P.includes(e.productId),n})):I(k)},[P,k]);var _=(e=(0,t._)(function(e,n){var r,t,i,o,s,a,c,l,d;return(0,u.Jh)(this,function(u){switch(u.label){case 0:if(!b)return[3,12];u.label=1;case 1:if(u.trys.push([1,10,,11]),"like"!==n)return[3,5];return[4,(0,f.n8)(b,e)];case 2:if(!((r=u.sent())&&0===r.errCode))return[3,4];return[4,(0,f.UW)(b)];case 3:return t=u.sent(),Z((0,m.dG)(null==t?void 0:t.data)),[3,5];case 4:x.Am.error(r.message,{className:"toast-normal"}),u.label=5;case 5:if("noLike"!==n)return[3,9];return[4,(0,f.VP)({productId:e,userId:b})];case 6:if(!((i=u.sent())&&0===i.errCode))return[3,8];return[4,(0,f.UW)(b)];case 7:return o=u.sent(),Z((0,m.dG)(null==o?void 0:o.data)),[3,9];case 8:x.Am.error(i.message,{className:"toast-normal"}),u.label=9;case 9:return[3,11];case 10:return console.log(s=u.sent()),(null==s?void 0:null===(c=s.response)||void 0===c?void 0:null===(a=c.data)||void 0===a?void 0:a.errCode)===-4?(x.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),Z((0,m.ni)())):x.Am.error(null==s?void 0:null===(d=s.response)||void 0===d?void 0:null===(l=d.data)||void 0===l?void 0:l.message,{className:"toast-normal"}),[3,11];case 11:return[3,13];case 12:x.Am.error("Vui l\xf2ng đăng nhập",{className:"toast-normal"}),u.label=13;case 13:return[2]}})}),function(n,r){return e.apply(this,arguments)});return(0,s.jsxs)("div",{className:"sale-off-container",children:[(0,s.jsx)(N.Z,{theme:y.rS,children:(0,s.jsx)(j.ZP,{container:!0,rowSpacing:{xl:1.5,lg:1.5,md:2,sm:2,xs:2},columnSpacing:{xl:1.5,lg:1.5,md:2,sm:2,xs:2},children:r&&(null==r?void 0:r.length)>0?null==r?void 0:r.map(function(e,n){var r;return(0,s.jsx)(j.ZP,{item:!0,xl:3,lg:3,md:4,sm:6,xs:12,children:(0,s.jsxs)(v.default,{href:"/".concat((0,y.Np)(e.productTypeData.productTypeName),"-").concat(e.productTypeData.productTypeId.toLowerCase(),"/").concat((0,y.Np)(e.name),"-").concat(e.productId.toLowerCase()),className:"productWrapper",children:[(0,s.jsx)(h.default,{src:e.image,width:0,height:400,sizes:"100vw",style:{objectFit:(null===(r=e.productTypeData)||void 0===r?void 0:r.productTypeName)==="\xc1o cầu l\xf4ng"?"cover":"contain"},className:"productImg",alt:"product"}),(0,s.jsx)("button",{className:"favorite",onClick:function(e){e.preventDefault()},children:e.favourite?(0,s.jsx)(d.Z,{onClick:function(){_(e.productId,"like")},className:"icon",style:{color:"red"}}):(0,s.jsx)(l.Z,{className:"icon",onClick:function(){_(e.productId,"noLike")}})}),(0,s.jsxs)("div",{className:"productInfo",children:[(0,s.jsx)("p",{className:"productName",children:e.name}),(0,s.jsxs)("div",{className:"productRating",children:[(0,s.jsx)(p.Z,{defaultValue:0,value:e.rating,precision:.5,readOnly:!0,style:{fontSize:"2.5rem"}}),(0,s.jsxs)("p",{style:{lineHeight:1.5},children:[e.rating,"/",(0,s.jsx)("span",{children:"5"})]})]}),(0,s.jsxs)("div",{className:"productPrice",children:[(0,s.jsxs)("p",{style:{color:0!==e.discount?"rgba(0,0,0,.54)":"var(--primary-color)",textDecoration:0!==e.discount?"line-through":"",marginRight:10},children:[w.format(e.price),(0,s.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}),0!==e.discount?(0,s.jsxs)("p",{children:[w.format(e.price-e.price*e.discount/100),(0,s.jsx)("span",{style:{textDecoration:"underline",marginLeft:2},children:"đ"})]}):null]})]})]})},n)}):(0,s.jsxs)("div",{className:"no-product",children:[(0,s.jsx)("h1",{children:"Kh\xf4ng c\xf3 sản phẩm n\xe0o"}),(0,s.jsx)(h.default,{src:"/images/noProduct.png",height:315,width:315,sizes:"100vw",alt:":(("})]})})}),(0,s.jsx)("div",{style:{marginTop:50},children:(0,s.jsx)(c.Z,{type:"sale-off-product"})})]})}},70766:function(e,n,r){"use strict";r.d(n,{Ak:function(){return v},C6:function(){return d},F$:function(){return a},Md:function(){return c},Rm:function(){return f},UW:function(){return x},VP:function(){return h},a5:function(){return j},gY:function(){return p},n8:function(){return g},p_:function(){return l},yX:function(){return m}});var t,i,o=r(61943),u=r(11735),s=r(15149),a=function(e,n){return s.ZP.post("/api/user/login-user",{email:e,password:n})},c=(t=(0,o._)(function(e){return(0,u.Jh)(this,function(n){switch(n.label){case 0:return[4,s.v4.get("/api/user/get-user-infor?userId=".concat(e))];case 1:return[2,n.sent()]}})}),function(e){return t.apply(this,arguments)}),l=function(e){return s.ZP.post("/api/user/register",e)},d=function(e){return s.ZP.post("/api/user/send-otp-code",{email:e})},p=function(e){return s.ZP.put("/api/user/change-password",e)},f=function(e){return s.v4.get("/api/user/get-user?id=".concat(e))},m=function(e){return s.v4.put("/api/user/update-user",e)},v=function(e){return s.v4.put("/api/user/change-password-profile",e)},h=function(e){return s.v4.post("/api/favourite/create-favourite",e)},g=function(e,n){return s.v4.delete("/api/favourite/delete-favourite?userId=".concat(e,"&productId=").concat(n))},x=function(e){return s.v4.get("/api/favourite/get-all-favourite?userId=".concat(e))},j=(i=(0,o._)(function(e){return(0,u.Jh)(this,function(n){switch(n.label){case 0:return[4,s.ZP.post("/api/user/refresh-token",{},{headers:{Authorization:"Bearer ".concat(e)}})];case 1:return[2,n.sent()]}})}),function(e){return i.apply(this,arguments)})},70249:function(){}},function(e){e.O(0,[8147,3676,3216,4036,1159,9562,6648,6920,7746,7762,4866,8433,1005,8206,8325,2279,2971,7023,1744],function(){return e(e.s=47144)}),_N_E=e.O()}]);