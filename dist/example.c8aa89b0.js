parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({3:[function(require,module,exports) {
AFRAME.registerComponent("enemy",{schema:{speed:{type:"number"}},init:function(){var e=this;this.directionVec3=new THREE.Vector3,this.el.addEventListener("click",function(){alert("destroy");var t=e.el;t.parentNode.removeChild(t)})},tick:function(e,t){var i=this.directionVec3,n=new THREE.Vector3;n.x=2,n.y=0,n.z=0,console.log(i);var o=this.el.object3D.position;i.copy(n).sub(o);var r=i.length();if(!(r<1)){var c=this.data.speed/r;["x","y","z"].forEach(function(e){i[e]*=1e-6*c}),this.el.setAttribute("position",{x:o.x+i.x,y:o.y+i.y,z:o.z+i.z})}}});
},{}],4:[function(require,module,exports) {
var e=AFRAME.utils.extendDeep,t=AFRAME.primitives.getMeshMixin();AFRAME.registerPrimitive("a-enemy",e({},t,{defaultComponents:{enemy:{speed:"1000"},geometry:{primitive:"box"},scale:"0.2 0.2 0.2"},mappings:{depth:"geometry.depth",height:"geometry.height",width:"geometry.width",target:"enemy.target"}}));
},{}],1:[function(require,module,exports) {
"use strict";require("./components/enemy"),require("./primatives/a-enemy"),window.onload=function(){var e=document.createElement("a-enemy");document.getElementById("scene").appendChild(e)};
},{"./components/enemy":3,"./primatives/a-enemy":4}]},{},[1], null)
//# sourceMappingURL=/example.c8aa89b0.map