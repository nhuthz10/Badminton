(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4138],{32450:function(n,t,e){Promise.resolve().then(e.bind(e,38935))},38935:function(n,t,e){"use strict";e.r(t);var o=e(61943),l=e(47002),r=e(11735),s=e(57437),i=e(27169),a=e(21159),u=e(2265),c=e(28325);e(80514),t.default=function(n){var t,e=n.params,d=(0,l._)((0,u.useState)({}),2),v=d[0],g=d[1],p=(0,a.I0)(),f=e.blogId.split("-"),h=f[f.length-1].toUpperCase(),m=(t=(0,o._)(function(){var n,t,e,o,l,s,a,u,d,v;return(0,r.Jh)(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,3,4]),p((0,c.OU)(!0)),[4,(0,i.w)(h)];case 1:return(n=r.sent())&&0===n.errCode&&g(null==n?void 0:n.data),[3,4];case 2:return console.log(null==(t=r.sent())?void 0:null===(o=t.response)||void 0===o?void 0:null===(e=o.data)||void 0===e?void 0:e.message),(null==t?void 0:null===(s=t.response)||void 0===s?void 0:null===(l=s.data)||void 0===l?void 0:l.errCode)===-4?(toast.error("Phi\xean bản đăng nhập hết hạn",{className:"toast-normal"}),logOut()):(null==t?void 0:null===(u=t.response)||void 0===u?void 0:null===(a=u.data)||void 0===a?void 0:a.errCode)===4?toast.error("B\xe0i viết kh\xf4ng tồn tại",{className:"toast-normal"}):toast.error(null==t?void 0:null===(v=t.response)||void 0===v?void 0:null===(d=v.data)||void 0===d?void 0:d.message,{className:"toast-normal"}),[3,4];case 3:return p((0,c.OU)(!1)),[7];case 4:return[2]}})}),function(){return t.apply(this,arguments)});return(0,u.useEffect)(function(){m()},[h]),(0,s.jsxs)("div",{className:"blog-detail-container",children:[(0,s.jsx)("h1",{className:"blog-title",children:v.title}),(0,s.jsx)("p",{className:"blog-description",children:v.description}),(0,s.jsx)("div",{className:"blog-content",dangerouslySetInnerHTML:{__html:null==v?void 0:v.contentHTML}})]})}},27169:function(n,t,e){"use strict";e.d(t,{C:function(){return l},w:function(){return r}});var o=e(15149),l=function(n,t){return o.ZP.get("/api/blog/get-all-user-blog?limit=".concat(n,"&page=").concat(t))},r=function(n){return o.ZP.get("/api/blog/get-blog?blogId=".concat(n))}},80514:function(){}},function(n){n.O(0,[4602,3216,4036,1159,8325,2971,7023,1744],function(){return n(n.s=32450)}),_N_E=n.O()}]);