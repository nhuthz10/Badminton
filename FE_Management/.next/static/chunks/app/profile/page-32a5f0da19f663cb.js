(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4178],{46862:function(e,n,r){Promise.resolve().then(r.bind(r,51436))},51436:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return I}});var s=r(61943),a=r(7570),o=r(47002),i=r(11735),t=r(57437),l=r(2265),d=r(6920),u=r(1970),c=r(39343),m=r(71131),v=r(54952),h=r(5069),p=r(21159),N=r(33814),f=r(70766),g=r(62737),x=r.n(g),b=r(66648),j=r(32591),w=r(51428);r(54937);var A=r(55922),_=r(32416),D={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",background:"white",borderRadius:15,padding:"25px 20px 25px 20px"},E=function(e){var n,r=e.open,o=e.handleCloseModal,m=e.setIsOpen,v=(0,p.I0)(),h=(0,c.cI)(),g=h.register,x=h.handleSubmit,b=h.setValue,E=h.getValues,C=h.reset,I=h.formState.errors,S=(0,w.v9)(function(e){var n,r;return null===(r=e.user)||void 0===r?void 0:null===(n=r.userInfo)||void 0===n?void 0:n.id}),P=(n=(0,s._)(function(e){var n,r,s,a,o,t,l,d,u,c,h,p,g,x;return(0,i.Jh)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,3,4]),v((0,_.qu)(!0)),[4,(0,f.Ak)({id:S,currentPassword:e.currentPassword,newPassword:e.newPassword})];case 1:return(n=i.sent())&&0===n.errCode&&(N.Am.success("Thay đổi mật khẩu th\xe0nh c\xf4ng",{className:"toast-normal"}),b("currentPassword",""),b("newPassword",""),b("comfirmPassword",""),m(!1)),[3,4];case 2:return(null==(r=i.sent())?void 0:null===(a=r.response)||void 0===a?void 0:null===(s=a.data)||void 0===s?void 0:s.errCode)===1?N.Am.error("Thiếu tham số bắt buộc",{className:"toast-normal"}):(null==r?void 0:null===(t=r.response)||void 0===t?void 0:null===(o=t.data)||void 0===o?void 0:o.errCode)===2?N.Am.error("Người d\xf9ng kh\xf4ng tồn tại",{className:"toast-normal"}):(null==r?void 0:null===(d=r.response)||void 0===d?void 0:null===(l=d.data)||void 0===l?void 0:l.errCode)===3?N.Am.error("Mật khẩu hiện tại kh\xf4ng đ\xfang",{className:"toast-normal"}):(null==r?void 0:null===(c=r.response)||void 0===c?void 0:null===(u=c.data)||void 0===u?void 0:u.errCode)===4?N.Am.error("Mật khẩu mới tr\xf9ng với mật khẩu hiện tại của bạn",{className:"toast-normal"}):(null==r?void 0:null===(p=r.response)||void 0===p?void 0:null===(h=p.data)||void 0===h?void 0:h.errCode)===-4?(N.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),v((0,A.ni)())):N.Am.error(null==r?void 0:null===(x=r.response)||void 0===x?void 0:null===(g=x.data)||void 0===g?void 0:g.message,{className:"toast-normal"}),[3,4];case 3:return v((0,_.qu)(!1)),[7];case 4:return[2]}})}),function(e){return n.apply(this,arguments)});return(0,l.useEffect)(function(){r&&C()},[r]),(0,t.jsx)(j.Z,{open:r,onClose:o,children:(0,t.jsxs)("div",{className:"modal-change-password-container",style:(0,a._)({},D),children:[(0,t.jsx)(d.G,{icon:u.WA2,className:"modal-close-icon",onClick:o}),(0,t.jsx)("h3",{style:{fontSize:"var(--title-fontSize)",marginTop:4,marginBottom:20,textAlign:"center"},children:"Thay đổi mật khẩu"}),(0,t.jsxs)("form",{onSubmit:x(P),className:"form-update-password",children:[(0,t.jsxs)("div",{className:"change-password-wrap-input",children:[(0,t.jsx)("p",{children:"Nhập mật khẩu hiện tại"}),(0,t.jsx)("input",(0,a._)({className:"change-password-input",type:"password"},g("currentPassword",{required:"Nhập mật khẩu hiện tại của bạn"}))),I.currentPassword&&(0,t.jsx)("p",{className:"error",children:I.currentPassword.message})]}),(0,t.jsxs)("div",{className:"change-password-wrap-input",children:[(0,t.jsx)("p",{children:"Nhập mật khẩu mới"}),(0,t.jsx)("input",(0,a._)({className:"change-password-input",type:"password"},g("newPassword",{required:"Nhập mật khẩu mới của bạn",minLength:{value:8,message:"Tối thiểu 8 k\xfd tự"}}))),I.newPassword&&(0,t.jsx)("p",{className:"error",children:I.newPassword.message})]}),(0,t.jsxs)("div",{className:"change-password-wrap-input",children:[(0,t.jsx)("p",{children:"Nhập lại mật khẩu mới"}),(0,t.jsx)("input",(0,a._)({className:"change-password-input",type:"password"},g("comfirmPassword",{required:"Nhập lại mật khẩu mới của bạn",validate:{isCheckPass:function(e){if(E("newPassword")!==e)return"Mật khẩu kh\xf4ng tr\xf9ng khớp"}}}))),I.comfirmPassword&&(0,t.jsx)("p",{className:"error",children:I.comfirmPassword.message})]}),(0,t.jsx)("button",{type:"submit",className:"btn-update-password",children:"Cập nhật"})]})]})})},C=r(29982);r(15198);var I=function(){var e,n,r,g=(0,o._)((0,l.useState)("/images/default-avatar.png"),2),j=g[0],w=g[1],D=(0,o._)((0,l.useState)(null),2),I=D[0],S=D[1],P=(0,o._)((0,l.useState)(null),2),R=P[0],k=P[1],y=(0,o._)((0,l.useState)(null),2),O=y[0],M=y[1],T=(0,o._)((0,l.useState)(""),2),U=T[0],z=T[1],q=(0,o._)((0,l.useState)(!1),2),L=q[0],F=q[1],V=(0,p.I0)(),$=(0,p.v9)(function(e){var n;return null===(n=e.user.userInfo)||void 0===n?void 0:n.id}),Z=(0,p.v9)(function(e){var n,r;return null===(r=e.user.userInfo)||void 0===r?void 0:null===(n=r.roleData)||void 0===n?void 0:n.roleId}),G=(0,c.cI)(),Y=G.register,H=G.handleSubmit,W=G.formState.errors,J=G.setValue,B=(e=(0,s._)(function(){var e,n,r,s,a,o,t,l,d,u,c,m,v,h,p,g,b,j,D,E,C,I,S;return(0,i.Jh)(this,function(i){switch(i.label){case 0:V((0,_.qu)(!0)),i.label=1;case 1:return i.trys.push([1,3,4,5]),[4,(0,f.Rm)($)];case 2:return(e=i.sent())&&0===e.errCode&&(z(null==e?void 0:null===(n=e.data)||void 0===n?void 0:n.userName),J("email",null==e?void 0:null===(r=e.data)||void 0===r?void 0:r.email),J("userName",null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.userName),(null==e?void 0:null===(a=e.data)||void 0===a?void 0:a.phoneNumber)?J("phone",null==e?void 0:null===(o=e.data)||void 0===o?void 0:o.phoneNumber):J("phone",""),(null==e?void 0:null===(l=e.data)||void 0===l?void 0:null===(t=l.deliveryAddressData)||void 0===t?void 0:t.length)>0?J("address",null==e?void 0:null===(d=e.data)||void 0===d?void 0:d.deliveryAddressData[0]):J("address",""),(null==e?void 0:null===(u=e.data)||void 0===u?void 0:u.birthday)&&M(x()(new Date(+(null==e?void 0:null===(c=e.data)||void 0===c?void 0:c.birthday)))),(null==e?void 0:null===(m=e.data)||void 0===m?void 0:m.avatar)&&(w(null==e?void 0:null===(v=e.data)||void 0===v?void 0:v.avatar),V((0,A.n1)(null==e?void 0:null===(h=e.data)||void 0===h?void 0:h.avatar)))),[3,5];case 3:return(null==(p=i.sent())?void 0:null===(b=p.response)||void 0===b?void 0:null===(g=b.data)||void 0===g?void 0:g.errCode)===1?N.Am.error("Thiếu tham số bắt buộc",{className:"toast-normal"}):(null==p?void 0:null===(D=p.response)||void 0===D?void 0:null===(j=D.data)||void 0===j?void 0:j.errCode)===2?N.Am.error("Người d\xf9ng kh\xf4ng tồn tại",{className:"toast-normal"}):(null==p?void 0:null===(C=p.response)||void 0===C?void 0:null===(E=C.data)||void 0===E?void 0:E.errCode)===-4?(N.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),V((0,A.ni)())):N.Am.error(null==p?void 0:null===(S=p.response)||void 0===S?void 0:null===(I=S.data)||void 0===I?void 0:I.message,{className:"toast-normal"}),[3,5];case 4:return V((0,_.qu)(!1)),[7];case 5:return[2]}})}),function(){return e.apply(this,arguments)});(0,l.useEffect)(function(){$&&B()},[$]);var Q=(n=(0,s._)(function(e){var n;return(0,i.Jh)(this,function(r){return S(n=e.target.files[0]),n&&w(URL.createObjectURL(n)),[2]})}),function(e){return n.apply(this,arguments)}),X=(r=(0,s._)(function(e){var n,r,s,a,o,t,l,d,u,c,m,v,h,p,g,x,b,j;return(0,i.Jh)(this,function(i){switch(i.label){case 0:V((0,_.qu)(!0)),i.label=1;case 1:return i.trys.push([1,3,4,5]),(n=new FormData).append("email",e.email),n.append("userName",e.userName),n.append("roleId",Z),n.append("id",$),n.append("phoneNumber",e.phone),n.append("address",e.address),r=O&&O.$d?O.$d.getTime():"",n.append("birthday",r),I&&I!==R&&n.append("avatar",I),[4,(0,f.yX)(n)];case 2:return(s=i.sent())&&0===s.errCode&&(k(I),B(),N.Am.success("Cập nhật th\xe0nh c\xf4ng",{className:"toast-normal"})),[3,5];case 3:return(null==(a=i.sent())?void 0:null===(t=a.response)||void 0===t?void 0:null===(o=t.data)||void 0===o?void 0:o.errCode)===1?N.Am.error("Thiếu tham số bắt buộc",{className:"toast-normal"}):(null==a?void 0:null===(d=a.response)||void 0===d?void 0:null===(l=d.data)||void 0===l?void 0:l.errCode)===2?N.Am.error("User kh\xf4ng tồn tại",{className:"toast-normal"}):(null==a?void 0:null===(c=a.response)||void 0===c?void 0:null===(u=c.data)||void 0===u?void 0:u.errCode)===3?N.Am.error("Email đ\xe3 tồn tại",{className:"toast-normal"}):(null==a?void 0:null===(v=a.response)||void 0===v?void 0:null===(m=v.data)||void 0===m?void 0:m.errCode)===4?N.Am.error("T\xean người d\xf9ng đ\xe3 tồn tại",{className:"toast-normal"}):(null==a?void 0:null===(p=a.response)||void 0===p?void 0:null===(h=p.data)||void 0===h?void 0:h.errCode)===5?N.Am.error("Số điện thoại đ\xe3 tồn tại",{className:"toast-normal"}):(null==a?void 0:null===(x=a.response)||void 0===x?void 0:null===(g=x.data)||void 0===g?void 0:g.errCode)===-4?(N.Am.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),V((0,A.ni)())):N.Am.error(null==a?void 0:null===(j=a.response)||void 0===j?void 0:null===(b=j.data)||void 0===b?void 0:b.message,{className:"toast-normal"}),[3,5];case 4:return V((0,_.qu)(!1)),[7];case 5:return[2]}})}),function(e){return r.apply(this,arguments)});return(0,t.jsxs)("div",{className:"user-page",children:[(0,t.jsxs)("div",{className:"user-container",children:[(0,t.jsxs)("div",{className:"username",children:[(0,t.jsxs)("div",{className:"user-wrap-avatar",children:[(0,t.jsx)(b.default,{src:j,width:0,height:0,sizes:"100vw",priority:!0,alt:"avt",className:"user-avatar-img",id:"image"}),(0,t.jsx)("label",{htmlFor:"image-upload",children:(0,t.jsx)(d.G,{className:"upload-icon",icon:u.g6h})}),(0,t.jsx)("input",{type:"file",id:"image-upload",onChange:function(e){return Q(e)}})]}),(0,t.jsx)("h1",{children:U})]}),(0,t.jsxs)("form",{onSubmit:H(X),children:[(0,t.jsxs)("div",{className:"btn-pageuser",children:[(0,t.jsx)("button",{className:"btn-change",onClick:function(){F(!0)},type:"button",children:"Đổi mật khẩu"}),(0,t.jsx)("button",{className:"btn-change",style:{marginLeft:"2rem"},type:"submit",children:"Cập nhật"})]}),(0,t.jsxs)("div",{className:"user-info-container",children:[(0,t.jsxs)("div",{className:"user-info-element",children:[(0,t.jsx)("label",{htmlFor:"email",children:"Email"}),(0,t.jsx)("input",(0,a._)({type:"text",className:"user-info-input",id:"email",readOnly:!0},Y("email",{required:"Nhập email của bạn",pattern:{value:C.Sz.EMAIL,message:"Email kh\xf4ng hợp lệ"}}))),W.email&&(0,t.jsx)("p",{className:"user-info-error",children:W.email.message})]}),(0,t.jsxs)("div",{className:"user-info-element",children:[(0,t.jsx)("label",{htmlFor:"userName",children:"Họ v\xe0 t\xean"}),(0,t.jsx)("input",(0,a._)({type:"text",className:"user-info-input",id:"userName"},Y("userName",{required:"Nhập t\xean của bạn",pattern:{value:C.Sz.USERNAME,message:"T\xean kh\xf4ng hợp lệ"}}))),W.userName&&(0,t.jsx)("p",{className:"user-info-error",children:W.userName.message})]}),(0,t.jsxs)("div",{className:"user-info-element",children:[(0,t.jsx)("label",{htmlFor:"phone",children:"Số điện thoại"}),(0,t.jsx)("input",(0,a._)({className:"user-info-input",id:"phone"},Y("phone",{pattern:{value:C.Sz.PHONE,message:"Số điện thoại kh\xf4ng hợp lệ"}}))),W.phone&&(0,t.jsx)("p",{className:"user-info-error",children:W.phone.message})]}),(0,t.jsxs)("div",{className:"user-info-element",children:[(0,t.jsx)("label",{htmlFor:"address",children:"Địa chỉ"}),(0,t.jsx)("div",{className:"user-info-address",children:(0,t.jsx)("input",(0,a._)({type:"text",className:"user-info-input",id:"address"},Y("address")))}),W.address&&(0,t.jsx)("p",{className:"user-info-error",children:W.address.message})]}),(0,t.jsxs)("div",{className:"user-info-element",children:[(0,t.jsx)("label",{htmlFor:"birth",children:"Ng\xe0y sinh"}),(0,t.jsx)(v._,{dateAdapter:h.y,children:(0,t.jsx)(m.M,{className:"date-picker",sx:{"& .MuiInputBase-root":{height:36,fontSize:"var(--text-fontSize)",color:"white",fontWeight:"bold"}},format:"DD/MM/YYYY",maxDate:x()(new Date),onChange:function(e){return M(e)},value:O||null})})]})]})]})]}),(0,t.jsx)(E,{open:L,setIsOpen:F,handleCloseModal:function(){F(!L)}})]})}},91606:function(e,n,r){"use strict";r.d(n,{Nr:function(){return d},rS:function(){return u}});var s=r(47002),a=r(20920),o=r(4596),i=r.n(o),t=r(2265),l=r(94444),d=function(e,n){var r=(0,s._)((0,t.useState)(e),2),a=r[0],o=r[1];return(0,t.useEffect)(function(){var r=setTimeout(function(){return o(e)},n);return function(){return clearTimeout(r)}},[e,n]),a},u=(0,l.Z)({breakpoints:{values:{xs:0,sm:576,md:768,lg:992,xl:1200}}});n.ZP=function(e){e=i()(e.replace(/[^a-zA-Z0-9]/g,""));for(var n="",r=(0,a.Z)(),s=0;s<e.length;s++)s%2==0&&(n+=e[s]);return n.toUpperCase()+r.slice(0,5).toUpperCase()}},29982:function(e,n,r){"use strict";r.d(n,{VZ:function(){return a},ET:function(){return s},Sz:function(){return o}});var s={HOME:"/",PRODUCT:"/product/*",USER:"/user/*",LOGIN:"/login",REGISTER:"/register",NOT_FOUND:"/not-found",FORGOT_PASSWORD:"/forgot-password",CHANGE_PASSWORD:"/change-password/:userEmail",ADMIN:"/admin/*",OVERVIEW_ADMIN:"",PRODUCT_ADMIN:"product",PRODUCT_TYPE_ADMIN:"product-type",PRODUCT_BRAND_ADMIN:"product-brand",PRODUCT_SIZE_ADMIN:"product-size",PRODUCT_PRODUCTSIZE_ADMIN:"productsize",ORDER_DETAIL:"/:orderStatus/:orderId",ORDER_ADMIN:"order",ORDER_WAITING_ADMIN:"order-waiting",ORDER_DELIVERY_ADMIN:"order-delivery",ORDER_DONE_ADMIN:"order-done",ORDER_CANCELED_ADMIN:"order-canceled",USER_ADMIN:"user",VOUCHER_ADMIN:"voucher",REVENUE_ADMIN:"revenue",POST_ADMIN:"create",PUT_ADMIN:"edit"},a=10,o={USERNAME:/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]+$/,EMAIL:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,PHONE:/^\d{10,}$/,PRICE:/^\d{1,3}(?:\.\d{3})*$/,DISCOUNT:/^(?:100|[0-9]|[1-9][0-9])$/,QUANTITY:/^[0-9]+$/};r(91606)},15198:function(){},54937:function(){}},function(e){e.O(0,[4071,2171,9931,8436,1159,4444,8113,9343,769,2268,4470,6274,5157,6648,4959,690,1970,2416,2971,7023,1744],function(){return e(e.s=46862)}),_N_E=e.O()}]);