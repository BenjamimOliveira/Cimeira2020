(this.webpackJsonpprojCimeira=this.webpackJsonpprojCimeira||[]).push([[0],{366:function(t,e,r){"use strict";r.r(e),r.d(e,"createSwipeBackGesture",(function(){return a}));var n=r(72),a=function(t,e,r,a,i){var o=t.ownerDocument.defaultView;return Object(n.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:r,onMove:function(t){var e=t.deltaX/o.innerWidth;a(e)},onEnd:function(t){var e=t.deltaX,r=o.innerWidth,n=e/r,a=t.velocityX,c=r/2,u=a>=0&&(a>.2||t.deltaX>c),s=(u?1-n:n)*r,d=0;if(s>5){var h=s/Math.abs(a);d=Math.min(h,540)}i(u,n<=0?.01:n,d)}})}}}]);
//# sourceMappingURL=0.f752d2da.chunk.js.map