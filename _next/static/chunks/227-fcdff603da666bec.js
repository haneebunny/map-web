"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[227],{9194:function(e,t,n){n.d(t,{S_:function(){return l},b2:function(){return s},nf:function(){return r},xY:function(){return o}});var a=n(4480);let o=(0,a.cn)({key:"isBottomSheetExpandedState",default:!1}),l=(0,a.cn)({key:"isBottomSheetVisibleState",default:!1}),r=(0,a.cn)({key:"noticeListState",default:[]}),s=(0,a.cn)({key:"currentParkingLotState",default:[]})},1227:function(e,t,n){n.d(t,{Z:function(){return Y}});var a=n(5893),o=n(7294),l=n(6154),r=n(1163),s=n(4480),i=n(9194);let u={keyword:"광주",parkingFee:"",page:5,pageSize:50};var c=n(2729),d=n(7242),p=n(9090);function h(){return(0,a.jsx)("div",{className:"w-full h-[10px] rounded-t-m position:relative pt-[10px] pb-[4px] ",children:(0,a.jsx)("div",{className:"w-[32px] h-[4px] rounded-sm bg-gray-400 m-auto"})})}let f=()=>{let e=new Date,t=e.getDay();return 0!==t&&6!==t},m=e=>{let t,n;let a=f(),o=new Date,l=o.getHours(),r=o.getMinutes();t=a?e.weekdayBeginTime:e.weekendBeginTime,n=a?e.weekdayEndTime:e.weekendEndTime;let[s,i]=t.split(":").map(Number),[u,c]=n.split(":").map(Number);return[(l>s||l===s&&r>=i)&&(l<u||l===u&&r<c)?"운영 중":"운영 종료",u,c]};function g(e){let{info:t}=e,[n,l]=(0,s.FV)(i.xY);f();let[r,u,c]=m(t);return(0,o.useEffect)(()=>{},[]),(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsxs)("div",{className:" p-4",children:[(0,a.jsxs)("h1",{className:"font-bold text-lg",children:["[",null==t?void 0:t.payYn,"] ",(0,a.jsx)("span",{children:null==t?void 0:t.parkingName})]}),(0,a.jsx)("p",{className:" text-sm text-slate-500",children:null==t?void 0:t.addrRoad}),!n&&(0,a.jsxs)("div",{className:"w-full  h-20 rounded-xl bg-slate-100 p-2 flex  text-[0.9rem] text-slate-900 mt-2 mb-4",children:[(0,a.jsxs)("div",{className:"h-12 m-auto flex flex-col justify-between",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-bold",children:"기본 요금 "}),"|"," ",null==t?void 0:t.rates,"원"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-bold",children:"추가 요금 "}),"|"," ",null==t?void 0:t.addTimeRate,"분 당 ",null==t?void 0:t.addRates,"원"]})]}),(0,a.jsx)("div",{className:"h-10 m-auto  border-r border-gray-400"}),(0,a.jsxs)("div",{className:"h-12 m-auto flex flex-col justify-between flex-initial",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-bold",children:"운영 시간 "}),"|","~",u,"시 ",(0,a.jsx)("span",{className:"font-bold",children:r})]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("span",{className:"font-bold",children:"주차 여석 "})," | 총 ",null==t?void 0:t.capa," 개"]})]})]}),(0,a.jsx)("h1",{className:"font-bold text-lg",children:"주차가능대수"}),(0,a.jsx)("h1",{className:"font-bold text-lg",children:"요금정보"})]}),!n&&(0,a.jsxs)("div",{className:"w-full h-14 sticky  left-0 bottom-4",children:[(0,a.jsx)("button",{className:"w-[50%] h-full bg-cyan-900 text-white",children:"상세정보"}),(0,a.jsx)("button",{className:"w-[50%] h-full bg-sky-500 text-white",children:"주차하기"})]})]})}function x(){let e=(0,c._)(["\n    display: flex;\n    flex-direction: column;\n\n    position: absolute;\n    z-index: 10;\n    top: calc(100% - 240px); /*시트가 얼마나 높이 위치할지 90->50 변경*/\n    left: 0;\n    right: 0;\n\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);\n    height: ","px;\n\n    background-color: #ffffff;\n    box-shadow: 10px 10px 10px 5px gray;\n    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */\n\n    transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/\n"]);return x=function(){return e},e}function v(e){let{info:t,setCurrentParkingLotInfo:n}=e,[l,r]=(0,o.useState)(),{sheet:u,content:c}=function(){let[e,t]=(0,o.useState)(60),[n,a]=(0,o.useState)(0),[l,r]=(0,s.FV)(i.xY),u=(0,o.useRef)(null),c=(0,o.useRef)(null),d=(0,o.useRef)({touchStart:{sheetY:0,touchY:0},touchMove:{prevTouchY:0,movingDirection:"none"},isContentAreaTouched:!1});return(0,o.useEffect)(()=>{a(window.innerHeight-160)},[]),(0,o.useEffect)(()=>{var t,n,a;let o=window.innerHeight,l=o-160,s=()=>{var t,n;let{touchMove:a,isContentAreaTouched:o}=d.current;return!o||(null===(t=u.current)||void 0===t?void 0:t.getBoundingClientRect().y)!==e||"down"===a.movingDirection&&(null===(n=c.current)||void 0===n?void 0:n.scrollTop)<=0};null===(t=u.current)||void 0===t||t.addEventListener("touchstart",e=>{var t;let{touchStart:n}=d.current;n.sheetY=null===(t=u.current)||void 0===t?void 0:t.getBoundingClientRect().y,n.touchY=e.touches[0].clientY}),null===(n=u.current)||void 0===n||n.addEventListener("touchmove",t=>{let{touchStart:n,touchMove:a}=d.current,o=t.touches[0];if(void 0===a.prevTouchY&&(a.prevTouchY=n.touchY),0===a.prevTouchY&&(a.prevTouchY=n.touchY),a.prevTouchY<o.clientY&&(a.movingDirection="down"),a.prevTouchY>o.clientY&&(r(!0),a.movingDirection="up"),s()){var i;t.preventDefault();let a=o.clientY-n.touchY,r=n.sheetY+a;r<=e&&(r=e),r>=l&&(r=l),null===(i=u.current)||void 0===i||i.style.setProperty("transform","translateY(".concat(r-l,"px)"))}else document.body.style.overflowY="hidden"}),null===(a=u.current)||void 0===a||a.addEventListener("touchend",t=>{var n;document.body.style.overflowY="auto";let{touchMove:a}=d.current,o=null===(n=u.current)||void 0===n?void 0:n.getBoundingClientRect().y;console.log(o,e);let l=()=>{(null==a?void 0:a.movingDirection)==="down"&&r(!1),(null==a?void 0:a.movingDirection)==="up"&&r(!0)};if(o!==e&&("down"===a.movingDirection&&u.current.style.setProperty("transform","translateY(0)"),"up"===a.movingDirection&&u.current.style.setProperty("transform","translateY(-30%)")),o===e){u.current.removeEventListener("transitionend",l);return}u.current.addEventListener("transitionend",l),d.current={touchStart:{sheetY:0,touchY:0},touchMove:{prevTouchY:0,movingDirection:"none"},isContentAreaTouched:!1}})},[l]),(0,o.useEffect)(()=>{var e;null===(e=c.current)||void 0===e||e.addEventListener("touchstart",()=>{d.current.isContentAreaTouched=!0})},[]),{sheet:u,content:c}}();return(0,o.useEffect)(()=>(r(window.innerHeight-60),()=>{}),[]),(0,a.jsxs)(w,{ref:u,sheetheight:l,className:"flex flex-col fixed z-10  left-0 right-0 rounded-t-md bg-white shadow-md transition-transform duration-700 ease-in-out",children:[(0,a.jsx)(h,{}),(0,a.jsx)("div",{ref:c,className:"overflow-touch",children:(0,a.jsx)(g,{info:t})})]})}let w=(0,d.Z)(p.E.div)(x(),e=>e.sheetheight);function k(){let e=(0,c._)(["\n    opacity: ",";\n    transition: opacity 0.2s;\n"]);return k=function(){return e},e}function b(){let[e,t]=(0,s.FV)(i.nf),[n,l]=(0,o.useState)(!1),[r,u]=(0,o.useState)(""),[c,d]=(0,o.useState)(""),[p,h]=(0,o.useState)("");(0,o.useEffect)(()=>{if(!e||!e[0])return;u(""),d(""),h("");let t=e[0];if(t.includes("|")){let e=null==t?void 0:t.split("|");if(2!==e.length){h(t);return}if(/\d+/.test(e[1])){var n;let t=null===(n=e[1])||void 0===n?void 0:n.replace(/\b(\d+)\b/g,"<span style='color: #00556d'>$1</span>");d(t)}else{let t=e[1];d(t)}u(e[0])}else h(t);f()},[e]);let f=()=>{l(!0),setTimeout(()=>{l(!1)},2e3)};return(0,a.jsx)(y,{isVisible:!0,className:"w-auto min-w-[300px] fixed left-[50%] top-20  -translate-x-1/2 -translate-y-1/2 z-10 flex flex-row justify-center items-center",children:(0,a.jsxs)("div",{className:"px-3 py-1  text-white bg-opacity-80 bg-[#5db5a8]   rounded-2xl",children:[r&&c&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("span",{className:"font-bold",children:["[",r,"] "]}),(0,a.jsx)("span",{dangerouslySetInnerHTML:{__html:c}})]}),p&&(0,a.jsx)("span",{children:p})]})})}let y=d.Z.div(k(),e=>e.isVisible?"100%":"0");var j=n(7516);function N(e){let{map:t}=e,[n,l]=(0,o.useState)([]),[r,s]=(0,o.useState)(!1);(0,o.useEffect)(()=>{n.length&&n.map(e=>e.setMap(t))},[n]);let i=(0,o.useCallback)(async()=>{var e;if(!navigator.geolocation)return;s(!0),n.length&&(n.map(e=>e.setMap(null)),l([]));let a=null===(e=n[0])||void 0===e?void 0:e.getPosition();navigator.geolocation.getCurrentPosition(async function(e){let n=e.coords.latitude,o=e.coords.longitude,r=a||new kakao.maps.LatLng(n,o),s=new window.kakao.maps.Size(40,40),i=new window.kakao.maps.MarkerImage("/img/point.png",s),u=new kakao.maps.Marker({position:r,image:i,title:"Current Location"});l([u]),t.panTo(r)})});return(0,a.jsx)("button",{className:"w-8 h-8 z-30 absolute right-1  bottom-1/3 bg-white shadow-lg  rounded-md ",onClick:i,children:(0,a.jsx)(j.nDs,{className:"text-xl m-auto ".concat(r?"text-emerald-500":"text-gray-600")})})}var Y=o.memo(function(e){let[t,n]=(0,s.FV)(i.S_),[c,d]=(0,o.useState)([]),[p,h]=(0,o.useState)(null),[f,m]=(0,s.FV)(i.b2),[g,x]=(0,o.useState)(null),[w,k]=(0,o.useState)(null),[y,j]=(0,o.useState)(null),[Y,S]=(0,o.useState)(!1),E=(0,r.useRouter)(),{_id:C}=E.query,L=(0,o.useRef)(null),T=()=>{window.innerWidth<=767?S(!0):S(!1)};(0,o.useEffect)(()=>(window.innerWidth<=767&&S(!0),window.addEventListener("resize",T),()=>{window.removeEventListener("resize",T)}),[Y]);let M=(0,o.useCallback)(async e=>{if(!_)return;let t=[...f];f.length&&(f.map(e=>e.setMap(null)),m([])),console.log("하이",f),n(!0);let a=c.find(t=>t.parkingCode===e);if(!a)return;let o=new kakao.maps.LatLng(a.lat,a.lng);_.getLevel()>8&&_.setLevel(8),_.panTo(o);let{data:r}=await l.Z.post("/api/overlay",a),s=new kakao.maps.CustomOverlay({clickable:!0,content:r.html,position:o,xAnchor:.5,yAnchor:.5});t.push(s),m(e=>[s]),h(a)}),{makeMap:D,makeMarkers:R,map:_,markers:z}=function(e){let{mapContainer:t,setMarkerImageB:n,setMarkerImageY:a,markerImageB:l,markerImageY:s,DB:i,onClickMarker:u}=e;(0,r.useRouter)();let[c,d]=(0,o.useState)(null),[p,h]=(0,o.useState)([]),f=(0,o.useCallback)(()=>{let e={center:new window.kakao.maps.LatLng(35.1611293182418,126.915927683652),level:window.innerHeight<1300?4:3},o=new window.kakao.maps.Map(t.current,e),l=new window.kakao.maps.ZoomControl;o.addControl(l,window.kakao.maps.ControlPosition.RIGHT);let r=new window.kakao.maps.Size(40,40),s=new window.kakao.maps.MarkerImage("/img/marker_yellow.png",r),i=new window.kakao.maps.MarkerImage("/img/marker_blue.png",r);a(s),n(i),d(o)},[t]),m=(0,o.useCallback)(()=>{if(!l||!s)return;if(p.length>0){let e=[...p];e.forEach(e=>e.setMap(null))}let e=[];i.forEach(t=>{let n=new kakao.maps.Marker({map:c,title:t.parkingName,position:new kakao.maps.LatLng(t.lat,t.lng),image:"무료"===t.payYn?l:s,id:t.parkingCode});e.push(n),kakao.maps.event.addListener(n,"click",()=>{u(t.parkingCode)})}),h(e);let t=new kakao.maps.MarkerClusterer({map:c,averageCenter:!0,minLevel:7});t.addMarkers(e)},[i,c,l,s]);return{makeMap:f,makeMarkers:m,map:c,markers:p}}({mapContainer:L,setMarkerImageB:k,setMarkerImageY:j,markerImageB:w,markerImageY:y,DB:c,onClickMarker:M});return(0,o.useEffect)(()=>{_&&(console.log(_),console.log(f),f.length&&(console.log("안",f),f.map(e=>e&&e.setMap(null))))},[_,f]),(0,o.useEffect)(()=>{let e=async()=>{let{data:e}=await l.Z.get("/api/parking-lot",{params:u});d(e)};e()},[]),(0,o.useEffect)(()=>{console.log("지도 생성"),kakao.maps.load(()=>{D()})},[]),(0,o.useEffect)(()=>{console.log("마커 생성"),kakao.maps.load(()=>{R()})},[c]),(0,a.jsx)("div",{className:"w-full sm:text-sm",children:(0,a.jsxs)("div",{ref:L,style:{width:"100%",height:"100vh",position:"relative",overflow:"hidden"},children:[(0,a.jsx)(b,{}),(0,a.jsx)(N,{map:_}),Y&&p&&(0,a.jsx)(v,{info:p,setCurrentParkingLotInfo:h})]})})})}}]);