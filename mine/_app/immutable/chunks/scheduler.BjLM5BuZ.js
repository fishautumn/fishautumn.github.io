function q(){}function C(t,n){for(const e in n)t[e]=n[e];return t}function P(t){return t()}function Q(){return Object.create(null)}function B(t){t.forEach(P)}function R(t){return typeof t=="function"}function V(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let h;function W(t,n){return t===n?!0:(h||(h=document.createElement("a")),h.href=n,t===h.href)}function X(t){return Object.keys(t).length===0}function D(t,...n){if(t==null){for(const i of n)i(void 0);return q}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function Y(t,n,e){t.$$.on_destroy.push(D(n,e))}function Z(t,n,e,i){if(t){const r=N(t,n,e,i);return t[0](r)}}function N(t,n,e,i){return t[1]&&i?C(e.ctx.slice(),t[1](i(n))):e.ctx}function $(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],c=Math.max(n.dirty.length,r.length);for(let u=0;u<c;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function tt(t,n,e,i,r,a){if(r){const c=N(n,e,i,a);t.p(c,r)}}function nt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let p=!1;function et(){p=!0}function it(){p=!1}function M(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function O(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let s=0;s<n.length;s++){const o=n[s];o.claim_order!==void 0&&l.push(o)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const s=n[l].claim_order,o=(r>0&&n[e[r]].claim_order<=s?r+1:M(1,r,S=>n[e[S]].claim_order,s))-1;i[l]=e[o]+1;const k=o+1;e[k]=l,r=Math.max(k,r)}const a=[],c=[];let u=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(a.push(n[l-1]);u>=l;u--)c.push(n[u]);u--}for(;u>=0;u--)c.push(n[u]);a.reverse(),c.sort((l,s)=>l.claim_order-s.claim_order);for(let l=0,s=0;l<c.length;l++){for(;s<a.length&&c[l].claim_order>=a[s].claim_order;)s++;const o=s<a.length?a[s]:null;t.insertBefore(c[l],o)}}function T(t,n){if(p){for(O(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function rt(t,n,e){p&&!e?T(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function ct(t){t.parentNode&&t.parentNode.removeChild(t)}function lt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function H(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function ut(){return v(" ")}function at(){return v("")}function st(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function ot(t){return function(n){return n.preventDefault(),t.call(this,n)}}function ft(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function _t(t){return t.dataset.svelteH}function dt(t){return Array.from(t.childNodes)}function I(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,r=!1){I(t);const a=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function L(t,n,e,i){return A(t,r=>r.nodeName===n,r=>{const a=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];e[u.name]||a.push(u.name)}a.forEach(c=>r.removeAttribute(c))},()=>i(n))}function ht(t,n,e){return L(t,n,e,H)}function z(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function mt(t){return z(t," ")}function pt(t,n){n=""+n,t.data!==n&&(t.data=n)}function bt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function F(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function yt(t,n){return new t(n)}let m;function b(t){m=t}function E(){if(!m)throw new Error("Function called outside component initialization");return m}function xt(t){E().$$.on_mount.push(t)}function gt(t){E().$$.after_update.push(t)}function vt(){const t=E();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const a=F(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,a)}),!a.defaultPrevented}return!0}}const d=[],w=[];let _=[];const x=[],j=Promise.resolve();let g=!1;function U(){g||(g=!0,j.then(J))}function Et(){return U(),j}function G(t){_.push(t)}function kt(t){x.push(t)}const y=new Set;let f=0;function J(){if(f!==0)return;const t=m;do{try{for(;f<d.length;){const n=d[f];f++,b(n),K(n.$$)}}catch(n){throw d.length=0,f=0,n}for(b(null),d.length=0,f=0;w.length;)w.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];y.has(e)||(y.add(e),e())}_.length=0}while(d.length);for(;x.length;)x.pop()();g=!1,y.clear(),b(t)}function K(t){if(t.fragment!==null){t.update(),B(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(G)}}function wt(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{B as A,Q as B,J as C,R as D,X as E,G as F,wt as G,m as H,b as I,P as J,d as K,U as L,et as M,it as N,W as O,st as P,ot as Q,vt as R,_t as S,lt as T,C as U,kt as V,$ as a,ut as b,Z as c,ht as d,H as e,dt as f,nt as g,z as h,ct as i,mt as j,rt as k,T as l,pt as m,q as n,Y as o,at as p,gt as q,xt as r,V as s,v as t,tt as u,ft as v,bt as w,w as x,yt as y,Et as z};
