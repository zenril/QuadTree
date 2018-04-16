!function(t){var n={};function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=2)}([function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=function(){function t(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}}();function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(n,i){r(this,t),this.x=n.x,this.y=n.y,this.r=n.r||0,this.data=i}return e(t,[{key:"intersects",value:function(t){return this.distance(t)<=t.r+this.r}},{key:"distance",value:function(t){var n=this.x-t.x,i=this.y-t.y;return Math.sqrt(n*n+i*i)}}]),t}(),o=function(){function t(n,i){r(this,t),this.x=n.x,this.y=n.y,this.r=n.r||0,this.data=i}return e(t,[{key:"intersects",value:function(t){return this.distance(t)<=t.r+this.r}},{key:"distance",value:function(t){var n=this.x-t.x,i=this.y-t.y;return Math.sqrt(n*n+i*i)}}]),t}(),u=function(){function t(n,i,e,s){r(this,t),this.x=n,this.y=i,this.w=e,this.h=s}return e(t,[{key:"contains",value:function(t){return t.x>=this.x-this.w&&t.x<this.x+this.w&&t.y>=this.y-this.h&&t.y<this.y+this.h}}]),t}(),a=function(){function t(n,i){r(this,t),this.boundary=n,this.capacity=i,this.points=[],this.divisions=null,t.trigger("create",[this])}return e(t,[{key:"peek",value:function(t){if(this.divisions){for(var n=0;n<this.divisions.length;n++)for(var i=0;i<this.divisions[n].length;i++)t(this.divisions[n][i]);return!0}return!1}},{key:"insert",value:function(n){this.boundary.contains(n)&&(this.points.length<this.capacity?(t.trigger("point",[this,n]),this.points.push(n)):(this.divisions||this.subdivide(),this.peek(function(t){t.insert||console.log(t),t.insert(n)})))}},{key:"findPoints",value:function(n,i,e){if(e||(e=[]),!this.intersectsWithPoint(n))return e;if(console.log("a"),t.trigger("peek",[this]),this.divisions&&this.peek(function(t){t.findPoints(n,i,e)}),this.points.length)for(var r=0;r<this.points.length;r++){var s=this.points[r];i&&!i(s)||(t.trigger("found",[this,s]),e.push(s))}return e}},{key:"intersectsWithPoint",value:function(n){var i=this.boundary.x-this.boundary.w/2,e=this.boundary.y-this.boundary.h/2,r=n.x-Math.max(i,Math.min(n.x,i+this.boundary.w)),s=n.y-Math.max(e,Math.min(n.y,e+this.boundary.h)),o=r*r+s*s<n.r*n.r;return o&&t.trigger("intersects",[this,n]),o}},{key:"findInRadius",value:function(t,n){return t.r=n||t.r,this.findPoints(t,function(n){return t.intersects(n)})}},{key:"subdivide",value:function(){this.divisions=[["0:left-0top","1:right-0top"],["0:left-1bottom","1:right-1bottom"]];var n=this.boundary.x,i=this.boundary.y,e=this.boundary.w,r=this.boundary.h;this.divisions[1][0]=new t(new u(n+e/4,i-r/4,e/2,r/2),this.capacity),this.divisions[0][0]=new t(new u(n-e/4,i-r/4,e/2,r/2),this.capacity),this.divisions[1][1]=new t(new u(n+e/4,i+r/4,e/2,r/2),this.capacity),this.divisions[0][1]=new t(new u(n-e/4,i+r/4,e/2,r/2),this.capacity)}}],[{key:"sub",value:function(n,i){t.events[n].push(i)}},{key:"trigger",value:function(n,i){t.events[n].forEach(function(t){t.apply(null,i)})}},{key:"events",get:function(){return t.event_bindings||(t.event_bindings={create:[],insert:[],peek:[],point:[],found:[],intersects:[]}),t.event_bindings}}]),t}();n.Point=s,n.QuadTree=a,n.Rectangle=u,n.Circle=o},function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i(0);Object.defineProperty(n,"QPoint",{enumerable:!0,get:function(){return e.Point}}),Object.defineProperty(n,"QRectangle",{enumerable:!0,get:function(){return e.Rectangle}}),Object.defineProperty(n,"QCircle",{enumerable:!0,get:function(){return e.Circle}}),Object.defineProperty(n,"QuadTree",{enumerable:!0,get:function(){return e.QuadTree}})},function(t,n,i){"use strict";var e=i(1);e.QuadTree.sub("create",function(t){}),e.QuadTree.sub("peek",function(t){window.stroke(255,0,0),window.noFill(),window.strokeWeight(.5),window.rectMode(window.CENTER),window.rect(t.boundary.x,t.boundary.y,2*t.boundary.w,2*t.boundary.h)}),e.QuadTree.sub("point",function(t,n){}),e.QuadTree.sub("found",function(t,n){window.stroke(255),window.fill(0,0,255),window.strokeWeight(1),window.rectMode(window.CENTER),window.rect(n.x,n.y,1,1)}),e.QuadTree.sub("intersects",function(t,n){window.stroke(0,255,255),window.noFill(),window.strokeWeight(1),window.ellipseMode(window.CENTER),window.ellipse(n.x,n.y,2*n.r,2*n.r)}),window.setup=function(){window.createCanvas(1500,1500),background(0),window.qtree=new e.QuadTree(new e.QRectangle(500,500,500,500),4);for(var t=250;t<750;t+=10)for(var n=250;n<750;n+=10){var i=new e.QPoint({x:n,y:t},{});qtree.insert(i)}window.QCircle=e.QCircle;var r=window.qtree.findInRadius(new window.QCircle({x:500,y:500,r:50}));console.log(r)}}]);
//# sourceMappingURL=example.js.map