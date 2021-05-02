(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let assert=require("./assert.js"),vectorize=require("./vectorize.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),abs=vectorize(function(s){return assert(!isUndefined(s),"You must pass exactly one number into the `abs` function!"),assert(isNumber(s),"The `abs` function only works on numbers!"),Math.abs(s)});if(module.exports=abs,!module.parent&&"undefined"==typeof window){let s,e,a=abs(3);assert(3===a,`abs(3) should be 3, but instead is ${a}!`),a=abs(-3),assert(3===a,`abs(-3) should be 3, but instead is ${a}!`),a=abs(17.25),assert(17.25===a,`abs(17.25) should be 17.25, but instead is ${a}!`),a=abs(-101.5),assert(101.5===a,`abs(-101.5) should be 101.5, but instead is ${a}!`),x=[-2,3,-4],yTrue=[2,3,4],yPred=abs(x);for(let s=0;s<yTrue.length;s++)assert(yTrue[s]===yPred[s],`abs(${x[s]}) should be ${yTrue[s]}, but instead is ${yPred[s]}!`);x=[[1,-2,-3],[4,-5,6],[-7,8,-9]],yTrue=[[1,2,3],[4,5,6],[7,8,9]],yPred=abs(x);for(let s=0;s<yTrue.length;s++)for(let e=0;e<yTrue[s].length;e++)assert(yTrue[s][e]===yPred[s][e],`abs(${x[s][e]}) should be ${yTrue[s][e]}, but instead is ${yPred[s][e]}!`);try{s=!1,abs("foo")}catch(e){s=!0}assert(s,'abs("foo") should have failed!');try{s=!1,abs(["foo","bar","baz"])}catch(e){s=!0}assert(s,'abs(["foo", "bar", "baz"]) should have failed!');try{s=!1,abs({x:5})}catch(e){s=!0}assert(s,"abs({x: 5}) should have failed!");try{s=!1,abs(!0)}catch(e){s=!0}assert(s,"abs(true) should have failed!");try{s=!1,abs(e)}catch(e){s=!0}assert(s,"abs(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],2:[function(require,module,exports){
let assert=require("./assert.js"),vectorize=require("./vectorize.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),isUndefined=require("./is-undefined.js"),add=vectorize(function(){let e=0,r=Object.keys(arguments).map(e=>arguments[e]),d=r.map(e=>typeof e);return r.forEach(e=>assert(isNumber(e)||isString(e),"The `add` function only works on strings or numbers!")),r.forEach(e=>assert(!isUndefined(e),"You must pass numbers or equally-sized arrays of numbers into the `add` function!")),d.indexOf("string")>-1&&(e=""),r.forEach(r=>e+=r),e});if(module.exports=add,!module.parent&&"undefined"==typeof window){let e,r,d=3,s=4;cTrue=d+s,cPred=add(d,s),assert(cTrue===cPred,`add(${d}, ${s}) should be ${cTrue}, but instead is ${cPred}!`),d=-4,s=22.5,cTrue=d+s,cPred=add(d,s),assert(cTrue===cPred,`add(${d}, ${s}) should be ${cTrue}, but instead is ${cPred}!`),d=[2,3,4],s=-10,cTrue=[-8,-7,-6],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)assert(cTrue[e]===cPred[e],`add(${d[e]}, ${s}) should be ${cTrue[e]}, but instead is ${cPred[e]}!`);d=-10,s=[2,3,4],cTrue=[-8,-7,-6],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)assert(cTrue[e]===cPred[e],`add(${d}, ${s[e]}) should be ${cTrue[e]}, but instead is ${cPred[e]}!`);d=[2,3,4],s=[5,6,7],cTrue=[7,9,11],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)assert(cTrue[e]===cPred[e],`add(${d[e]}, ${s[e]}) should be ${cTrue[e]}, but instead is ${cPred[e]}!`);d=[[2,3,4],[5,6,7]],s=10,cTrue=[[12,13,14],[15,16,17]],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)for(let r=0;r<cTrue[e].length;r++)assert(cTrue[e][r]===cPred[e][r],`add(${d[e][r]}, ${s}) should be ${cTrue[e][r]}, but instead is ${cPred[e][r]}!`);d=[[2,3,4],[5,6,7]],s=[10,20,30];try{e=!1,add(d,s)}catch(r){e=!0}e||assert(!1,`add(${d}, ${s}) should have failed!`),d="hello, ",s=["foo","bar","baz"],cTrue=["hello, foo","hello, bar","hello, baz"],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)assert(cTrue[e]===cPred[e],`add(${d}, ${s[e]}) should be ${cTrue[e]}, but instead is ${cPred[e]}!`);d=!0,s=3;try{e=!1,add(d,s)}catch(r){e=!0}assert(e,`add(${d}, ${s}) should have failed!`),d=[2,3,4],s=[5,6,"seven"],cTrue=[7,9,"4seven"],cPred=add(d,s);for(let e=0;e<cTrue.length;e++)assert(cTrue[e]===cPred[e],`add(${d[e]}, ${s[e]}) should be ${cTrue[e]}, but instead was ${cPred[e]}!`);try{e=!1,add(3,r)}catch(r){e=!0}assert(e,"add(3, foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./vectorize.js":77}],3:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),slice=require("./slice.js"),transpose=require("./transpose.js");function append(e,a,s=0){assert(!isUndefined(e),"You must pass two arrays into the `append` function!"),assert(!isUndefined(a),"You must pass two arrays into the `append` function!"),assert(isArray(e),"You must pass two arrays into the `append` function!"),assert(isArray(a),"You must pass two arrays into the `append` function!"),assert(isNumber(s),"The `axis` argument to the `append` function must be 0 or 1!"),assert(s>=0&&s<2,"The `axis` argument to the `append` function must be 0 or 1!"),assert(parseInt(s)===s,"The `axis` argument to the `append` function must be 0 or 1!");let r=shape(e),n=shape(a);assert(r.length===n.length,"The two arrays passed into the `append` function must have the same number of dimensions!"),assert(r.length<3&&n.length<3,"The two arrays passed into the `append` function must be 1- or 2-dimensional!");for(let e=0;e<r.length;e++)e!==s&&assert(r[e]===n[e],`The two arrays passed into the \`append\` function must have the same shapes along all axes *except* the axis along which they're being appended! (${r[e]} != ${n[e]})`);if(assert(s<r.length,"The axis argument you passed into the `append` function is out of bounds for the array!"),0===r.length)return[];if(1===r.length)return e.concat(a);if(2===r.length){if(0===s){let s=[];for(let a=0;a<r[0];a++)s.push(e[a]);for(let e=0;e<n[0];e++)s.push(a[e]);return s}if(1===s)return transpose(append(transpose(e),transpose(a),0))}}if(module.exports=append,!module.parent&&"undefined"==typeof window){let e=require("./is-equal.js"),a=require("./normal.js"),s=require("./range.js");function printArray(e){return`[${e.join(", ")}]`}let r,n=[2,3,4],t=[5,6,7],p=0,i=[2,3,4,5,6,7],o=append(n,t,p);assert(e(i,o),`append(${printArray(n)}, ${printArray(t)}) should be ${printArray(i)}, but instead was ${printArray(o)}!`),i=[[2,3,4],[5,6,7]],o=append(n=[[2,3,4]],t=[[5,6,7]],p=0),assert(e(i,o),`append(${printArray(n)}, ${printArray(t)}) should be ${printArray(i)}, but instead was ${printArray(o)}!`),i=[[2,3,4,5,6,7]],o=append(n=[[2,3,4]],t=[[5,6,7]],p=1),assert(e(i,o),`append(${printArray(n)}, ${printArray(t)}) should be ${printArray(i)}, but instead was ${printArray(o)}!`),o=append(n=slice(i=a([10,5]),[s(0,3),null]),t=slice(i,[s(3,10),null]),p=0),assert(e(i,o),"FAIL when appending 2D matrices on axis 0!"),o=append(n=slice(i=a([5,10]),[null,s(0,3)]),t=slice(i,[null,s(3,10)]),p=1),assert(e(i,o),"FAIL when appending 2D matrices on axis 1!");try{r=!1,append()}catch(e){r=!0}assert(r,"append() should have failed!");try{r=!1,append(a([2,3]),a([4,5]),0)}catch(e){r=!0}assert(r,"append(normal([2, 3]), normal([4, 5]), 0) should have failed!");try{r=!1,append(a([3,3]),a([3,2]),0)}catch(e){r=!0}assert(r,"append(normal([3, 3]), normal([3, 2]), 0) should have failed!");try{r=!1,append(a([3,2]),a([2,2]),1)}catch(e){r=!0}assert(r,"append(normal([3, 2]), normal([2, 2]), 1) should have failed!");try{r=!1,append(a([5,5],a([5,5])),2)}catch(e){r=!0}assert(r,"append(normal([5, 5]), normal([5, 5]), 2) should have failed!");try{r=!1,append(a([2,3,4]),a([2,3,4]),0)}catch(e){r=!0}assert(r,"append(normal([2, 3, 4]), normal([2, 3, 4]), 0) should have failed!"),console.log("All tests passed! (But I should probably make `append` compatible with (n > 2)-dimensional arrays!)")}

},{"./assert.js":11,"./is-array.js":35,"./is-equal.js":37,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./range.js":57,"./shape.js":64,"./slice.js":68,"./transpose.js":74}],4:[function(require,module,exports){
let vectorize=require("./vectorize.js"),apply=vectorize(function(e,r){return r(e)});module.exports=apply;

},{"./vectorize.js":77}],5:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),arccos=vectorize(function(s){return assert(!isUndefined(s),"You must pass a number or an array of numbers into the `arccos` function!"),assert(isNumber(s),"You must pass a number or an array of numbers into the `arccos` function!"),assert(s>=-1&&s<=1,"The `arccos` function is only defined for -1 <= x <= 1!"),Math.acos(s)});if(module.exports=arccos,!module.parent&&"undefined"==typeof window){let s,e=require("./random.js"),a=0,r=Math.PI/2,c=arccos(a);assert(r===c,`arccos(${a}) should be ${r}, but instead is ${c}!`),r=0,c=arccos(a=1),assert(r===c,`arccos(${a}) should be ${r}, but instead is ${c}!`);try{s=!1,arccos()}catch(e){s=!0}assert(s,"arccos() should have failed!");try{s=!1,arccos("foo")}catch(e){s=!0}assert(s,'arccos("foo") should have failed!');try{s=!1,arccos(!0)}catch(e){s=!0}assert(s,"arccos(true) should have failed!");try{s=!1,arccos(-2)}catch(e){s=!0}assert(s,"arccos(-2) should have failed!");try{s=!1,arccos(2)}catch(e){s=!0}assert(s,"arccos(2) should have failed!");try{s=!1,arccos({})}catch(e){s=!0}assert(s,"arccos({}) should have failed!");try{s=!1,arccos(e(100))}catch(e){s=!0}assert(!s,"arccos(random(100)) should have succeeded!");try{s=!1,arccos(()=>{})}catch(e){s=!0}assert(s,"arccos(() => {}) should have failed!");try{let e;s=!1,arccos(e)}catch(e){s=!0}assert(s,"arccos(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./random.js":56,"./vectorize.js":77}],6:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),arcsin=vectorize(function(s){return assert(!isUndefined(s),"You must pass a number or an array of numbers into the `arcsin` function!"),assert(isNumber(s),"You must pass a number or an array of numbers into the `arcsin` function!"),assert(s>=-1&&s<=1,"The `arcsin` function is only defined for -1 <= x <= 1!"),Math.asin(s)});if(module.exports=arcsin,!module.parent&&"undefined"==typeof window){let s,e=require("./random.js"),a=0,r=0,i=arcsin(a);assert(r===i,`arcsin(${a}) should be ${r}, but instead is ${i}!`),a=1,r=Math.PI/2,i=arcsin(a),assert(r===i,`arcsin(${a}) should be ${r}, but instead is ${i}!`);try{s=!1,arcsin()}catch(e){s=!0}assert(s,"arcsin() should have failed!");try{s=!1,arcsin("foo")}catch(e){s=!0}assert(s,'arcsin("foo") should have failed!');try{s=!1,arcsin(!0)}catch(e){s=!0}assert(s,"arcsin(true) should have failed!");try{s=!1,arcsin(-2)}catch(e){s=!0}assert(s,"arcsin(-2) should have failed!");try{s=!1,arcsin(2)}catch(e){s=!0}assert(s,"arcsin(2) should have failed!");try{s=!1,arcsin({})}catch(e){s=!0}assert(s,"arcsin({}) should have failed!");try{s=!1,arcsin(e(100))}catch(e){s=!0}assert(!s,"arcsin(random(100)) should have succeeded!");try{s=!1,arcsin(()=>{})}catch(e){s=!0}assert(s,"arcsin(() => {}) should have failed!");try{let e;s=!1,arcsin(e)}catch(e){s=!0}assert(s,"arcsin(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./random.js":56,"./vectorize.js":77}],7:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),arctan=vectorize(function(a){return assert(!isUndefined(a),"You must pass a number or an array of numbers into the `arctan` function!"),assert(isNumber(a),"You must pass a number or an array of numbers into the `arctan` function!"),Math.atan(a)});if(module.exports=arctan,!module.parent&&"undefined"==typeof window){let a,e=require("./random.js"),t=0,r=0,s=arctan(t);assert(r===s,`arctan(${t}) should be ${r}, but instead is ${s}!`),t=1,r=Math.PI/4,s=arctan(t),assert(r===s,`arctan(${t}) should be ${r}, but instead is ${s}!`);try{a=!1,arctan()}catch(e){a=!0}assert(a,"arctan() should have failed!");try{a=!1,arctan("foo")}catch(e){a=!0}assert(a,'arctan("foo") should have failed!');try{a=!1,arctan(!0)}catch(e){a=!0}assert(a,"arctan(true) should have failed!");try{a=!1,arctan(-2)}catch(e){a=!0}assert(!a,"arctan(-2) should have succeeded!");try{a=!1,arctan(2)}catch(e){a=!0}assert(!a,"arctan(2) should have succeeded!");try{a=!1,arctan({})}catch(e){a=!0}assert(a,"arctan({}) should have failed!");try{a=!1,arctan(e(100))}catch(e){a=!0}assert(!a,"arctan(random(100)) should have succeeded!");try{a=!1,arctan(()=>{})}catch(e){a=!0}assert(a,"arctan(() => {}) should have failed!");try{let e;a=!1,arctan(e)}catch(e){a=!0}assert(a,"arctan(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./random.js":56,"./vectorize.js":77}],8:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),indexOf=require("./index-of.js"),max=require("./max.js");function argmax(e){return assert(!isUndefined(e),"You must pass an array into the `argmax` function!"),assert(isArray(e),"You must pass an array into the `argmax` function!"),indexOf(e,max(e))}if(module.exports=argmax,!module.parent&&"undefined"==typeof window){const e=require("./is-equal.js");require("./normal.js");let s=require("./shuffle.js")(require("./range.js")(0,100)),r=s.indexOf(99),a=argmax(s)[0];assert(e(r,a),`Uh-oh! The predicted index should've been ${r}, but instead it was ${a}!`),r=[2,2],a=argmax(s=[[2,3,4],[0,1,2],[-5,10,20]]),assert(e(r,a),`Uh-oh! The predicted index should've been ${r}, but instead it was ${a}!`),console.log("All tests passed!")}

},{"./assert.js":11,"./index-of.js":31,"./is-array.js":35,"./is-equal.js":37,"./is-undefined.js":41,"./max.js":45,"./normal.js":51,"./range.js":57,"./shuffle.js":65}],9:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),indexOf=require("./index-of.js"),min=require("./min.js");function argmin(e){return assert(!isUndefined(e),"You must pass an array into the `argmin` function!"),assert(isArray(e),"You must pass an array into the `argmin` function!"),indexOf(e,min(e))}if(module.exports=argmin,!module.parent&&"undefined"==typeof window){const e=require("./is-equal.js");require("./normal.js");let s=require("./shuffle.js")(require("./range.js")(0,100)),i=s.indexOf(0),r=argmin(s)[0];assert(e(i,r),`Uh-oh! The predicted index should've been ${i}, but instead it was ${r}!`),i=[2,0],r=argmin(s=[[2,3,4],[0,1,2],[-5,10,20]]),assert(e(i,r),`Uh-oh! The predicted index should've been ${i}, but instead it was ${r}!`),console.log("All tests passed!")}

},{"./assert.js":11,"./index-of.js":31,"./is-array.js":35,"./is-equal.js":37,"./is-undefined.js":41,"./min.js":48,"./normal.js":51,"./range.js":57,"./shuffle.js":65}],10:[function(require,module,exports){
Array.prototype.asyncForEach=async function(t){for(let r=0;r<this.length;r++)await t(this[r],r,this);return this},Array.prototype.alphaSort=function(t){return this.sort(function(r,n){return t?r[t]<n[t]?-1:r[t]>n[t]?1:0:r<n?-1:r>n?1:0})};

},{}],11:[function(require,module,exports){
module.exports=function(o,r){if(!o)throw new Error(r)};

},{}],12:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),ceil=vectorize(function(e){return assert(!isUndefined(e),"You must pass a single number or a single array of numbers into the `ceil` function!"),assert(isNumber(e),"The `ceil` function only works on numbers!"),Math.ceil(e)});if(module.exports=ceil,!module.parent&&"undefined"==typeof window){let e,s,i=3.5,t=4,l=ceil(i);assert(t===l,`ceil(${i}) should be ${t}, but instead was ${l}!`),t=4,l=ceil(i=3.25),assert(t===l,`ceil(${i}) should be ${t}, but instead was ${l}!`),t=-17,l=ceil(i=-17.2),assert(t===l,`ceil(${i}) should be ${t}, but instead was ${l}!`),t=[3,4,8],l=ceil(i=[2.5,3.4,7.9]);for(let e=0;e<t.length;e++)assert(t[e]===l[e],`ceil(${i[e]}) should be ${t[e]}, but instead was ${l[e]}!`);i="foo";try{e=!1,ceil(i)}catch(s){e=!0}assert(e,`ceil(${i}) should have failed!`),i=[!0,2,3];try{e=!1,ceil(i)}catch(s){e=!0}assert(e,`ceil(${i}) should have failed!`),i={x:5};try{e=!1,ceil(i)}catch(s){e=!0}assert(e,`ceil(${i}) should have failed!`);try{e=!1,ceil(s)}catch(s){e=!0}assert(e,"ceil(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],13:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),abs=require("./abs.js"),vectorize=require("./vectorize.js"),chop=vectorize(function(e,s){return assert(!isUndefined(e),"You must pass a single number or a single array of numbers into the `chop` function!"),assert(isNumber(e),"The `chop` function only works on numbers!"),s=isUndefined(s)?1e-10:s,assert(isNumber(s),"The `chop` function only works on numbers!"),abs(e)<s?0:e});if(module.exports=chop,!module.parent&&"undefined"==typeof window){let e=1,s=chop(e);assert(1===s,`chop(1) should be 1, but instead is ${s}!`),s=chop(e=0),assert(0===s,`chop(0) should be 0, but instead is ${s}!`),s=chop(e=1e-15),assert(0===s,`chop(1e-15) should be 0, but instead is ${s}!`),s=chop(e=100),assert(100===s,`chop(100) should be 100, but instead is ${s}!`),s=chop(e=-100),assert(-100===s,`chop(-100) should be -100, but instead is ${s}!`),e=[1e-20,1e-15,1e-5];let o,t=[0,0,1e-5];yPred=chop(e);for(let e=0;e<t.length;e++)assert(t[e]===yPred[e],`chop(x[i]) should be ${t[e]}, but instead is ${yPred[e]}!`);e=[1,1,1],thresholds=[.1,1,10],t=[1,1,0],yPred=chop(e,thresholds);for(let e=0;e<t.length;e++)assert(t[e]===yPred[e],`chop(x[i]) should be ${t[e]}, but instead is ${yPred[e]}!`);try{o=!1,chop(!0)}catch(e){o=!0}assert(o,"chop(true) should have failed!");try{o=!1,chop({})}catch(e){o=!0}assert(o,"chop({}) should have failed!");try{o=!1,chop("foo")}catch(e){o=!0}assert(o,'chop("foo") should have failed!');try{o=!1,chop(()=>{})}catch(e){o=!0}assert(o,"chop(() => {})) should have failed!");try{o=!1,chop([1,2,"three"])}catch(e){o=!0}assert(o,'chop([1, 2, "three"]) should have failed!');try{let e;o=!1,chop(e)}catch(e){o=!0}assert(o,"chop(foo) should have failed!");try{o=!1,chop([2,3,4],[5,6,"seven"])}catch(e){o=!0}assert(o,'chop([2, 3, 4], [5, 6, "seven"]) should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],14:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),clamp=vectorize(function(e,s,a){return assert(!isUndefined(e)&&!isUndefined(s)&&!isUndefined(a),"You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `clamp` function!"),assert(isNumber(e),"The `clamp` function only works on numbers!"),assert(isNumber(s),"The `clamp` function only works on numbers!"),assert(isNumber(a),"The `clamp` function only works on numbers!"),assert(s<a,"The minimum parameter, a, must be less than the maximum parameter, b."),e<s?s:e>a?a:e});if(module.exports=clamp,!module.parent&&"undefined"==typeof window){let e=5,s=1,a=10,t=5,r=clamp(e,s,a);assert(t===r,`clamp(${e}, ${s}, ${a}) should be ${t}, but instead is ${r}!`),t=s=1,r=clamp(e=-100,s,a=10),assert(t===r,`clamp(${e}, ${s}, ${a}) should be ${t}, but instead is ${r}!`),t=a=10,r=clamp(e=999,s=1,a),assert(t===r,`clamp(${e}, ${s}, ${a}) should be ${t}, but instead is ${r}!`),t=[5,100,500],r=clamp(e=[0,100,1e3],s=5,a=500);for(let l=0;l<t.length;l++)assert(t[l]===r[l],`clamp(${e[l]}, ${s}, ${a}) should be ${t[l]}, but instead was ${r[l]}!`);t=[5,100,300],r=clamp(e=[0,100,1e3],s=[5,10,15],a=[100,200,300]);for(let l=0;l<t.length;l++)assert(t[l]===r[l],`clamp(${e[l]}, ${s[l]}, ${a[l]}) should be ${t[l]}, but instead was ${r[l]}.`);e=5,s=10,a=1;let l,n=!1;try{clamp(e,s,a)}catch(e){n=!0}assert(n,`clamp(${e}, ${s}, ${a}) should have failed!`),e="foo",s="bar",a="baz",n=!1;try{clamp(e,s,a)}catch(e){n=!0}assert(n,`clamp(${e}, ${s}, ${a}) should have failed!`),n=!1;try{clamp(l,l,l)}catch(e){n=!0}assert(n,"clamp(foo, foo, foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],15:[function(require,module,exports){
let mean=require("./mean.js"),sqrt=require("./sqrt.js"),variance=require("./variance.js");function cohensd(e,r){return(mean(e)-mean(r))/sqrt((variance(e)+variance(r))/2)}module.exports=cohensd;

},{"./mean.js":46,"./sqrt.js":70,"./variance.js":76}],16:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function copy(e){if("object"==typeof e){if(isUndefined(e))return e;if(isArray(e))return e.map(copy);{let o={};return Object.keys(e).forEach(function(s){o[s]=copy(e[s])}),o}}return e}if(module.exports=copy,!module.parent&&"undefined"==typeof window){let e=require("./normal.js"),o=require("./is-equal.js"),s=(e,o)=>e===o,i=(e,i)=>o(e,i)&&(!("object"==typeof e&&!isUndefined(e)&&!isUndefined(i))||!s(e,i));assert(i(234,copy(234)),"copy(234) failed!"),assert(i(!0,copy(!0)),"copy(true) failed!"),assert(i("foo",copy("foo")),'copy("foo") failed!'),assert(i([2,3,4],copy([2,3,4])),"copy([2, 3, 4]) failed!"),assert(i(void 0,copy(void 0)),"copy(undefined) failed!");let r=e([10,10,10]);assert(i(r,copy(r)),"copy(normal([10, 10, 10])) failed!"),assert(i(r={foo:e([5,5,5,5]),name:"Josh",position:{x:234.5,y:567.8,z:-890.1}},copy(r)),"copy(obj) failed!"),assert(i(r=(()=>{}),copy(r)),"copy(fn) failed!"),assert(i(r=null,copy(r)),"copy(null) failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-equal.js":37,"./is-undefined.js":41,"./normal.js":51}],17:[function(require,module,exports){
let assert=require("./assert.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),covariance=require("./covariance.js"),std=require("./std.js");function correl(e,r){return assert(!isUndefined(e)&&!isUndefined(r),"You must pass two equally-sized one-dimensional arrays into the `correl` function!"),assert(isArray(e)&&isArray(r),"The `correl` function works on exactly two one-dimensional arrays!"),assert(e.length===r.length,"The two one-dimensional arrays passed into the `correl` function must have the same length!"),e.concat(r).forEach(function(e){assert(isNumber(e),"The two one-dimensional arrays passed into the `correl` function must contain only numbers!")}),covariance(e,r)/(std(e)*std(r))}if(module.exports=correl,!module.parent&&"undefined"==typeof window){let e,r=require("./normal.js"),s=require("./abs.js"),a=require("./add.js"),o=require("./scale.js"),t=r([1e4]),l=r([1e4]),c=correl(t,l);assert(s(c)<.05,`correl(normal([10000]), normal([10000])) should be approximately 0, but instead was ${c}!`),c=correl(t,l=a(t,o(.01,r([1e4])))),assert(c>.95,`correl(x, x + 0.01 * normal([10000])) should be approximately 1, but instead was ${c}!`),c=correl(t,l=a(o(-1,t),o(.01,r([1e4])))),assert(c<-.95,`correl(x, -x + 0.01 * normal([10000])) should be approximately -1, but instead was ${c}!`);try{e=!1,correl(1,2)}catch(r){e=!0}assert(e,"correl(1, 2) should have failed!");try{e=!1,correl(!0,!1)}catch(r){e=!0}assert(e,"correl(true, false) should have failed!");try{e=!1,correl([],{})}catch(r){e=!0}assert(e,"correl([], {}) should have failed!");try{e=!1,correl("foo","bar")}catch(r){e=!0}assert(e,'correl("foo", "bar") should have failed!');try{e=!1,correl([2,3,4],["a","b","c"])}catch(r){e=!0}assert(e,'correl([2, 3, 4], ["a", "b", "c"]) should have failed!');try{e=!1,correl([[2,3,4],[5,6,7]],[[8,9,10],[11,12,13]])}catch(r){e=!0}assert(e,"correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]]) should have failed!");let i=()=>{};try{e=!1,correl(i,i)}catch(r){e=!0}assert(e,"correl(fn, fn) should have failed!");try{let r;e=!1,correl(r,r)}catch(r){e=!0}assert(e,"correl(foo, foo) should have failed!"),assert(isNaN(correl([2,3,4],[1,1,1])),"correl([2, 3, 4], [1, 1, 1]) should be NaN!"),console.log("All tests passed!")}

},{"./abs.js":1,"./add.js":2,"./assert.js":11,"./covariance.js":20,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./scale.js":60,"./std.js":71}],18:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),cos=vectorize(function(s){return assert(!isUndefined(s),"You must pass a single number or single array of numbers into the `cos` function!"),assert(isNumber(s),"The `cos` function only works on numbers!"),Math.cos(s)});if(module.exports=cos,!module.parent&&"undefined"==typeof window){let s,e=require("./min.js"),o=require("./max.js"),t=require("./normal.js"),r=require("./chop.js"),a=t([1e4]).map(s=>100*s),c=cos(a);assert(e(c)>=-1,"Values produced by the `cos` function should never be below -1!"),assert(o(c)<=1,"Values produced by the `cos` function should never be above 1!"),c=cos(a=0),assert(1===c,`cos(0) should be 1, but instead is ${c}!`),c=cos(a=Math.PI/2),assert(0===r(c),`cos(Math.PI / 2) should be 0, but instead is ${c}!`),c=cos(a=Math.PI),assert(-1===c,`cos(Math.PI) should be -1, but instead is ${c}!`),c=cos(a=3*Math.PI/2),assert(0===r(c),`cos(3 * Math.PI / 2) should be 0, but instead is ${c}!`);try{s=!1,cos("foo")}catch(e){s=!0}assert(s,'cos("foo") should have failed!');try{s=!1,cos(!0)}catch(e){s=!0}assert(s,"cos(true) should have failed!");try{s=!1,cos({})}catch(e){s=!0}assert(s,"cos({}) should have failed!");try{s=!1,cos([1,2,"three"])}catch(e){s=!0}assert(s,'cos([1, 2, "three"]) should have failed!');try{s=!1,cos(()=>{})}catch(e){s=!0}assert(s,"cos(() => {}) should have failed!");try{let e;s=!1,cos(e)}catch(e){s=!0}assert(s,"cos(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./chop.js":13,"./is-number.js":39,"./is-undefined.js":41,"./max.js":45,"./min.js":48,"./normal.js":51,"./vectorize.js":77}],19:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js");function count(t,e){assert(!isUndefined(t),"You must an array and an item to count to the `count` function!"),assert(isArray(t),"You must an array and an item to count to the `count` function!");let a=flatten(t);return isArray(e)?flatten(e).map(function(t){return a.filter(e=>e===t).length}):a.filter(t=>t===e).length}if(module.exports=count,!module.parent&&"undefined"==typeof window){let t=require("./random.js"),e=require("./round.js"),a=require("./abs.js"),o=[2,2,2,3,4,2,2],r=5,n=count(o,2);assert(r===n),r=[2,3,5],n=count(o=[!0,!0,!1,!1,!1,"a","a","a","a","a"],[!0,!1,"a"]);for(let t=0;t<r.length;t++)assert(r[t]===n[t],'count([true, true, false, false, false, "a", "a", "a", "a", "a"], [true, false, "a"]) should be [2, 3, 5]!');let s,u=count(o=e(t([1e4])),0),c=count(o,1);assert(a(u-5e3)<250,"count(round(random([10000])), 0) should be approximately 5000!"),assert(a(c-5e3)<250,"count(round(random([10000])), 1) should be approximately 5000!"),assert(0===count([2,3,4]),"count([2, 3, 4]) should be 0!");try{s=!1,count()}catch(t){s=!0}assert(s,"count() should have failed!");try{s=!1,count(234)}catch(t){s=!0}assert(s,"count(234) should have failed!");try{s=!1,count(!0)}catch(t){s=!0}assert(s,"count(true) should have failed!");try{s=!1,count("foo")}catch(t){s=!0}assert(s,'count("foo") should have failed!');try{s=!1,count({})}catch(t){s=!0}assert(s,"count({}) should have failed!");try{s=!1,count(()=>{})}catch(t){s=!0}assert(s,"count(() => {}) should have failed!"),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-undefined.js":41,"./random.js":56,"./round.js":59}],20:[function(require,module,exports){
let assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),mean=require("./mean.js");function covariance(e,a){assert(!isUndefined(e)&&!isUndefined(a),"You must pass two equally-sized one-dimensional arrays into the `covariance` function!"),assert(isArray(e)&&isArray(a),"The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!"),e.concat(a).forEach(function(e){assert(isNumber(e),"The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")}),assert(e.length===a.length,"The two one-dimensional arrays passed into the `covariance` function must be of equal length!");let r=mean(e),s=mean(a),n=0;for(let o=0;o<e.length;o++)n+=(e[o]-r)*(a[o]-s);return n/e.length}if(module.exports=covariance,!module.parent&&"undefined"==typeof window){let e,a=require("./normal.js"),r=require("./abs.js"),s=(require("./chop.js"),[2,3,4]),n=[1,1,1],o=covariance(s,n);assert(0===o,`covariance([2, 3, 4], [1, 1, 1]) should be 0, but instead was ${o}!`),o=covariance(s=a([1e4]),n=a([1e4])),assert(r(o)<.05,`covariance(normal([10000]), normal(10000)) should be approximately 0, but instead is ${o}!`),n=covariance(s,s),assert(n>.95,`covariance(x, x) should be approximately 1, but instead is ${n}!`),assert(isNaN(covariance([],[])),"covariance([], []) should be NaN!");try{e=!1,covariance([1,2,3],[1,2,3,4])}catch(a){e=!0}assert(e,"covariance([1, 2, 3], [1, 2, 3, 4]) should have failed!");try{e=!1,covariance(["foo","bar","baz"],["a","b","c"])}catch(a){e=!0}assert(e,'covariance(["foo", "bar", "baz"], ["a", "b", "c"]) should have failed!');try{let a;e=!1,covariance([a],[a])}catch(a){e=!0}assert(e,"covariance([foo], [foo]) should have failed!");try{let a=()=>{};e=!1,covariance([a],[a])}catch(a){e=!0}assert(e,"covariance([fn], [fn]) should have failed!");try{e=!1,covariance({},{})}catch(a){e=!0}assert(e,"covariance({}, {}) should have failed!"),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./chop.js":13,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./mean.js":46,"./normal.js":51}],21:[function(require,module,exports){
(function (process){(function (){
let assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),shape=require("./shape.js"),transpose=require("./transpose.js"),range=require("./range.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),apply=require("./apply.js"),isFunction=require("./is-function.js"),ndarray=require("./ndarray.js"),copy=require("./copy.js"),Series=require("./series.js"),flatten=require("./flatten.js"),isEqual=require("./is-equal.js"),max=require("./max.js"),min=require("./min.js"),set=require("./set.js"),isBoolean=require("./is-boolean.js"),random=require("./random.js"),sort=require("./sort.js");function isInteger(e){return isNumber(e)&&parseInt(e)===e}function isWholeNumber(e){return isInteger(e)&&e>=0}function isObject(e){return e instanceof Object&&!isArray(e)}function isDataFrame(e){return e instanceof DataFrame}function isSeries(e){return e instanceof Series}function quote(e){let s=/"(.*?)"/g,t=e.match(s),n=e.slice();return t&&t.forEach(e=>{n=n.replace(e,`“${e.substring(1,e.length-1)}”`)}),s=/'(.*?)'/g,(t=e.match(s))&&t.forEach(e=>{n=n.replace(e,`‘${e.substring(1,e.length-1)}’`)}),`"${n}"`}function leftPad(e,s){assert(isNumber(e),"The `leftPad` function only works on numbers!");let t=e.toString();for(;t.length<s;)t="0"+t;return t}class DataFrame{constructor(e){let s=this;if(Object.defineProperty(s,"_values",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"values",{configurable:!0,enumerable:!0,get:()=>s._values,set(e){assert(isArray(e),"The new values must be a 2-dimensional array!");let t=shape(e);assert(2===t.length,"The new array of values must be 2-dimensional!"),t[0]<s._index.length?s._index=s._index.slice(0,t[0]):t[0]>s._index.length&&(s._index=s._index.concat(range(s._index.length,t[0]).map(e=>"row"+leftPad(e,(t[0]-1).toString().length)))),t[1]<s._columns.length?s._columns=s._columns.slice(0,t[1]):t[1]>s._columns.length&&(s._columns=s._columns.concat(range(s._columns.length,t[1]).map(e=>"col"+leftPad(e,(t[1]-1).toString().length)))),s._values=e}}),Object.defineProperty(s,"_columns",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"columns",{configurable:!0,enumerable:!0,get:()=>s._columns,set(e){assert(isArray(e),"The new columns list must be a 1-dimensional array of strings!"),assert(e.length===s.shape[1],"The new columns list must be the same length as the old columns list!"),assert(1===shape(e).length,"The new columns list must be a 1-dimensional array of strings!"),e.forEach(e=>{assert(isString(e),"All of the column names must be strings!")}),s._columns=e}}),Object.defineProperty(s,"_index",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"index",{configurable:!0,enumerable:!0,get:()=>s._index,set(e){assert(isArray(e),"The new index must be a 1-dimensional array of strings!"),assert(e.length===s.shape[0],"The new index must be the same length as the old index!"),assert(1===shape(e).length,"The new index must be a 1-dimensional array of strings!"),e.forEach(e=>{assert(isString(e),"All of the row names must be strings!")}),s._index=e}}),assert(isUndefined(e)||e instanceof Object,"The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."),e)if(isArray(e)){let t=shape(e);assert(2===t.length,"The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"),s.values=e}else{s._columns=Object.keys(e);let t=[];s._columns.forEach(s=>{let n=e[s];t.push(n)}),s._values=transpose(t);let n=shape(s.values);s._index=range(0,n[0]).map(e=>"row"+leftPad(e,(n[0]-1).toString().length))}}get shape(){return shape(this.values)}get rows(){return this.index}set rows(e){this.index=e}isEmpty(){return 0===set(this.values).filter(e=>!isUndefined(e)).length}clear(){let e=this.copy();return e.values=ndarray(e.shape),e.index=this.index,e.columns=this.columns,e}get(e,s){let t=this;(isString(e)||isNumber(e))&&(e=[e]),(isString(s)||isNumber(s))&&(s=[s]);let n=set((e||[]).concat(s||[]).map(e=>typeof e));return assert(n.length<=2,"Only whole numbers and/or strings are allowed in `get` arrays!"),1===n.length&&assert("string"===n[0]||"number"===n[0],"Only whole numbers and/or strings are allowed in `get` arrays!"),2===n.length&&(assert(n.indexOf("string")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!"),assert(n.indexOf("number")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!")),isUndefined(e)||(e=e.map(e=>"string"==typeof e?(assert(t.index.indexOf(e)>-1,`Row "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Index ${e} is out of bounds!`),assert(parseInt(e)===e,"Row numbers must be integers!"),assert(e<t.index.length,`Index ${e} is out of bounds!`),t.index[e]):void 0)),isUndefined(s)||(s=s.map(e=>"string"==typeof e?(assert(t.columns.indexOf(e)>-1,`Column "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Column ${e} is out of bounds!`),assert(parseInt(e)===e,"Column numbers must be integers!"),assert(e<t.columns.length,`Column ${e} is out of bounds!`),t.columns[e]):void 0)),t.getSubsetByNames(e,s)}getSubsetByNames(e,s){let t=this;isUndefined(e)&&(e=t.index),isUndefined(s)&&(s=t.columns),assert(isArray(e)&&isArray(s),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(1===shape(e).length&&1===shape(s).length,"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(e.length>0,"The `rows` array must contain at least one row name."),assert(s.length>0,"The `cols` array must contain at least one column name."),e.forEach(e=>{assert(isString(e),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(t.index.indexOf(e)>-1,`The row name "${e}" does not exist in the list of rows.`)}),s.forEach(e=>{assert(isString(e),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(t.columns.indexOf(e)>-1,`The column name "${e}" does not exist in the list of columns.`)});let n=e.map(e=>s.map(s=>t.values[t.index.indexOf(e)][t.columns.indexOf(s)]));if(1===e.length&&1===s.length)return flatten(n)[0];if(1===e.length){let t=new Series(flatten(n));return t.name=e[0],t.index=s,t}if(1===s.length){let t=new Series(flatten(n));return t.name=s[0],t.index=e,t}let a=new DataFrame(n);return a.columns=s,a.index=e,a}getSubsetByIndices(e,s){let t=this,n=t.shape;isUndefined(e)&&(e=range(0,n[0])),isUndefined(s)&&(s=range(0,n[1])),assert(isArray(e)&&isArray(s),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(1===shape(e).length&&1===shape(s).length,"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e.length>0,"The `rowIndices` array must contain at least one index."),assert(s.length>0,"The `colIndices` array must contain at least one index."),e.forEach(e=>{assert(isWholeNumber(e),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e<t.index.length,`The row index ${e} is out of bounds.`)}),s.forEach(e=>{assert(isWholeNumber(e),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e<t.columns.length,`The column index ${e} is out of bounds.`)});let a=e.map(e=>t.index[e]),r=s.map(e=>t.columns[e]);return t.getSubsetByNames(a,r)}loc(e,s){return this.getSubsetByNames(e,s)}iloc(e,s){return this.getSubsetByIndices(e,s)}transpose(){let e=new DataFrame(transpose(this.values));return e.columns=this.index,e.index=this.columns,e}get T(){return this.transpose()}resetIndex(){let e=this.copy();return e.index=range(0,this.shape[0]).map(s=>"row"+leftPad(s,(e.index.length-1).toString().length)),e}copy(){if(this.isEmpty())return new DataFrame;let e=new DataFrame(copy(this.values));return e.columns=this.columns.slice(),e.index=this.index.slice(),e}assign(e,s){let t,n;isUndefined(s)?assert(!isArray(n=e),"When using only one parameter for the `assign` method, the parameter must be an object or a Series."):(n=s,assert(isString(t=e),"When using two parameters for the `assign` method, the first parameter must be a string."),assert(isSeries(n)||isArray(n)&&1===shape(n).length,"When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array.")),assert(isObject(n)||isSeries(n)||isArray(n)&&1===shape(n).length,"An object, Series, or 1-dimensional array must be passed into the `assign` method.");let a=this;if(isSeries(n)){let e={};return assert(a.isEmpty()||isEqual(n.index,a.index),"The index of the new data does not match the index of the DataFrame."),e[t||n.name]=n.values,a.assign(e)}if(isArray(n)){let e={};return e[t||"data"]=n,a.assign(e)}{let e=a.copy(),s=e.shape;return Object.keys(n).forEach(t=>{let a=n[t];if(assert(isArray(a),"Each key-value pair must be (respectively) a string and a 1-dimensional array of values."),assert(1===shape(a).length,"Each key-value pair must be (respectively) a string and a 1-dimensional array of values."),e.isEmpty())e.values=transpose([a]),e.columns=[t],s=e.shape;else{assert(a.length===s[0],`Column "${t}" in the new data is not the same length as the other columns in the original DataFrame.`);let n=e.columns.indexOf(t);n<0&&(e.columns.push(t),n=e.columns.indexOf(t)),e.values.forEach((e,s)=>{e[n]=a[s]})}}),e}}apply(e,s){s=s||0,assert(isFunction(e),"The first parameter to the `apply` method must be a function."),assert(0===s||1===s,"The second parameter to the `apply` method (the `axis`) must be 0 or 1.");let t=this.copy();return 0===s?((t=t.transpose()).values=t.values.map((s,n)=>e(s,t.index[n])),t=t.transpose()):1===s&&(t.values=t.values.map((s,n)=>e(s,t.index[n]))),t}map(e,s){return this.apply(e,s)}dropMissing(e,s,t){function n(e){if(t>0){let s=0;for(let n=0;n<e.length;n++){let a=e[n];if(isUndefined(a)&&s++,s>=t)return[]}}else if("any"===s)for(let s=0;s<e.length;s++){let t=e[s];if(isUndefined(t))return[]}else if("all"===s){for(let s=0;s<e.length;s++){let t=e[s];if(!isUndefined(t))return e}return[]}return e}assert(0===(e=e||0)||1===e,"The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."),assert(isWholeNumber(t=t||0),"The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."),assert("any"===(s=t>0?"none":s||"any")||"all"===s||"none"===s,"The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped).");let a=this.copy(),r=Math.random().toString();if(0===e){let e=(a=a.assign(r,a.index)).values.map(n).filter(e=>e.length>0);if(shape(e).length<2)return new DataFrame;a.values=e;let s=a.get(null,r);if(isUndefined(s))return new DataFrame;isString(s)&&(s=[s]),isSeries(s)&&(s=s.values),a.index=s,a=a.drop(null,r)}else if(1===e){let e=(a=(a=a.transpose()).assign(r,a.index)).values.map(n).filter(e=>e.length>0);if(shape(e).length<2)return new DataFrame;a.values=e;let s=a.get(null,r);if(isUndefined(s))return new DataFrame;isString(s)&&(s=[s]),isSeries(s)&&(s=s.values),a.index=s,a=(a=a.drop(null,r)).transpose()}return a}drop(e,s){isUndefined(e)&&(e=[]),isUndefined(s)&&(s=[]),(isString(e)||isNumber(e))&&(e=[e]),(isString(s)||isNumber(s))&&(s=[s]),assert(isArray(e),"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(isArray(s),"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(1===shape(e).length,"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(1===shape(s).length,"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.");let t=this.copy();return e=e.map(e=>isString(e)?(assert(t.index.indexOf(e)>-1,`Row "${e}" does not exist!`),e):isNumber(e)?(assert(e>=0,`Row ${e} is out of bounds!`),assert(e<t.index.length,`Row ${e} is out of bounds!`),t.index[e]):void 0),s=s.map(e=>isString(e)?(assert(t.columns.indexOf(e)>-1,`Column "${e}" does not exist!`),e):isNumber(e)?(assert(e>=0,`Column ${e} is out of bounds!`),assert(e<t.columns.length,`Column ${e} is out of bounds!`),t.columns[e]):void 0),t=(t=t.dropRows(e)).dropColumns(s)}dropColumns(e){let s=this;isUndefined(e)&&(e=[]),(isNumber(e)||isString(e))&&(e=[e]),assert(isArray(e),"`columns` must be an array of strings."),assert(1===shape(e).length,"`columns` must be a 1-dimensional array of strings."),e=e.map(e=>isString(e)?(assert(s.columns.indexOf(e)>-1,`Column "${e}" does not exist!`),e):isNumber(e)?(assert(e>=0,`Column ${e} is out of bounds!`),assert(e<s.columns.length,`Column ${e} is out of bounds!`),s.columns[e]):void 0);let t=s.copy(),n=copy(t.columns);return e.forEach(e=>{let s=n.indexOf(e);assert(s>-1,`The column "${e}" does not exist!`),n.splice(s,1),t.values=t.values.map(e=>(e.splice(s,1),e))}),0===set(t.values).length?new DataFrame:(t.columns=n,t)}dropRows(e){let s=this;isUndefined(e)&&(e=[]),(isNumber(e)||isString(e))&&(e=[e]),assert(isArray(e),"`rows` must be an array of strings."),assert(1===shape(e).length,"`rows` must be a 1-dimensional array of strings."),e=e.map(e=>isString(e)?(assert(s.index.indexOf(e)>-1,`Row "${e}" does not exist!`),e):isNumber(e)?(assert(e>=0,`Row ${e} is out of bounds!`),assert(e<s.index.length,`Row ${e} is out of bounds!`),s.index[e]):void 0);let t=s.copy(),n=copy(t.index);return e.forEach(e=>{let s=n.indexOf(e);assert(s>-1,`The row "${e}" does not exist!`),n.splice(s,1),t.values.splice(s,1)}),0===set(t.values).length?new DataFrame:(t.index=n,t)}toObject(){let e=this,s={};return e.values.forEach((t,n)=>{let a={};t.forEach((s,t)=>{a[e.columns[t]]=s}),s[e.index[n]]=a}),s}toCSVString(){let e=["(index)"].concat(copy(this.index));return[copy(this.columns)].concat(this.values).map((s,t)=>[e[t]].concat(s).map(e=>"string"==typeof e?quote(e):e).join(",")).join("\n")}toCSV(e){let s=this.toCSVString();if("undefined"!=typeof window){if(e.includes("/")){let s=e.split("/");e=s[s.length-1]}let t=document.createElement("a");t.href=`data:text/csv;charset=utf-8,${encodeURIComponent(s)}`,t.download=e,t.dispatchEvent(new MouseEvent("click"))}else{let t=require("fs"),n=require("path");t.writeFileSync(n.resolve(e),s,"utf8")}return this}print(){let e=this.copy(),s="undefined"==typeof window?Math.floor(process.stdout.columns/24)-1:10,t="undefined"==typeof window?20:10;if(e.columns.length>s){let t=(e=e.getSubsetByNames(null,e.columns.slice(0,s/2).concat(e.columns.slice(e.columns.length-s/2,e.columns.length)))).columns;e=(e=e.assign({"...":range(0,e.index.length).map(e=>"...")})).loc(null,t.slice(0,t.length/2).concat(["..."]).concat(t.slice(t.length/2,t.length)))}if(e.index.length>t){let s=(e=e.getSubsetByIndices(range(0,t/2).concat(range(e.index.length-t/2,e.index.length)),null)).index;e.index.push("..."),e.values.push(range(0,e.columns.length).map(e=>"...")),e=e.loc(s.slice(0,s.length/2).concat(["..."]).concat(s.slice(s.length/2,s.length)),null)}return console.table(e.toObject()),this}sort(e,s){let t=this.copy(),n=random().toString();return t=t.assign(n,t.index),isUndefined(e)&&(e=[n],s=[!0]),(isNumber(e)||isString(e))&&(e=[e],(isBoolean(s)||isString(s))&&(s=[s])),assert(isArray(e),"The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."),assert(1===shape(e).length,"The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."),isUndefined(s)&&(s=range(0,e.length).map(e=>!0)),assert(isArray(s),"The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."),assert(1===shape(s).length,"The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."),assert(e.length===s.length,"The arrays passed into the `sort` method must be equal in length."),e=e.map(e=>{if(assert(isString(e)||isNumber(e),"Column references can either be column names (as strings) or column indices (as whole numbers)."),isString(e)){let s=t.columns.indexOf(e);return assert(s>-1,`The column "${e}" does not exist!`),s}if(isNumber(e))return assert(parseInt(e)===e,"Column indices must be whole numbers!"),assert(e>=0,`The column index ${e} is out of bounds!`),assert(e<t.columns.length,`The index ${e} is out of bounds!`),e}),s=s.map(e=>{if(assert(isString(e)||isBoolean(e),"Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."),isString(e)){let s=e.trim().toLowerCase();return assert("ascending"===s||"descending"===s,"Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."),"ascending"===s}if(isBoolean(e))return e}),t.values=sort(t.values,(t,n)=>{let a=0;for(;t[e[a]]===n[e[a]]&&a<e.length;)a++;let r=s[a];return t[e[a]]===n[e[a]]?0:t[e[a]]<n[e[a]]?r?-1:1:t[e[a]]>n[e[a]]?r?1:-1:void 0}),t.index=flatten(t.get(null,n).values),t=t.dropColumns(n)}sortByIndex(){return this.sort()}filter(e,s){assert(isFunction(e),"The `filter` method takes a single parameter: a function that is used to filter the values."),isUndefined(s)&&(s=0),assert(0===s||1===s,"The `axis` parameter to the `filter` method must be 0 or 1.");if(this.isEmpty())return this.copy();let t=this.copy(),n=copy(t.index),a=copy(t.columns);if(0===s){let s=Math.random().toString(),a=(t=t.assign(s,t.index)).values.filter((s,a)=>{let r=e(s,a,t);return r||n.splice(a,1),r});if(0===flatten(a).length)return new DataFrame;1===shape(a).length&&(a=[a]),t.values=a,t.index=t.get(null,s).values,t=t.drop(null,s)}else if(1===s){t=t.transpose();let s=Math.random().toString(),n=(t=t.assign(s,t.index)).values.filter((s,n)=>{let r=e(s,n,t);return r||a.splice(n,1),r});if(0===flatten(n).length)return new DataFrame;1===shape(n).length&&(n=[n]),t.values=n,t.index=t.get(null,s).values,t=(t=t.drop(null,s)).transpose()}return t}shuffle(e){isUndefined(e)&&(e=0),assert(0===e||1===e,"The `axis` parameter to the `shuffle` must be 0, 1, or undefined.");return this.get(0===e?shuffle(this.index):null,1===e?shuffle(this.columns):null)}}if(module.exports=DataFrame,!module.parent&&"undefined"==typeof window){let e=require("./is-equal.js"),s=require("./normal.js"),t=require("./flatten.js"),n=require("./distance.js"),a=require("./zeros.js"),r=require("./chop.js"),i=(require("./print.js"),[17,32]),o=s(i),l=new DataFrame(o);assert(isDataFrame(l),"`df` is not a DataFrame!"),assert(e(l.shape,i),"The shape of the DataFrame is not the same as the shape of its data!"),assert(!l.isEmpty(),"`df` should not be empty!"),assert((new DataFrame).isEmpty(),"New DataFrames should be empty!");let u=set(l.clear().values);assert(1===u.length&&isUndefined(u[0]),"Cleared DataFrames should only have `undefined` values.");let d=s(100),h=s(100),m=s(100),c=(l=new DataFrame({a:d,b:h,c:m})).shape;assert(e(d,t(l.loc(null,["a"]).values)),"The values in column 'a' are not the same as the values used to create it!"),assert(e(h,t(l.loc(null,["b"]).values)),"The values in column 'b' are not the same as the values used to create it!"),assert(e(m,t(l.loc(null,["c"]).values)),"The values in column 'c' are not the same as the values used to create it!"),assert(e(l.values,l.transpose().transpose().values),"A doubly-transposed DataFrame should have the same values as the original!"),assert(0===r(n(l.values,a(l.shape))-n(l.transpose().values,a(l.transpose().shape))),"A transposed DataFrame's values should have the same 2-norm as the original!"),assert(isDataFrame(l.getSubsetByNames(null,["b","c"])),"A two-dimensional result should be a DataFrame, not a Series!");let f=new Series(s(100));f.name="e",l=l.assign(f),assert(e(f.values,t(l.loc(null,["e"]).values)),"The values in column 'e' are not the same as the values used to create it!");let g=!1;try{l.loc(l.index,l.columns),g=!1}catch(e){g=!0}assert(!g,"`df.loc(df.index, df.columns)` should not have failed!");try{l.loc([],l.columns),g=!1}catch(e){g=!0}assert(g,"`df.loc([], df.columns)` should have failed!");try{l.loc(l.index,[]),g=!1}catch(e){g=!0}assert(g,"`df.loc(df.index, [])` should have failed!");try{l.loc(["this doesn't exist"],["this doesn't exist"]),g=!1}catch(e){g=!0}assert(g,'`df.loc(["this doesn\'t exist"], ["this doesn\'t exist"])` should have failed!');try{l.iloc(range(0,c[0]),range(0,c[1])),g=!1}catch(e){g=!0}assert(!g,"`df.iloc(range(0, dfShape[0]), range(0, dfShape[1]))` should not have failed!");try{l.iloc(),g=!1}catch(e){g=!0}assert(!g,"`df.iloc()` should not have failed!");try{l.iloc([-5],[-7]),g=!1}catch(e){g=!0}assert(g,"`df.iloc([-5], [-7])` should have failed!");try{l.iloc([500],[700]),g=!1}catch(e){g=!0}assert(g,"`df.iloc([500], [700])` should have failed!");let p=l.copy();assert(e(l,p),"A DataFrame and its copy should evaluate as equal!"),assert(!(l===p),"A DataFrame and its copy should not be the same object!"),l.index=range(0,c[0]).map(e=>Math.random().toString()),assert(!e(l.index,p.index),"`df` should now have random row names!"),l=l.resetIndex(),assert(e(l.index,p.index),"`df` should now have its original row names!");let b=s(100);l=l.assign({d:b}),assert(e(b,t(l.loc(null,["d"]).values)),"The values in column 'd' are not the same as the values used to create it!"),d=random(100),l=l.assign({a:d}),assert(e(d,t(l.loc(null,["a"]).values)),"The values in column 'a' are not the same as the values that were assigned to it!"),l=(l=new DataFrame(a([3,3]))).apply((e,s)=>e.map((e,t)=>s+"/"+t));let y=[["col0/0","col1/0","col2/0"],["col0/1","col1/1","col2/1"],["col0/2","col1/2","col2/2"]];assert(e(y,l.values),"The DataFrame's new values should be as I've described!"),l=(l=new DataFrame(a([3,3]))).apply((e,s)=>e.map((e,t)=>s+"/"+t),1),assert(e(y=[["row0/0","row0/1","row0/2"],["row1/0","row1/1","row1/2"],["row2/0","row2/1","row2/2"]],l.values),"The DataFrame's new values should be as I've described!"),l=new DataFrame([[0,null],[1,"foo"],[2,"bar"],[3,null],[4,null],[null,"uh-oh"]]),assert(e(l.dropMissing().shape,[2,2]),"The DataFrame should have a shape of [2, 2] after dropping missing values!"),assert(e(l.dropMissing().index,["row1","row2"]),"The DataFrame's new index should be as I've described!"),assert(l.dropMissing(1).isEmpty(),"The DataFrame should be empty after dropping missing values!"),assert(e(l.dropMissing(1,"all").shape,l.shape),"The DataFrame should have its original shape after trying to drop missing values!"),assert(e(l.dropMissing(1,null,4).shape,l.shape),"The DataFrame should have its original shape after trying to drop missing values!"),assert(e(l.dropMissing(1,null,3).shape,[6,1]),"The DataFrame should have a shape of [6, 1] after dropping missing values!"),assert(l.dropMissing(1,null,1).isEmpty(),"The DataFrame should be empty after dropping missing values!");let x=[[3,8,9,6,10,1,8,5,9,6],[9,2,6,0,10,6,3,5,10,8],[4,9,1,4,9,4,8,9,6,7],[1,5,7,7,7,1,0,9,8,5],[5,6,4,1,6,7,2,8,6,1],[3,3,1,2,5,5,8,5,3,2],[6,8,2,4,4,8,2,8,7,4],[10,8,0,4,4,8,4,2,5,3],[5,7,3,4,1,2,8,4,6,4],[3,3,7,5,1,8,9,2,6,8]],w=(o=new DataFrame([[5,6,4,1,6,7,2,8,6,1],[3,8,9,6,10,1,8,5,9,6],[5,7,3,4,1,2,8,4,6,4],[6,8,2,4,4,8,2,8,7,4],[3,3,7,5,1,8,9,2,6,8],[1,5,7,7,7,1,0,9,8,5],[10,8,0,4,4,8,4,2,5,3],[9,2,6,0,10,6,3,5,10,8],[4,9,1,4,9,4,8,9,6,7],[3,3,1,2,5,5,8,5,3,2]])).sort(["col4","col5","col1"],[!1,!0,!1]);assert(e(w.values,x),"The `sort` method didn't work as expected!"),assert(e(w.index,["row1","row7","row8","row5","row0","row9","row3","row6","row2","row4"]),"The indices of the sorted DataFrame are not correct!"),assert(e(w.columns,["col0","col1","col2","col3","col4","col5","col6","col7","col8","col9"]),"The columns of the sorted DataFrame are not correct!"),console.log("All tests passed!")}

}).call(this)}).call(this,require('_process'))
},{"./apply.js":4,"./assert.js":11,"./chop.js":13,"./copy.js":16,"./distance.js":22,"./flatten.js":27,"./is-array.js":35,"./is-boolean.js":36,"./is-equal.js":37,"./is-function.js":38,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./max.js":45,"./min.js":48,"./ndarray.js":50,"./normal.js":51,"./print.js":55,"./random.js":56,"./range.js":57,"./series.js":62,"./set.js":63,"./shape.js":64,"./sort.js":69,"./transpose.js":74,"./zeros.js":78,"_process":81,"fs":79,"path":80}],22:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),flatten=require("./flatten.js"),pow=require("./pow.js"),sum=require("./sum.js"),add=require("./add.js"),scale=require("./scale.js");function distance(e,s){assert(!isUndefined(e)&&!isUndefined(s),"You must pass two congruently-shaped arrays of numbers into the `distance` function!");let a=shape(e),t=shape(s);return assert(a.length===t.length,"You must pass two congruently-shaped arrays of numbers into the `distance` function!"),assert(0===sum(add(a,scale(t,-1))),"You must pass two congruently-shaped arrays of numbers into the `distance` function!"),flatten(e).concat(flatten(s)).forEach(function(e){assert(isNumber(e),"The `distance` function only works on numbers!")}),pow(sum(pow(add(e,scale(s,-1)),2)),.5)}if(module.exports=distance,!module.parent&&"undefined"==typeof window){let e,s=require("./normal.js"),a=[4,6],t=[1,2];assert(5===distance(a,t),"distance([4, 6], [1, 2]) should be 5!"),assert(distance(a=[-2,-2],t=[-1,-1])===pow(2,.5),"distance([-2, -2], [-1, -1]) should be sqrt(2)!"),a=s([5,5,5,5]),assert(0===distance(a,a),"distance(x, x) should be 0!");try{e=!1,distance()}catch(s){e=!0}assert(e,"distance() should have failed!");try{e=!1,distance(s(5),s(6))}catch(s){e=!0}assert(e,"distance(normal(5), normal(6)) should have failed!");try{e=!1,distance(!0,!1)}catch(s){e=!0}assert(e,"distance(true, false) should have failed!");try{e=!1,distance("foo","bar")}catch(s){e=!0}assert(e,'distance("foo", "bar") should have failed!');try{e=!1,distance({},{})}catch(s){e=!0}assert(e,"distance({}, {}) should have failed!");try{let s=()=>{};e=!1,distance(s,s)}catch(s){e=!0}assert(e,"distance(fn, fn) should have failed!");try{let s;e=!1,distance(s,s)}catch(s){e=!0}assert(e,"distance(foo, foo) should have failed!"),console.log("All tests passed!")}

},{"./add.js":2,"./assert.js":11,"./flatten.js":27,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./pow.js":54,"./scale.js":60,"./shape.js":64,"./sum.js":72}],23:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),min=require("./min.js"),max=require("./max.js"),apply=require("./apply.js");function distrib(s,i){assert(!isUndefined(s),"You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!"),assert(isArray(s),"You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!");let t=flatten(s);t.forEach(s=>assert(isNumber(s)),"You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!"),isUndefined(i)?i=parseInt(t.length/10):(assert(isNumber(i),"You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!"),assert(i===parseInt(i),"You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!"));let e=[],r=min(t),a=max(t),n=(a-r)/i;for(let s=r;s<a;s+=n){let i=t.filter(i=>i>=s&&i<s+n||s+n>=a&&i>=a),r=i.length;i.forEach(s=>t.splice(t.indexOf(s),1)),e.push(r)}return e}if(module.exports=distrib,!module.parent&&"undefined"==typeof window){let s,i=require("./is-equal.js"),t=(require("./normal.js"),[1,1,1,1,1,2,2,2,2,3,3,3,4,4,5]),e=5,r=[5,4,3,2,1],a=distrib(t,e);assert(i(r,a),`distrib([1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5], 5) should be [5, 4, 3, 2, 1], but instead was [${a.join(", ")}]!`),r=[1,1,1,1,1,1,1,1],a=distrib(t=[3,4,5,6,7,8,9,10],e=8),assert(i(r,a),`distrib([3, 4, 5, 6, 7, 8, 9, 10], 8) should be [1, 1, 1, 1, 1, 1, 1, 1], but instead was [${a.join(", ")}]!`),r=[6,4,7],a=distrib(t=[-2.5,-2.5,-1.5,-1.5,-1.5,-1.5,-.5,.5,.5,.5,1.5,1.5,1.5,1.5,1.5,2.5,2.5],e=3),assert(i(r,a),`distrib([-2.5, -2.5, -1.5, -1.5, -1.5, -1.5, -0.5, 0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 2.5], 3) should be [6, 4, 7], but instead was [${a.join(", ")}]!`);try{s=!1,distrib()}catch(i){s=!0}assert(s,"distrib() should have failed!");try{s=!1,distrib(!0)}catch(i){s=!0}assert(s,"distrib(true) should have failed!");try{s=!1,distrib("foo")}catch(i){s=!0}assert(s,'distrib("foo") should have failed!');try{s=!1,distrib(234)}catch(i){s=!0}assert(s,"distrib(234) should have failed!");try{let i;s=!1,distrib(i)}catch(i){s=!0}assert(s,"distrib(foo) should have failed!");try{s=!1,distrib(()=>{})}catch(i){s=!0}assert(s,"distrib(() => {}) should have failed!");try{s=!1,distrib({})}catch(i){s=!0}assert(s,"distrib({}) should have failed!");try{s=!1,distrib([],"foo")}catch(i){s=!0}assert(s,'distrib([], "foo") should have failed!');try{s=!1,distrib([],!0)}catch(i){s=!0}assert(s,"distrib(true) should have failed!");try{s=!1,distrib([],[])}catch(i){s=!0}assert(s,"distrib([]) should have failed!");try{s=!1,distrib([],{})}catch(i){s=!0}assert(s,"distrib([], {}) should have failed!");try{s=!1,distrib([],()=>{})}catch(i){s=!0}assert(s,"distrib([], () => {}) should have failed!"),console.log("All tests passed!")}

},{"./apply.js":4,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-equal.js":37,"./is-number.js":39,"./is-undefined.js":41,"./max.js":45,"./min.js":48,"./normal.js":51}],24:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isEqual=require("./is-equal.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),sum=require("./sum.js"),scale=require("./scale.js"),transpose=require("./transpose.js");function dot(e,t){assert(!isUndefined(e)&&!isUndefined(t),"You must pass two arrays of numbers into the `dot` function!"),assert(isArray(e)&&isArray(t),"You must pass two arrays of numbers into the `dot` function!"),flatten(e).concat(flatten(t)).forEach(function(e){assert(isNumber(e),"The `dot` function only works on numbers!")});let s=shape(e),o=shape(t);if(assert(s.length<=2&&o.length<=2,"I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!"),assert(s[s.length-1]===o[0],`There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${s[s.length-1]} !== ${o[0]})`),1===s.length&&1===o.length)return sum(scale(e,t));if(1===s.length&&2===o.length)return transpose(t).map(t=>dot(e,t));if(2===s.length&&1===o.length)return e.map(e=>dot(e,t));if(2===s.length&&2===o.length){let s=transpose(t),o=[];for(let t=0;t<e.length;t++){let a=[];for(let o=0;o<s.length;o++)a.push(dot(e[t],s[o]));o.push(a)}return o}}if(module.exports=dot,!module.parent&&"undefined"==typeof window){let e,t=require("./normal.js"),s=[2,3,4],o=[5,6,7],a=56,r=dot(s,o);assert(isEqual(a,r),"dot([2, 3, 4], [5, 6, 7]) should be 56!"),a=[[49,54,59],[87,96,105],[125,138,151]],r=dot(s=[[2,3],[4,5],[6,7]],o=[[8,9,10],[11,12,13]]),assert(isEqual(a,r),"dot([[2, 3], [4, 5], [6, 7]], [[8, 9, 10], [11, 12, 13]]) should be [[49, 54, 59], [87, 96, 105], [125, 138, 151]]!"),a=[100,90],r=dot(s=[4,3,2,1],o=[[12,11],[10,9],[8,7],[6,5]]),assert(isEqual(a,r),"dot([4, 3, 2, 1], [[12, 11], [10, 9], [8, 7], [6, 5]]) should be [100, 90]!"),a=[205,530],r=dot(s=[[1,2,3,4,5],[6,7,8,9,10]],o=[11,12,13,14,15]),assert(isEqual(a,r),"dot([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], [11, 12, 13, 14, 15]) should be [100, 90]!");try{e=!1,dot()}catch(t){e=!0}assert(e,"dot() should have failed!");try{e=!1,dot(2,3)}catch(t){e=!0}assert(e,"dot(2, 3) should have failed!");try{e=!1,dot(!0,!1)}catch(t){e=!0}assert(e,"dot(true, false) should have failed!");try{e=!1,dot("foo","bar")}catch(t){e=!0}assert(e,'dot("foo", "bar") should have failed!');try{e=!1,dot(t([2,3]),t([2,3]))}catch(t){e=!0}assert(e,"dot(normal([2, 3]), normal([2, 3])) should have failed!");try{e=!1,dot(t([2,3,4]))}catch(t){e=!0}assert(e,"dot([2, 3, 4]) should have failed!");try{let t=()=>{};e=!1,dot(t,t)}catch(t){e=!0}assert(e,"dot(fn, fn) should have failed!");try{let t;e=!1,dot(t,t)}catch(t){e=!0}assert(e,"dot(foo, foo) should have failed!");try{e=!1,dot({},{})}catch(t){e=!0}assert(e,"dot({}, {}) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-equal.js":37,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./scale.js":60,"./shape.js":64,"./sum.js":72,"./transpose.js":74}],25:[function(require,module,exports){
function downloadJSON(e,t){let n=document.createElement("a");n.href=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(e,null,"\t"))}`,n.download=t,n.dispatchEvent(new MouseEvent("click"))}module.exports=downloadJSON;

},{}],26:[function(require,module,exports){
(function (global){(function (){
function dump(o,u=["dump"]){Object.keys(o).forEach(function(d){u.indexOf(d)<0&&(global[d]=o[d])})}module.exports=dump;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],27:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function flatten(t){assert(!isUndefined(t),"You must pass one array into the `flatten` function!"),assert(isArray(t),"The `flatten` function only works on arrays!");let e=[];return t.forEach(function(t){isArray(t)?e=e.concat(flatten(t)):e.push(t)}),e}if(module.exports=flatten,!module.parent&&"undefined"==typeof window){let t,e=require("./normal.js"),a=[2,3,4],s=[2,3,4],l=flatten(a);for(let t=0;t<s.length;t++)assert(s[t]===l[t],"flatten([2, 3, 4]) should be [2, 3, 4]!");s=[2,3,4,5,6,7],l=flatten(a=[[2,3,4],[5,6,7]]);for(let t=0;t<s.length;t++)assert(s[t]===l[t],"flatten([[2, 3, 4], [5, 6, 7]]) should be [2, 3, 4, 5, 6, 7]!");l=flatten(a=e([2,3,4,5])),assert(120===l.length,"flatten(normal([2, 3, 4, 5])) should have 120 values!");try{t=!1,flatten()}catch(e){t=!0}assert(t,"flatten() should have failed!");try{t=!1,flatten({})}catch(e){t=!0}assert(t,"flatten({}) should have failed!");try{t=!1,flatten(!0)}catch(e){t=!0}assert(t,"flatten(true) should have failed!");try{t=!1,flatten("foo")}catch(e){t=!0}assert(t,'flatten("foo") should have failed!');try{t=!1,flatten(()=>{})}catch(e){t=!0}assert(t,"flatten(() => {}) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-undefined.js":41,"./normal.js":51}],28:[function(require,module,exports){
const vectorize=require("./vectorize.js");module.exports=vectorize(e=>parseFloat(e));

},{"./vectorize.js":77}],29:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),floor=vectorize(function(e){return assert(!isUndefined(e),"You must pass a single number or a single array of numbers into the `floor` function!"),assert(isNumber(e),"The `floor` function only works on numbers!"),Math.floor(e)});if(module.exports=floor,!module.parent&&"undefined"==typeof window){let e,o=require("./random.js"),r=require("./zeros.js"),s=5.95,t=5,l=floor(s);assert(t===l,`floor(${s}) should be ${t}, but instead was ${l}!`),t=-4,l=floor(s=-3.25),assert(t===l,`floor(${s}) should be ${t}, but instead was ${l}!`),t=[1,2,3],l=floor(s=[1.25,2.5,3.75]);for(let e=0;e<t.length;e++)assert(t[e]===l[e],`floor(${s[e]}) should be ${t[e]}, but instead was ${l[e]}!`);s=o([500]),t=r([500]),l=floor(s);for(let e=0;e<t.length;e++)assert(t[e]===l[e],`floor(${s[e]}) should be ${t[e]}, but instead was ${l[e]}!`);try{e=!1,floor("foo")}catch(o){e=!0}assert(e,'floor("foo") should have failed!');try{e=!1,floor({})}catch(o){e=!0}assert(e,"floor({}) should have failed!");try{e=!1,floor([1,2,"three"])}catch(o){e=!0}assert(e,'floor([1, 2, "three"]) should have failed!');try{let o;e=!1,floor(o)}catch(o){e=!0}assert(e,"floor(foo) should have failed!");try{e=!1,floor(()=>{})}catch(o){e=!0}assert(e,"floor(() => {}) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./random.js":56,"./vectorize.js":77,"./zeros.js":78}],30:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),zeros=require("./zeros.js");function identity(t){assert(!isUndefined(t),"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(isNumber(t),"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(parseInt(t)===t,"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(t>0,"You must pass an integer greater than 0 (representing the size) into the `identity` function!");let e=zeros([t,t]);for(let i=0;i<t;i++)e[i][i]=1;return e}if(module.exports=identity,!module.parent&&"undefined"==typeof window){function isIdentity(t){for(let e=0;e<t.length;e++){let i=t[e];for(let n=0;n<i.length;n++)if(e===n){if(1!==t[e][n])return!1}else if(0!==t[e][n])return!1}return!0}let t,e=identity(100);assert(isIdentity(e),"identity(100) is not an identity matrix!");try{t=!1,identity()}catch(e){t=!0}assert(t,"identity() should have failed!");try{t=!1,identity("foo")}catch(e){t=!0}assert(t,'identity("foo") should have failed!');try{t=!1,identity(23.4)}catch(e){t=!0}assert(t,"identity(23.4) should have failed!");try{t=!1,identity(-10)}catch(e){t=!0}assert(t,"identity(-10) should have failed!");try{t=!1,identity(!0)}catch(e){t=!0}assert(t,"identity(true) should have failed!");try{t=!1,identity({})}catch(e){t=!0}assert(t,"identity({}) should have failed!");try{t=!1,identity(()=>{})}catch(e){t=!0}assert(t,"identity(() => {}) should have failed!");try{let e;t=!1,identity(e)}catch(e){t=!0}assert(t,"identity(foo) should have failed!");try{t=!1,identity([])}catch(e){t=!0}assert(t,"identity([]) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./zeros.js":78}],31:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),shape=require("./shape.js"),isEqual=require("./is-equal.js");function indexOf(e,s,i){if(assert(!isUndefined(e),"You must pass an array and a value into the `indexOf` function!"),assert(isArray(e),"You must pass an array and a value into the `indexOf` function!"),1===shape(e).length||isArray(s)&&isEqual(shape(e[0]),shape(s))){for(let n=0;n<e.length;n++){let d=e[n];if(isEqual(d,s)&&(!i||d===s))return[n]}return null}for(let i=0;i<e.length;i++){let n=indexOf(e[i],s);if(n)return[i].concat(n)}return null}if(module.exports=indexOf,!module.parent&&"undefined"==typeof window){const e=require("./normal.js");require("./seed.js")(12345);let s=e([10,10,10,10]),i=[5,4,2,7],n=indexOf(s,s[5][4][2][7]);assert(isEqual(i,n),`Uh-oh! The predicted index should've been [${i.join(", ")}], but instead it was [${n.join(", ")}]!`),s=e(100),i=57,n=indexOf(s,s[57])[0],assert(isEqual(i,n),`Uh-oh! The predicted index should've been ${i}, but instead it was ${n}!`),assert(isUndefined(indexOf(s,"foo")),`Uh-oh! The predicted index should've been null, but instead it was ${indexOf(s,"foo")}!`),s=e([10,10,10,10]),i=[5,4,2],n=indexOf(s,s[5][4][2]),assert(isEqual(i,n),`Uh-oh! The predicted index should've been [${i.join(", ")}], but instead it was [${n.join(", ")}]!`),i=2,n=indexOf(s=["foo","bar",{hello:"world"}],{hello:"world"})[0],assert(isEqual(i,n),`Uh-oh! The predicted index should've been ${i}, but instead it was ${n}!`),n=indexOf(s,{hello:"world"},!0),assert(isUndefined(n),`Uh-oh! The predicted index should've been undefined, but instead it was ${n}!`),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-equal.js":37,"./is-undefined.js":41,"./normal.js":51,"./seed.js":61,"./shape.js":64}],32:[function(require,module,exports){
let out={abs:require("./abs.js"),add:require("./add.js"),append:require("./append.js"),apply:require("./apply.js"),arccos:require("./arccos.js"),arcsin:require("./arcsin.js"),arctan:require("./arctan.js"),argmax:require("./argmax.js"),argmin:require("./argmin.js"),array:require("./array.js"),assert:require("./assert.js"),ceil:require("./ceil.js"),chop:require("./chop.js"),clamp:require("./clamp.js"),cohensd:require("./cohens-d.js"),copy:require("./copy.js"),correl:require("./correl.js"),cos:require("./cos.js"),count:require("./count.js"),covariance:require("./covariance.js"),DataFrame:require("./dataframe.js"),distance:require("./distance.js"),distrib:require("./distrib.js"),dot:require("./dot.js"),downloadJson:require("./download-json.js"),dump:require("./dump.js"),flatten:require("./flatten.js"),float:require("./float.js"),floor:require("./floor.js"),identity:require("./identity.js"),indexOf:require("./index-of.js"),int:require("./int.js"),inverse:require("./inverse.js"),isArray:require("./is-array.js"),isBoolean:require("./is-boolean.js"),isEqual:require("./is-equal.js"),isFunction:require("./is-function.js"),isNumber:require("./is-number.js"),isString:require("./is-string.js"),isUndefined:require("./is-undefined.js"),lerp:require("./lerp.js"),log:require("./log.js"),map:require("./map.js"),max:require("./max.js"),mean:require("./mean.js"),median:require("./median.js"),min:require("./min.js"),mode:require("./mode.js"),ndarray:require("./ndarray.js"),normal:require("./normal.js"),ones:require("./ones.js"),pause:require("./pause.js"),pow:require("./pow.js"),print:require("./print.js"),random:require("./random.js"),range:require("./range.js"),reverse:require("./reverse.js"),round:require("./round.js"),scale:require("./scale.js"),seed:require("./seed.js"),Series:require("./series.js"),set:require("./set.js"),shape:require("./shape.js"),shuffle:require("./shuffle.js"),sign:require("./sign.js"),sin:require("./sin.js"),slice:require("./slice.js"),sort:require("./sort.js"),sqrt:require("./sqrt.js"),std:require("./std.js"),sum:require("./sum.js"),tan:require("./tan.js"),transpose:require("./transpose.js"),valueAt:require("./value-at.js"),variance:require("./variance.js"),vectorize:require("./vectorize.js"),zeros:require("./zeros.js")};"undefined"!=typeof module&&(module.exports=out),"undefined"!=typeof window&&(window.JSMathTools=out);

},{"./abs.js":1,"./add.js":2,"./append.js":3,"./apply.js":4,"./arccos.js":5,"./arcsin.js":6,"./arctan.js":7,"./argmax.js":8,"./argmin.js":9,"./array.js":10,"./assert.js":11,"./ceil.js":12,"./chop.js":13,"./clamp.js":14,"./cohens-d.js":15,"./copy.js":16,"./correl.js":17,"./cos.js":18,"./count.js":19,"./covariance.js":20,"./dataframe.js":21,"./distance.js":22,"./distrib.js":23,"./dot.js":24,"./download-json.js":25,"./dump.js":26,"./flatten.js":27,"./float.js":28,"./floor.js":29,"./identity.js":30,"./index-of.js":31,"./int.js":33,"./inverse.js":34,"./is-array.js":35,"./is-boolean.js":36,"./is-equal.js":37,"./is-function.js":38,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./lerp.js":42,"./log.js":43,"./map.js":44,"./max.js":45,"./mean.js":46,"./median.js":47,"./min.js":48,"./mode.js":49,"./ndarray.js":50,"./normal.js":51,"./ones.js":52,"./pause.js":53,"./pow.js":54,"./print.js":55,"./random.js":56,"./range.js":57,"./reverse.js":58,"./round.js":59,"./scale.js":60,"./seed.js":61,"./series.js":62,"./set.js":63,"./shape.js":64,"./shuffle.js":65,"./sign.js":66,"./sin.js":67,"./slice.js":68,"./sort.js":69,"./sqrt.js":70,"./std.js":71,"./sum.js":72,"./tan.js":73,"./transpose.js":74,"./value-at.js":75,"./variance.js":76,"./vectorize.js":77,"./zeros.js":78}],33:[function(require,module,exports){
const vectorize=require("./vectorize.js");module.exports=vectorize(e=>parseInt(e));

},{"./vectorize.js":77}],34:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),slice=require("./slice.js"),dot=require("./dot.js"),add=require("./add.js"),scale=require("./scale.js"),append=require("./append.js"),range=require("./range.js");function inverse(e){assert(!isUndefined(e),"You must pass a square 2D array into the `inverse` function!"),assert(isArray(e),"You must pass a square 2D array into the `inverse` function!"),flatten(e).forEach(e=>assert(isNumber(e),"The array passed into the `inverse` function must contain only numbers!"));let s=shape(e);if(assert(2===s.length,"The array passed into the `inverse` function must be exactly two-dimensional and square!"),assert(s[0]===s[1],"The array passed into the `inverse` function must be exactly two-dimensional and square!"),assert(s[0]>=0,"The array passed into the `inverse` function must be exactly two-dimensional and square!"),0===s[0])return e;if(1===s[0])return assert(0!==e[0][0],"This matrix cannot be inverted!"),1/e[0][0];if(2===s[0]){let s=e[0][0],r=e[0][1],a=e[1][0],i=e[1][1],t=s*i-r*a;return assert(0!==t,"This matrix cannot be inverted!"),scale([[i,-r],[-a,s]],1/t)}if(s[0]>1){let r=(e,s)=>isNumber(e)||isNumber(s)?scale(e,s):dot(e,s);for(let a=1;a<s[0]-1;a++)try{let i=slice(e,[range(0,a),range(0,a)]),t=slice(e,[range(0,a),range(a,s[0])]),n=slice(e,[range(a,s[0]),range(0,a)]),d=slice(e,[range(a,s[0]),range(a,s[0])]),u=inverse(i),o=inverse(add(d,r(-1,r(r(n,u),t)))),l=add(u,r(r(r(r(u,t),o),n),u)),c=r(-1,r(r(u,t),o)),h=r(-1,r(r(o,n),u)),v=o;return append(append(l,c,1),append(h,v,1),0)}catch(e){}assert(!1,"This matrix cannot be inverted!")}}if(module.exports=inverse,!module.parent&&"undefined"==typeof window){let e,s=require("./identity.js"),r=(require("./is-equal.js"),require("./normal.js")),a=require("./random.js"),i=require("./distance.js"),t=require("./round.js"),n=require("./zeros.js"),d=r([10,10]),u=inverse(d);assert(i(s(10),dot(d,u))<1e-5,"FAIL!"),u=inverse(d=a([20,20])),assert(i(s(20),dot(d,u))<1e-5,"FAIL!"),u=inverse(d=t(add(scale(r([10,10]),10),20))),assert(i(s(10),dot(d,u))<1e-5,"FAIL!"),u=inverse(d=s(10)),assert(i(s(10),dot(d,u))<1e-5,"FAIL!");try{e=!1,inverse()}catch(s){e=!0}assert(e,"inverse() should have failed!");try{e=!1,inverse(234)}catch(s){e=!0}assert(e,"inverse(234) should have failed!");try{e=!1,inverse("foo")}catch(s){e=!0}assert(e,'inverse("foo") should have failed!');try{e=!1,inverse(!0)}catch(s){e=!0}assert(e,"inverse(true) should have failed!");try{e=!1,inverse({})}catch(s){e=!0}assert(e,"inverse({}) should have failed!");try{e=!1,inverse(()=>{})}catch(s){e=!0}assert(e,"inverse(() => {}) should have failed!");try{let s;e=!1,inverse(s)}catch(s){e=!0}assert(e,"inverse(foo) should have failed!");try{e=!1,inverse(d=[[1,2,3],[4,5,6],[7,8,9]])}catch(s){e=!0}assert(e,"inverse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) should have failed!");try{e=!1,inverse(n([10,10]))}catch(s){e=!0}assert(e,"inverse(zeros([10, 10])) should have failed!"),console.log("All tests passed!")}

},{"./add.js":2,"./append.js":3,"./assert.js":11,"./distance.js":22,"./dot.js":24,"./flatten.js":27,"./identity.js":30,"./is-array.js":35,"./is-equal.js":37,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./random.js":56,"./range.js":57,"./round.js":59,"./scale.js":60,"./shape.js":64,"./slice.js":68,"./zeros.js":78}],35:[function(require,module,exports){
function isArray(r){return r instanceof Array}if(module.exports=isArray,!module.parent&&"undefined"==typeof window){let r=require("./assert.js");r(isArray([]),"isArray([]) should return true!"),r(isArray([2,3,4]),"isArray([2, 3, 4]) should return true!"),r(isArray(new Array),"isArray(new Array()) should return true!"),r(!isArray({}),"isArray({}) should return false!"),r(!isArray({push:()=>{}}),"isArray({push: () => {}}) should return false!"),r(!isArray("foo"),'isArray("foo") should return false!'),r(!isArray(!0),"isArray(true) should return false!"),r(!isArray(!1),"isArray(false) should return false!"),r(!isArray(()=>{}),"isArray(() => {}) should return false!"),r(!isArray(3),"isArray(3) should return false!"),console.log("All tests passed!")}

},{"./assert.js":11}],36:[function(require,module,exports){
function isBoolean(o){return"boolean"==typeof o}module.exports=isBoolean;

},{}],37:[function(require,module,exports){
let isArray=require("./is-array.js");function isEqual(l,e){let u=typeof l;if(u!==typeof e)return!1;if("undefined"===u)return!0;if("boolean"===u)return l===e;if("number"===u)return l===e;if("string"===u)return l===e;if("function"===u)return l===e;if("object"===u){if(null===l||null===e)return null===l&&null===e;{let u=Object.keys(l),s=Object.keys(e);if(u.length!==s.length)return!1;for(let s=0;s<u.length;s++){let i=u[s];if(!e.hasOwnProperty(i))return!1;if(!isEqual(l[i],e[i]))return!1}return!0}}}if(module.exports=isEqual,!module.parent&&"undefined"==typeof window){let l=require("./assert.js");l(isEqual(2,2),"isEqual(2, 2) should be true!"),l(isEqual(-3.5,-3.5),"isEqual(-3.5, -3.5) should be true!"),l(isEqual("foo","foo"),'isEqual("foo", "foo") should be true!'),l(isEqual(!0,!0),"isEqual(true, true) should be true!"),l(isEqual(!1,!1),"isEqual(false, false) should be true!"),l(isEqual({},{}),"isEqual({}, {}) should be true!"),l(isEqual(void 0,void 0),"isEqual(undefined, undefined) should be true!"),l(isEqual(null,null),"isEqual(null, null) should be true!"),l(isEqual({x:5},{x:5}),"isEqual({x: 5}, {x: 5}) should be true!"),l(isEqual([2,3,4],[2,3,4]),"isEqual([2, 3, 4], [2, 3, 4]) should be true!");let e=()=>{};l(isEqual(e,e),"isEqual(fn, fn) should be true!");let u={name:"James",friends:["Bill","Sally"]},s={name:"James",friends:["Bill","Sally"]};l(isEqual(u,s),"isEqual(a, b) should be true!");let i=[2,-3.5,"foo",!0,!1,{},void 0,null,{x:5},[2,3,4],{name:"James",friends:["Bill","Sally"]}];for(let e=0;e<i.length-1;e++)for(let r=e;r<i.length;r++)e!==r&&l(!isEqual(u=i[e],s=i[r]),`isEqual(a, b) should be false! (a: ${JSON.stringify(u)}, b: ${JSON.stringify(s)})`);console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35}],38:[function(require,module,exports){
function isFunction(n){return"function"==typeof n}module.exports=isFunction;

},{}],39:[function(require,module,exports){
function isNumber(e){return"number"==typeof e}if(module.exports=isNumber,!module.parent&&"undefined"==typeof window){let e=require("./assert.js");e(isNumber(3),"3 is a number!"),e(isNumber(-3.5),"-3.5 is a number!"),e(isNumber(2573.2903482093484,"2573.2903482093482035023948 is a number!")),e(!isNumber("35"),'"35" is not a number!'),e(!isNumber("foo"),'"foo" is not a number!'),e(!isNumber([2,3,4]),"[2, 3, 4] is not a number!"),e(!isNumber({x:5}),"{x: 5} is not a number!"),e(!isNumber(!0),"true is not a number!"),e(!isNumber(!1),"false is not a number!"),console.log("All tests passed!")}

},{"./assert.js":11}],40:[function(require,module,exports){
function isString(i){return"string"==typeof i}if(module.exports=isString,!module.parent&&"undefined"==typeof window){let i=require("./assert.js");i(isString("hi"),'"hi" is a string!'),i(isString(""),'"" is a string!'),i(isString(""),"`` is a string!"),i(isString("foo","'foo' is a string!")),i(!isString(3),"3 is not a string!"),i(!isString(!0),"true is not a string!"),i(!isString(!1),"false is not a string!"),i(!isString({x:5}),"{x: 5} is not a string!"),i(!isString(["a","b","c"]),'["a", "b", "c"] is not a string!'),console.log("All tests passed!")}

},{"./assert.js":11}],41:[function(require,module,exports){
function isUndefined(e){return null==e}if(module.exports=isUndefined,!module.parent&&"undefined"==typeof window){let e,d,s=require("./assert.js");s(!isUndefined("foo"),'isUndefined("foo") should be false, but instead was true!'),s(!isUndefined({}),"isUndefined({}) should be false, but instead was true!"),s(!isUndefined(3),"isUndefined(3) should be false, but instead was true!"),s(!isUndefined([]),"isUndefined([]) should be false, but instead was true!"),s(!isUndefined(!0),"isUndefined(true) should be false, but instead was true!"),s(!isUndefined(!1),"isUndefined(false) should be false, but instead was true!"),s(!isUndefined(()=>{}),"isUndefined(() => {}) should be false, but instead was true!"),s(isUndefined(e),"isUndefined(x) should be true, but instead was false!");try{d=!1,isUndefined(foo)}catch(e){d=!0}s(d,"isUndefined(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11}],42:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),lerp=vectorize(function(e,s,r){return assert(!isUndefined(e)&&!isUndefined(s)&&!isUndefined(r),"You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `lerp` function!"),assert(isNumber(e)&&isNumber(s)&&isNumber(r),"The `lerp` function only works on numbers!"),r*(s-e)+e});if(module.exports=lerp,!module.parent&&"undefined"==typeof window){let e=0,s=1,r=1,t=lerp(e,s,r);assert(1===t,`lerp(0, 1, 1) should be 1, but instead was ${t}!`),t=lerp(e=-1,s=1,r=.5),assert(0===t,`lerp(-1, 1, 0.5) should be 0, but instead was ${t}!`),t=lerp(e=-100,s=100,r=.75),assert(50===t,`lerp(-100, 100, 0.75) should be 50, but instead was ${t}!`);let l,a=[1.5,2.75,3.9],o=lerp(e=[1,2,3],s=[2,3,4],r=[.5,.75,.9]);for(let t=0;t<a.length;t++)assert(a[t]===o[t],`lerp(${e[t]}, ${s[t]}, ${r[t]}) should be ${a[t]}, but instead was ${o[t]}!`);try{l=!1,lerp(3,4,"foo")}catch(e){l=!0}assert(l,'lerp(3, 4, "foo") should have failed!');try{l=!1,lerp([1],[2,3],.75)}catch(e){l=!0}assert(l,"lerp([1], [2, 3], 0.75) should have failed!");try{l=!1,lerp({},{},{})}catch(e){l=!0}assert(l,"lerp({}, {}, {}) should have failed!");try{let e;l=!1,lerp(e,e,e)}catch(e){l=!0}assert(l,"lerp(foo, foo, foo) should have failed!");try{let e=()=>{};l=!1,lerp(e,e,e)}catch(e){l=!0}assert(l,"lerp(fn, fn, fn) should have failed!");try{l=!1,lerp(1,2)}catch(e){l=!0}assert(l,"lerp(1, 2) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],43:[function(require,module,exports){
let assert=require("./assert.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),log=vectorize(function(e,s){return assert(!isUndefined(e),"You must pass a single number or a single array of numbers into the `log` function!"),assert(isNumber(e),"You must pass a single number or a single array of numbers into the `log` function!"),s=isUndefined(s)?Math.E:s,assert(isNumber(s),"The base parameter of the `log` function must be a number or an array of numbers!"),Math.log(e)/Math.log(s)});if(module.exports=log,!module.parent&&"undefined"==typeof window){let e,s=require("./abs.js"),o=require("./chop.js"),t=Math.E,a=Math.E,r=1,l=log(t,a);assert(r===l,`log(${t}) should be ${r}, but instead was ${l}!`),r=1,l=log(t=10,a=10),assert(r===l,`log(${t}) should be ${r}, but instead was ${l}!`),r=2,l=log(t=100,a=10),assert(r===l,`log(${t}) should be ${r}, but instead was ${l}!`),r=[2,3,4],l=log(t=[100,1e3,1e4],a=10);for(let e=0;e<r.length;e++)assert(0===o(s(r[e]-l[e])),`log(${t[e]}, ${a}) should be ${r[e]}, but instead was ${l[e]}!`);r=[6,3,2],l=log(t=64,a=[2,4,8]);for(let e=0;e<r.length;e++)assert(0===o(s(r[e]-l[e])),`log(${t[e]}, ${a}) should be ${r[e]}, but instead was ${l[e]}!`);assert(0===log([]).length,"log([]) should have produced an empty array!");try{e=!1,log()}catch(s){e=!0}assert(e,"log() should have failed!");try{e=!1,log("foo")}catch(s){e=!0}assert(e,'log("foo") should have failed!');try{e=!1,log({})}catch(s){e=!0}assert(e,"log({}) should have failed!");try{e=!1,log(!0)}catch(s){e=!0}assert(e,"log(true) should have failed!");try{e=!1,log(()=>{})}catch(s){e=!0}assert(e,"log(() => {}) should have failed!");try{let s;e=!1,log(s)}catch(s){e=!0}assert(e,"log(foo) should have failed!"),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./chop.js":13,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],44:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),map=vectorize(function(e,s,a,i,t){return assert(!(isUndefined(e)||isUndefined(s)||isUndefined(a)||isUndefined(i)||isUndefined(t)),"You should pass five numbers (or five equally-sized arrays of numbers) into the `map` function!"),assert(isNumber(e)&&isNumber(s)&&isNumber(a)&&isNumber(i)&&isNumber(t),"The `map` function only works on numbers!"),(t-i)*(e-s)/(a-s)+i});if(module.exports=map,!module.parent&&"undefined"==typeof window){let e,s=1,a=0,i=2,t=0,r=10,d=5,u=map(s,a,i,t,r);assert(d===u,`map(${s}, ${a}, ${i}, ${t}, ${t}) should be ${d}, but instead is ${u}!`),d=300,u=map(s=2,a=1,i=3,t=100,r=500),assert(d===u,`map(${s}, ${a}, ${i}, ${t}, ${t}) should be ${d}, but instead is ${u}!`),d=[200,300,400],u=map(s=[1,2,3],a=0,i=4,t=100,r=500);for(let e=0;e<d.length;e++)assert(d[e]===u[e],`map(${s[e]}, ${a}, ${i}, ${t}, ${r}) should be ${d[e]}, but instead was ${u[e]}!`);try{e=!1,map(1,2,3,4,"five")}catch(s){e=!0}assert(e,'map(1, 2, 3, 4, "five") should have failed!');try{e=!1,map()}catch(s){e=!0}assert(e,"map() should have failed!");try{e=!1,map(1,2,3,4,{})}catch(s){e=!0}assert(e,"map(1, 2, 3, 4, {}) should have failed!");try{let s;e=!1,map(1,2,3,4,s)}catch(s){e=!0}assert(e,"map(1, 2, 3, 4, foo) should have failed!");try{e=!1,map(1,2,3,4,()=>{})}catch(s){e=!0}assert(e,"map(1, 2, 3, 4, () => {}) should have failed!");try{e=!1,map(1,2,3,4,!0)}catch(s){e=!0}assert(e,"map(1, 2, 3, 4, true) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],45:[function(require,module,exports){
let assert=require("./assert.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),isString=require("./is-string.js"),flatten=require("./flatten.js");function max(a){assert(!isUndefined(a),"You must pass one array of numbers into the `max` function!"),assert(isArray(a),"You must pass one array of numbers into the `max` function!");let e=flatten(a);e.forEach(function(a){assert(isNumber(a)||isString(a),"The `max` function only works on numbers or arrays of numbers!")});let s=-1/0;return e.forEach(function(a){a>s&&(s=a)}),s===-1/0?void 0:s}if(module.exports=max,!module.parent&&"undefined"==typeof window){let a,e=require("./normal.js"),s=require("./random.js"),r=require("./min.js"),t=[2,3,4],n=max(t);assert(4===n,`max([2, 3, 4]) should be 4, but instead was ${n}!`),n=max(t=[-10,-5,-20]),assert(-5===n,`max([-10, -5, -20]) should be -5, but instead was ${n}!`),n=max(t=s([1e4])),assert(n<=1&&n>=0,"max(random([10000])) should be >= 0 and <= 1!"),t=e([1e4]),xMin=r(t),xMax=max(t),xRange=xMax-xMin,t=t.map(a=>(a-xMin)/xRange),assert(1===max(t),"max(normalizedData) should be 1!");try{a=!1,max()}catch(e){a=!0}assert(a,"max() should have failed!");try{a=!1,max(2)}catch(e){a=!0}assert(a,"max(2) should have failed!");try{a=!1,max(!0)}catch(e){a=!0}assert(a,"max(true) should have failed!");try{a=!1,max({})}catch(e){a=!0}assert(a,"max({}) should have failed!");try{a=!1,max(()=>{})}catch(e){a=!0}assert(a,"max(() => {}) should have failed!");try{a=!1,max([1,2,"three"])}catch(e){a=!0}assert(!a,'max([1, 2, "three"]) should not have failed!');try{a=!1,max("foo")}catch(e){a=!0}assert(a,'max("foo") should have failed!');try{let e;a=!1,max(e)}catch(e){a=!0}assert(a,"max(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./min.js":48,"./normal.js":51,"./random.js":56}],46:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),sum=require("./sum.js");function mean(e){assert(!isUndefined(e),"You must pass one array of numbers into the `mean` function!"),assert(isArray(e),"You must pass one array of numbers into the `mean` function!");let a=flatten(e);return a.forEach(function(e){assert(isNumber(e),"The `mean` function only works on arrays of numbers!")}),sum(a)/a.length}if(module.exports=mean,!module.parent&&"undefined"==typeof window){let e,a=require("./normal.js"),s=require("./random.js"),r=require("./abs.js"),n=[2,3,4],t=3,o=mean(n);assert(t===o,`mean(2, 3, 4) should be 3, but instead is ${o}!`),o=mean(n=a([1e4])),assert(r(o)<.05,`mean(normal([10000])) should be approximately 0, but instead was ${o}!`),o=mean(n=s([1e4])),assert(o-.5<.05,`mean(random([10000])) should be approximately 0.5, but instead was ${o}!`),o=mean(n=a([10,10,10,10])),assert(r(o)<.05,`mean(normal([10, 10, 10, 10])) should be approximately 0, but instead was ${o}!`);try{e=!1,mean()}catch(a){e=!0}assert(e,"mean() should have failed!");try{e=!1,mean("foo")}catch(a){e=!0}assert(e,'mean("foo") should have failed!');try{e=!1,mean({})}catch(a){e=!0}assert(e,"mean({}) should have failed!");try{e=!1,mean(!0)}catch(a){e=!0}assert(e,"mean(true) should have failed!");try{let a;e=!1,mean(a)}catch(a){e=!0}assert(e,"mean(foo) should have failed!");try{e=!1,mean(()=>{})}catch(a){e=!0}assert(e,"mean(() => {}) should have failed!");try{e=!1,mean([1,2,"three"])}catch(a){e=!0}assert(e,'mean([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./random.js":56,"./sum.js":72}],47:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),sort=require("./sort.js");function median(e){assert(!isUndefined(e),"You must pass one array of numbers into the `median` function!"),assert(isArray(e),"You must pass one array of numbers into the `median` function!");let a,s=flatten(e);return s.forEach(function(e){assert(isNumber(e),"The `median` function only works on numbers!")}),a=(s=sort(s,function(e,a){return e<a?-1:e>a?1:0})).length%2==0?(s[s.length/2-1]+s[s.length/2])/2:s[Math.floor(s.length/2)]}if(module.exports=median,!module.parent&&"undefined"==typeof window){let e=require("./shuffle.js"),a=(require("./normal.js"),require("./random.js")),s=require("./round.js"),r=require("./scale.js"),n=3,t=median([2,4,3]);assert(n===t,`median([2, 4, 3]) should be 3, but instead was ${t}!`);let i,d=s(r(a([5,5,5,5]),100)),o=e(d),u=e(d),m=e(d),l=median(d),f=median(o),h=median(u),c=median(m);assert(l===f&&f===h&&h===c,"The `median` function should return the same median for shuffled versions of the same array!"),assert(isNaN(median([])),"median([]) should be NaN!");try{i=!1,median()}catch(e){i=!0}assert(i,"median() should have failed!");try{i=!1,median("foo")}catch(e){i=!0}assert(i,'median("foo") should have failed!');try{i=!1,median([1,2,"three"])}catch(e){i=!0}assert(i,'median([1, 2, "three"]) should have failed!');try{i=!1,median([!0])}catch(e){i=!0}assert(i,"median([true]) should have failed!");try{i=!1,median([{}])}catch(e){i=!0}assert(i,"median([{}]) should have failed!");try{let e;i=!1,median([e,e,e])}catch(e){i=!0}assert(i,"median([foo, foo, foo]) should have failed!");try{let e=()=>{};i=!1,median([e,e,e])}catch(e){i=!0}assert(i,"median([fn, fn, fn]) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./random.js":56,"./round.js":59,"./scale.js":60,"./shuffle.js":65,"./sort.js":69}],48:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),flatten=require("./flatten.js");function min(e){assert(!isUndefined(e),"You must pass one array of numbers into the `min` function!"),assert(isArray(e),"You must pass one array of numbers into the `min` function!");let s=flatten(e);s.forEach(function(e){assert(isNumber(e)||isString(e),"The `min` function only works on arrays of numbers and/or strings!")});let i=1/0;return s.forEach(function(e){e<i&&(i=e)}),i===1/0?void 0:i}if(module.exports=min,!module.parent&&"undefined"==typeof window){let e,s=require("./random.js"),i=[4,2,3],n=2,r=min(i);assert(n===r,`min([4, 2, 3]) should be 2, but instead was ${r}!`),n=-100,r=min(i=[[-50,50,234],[100,-100,0]]),assert(n===r,`min([[-50, 50, 234], [100, -100, 0]]) should be -100, but instead was ${r}!`),r=min(i=s([2,3,4,5])),assert(r<=1&&r>=0,"min(random([2, 3, 4, 5])) should be >= 0 and <= 1!");try{e=!1,min()}catch(s){e=!0}assert(e,"min() should have failed!");try{e=!1,min(234)}catch(s){e=!0}assert(e,"min(234) should have failed!");try{e=!1,min({})}catch(s){e=!0}assert(e,"min({}) should have failed!");try{e=!1,min("foo")}catch(s){e=!0}assert(e,'min("foo") should have failed!');try{e=!1,min(!0)}catch(s){e=!0}assert(e,"min(true) should have failed!");try{e=!1,min([1,2,"three"])}catch(s){e=!0}assert(!e,'min([1, 2, "three"]) should not have failed!');try{e=!1,min([()=>{}])}catch(s){e=!0}assert(e,"min([() => {}]) should have failed!");try{let s;e=!1,min([s,s,s])}catch(s){e=!0}assert(e,"min([foo, foo, foo]) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./random.js":56}],49:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js"),count=require("./count.js"),set=require("./set.js"),sort=require("./sort.js");function mode(e){assert(!isUndefined(e),"You must pass one array into the `mode` function!"),assert(isArray(e),"You  must pass one array into the `mode` function!");let s=flatten(e),t={},r=set(s);r.forEach(function(e){t[e]=count(s,e)});let o=sort(r,function(e,s){let r=t[e],o=t[s];return r>o?-1:r<o?1:0}),a=o[0];return sort(o.filter(e=>t[e]===t[a]))}if(module.exports=mode,!module.parent&&"undefined"==typeof window){let e=require("./random.js"),s=require("./round.js"),t=require("./shuffle.js"),r=require("./scale.js"),o=[3],a=mode([2,3,3,3,2,4]);for(let e=0;e<o.length;e++)assert(o[e]===a[e],`mode([2, 3, 3, 3, 2, 4]) should be 3, but instead was ${a}!`);let d,n=s(r(e([5,5,5,5]),100)),u=t(n),f=t(n),l=t(n),i=mode(n),h=mode(u),m=mode(f),c=mode(l);for(let e=0;e<i.length;e++)assert(i[e]===h[e],"The `mode` function should return the same mode for shuffled versions of the same array!");for(let e=0;e<i.length;e++)assert(h[e]===m[e],"The `mode` function should return the same mode for shuffled versions of the same array!");for(let e=0;e<i.length;e++)assert(m[e]===c[e],"The `mode` function should return the same mode for shuffled versions of the same array!");try{d=!1,mode()}catch(e){d=!0}assert(d,"mode() should have failed!");try{d=!1,mode("foo")}catch(e){d=!0}assert(d,'mode("foo") should have failed!');try{d=!1,mode({})}catch(e){d=!0}assert(d,"mode({}) should have failed!");try{d=!1,mode(()=>{})}catch(e){d=!0}assert(d,"mode(() => {}) should have failed!");try{d=!1,mode(!0)}catch(e){d=!0}assert(d,"mode(true) should have failed!");try{d=!1,mode()}catch(e){d=!0}assert(d,"mode() should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./count.js":19,"./flatten.js":27,"./is-array.js":35,"./is-undefined.js":41,"./random.js":56,"./round.js":59,"./scale.js":60,"./set.js":63,"./shuffle.js":65,"./sort.js":69}],50:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),floor=require("./floor.js"),range=require("./range.js"),error="You must pass an integer or a one-dimensional array of integers into the `ndarray` function!";function ndarray(r){if(assert(!isUndefined(r),error),isArray(r)||(r=[r]),assert(r.length>0,error),r.forEach(function(r){assert(isNumber(r),error),assert(floor(r)===r,error),assert(r>=0,error)}),1===r.length)return range(0,r[0]).map(r=>void 0);{let a=[];for(let e=0;e<r[0];e++)a.push(ndarray(r.slice(1,r.length)));return a}}if(module.exports=ndarray,!module.parent&&"undefined"==typeof window){let r,a=require("./flatten.js");assert(3===ndarray(3).length,"ndarray(3) should have a length of 3!"),assert(3===ndarray([3]).length,"ndarray([3]) should have a length of 3!"),assert(3===ndarray([3,2]).length,"ndarray([3, 2]) should have a length of 3!"),assert(24===a(ndarray([2,3,4])).length,"flatten(ndarray([2, 3, 4])) should have a length of 24!");try{r=!1,ndarray()}catch(a){r=!0}assert(r,"ndarray() should have failed!");try{r=!1,ndarray("foo")}catch(a){r=!0}assert(r,'ndarray("foo") should have failed!');try{r=!1,ndarray(3.5)}catch(a){r=!0}assert(r,"ndarray(3.5) should have failed!");try{r=!1,ndarray(-10)}catch(a){r=!0}assert(r,"ndarray(-10) should have failed!");try{r=!1,ndarray({})}catch(a){r=!0}assert(r,"ndarray({}) should have failed!");try{r=!1,ndarray(!0)}catch(a){r=!0}assert(r,"ndarray(true) should have failed!");try{r=!1,ndarray([])}catch(a){r=!0}assert(r,"ndarray([]) should have failed!");try{r=!1,ndarray(()=>{})}catch(a){r=!0}assert(r,"ndarray(() => {}) should have failed!");try{let a;r=!1,ndarray(a)}catch(a){r=!0}assert(r,"ndarray(foo) should have failed!");try{r=!1,ndarray([1,2,"three"])}catch(a){r=!0}assert(r,'ndarray([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./floor.js":29,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./range.js":57}],51:[function(require,module,exports){
let isUndefined=require("./is-undefined.js"),ndarray=require("./ndarray.js"),apply=require("./apply.js"),random=require("./random.js");function normal(e){function a(){let e=random(),a=random();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*a)}return isUndefined(e)?a():apply(ndarray(e),a)}if(module.exports=normal,!module.parent&&"undefined"==typeof window){let e=require("./assert.js"),a=require("./std.js"),r=require("./mean.js"),o=require("./abs.js"),n=require("./seed.js"),l=require("./distance.js"),d=normal([1e4]),s=r(d),i=a(d);e(o(s)<.05,"normal([10000]) should have a mean of approximately 0!"),e(o(i-1)<.05,"normal([10000]) should have a standard deviation of approximately 1!"),s=r(d=normal([10,10,10,10])),i=a(d),e(o(s)<.05,"normal([10, 10, 10, 10]) should have a mean of approximately 0!"),e(o(i-1)<.05,"normal([10, 10, 10, 10]) should have a standard deviation of approximately 1!"),n(230498230498);let t,m=normal(1e4);n(230498230498),e(0===l(m,normal(1e4)),"Two normally-distributed arrays seeded with the same value should be identical!");try{t=!1,normal("foo")}catch(e){t=!0}e(t,'normal("foo") should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./apply.js":4,"./assert.js":11,"./distance.js":22,"./is-undefined.js":41,"./mean.js":46,"./ndarray.js":50,"./random.js":56,"./seed.js":61,"./std.js":71}],52:[function(require,module,exports){
let ndarray=require("./ndarray.js"),apply=require("./apply.js");function ones(e){return apply(ndarray(e),e=>1)}if(module.exports=ones,!module.parent&&"undefined"==typeof window){let e,s=require("./assert.js"),o=require("./sum.js"),a=require("./mean.js"),n=require("./std.js"),t=require("./flatten.js"),r=ones([2,3,4,5]);s(120===o(r),"sum(ones([2, 3, 4, 5])) should be 2 * 3 * 4 * 5!"),s(1===a(r),"mean(ones([2, 3, 4, 5])) should be 1!"),s(0===n(r),"std(ones([2, 3, 4, 5])) should be 0!"),s(o(r)===t(r).length,"sum(ones([2, 3, 4, 5])) should be the same as flatten(ones([2, 3, 4, 5])).length!");try{e=!1,ones()}catch(s){e=!0}s(e,"ones() should have failed!");try{e=!1,ones("foo")}catch(s){e=!0}s(e,'ones("foo") should have failed!');try{e=!1,ones(!0)}catch(s){e=!0}s(e,"ones(true) should have failed!");try{e=!1,ones({})}catch(s){e=!0}s(e,"ones({}) should have failed!");try{let s;e=!1,ones(s)}catch(s){e=!0}s(e,"ones(foo) should have failed!");try{e=!1,ones([1,2,"three"])}catch(s){e=!0}s(e,'ones([1, 2, "three"]) should have failed!');try{e=!1,ones(()=>{})}catch(s){e=!0}s(e,"ones(() => {}) should have failed!"),console.log("All tests passed!")}

},{"./apply.js":4,"./assert.js":11,"./flatten.js":27,"./mean.js":46,"./ndarray.js":50,"./std.js":71,"./sum.js":72}],53:[function(require,module,exports){
function pause(e){return new Promise(function(t,r){try{return setTimeout(t,e)}catch(e){return r(e)}})}module.exports=pause;

},{}],54:[function(require,module,exports){
let vectorize=require("./vectorize.js"),assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),pow=vectorize(function(e,s){return assert(!isUndefined(e)&&!isUndefined(s),"You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!"),assert(isNumber(e)&&isNumber(s),"You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!"),Math.pow(e,s)});if(module.exports=pow,!module.parent&&"undefined"==typeof window){let e,s=3,t=2,o=9,r=pow(s,t);assert(o===r,`pow(${s}, ${t}) should be ${o}, but instead was ${r}!`),o=[9,16,25],r=pow(s=[3,4,5],t=2);for(let e=0;e<o.length;e++)assert(o[e]===r[e],`pow(${s[e]}, ${t}) should be ${o[e]}, but instead was ${r[e]}!`);o=[9,27,81],r=pow(s=3,t=[2,3,4]);for(let e=0;e<o.length;e++)assert(o[e]===r[e],`pow(${s}, ${t[e]}) should be ${o[e]}, but instead was ${r[e]}!`);o=[4,27,256],r=pow(s=[2,3,4],t=[2,3,4]);for(let e=0;e<o.length;e++)assert(o[e]===r[e],`pow(${s[e]}, ${t[e]}) should be ${o[e]}, but instead was ${r[e]}!`);try{e=!1,pow()}catch(s){e=!0}assert(e,"pow() should have failed!");try{e=!1,pow(2)}catch(s){e=!0}assert(e,"pow(2) should have failed!");try{e=!1,pow(2,"three")}catch(s){e=!0}assert(e,'pow(2, "three") should have failed!');try{e=!1,pow("two",3)}catch(s){e=!0}assert(e,'pow("two", 3) should have failed!');try{e=!1,pow(!0,!0)}catch(s){e=!0}assert(e,"pow(true, true) should have failed!");try{e=!1,pow({},{})}catch(s){e=!0}assert(e,"pow({}, {}) should have failed!");try{let s;e=!1,pow(s,s)}catch(s){e=!0}assert(e,"pow(foo, foo) should have failed!");try{let s=()=>{};e=!1,pow(s,s)}catch(s){e=!0}assert(e,"pow(fn, fn) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],55:[function(require,module,exports){
let isArray=require("./is-array.js"),shape=require("./shape.js"),DataFrame=require("./dataframe.js"),Series=require("./series.js");function print(){Object.keys(arguments).forEach(e=>{let r=arguments[e];if(isArray(r)){let e=shape(r);1===e.length?new Series(r).print():2==e.length?new DataFrame(r).print():console.log(r)}else r instanceof DataFrame||r instanceof Series?r.print():console.log(r)})}module.exports=print;

},{"./dataframe.js":21,"./is-array.js":35,"./series.js":62,"./shape.js":64}],56:[function(require,module,exports){
let ndarray=require("./ndarray.js"),apply=require("./apply.js"),isUndefined=require("./is-undefined.js"),seed=require("./seed.js"),pow=require("./pow.js"),a=1103515245,c=12345,m=pow(2,31);function lcg(){let e=seed(),r=(a*e+c)%m;return seed(r),r/m}function random(e){return isUndefined(e)?lcg():apply(ndarray(e),lcg)}if(module.exports=random,!module.parent&&"undefined"==typeof window){let e=require("./assert.js"),r=require("./distance.js"),a=require("./min.js"),d=require("./max.js"),n=require("./abs.js"),o=require("./mean.js"),s=random([10,10,10,10]);e(a(s)>=0&&d(s)<=1,"random([10, 10, 10, 10]) should be in the range [0, 1]!"),e(n(o(s))-.5<.05,"random([10, 10, 10, 10]) should have a mean of approximately 0.5!"),e((s=random())>=0&&s<=1,"random() should be in the range [0, 1]!"),seed(203948203948);let i,t=random([10,10,10,10]);seed(203948203948),e(0===r(t,random([10,10,10,10])),"Two random arrays seeded with the same value should be identical!");try{i=!1,random("foo")}catch(e){i=!0}e(i,'random("foo") should have failed!');try{i=!1,random(!0)}catch(e){i=!0}e(i,"random(true) should have failed!");try{i=!1,random({})}catch(e){i=!0}e(i,"random({}) should have failed!");try{i=!1,random(()=>{})}catch(e){i=!0}e(i,"random(() => {}) should have failed!");try{i=!1,random([1,2,"three"])}catch(e){i=!0}e(i,'random([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./apply.js":4,"./assert.js":11,"./distance.js":22,"./is-undefined.js":41,"./max.js":45,"./mean.js":46,"./min.js":48,"./ndarray.js":50,"./pow.js":54,"./seed.js":61}],57:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js");function range(e,a,r=1){assert(!isUndefined(e)&&!isUndefined(a)&&!isUndefined(r),"You must pass two numbers and optionally a step value to the `range` function!"),assert(isNumber(e)&&isNumber(a)&&isNumber(r),"You must pass two numbers and optionally a step value to the `range` function!"),assert(r>0,"The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)");let s=!1;if(e>a){s=!0;let t=e;e=a+r,a=t+r}let t=[];for(let s=e;s<a;s+=r)t.push(s);return s&&t.reverse(),t}if(module.exports=range,!module.parent&&"undefined"==typeof window){let e,a=[5,6,7,8,9],r=range(5,10);for(let e=0;e<a;e++)assert(a[e]===r[e],"range(5, 10) should be [5, 6, 7, 8, 9]!");a=[5,5.5,6,6.5,7,7.5,8,8.5,9,9.5],r=range(5,10,.5);for(let e=0;e<a;e++)assert(a[e]===r[e],"range(5, 10, 0.5) should be [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]!");a=[3,2,1,0,-1,-2],r=range(3,-3);for(let e=0;e<a;e++)assert(a[e]===r[e],"range(3, -3) should be [3, 2, 1, 0, -1, -2]!");a=[-1,-1.25,-1.5,-1.75],r=range(-1,-2,.25);for(let e=0;e<a;e++)assert(a[e]===r[e],"range(-1, -2, 0.25) should be [-1, -1.25, -1.5, -1.75]!");try{e=!1,range()}catch(a){e=!0}assert(e,"range() should have failed!");try{e=!1,range(1,2,-3)}catch(a){e=!0}assert(e,"range(1, 2, -3) should have failed!");try{e=!1,range("foo","bar","baz")}catch(a){e=!0}assert(e,'range("foo", "bar", "baz") should have failed!');try{e=!1,range([],[],[])}catch(a){e=!0}assert(e,"range([], [], []) should have failed!");try{e=!1,range(!0,!0,!0)}catch(a){e=!0}assert(e,"range(true, true, true) should have failed!");try{e=!1,range({},{},{})}catch(a){e=!0}assert(e,"range({}, {}, {}) should have failed!");try{let a;e=!1,range(a,a,a)}catch(a){e=!0}assert(e,"range(foo, foo, foo) should have failed!");try{let a=()=>{};e=!1,range(a,a,a)}catch(a){e=!0}assert(e,"range(fn, fn, fn) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41}],58:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function reverse(e){assert(!isUndefined(e),"You must pass an array into the `reverse` function!"),assert(isArray(e),"You must pass an array into the `reverse` function!");let s=[];for(let r=e.length-1;r>=0;r--)s.push(e[r]);return s}module.exports=reverse,module.parent||"undefined"!=typeof window||console.log("All tests passed!");

},{"./assert.js":11,"./is-array.js":35,"./is-undefined.js":41}],59:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),round=vectorize(function(e){return assert(!isUndefined(e),"You must pass a number or an array of numbers into the `round` function!"),assert(isNumber(e),"You must pass a number or an array of numbers into the `round` function!"),Math.round(e)});if(module.exports=round,!module.parent&&"undefined"==typeof window){let e,r=require("./random.js"),s=require("./set.js"),o=require("./sort.js"),u=2,t=round(2.34);assert(u===t,`round(2.34) should be 2, but instead was ${t}!`),u=3,t=round(2.5),assert(u===t,`round(2.5) should be 3, but instead was ${t}!`),u=-4,t=round(-3.75),assert(u===t,`round(-3.75) should be -4, but instead was ${t}!`),t=o(s(round(r([10,10,10,10]))),function(e,r){return e<r?-1:e>r?1:0}),assert(0===t[0]&&1===t[1]&&2===t.length,"sort(set(round(random([10, 10, 10, 10])))) should be [0, 1]!");try{e=!1,round()}catch(r){e=!0}assert(e,"round() should have failed!");try{e=!1,round("foo")}catch(r){e=!0}assert(e,'round("foo") should have failed!');try{e=!1,round(!0)}catch(r){e=!0}assert(e,"round(true) should have failed!");try{e=!1,round({})}catch(r){e=!0}assert(e,"round({}) should have failed!");try{e=!1,round(()=>{})}catch(r){e=!0}assert(e,"round(() => {}) should have failed!");try{let r;e=!1,round(r)}catch(r){e=!0}assert(e,"round(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./random.js":56,"./set.js":63,"./sort.js":69,"./vectorize.js":77}],60:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),scale=vectorize(function(e,s){return assert(!isUndefined(e)&&!isUndefined(s),"You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!"),assert(isNumber(e)&&isNumber(s),"You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!"),e*s});if(module.exports=scale,!module.parent&&"undefined"==typeof window){let e,s=3,a=5,r=15,t=scale(s,a);assert(r===t,`scale(${s}, ${a}) should be ${r}, but instead was ${t}!`),r=[15,20,25],t=scale(s=[3,4,5],a=5);for(let e=0;e<r.length;e++)assert(r[e]===t[e],`scale(${s[e]}, ${a}) should be ${r[e]}, but instead was ${t[e]}!`);r=[15,18,21],t=scale(s=3,a=[5,6,7]);for(let e=0;e<r.length;e++)assert(r[e]===t[e],`scale(${s}, ${a[e]}) should be ${r[e]}, but instead was ${t[e]}!`);r=[10,18,28],t=scale(s=[2,3,4],a=[5,6,7]);for(let e=0;e<r.length;e++)assert(r[e]===t[e],`scale(${s[e]}, ${a[e]}) should be ${r[e]}, but instead was ${t[e]}!`);try{e=!1,scale()}catch(s){e=!0}assert(e,"scale() should have failed!");try{e=!1,scale("two","three")}catch(s){e=!0}assert(e,'scale("two", "three") should have failed!');try{e=!1,scale(!0,!1)}catch(s){e=!0}assert(e,"scale(true, false) should have failed!");try{e=!1,scale({},{})}catch(s){e=!0}assert(e,"scale({}, {}) should have failed!");try{let s=()=>{};e=!1,scale(s,s)}catch(s){e=!0}assert(e,"scale(fn, fn) should have failed!");try{let s;e=!1,scale(s,s)}catch(s){e=!0}assert(e,"scale(foo, foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],61:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),s=parseInt(999999*Math.random());function seed(e){if(isUndefined(e)||(assert(isNumber(e),"If passing a value into the `seed` function, then that value must be a positive integer!"),assert(parseInt(e)===e,"If passing a value into the `seed` function, then that value must be a positive integer!"),assert(e>=0,"If passing a value into the `seed` function, then that value must be a positive integer!")),isUndefined(e))return s;s=e}module.exports=seed;

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41}],62:[function(require,module,exports){
let assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),shape=require("./shape.js"),transpose=require("./transpose.js"),range=require("./range.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),apply=require("./apply.js"),isFunction=require("./is-function.js"),ndarray=require("./ndarray.js"),copy=require("./copy.js"),set=require("./set.js"),reverse=require("./reverse.js"),sort=require("./sort.js");function isInteger(e){return isNumber(e)&&parseInt(e)===e}function isWholeNumber(e){return isInteger(e)&&e>=0}function isObject(e){return e instanceof Object&&!isArray(e)}function isDataFrame(e){return e instanceof DataFrame}function isSeries(e){return e instanceof Series}function leftPad(e,s){assert(isNumber(e),"The `leftPad` function only works on numbers!");let r=e.toString();for(;r.length<s;)r="0"+r;return r}class Series{constructor(e){let s=this;if(s.name="data",Object.defineProperty(s,"_values",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"values",{configurable:!0,enumerable:!0,get:()=>s._values,set(e){assert(isArray(e),"The new values must be a 1-dimensional array!");let r=shape(e);assert(1===r.length,"The new array of values must be 1-dimensional!"),r[0]<s._index.length?s._index=s._index.slice(0,r[0]):r[0]>s._index.length&&(s._index=s._index.concat(range(s._index.length,r[0]).map(s=>"row"+leftPad(s,(e.length-1).toString().length)))),s._values=e}}),Object.defineProperty(s,"_index",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"index",{configurable:!0,enumerable:!0,get:()=>s._index,set(e){assert(isArray(e),"The new index must be a 1-dimensional array of strings!"),assert(e.length===s.shape[0],"The new index must be the same length as the old index!"),assert(1===shape(e).length,"The new index must be a 1-dimensional array of strings!"),e.forEach(e=>{assert(isString(e),"All of the row names must be strings!")}),s._index=e}}),e){let r=shape(e);assert(1===r.length,"The `data` array passed into the constructor of a DataFrame must be 1-dimensional!"),s.values=e}}get shape(){return shape(this.values)}isEmpty(){return 0===set(this.values).filter(e=>!isUndefined(e)).length}clear(){let e=this.copy();return e.values=ndarray(e.shape),e.index=this.index,e}get(e){let s=this;(isString(e)||isNumber(e))&&(e=[e]);let r=set((e||[]).map(e=>typeof e));return assert(r.length<=2,"Only whole numbers and/or strings are allowed in `get` arrays!"),1===r.length&&assert("string"===r[0]||"number"===r[0],"Only whole numbers and/or strings are allowed in `get` arrays!"),2===r.length&&(console.log(r),assert(r.indexOf("string")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!"),assert(r.indexOf("number")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!")),isUndefined(e)||(e=e.map(e=>"string"==typeof e?(assert(s.index.indexOf(e)>-1,`Index "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Index ${e} is out of bounds!`),assert(parseInt(e)===e,"Indices must be integers!"),assert(e<s.index.length,`Index ${e} is out of bounds!`),s.index[e]):void 0)),s.getSubsetByNames(e)}getSubsetByNames(e){let s=this;isUndefined(e)&&(e=s.index),assert(isArray(e),"The `indices` array must be a 1-dimensional array of strings."),assert(1===shape(e).length,"The `indices` array must be a 1-dimensional array of strings."),assert(e.length>0,"The `indices` array must contain at least one index name."),e.forEach(e=>{assert(isString(e),"The `indices` array must contain only strings."),assert(s.index.indexOf(e)>-1,`The name "${e}" does not exist in the index.`)});let r=e.map(e=>s.values[s.index.indexOf(e)]),n=new Series(r);return n.index=e,n.name=s.name,n}getSubsetByIndices(e){let s=this,r=s.shape;isUndefined(e)&&(e=range(0,r[0])),assert(isArray(e),"The `indices` array must be 1-dimensional array of whole numbers."),assert(1===shape(e).length,"The `indices` array must be a 1-dimensional array of whole numbers."),assert(e.length>0,"The `indices` array must contain at least one index."),e.forEach(e=>{assert(isWholeNumber(e),"The `indices` array must be a 1-dimensional array of whole numbers."),assert(e<s.index.length,`The row index ${e} is out of bounds.`)});let n=e.map(e=>s.index[e]);return s.getSubsetByNames(n)}loc(e){return this.getSubsetByNames(e)}iloc(e){return this.getSubsetByIndices(e)}reverse(){let e=new Series(reverse(this.values));return e.index=reverse(this.index),e.name=this.name,e}resetIndex(){let e=this.copy();return e.index=range(0,this.shape[0]).map(s=>"row"+leftPad(s,(e.index.length-1).toString().length)),e}copy(){let e=new Series(copy(this.values));return e.index=this.index.slice(),e.name=this.name,e}apply(e){assert(isFunction(e),"The parameter to the `apply` method must be a function.");let s=this.copy();return s.values=s.values.map((r,n)=>e(s.index[n],r)),s}dropMissing(e,s){let r=this.copy(),n=[];return r.values=r.values.filter((e,s)=>!isUndefined(e)&&(n.push(r.index[s]),!0)),r.index=n,r}toObject(){let e=this,s={};return s[e.name]={},e.index.forEach((r,n)=>{s[e.name][r]=e.values[n]}),s}print(){let e=this.copy(),s="undefined"==typeof window?20:10;if(e.index.length>s){e=e.get(range(0,s/2).concat(range(e.index.length-s/2,e.index.length)));let r=copy(e.index);r.splice(parseInt(r.length/2),0,"..."),e.values.push("..."),e.index.push("..."),e=e.get(r)}let r={};return e.values.forEach((s,n)=>{let t={};t[e.name]=s,r[e.index[n]]=t}),console.table(r),this}sort(e){assert(isBoolean(e)||isString(e)||isUndefined(e),"The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false).");let s=!0;isUndefined(e)&&(s=!0),isString(e)&&(e=e.trim().toLowerCase(),assert("ascending"===e||"descending"===e,"The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."),s="ascending"===e),isBoolean(e)&&(s=e);let r=transpose([this.values,this.index]);r=transpose(sort(r,(e,r)=>e[0]===r[0]?0:e[0]<r[0]?s?-1:1:e[0]>r[0]?s?1:-1:void 0));let n=new Series(r[0]);return n.index=r[1],n.name=this.name,n}sortByIndex(){let e=transpose([this.values,this.index]);e=transpose(sort(e,(e,s)=>e[1]===s[1]?0:e[1]<s[1]?-1:e[1]>s[1]?1:void 0));let s=new Series(e[0]);return s.index=e[1],s.name=this.name,s}filter(e){let s=this,r=s.copy(),n=copy(r.index),t=[],i=r.values.filter((s,n)=>{let i=e(s,n,r.values);return i||t.push(r.index[n]),i});return t.forEach(e=>{n.splice(n.indexOf(e),1)}),0===i.length?((r=new Series).name=s.name,r):(r.values=i,r.index=n,r)}}if(module.exports=Series,!module.parent&&"undefined"==typeof window){let e=require("./is-equal.js"),s=require("./normal.js"),r=require("./set.js"),n=(require("./distance.js"),require("./zeros.js"),require("./chop.js"),require("./random.js"),s(100)),t=new Series(n),i=t.shape;assert(isSeries(t),"`series` is not a Series!"),assert(e(t.shape,[100]),"The shape of the Series is not the same as the shape of its data!"),assert(!t.isEmpty(),"`series` should not be empty!"),assert((new Series).isEmpty(),"New Series should be empty!");let a=r(t.clear().values);assert(1===a.length&&isUndefined(a[0]),"Cleared Series should only have `undefined` values."),assert(e(t.values,t.reverse().reverse().values),"A doubly-reversed series should have the same values as the original!");let o=!1;try{t.loc(t.index),o=!1}catch(e){o=!0}assert(!o,"`series.loc(series.index)` should not have failed!");try{t.loc([]),o=!1}catch(e){o=!0}assert(o,"`series.loc([])` should have failed!");try{t.loc(["this doesn't exist"]),o=!1}catch(e){o=!0}assert(o,'`series.loc(["this doesn\'t exist"])` should have failed!');try{t.iloc(range(0,i[0])),o=!1}catch(e){o=!0}assert(!o,"`series.iloc(range(0, seriesShape[0]))` should not have failed!");try{t.iloc(),o=!1}catch(e){o=!0}assert(!o,"`series.iloc()` should not have failed!");try{t.iloc([-5]),o=!1}catch(e){o=!0}assert(o,"`series.iloc([-5])` should have failed!");try{t.iloc([500]),o=!1}catch(e){o=!0}assert(o,"`series.iloc([500])` should have failed!");let l=t.copy();assert(e(t,l),"A Series and its copy should evaluate as equal!"),assert(!(t===l),"A Series and its copy should not be the same object!"),t.index=range(0,i[0]).map(e=>Math.random().toString()),assert(!e(t.index,l.index),"`series` should now have random row names!"),t=t.resetIndex(),assert(e(t.index,l.index),"`series` should now have its original row names!"),t=(t=new Series([0,1,2,3,4])).apply((e,s)=>e+"/"+s),assert(e(t.values,["row0/0","row1/1","row2/2","row3/3","row4/4"]),"The Series' values should be as I described!"),(t=new Series(range(0,10))).values[0]=null,t.values[7]=null,assert(e(t.dropMissing().shape,[8]),"The Series should have a shape of [8] after dropping missing values!"),assert(e(t.dropMissing().index,["row1","row2","row3","row4","row5","row6","row8","row9"]),"The Series' new index should be as I've described!"),assert(t.clear().dropMissing().isEmpty(),"The Series should be empty after dropping missing values!"),console.log("All tests passed!")}

},{"./apply.js":4,"./assert.js":11,"./chop.js":13,"./copy.js":16,"./distance.js":22,"./is-array.js":35,"./is-equal.js":37,"./is-function.js":38,"./is-number.js":39,"./is-string.js":40,"./is-undefined.js":41,"./ndarray.js":50,"./normal.js":51,"./random.js":56,"./range.js":57,"./reverse.js":58,"./set.js":63,"./shape.js":64,"./sort.js":69,"./transpose.js":74,"./zeros.js":78}],63:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js");function set(e){assert(!isUndefined(e),"You must pass an array into the `set` function!"),assert(isArray(e),"You must pass an array into the `set` function!");let s=[];return flatten(e).forEach(function(e){s.indexOf(e)<0&&s.push(e)}),s}if(module.exports=set,!module.parent&&"undefined"==typeof window){let e=require("./sort.js"),s=require("./round.js"),t=require("./random.js"),r=require("./range.js");function alphasort(e,s){return e<s?-1:e>s?1:0}let a,o=[2,2,2,2,3,3,3,3,3,4,3,4,3,2,2,3,3,3,3,4],l=[2,3,4],n=e(set(o),alphasort);for(let e=0;e<l.length;e++)assert(l[e]===n[e],"set([2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]) should be [2, 3, 4]!");o=s(t([10,10,10,10])),l=[0,1],n=e(set(o),alphasort);for(let e=0;e<l.length;e++)assert(l[e]===n[e],"set(round(random([10, 10, 10, 10]))) should be [0, 1]!");l=(o=r(10,20,.25)).slice(),n=set(o);for(let e=0;e<l.length;e++)assert(l[e]===n[e],"set(range(10, 20, 0.25)) should be the same as range(10, 20, 0.25)!");l=["foo","bar","baz",!0,!1,234,0],n=set(o=["foo","bar","baz","foo","foo",!0,!0,!1,!0,234,234,0]);for(let e=0;e<l.length;e++)assert(l[e]===n[e],'set(["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]) should be ["foo", "bar", "baz", true, false, 234, 0]!');try{a=!1,set()}catch(e){a=!0}assert(a,"set() should have failed!");try{a=!1,set("foo")}catch(e){a=!0}assert(a,'set("foo") should have failed!');try{a=!1,set(234)}catch(e){a=!0}assert(a,"set(234) should have failed!");try{a=!1,set(!0)}catch(e){a=!0}assert(a,"set(true) should have failed!");try{a=!1,set({})}catch(e){a=!0}assert(a,"set({}) should have failed!");try{a=!1,set(()=>{})}catch(e){a=!0}assert(a,"set(() => {}) should have failed!");try{let e;a=!1,set(e)}catch(e){a=!0}assert(a,"set(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-undefined.js":41,"./random.js":56,"./range.js":57,"./round.js":59,"./sort.js":69}],64:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),max=require("./max.js");function shape(e){assert(!isUndefined(e),"You must pass an array into the `shape` function!"),assert(isArray(e),"You must pass an array into the `shape` function!");let s=[e.length],a=e.map(e=>isArray(e));if(a.indexOf(!0)>-1){assert(a.indexOf(!1)<0,"The array passed into the `shape` function has some children that are not themselves arrays!");let t=e.map(e=>e.length),h=max(t);t.forEach(function(e){assert(e===h,"The array passed into the `shape` function has some children of inconsistent length!")}),s=s.concat(shape(e[0]))}return s}if(module.exports=shape,!module.parent&&"undefined"==typeof window){let e,s=require("./normal.js"),a=500,t=shape(s(a))[0];assert(a===t,`shape(normal(500)) should be 500, but instead was ${t}!`),t=shape(s(a=[2,3,4]));for(let e=0;e<a.shape;e++)assert(a[e]===t[e],"shape(normal([2, 3, 4])) should be [2, 3, 4]!");try{e=!1,shape()}catch(s){e=!0}assert(e,"shape() should have failed!");try{e=!1,shape("foo")}catch(s){e=!0}assert(e,'shape("foo") should have failed!');try{e=!1,shape(234)}catch(s){e=!0}assert(e,"shape(234) should have failed!");try{e=!1,shape(!0)}catch(s){e=!0}assert(e,"shape(true) should have failed!");try{e=!1,shape({})}catch(s){e=!0}assert(e,"shape({}) should have failed!");try{e=!1,shape(()=>{})}catch(s){e=!0}assert(e,"shape(() => {}) should have failed!");try{let s;e=!1,shape(s)}catch(s){e=!0}assert(e,"shape(foo) should have failed!");try{e=!1,shape([[2,3,4],[5,6]])}catch(s){e=!0}assert(e,"shape([[2, 3, 4], [5, 6]]) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-undefined.js":41,"./max.js":45,"./normal.js":51}],65:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),floor=require("./floor.js"),random=require("./random.js");function shuffle(e){assert(!isUndefined(e),"You must pass an array into the `shuffle` function!"),assert(isArray(e),"You must pass an array into the `shuffle` function!");let s=e.slice();for(let f=0;f<e.length;f++){let f=floor(random()*e.length),r=floor(random()*e.length),a=s[f];s[f]=s[r],s[r]=a}return s}if(module.exports=shuffle,!module.parent&&"undefined"==typeof window){let e,s=require("./normal.js"),f=require("./seed.js"),r=require("./distance.js"),a=s(1e4),l=shuffle(a);assert(r(a,l)>0,"shuffle(a) should not be in the same order as a!"),a=s(1e4),f(20394230948),a1=shuffle(a),f(20394230948),a2=shuffle(a),assert(0===r(a1,a2),"Shuffling using the same seed should produce the same results!");try{e=!1,shuffle()}catch(s){e=!0}assert(e,"shuffle() should have failed!");try{e=!1,shuffle("foo")}catch(s){e=!0}assert(e,'shuffle("foo") should have failed!');try{e=!1,shuffle(!0)}catch(s){e=!0}assert(e,"shuffle(true) should have failed!");try{e=!1,shuffle({})}catch(s){e=!0}assert(e,"shuffle({}) should have failed!");try{e=!1,shuffle(234)}catch(s){e=!0}assert(e,"shuffle(234) should have failed!");try{e=!1,shuffle(()=>{})}catch(s){e=!0}assert(e,"shuffle(() => {}) should have failed!");try{e=!1,shuffle(random([2,3,4]))}catch(s){e=!0}assert(!e,"shuffle(random([2, 3, 4])) should not have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./distance.js":22,"./floor.js":29,"./is-array.js":35,"./is-undefined.js":41,"./normal.js":51,"./random.js":56,"./seed.js":61}],66:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),sign=vectorize(function(e){return assert(!isUndefined(e),"You must pass a number or an array of numbers into the `sign` function!"),assert(isNumber(e),"You must pass a number or an array of numbers into the `sign` function!"),e<0?-1:e>0?1:0});if(module.exports=sign,!module.parent&&"undefined"==typeof window){let e,s=require("./random.js"),r=require("./normal.js"),i=(require("./round.js"),require("./set.js")),n=require("./sort.js"),a=require("./chop.js"),t=require("./scale.js"),o=require("./add.js"),u=n(i(sign(a(r(1e4)))).concat(0));assert(-1===u[0]&&0===u[1]&&1===u[2],"sort(set(sign(chop(normal(10000))))) should be [-1, 0, 1]!"),(u=sign(o(s(1e4),100))).forEach(e=>assert(e>=0),"sign(add(random(10000), 100)) should only result in positive values!"),(u=sign(t(s(1e4),-1))).forEach(e=>assert(e<=0),"sign(scale(random(10000), -1)) should only result in negative values!");try{e=!1,sign()}catch(s){e=!0}assert(e,"sign() should have failed!");try{e=!1,sign("foo")}catch(s){e=!0}assert(e,'sign("foo") should have failed!');try{e=!1,sign(!0)}catch(s){e=!0}assert(e,"sign(true) should have failed!");try{e=!1,sign({})}catch(s){e=!0}assert(e,"sign({}) should have failed!");try{e=!1,sign(()=>{})}catch(s){e=!0}assert(e,"sign(() => {}) should have failed!");try{let s;e=!1,sign(s)}catch(s){e=!0}assert(e,"sign(foo) should have failed!");try{e=!1,sign([1,2,"three"])}catch(s){e=!0}assert(e,'sign([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./add.js":2,"./assert.js":11,"./chop.js":13,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./random.js":56,"./round.js":59,"./scale.js":60,"./set.js":63,"./sort.js":69,"./vectorize.js":77}],67:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),sin=vectorize(function(e){return assert(!isUndefined(e),"You must pass a number or an array of numbers into the `sin` function!"),assert(isNumber(e),"You must pass a number or an array of numbers into the `sin` function!"),Math.sin(e)});if(module.exports=sin,!module.parent&&"undefined"==typeof window){let e,s=require("./min.js"),r=require("./max.js"),i=sin(require("./range.js")(0,10*Math.PI,Math.PI/180));assert(-1===s(i)&&1===r(i),"sin(range(0, 10 * Math.PI, Math.PI / 100)) should be in the range [-1, 1]!");try{e=!1,sin()}catch(s){e=!0}assert(e,"sin() should have failed!");try{e=!1,sin("foo")}catch(s){e=!0}assert(e,'sin("foo") should have failed!');try{e=!1,sin(!0)}catch(s){e=!0}assert(e,"sin(true) should have failed!");try{e=!1,sin({})}catch(s){e=!0}assert(e,"sin({}) should have failed!");try{e=!1,sin(()=>{})}catch(s){e=!0}assert(e,"sin(() => {}) should have failed!");try{let s;e=!1,sin(s)}catch(s){e=!0}assert(e,"sin(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-number.js":39,"./is-undefined.js":41,"./max.js":45,"./min.js":48,"./range.js":57,"./vectorize.js":77}],68:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),isArray=require("./is-array.js"),range=require("./range.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),floor=require("./floor.js");function slice(e,s){if(assert(!isUndefined(e),"You must pass an array into the `slice` function!"),assert(isArray(e),"You must pass an array into the `slice` function!"),isUndefined(s))return e.slice();assert(isArray(s),"The indices passed into the `slice` function must be a one-dimensional array of integers or null values."),flatten(s).forEach(function(e){assert(isUndefined(e)||isNumber(e)&&floor(e)===e,"The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")});let i=s[0];isUndefined(i)&&(i=range(0,e.length)),isNumber(i)&&(i=[i]);let l=[];return i.forEach(function(i){assert(i<e.length,"Index out of bounds in the `slice` function!"),i<0&&(i+=e.length);let r=e[i];isArray(r)?l.push(slice(e[i],s.slice(1,s.length))):l.push(e[i])}),l}if(module.exports=slice,!module.parent&&"undefined"==typeof window){let e,s=require("./distance.js"),i=[[2,3,4],[5,6,7],[8,9,10]],l=[[3,6,9]],r=slice(i,[null,1]);l=[[2,3],[8,9]],r=slice(i=[[2,3,4],[5,6,7],[8,9,10]],[[0,2],[0,1]]),assert(0===s(l,r),"slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [[0, 2], [0, 1]]) should be [[2, 3], [8, 9]]!"),assert(7===slice(i=[5,6,7],[-1])[0],"slice([5, 6, 7], [-1]) should be [7]!"),l=[[9]],r=slice(i=[[2,3,4],[5,6,7],[8,9,10]],[-1,-2]),assert(0===s(l,r),"slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [-1, -2]) should be [9]!");try{e=!1,slice()}catch(s){e=!0}assert(e,"slice() should have failed!");try{e=!1,slice([2,3,4],[1.5,2.5,3.5])}catch(s){e=!0}assert(e,"slice([2, 3, 4], [1.5, 2.5, 3.5]) should have failed!");try{e=!1,slice([2,3,4],0)}catch(s){e=!0}assert(e,"slice([2, 3, 4], 0) should have failed!");try{e=!1,slice("foo")}catch(s){e=!0}assert(e,'slice("foo") should have failed!');try{e=!1,slice(234)}catch(s){e=!0}assert(e,"slice(234) should have failed!");try{e=!1,slice({})}catch(s){e=!0}assert(e,"slice({}) should have failed!");try{e=!1,slice(()=>{})}catch(s){e=!0}assert(e,"slice(() => {}) should have failed!");try{let s;e=!1,slice(s)}catch(s){e=!0}assert(e,"slice(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./distance.js":22,"./flatten.js":27,"./floor.js":29,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./range.js":57,"./shape.js":64}],69:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isFunction=require("./is-function.js");function alphaSort(e,s){return e<s?-1:e>s?1:0}function sort(e,s){isUndefined(s)&&(s=alphaSort),assert(!isUndefined(e),"You must pass an array into the `sort` function!"),assert(isArray(e),"You must pass an array into the `sort` function!"),assert(isFunction(s),"The second parameter of the `sort` function must be a comparison function!");let t=e.slice();return t.sort(s),t}if(module.exports=sort,!module.parent&&"undefined"==typeof window){let e,s=require("./shuffle.js"),t=require("./range.js"),r=require("./distance.js"),o=require("./normal.js"),a=s(t(1,7)),n=t(1,7),l=sort(a,alphaSort);assert(0===r(n,l),"sort(shuffle(range(1, 7)), alphaSort) should be range(1, 7)!"),n=[{x:10},{x:5},{x:3}],l=sort(a=[{x:5},{x:3},{x:10}],function(e,s){return e.x<s.x?1:e.x>s.x?-1:0});for(let e=0;e<l.length-1;e++)assert(l[e].x>l[e+1].x,"The objects should've been reverse-sorted by x-value!");l=sort(a=o(1e4),alphaSort);for(let e=0;e<l.length-1;e++)assert(l[e]<=l[e+1],`${l[e]} should be less than ${l[e+1]}!`);n=["a","b","c","d","e","f"],l=sort(a=["b","c","a","d","f","e"],alphaSort);for(let e=0;e<n.length;e++)assert(n[e]===l[e],'sort(["b", "c", "a", "d", "f", "e"], alphaSort) should be ["a", "b", "c", "d", "e", "f"]!');try{e=!1,sort()}catch(s){e=!0}assert(e,"sort() should have failed!");try{e=!1,sort([],[])}catch(s){e=!0}assert(e,"sort([], []) should have failed!");try{e=!1,sort("foo","foo")}catch(s){e=!0}assert(e,'sort("foo", "foo") should have failed!');try{e=!1,sort(!0,!0)}catch(s){e=!0}assert(e,"sort(true, true) should have failed!");try{e=!1,sort({},{})}catch(s){e=!0}assert(e,"sort({}, {}) should have failed!");try{let s;e=!1,sort(s,s)}catch(s){e=!0}assert(e,"sort(foo, foo) should have failed!");try{let s=()=>{};e=!1,sort(s,s)}catch(s){e=!0}assert(e,"sort(fn, fn) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./distance.js":22,"./is-array.js":35,"./is-function.js":38,"./is-undefined.js":41,"./normal.js":51,"./range.js":57,"./shuffle.js":65}],70:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),sqrt=vectorize(function(s){return assert(!isUndefined(s),"You must pass a number or an array of numbers into the `sqrt` function!"),assert(isNumber(s),"You must pass a number or an array of numbers into the `sqrt` function!"),assert(s>=0,"The `sqrt` function only operates on zero or positive numbers!"),Math.sqrt(s)});if(module.exports=sqrt,!module.parent&&"undefined"==typeof window){let s,e=require("./distance.js"),t=4,r=2,a=sqrt(t);assert(r===a,`sqrt(4) should be 2, but instead was ${a}!`),r=[3,2,4],a=sqrt(t=[9,4,16]),assert(0===e(r,a),"sqrt([9, 4, 16]) should be [3, 2, 4]!");try{s=!1,sqrt()}catch(e){s=!0}assert(s,"sqrt() should have failed!");try{s=!1,sqrt("foo")}catch(e){s=!0}assert(s,'sqrt("foo") should have failed!');try{s=!1,sqrt(!0)}catch(e){s=!0}assert(s,"sqrt(true) should have failed!");try{s=!1,sqrt({})}catch(e){s=!0}assert(s,"sqrt({}) should have failed!");try{s=!1,sqrt(-4)}catch(e){s=!0}assert(s,"sqrt(-4) should have failed!");try{s=!1,sqrt(()=>{})}catch(e){s=!0}assert(s,"sqrt(() => {}) should have failed!");try{let e;s=!1,sqrt(e)}catch(e){s=!0}assert(s,"sqrt(foo) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./distance.js":22,"./is-number.js":39,"./is-undefined.js":41,"./vectorize.js":77}],71:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),mean=require("./mean.js"),pow=require("./pow.js"),sqrt=require("./sqrt.js");function std(s){assert(!isUndefined(s),"You must pass an array of numbers into the `std` function!"),assert(isArray(s),"You must pass an array of numbers into the `std` function!");let e=flatten(s);if(0===e.length)return;e.forEach(function(s){assert(isNumber(s),"You must pass an array of numbers into the `std` function!")});let t=mean(e),r=0;return e.forEach(s=>r+=pow(s-t,2)),sqrt(r/e.length)}if(module.exports=std,!module.parent&&"undefined"==typeof window){let s,e=require("./normal.js"),t=require("./abs.js"),r=require("./add.js"),a=require("./scale.js"),d=e(1e4);assert(t(std(d)-1)<.05,"std(normal(10000)) should be approximately 1!"),d=r(a(d,100),-250),assert(t(std(d)-100)<5,"std(normal(10000) * 100 - 250) should be approximately 100!");try{s=!1,std()}catch(e){s=!0}assert(s,"std() should have failed!");try{s=!1,std(123)}catch(e){s=!0}assert(s,"std(123) should have failed!");try{s=!1,std("foo")}catch(e){s=!0}assert(s,'std("foo") should have failed!');try{s=!1,std(!0)}catch(e){s=!0}assert(s,"std(true) should have failed!");try{s=!1,std({})}catch(e){s=!0}assert(s,"std({}) should have failed!");try{s=!1,std(()=>{})}catch(e){s=!0}assert(s,"std(() => {}) should have failed!");try{let e;s=!1,std(e)}catch(e){s=!0}assert(s,"std(foo) should have failed!"),console.log("All tests passed!")}

},{"./abs.js":1,"./add.js":2,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./mean.js":46,"./normal.js":51,"./pow.js":54,"./scale.js":60,"./sqrt.js":70}],72:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js");function sum(s){assert(!isUndefined(s),"You must pass an array of numbers into the `sum` function!"),assert(isArray(s),"You must pass an array of numbers into the `sum` function!");let e=flatten(s);e.forEach(function(s){assert(isNumber(s),"You must pass an array of numbers into the `sum` function!")});let u=0;return e.forEach(s=>u+=s),u}if(module.exports=sum,!module.parent&&"undefined"==typeof window){let s,e=require("./range.js"),u=(require("./normal.js"),require("./abs.js"),[2,3,4]),r=9,t=sum(u);assert(r===t,`sum([2, 3, 4]) should be 9, but instead is ${t}!`),u=e(-100,101),r=0,t=sum(u),assert(r===t,`sum(range(-100, 101)) should be 0, but instead is ${t}!`),r=0,t=sum(u=[]),assert(r===t,`sum([]) should be 0, but instead was ${t}!`);try{s=!1,sum()}catch(e){s=!0}assert(s,"sum() should have failed!");try{s=!1,sum("foo")}catch(e){s=!0}assert(s,'sum("foo") should have failed!');try{s=!1,sum(123)}catch(e){s=!0}assert(s,"sum(123) should have failed!");try{s=!1,sum(!0)}catch(e){s=!0}assert(s,"sum(true) should have failed!");try{s=!1,sum(()=>{})}catch(e){s=!0}assert(s,"sum(() => {}) should have failed!");try{s=!1,sum({})}catch(e){s=!0}assert(s,"sum({}) should have failed!");try{s=!1,sum([1,2,"three"])}catch(e){s=!0}assert(s,'sum([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./range.js":57}],73:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),floor=require("./floor.js"),tan=vectorize(function(e){assert(!isUndefined(e),"You must pass a number or an array of numbers into the `tan` function!"),assert(isNumber(e),"You must pass a number or an array of numbers into the `tan` function!");let t=(e-Math.PI/2)/Math.PI;if(t!==floor(t))return Math.tan(e)});if(module.exports=tan,!module.parent&&"undefined"==typeof window){let e,t=require("./abs.js"),a=require("./normal.js"),s=Math.PI/4,r=1,n=tan(s);assert(t(r-n)<.01,`tan(pi / 4) should be 1, but instead was ${n}!`),s=-Math.PI/2,r=void 0,n=tan(s),assert(r===n,"tan(-pi / 2) should be undefined, but instead was ${yPred}!"),s=2*Math.PI,r=0,n=tan(s),assert(t(r-n)<.01,`tan(2 * pi) should be 0, but instead was ${n}!`);try{e=!1,tan()}catch(t){e=!0}assert(e,"tan() should have failed!");try{e=!1,tan(a(1e4))}catch(t){e=!0}assert(!e,"tan(normal(10000)) should not have failed!");try{e=!1,tan("foo")}catch(t){e=!0}assert(e,'tan("foo") should have failed!');try{e=!1,tan(!0)}catch(t){e=!0}assert(e,"tan(true) should have failed!");try{e=!1,tan({})}catch(t){e=!0}assert(e,"tan({}) should have failed!");try{e=!1,tan(()=>{})}catch(t){e=!0}assert(e,"tan(() => {}) should have failed!");try{let t;e=!1,tan(t)}catch(t){e=!0}assert(e,"tan(foo) should have failed!"),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./floor.js":29,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./vectorize.js":77}],74:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),shape=require("./shape.js"),reverse=require("./reverse.js"),ndarray=require("./ndarray.js");function transpose(s){assert(!isUndefined(s),"You must pass an array into the `transpose` function!"),assert(isArray(s),"You must pass an array into the `transpose` function!");let e=shape(s);if(assert(e.length<=2,"I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"),1===e.length)return reverse(s);if(2===e.length){let r=ndarray(reverse(e));for(let a=0;a<e[0];a++)for(let t=0;t<e[1];t++)r[t][a]=s[a][t];return r}}if(module.exports=transpose,!module.parent&&"undefined"==typeof window){let s,e=require("./is-equal.js"),r=[2,3,4],a=[4,3,2],t=transpose(r);assert(e(a,t),"transpose([2, 3, 4]) should be [4, 3, 2]!"),a=[[2,5,8],[3,6,9],[4,7,10]],t=transpose(r=[[2,3,4],[5,6,7],[8,9,10]]),assert(e(a,t),"transpose([[2, 3, 4], [5, 6, 7], [8, 9, 10]]) should be [[2, 5, 8], [3, 6, 9], [4, 7, 10]]!"),a=[["a","e"],["b","f"],["c","g"],["d","h"]],t=transpose(r=[["a","b","c","d"],["e","f","g","h"]]),assert(e(a,t),'transpose([["a", "b", "c", "d"], ["e", "f", "g", "h"]]) should be [["a", "e"], ["b", "f"], ["c", "g"], ["d", "h"]]!');try{s=!1,transpose()}catch(e){s=!0}assert(s,"transpose() should have failed!");try{s=!1,transpose([[2,3,4],[5,6]])}catch(e){s=!0}assert(s,"transpose([[2, 3, 4], [5, 6]]) should have failed!");try{s=!1,transpose({})}catch(e){s=!0}assert(s,"transpose({}) should have failed!");try{s=!1,transpose(()=>{})}catch(e){s=!0}assert(s,"transpose(() => {}) should have failed!");try{s=!1,transpose("foo")}catch(e){s=!0}assert(s,'transpose("foo") should have failed!');try{s=!1,transpose(234)}catch(e){s=!0}assert(s,"transpose(234) should have failed!");try{s=!1,transpose(!0)}catch(e){s=!0}assert(s,"transpose(true) should have failed!");try{s=!1,transpose(ndarray([2,3,4]))}catch(e){s=!0}assert(s,"transpose() should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-equal.js":37,"./is-undefined.js":41,"./ndarray.js":50,"./reverse.js":58,"./shape.js":64}],75:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),int=require("./int.js");function valueAt(e,s){return assert(!isUndefined(e),"You must pass an array and an index into the `valueAt` function!"),assert(isArray(e),"You must pass an array and an index into the `valueAt` function!"),assert(isNumber(s)||isArray(s),"The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!"),isArray(s)&&(assert(1===shape(s).length,"The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!"),s.forEach(e=>{assert(isNumber(e)&&int(e)===e,"The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!")}),assert(s.length<=shape(e).length,"The index passed into the `valueAt` function has too many dimensions!")),isNumber(s)?(assert(s<e.length,`The index ${s} is out of bounds!`),e[s]):s.length>1?(assert(s[0]<e.length,`The index ${s[0]} is out of bounds!`),valueAt(e[s[0]],s.slice(1))):valueAt(e,s[0])}if(module.exports=valueAt,!module.parent&&"undefined"==typeof window){const e=require("./is-equal.js");require("./index-of.js");let s=require("./normal.js")([10,10,10,10]),t=s[4][3][2][1],i=valueAt(s,[4,3,2,1]);assert(t===i,`Uh-oh! The predicted value should've been ${t}, but instead it was ${i}!`),t=s[4][3],i=valueAt(s,[4,3]),assert(e(t,i),"Uh-oh! The predicted value didn't match the true value!");let a=!0;try{valueAt(s,100),a=!1}catch(e){}assert(a,"This test should've failed!");try{valueAt(s,[10,20,30]),a=!1}catch(e){}assert(a,"This test should've failed!");try{valueAt(s,[0,0,0,0,0]),a=!1}catch(e){}assert(a,"This test should've failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./index-of.js":31,"./int.js":33,"./is-array.js":35,"./is-equal.js":37,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./shape.js":64}],76:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),pow=require("./pow.js"),std=require("./std.js");function variance(e){assert(!isUndefined(e),"You must pass an array of numbers into the `variance` function!"),assert(isArray(e),"You must pass an array of numbers into the `std` function!");let a=flatten(e);return a.forEach(function(e){assert(isNumber(e),"You must pass an array of numbers into the `std` function!")}),pow(std(a),2)}if(module.exports=variance,!module.parent&&"undefined"==typeof window){let e,a=require("./abs.js"),r=require("./normal.js"),s=require("./scale.js"),t=r(1e4),i=1,n=variance(t);assert(a(i-n)<.05,`variance(normal(10000)) should be approximately 1, but instead is ${n}!`),t=s(r([10,10,10,10]),2),i=4,n=variance(t),assert(a(i-n)<.05,`variance(normal(10000) * 2) should be approximately 4, but instead is ${n}!`);try{e=!1,variance()}catch(a){e=!0}assert(e,"variance() should have failed!");try{e=!1,variance("foo")}catch(a){e=!0}assert(e,'variance("foo") should have failed!');try{e=!1,variance(!0)}catch(a){e=!0}assert(e,"variance(true) should have failed!");try{e=!1,variance(()=>{})}catch(a){e=!0}assert(e,"variance(() => {}) should have failed!");try{e=!1,variance({})}catch(a){e=!0}assert(e,"variance({}) should have failed!");try{let a;e=!1,variance(a)}catch(a){e=!0}assert(e,"variance(foo) should have failed!");try{e=!1,variance([1,2,"three"])}catch(a){e=!0}assert(e,'variance([1, 2, "three"]) should have failed!'),console.log("All tests passed!")}

},{"./abs.js":1,"./assert.js":11,"./flatten.js":27,"./is-array.js":35,"./is-number.js":39,"./is-undefined.js":41,"./normal.js":51,"./pow.js":54,"./scale.js":60,"./std.js":71}],77:[function(require,module,exports){
let assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isFunction=require("./is-function.js"),isArray=require("./is-array.js"),max=require("./max.js");function vectorize(e){return assert(!isUndefined(e),"You must pass a function into the `vectorize` function!"),assert(isFunction(e),"You must pass a function into the `vectorize` function!"),function t(){if(Object.keys(arguments).map(e=>isArray(arguments[e])).indexOf(!0)>-1){let e=[],r=Object.keys(arguments).filter(e=>isArray(arguments[e])).map(e=>arguments[e].length),s=max(r);r.forEach(function(e){assert(e===s,"If using arrays for all arguments to this function, then the arrays must all have equal length!")});for(let r=0;r<s;r++){let s=Object.keys(arguments).map(e=>isArray(arguments[e])?arguments[e][r]:arguments[e]);e.push(t(...s))}return e}return e(...arguments)}}if(module.exports=vectorize,!module.parent&&"undefined"==typeof window){let e=require("./is-equal.js"),t=[2,3,4],r=[4,6,8],s=vectorize(e=>2*e)(t);assert(e(r,s),"double([2, 3, 4]) should be [4, 6, 8]!"),t=[0,1,2,3];let o=vectorize(e=>10);r=[10,10,10,10],s=o(t),assert(e(r,s),"tens([0, 1, 2, 3]) should be [10, 10, 10, 10]!"),t=[[[[1,2,3,4]]]];let a=vectorize(e=>e*e);r=[[[[1,4,9,16]]]],s=a(t),assert(e(r,s),"square([[[[1, 2, 3, 4]]]]) should be [[[[1, 4, 9, 16]]]]!"),t=["a","b","c"];let i,c=vectorize(e=>e+"foo");r=["afoo","bfoo","cfoo"],s=c(t),assert(e(r,s),'foo(["a", "b", "c"]) should be ["afoo", "bfoo", "cfoo"]!');try{i=!1,vectorize()}catch(e){i=!0}assert(i,"vectorize() should have failed!");try{i=!1,vectorize((e,t)=>e+t)([2,3,4],[5,6])}catch(e){i=!0}assert(i,"add([2, 3, 4], [5, 6]) should have failed!");try{i=!1,vectorize(123)}catch(e){i=!0}assert(i,"vectorize(123) should have failed!");try{i=!1,vectorize("foo")}catch(e){i=!0}assert(i,'vectorize("foo") should have failed!');try{i=!1,vectorize(!0)}catch(e){i=!0}assert(i,"vectorize(true) should have failed!");try{i=!1,vectorize({})}catch(e){i=!0}assert(i,"vectorize({}) should have failed!");try{let e;i=!1,vectorize(e)}catch(e){i=!0}assert(i,"vectorize(foo) should have failed!");try{i=!1,vectorize([])}catch(e){i=!0}assert(i,"vectorize([]) should have failed!"),console.log("All tests passed!")}

},{"./assert.js":11,"./is-array.js":35,"./is-equal.js":37,"./is-function.js":38,"./is-undefined.js":41,"./max.js":45}],78:[function(require,module,exports){
let ndarray=require("./ndarray.js"),apply=require("./apply.js");function zeros(r){return apply(ndarray(r),r=>0)}module.exports=zeros;

},{"./apply.js":4,"./ndarray.js":50}],79:[function(require,module,exports){

},{}],80:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":81}],81:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[32]);
