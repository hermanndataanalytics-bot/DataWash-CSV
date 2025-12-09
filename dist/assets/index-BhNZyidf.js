(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function r(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(a){if(a.ep)return;a.ep=!0;const u=r(a);fetch(a.href,u)}})();var Hn={},Bi={exports:{}},A={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var me=Symbol.for("react.element"),uo=Symbol.for("react.portal"),lo=Symbol.for("react.fragment"),co=Symbol.for("react.strict_mode"),fo=Symbol.for("react.profiler"),po=Symbol.for("react.provider"),go=Symbol.for("react.context"),mo=Symbol.for("react.forward_ref"),yo=Symbol.for("react.suspense"),_o=Symbol.for("react.memo"),vo=Symbol.for("react.lazy"),ti=Symbol.iterator;function wo(n){return n===null||typeof n!="object"?null:(n=ti&&n[ti]||n["@@iterator"],typeof n=="function"?n:null)}var $i={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Hi=Object.assign,Gi={};function zt(n,t,r){this.props=n,this.context=t,this.refs=Gi,this.updater=r||$i}zt.prototype.isReactComponent={};zt.prototype.setState=function(n,t){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,t,"setState")};zt.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Wi(){}Wi.prototype=zt.prototype;function Gn(n,t,r){this.props=n,this.context=t,this.refs=Gi,this.updater=r||$i}var Wn=Gn.prototype=new Wi;Wn.constructor=Gn;Hi(Wn,zt.prototype);Wn.isPureReactComponent=!0;var ei=Array.isArray,zi=Object.prototype.hasOwnProperty,zn={current:null},qi={key:!0,ref:!0,__self:!0,__source:!0};function Ki(n,t,r){var s,a={},u=null,f=null;if(t!=null)for(s in t.ref!==void 0&&(f=t.ref),t.key!==void 0&&(u=""+t.key),t)zi.call(t,s)&&!qi.hasOwnProperty(s)&&(a[s]=t[s]);var _=arguments.length-2;if(_===1)a.children=r;else if(1<_){for(var w=Array(_),I=0;I<_;I++)w[I]=arguments[I+2];a.children=w}if(n&&n.defaultProps)for(s in _=n.defaultProps,_)a[s]===void 0&&(a[s]=_[s]);return{$$typeof:me,type:n,key:u,ref:f,props:a,_owner:zn.current}}function Eo(n,t){return{$$typeof:me,type:n.type,key:t,ref:n.ref,props:n.props,_owner:n._owner}}function qn(n){return typeof n=="object"&&n!==null&&n.$$typeof===me}function Io(n){var t={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(r){return t[r]})}var ni=/\/+/g;function Rn(n,t){return typeof n=="object"&&n!==null&&n.key!=null?Io(""+n.key):t.toString(36)}function je(n,t,r,s,a){var u=typeof n;(u==="undefined"||u==="boolean")&&(n=null);var f=!1;if(n===null)f=!0;else switch(u){case"string":case"number":f=!0;break;case"object":switch(n.$$typeof){case me:case uo:f=!0}}if(f)return f=n,a=a(f),n=s===""?"."+Rn(f,0):s,ei(a)?(r="",n!=null&&(r=n.replace(ni,"$&/")+"/"),je(a,t,r,"",function(I){return I})):a!=null&&(qn(a)&&(a=Eo(a,r+(!a.key||f&&f.key===a.key?"":(""+a.key).replace(ni,"$&/")+"/")+n)),t.push(a)),1;if(f=0,s=s===""?".":s+":",ei(n))for(var _=0;_<n.length;_++){u=n[_];var w=s+Rn(u,_);f+=je(u,t,r,w,a)}else if(w=wo(n),typeof w=="function")for(n=w.call(n),_=0;!(u=n.next()).done;)u=u.value,w=s+Rn(u,_++),f+=je(u,t,r,w,a);else if(u==="object")throw t=String(n),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return f}function Ue(n,t,r){if(n==null)return n;var s=[],a=0;return je(n,s,"","",function(u){return t.call(r,u,a++)}),s}function So(n){if(n._status===-1){var t=n._result;t=t(),t.then(function(r){(n._status===0||n._status===-1)&&(n._status=1,n._result=r)},function(r){(n._status===0||n._status===-1)&&(n._status=2,n._result=r)}),n._status===-1&&(n._status=0,n._result=t)}if(n._status===1)return n._result.default;throw n._result}var X={current:null},Be={transition:null},Ao={ReactCurrentDispatcher:X,ReactCurrentBatchConfig:Be,ReactCurrentOwner:zn};function Ji(){throw Error("act(...) is not supported in production builds of React.")}A.Children={map:Ue,forEach:function(n,t,r){Ue(n,function(){t.apply(this,arguments)},r)},count:function(n){var t=0;return Ue(n,function(){t++}),t},toArray:function(n){return Ue(n,function(t){return t})||[]},only:function(n){if(!qn(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};A.Component=zt;A.Fragment=lo;A.Profiler=fo;A.PureComponent=Gn;A.StrictMode=co;A.Suspense=yo;A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ao;A.act=Ji;A.cloneElement=function(n,t,r){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var s=Hi({},n.props),a=n.key,u=n.ref,f=n._owner;if(t!=null){if(t.ref!==void 0&&(u=t.ref,f=zn.current),t.key!==void 0&&(a=""+t.key),n.type&&n.type.defaultProps)var _=n.type.defaultProps;for(w in t)zi.call(t,w)&&!qi.hasOwnProperty(w)&&(s[w]=t[w]===void 0&&_!==void 0?_[w]:t[w])}var w=arguments.length-2;if(w===1)s.children=r;else if(1<w){_=Array(w);for(var I=0;I<w;I++)_[I]=arguments[I+2];s.children=_}return{$$typeof:me,type:n.type,key:a,ref:u,props:s,_owner:f}};A.createContext=function(n){return n={$$typeof:go,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:po,_context:n},n.Consumer=n};A.createElement=Ki;A.createFactory=function(n){var t=Ki.bind(null,n);return t.type=n,t};A.createRef=function(){return{current:null}};A.forwardRef=function(n){return{$$typeof:mo,render:n}};A.isValidElement=qn;A.lazy=function(n){return{$$typeof:vo,_payload:{_status:-1,_result:n},_init:So}};A.memo=function(n,t){return{$$typeof:_o,type:n,compare:t===void 0?null:t}};A.startTransition=function(n){var t=Be.transition;Be.transition={};try{n()}finally{Be.transition=t}};A.unstable_act=Ji;A.useCallback=function(n,t){return X.current.useCallback(n,t)};A.useContext=function(n){return X.current.useContext(n)};A.useDebugValue=function(){};A.useDeferredValue=function(n){return X.current.useDeferredValue(n)};A.useEffect=function(n,t){return X.current.useEffect(n,t)};A.useId=function(){return X.current.useId()};A.useImperativeHandle=function(n,t,r){return X.current.useImperativeHandle(n,t,r)};A.useInsertionEffect=function(n,t){return X.current.useInsertionEffect(n,t)};A.useLayoutEffect=function(n,t){return X.current.useLayoutEffect(n,t)};A.useMemo=function(n,t){return X.current.useMemo(n,t)};A.useReducer=function(n,t,r){return X.current.useReducer(n,t,r)};A.useRef=function(n){return X.current.useRef(n)};A.useState=function(n){return X.current.useState(n)};A.useSyncExternalStore=function(n,t,r){return X.current.useSyncExternalStore(n,t,r)};A.useTransition=function(){return X.current.useTransition()};A.version="18.3.1";Bi.exports=A;var To=Bi.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bo=To,Co=Symbol.for("react.element"),Po=Symbol.for("react.fragment"),Ro=Object.prototype.hasOwnProperty,No=bo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Oo={key:!0,ref:!0,__self:!0,__source:!0};function Xi(n,t,r){var s,a={},u=null,f=null;r!==void 0&&(u=""+r),t.key!==void 0&&(u=""+t.key),t.ref!==void 0&&(f=t.ref);for(s in t)Ro.call(t,s)&&!Oo.hasOwnProperty(s)&&(a[s]=t[s]);if(n&&n.defaultProps)for(s in t=n.defaultProps,t)a[s]===void 0&&(a[s]=t[s]);return{$$typeof:Co,type:n,key:u,ref:f,props:a,_owner:No.current}}Hn.Fragment=Po;Hn.jsx=Xi;Hn.jsxs=Xi;const ko=()=>{};var ri={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi=function(n){const t=[];let r=0;for(let s=0;s<n.length;s++){let a=n.charCodeAt(s);a<128?t[r++]=a:a<2048?(t[r++]=a>>6|192,t[r++]=a&63|128):(a&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(a=65536+((a&1023)<<10)+(n.charCodeAt(++s)&1023),t[r++]=a>>18|240,t[r++]=a>>12&63|128,t[r++]=a>>6&63|128,t[r++]=a&63|128):(t[r++]=a>>12|224,t[r++]=a>>6&63|128,t[r++]=a&63|128)}return t},Do=function(n){const t=[];let r=0,s=0;for(;r<n.length;){const a=n[r++];if(a<128)t[s++]=String.fromCharCode(a);else if(a>191&&a<224){const u=n[r++];t[s++]=String.fromCharCode((a&31)<<6|u&63)}else if(a>239&&a<365){const u=n[r++],f=n[r++],_=n[r++],w=((a&7)<<18|(u&63)<<12|(f&63)<<6|_&63)-65536;t[s++]=String.fromCharCode(55296+(w>>10)),t[s++]=String.fromCharCode(56320+(w&1023))}else{const u=n[r++],f=n[r++];t[s++]=String.fromCharCode((a&15)<<12|(u&63)<<6|f&63)}}return t.join("")},Qi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let a=0;a<n.length;a+=3){const u=n[a],f=a+1<n.length,_=f?n[a+1]:0,w=a+2<n.length,I=w?n[a+2]:0,O=u>>2,x=(u&3)<<4|_>>4;let D=(_&15)<<2|I>>6,q=I&63;w||(q=64,f||(D=64)),s.push(r[O],r[x],r[D],r[q])}return s.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Yi(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Do(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let a=0;a<n.length;){const u=r[n.charAt(a++)],_=a<n.length?r[n.charAt(a)]:0;++a;const I=a<n.length?r[n.charAt(a)]:64;++a;const x=a<n.length?r[n.charAt(a)]:64;if(++a,u==null||_==null||I==null||x==null)throw new Lo;const D=u<<2|_>>4;if(s.push(D),I!==64){const q=_<<4&240|I>>2;if(s.push(q),x!==64){const C=I<<6&192|x;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Lo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mo=function(n){const t=Yi(n);return Qi.encodeByteArray(t,!0)},Zi=function(n){return Mo(n).replace(/\./g,"")},ts=function(n){try{return Qi.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo=()=>Uo().__FIREBASE_DEFAULTS__,Vo=()=>{if(typeof process>"u"||typeof ri>"u")return;const n=ri.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fo=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&ts(n[1]);return t&&JSON.parse(t)},jo=()=>{try{return ko()||xo()||Vo()||Fo()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Bo=n=>{var t;return(t=jo())===null||t===void 0?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $o(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(lt())}function Ho(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Go(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Wo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zo(){try{return typeof indexedDB=="object"}catch{return!1}}function qo(){return new Promise((n,t)=>{try{let r=!0;const s="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(s);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(s),n(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{var u;t(((u=a.error)===null||u===void 0?void 0:u.message)||"")}}catch(r){t(r)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko="FirebaseError";class At extends Error{constructor(t,r,s){super(r),this.code=t,this.customData=s,this.name=Ko,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ye.prototype.create)}}class ye{constructor(t,r,s){this.service=t,this.serviceName=r,this.errors=s}create(t,...r){const s=r[0]||{},a=`${this.service}/${t}`,u=this.errors[t],f=u?Jo(u,s):"Error",_=`${this.serviceName}: ${f} (${a}).`;return new At(a,_,s)}}function Jo(n,t){return n.replace(Xo,(r,s)=>{const a=t[s];return a!=null?String(a):`<${s}?>`})}const Xo=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n){const t=[];for(const[r,s]of Object.entries(n))Array.isArray(s)?s.forEach(a=>{t.push(encodeURIComponent(r)+"="+encodeURIComponent(a))}):t.push(encodeURIComponent(r)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function Yo(n,t){const r=new Qo(n,t);return r.subscribe.bind(r)}class Qo{constructor(t,r){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=r,this.task.then(()=>{t(this)}).catch(s=>{this.error(s)})}next(t){this.forEachObserver(r=>{r.next(t)})}error(t){this.forEachObserver(r=>{r.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,r,s){let a;if(t===void 0&&r===void 0&&s===void 0)throw new Error("Missing Observer.");Zo(t,["next","error","complete"])?a=t:a={next:t,error:r,complete:s},a.next===void 0&&(a.next=Nn),a.error===void 0&&(a.error=Nn),a.complete===void 0&&(a.complete=Nn);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?a.error(this.finalError):a.complete()}catch{}}),this.observers.push(a),u}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let r=0;r<this.observers.length;r++)this.sendOne(r,t)}sendOne(t,r){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{r(this.observers[t])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Zo(n,t){if(typeof n!="object"||n===null)return!1;for(const r of t)if(r in n&&typeof n[r]=="function")return!0;return!1}function Nn(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(n){return n&&n._delegate?n._delegate:n}class Gt{constructor(t,r,s){this.name=t,this.instanceFactory=r,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const ta={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},ea=k.INFO,na={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},ra=(n,t,...r)=>{if(t<n.logLevel)return;const s=new Date().toISOString(),a=na[t];if(a)console[a](`[${s}]  ${n.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Kn{constructor(t){this.name=t,this._logLevel=ea,this._logHandler=ra,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in k))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ta[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...t),this._logHandler(this,k.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...t),this._logHandler(this,k.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,k.INFO,...t),this._logHandler(this,k.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,k.WARN,...t),this._logHandler(this,k.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...t),this._logHandler(this,k.ERROR,...t)}}const ia=(n,t)=>t.some(r=>n instanceof r);let ii,si;function sa(){return ii||(ii=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oa(){return si||(si=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rs=new WeakMap,Vn=new WeakMap,is=new WeakMap,On=new WeakMap,Jn=new WeakMap;function aa(n){const t=new Promise((r,s)=>{const a=()=>{n.removeEventListener("success",u),n.removeEventListener("error",f)},u=()=>{r(It(n.result)),a()},f=()=>{s(n.error),a()};n.addEventListener("success",u),n.addEventListener("error",f)});return t.then(r=>{r instanceof IDBCursor&&rs.set(r,n)}).catch(()=>{}),Jn.set(t,n),t}function ha(n){if(Vn.has(n))return;const t=new Promise((r,s)=>{const a=()=>{n.removeEventListener("complete",u),n.removeEventListener("error",f),n.removeEventListener("abort",f)},u=()=>{r(),a()},f=()=>{s(n.error||new DOMException("AbortError","AbortError")),a()};n.addEventListener("complete",u),n.addEventListener("error",f),n.addEventListener("abort",f)});Vn.set(n,t)}let Fn={get(n,t,r){if(n instanceof IDBTransaction){if(t==="done")return Vn.get(n);if(t==="objectStoreNames")return n.objectStoreNames||is.get(n);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return It(n[t])},set(n,t,r){return n[t]=r,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function ua(n){Fn=n(Fn)}function la(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...r){const s=n.call(kn(this),t,...r);return is.set(s,t.sort?t.sort():[t]),It(s)}:oa().includes(n)?function(...t){return n.apply(kn(this),t),It(rs.get(this))}:function(...t){return It(n.apply(kn(this),t))}}function ca(n){return typeof n=="function"?la(n):(n instanceof IDBTransaction&&ha(n),ia(n,sa())?new Proxy(n,Fn):n)}function It(n){if(n instanceof IDBRequest)return aa(n);if(On.has(n))return On.get(n);const t=ca(n);return t!==n&&(On.set(n,t),Jn.set(t,n)),t}const kn=n=>Jn.get(n);function fa(n,t,{blocked:r,upgrade:s,blocking:a,terminated:u}={}){const f=indexedDB.open(n,t),_=It(f);return s&&f.addEventListener("upgradeneeded",w=>{s(It(f.result),w.oldVersion,w.newVersion,It(f.transaction),w)}),r&&f.addEventListener("blocked",w=>r(w.oldVersion,w.newVersion,w)),_.then(w=>{u&&w.addEventListener("close",()=>u()),a&&w.addEventListener("versionchange",I=>a(I.oldVersion,I.newVersion,I))}).catch(()=>{}),_}const da=["get","getKey","getAll","getAllKeys","count"],pa=["put","add","delete","clear"],Dn=new Map;function oi(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Dn.get(t))return Dn.get(t);const r=t.replace(/FromIndex$/,""),s=t!==r,a=pa.includes(r);if(!(r in(s?IDBIndex:IDBObjectStore).prototype)||!(a||da.includes(r)))return;const u=async function(f,..._){const w=this.transaction(f,a?"readwrite":"readonly");let I=w.store;return s&&(I=I.index(_.shift())),(await Promise.all([I[r](..._),a&&w.done]))[0]};return Dn.set(t,u),u}ua(n=>({...n,get:(t,r,s)=>oi(t,r)||n.get(t,r,s),has:(t,r)=>!!oi(t,r)||n.has(t,r)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(r=>{if(ma(r)){const s=r.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(r=>r).join(" ")}}function ma(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const jn="@firebase/app",ai="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Kn("@firebase/app"),ya="@firebase/app-compat",_a="@firebase/analytics-compat",va="@firebase/analytics",wa="@firebase/app-check-compat",Ea="@firebase/app-check",Ia="@firebase/auth",Sa="@firebase/auth-compat",Aa="@firebase/database",Ta="@firebase/data-connect",ba="@firebase/database-compat",Ca="@firebase/functions",Pa="@firebase/functions-compat",Ra="@firebase/installations",Na="@firebase/installations-compat",Oa="@firebase/messaging",ka="@firebase/messaging-compat",Da="@firebase/performance",La="@firebase/performance-compat",Ma="@firebase/remote-config",Ua="@firebase/remote-config-compat",xa="@firebase/storage",Va="@firebase/storage-compat",Fa="@firebase/firestore",ja="@firebase/ai",Ba="@firebase/firestore-compat",$a="firebase",Ha="11.10.0",Ga={[jn]:"fire-core",[ya]:"fire-core-compat",[va]:"fire-analytics",[_a]:"fire-analytics-compat",[Ea]:"fire-app-check",[wa]:"fire-app-check-compat",[Ia]:"fire-auth",[Sa]:"fire-auth-compat",[Aa]:"fire-rtdb",[Ta]:"fire-data-connect",[ba]:"fire-rtdb-compat",[Ca]:"fire-fn",[Pa]:"fire-fn-compat",[Ra]:"fire-iid",[Na]:"fire-iid-compat",[Oa]:"fire-fcm",[ka]:"fire-fcm-compat",[Da]:"fire-perf",[La]:"fire-perf-compat",[Ma]:"fire-rc",[Ua]:"fire-rc-compat",[xa]:"fire-gcs",[Va]:"fire-gcs-compat",[Fa]:"fire-fst",[Ba]:"fire-fst-compat",[ja]:"fire-vertex","fire-js":"fire-js",[$a]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa=new Map,za=new Map,hi=new Map;function ui(n,t){try{n.container.addComponent(t)}catch(r){mt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,r)}}function Wt(n){const t=n.name;if(hi.has(t))return mt.debug(`There were multiple attempts to register component ${t}.`),!1;hi.set(t,n);for(const r of Wa.values())ui(r,n);for(const r of za.values())ui(r,n);return!0}function Rt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xn=new ye("app","Firebase",qa);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze=Ha;function St(n,t,r){var s;let a=(s=Ga[n])!==null&&s!==void 0?s:n;r&&(a+=`-${r}`);const u=a.match(/\s|\//),f=t.match(/\s|\//);if(u||f){const _=[`Unable to register library "${a}" with version "${t}":`];u&&_.push(`library name "${a}" contains illegal characters (whitespace or "/")`),u&&f&&_.push("and"),f&&_.push(`version name "${t}" contains illegal characters (whitespace or "/")`),mt.warn(_.join(" "));return}Wt(new Gt(`${a}-version`,()=>({library:a,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="firebase-heartbeat-database",Ja=1,ge="firebase-heartbeat-store";let Ln=null;function ss(){return Ln||(Ln=fa(Ka,Ja,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(ge)}catch(r){console.warn(r)}}}}).catch(n=>{throw Xn.create("idb-open",{originalErrorMessage:n.message})})),Ln}async function Xa(n){try{const r=(await ss()).transaction(ge),s=await r.objectStore(ge).get(os(n));return await r.done,s}catch(t){if(t instanceof At)mt.warn(t.message);else{const r=Xn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});mt.warn(r.message)}}}async function li(n,t){try{const s=(await ss()).transaction(ge,"readwrite");await s.objectStore(ge).put(t,os(n)),await s.done}catch(r){if(r instanceof At)mt.warn(r.message);else{const s=Xn.create("idb-set",{originalErrorMessage:r==null?void 0:r.message});mt.warn(s.message)}}}function os(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya=1024,Qa=30;class Za{constructor(t){this.container=t,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new eh(r),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var t,r;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),u=ci();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((r=this._heartbeatsCache)===null||r===void 0?void 0:r.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===u||this._heartbeatsCache.heartbeats.some(f=>f.date===u))return;if(this._heartbeatsCache.heartbeats.push({date:u,agent:a}),this._heartbeatsCache.heartbeats.length>Qa){const f=nh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(f,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){mt.warn(s)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const r=ci(),{heartbeatsToSend:s,unsentEntries:a}=th(this._heartbeatsCache.heartbeats),u=Zi(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=r,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),u}catch(r){return mt.warn(r),""}}}function ci(){return new Date().toISOString().substring(0,10)}function th(n,t=Ya){const r=[];let s=n.slice();for(const a of n){const u=r.find(f=>f.agent===a.agent);if(u){if(u.dates.push(a.date),fi(r)>t){u.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),fi(r)>t){r.pop();break}s=s.slice(1)}return{heartbeatsToSend:r,unsentEntries:s}}class eh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zo()?qo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const r=await Xa(this.app);return r!=null&&r.heartbeats?r:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var r;if(await this._canUseIndexedDBPromise){const a=await this.read();return li(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!==null&&r!==void 0?r:a.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var r;if(await this._canUseIndexedDBPromise){const a=await this.read();return li(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!==null&&r!==void 0?r:a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...t.heartbeats]})}else return}}function fi(n){return Zi(JSON.stringify({version:2,heartbeats:n})).length}function nh(n){if(n.length===0)return-1;let t=0,r=n[0].date;for(let s=1;s<n.length;s++)n[s].date<r&&(r=n[s].date,t=s);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(n){Wt(new Gt("platform-logger",t=>new ga(t),"PRIVATE")),Wt(new Gt("heartbeat",t=>new Za(t),"PRIVATE")),St(jn,ai,n),St(jn,ai,"esm2017"),St("fire-js","")}rh("");var ih="firebase",sh="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */St(ih,sh,"app");function as(n,t){var r={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.indexOf(s)<0&&(r[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(n);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(n,s[a])&&(r[s[a]]=n[s[a]]);return r}function hs(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const oh=hs,us=new ye("auth","Firebase",hs());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We=new Kn("@firebase/auth");function ah(n,...t){We.logLevel<=k.WARN&&We.warn(`Auth (${Ze}): ${n}`,...t)}function $e(n,...t){We.logLevel<=k.ERROR&&We.error(`Auth (${Ze}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(n,...t){throw Yn(n,...t)}function ls(n,...t){return Yn(n,...t)}function cs(n,t,r){const s=Object.assign(Object.assign({},oh()),{[t]:r});return new ye("auth","Firebase",s).create(t,{appName:n.name})}function He(n){return cs(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yn(n,...t){if(typeof n!="string"){const r=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(r,...s)}return us.create(n,...t)}function P(n,t,...r){if(!n)throw Yn(t,...r)}function le(n){const t="INTERNAL ASSERTION FAILED: "+n;throw $e(t),new Error(t)}function ze(n,t){n||le(t)}function hh(){return pi()==="http:"||pi()==="https:"}function pi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hh()||Go()||"connection"in navigator)?navigator.onLine:!0}function lh(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t,r){this.shortDelay=t,this.longDelay=r,ze(r>t,"Short delay should be less than long delay!"),this.isMobile=$o()||Wo()}get(){return uh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,t){ze(n.emulator,"Emulator should always be set here");const{url:r}=n.emulator;return t?`${r}${t.startsWith("/")?t.slice(1):t}`:r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{static initialize(t,r,s){this.fetchImpl=t,r&&(this.headersImpl=r),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;le("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;le("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;le("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ph=new _e(3e4,6e4);function ds(n,t){return n.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:n.tenantId}):t}async function tn(n,t,r,s,a={}){return ps(n,a,async()=>{let u={},f={};s&&(t==="GET"?f=s:u={body:JSON.stringify(s)});const _=ns(Object.assign({key:n.config.apiKey},f)).slice(1),w=await n._getAdditionalHeaders();w["Content-Type"]="application/json",n.languageCode&&(w["X-Firebase-Locale"]=n.languageCode);const I=Object.assign({method:t,headers:w},u);return Ho()||(I.referrerPolicy="no-referrer"),n.emulatorConfig&&es(n.emulatorConfig.host)&&(I.credentials="include"),fs.fetch()(await gs(n,n.config.apiHost,r,_),I)})}async function ps(n,t,r){n._canInitEmulator=!1;const s=Object.assign(Object.assign({},fh),t);try{const a=new gh(n),u=await Promise.race([r(),a.promise]);a.clearNetworkTimeout();const f=await u.json();if("needConfirmation"in f)throw xe(n,"account-exists-with-different-credential",f);if(u.ok&&!("errorMessage"in f))return f;{const _=u.ok?f.errorMessage:f.error.message,[w,I]=_.split(" : ");if(w==="FEDERATED_USER_ID_ALREADY_LINKED")throw xe(n,"credential-already-in-use",f);if(w==="EMAIL_EXISTS")throw xe(n,"email-already-in-use",f);if(w==="USER_DISABLED")throw xe(n,"user-disabled",f);const O=s[w]||w.toLowerCase().replace(/[_\s]+/g,"-");if(I)throw cs(n,O,I);di(n,O)}}catch(a){if(a instanceof At)throw a;di(n,"network-request-failed",{message:String(a)})}}async function gs(n,t,r,s){const a=`${t}${r}?${s}`,u=n,f=u.config.emulator?ch(n.config,a):`${n.config.apiScheme}://${a}`;return dh.includes(r)&&(await u._persistenceManagerAvailable,u._getPersistenceType()==="COOKIE")?u._getPersistence()._getFinalTarget(f).toString():f}class gh{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((r,s)=>{this.timer=setTimeout(()=>s(ls(this.auth,"network-request-failed")),ph.get())})}}function xe(n,t,r){const s={appName:n.name};r.email&&(s.email=r.email),r.phoneNumber&&(s.phoneNumber=r.phoneNumber);const a=ls(n,t,s);return a.customData._tokenResponse=r,a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mh(n,t){return tn(n,"POST","/v1/accounts:delete",t)}async function qe(n,t){return tn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function yh(n,t=!1){const r=Qe(n),s=await r.getIdToken(t),a=ms(s);P(a&&a.exp&&a.auth_time&&a.iat,r.auth,"internal-error");const u=typeof a.firebase=="object"?a.firebase:void 0,f=u==null?void 0:u.sign_in_provider;return{claims:a,token:s,authTime:ce(Mn(a.auth_time)),issuedAtTime:ce(Mn(a.iat)),expirationTime:ce(Mn(a.exp)),signInProvider:f||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function Mn(n){return Number(n)*1e3}function ms(n){const[t,r,s]=n.split(".");if(t===void 0||r===void 0||s===void 0)return $e("JWT malformed, contained fewer than 3 sections"),null;try{const a=ts(r);return a?JSON.parse(a):($e("Failed to decode base64 JWT payload"),null)}catch(a){return $e("Caught error parsing JWT payload as JSON",a==null?void 0:a.toString()),null}}function gi(n){const t=ms(n);return P(t,"internal-error"),P(typeof t.exp<"u","internal-error"),P(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bn(n,t,r=!1){if(r)return t;try{return await t}catch(s){throw s instanceof At&&_h(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function _h({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var r;if(t){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const a=((r=this.user.stsTokenManager.expirationTime)!==null&&r!==void 0?r:0)-Date.now()-3e5;return Math.max(0,a)}}schedule(t=!1){if(!this.isRunning)return;const r=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},r)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(t,r){this.createdAt=t,this.lastLoginAt=r,this._initializeTime()}_initializeTime(){this.lastSignInTime=ce(this.lastLoginAt),this.creationTime=ce(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ke(n){var t;const r=n.auth,s=await n.getIdToken(),a=await Bn(n,qe(r,{idToken:s}));P(a==null?void 0:a.users.length,r,"internal-error");const u=a.users[0];n._notifyReloadListener(u);const f=!((t=u.providerUserInfo)===null||t===void 0)&&t.length?ys(u.providerUserInfo):[],_=Eh(n.providerData,f),w=n.isAnonymous,I=!(n.email&&u.passwordHash)&&!(_!=null&&_.length),O=w?I:!1,x={uid:u.localId,displayName:u.displayName||null,photoURL:u.photoUrl||null,email:u.email||null,emailVerified:u.emailVerified||!1,phoneNumber:u.phoneNumber||null,tenantId:u.tenantId||null,providerData:_,metadata:new $n(u.createdAt,u.lastLoginAt),isAnonymous:O};Object.assign(n,x)}async function wh(n){const t=Qe(n);await Ke(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Eh(n,t){return[...n.filter(s=>!t.some(a=>a.providerId===s.providerId)),...t]}function ys(n){return n.map(t=>{var{providerId:r}=t,s=as(t,["providerId"]);return{providerId:r,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ih(n,t){const r=await ps(n,{},async()=>{const s=ns({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:a,apiKey:u}=n.config,f=await gs(n,a,"/v1/token",`key=${u}`),_=await n._getAdditionalHeaders();_["Content-Type"]="application/x-www-form-urlencoded";const w={method:"POST",headers:_,body:s};return n.emulatorConfig&&es(n.emulatorConfig.host)&&(w.credentials="include"),fs.fetch()(f,w)});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function Sh(n,t){return tn(n,"POST","/v2/accounts:revokeToken",ds(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){P(t.idToken,"internal-error"),P(typeof t.idToken<"u","internal-error"),P(typeof t.refreshToken<"u","internal-error");const r="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):gi(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,r)}updateFromIdToken(t){P(t.length!==0,"internal-error");const r=gi(t);this.updateTokensAndExpiration(t,null,r)}async getToken(t,r=!1){return!r&&this.accessToken&&!this.isExpired?this.accessToken:(P(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,r){const{accessToken:s,refreshToken:a,expiresIn:u}=await Ih(t,r);this.updateTokensAndExpiration(s,a,Number(u))}updateTokensAndExpiration(t,r,s){this.refreshToken=r||null,this.accessToken=t||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(t,r){const{refreshToken:s,accessToken:a,expirationTime:u}=r,f=new Bt;return s&&(P(typeof s=="string","internal-error",{appName:t}),f.refreshToken=s),a&&(P(typeof a=="string","internal-error",{appName:t}),f.accessToken=a),u&&(P(typeof u=="number","internal-error",{appName:t}),f.expirationTime=u),f}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Bt,this.toJSON())}_performRefresh(){return le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(n,t){P(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class ht{constructor(t){var{uid:r,auth:s,stsTokenManager:a}=t,u=as(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=r,this.auth=s,this.stsTokenManager=a,this.accessToken=a.accessToken,this.displayName=u.displayName||null,this.email=u.email||null,this.emailVerified=u.emailVerified||!1,this.phoneNumber=u.phoneNumber||null,this.photoURL=u.photoURL||null,this.isAnonymous=u.isAnonymous||!1,this.tenantId=u.tenantId||null,this.providerData=u.providerData?[...u.providerData]:[],this.metadata=new $n(u.createdAt||void 0,u.lastLoginAt||void 0)}async getIdToken(t){const r=await Bn(this,this.stsTokenManager.getToken(this.auth,t));return P(r,this.auth,"internal-error"),this.accessToken!==r&&(this.accessToken=r,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),r}getIdTokenResult(t){return yh(this,t)}reload(){return wh(this)}_assign(t){this!==t&&(P(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(r=>Object.assign({},r)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const r=new ht(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return r.metadata._copy(this.metadata),r}_onReload(t){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,r=!1){let s=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),s=!0),r&&await Ke(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Rt(this.auth.app))return Promise.reject(He(this.auth));const t=await this.getIdToken();return await Bn(this,mh(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,r){var s,a,u,f,_,w,I,O;const x=(s=r.displayName)!==null&&s!==void 0?s:void 0,D=(a=r.email)!==null&&a!==void 0?a:void 0,q=(u=r.phoneNumber)!==null&&u!==void 0?u:void 0,C=(f=r.photoURL)!==null&&f!==void 0?f:void 0,j=(_=r.tenantId)!==null&&_!==void 0?_:void 0,U=(w=r._redirectEventId)!==null&&w!==void 0?w:void 0,ct=(I=r.createdAt)!==null&&I!==void 0?I:void 0,Q=(O=r.lastLoginAt)!==null&&O!==void 0?O:void 0,{uid:$,emailVerified:et,isAnonymous:Tt,providerData:Y,stsTokenManager:m}=r;P($&&m,t,"internal-error");const l=Bt.fromJSON(this.name,m);P(typeof $=="string",t,"internal-error"),Et(x,t.name),Et(D,t.name),P(typeof et=="boolean",t,"internal-error"),P(typeof Tt=="boolean",t,"internal-error"),Et(q,t.name),Et(C,t.name),Et(j,t.name),Et(U,t.name),Et(ct,t.name),Et(Q,t.name);const d=new ht({uid:$,auth:t,email:D,emailVerified:et,displayName:x,isAnonymous:Tt,photoURL:C,phoneNumber:q,tenantId:j,stsTokenManager:l,createdAt:ct,lastLoginAt:Q});return Y&&Array.isArray(Y)&&(d.providerData=Y.map(p=>Object.assign({},p))),U&&(d._redirectEventId=U),d}static async _fromIdTokenResponse(t,r,s=!1){const a=new Bt;a.updateFromServerResponse(r);const u=new ht({uid:r.localId,auth:t,stsTokenManager:a,isAnonymous:s});return await Ke(u),u}static async _fromGetAccountInfoResponse(t,r,s){const a=r.users[0];P(a.localId!==void 0,"internal-error");const u=a.providerUserInfo!==void 0?ys(a.providerUserInfo):[],f=!(a.email&&a.passwordHash)&&!(u!=null&&u.length),_=new Bt;_.updateFromIdToken(s);const w=new ht({uid:a.localId,auth:t,stsTokenManager:_,isAnonymous:f}),I={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:u,metadata:new $n(a.createdAt,a.lastLoginAt),isAnonymous:!(a.email&&a.passwordHash)&&!(u!=null&&u.length)};return Object.assign(w,I),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi=new Map;function Ot(n){ze(n instanceof Function,"Expected a class definition");let t=mi.get(n);return t?(ze(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,mi.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,r){this.storage[t]=r}async _get(t){const r=this.storage[t];return r===void 0?null:r}async _remove(t){delete this.storage[t]}_addListener(t,r){}_removeListener(t,r){}}_s.type="NONE";const yi=_s;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(n,t,r){return`firebase:${n}:${t}:${r}`}class $t{constructor(t,r,s){this.persistence=t,this.auth=r,this.userKey=s;const{config:a,name:u}=this.auth;this.fullUserKey=Un(this.userKey,a.apiKey,u),this.fullPersistenceKey=Un("persistence",a.apiKey,u),this.boundEventHandler=r._onStorageEvent.bind(r),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const r=await qe(this.auth,{idToken:t}).catch(()=>{});return r?ht._fromGetAccountInfoResponse(this.auth,r,t):null}return ht._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const r=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,r)return this.setCurrentUser(r)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,r,s="authUser"){if(!r.length)return new $t(Ot(yi),t,s);const a=(await Promise.all(r.map(async I=>{if(await I._isAvailable())return I}))).filter(I=>I);let u=a[0]||Ot(yi);const f=Un(s,t.config.apiKey,t.name);let _=null;for(const I of r)try{const O=await I._get(f);if(O){let x;if(typeof O=="string"){const D=await qe(t,{idToken:O}).catch(()=>{});if(!D)break;x=await ht._fromGetAccountInfoResponse(t,D,O)}else x=ht._fromJSON(t,O);I!==u&&(_=x),u=I;break}}catch{}const w=a.filter(I=>I._shouldAllowMigration);return!u._shouldAllowMigration||!w.length?new $t(u,t,s):(u=w[0],_&&await u._set(f,_.toJSON()),await Promise.all(r.map(async I=>{if(I!==u)try{await I._remove(f)}catch{}})),new $t(u,t,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Ch(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Ah(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Rh(t))return"Blackberry";if(Nh(t))return"Webos";if(Th(t))return"Safari";if((t.includes("chrome/")||bh(t))&&!t.includes("edge/"))return"Chrome";if(Ph(t))return"Android";{const r=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(r);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Ah(n=lt()){return/firefox\//i.test(n)}function Th(n=lt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function bh(n=lt()){return/crios\//i.test(n)}function Ch(n=lt()){return/iemobile/i.test(n)}function Ph(n=lt()){return/android/i.test(n)}function Rh(n=lt()){return/blackberry/i.test(n)}function Nh(n=lt()){return/webos/i.test(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(n,t=[]){let r;switch(n){case"Browser":r=_i(lt());break;case"Worker":r=`${_i(lt())}-${n}`;break;default:r=n}const s=t.length?t.join(","):"FirebaseCore-web";return`${r}/JsCore/${Ze}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,r){const s=u=>new Promise((f,_)=>{try{const w=t(u);f(w)}catch(w){_(w)}});s.onAbort=r,this.queue.push(s);const a=this.queue.length-1;return()=>{this.queue[a]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const r=[];try{for(const s of this.queue)await s(t),s.onAbort&&r.push(s.onAbort)}catch(s){r.reverse();for(const a of r)try{a()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kh(n,t={}){return tn(n,"GET","/v2/passwordPolicy",ds(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=6;class Lh{constructor(t){var r,s,a,u;const f=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(r=f.minPasswordLength)!==null&&r!==void 0?r:Dh,f.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=f.maxPasswordLength),f.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=f.containsLowercaseCharacter),f.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=f.containsUppercaseCharacter),f.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=f.containsNumericCharacter),f.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=f.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(a=(s=t.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&a!==void 0?a:"",this.forceUpgradeOnSignin=(u=t.forceUpgradeOnSignin)!==null&&u!==void 0?u:!1,this.schemaVersion=t.schemaVersion}validatePassword(t){var r,s,a,u,f,_;const w={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,w),this.validatePasswordCharacterOptions(t,w),w.isValid&&(w.isValid=(r=w.meetsMinPasswordLength)!==null&&r!==void 0?r:!0),w.isValid&&(w.isValid=(s=w.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),w.isValid&&(w.isValid=(a=w.containsLowercaseLetter)!==null&&a!==void 0?a:!0),w.isValid&&(w.isValid=(u=w.containsUppercaseLetter)!==null&&u!==void 0?u:!0),w.isValid&&(w.isValid=(f=w.containsNumericCharacter)!==null&&f!==void 0?f:!0),w.isValid&&(w.isValid=(_=w.containsNonAlphanumericCharacter)!==null&&_!==void 0?_:!0),w}validatePasswordLengthOptions(t,r){const s=this.customStrengthOptions.minPasswordLength,a=this.customStrengthOptions.maxPasswordLength;s&&(r.meetsMinPasswordLength=t.length>=s),a&&(r.meetsMaxPasswordLength=t.length<=a)}validatePasswordCharacterOptions(t,r){this.updatePasswordCharacterOptionsStatuses(r,!1,!1,!1,!1);let s;for(let a=0;a<t.length;a++)s=t.charAt(a),this.updatePasswordCharacterOptionsStatuses(r,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(t,r,s,a,u){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=r)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=a)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh{constructor(t,r,s,a){this.app=t,this.heartbeatServiceProvider=r,this.appCheckServiceProvider=s,this.config=a,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vi(this),this.idTokenSubscription=new vi(this),this.beforeStateQueue=new Oh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=us,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=a.sdkClientVersion,this._persistenceManagerAvailable=new Promise(u=>this._resolvePersistenceManagerAvailable=u)}_initializeWithPersistence(t,r){return r&&(this._popupRedirectResolver=Ot(r)),this._initializationPromise=this.queue(async()=>{var s,a,u;if(!this._deleted&&(this.persistenceManager=await $t.create(this,t),(s=this._resolvePersistenceManagerAvailable)===null||s===void 0||s.call(this),!this._deleted)){if(!((a=this._popupRedirectResolver)===null||a===void 0)&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(r),this.lastNotifiedUid=((u=this.currentUser)===null||u===void 0?void 0:u.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const r=await qe(this,{idToken:t}),s=await ht._fromGetAccountInfoResponse(this,r,t);await this.directlySetCurrentUser(s)}catch(r){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",r),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var r;if(Rt(this.app)){const f=this.app.settings.authIdToken;return f?new Promise(_=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(f).then(_,_))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let a=s,u=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const f=(r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId,_=a==null?void 0:a._redirectEventId,w=await this.tryRedirectSignIn(t);(!f||f===_)&&(w!=null&&w.user)&&(a=w.user,u=!0)}if(!a)return this.directlySetCurrentUser(null);if(!a._redirectEventId){if(u)try{await this.beforeStateQueue.runMiddleware(a)}catch(f){a=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(f))}return a?this.reloadAndSetCurrentUserOrClear(a):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===a._redirectEventId?this.directlySetCurrentUser(a):this.reloadAndSetCurrentUserOrClear(a)}async tryRedirectSignIn(t){let r=null;try{r=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return r}async reloadAndSetCurrentUserOrClear(t){try{await Ke(t)}catch(r){if((r==null?void 0:r.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=lh()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Rt(this.app))return Promise.reject(He(this));const r=t?Qe(t):null;return r&&P(r.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(r&&r._clone(this))}async _updateCurrentUser(t,r=!1){if(!this._deleted)return t&&P(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),r||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Rt(this.app)?Promise.reject(He(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Rt(this.app)?Promise.reject(He(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ot(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const r=this._getPasswordPolicyInternal();return r.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):r.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await kh(this),r=new Lh(t);this.tenantId===null?this._projectPasswordPolicy=r:this._tenantPasswordPolicies[this.tenantId]=r}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new ye("auth","Firebase",t())}onAuthStateChanged(t,r,s){return this.registerStateListener(this.authStateSubscription,t,r,s)}beforeAuthStateChanged(t,r){return this.beforeStateQueue.pushCallback(t,r)}onIdTokenChanged(t,r,s){return this.registerStateListener(this.idTokenSubscription,t,r,s)}authStateReady(){return new Promise((t,r)=>{if(this.currentUser)t();else{const s=this.onAuthStateChanged(()=>{s(),t()},r)}})}async revokeAccessToken(t){if(this.currentUser){const r=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:r};this.tenantId!=null&&(s.tenantId=this.tenantId),await Sh(this,s)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,r){const s=await this.getOrInitRedirectPersistenceManager(r);return t===null?s.removeCurrentUser():s.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const r=t&&Ot(t)||this._popupRedirectResolver;P(r,this,"argument-error"),this.redirectPersistenceManager=await $t.create(this,[Ot(r._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var r,s;return this._isInitialized&&await this.queue(async()=>{}),((r=this._currentUser)===null||r===void 0?void 0:r._redirectEventId)===t?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,r;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(r=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&r!==void 0?r:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,r,s,a){if(this._deleted)return()=>{};const u=typeof r=="function"?r:r.next.bind(r);let f=!1;const _=this._isInitialized?Promise.resolve():this._initializationPromise;if(P(_,this,"internal-error"),_.then(()=>{f||u(this.currentUser)}),typeof r=="function"){const w=t.addObserver(r,s,a);return()=>{f=!0,w()}}else{const w=t.addObserver(r);return()=>{f=!0,w()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=vs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const r={"X-Client-Version":this.clientVersion};this.app.options.appId&&(r["X-Firebase-gmpid"]=this.app.options.appId);const s=await((t=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getHeartbeatsHeader());s&&(r["X-Firebase-Client"]=s);const a=await this._getAppCheckToken();return a&&(r["X-Firebase-AppCheck"]=a),r}async _getAppCheckToken(){var t;if(Rt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const r=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||t===void 0?void 0:t.getToken());return r!=null&&r.error&&ah(`Error while retrieving App Check token: ${r.error}`),r==null?void 0:r.token}}function Uh(n){return Qe(n)}class vi{constructor(t){this.auth=t,this.observer=null,this.addObserver=Yo(r=>this.observer=r)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function xh(n,t){const r=(t==null?void 0:t.persistence)||[],s=(Array.isArray(r)?r:[r]).map(Ot);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(s,t==null?void 0:t.popupRedirectResolver)}new _e(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new _e(2e3,1e4);/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new _e(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new _e(5e3,15e3);var wi="@firebase/auth",Ei="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const r=this.auth.onIdTokenChanged(s=>{t((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,r),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const r=this.internalListeners.get(t);r&&(this.internalListeners.delete(t),r(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jh(n){Wt(new Gt("auth",(t,{options:r})=>{const s=t.getProvider("app").getImmediate(),a=t.getProvider("heartbeat"),u=t.getProvider("app-check-internal"),{apiKey:f,authDomain:_}=s.options;P(f&&!f.includes(":"),"invalid-api-key",{appName:s.name});const w={apiKey:f,authDomain:_,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vs(n)},I=new Mh(s,a,u,w);return xh(I,r),I},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,r,s)=>{t.getProvider("auth-internal").initialize()})),Wt(new Gt("auth-internal",t=>{const r=Uh(t.getProvider("auth").getImmediate());return(s=>new Vh(s))(r)},"PRIVATE").setInstantiationMode("EXPLICIT")),St(wi,Ei,Fh(n)),St(wi,Ei,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh=5*60;Bo("authIdTokenMaxAge");jh("Browser");var Ii=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qn;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(m,l){function d(){}d.prototype=l.prototype,m.D=l.prototype,m.prototype=new d,m.prototype.constructor=m,m.C=function(p,g,v){for(var c=Array(arguments.length-2),ft=2;ft<arguments.length;ft++)c[ft-2]=arguments[ft];return l.prototype[g].apply(p,c)}}function r(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(s,r),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function a(m,l,d){d||(d=0);var p=Array(16);if(typeof l=="string")for(var g=0;16>g;++g)p[g]=l.charCodeAt(d++)|l.charCodeAt(d++)<<8|l.charCodeAt(d++)<<16|l.charCodeAt(d++)<<24;else for(g=0;16>g;++g)p[g]=l[d++]|l[d++]<<8|l[d++]<<16|l[d++]<<24;l=m.g[0],d=m.g[1],g=m.g[2];var v=m.g[3],c=l+(v^d&(g^v))+p[0]+3614090360&4294967295;l=d+(c<<7&4294967295|c>>>25),c=v+(g^l&(d^g))+p[1]+3905402710&4294967295,v=l+(c<<12&4294967295|c>>>20),c=g+(d^v&(l^d))+p[2]+606105819&4294967295,g=v+(c<<17&4294967295|c>>>15),c=d+(l^g&(v^l))+p[3]+3250441966&4294967295,d=g+(c<<22&4294967295|c>>>10),c=l+(v^d&(g^v))+p[4]+4118548399&4294967295,l=d+(c<<7&4294967295|c>>>25),c=v+(g^l&(d^g))+p[5]+1200080426&4294967295,v=l+(c<<12&4294967295|c>>>20),c=g+(d^v&(l^d))+p[6]+2821735955&4294967295,g=v+(c<<17&4294967295|c>>>15),c=d+(l^g&(v^l))+p[7]+4249261313&4294967295,d=g+(c<<22&4294967295|c>>>10),c=l+(v^d&(g^v))+p[8]+1770035416&4294967295,l=d+(c<<7&4294967295|c>>>25),c=v+(g^l&(d^g))+p[9]+2336552879&4294967295,v=l+(c<<12&4294967295|c>>>20),c=g+(d^v&(l^d))+p[10]+4294925233&4294967295,g=v+(c<<17&4294967295|c>>>15),c=d+(l^g&(v^l))+p[11]+2304563134&4294967295,d=g+(c<<22&4294967295|c>>>10),c=l+(v^d&(g^v))+p[12]+1804603682&4294967295,l=d+(c<<7&4294967295|c>>>25),c=v+(g^l&(d^g))+p[13]+4254626195&4294967295,v=l+(c<<12&4294967295|c>>>20),c=g+(d^v&(l^d))+p[14]+2792965006&4294967295,g=v+(c<<17&4294967295|c>>>15),c=d+(l^g&(v^l))+p[15]+1236535329&4294967295,d=g+(c<<22&4294967295|c>>>10),c=l+(g^v&(d^g))+p[1]+4129170786&4294967295,l=d+(c<<5&4294967295|c>>>27),c=v+(d^g&(l^d))+p[6]+3225465664&4294967295,v=l+(c<<9&4294967295|c>>>23),c=g+(l^d&(v^l))+p[11]+643717713&4294967295,g=v+(c<<14&4294967295|c>>>18),c=d+(v^l&(g^v))+p[0]+3921069994&4294967295,d=g+(c<<20&4294967295|c>>>12),c=l+(g^v&(d^g))+p[5]+3593408605&4294967295,l=d+(c<<5&4294967295|c>>>27),c=v+(d^g&(l^d))+p[10]+38016083&4294967295,v=l+(c<<9&4294967295|c>>>23),c=g+(l^d&(v^l))+p[15]+3634488961&4294967295,g=v+(c<<14&4294967295|c>>>18),c=d+(v^l&(g^v))+p[4]+3889429448&4294967295,d=g+(c<<20&4294967295|c>>>12),c=l+(g^v&(d^g))+p[9]+568446438&4294967295,l=d+(c<<5&4294967295|c>>>27),c=v+(d^g&(l^d))+p[14]+3275163606&4294967295,v=l+(c<<9&4294967295|c>>>23),c=g+(l^d&(v^l))+p[3]+4107603335&4294967295,g=v+(c<<14&4294967295|c>>>18),c=d+(v^l&(g^v))+p[8]+1163531501&4294967295,d=g+(c<<20&4294967295|c>>>12),c=l+(g^v&(d^g))+p[13]+2850285829&4294967295,l=d+(c<<5&4294967295|c>>>27),c=v+(d^g&(l^d))+p[2]+4243563512&4294967295,v=l+(c<<9&4294967295|c>>>23),c=g+(l^d&(v^l))+p[7]+1735328473&4294967295,g=v+(c<<14&4294967295|c>>>18),c=d+(v^l&(g^v))+p[12]+2368359562&4294967295,d=g+(c<<20&4294967295|c>>>12),c=l+(d^g^v)+p[5]+4294588738&4294967295,l=d+(c<<4&4294967295|c>>>28),c=v+(l^d^g)+p[8]+2272392833&4294967295,v=l+(c<<11&4294967295|c>>>21),c=g+(v^l^d)+p[11]+1839030562&4294967295,g=v+(c<<16&4294967295|c>>>16),c=d+(g^v^l)+p[14]+4259657740&4294967295,d=g+(c<<23&4294967295|c>>>9),c=l+(d^g^v)+p[1]+2763975236&4294967295,l=d+(c<<4&4294967295|c>>>28),c=v+(l^d^g)+p[4]+1272893353&4294967295,v=l+(c<<11&4294967295|c>>>21),c=g+(v^l^d)+p[7]+4139469664&4294967295,g=v+(c<<16&4294967295|c>>>16),c=d+(g^v^l)+p[10]+3200236656&4294967295,d=g+(c<<23&4294967295|c>>>9),c=l+(d^g^v)+p[13]+681279174&4294967295,l=d+(c<<4&4294967295|c>>>28),c=v+(l^d^g)+p[0]+3936430074&4294967295,v=l+(c<<11&4294967295|c>>>21),c=g+(v^l^d)+p[3]+3572445317&4294967295,g=v+(c<<16&4294967295|c>>>16),c=d+(g^v^l)+p[6]+76029189&4294967295,d=g+(c<<23&4294967295|c>>>9),c=l+(d^g^v)+p[9]+3654602809&4294967295,l=d+(c<<4&4294967295|c>>>28),c=v+(l^d^g)+p[12]+3873151461&4294967295,v=l+(c<<11&4294967295|c>>>21),c=g+(v^l^d)+p[15]+530742520&4294967295,g=v+(c<<16&4294967295|c>>>16),c=d+(g^v^l)+p[2]+3299628645&4294967295,d=g+(c<<23&4294967295|c>>>9),c=l+(g^(d|~v))+p[0]+4096336452&4294967295,l=d+(c<<6&4294967295|c>>>26),c=v+(d^(l|~g))+p[7]+1126891415&4294967295,v=l+(c<<10&4294967295|c>>>22),c=g+(l^(v|~d))+p[14]+2878612391&4294967295,g=v+(c<<15&4294967295|c>>>17),c=d+(v^(g|~l))+p[5]+4237533241&4294967295,d=g+(c<<21&4294967295|c>>>11),c=l+(g^(d|~v))+p[12]+1700485571&4294967295,l=d+(c<<6&4294967295|c>>>26),c=v+(d^(l|~g))+p[3]+2399980690&4294967295,v=l+(c<<10&4294967295|c>>>22),c=g+(l^(v|~d))+p[10]+4293915773&4294967295,g=v+(c<<15&4294967295|c>>>17),c=d+(v^(g|~l))+p[1]+2240044497&4294967295,d=g+(c<<21&4294967295|c>>>11),c=l+(g^(d|~v))+p[8]+1873313359&4294967295,l=d+(c<<6&4294967295|c>>>26),c=v+(d^(l|~g))+p[15]+4264355552&4294967295,v=l+(c<<10&4294967295|c>>>22),c=g+(l^(v|~d))+p[6]+2734768916&4294967295,g=v+(c<<15&4294967295|c>>>17),c=d+(v^(g|~l))+p[13]+1309151649&4294967295,d=g+(c<<21&4294967295|c>>>11),c=l+(g^(d|~v))+p[4]+4149444226&4294967295,l=d+(c<<6&4294967295|c>>>26),c=v+(d^(l|~g))+p[11]+3174756917&4294967295,v=l+(c<<10&4294967295|c>>>22),c=g+(l^(v|~d))+p[2]+718787259&4294967295,g=v+(c<<15&4294967295|c>>>17),c=d+(v^(g|~l))+p[9]+3951481745&4294967295,m.g[0]=m.g[0]+l&4294967295,m.g[1]=m.g[1]+(g+(c<<21&4294967295|c>>>11))&4294967295,m.g[2]=m.g[2]+g&4294967295,m.g[3]=m.g[3]+v&4294967295}s.prototype.u=function(m,l){l===void 0&&(l=m.length);for(var d=l-this.blockSize,p=this.B,g=this.h,v=0;v<l;){if(g==0)for(;v<=d;)a(this,m,v),v+=this.blockSize;if(typeof m=="string"){for(;v<l;)if(p[g++]=m.charCodeAt(v++),g==this.blockSize){a(this,p),g=0;break}}else for(;v<l;)if(p[g++]=m[v++],g==this.blockSize){a(this,p),g=0;break}}this.h=g,this.o+=l},s.prototype.v=function(){var m=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);m[0]=128;for(var l=1;l<m.length-8;++l)m[l]=0;var d=8*this.o;for(l=m.length-8;l<m.length;++l)m[l]=d&255,d/=256;for(this.u(m),m=Array(16),l=d=0;4>l;++l)for(var p=0;32>p;p+=8)m[d++]=this.g[l]>>>p&255;return m};function u(m,l){var d=_;return Object.prototype.hasOwnProperty.call(d,m)?d[m]:d[m]=l(m)}function f(m,l){this.h=l;for(var d=[],p=!0,g=m.length-1;0<=g;g--){var v=m[g]|0;p&&v==l||(d[g]=v,p=!1)}this.g=d}var _={};function w(m){return-128<=m&&128>m?u(m,function(l){return new f([l|0],0>l?-1:0)}):new f([m|0],0>m?-1:0)}function I(m){if(isNaN(m)||!isFinite(m))return x;if(0>m)return U(I(-m));for(var l=[],d=1,p=0;m>=d;p++)l[p]=m/d|0,d*=4294967296;return new f(l,0)}function O(m,l){if(m.length==0)throw Error("number format error: empty string");if(l=l||10,2>l||36<l)throw Error("radix out of range: "+l);if(m.charAt(0)=="-")return U(O(m.substring(1),l));if(0<=m.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=I(Math.pow(l,8)),p=x,g=0;g<m.length;g+=8){var v=Math.min(8,m.length-g),c=parseInt(m.substring(g,g+v),l);8>v?(v=I(Math.pow(l,v)),p=p.j(v).add(I(c))):(p=p.j(d),p=p.add(I(c)))}return p}var x=w(0),D=w(1),q=w(16777216);n=f.prototype,n.m=function(){if(j(this))return-U(this).m();for(var m=0,l=1,d=0;d<this.g.length;d++){var p=this.i(d);m+=(0<=p?p:4294967296+p)*l,l*=4294967296}return m},n.toString=function(m){if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(C(this))return"0";if(j(this))return"-"+U(this).toString(m);for(var l=I(Math.pow(m,6)),d=this,p="";;){var g=et(d,l).g;d=ct(d,g.j(l));var v=((0<d.g.length?d.g[0]:d.h)>>>0).toString(m);if(d=g,C(d))return v+p;for(;6>v.length;)v="0"+v;p=v+p}},n.i=function(m){return 0>m?0:m<this.g.length?this.g[m]:this.h};function C(m){if(m.h!=0)return!1;for(var l=0;l<m.g.length;l++)if(m.g[l]!=0)return!1;return!0}function j(m){return m.h==-1}n.l=function(m){return m=ct(this,m),j(m)?-1:C(m)?0:1};function U(m){for(var l=m.g.length,d=[],p=0;p<l;p++)d[p]=~m.g[p];return new f(d,~m.h).add(D)}n.abs=function(){return j(this)?U(this):this},n.add=function(m){for(var l=Math.max(this.g.length,m.g.length),d=[],p=0,g=0;g<=l;g++){var v=p+(this.i(g)&65535)+(m.i(g)&65535),c=(v>>>16)+(this.i(g)>>>16)+(m.i(g)>>>16);p=c>>>16,v&=65535,c&=65535,d[g]=c<<16|v}return new f(d,d[d.length-1]&-2147483648?-1:0)};function ct(m,l){return m.add(U(l))}n.j=function(m){if(C(this)||C(m))return x;if(j(this))return j(m)?U(this).j(U(m)):U(U(this).j(m));if(j(m))return U(this.j(U(m)));if(0>this.l(q)&&0>m.l(q))return I(this.m()*m.m());for(var l=this.g.length+m.g.length,d=[],p=0;p<2*l;p++)d[p]=0;for(p=0;p<this.g.length;p++)for(var g=0;g<m.g.length;g++){var v=this.i(p)>>>16,c=this.i(p)&65535,ft=m.i(g)>>>16,qt=m.i(g)&65535;d[2*p+2*g]+=c*qt,Q(d,2*p+2*g),d[2*p+2*g+1]+=v*qt,Q(d,2*p+2*g+1),d[2*p+2*g+1]+=c*ft,Q(d,2*p+2*g+1),d[2*p+2*g+2]+=v*ft,Q(d,2*p+2*g+2)}for(p=0;p<l;p++)d[p]=d[2*p+1]<<16|d[2*p];for(p=l;p<2*l;p++)d[p]=0;return new f(d,0)};function Q(m,l){for(;(m[l]&65535)!=m[l];)m[l+1]+=m[l]>>>16,m[l]&=65535,l++}function $(m,l){this.g=m,this.h=l}function et(m,l){if(C(l))throw Error("division by zero");if(C(m))return new $(x,x);if(j(m))return l=et(U(m),l),new $(U(l.g),U(l.h));if(j(l))return l=et(m,U(l)),new $(U(l.g),l.h);if(30<m.g.length){if(j(m)||j(l))throw Error("slowDivide_ only works with positive integers.");for(var d=D,p=l;0>=p.l(m);)d=Tt(d),p=Tt(p);var g=Y(d,1),v=Y(p,1);for(p=Y(p,2),d=Y(d,2);!C(p);){var c=v.add(p);0>=c.l(m)&&(g=g.add(d),v=c),p=Y(p,1),d=Y(d,1)}return l=ct(m,g.j(l)),new $(g,l)}for(g=x;0<=m.l(l);){for(d=Math.max(1,Math.floor(m.m()/l.m())),p=Math.ceil(Math.log(d)/Math.LN2),p=48>=p?1:Math.pow(2,p-48),v=I(d),c=v.j(l);j(c)||0<c.l(m);)d-=p,v=I(d),c=v.j(l);C(v)&&(v=D),g=g.add(v),m=ct(m,c)}return new $(g,m)}n.A=function(m){return et(this,m).h},n.and=function(m){for(var l=Math.max(this.g.length,m.g.length),d=[],p=0;p<l;p++)d[p]=this.i(p)&m.i(p);return new f(d,this.h&m.h)},n.or=function(m){for(var l=Math.max(this.g.length,m.g.length),d=[],p=0;p<l;p++)d[p]=this.i(p)|m.i(p);return new f(d,this.h|m.h)},n.xor=function(m){for(var l=Math.max(this.g.length,m.g.length),d=[],p=0;p<l;p++)d[p]=this.i(p)^m.i(p);return new f(d,this.h^m.h)};function Tt(m){for(var l=m.g.length+1,d=[],p=0;p<l;p++)d[p]=m.i(p)<<1|m.i(p-1)>>>31;return new f(d,m.h)}function Y(m,l){var d=l>>5;l%=32;for(var p=m.g.length-d,g=[],v=0;v<p;v++)g[v]=0<l?m.i(v+d)>>>l|m.i(v+d+1)<<32-l:m.i(v+d);return new f(g,m.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,f.prototype.add=f.prototype.add,f.prototype.multiply=f.prototype.j,f.prototype.modulo=f.prototype.A,f.prototype.compare=f.prototype.l,f.prototype.toNumber=f.prototype.m,f.prototype.toString=f.prototype.toString,f.prototype.getBits=f.prototype.i,f.fromNumber=I,f.fromString=O,Qn=f}).apply(typeof Ii<"u"?Ii:typeof self<"u"?self:typeof window<"u"?window:{});var Ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(e,i,o){return e==Array.prototype||e==Object.prototype||(e[i]=o.value),e};function r(e){e=[typeof globalThis=="object"&&globalThis,e,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ve=="object"&&Ve];for(var i=0;i<e.length;++i){var o=e[i];if(o&&o.Math==Math)return o}throw Error("Cannot find global object")}var s=r(this);function a(e,i){if(i)t:{var o=s;e=e.split(".");for(var h=0;h<e.length-1;h++){var y=e[h];if(!(y in o))break t;o=o[y]}e=e[e.length-1],h=o[e],i=i(h),i!=h&&i!=null&&t(o,e,{configurable:!0,writable:!0,value:i})}}function u(e,i){e instanceof String&&(e+="");var o=0,h=!1,y={next:function(){if(!h&&o<e.length){var E=o++;return{value:i(E,e[E]),done:!1}}return h=!0,{done:!0,value:void 0}}};return y[Symbol.iterator]=function(){return y},y}a("Array.prototype.values",function(e){return e||function(){return u(this,function(i,o){return o})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var f=f||{},_=this||self;function w(e){var i=typeof e;return i=i!="object"?i:e?Array.isArray(e)?"array":i:"null",i=="array"||i=="object"&&typeof e.length=="number"}function I(e){var i=typeof e;return i=="object"&&e!=null||i=="function"}function O(e,i,o){return e.call.apply(e.bind,arguments)}function x(e,i,o){if(!e)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var y=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(y,h),e.apply(i,y)}}return function(){return e.apply(i,arguments)}}function D(e,i,o){return D=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?O:x,D.apply(null,arguments)}function q(e,i){var o=Array.prototype.slice.call(arguments,1);return function(){var h=o.slice();return h.push.apply(h,arguments),e.apply(this,h)}}function C(e,i){function o(){}o.prototype=i.prototype,e.aa=i.prototype,e.prototype=new o,e.prototype.constructor=e,e.Qb=function(h,y,E){for(var S=Array(arguments.length-2),L=2;L<arguments.length;L++)S[L-2]=arguments[L];return i.prototype[y].apply(h,S)}}function j(e){const i=e.length;if(0<i){const o=Array(i);for(let h=0;h<i;h++)o[h]=e[h];return o}return[]}function U(e,i){for(let o=1;o<arguments.length;o++){const h=arguments[o];if(w(h)){const y=e.length||0,E=h.length||0;e.length=y+E;for(let S=0;S<E;S++)e[y+S]=h[S]}else e.push(h)}}class ct{constructor(i,o){this.i=i,this.j=o,this.h=0,this.g=null}get(){let i;return 0<this.h?(this.h--,i=this.g,this.g=i.next,i.next=null):i=this.i(),i}}function Q(e){return/^[\s\xa0]*$/.test(e)}function $(){var e=_.navigator;return e&&(e=e.userAgent)?e:""}function et(e){return et[" "](e),e}et[" "]=function(){};var Tt=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function Y(e,i,o){for(const h in e)i.call(o,e[h],h,e)}function m(e,i){for(const o in e)i.call(void 0,e[o],o,e)}function l(e){const i={};for(const o in e)i[o]=e[o];return i}const d="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function p(e,i){let o,h;for(let y=1;y<arguments.length;y++){h=arguments[y];for(o in h)e[o]=h[o];for(let E=0;E<d.length;E++)o=d[E],Object.prototype.hasOwnProperty.call(h,o)&&(e[o]=h[o])}}function g(e){var i=1;e=e.split(":");const o=[];for(;0<i&&e.length;)o.push(e.shift()),i--;return e.length&&o.push(e.join(":")),o}function v(e){_.setTimeout(()=>{throw e},0)}function c(){var e=nn;let i=null;return e.g&&(i=e.g,e.g=e.g.next,e.g||(e.h=null),i.next=null),i}class ft{constructor(){this.h=this.g=null}add(i,o){const h=qt.get();h.set(i,o),this.h?this.h.next=h:this.g=h,this.h=h}}var qt=new ct(()=>new bs,e=>e.reset());class bs{constructor(){this.next=this.g=this.h=null}set(i,o){this.h=i,this.g=o,this.next=null}reset(){this.next=this.g=this.h=null}}let Kt,Jt=!1,nn=new ft,nr=()=>{const e=_.Promise.resolve(void 0);Kt=()=>{e.then(Cs)}};var Cs=()=>{for(var e;e=c();){try{e.h.call(e.g)}catch(o){v(o)}var i=qt;i.j(e),100>i.h&&(i.h++,e.next=i.g,i.g=e)}Jt=!1};function yt(){this.s=this.s,this.C=this.C}yt.prototype.s=!1,yt.prototype.ma=function(){this.s||(this.s=!0,this.N())},yt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function H(e,i){this.type=e,this.g=this.target=i,this.defaultPrevented=!1}H.prototype.h=function(){this.defaultPrevented=!0};var Ps=function(){if(!_.addEventListener||!Object.defineProperty)return!1;var e=!1,i=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const o=()=>{};_.addEventListener("test",o,i),_.removeEventListener("test",o,i)}catch{}return e}();function Xt(e,i){if(H.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var o=this.type=e.type,h=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=i,i=e.relatedTarget){if(Tt){t:{try{et(i.nodeName);var y=!0;break t}catch{}y=!1}y||(i=null)}}else o=="mouseover"?i=e.fromElement:o=="mouseout"&&(i=e.toElement);this.relatedTarget=i,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=e.clientX!==void 0?e.clientX:e.pageX,this.clientY=e.clientY!==void 0?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=typeof e.pointerType=="string"?e.pointerType:Rs[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Xt.aa.h.call(this)}}C(Xt,H);var Rs={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var we="closure_listenable_"+(1e6*Math.random()|0),Ns=0;function Os(e,i,o,h,y){this.listener=e,this.proxy=null,this.src=i,this.type=o,this.capture=!!h,this.ha=y,this.key=++Ns,this.da=this.fa=!1}function Ee(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function Ie(e){this.src=e,this.g={},this.h=0}Ie.prototype.add=function(e,i,o,h,y){var E=e.toString();e=this.g[E],e||(e=this.g[E]=[],this.h++);var S=sn(e,i,h,y);return-1<S?(i=e[S],o||(i.fa=!1)):(i=new Os(i,this.src,E,!!h,y),i.fa=o,e.push(i)),i};function rn(e,i){var o=i.type;if(o in e.g){var h=e.g[o],y=Array.prototype.indexOf.call(h,i,void 0),E;(E=0<=y)&&Array.prototype.splice.call(h,y,1),E&&(Ee(i),e.g[o].length==0&&(delete e.g[o],e.h--))}}function sn(e,i,o,h){for(var y=0;y<e.length;++y){var E=e[y];if(!E.da&&E.listener==i&&E.capture==!!o&&E.ha==h)return y}return-1}var on="closure_lm_"+(1e6*Math.random()|0),an={};function rr(e,i,o,h,y){if(Array.isArray(i)){for(var E=0;E<i.length;E++)rr(e,i[E],o,h,y);return null}return o=or(o),e&&e[we]?e.K(i,o,I(h)?!!h.capture:!1,y):ks(e,i,o,!1,h,y)}function ks(e,i,o,h,y,E){if(!i)throw Error("Invalid event type");var S=I(y)?!!y.capture:!!y,L=un(e);if(L||(e[on]=L=new Ie(e)),o=L.add(i,o,h,S,E),o.proxy)return o;if(h=Ds(),o.proxy=h,h.src=e,h.listener=o,e.addEventListener)Ps||(y=S),y===void 0&&(y=!1),e.addEventListener(i.toString(),h,y);else if(e.attachEvent)e.attachEvent(sr(i.toString()),h);else if(e.addListener&&e.removeListener)e.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return o}function Ds(){function e(o){return i.call(e.src,e.listener,o)}const i=Ls;return e}function ir(e,i,o,h,y){if(Array.isArray(i))for(var E=0;E<i.length;E++)ir(e,i[E],o,h,y);else h=I(h)?!!h.capture:!!h,o=or(o),e&&e[we]?(e=e.i,i=String(i).toString(),i in e.g&&(E=e.g[i],o=sn(E,o,h,y),-1<o&&(Ee(E[o]),Array.prototype.splice.call(E,o,1),E.length==0&&(delete e.g[i],e.h--)))):e&&(e=un(e))&&(i=e.g[i.toString()],e=-1,i&&(e=sn(i,o,h,y)),(o=-1<e?i[e]:null)&&hn(o))}function hn(e){if(typeof e!="number"&&e&&!e.da){var i=e.src;if(i&&i[we])rn(i.i,e);else{var o=e.type,h=e.proxy;i.removeEventListener?i.removeEventListener(o,h,e.capture):i.detachEvent?i.detachEvent(sr(o),h):i.addListener&&i.removeListener&&i.removeListener(h),(o=un(i))?(rn(o,e),o.h==0&&(o.src=null,i[on]=null)):Ee(e)}}}function sr(e){return e in an?an[e]:an[e]="on"+e}function Ls(e,i){if(e.da)e=!0;else{i=new Xt(i,this);var o=e.listener,h=e.ha||e.src;e.fa&&hn(e),e=o.call(h,i)}return e}function un(e){return e=e[on],e instanceof Ie?e:null}var ln="__closure_events_fn_"+(1e9*Math.random()>>>0);function or(e){return typeof e=="function"?e:(e[ln]||(e[ln]=function(i){return e.handleEvent(i)}),e[ln])}function G(){yt.call(this),this.i=new Ie(this),this.M=this,this.F=null}C(G,yt),G.prototype[we]=!0,G.prototype.removeEventListener=function(e,i,o,h){ir(this,e,i,o,h)};function K(e,i){var o,h=e.F;if(h)for(o=[];h;h=h.F)o.push(h);if(e=e.M,h=i.type||i,typeof i=="string")i=new H(i,e);else if(i instanceof H)i.target=i.target||e;else{var y=i;i=new H(h,e),p(i,y)}if(y=!0,o)for(var E=o.length-1;0<=E;E--){var S=i.g=o[E];y=Se(S,h,!0,i)&&y}if(S=i.g=e,y=Se(S,h,!0,i)&&y,y=Se(S,h,!1,i)&&y,o)for(E=0;E<o.length;E++)S=i.g=o[E],y=Se(S,h,!1,i)&&y}G.prototype.N=function(){if(G.aa.N.call(this),this.i){var e=this.i,i;for(i in e.g){for(var o=e.g[i],h=0;h<o.length;h++)Ee(o[h]);delete e.g[i],e.h--}}this.F=null},G.prototype.K=function(e,i,o,h){return this.i.add(String(e),i,!1,o,h)},G.prototype.L=function(e,i,o,h){return this.i.add(String(e),i,!0,o,h)};function Se(e,i,o,h){if(i=e.i.g[String(i)],!i)return!0;i=i.concat();for(var y=!0,E=0;E<i.length;++E){var S=i[E];if(S&&!S.da&&S.capture==o){var L=S.listener,B=S.ha||S.src;S.fa&&rn(e.i,S),y=L.call(B,h)!==!1&&y}}return y&&!h.defaultPrevented}function ar(e,i,o){if(typeof e=="function")o&&(e=D(e,o));else if(e&&typeof e.handleEvent=="function")e=D(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(i)?-1:_.setTimeout(e,i||0)}function hr(e){e.g=ar(()=>{e.g=null,e.i&&(e.i=!1,hr(e))},e.l);const i=e.h;e.h=null,e.m.apply(null,i)}class Ms extends yt{constructor(i,o){super(),this.m=i,this.l=o,this.h=null,this.i=!1,this.g=null}j(i){this.h=arguments,this.g?this.i=!0:hr(this)}N(){super.N(),this.g&&(_.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Yt(e){yt.call(this),this.h=e,this.g={}}C(Yt,yt);var ur=[];function lr(e){Y(e.g,function(i,o){this.g.hasOwnProperty(o)&&hn(i)},e),e.g={}}Yt.prototype.N=function(){Yt.aa.N.call(this),lr(this)},Yt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var cn=_.JSON.stringify,Us=_.JSON.parse,xs=class{stringify(e){return _.JSON.stringify(e,void 0)}parse(e){return _.JSON.parse(e,void 0)}};function fn(){}fn.prototype.h=null;function cr(e){return e.h||(e.h=e.i())}function Vs(){}var Qt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function dn(){H.call(this,"d")}C(dn,H);function pn(){H.call(this,"c")}C(pn,H);var Ut={},fr=null;function gn(){return fr=fr||new G}Ut.La="serverreachability";function dr(e){H.call(this,Ut.La,e)}C(dr,H);function Zt(e){const i=gn();K(i,new dr(i))}Ut.STAT_EVENT="statevent";function pr(e,i){H.call(this,Ut.STAT_EVENT,e),this.stat=i}C(pr,H);function J(e){const i=gn();K(i,new pr(i,e))}Ut.Ma="timingevent";function gr(e,i){H.call(this,Ut.Ma,e),this.size=i}C(gr,H);function te(e,i){if(typeof e!="function")throw Error("Fn must not be null and must be a function");return _.setTimeout(function(){e()},i)}function ee(){this.g=!0}ee.prototype.xa=function(){this.g=!1};function Fs(e,i,o,h,y,E){e.info(function(){if(e.g)if(E)for(var S="",L=E.split("&"),B=0;B<L.length;B++){var b=L[B].split("=");if(1<b.length){var W=b[0];b=b[1];var z=W.split("_");S=2<=z.length&&z[1]=="type"?S+(W+"="+b+"&"):S+(W+"=redacted&")}}else S=null;else S=E;return"XMLHTTP REQ ("+h+") [attempt "+y+"]: "+i+`
`+o+`
`+S})}function js(e,i,o,h,y,E,S){e.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+y+"]: "+i+`
`+o+`
`+E+" "+S})}function xt(e,i,o,h){e.info(function(){return"XMLHTTP TEXT ("+i+"): "+$s(e,o)+(h?" "+h:"")})}function Bs(e,i){e.info(function(){return"TIMEOUT: "+i})}ee.prototype.info=function(){};function $s(e,i){if(!e.g)return i;if(!i)return null;try{var o=JSON.parse(i);if(o){for(e=0;e<o.length;e++)if(Array.isArray(o[e])){var h=o[e];if(!(2>h.length)){var y=h[1];if(Array.isArray(y)&&!(1>y.length)){var E=y[0];if(E!="noop"&&E!="stop"&&E!="close")for(var S=1;S<y.length;S++)y[S]=""}}}}return cn(o)}catch{return i}}var mn={NO_ERROR:0,TIMEOUT:8},Hs={},yn;function Ae(){}C(Ae,fn),Ae.prototype.g=function(){return new XMLHttpRequest},Ae.prototype.i=function(){return{}},yn=new Ae;function _t(e,i,o,h){this.j=e,this.i=i,this.l=o,this.R=h||1,this.U=new Yt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new mr}function mr(){this.i=null,this.g="",this.h=!1}var yr={},_n={};function vn(e,i,o){e.L=1,e.v=Pe(dt(i)),e.m=o,e.P=!0,_r(e,null)}function _r(e,i){e.F=Date.now(),Te(e),e.A=dt(e.v);var o=e.A,h=e.R;Array.isArray(h)||(h=[String(h)]),kr(o.i,"t",h),e.C=0,o=e.j.J,e.h=new mr,e.g=Xr(e.j,o?i:null,!e.m),0<e.O&&(e.M=new Ms(D(e.Y,e,e.g),e.O)),i=e.U,o=e.g,h=e.ca;var y="readystatechange";Array.isArray(y)||(y&&(ur[0]=y.toString()),y=ur);for(var E=0;E<y.length;E++){var S=rr(o,y[E],h||i.handleEvent,!1,i.h||i);if(!S)break;i.g[S.key]=S}i=e.H?l(e.H):{},e.m?(e.u||(e.u="POST"),i["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,i)):(e.u="GET",e.g.ea(e.A,e.u,null,i)),Zt(),Fs(e.i,e.u,e.A,e.l,e.R,e.m)}_t.prototype.ca=function(e){e=e.target;const i=this.M;i&&pt(e)==3?i.j():this.Y(e)},_t.prototype.Y=function(e){try{if(e==this.g)t:{const z=pt(this.g);var i=this.g.Ba();const jt=this.g.Z();if(!(3>z)&&(z!=3||this.g&&(this.h.h||this.g.oa()||Fr(this.g)))){this.J||z!=4||i==7||(i==8||0>=jt?Zt(3):Zt(2)),wn(this);var o=this.g.Z();this.X=o;e:if(vr(this)){var h=Fr(this.g);e="";var y=h.length,E=pt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){bt(this),ne(this);var S="";break e}this.h.i=new _.TextDecoder}for(i=0;i<y;i++)this.h.h=!0,e+=this.h.i.decode(h[i],{stream:!(E&&i==y-1)});h.length=0,this.h.g+=e,this.C=0,S=this.h.g}else S=this.g.oa();if(this.o=o==200,js(this.i,this.u,this.A,this.l,this.R,z,o),this.o){if(this.T&&!this.K){e:{if(this.g){var L,B=this.g;if((L=B.g?B.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(L)){var b=L;break e}}b=null}if(o=b)xt(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,En(this,o);else{this.o=!1,this.s=3,J(12),bt(this),ne(this);break t}}if(this.P){o=!0;let nt;for(;!this.J&&this.C<S.length;)if(nt=Gs(this,S),nt==_n){z==4&&(this.s=4,J(14),o=!1),xt(this.i,this.l,null,"[Incomplete Response]");break}else if(nt==yr){this.s=4,J(15),xt(this.i,this.l,S,"[Invalid Chunk]"),o=!1;break}else xt(this.i,this.l,nt,null),En(this,nt);if(vr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||S.length!=0||this.h.h||(this.s=1,J(16),o=!1),this.o=this.o&&o,!o)xt(this.i,this.l,S,"[Invalid Chunked Response]"),bt(this),ne(this);else if(0<S.length&&!this.W){this.W=!0;var W=this.j;W.g==this&&W.ba&&!W.M&&(W.j.info("Great, no buffering proxy detected. Bytes received: "+S.length),Cn(W),W.M=!0,J(11))}}else xt(this.i,this.l,S,null),En(this,S);z==4&&bt(this),this.o&&!this.J&&(z==4?zr(this.j,this):(this.o=!1,Te(this)))}else ao(this.g),o==400&&0<S.indexOf("Unknown SID")?(this.s=3,J(12)):(this.s=0,J(13)),bt(this),ne(this)}}}catch{}finally{}};function vr(e){return e.g?e.u=="GET"&&e.L!=2&&e.j.Ca:!1}function Gs(e,i){var o=e.C,h=i.indexOf(`
`,o);return h==-1?_n:(o=Number(i.substring(o,h)),isNaN(o)?yr:(h+=1,h+o>i.length?_n:(i=i.slice(h,h+o),e.C=h+o,i)))}_t.prototype.cancel=function(){this.J=!0,bt(this)};function Te(e){e.S=Date.now()+e.I,wr(e,e.I)}function wr(e,i){if(e.B!=null)throw Error("WatchDog timer not null");e.B=te(D(e.ba,e),i)}function wn(e){e.B&&(_.clearTimeout(e.B),e.B=null)}_t.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(Bs(this.i,this.A),this.L!=2&&(Zt(),J(17)),bt(this),this.s=2,ne(this)):wr(this,this.S-e)};function ne(e){e.j.G==0||e.J||zr(e.j,e)}function bt(e){wn(e);var i=e.M;i&&typeof i.ma=="function"&&i.ma(),e.M=null,lr(e.U),e.g&&(i=e.g,e.g=null,i.abort(),i.ma())}function En(e,i){try{var o=e.j;if(o.G!=0&&(o.g==e||In(o.h,e))){if(!e.K&&In(o.h,e)&&o.G==3){try{var h=o.Da.g.parse(i)}catch{h=null}if(Array.isArray(h)&&h.length==3){var y=h;if(y[0]==0){t:if(!o.u){if(o.g)if(o.g.F+3e3<e.F)Le(o),ke(o);else break t;bn(o),J(18)}}else o.za=y[1],0<o.za-o.T&&37500>y[2]&&o.F&&o.v==0&&!o.C&&(o.C=te(D(o.Za,o),6e3));if(1>=Sr(o.h)&&o.ca){try{o.ca()}catch{}o.ca=void 0}}else Pt(o,11)}else if((e.K||o.g==e)&&Le(o),!Q(i))for(y=o.Da.g.parse(i),i=0;i<y.length;i++){let b=y[i];if(o.T=b[0],b=b[1],o.G==2)if(b[0]=="c"){o.K=b[1],o.ia=b[2];const W=b[3];W!=null&&(o.la=W,o.j.info("VER="+o.la));const z=b[4];z!=null&&(o.Aa=z,o.j.info("SVER="+o.Aa));const jt=b[5];jt!=null&&typeof jt=="number"&&0<jt&&(h=1.5*jt,o.L=h,o.j.info("backChannelRequestTimeoutMs_="+h)),h=o;const nt=e.g;if(nt){const Me=nt.g?nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Me){var E=h.h;E.g||Me.indexOf("spdy")==-1&&Me.indexOf("quic")==-1&&Me.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(Sn(E,E.h),E.h=null))}if(h.D){const Pn=nt.g?nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Pn&&(h.ya=Pn,M(h.I,h.D,Pn))}}o.G=3,o.l&&o.l.ua(),o.ba&&(o.R=Date.now()-e.F,o.j.info("Handshake RTT: "+o.R+"ms")),h=o;var S=e;if(h.qa=Jr(h,h.J?h.ia:null,h.W),S.K){Ar(h.h,S);var L=S,B=h.L;B&&(L.I=B),L.B&&(wn(L),Te(L)),h.g=S}else Gr(h);0<o.i.length&&De(o)}else b[0]!="stop"&&b[0]!="close"||Pt(o,7);else o.G==3&&(b[0]=="stop"||b[0]=="close"?b[0]=="stop"?Pt(o,7):Tn(o):b[0]!="noop"&&o.l&&o.l.ta(b),o.v=0)}}Zt(4)}catch{}}var Ws=class{constructor(e,i){this.g=e,this.map=i}};function Er(e){this.l=e||10,_.PerformanceNavigationTiming?(e=_.performance.getEntriesByType("navigation"),e=0<e.length&&(e[0].nextHopProtocol=="hq"||e[0].nextHopProtocol=="h2")):e=!!(_.chrome&&_.chrome.loadTimes&&_.chrome.loadTimes()&&_.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ir(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function Sr(e){return e.h?1:e.g?e.g.size:0}function In(e,i){return e.h?e.h==i:e.g?e.g.has(i):!1}function Sn(e,i){e.g?e.g.add(i):e.h=i}function Ar(e,i){e.h&&e.h==i?e.h=null:e.g&&e.g.has(i)&&e.g.delete(i)}Er.prototype.cancel=function(){if(this.i=Tr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const e of this.g.values())e.cancel();this.g.clear()}};function Tr(e){if(e.h!=null)return e.i.concat(e.h.D);if(e.g!=null&&e.g.size!==0){let i=e.i;for(const o of e.g.values())i=i.concat(o.D);return i}return j(e.i)}function zs(e){if(e.V&&typeof e.V=="function")return e.V();if(typeof Map<"u"&&e instanceof Map||typeof Set<"u"&&e instanceof Set)return Array.from(e.values());if(typeof e=="string")return e.split("");if(w(e)){for(var i=[],o=e.length,h=0;h<o;h++)i.push(e[h]);return i}i=[],o=0;for(h in e)i[o++]=e[h];return i}function qs(e){if(e.na&&typeof e.na=="function")return e.na();if(!e.V||typeof e.V!="function"){if(typeof Map<"u"&&e instanceof Map)return Array.from(e.keys());if(!(typeof Set<"u"&&e instanceof Set)){if(w(e)||typeof e=="string"){var i=[];e=e.length;for(var o=0;o<e;o++)i.push(o);return i}i=[],o=0;for(const h in e)i[o++]=h;return i}}}function br(e,i){if(e.forEach&&typeof e.forEach=="function")e.forEach(i,void 0);else if(w(e)||typeof e=="string")Array.prototype.forEach.call(e,i,void 0);else for(var o=qs(e),h=zs(e),y=h.length,E=0;E<y;E++)i.call(void 0,h[E],o&&o[E],e)}var Cr=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ks(e,i){if(e){e=e.split("&");for(var o=0;o<e.length;o++){var h=e[o].indexOf("="),y=null;if(0<=h){var E=e[o].substring(0,h);y=e[o].substring(h+1)}else E=e[o];i(E,y?decodeURIComponent(y.replace(/\+/g," ")):"")}}}function Ct(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof Ct){this.h=e.h,be(this,e.j),this.o=e.o,this.g=e.g,Ce(this,e.s),this.l=e.l;var i=e.i,o=new se;o.i=i.i,i.g&&(o.g=new Map(i.g),o.h=i.h),Pr(this,o),this.m=e.m}else e&&(i=String(e).match(Cr))?(this.h=!1,be(this,i[1]||"",!0),this.o=re(i[2]||""),this.g=re(i[3]||"",!0),Ce(this,i[4]),this.l=re(i[5]||"",!0),Pr(this,i[6]||"",!0),this.m=re(i[7]||"")):(this.h=!1,this.i=new se(null,this.h))}Ct.prototype.toString=function(){var e=[],i=this.j;i&&e.push(ie(i,Rr,!0),":");var o=this.g;return(o||i=="file")&&(e.push("//"),(i=this.o)&&e.push(ie(i,Rr,!0),"@"),e.push(encodeURIComponent(String(o)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o=this.s,o!=null&&e.push(":",String(o))),(o=this.l)&&(this.g&&o.charAt(0)!="/"&&e.push("/"),e.push(ie(o,o.charAt(0)=="/"?Ys:Xs,!0))),(o=this.i.toString())&&e.push("?",o),(o=this.m)&&e.push("#",ie(o,Zs)),e.join("")};function dt(e){return new Ct(e)}function be(e,i,o){e.j=o?re(i,!0):i,e.j&&(e.j=e.j.replace(/:$/,""))}function Ce(e,i){if(i){if(i=Number(i),isNaN(i)||0>i)throw Error("Bad port number "+i);e.s=i}else e.s=null}function Pr(e,i,o){i instanceof se?(e.i=i,to(e.i,e.h)):(o||(i=ie(i,Qs)),e.i=new se(i,e.h))}function M(e,i,o){e.i.set(i,o)}function Pe(e){return M(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function re(e,i){return e?i?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ie(e,i,o){return typeof e=="string"?(e=encodeURI(e).replace(i,Js),o&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Js(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(e&15).toString(16)}var Rr=/[#\/\?@]/g,Xs=/[#\?:]/g,Ys=/[#\?]/g,Qs=/[#\?@]/g,Zs=/#/g;function se(e,i){this.h=this.g=null,this.i=e||null,this.j=!!i}function vt(e){e.g||(e.g=new Map,e.h=0,e.i&&Ks(e.i,function(i,o){e.add(decodeURIComponent(i.replace(/\+/g," ")),o)}))}n=se.prototype,n.add=function(e,i){vt(this),this.i=null,e=Vt(this,e);var o=this.g.get(e);return o||this.g.set(e,o=[]),o.push(i),this.h+=1,this};function Nr(e,i){vt(e),i=Vt(e,i),e.g.has(i)&&(e.i=null,e.h-=e.g.get(i).length,e.g.delete(i))}function Or(e,i){return vt(e),i=Vt(e,i),e.g.has(i)}n.forEach=function(e,i){vt(this),this.g.forEach(function(o,h){o.forEach(function(y){e.call(i,y,h,this)},this)},this)},n.na=function(){vt(this);const e=Array.from(this.g.values()),i=Array.from(this.g.keys()),o=[];for(let h=0;h<i.length;h++){const y=e[h];for(let E=0;E<y.length;E++)o.push(i[h])}return o},n.V=function(e){vt(this);let i=[];if(typeof e=="string")Or(this,e)&&(i=i.concat(this.g.get(Vt(this,e))));else{e=Array.from(this.g.values());for(let o=0;o<e.length;o++)i=i.concat(e[o])}return i},n.set=function(e,i){return vt(this),this.i=null,e=Vt(this,e),Or(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[i]),this.h+=1,this},n.get=function(e,i){return e?(e=this.V(e),0<e.length?String(e[0]):i):i};function kr(e,i,o){Nr(e,i),0<o.length&&(e.i=null,e.g.set(Vt(e,i),j(o)),e.h+=o.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],i=Array.from(this.g.keys());for(var o=0;o<i.length;o++){var h=i[o];const E=encodeURIComponent(String(h)),S=this.V(h);for(h=0;h<S.length;h++){var y=E;S[h]!==""&&(y+="="+encodeURIComponent(String(S[h]))),e.push(y)}}return this.i=e.join("&")};function Vt(e,i){return i=String(i),e.j&&(i=i.toLowerCase()),i}function to(e,i){i&&!e.j&&(vt(e),e.i=null,e.g.forEach(function(o,h){var y=h.toLowerCase();h!=y&&(Nr(this,h),kr(this,y,o))},e)),e.j=i}function eo(e,i){const o=new ee;if(_.Image){const h=new Image;h.onload=q(wt,o,"TestLoadImage: loaded",!0,i,h),h.onerror=q(wt,o,"TestLoadImage: error",!1,i,h),h.onabort=q(wt,o,"TestLoadImage: abort",!1,i,h),h.ontimeout=q(wt,o,"TestLoadImage: timeout",!1,i,h),_.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=e}else i(!1)}function no(e,i){const o=new ee,h=new AbortController,y=setTimeout(()=>{h.abort(),wt(o,"TestPingServer: timeout",!1,i)},1e4);fetch(e,{signal:h.signal}).then(E=>{clearTimeout(y),E.ok?wt(o,"TestPingServer: ok",!0,i):wt(o,"TestPingServer: server error",!1,i)}).catch(()=>{clearTimeout(y),wt(o,"TestPingServer: error",!1,i)})}function wt(e,i,o,h,y){try{y&&(y.onload=null,y.onerror=null,y.onabort=null,y.ontimeout=null),h(o)}catch{}}function ro(){this.g=new xs}function io(e,i,o){const h=o||"";try{br(e,function(y,E){let S=y;I(y)&&(S=cn(y)),i.push(h+E+"="+encodeURIComponent(S))})}catch(y){throw i.push(h+"type="+encodeURIComponent("_badmap")),y}}function Re(e){this.l=e.Ub||null,this.j=e.eb||!1}C(Re,fn),Re.prototype.g=function(){return new Ne(this.l,this.j)},Re.prototype.i=function(e){return function(){return e}}({});function Ne(e,i){G.call(this),this.D=e,this.o=i,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ne,G),n=Ne.prototype,n.open=function(e,i){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=i,this.readyState=1,ae(this)},n.send=function(e){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const i={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(i.body=e),(this.D||_).fetch(new Request(this.A,i)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,oe(this)),this.readyState=0},n.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,ae(this)),this.g&&(this.readyState=3,ae(this),this.g)))if(this.responseType==="arraybuffer")e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof _.ReadableStream<"u"&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Dr(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))};function Dr(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}n.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var i=e.value?e.value:new Uint8Array(0);(i=this.v.decode(i,{stream:!e.done}))&&(this.response=this.responseText+=i)}e.done?oe(this):ae(this),this.readyState==3&&Dr(this)}},n.Ra=function(e){this.g&&(this.response=this.responseText=e,oe(this))},n.Qa=function(e){this.g&&(this.response=e,oe(this))},n.ga=function(){this.g&&oe(this)};function oe(e){e.readyState=4,e.l=null,e.j=null,e.v=null,ae(e)}n.setRequestHeader=function(e,i){this.u.append(e,i)},n.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],i=this.h.entries();for(var o=i.next();!o.done;)o=o.value,e.push(o[0]+": "+o[1]),o=i.next();return e.join(`\r
`)};function ae(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(Ne.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(e){this.m=e?"include":"same-origin"}});function Lr(e){let i="";return Y(e,function(o,h){i+=h,i+=":",i+=o,i+=`\r
`}),i}function An(e,i,o){t:{for(h in o){var h=!1;break t}h=!0}h||(o=Lr(o),typeof e=="string"?o!=null&&encodeURIComponent(String(o)):M(e,i,o))}function V(e){G.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(V,G);var so=/^https?$/i,oo=["POST","PUT"];n=V.prototype,n.Ha=function(e){this.J=e},n.ea=function(e,i,o,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);i=i?i.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():yn.g(),this.v=this.o?cr(this.o):cr(yn),this.g.onreadystatechange=D(this.Ea,this);try{this.B=!0,this.g.open(i,String(e),!0),this.B=!1}catch(E){Mr(this,E);return}if(e=o||"",o=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var y in h)o.set(y,h[y]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const E of h.keys())o.set(E,h.get(E));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(o.keys()).find(E=>E.toLowerCase()=="content-type"),y=_.FormData&&e instanceof _.FormData,!(0<=Array.prototype.indexOf.call(oo,i,void 0))||h||y||o.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[E,S]of o)this.g.setRequestHeader(E,S);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Vr(this),this.u=!0,this.g.send(e),this.u=!1}catch(E){Mr(this,E)}};function Mr(e,i){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=i,e.m=5,Ur(e),Oe(e)}function Ur(e){e.A||(e.A=!0,K(e,"complete"),K(e,"error"))}n.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,K(this,"complete"),K(this,"abort"),Oe(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Oe(this,!0)),V.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?xr(this):this.bb())},n.bb=function(){xr(this)};function xr(e){if(e.h&&typeof f<"u"&&(!e.v[1]||pt(e)!=4||e.Z()!=2)){if(e.u&&pt(e)==4)ar(e.Ea,0,e);else if(K(e,"readystatechange"),pt(e)==4){e.h=!1;try{const S=e.Z();t:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var i=!0;break t;default:i=!1}var o;if(!(o=i)){var h;if(h=S===0){var y=String(e.D).match(Cr)[1]||null;!y&&_.self&&_.self.location&&(y=_.self.location.protocol.slice(0,-1)),h=!so.test(y?y.toLowerCase():"")}o=h}if(o)K(e,"complete"),K(e,"success");else{e.m=6;try{var E=2<pt(e)?e.g.statusText:""}catch{E=""}e.l=E+" ["+e.Z()+"]",Ur(e)}}finally{Oe(e)}}}}function Oe(e,i){if(e.g){Vr(e);const o=e.g,h=e.v[0]?()=>{}:null;e.g=null,e.v=null,i||K(e,"ready");try{o.onreadystatechange=h}catch{}}}function Vr(e){e.I&&(_.clearTimeout(e.I),e.I=null)}n.isActive=function(){return!!this.g};function pt(e){return e.g?e.g.readyState:0}n.Z=function(){try{return 2<pt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(e){if(this.g){var i=this.g.responseText;return e&&i.indexOf(e)==0&&(i=i.substring(e.length)),Us(i)}};function Fr(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}function ao(e){const i={};e=(e.g&&2<=pt(e)&&e.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<e.length;h++){if(Q(e[h]))continue;var o=g(e[h]);const y=o[0];if(o=o[1],typeof o!="string")continue;o=o.trim();const E=i[y]||[];i[y]=E,E.push(o)}m(i,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function he(e,i,o){return o&&o.internalChannelParams&&o.internalChannelParams[e]||i}function jr(e){this.Aa=0,this.i=[],this.j=new ee,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=he("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=he("baseRetryDelayMs",5e3,e),this.cb=he("retryDelaySeedMs",1e4,e),this.Wa=he("forwardChannelMaxRetries",2,e),this.wa=he("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new Er(e&&e.concurrentRequestLimit),this.Da=new ro,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=jr.prototype,n.la=8,n.G=1,n.connect=function(e,i,o,h){J(0),this.W=e,this.H=i||{},o&&h!==void 0&&(this.H.OSID=o,this.H.OAID=h),this.F=this.X,this.I=Jr(this,null,this.W),De(this)};function Tn(e){if(Br(e),e.G==3){var i=e.U++,o=dt(e.I);if(M(o,"SID",e.K),M(o,"RID",i),M(o,"TYPE","terminate"),ue(e,o),i=new _t(e,e.j,i),i.L=2,i.v=Pe(dt(o)),o=!1,_.navigator&&_.navigator.sendBeacon)try{o=_.navigator.sendBeacon(i.v.toString(),"")}catch{}!o&&_.Image&&(new Image().src=i.v,o=!0),o||(i.g=Xr(i.j,null),i.g.ea(i.v)),i.F=Date.now(),Te(i)}Kr(e)}function ke(e){e.g&&(Cn(e),e.g.cancel(),e.g=null)}function Br(e){ke(e),e.u&&(_.clearTimeout(e.u),e.u=null),Le(e),e.h.cancel(),e.s&&(typeof e.s=="number"&&_.clearTimeout(e.s),e.s=null)}function De(e){if(!Ir(e.h)&&!e.s){e.s=!0;var i=e.Ga;Kt||nr(),Jt||(Kt(),Jt=!0),nn.add(i,e),e.B=0}}function ho(e,i){return Sr(e.h)>=e.h.j-(e.s?1:0)?!1:e.s?(e.i=i.D.concat(e.i),!0):e.G==1||e.G==2||e.B>=(e.Va?0:e.Wa)?!1:(e.s=te(D(e.Ga,e,i),qr(e,e.B)),e.B++,!0)}n.Ga=function(e){if(this.s)if(this.s=null,this.G==1){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const y=new _t(this,this.j,e);let E=this.o;if(this.S&&(E?(E=l(E),p(E,this.S)):E=this.S),this.m!==null||this.O||(y.H=E,E=null),this.P)t:{for(var i=0,o=0;o<this.i.length;o++){e:{var h=this.i[o];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break e}h=void 0}if(h===void 0)break;if(i+=h,4096<i){i=o;break t}if(i===4096||o===this.i.length-1){i=o+1;break t}}i=1e3}else i=1e3;i=Hr(this,y,i),o=dt(this.I),M(o,"RID",e),M(o,"CVER",22),this.D&&M(o,"X-HTTP-Session-Id",this.D),ue(this,o),E&&(this.O?i="headers="+encodeURIComponent(String(Lr(E)))+"&"+i:this.m&&An(o,this.m,E)),Sn(this.h,y),this.Ua&&M(o,"TYPE","init"),this.P?(M(o,"$req",i),M(o,"SID","null"),y.T=!0,vn(y,o,null)):vn(y,o,i),this.G=2}}else this.G==3&&(e?$r(this,e):this.i.length==0||Ir(this.h)||$r(this))};function $r(e,i){var o;i?o=i.l:o=e.U++;const h=dt(e.I);M(h,"SID",e.K),M(h,"RID",o),M(h,"AID",e.T),ue(e,h),e.m&&e.o&&An(h,e.m,e.o),o=new _t(e,e.j,o,e.B+1),e.m===null&&(o.H=e.o),i&&(e.i=i.D.concat(e.i)),i=Hr(e,o,1e3),o.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),Sn(e.h,o),vn(o,h,i)}function ue(e,i){e.H&&Y(e.H,function(o,h){M(i,h,o)}),e.l&&br({},function(o,h){M(i,h,o)})}function Hr(e,i,o){o=Math.min(e.i.length,o);var h=e.l?D(e.l.Na,e.l,e):null;t:{var y=e.i;let E=-1;for(;;){const S=["count="+o];E==-1?0<o?(E=y[0].g,S.push("ofs="+E)):E=0:S.push("ofs="+E);let L=!0;for(let B=0;B<o;B++){let b=y[B].g;const W=y[B].map;if(b-=E,0>b)E=Math.max(0,y[B].g-100),L=!1;else try{io(W,S,"req"+b+"_")}catch{h&&h(W)}}if(L){h=S.join("&");break t}}}return e=e.i.splice(0,o),i.D=e,h}function Gr(e){if(!e.g&&!e.u){e.Y=1;var i=e.Fa;Kt||nr(),Jt||(Kt(),Jt=!0),nn.add(i,e),e.v=0}}function bn(e){return e.g||e.u||3<=e.v?!1:(e.Y++,e.u=te(D(e.Fa,e),qr(e,e.v)),e.v++,!0)}n.Fa=function(){if(this.u=null,Wr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=te(D(this.ab,this),e)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,J(10),ke(this),Wr(this))};function Cn(e){e.A!=null&&(_.clearTimeout(e.A),e.A=null)}function Wr(e){e.g=new _t(e,e.j,"rpc",e.Y),e.m===null&&(e.g.H=e.o),e.g.O=0;var i=dt(e.qa);M(i,"RID","rpc"),M(i,"SID",e.K),M(i,"AID",e.T),M(i,"CI",e.F?"0":"1"),!e.F&&e.ja&&M(i,"TO",e.ja),M(i,"TYPE","xmlhttp"),ue(e,i),e.m&&e.o&&An(i,e.m,e.o),e.L&&(e.g.I=e.L);var o=e.g;e=e.ia,o.L=1,o.v=Pe(dt(i)),o.m=null,o.P=!0,_r(o,e)}n.Za=function(){this.C!=null&&(this.C=null,ke(this),bn(this),J(19))};function Le(e){e.C!=null&&(_.clearTimeout(e.C),e.C=null)}function zr(e,i){var o=null;if(e.g==i){Le(e),Cn(e),e.g=null;var h=2}else if(In(e.h,i))o=i.D,Ar(e.h,i),h=1;else return;if(e.G!=0){if(i.o)if(h==1){o=i.m?i.m.length:0,i=Date.now()-i.F;var y=e.B;h=gn(),K(h,new gr(h,o)),De(e)}else Gr(e);else if(y=i.s,y==3||y==0&&0<i.X||!(h==1&&ho(e,i)||h==2&&bn(e)))switch(o&&0<o.length&&(i=e.h,i.i=i.i.concat(o)),y){case 1:Pt(e,5);break;case 4:Pt(e,10);break;case 3:Pt(e,6);break;default:Pt(e,2)}}}function qr(e,i){let o=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(o*=2),o*i}function Pt(e,i){if(e.j.info("Error code "+i),i==2){var o=D(e.fb,e),h=e.Xa;const y=!h;h=new Ct(h||"//www.google.com/images/cleardot.gif"),_.location&&_.location.protocol=="http"||be(h,"https"),Pe(h),y?eo(h.toString(),o):no(h.toString(),o)}else J(2);e.G=0,e.l&&e.l.sa(i),Kr(e),Br(e)}n.fb=function(e){e?(this.j.info("Successfully pinged google.com"),J(2)):(this.j.info("Failed to ping google.com"),J(1))};function Kr(e){if(e.G=0,e.ka=[],e.l){const i=Tr(e.h);(i.length!=0||e.i.length!=0)&&(U(e.ka,i),U(e.ka,e.i),e.h.i.length=0,j(e.i),e.i.length=0),e.l.ra()}}function Jr(e,i,o){var h=o instanceof Ct?dt(o):new Ct(o);if(h.g!="")i&&(h.g=i+"."+h.g),Ce(h,h.s);else{var y=_.location;h=y.protocol,i=i?i+"."+y.hostname:y.hostname,y=+y.port;var E=new Ct(null);h&&be(E,h),i&&(E.g=i),y&&Ce(E,y),o&&(E.l=o),h=E}return o=e.D,i=e.ya,o&&i&&M(h,o,i),M(h,"VER",e.la),ue(e,h),h}function Xr(e,i,o){if(i&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return i=e.Ca&&!e.pa?new V(new Re({eb:o})):new V(e.pa),i.Ha(e.J),i}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Yr(){}n=Yr.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function tt(e,i){G.call(this),this.g=new jr(i),this.l=e,this.h=i&&i.messageUrlParams||null,e=i&&i.messageHeaders||null,i&&i.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=i&&i.initMessageHeaders||null,i&&i.messageContentType&&(e?e["X-WebChannel-Content-Type"]=i.messageContentType:e={"X-WebChannel-Content-Type":i.messageContentType}),i&&i.va&&(e?e["X-WebChannel-Client-Profile"]=i.va:e={"X-WebChannel-Client-Profile":i.va}),this.g.S=e,(e=i&&i.Sb)&&!Q(e)&&(this.g.m=e),this.v=i&&i.supportsCrossDomainXhr||!1,this.u=i&&i.sendRawJson||!1,(i=i&&i.httpSessionIdParam)&&!Q(i)&&(this.g.D=i,e=this.h,e!==null&&i in e&&(e=this.h,i in e&&delete e[i])),this.j=new Ft(this)}C(tt,G),tt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},tt.prototype.close=function(){Tn(this.g)},tt.prototype.o=function(e){var i=this.g;if(typeof e=="string"){var o={};o.__data__=e,e=o}else this.u&&(o={},o.__data__=cn(e),e=o);i.i.push(new Ws(i.Ya++,e)),i.G==3&&De(i)},tt.prototype.N=function(){this.g.l=null,delete this.j,Tn(this.g),delete this.g,tt.aa.N.call(this)};function Qr(e){dn.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var i=e.__sm__;if(i){t:{for(const o in i){e=o;break t}e=void 0}(this.i=e)&&(e=this.i,i=i!==null&&e in i?i[e]:void 0),this.data=i}else this.data=e}C(Qr,dn);function Zr(){pn.call(this),this.status=1}C(Zr,pn);function Ft(e){this.g=e}C(Ft,Yr),Ft.prototype.ua=function(){K(this.g,"a")},Ft.prototype.ta=function(e){K(this.g,new Qr(e))},Ft.prototype.sa=function(e){K(this.g,new Zr)},Ft.prototype.ra=function(){K(this.g,"b")},tt.prototype.send=tt.prototype.o,tt.prototype.open=tt.prototype.m,tt.prototype.close=tt.prototype.close,mn.NO_ERROR=0,mn.TIMEOUT=8,mn.HTTP_ERROR=6,Hs.COMPLETE="complete",Vs.EventType=Qt,Qt.OPEN="a",Qt.CLOSE="b",Qt.ERROR="c",Qt.MESSAGE="d",G.prototype.listen=G.prototype.K,V.prototype.listenOnce=V.prototype.L,V.prototype.getLastError=V.prototype.Ka,V.prototype.getLastErrorCode=V.prototype.Ba,V.prototype.getStatus=V.prototype.Z,V.prototype.getResponseJson=V.prototype.Oa,V.prototype.getResponseText=V.prototype.oa,V.prototype.send=V.prototype.ea,V.prototype.setWithCredentials=V.prototype.Ha}).apply(typeof Ve<"u"?Ve:typeof self<"u"?self:typeof window<"u"?window:{});const Si="@firebase/firestore",Ai="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Z.UNAUTHENTICATED=new Z(null),Z.GOOGLE_CREDENTIALS=new Z("google-credentials-uid"),Z.FIRST_PARTY=new Z("first-party-uid"),Z.MOCK_USER=new Z("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Kn("@firebase/firestore");function it(n,...t){if(Je.logLevel<=k.DEBUG){const r=t.map(Es);Je.debug(`Firestore (${en}): ${n}`,...r)}}function ws(n,...t){if(Je.logLevel<=k.ERROR){const r=t.map(Es);Je.error(`Firestore (${en}): ${n}`,...r)}}function Es(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(r){return JSON.stringify(r)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(n,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,Is(n,s,r)}function Is(n,t,r){let s=`FIRESTORE (${en}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(r!==void 0)try{s+=" CONTEXT: "+JSON.stringify(r)}catch{s+=" CONTEXT: "+r}throw ws(s),new Error(s)}function fe(n,t,r,s){let a="Unexpected state";typeof r=="string"?a=r:s=r,n||Is(t,a,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class N extends At{constructor(t,r){super(t,r),this.code=t,this.message=r,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(){this.promise=new Promise((t,r)=>{this.resolve=t,this.reject=r})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(t,r){this.user=r,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Hh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,r){t.enqueueRetryable(()=>r(Z.UNAUTHENTICATED))}shutdown(){}}class Gh{constructor(t){this.t=t,this.currentUser=Z.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,r){fe(this.o===void 0,42304);let s=this.i;const a=w=>this.i!==s?(s=this.i,r(w)):Promise.resolve();let u=new de;this.o=()=>{this.i++,this.currentUser=this.u(),u.resolve(),u=new de,t.enqueueRetryable(()=>a(this.currentUser))};const f=()=>{const w=u;t.enqueueRetryable(async()=>{await w.promise,await a(this.currentUser)})},_=w=>{it("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.o&&(this.auth.addAuthTokenListener(this.o),f())};this.t.onInit(w=>_(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?_(w):(it("FirebaseAuthCredentialsProvider","Auth not yet detected"),u.resolve(),u=new de)}},0),f()}getToken(){const t=this.i,r=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(r).then(s=>this.i!==t?(it("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(fe(typeof s.accessToken=="string",31837,{l:s}),new $h(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return fe(t===null||typeof t=="string",2055,{h:t}),new Z(t)}}class Wh{constructor(t,r,s){this.P=t,this.T=r,this.I=s,this.type="FirstParty",this.user=Z.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class zh{constructor(t,r,s){this.P=t,this.T=r,this.I=s}getToken(){return Promise.resolve(new Wh(this.P,this.T,this.I))}start(t,r){t.enqueueRetryable(()=>r(Z.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ti{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qh{constructor(t,r){this.V=r,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Rt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,r){fe(this.o===void 0,3512);const s=u=>{u.error!=null&&it("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${u.error.message}`);const f=u.token!==this.m;return this.m=u.token,it("FirebaseAppCheckTokenProvider",`Received ${f?"new":"existing"} token.`),f?r(u.token):Promise.resolve()};this.o=u=>{t.enqueueRetryable(()=>s(u))};const a=u=>{it("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=u,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(u=>a(u)),setTimeout(()=>{if(!this.appCheck){const u=this.V.getImmediate({optional:!0});u?a(u):it("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ti(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(r=>r?(fe(typeof r.token=="string",44558,{tokenResult:r}),this.m=r.token,new Ti(r.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),r=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(r);else for(let s=0;s<n;s++)r[s]=Math.floor(256*Math.random());return r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const a=Kh(40);for(let u=0;u<a.length;++u)s.length<20&&a[u]<r&&(s+=t.charAt(a[u]%62))}return s}}function st(n,t){return n<t?-1:n>t?1:0}function Yh(n,t){let r=0;for(;r<n.length&&r<t.length;){const s=n.codePointAt(r),a=t.codePointAt(r);if(s!==a){if(s<128&&a<128)return st(s,a);{const u=Jh(),f=Qh(u.encode(bi(n,r)),u.encode(bi(t,r)));return f!==0?f:st(s,a)}}r+=s>65535?2:1}return st(n.length,t.length)}function bi(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Qh(n,t){for(let r=0;r<n.length&&r<t.length;++r)if(n[r]!==t[r])return st(n[r],t[r]);return st(n.length,t.length)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci="__name__";class ot{constructor(t,r,s){r===void 0?r=0:r>t.length&&Xe(637,{offset:r,range:t.length}),s===void 0?s=t.length-r:s>t.length-r&&Xe(1746,{length:s,range:t.length-r}),this.segments=t,this.offset=r,this.len=s}get length(){return this.len}isEqual(t){return ot.comparator(this,t)===0}child(t){const r=this.segments.slice(this.offset,this.limit());return t instanceof ot?t.forEach(s=>{r.push(s)}):r.push(t),this.construct(r)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let r=0;r<this.length;r++)if(this.get(r)!==t.get(r))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let r=0;r<this.length;r++)if(this.get(r)!==t.get(r))return!1;return!0}forEach(t){for(let r=this.offset,s=this.limit();r<s;r++)t(this.segments[r])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,r){const s=Math.min(t.length,r.length);for(let a=0;a<s;a++){const u=ot.compareSegments(t.get(a),r.get(a));if(u!==0)return u}return st(t.length,r.length)}static compareSegments(t,r){const s=ot.isNumericId(t),a=ot.isNumericId(r);return s&&!a?-1:!s&&a?1:s&&a?ot.extractNumericId(t).compare(ot.extractNumericId(r)):Yh(t,r)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Qn.fromString(t.substring(4,t.length-2))}}class rt extends ot{construct(t,r,s){return new rt(t,r,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const r=[];for(const s of t){if(s.indexOf("//")>=0)throw new N(R.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);r.push(...s.split("/").filter(a=>a.length>0))}return new rt(r)}static emptyPath(){return new rt([])}}const Zh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Nt extends ot{construct(t,r,s){return new Nt(t,r,s)}static isValidIdentifier(t){return Zh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Nt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ci}static keyField(){return new Nt([Ci])}static fromServerFormat(t){const r=[];let s="",a=0;const u=()=>{if(s.length===0)throw new N(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);r.push(s),s=""};let f=!1;for(;a<t.length;){const _=t[a];if(_==="\\"){if(a+1===t.length)throw new N(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const w=t[a+1];if(w!=="\\"&&w!=="."&&w!=="`")throw new N(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=w,a+=2}else _==="`"?(f=!f,a++):_!=="."||f?(s+=_,a++):(u(),a++)}if(u(),f)throw new N(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Nt(r)}static emptyPath(){return new Nt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t){this.path=t}static fromPath(t){return new kt(rt.fromString(t))}static fromName(t){return new kt(rt.fromString(t).popFirst(5))}static empty(){return new kt(rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,r){return rt.comparator(t.path,r.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new kt(new rt(t.slice()))}}function tu(n,t,r,s){if(t===!0&&s===!0)throw new N(R.INVALID_ARGUMENT,`${n} and ${r} cannot be used together.`)}function eu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,t){const r={typeString:n};return t&&(r.value=t),r}function ve(n,t){if(!eu(n))throw new N(R.INVALID_ARGUMENT,"JSON must be an object");let r;for(const s in t)if(t[s]){const a=t[s].typeString,u="value"in t[s]?{value:t[s].value}:void 0;if(!(s in n)){r=`JSON missing required field: '${s}'`;break}const f=n[s];if(a&&typeof f!==a){r=`JSON field '${s}' must be a ${a}.`;break}if(u!==void 0&&f!==u.value){r=`Expected '${s}' field to equal '${u.value}'`;break}}if(r)throw new N(R.INVALID_ARGUMENT,r);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=-62135596800,Ri=1e6;class at{static now(){return at.fromMillis(Date.now())}static fromDate(t){return at.fromMillis(t.getTime())}static fromMillis(t){const r=Math.floor(t/1e3),s=Math.floor((t-1e3*r)*Ri);return new at(r,s)}constructor(t,r){if(this.seconds=t,this.nanoseconds=r,r<0)throw new N(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+r);if(r>=1e9)throw new N(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+r);if(t<Pi)throw new N(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ri}_compareTo(t){return this.seconds===t.seconds?st(this.nanoseconds,t.nanoseconds):st(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:at._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ve(t,at._jsonSchema))return new at(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Pi;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}at._jsonSchemaVersion="firestore/timestamp/1.0",at._jsonSchema={type:F("string",at._jsonSchemaVersion),seconds:F("number"),nanoseconds:F("number")};function nu(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this.binaryString=t}static fromBase64String(t){const r=function(a){try{return atob(a)}catch(u){throw typeof DOMException<"u"&&u instanceof DOMException?new ru("Invalid base64 string: "+u):u}}(t);return new Mt(r)}static fromUint8Array(t){const r=function(a){let u="";for(let f=0;f<a.length;++f)u+=String.fromCharCode(a[f]);return u}(t);return new Mt(r)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(r){return btoa(r)}(this.binaryString)}toUint8Array(){return function(r){const s=new Uint8Array(r.length);for(let a=0;a<r.length;a++)s[a]=r.charCodeAt(a);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return st(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Mt.EMPTY_BYTE_STRING=new Mt("");const Ni="(default)";class Ye{constructor(t,r){this.projectId=t,this.database=r||Ni}static empty(){return new Ye("","")}get isDefaultDatabase(){return this.database===Ni}isEqual(t){return t instanceof Ye&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(t,r=null,s=[],a=[],u=null,f="F",_=null,w=null){this.path=t,this.collectionGroup=r,this.explicitOrderBy=s,this.filters=a,this.limit=u,this.limitType=f,this.startAt=_,this.endAt=w,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function su(n){return new iu(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oi,T;(T=Oi||(Oi={}))[T.OK=0]="OK",T[T.CANCELLED=1]="CANCELLED",T[T.UNKNOWN=2]="UNKNOWN",T[T.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",T[T.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",T[T.NOT_FOUND=5]="NOT_FOUND",T[T.ALREADY_EXISTS=6]="ALREADY_EXISTS",T[T.PERMISSION_DENIED=7]="PERMISSION_DENIED",T[T.UNAUTHENTICATED=16]="UNAUTHENTICATED",T[T.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",T[T.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",T[T.ABORTED=10]="ABORTED",T[T.OUT_OF_RANGE=11]="OUT_OF_RANGE",T[T.UNIMPLEMENTED=12]="UNIMPLEMENTED",T[T.INTERNAL=13]="INTERNAL",T[T.UNAVAILABLE=14]="UNAVAILABLE",T[T.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Qn([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=1048576;function xn(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(t,r,s=1e3,a=1.5,u=6e4){this.Fi=t,this.timerId=r,this.d_=s,this.E_=a,this.A_=u,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const r=Math.floor(this.R_+this.p_()),s=Math.max(0,Date.now()-this.m_),a=Math.max(0,r-s);a>0&&it("ExponentialBackoff",`Backing off for ${a} ms (base delay: ${this.R_} ms, delay with jitter: ${r} ms, last attempt: ${s} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,a,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(t,r,s,a,u){this.asyncQueue=t,this.timerId=r,this.targetTimeMs=s,this.op=a,this.removalCallback=u,this.deferred=new de,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(f=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,r,s,a,u){const f=Date.now()+s,_=new Zn(t,r,f,a,u);return _.start(s),_}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var ki,Di;(Di=ki||(ki={})).Fa="default",Di.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uu(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="firestore.googleapis.com",Mi=!0;class Ui{constructor(t){var r,s;if(t.host===void 0){if(t.ssl!==void 0)throw new N(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lu,this.ssl=Mi}else this.host=t.host,this.ssl=(r=t.ssl)!==null&&r!==void 0?r:Mi;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=ou;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<au)throw new N(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}tu("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uu((s=t.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(u){if(u.timeoutSeconds!==void 0){if(isNaN(u.timeoutSeconds))throw new N(R.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (must not be NaN)`);if(u.timeoutSeconds<5)throw new N(R.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (minimum allowed value is 5)`);if(u.timeoutSeconds>30)throw new N(R.INVALID_ARGUMENT,`invalid long polling timeout: ${u.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(s,a){return s.timeoutSeconds===a.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class cu{constructor(t,r,s,a){this._authCredentials=t,this._appCheckCredentials=r,this._databaseId=s,this._app=a,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ui({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ui(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Hh;switch(s.type){case"firstParty":return new zh(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new N(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(r){const s=Li.get(r);s&&(it("ComponentProvider","Removing Datastore"),Li.delete(r),s.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(t,r,s){this.converter=r,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new tr(this.firestore,t,this._query)}}class ut{constructor(t,r,s){this.converter=r,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new er(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ut(this.firestore,t,this._key)}toJSON(){return{type:ut._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,r,s){if(ve(r,ut._jsonSchema))return new ut(t,s||null,new kt(rt.fromString(r.referencePath)))}}ut._jsonSchemaVersion="firestore/documentReference/1.0",ut._jsonSchema={type:F("string",ut._jsonSchemaVersion),referencePath:F("string")};class er extends tr{constructor(t,r,s){super(t,r,su(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ut(this.firestore,null,new kt(t))}withConverter(t){return new er(this.firestore,t,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi="AsyncQueue";class Vi{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new hu(this,"async_queue_retry"),this.oc=()=>{const s=xn();s&&it(xi,"Visibility state changed to "+s.visibilityState),this.F_.y_()},this._c=t;const r=xn();r&&typeof r.addEventListener=="function"&&r.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const r=xn();r&&typeof r.removeEventListener=="function"&&r.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});const r=new de;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(r.resolve,r.reject),r.promise)).then(()=>r.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!nu(t))throw t;it(xi,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){const r=this._c.then(()=>(this.nc=!0,t().catch(s=>{throw this.tc=s,this.nc=!1,ws("INTERNAL UNHANDLED ERROR: ",Fi(s)),s}).then(s=>(this.nc=!1,s))));return this._c=r,r}enqueueAfterDelay(t,r,s){this.ac(),this.sc.indexOf(t)>-1&&(r=0);const a=Zn.createAndSchedule(this,t,r,s,u=>this.lc(u));return this.ec.push(a),a}ac(){this.tc&&Xe(47125,{hc:Fi(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const r of this.ec)if(r.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((r,s)=>r.targetTimeMs-s.targetTimeMs);for(const r of this.ec)if(r.skipDelay(),t!=="all"&&r.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){const r=this.ec.indexOf(t);this.ec.splice(r,1)}}function Fi(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class fu extends cu{constructor(t,r,s,a){super(t,r,s,a),this.type="firestore",this._queue=new Vi,this._persistenceKey=(a==null?void 0:a.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Vi(t),this._firestoreClient=void 0,await t}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new gt(Mt.fromBase64String(t))}catch(r){throw new N(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(t){return new gt(Mt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:gt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ve(t,gt._jsonSchema))return gt.fromBase64String(t.bytes)}}gt._jsonSchemaVersion="firestore/bytes/1.0",gt._jsonSchema={type:F("string",gt._jsonSchemaVersion),bytes:F("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(...t){for(let r=0;r<t.length;++r)if(t[r].length===0)throw new N(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Nt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t,r){if(!isFinite(t)||t<-90||t>90)throw new N(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(r)||r<-180||r>180)throw new N(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+r);this._lat=t,this._long=r}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return st(this._lat,t._lat)||st(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Dt._jsonSchemaVersion}}static fromJSON(t){if(ve(t,Dt._jsonSchema))return new Dt(t.latitude,t.longitude)}}Dt._jsonSchemaVersion="firestore/geoPoint/1.0",Dt._jsonSchema={type:F("string",Dt._jsonSchemaVersion),latitude:F("number"),longitude:F("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t){this._values=(t||[]).map(r=>r)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(s,a){if(s.length!==a.length)return!1;for(let u=0;u<s.length;++u)if(s[u]!==a[u])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Lt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ve(t,Lt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(r=>typeof r=="number"))return new Lt(t.vectorValues);throw new N(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Lt._jsonSchemaVersion="firestore/vectorValue/1.0",Lt._jsonSchema={type:F("string",Lt._jsonSchemaVersion),vectorValues:F("object")};const du=new RegExp("[~\\*/\\[\\]]");function pu(n,t,r){if(t.search(du)>=0)throw ji(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Ss(...t.split("."))._internalPath}catch{throw ji(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function ji(n,t,r,s,a){let u=`Function ${t}() called with invalid data`;u+=". ";let f="";return new N(R.INVALID_ARGUMENT,u+n+f)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(t,r,s,a,u){this._firestore=t,this._userDataWriter=r,this._key=s,this._document=a,this._converter=u}get id(){return this._key.path.lastSegment()}get ref(){return new ut(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new gu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const r=this._document.data.field(Ts("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r)}}}class gu extends As{data(){return super.data()}}function Ts(n,t){return typeof t=="string"?pu(n,t):t instanceof Ss?t._internalPath:t._delegate._internalPath}class Fe{constructor(t,r){this.hasPendingWrites=t,this.fromCache=r}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ht extends As{constructor(t,r,s,a,u,f){super(t,r,s,a,f),this._firestore=t,this._firestoreImpl=t,this.metadata=u}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const r=new Ge(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(r,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,r={}){if(this._document){const s=this._document.data.field(Ts("DocumentSnapshot.get",t));if(s!==null)return this._userDataWriter.convertValue(s,r.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,r={};return r.type=Ht._jsonSchemaVersion,r.bundle="",r.bundleSource="DocumentSnapshot",r.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?r:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),r.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),r)}}Ht._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ht._jsonSchema={type:F("string",Ht._jsonSchemaVersion),bundleSource:F("string","DocumentSnapshot"),bundleName:F("string"),bundle:F("string")};class Ge extends Ht{data(t={}){return super.data(t)}}class pe{constructor(t,r,s,a){this._firestore=t,this._userDataWriter=r,this._snapshot=a,this.metadata=new Fe(a.hasPendingWrites,a.fromCache),this.query=s}get docs(){const t=[];return this.forEach(r=>t.push(r)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,r){this._snapshot.docs.forEach(s=>{t.call(r,new Ge(this._firestore,this._userDataWriter,s.key,s,new Fe(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const r=!!t.includeMetadataChanges;if(r&&this._snapshot.excludesMetadataChanges)throw new N(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===r||(this._cachedChanges=function(a,u){if(a._snapshot.oldDocs.isEmpty()){let f=0;return a._snapshot.docChanges.map(_=>{const w=new Ge(a._firestore,a._userDataWriter,_.doc.key,_.doc,new Fe(a._snapshot.mutatedKeys.has(_.doc.key),a._snapshot.fromCache),a.query.converter);return _.doc,{type:"added",doc:w,oldIndex:-1,newIndex:f++}})}{let f=a._snapshot.oldDocs;return a._snapshot.docChanges.filter(_=>u||_.type!==3).map(_=>{const w=new Ge(a._firestore,a._userDataWriter,_.doc.key,_.doc,new Fe(a._snapshot.mutatedKeys.has(_.doc.key),a._snapshot.fromCache),a.query.converter);let I=-1,O=-1;return _.type!==0&&(I=f.indexOf(_.doc.key),f=f.delete(_.doc.key)),_.type!==1&&(f=f.add(_.doc),O=f.indexOf(_.doc.key)),{type:mu(_.type),doc:w,oldIndex:I,newIndex:O}})}}(this,r),this._cachedChangesIncludeMetadataChanges=r),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=pe._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Xh.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const r=[],s=[],a=[];return this.docs.forEach(u=>{u._document!==null&&(r.push(u._document),s.push(this._userDataWriter.convertObjectMap(u._document.data.value.mapValue.fields,"previous")),a.push(u.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function mu(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Xe(61501,{type:n})}}pe._jsonSchemaVersion="firestore/querySnapshot/1.0",pe._jsonSchema={type:F("string",pe._jsonSchemaVersion),bundleSource:F("string","QuerySnapshot"),bundleName:F("string"),bundle:F("string")};(function(t,r=!0){(function(a){en=a})(Ze),Wt(new Gt("firestore",(s,{instanceIdentifier:a,options:u})=>{const f=s.getProvider("app").getImmediate(),_=new fu(new Gh(s.getProvider("auth-internal")),new qh(f,s.getProvider("app-check-internal")),function(I,O){if(!Object.prototype.hasOwnProperty.apply(I.options,["projectId"]))throw new N(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ye(I.options.projectId,O)}(f,a),f);return u=Object.assign({useFetchStreams:r},u),_._setSettings(u),_},"PUBLIC").setMultipleInstances(!0)),St(Si,Ai,t),St(Si,Ai,"esm2017")})();typeof __firebase_config<"u"&&JSON.parse(__firebase_config);
