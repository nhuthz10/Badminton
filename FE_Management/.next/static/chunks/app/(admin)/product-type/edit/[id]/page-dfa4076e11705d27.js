(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9741],{11391:function(e,n,r){Promise.resolve().then(r.bind(r,45884))},16463:function(e,n,r){"use strict";var t=r(71169);r.o(t,"usePathname")&&r.d(n,{usePathname:function(){return t.usePathname}}),r.o(t,"useRouter")&&r.d(n,{useRouter:function(){return t.useRouter}})},45884:function(e,n,r){"use strict";r.r(n);var t=r(61943),a=r(7570),d=r(87029),s=r(47002),i=r(11735),o=r(57437),u=r(2265),l=r(39343),p=r(33814);r(44193);var c=r(39234),m=r(76548),h=r(16463),v=r(32416),f=r(21159),N=r(41131),y=r(55922),x=r(32141);n.default=function(e){var n,r,g=e.params,b=(0,l.cI)(),j=b.handleSubmit,C=b.control,_=b.setValue,I=b.formState.errors,P=(0,h.useRouter)(),A=(0,s._)((0,u.useState)({}),2),S=A[0],k=A[1];(0,h.usePathname)().split("/");var q=(0,f.I0)();(0,u.useEffect)(function(){S&&(_("typeID",S.productTypeId),_("typeName",S.productTypeName))},[S,_]);var w=(n=(0,t._)(function(){var e,n,r,t,a,d,s,o;return(0,i.Jh)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,3,4]),q((0,v.qu)(!1)),[4,(0,N.ms)(g.id)];case 1:return(e=i.sent())&&0===e.errCode&&k(e.data),[3,4];case 2:return(null==(n=i.sent())?void 0:null===(t=n.response)||void 0===t?void 0:null===(r=t.data)||void 0===r?void 0:r.errCode)===-4?(p.Am.error("Phi\xean bản đăng nhập hết hạn"),q((0,y.ni)())):(null==n?void 0:null===(d=n.response)||void 0===d?void 0:null===(a=d.data)||void 0===a?void 0:a.errCode)===2?p.Am.error("Loại sản phẩm kh\xf4ng tồn tại"):p.Am.error(null==n?void 0:null===(o=n.response)||void 0===o?void 0:null===(s=o.data)||void 0===s?void 0:s.message),[3,4];case 3:return q((0,v.qu)(!1)),[7];case 4:return[2]}})}),function(){return n.apply(this,arguments)});(0,u.useEffect)(function(){w()},[]);var D=(r=(0,t._)(function(e){var n,r,t,a,d,s,o,u,l,c,m,h;return(0,i.Jh)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,3,4]),q((0,v.qu)(!0)),[4,(0,N.Fs)({id:S.id,productTypeId:e.typeID,productTypeName:e.typeName})];case 1:return(n=i.sent())&&0===n.errCode&&(p.Am.success("Cập nhật th\xf4ng loại sản phẩm th\xe0nh c\xf4ng"),q((0,x.A6)(1)),P.push("/product-type")),[3,4];case 2:return(null==(r=i.sent())?void 0:null===(a=r.response)||void 0===a?void 0:null===(t=a.data)||void 0===t?void 0:t.errCode)===2?p.Am.error("M\xe3 loại sản phẩm đ\xe3 tồn tại"):(null==r?void 0:null===(s=r.response)||void 0===s?void 0:null===(d=s.data)||void 0===d?void 0:d.errCode)===3?p.Am.error("T\xean loại sản phẩm đ\xe3 tồn tại"):(null==r?void 0:null===(u=r.response)||void 0===u?void 0:null===(o=u.data)||void 0===o?void 0:o.errCode)===4?p.Am.error("Loại sản phẩm kh\xf4ng tồn tại"):(null==r?void 0:null===(c=r.response)||void 0===c?void 0:null===(l=c.data)||void 0===l?void 0:l.errCode)===-4?(p.Am.error("Phi\xean bản đăng nhập hết hạn"),q((0,y.ni)())):p.Am.error(null==r?void 0:null===(h=r.response)||void 0===h?void 0:null===(m=h.data)||void 0===m?void 0:m.message),[3,4];case 3:return q((0,v.qu)(!1)),[7];case 4:return[2]}})}),function(e){return r.apply(this,arguments)});return(0,o.jsxs)("form",{onSubmit:j(D),className:"model-add-update",children:[(0,o.jsx)("h1",{className:"model-add-update-header",children:"Sửa loại sản phẩm"}),(0,o.jsx)("div",{className:"modal-add-update-input-wrapper",children:(0,o.jsxs)("div",{className:"modal-add-update-input modal-add-update-input-flex",children:[(0,o.jsx)("p",{className:"modal-add-update-input-label",children:"M\xe3 loại sản phẩm"}),(0,o.jsx)(l.Qr,{control:C,name:"typeID",rules:{required:"Nhập m\xe3 loại sản phẩm"},defaultValue:"",render:function(e){var n=e.field;return(0,o.jsx)(c.Z,(0,d._)((0,a._)({},n),{error:!!I.typeID,variant:"filled",hiddenLabel:!0,size:"small",InputProps:{style:{fontSize:"var(--text-fontSize)"}},className:"modal-add-update-input-text-field"}))}}),I.typeID&&(0,o.jsx)("p",{className:"error-message",children:I.typeID.message})]})}),(0,o.jsx)("div",{className:"modal-add-update-input-wrapper",children:(0,o.jsxs)("div",{className:"modal-add-update-input modal-add-update-input-flex",children:[(0,o.jsx)("p",{className:"modal-add-update-input-label",children:"T\xean loại sản phẩm"}),(0,o.jsx)(l.Qr,{control:C,name:"typeName",rules:{required:"Nhập t\xean loại sản phẩm"},defaultValue:"",render:function(e){var n=e.field;return(0,o.jsx)(c.Z,(0,d._)((0,a._)({},n),{error:!!I.typeName,variant:"filled",hiddenLabel:!0,InputProps:{style:{fontSize:"var(--text-fontSize)"}},className:"modal-add-update-input-text-field"}))}}),I.typeName&&(0,o.jsx)("p",{className:"error-message",children:I.typeName.message})]})}),(0,o.jsx)(m.Z,{type:"submit",variant:"contained",className:"btn",children:"Cập nhật"})]})}},32141:function(e,n,r){"use strict";r.d(n,{A6:function(){return a}});var t=(0,r(34036).oM)({name:"pagination",initialState:{page:1},reducers:{handleChangePage:function(e,n){e.page=n.payload}}}),a=t.actions.handleChangePage;n.ZP=t.reducer}},function(e){e.O(0,[2171,9931,8436,1159,4444,8113,9343,769,2268,2416,2971,7023,1744],function(){return e(e.s=11391)}),_N_E=e.O()}]);