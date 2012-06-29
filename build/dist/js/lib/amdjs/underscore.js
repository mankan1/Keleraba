//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function(){function eq(a,b,stack){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;a._chain&&(a=a._wrapped),b._chain&&(b=b._wrapped);if(a.isEqual&&_.isFunction(a.isEqual))return a.isEqual(b);if(b.isEqual&&_.isFunction(b.isEqual))return b.isEqual(a);var className=toString.call(a);if(className!=toString.call(b))return!1;switch(className){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:a==0?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if(typeof a!="object"||typeof b!="object")return!1;var length=stack.length;while(length--)if(stack[length]==a)return!0;stack.push(a);var size=0,result=!0;if(className=="[object Array]"){size=a.length,result=size==b.length;if(result)while(size--)if(!(result=size in a==size in b&&eq(a[size],b[size],stack)))break}else{if("constructor"in a!="constructor"in b||a.constructor!=b.constructor)return!1;for(var key in a)if(_.has(a,key)){size++;if(!(result=_.has(b,key)&&eq(a[key],b[key],stack)))break}if(result){for(key in b)if(_.has(b,key)&&!(size--))break;result=!size}}return stack.pop(),result}var root=this,previousUnderscore=root._,breaker={},ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype,slice=ArrayProto.slice,unshift=ArrayProto.unshift,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty,nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeFilter=ArrayProto.filter,nativeEvery=ArrayProto.every,nativeSome=ArrayProto.some,nativeIndexOf=ArrayProto.indexOf,nativeLastIndexOf=ArrayProto.lastIndexOf,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind,_=function(obj){return new wrapper(obj)};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=_),exports._=_):root._=_,_.VERSION="1.3.3";var each=_.each=_.forEach=function(obj,iterator,context){if(obj==null)return;if(nativeForEach&&obj.forEach===nativeForEach)obj.forEach(iterator,context);else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++)if(i in obj&&iterator.call(context,obj[i],i,obj)===breaker)return}else for(var key in obj)if(_.has(obj,key)&&iterator.call(context,obj[key],key,obj)===breaker)return};_.map=_.collect=function(obj,iterator,context){var results=[];return obj==null?results:nativeMap&&obj.map===nativeMap?obj.map(iterator,context):(each(obj,function(value,index,list){results[results.length]=iterator.call(context,value,index,list)}),obj.length===+obj.length&&(results.length=obj.length),results)},_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){var initial=arguments.length>2;obj==null&&(obj=[]);if(nativeReduce&&obj.reduce===nativeReduce)return context&&(iterator=_.bind(iterator,context)),initial?obj.reduce(iterator,memo):obj.reduce(iterator);each(obj,function(value,index,list){initial?memo=iterator.call(context,memo,value,index,list):(memo=value,initial=!0)});if(!initial)throw new TypeError("Reduce of empty array with no initial value");return memo},_.reduceRight=_.foldr=function(obj,iterator,memo,context){var initial=arguments.length>2;obj==null&&(obj=[]);if(nativeReduceRight&&obj.reduceRight===nativeReduceRight)return context&&(iterator=_.bind(iterator,context)),initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator);var reversed=_.toArray(obj).reverse();return context&&!initial&&(iterator=_.bind(iterator,context)),initial?_.reduce(reversed,iterator,memo,context):_.reduce(reversed,iterator)},_.find=_.detect=function(obj,iterator,context){var result;return any(obj,function(value,index,list){if(iterator.call(context,value,index,list))return result=value,!0}),result},_.filter=_.select=function(obj,iterator,context){var results=[];return obj==null?results:nativeFilter&&obj.filter===nativeFilter?obj.filter(iterator,context):(each(obj,function(value,index,list){iterator.call(context,value,index,list)&&(results[results.length]=value)}),results)},_.reject=function(obj,iterator,context){var results=[];return obj==null?results:(each(obj,function(value,index,list){iterator.call(context,value,index,list)||(results[results.length]=value)}),results)},_.every=_.all=function(obj,iterator,context){var result=!0;return obj==null?result:nativeEvery&&obj.every===nativeEvery?obj.every(iterator,context):(each(obj,function(value,index,list){if(!(result=result&&iterator.call(context,value,index,list)))return breaker}),!!result)};var any=_.some=_.any=function(obj,iterator,context){iterator||(iterator=_.identity);var result=!1;return obj==null?result:nativeSome&&obj.some===nativeSome?obj.some(iterator,context):(each(obj,function(value,index,list){if(result||(result=iterator.call(context,value,index,list)))return breaker}),!!result)};_.include=_.contains=function(obj,target){var found=!1;return obj==null?found:nativeIndexOf&&obj.indexOf===nativeIndexOf?obj.indexOf(target)!=-1:(found=any(obj,function(value){return value===target}),found)},_.invoke=function(obj,method){var args=slice.call(arguments,2);return _.map(obj,function(value){return(_.isFunction(method)?method||value:value[method]).apply(value,args)})},_.pluck=function(obj,key){return _.map(obj,function(value){return value[key]})},_.max=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0])return Math.max.apply(Math,obj);if(!iterator&&_.isEmpty(obj))return-Infinity;var result={computed:-Infinity};return each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed>=result.computed&&(result={value:value,computed:computed})}),result.value},_.min=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0])return Math.min.apply(Math,obj);if(!iterator&&_.isEmpty(obj))return Infinity;var result={computed:Infinity};return each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed<result.computed&&(result={value:value,computed:computed})}),result.value},_.shuffle=function(obj){var shuffled=[],rand;return each(obj,function(value,index,list){rand=Math.floor(Math.random()*(index+1)),shuffled[index]=shuffled[rand],shuffled[rand]=value}),shuffled},_.sortBy=function(obj,val,context){var iterator=_.isFunction(val)?val:function(obj){return obj[val]};return _.pluck(_.map(obj,function(value,index,list){return{value:value,criteria:iterator.call(context,value,index,list)}}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a===void 0?1:b===void 0?-1:a<b?-1:a>b?1:0}),"value")},_.groupBy=function(obj,val){var result={},iterator=_.isFunction(val)?val:function(obj){return obj[val]};return each(obj,function(value,index){var key=iterator(value,index);(result[key]||(result[key]=[])).push(value)}),result},_.sortedIndex=function(array,obj,iterator){iterator||(iterator=_.identity);var low=0,high=array.length;while(low<high){var mid=low+high>>1;iterator(array[mid])<iterator(obj)?low=mid+1:high=mid}return low},_.toArray=function(obj){return obj?_.isArray(obj)?slice.call(obj):_.isArguments(obj)?slice.call(obj):obj.toArray&&_.isFunction(obj.toArray)?obj.toArray():_.values(obj):[]},_.size=function(obj){return _.isArray(obj)?obj.length:_.keys(obj).length},_.first=_.head=_.take=function(array,n,guard){return n!=null&&!guard?slice.call(array,0,n):array[0]},_.initial=function(array,n,guard){return slice.call(array,0,array.length-(n==null||guard?1:n))},_.last=function(array,n,guard){return n!=null&&!guard?slice.call(array,Math.max(array.length-n,0)):array[array.length-1]},_.rest=_.tail=function(array,index,guard){return slice.call(array,index==null||guard?1:index)},_.compact=function(array){return _.filter(array,function(value){return!!value})},_.flatten=function(array,shallow){return _.reduce(array,function(memo,value){return _.isArray(value)?memo.concat(shallow?value:_.flatten(value)):(memo[memo.length]=value,memo)},[])},_.without=function(array){return _.difference(array,slice.call(arguments,1))},_.uniq=_.unique=function(array,isSorted,iterator){var initial=iterator?_.map(array,iterator):array,results=[];return array.length<3&&(isSorted=!0),_.reduce(initial,function(memo,value,index){if(isSorted?_.last(memo)!==value||!memo.length:!_.include(memo,value))memo.push(value),results.push(array[index]);return memo},[]),results},_.union=function(){return _.uniq(_.flatten(arguments,!0))},_.intersection=_.intersect=function(array){var rest=slice.call(arguments,1);return _.filter(_.uniq(array),function(item){return _.every(rest,function(other){return _.indexOf(other,item)>=0})})},_.difference=function(array){var rest=_.flatten(slice.call(arguments,1),!0);return _.filter(array,function(value){return!_.include(rest,value)})},_.zip=function(){var args=slice.call(arguments),length=_.max(_.pluck(args,"length")),results=new Array(length);for(var i=0;i<length;i++)results[i]=_.pluck(args,""+i);return results},_.indexOf=function(array,item,isSorted){if(array==null)return-1;var i,l;if(isSorted)return i=_.sortedIndex(array,item),array[i]===item?i:-1;if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item);for(i=0,l=array.length;i<l;i++)if(i in array&&array[i]===item)return i;return-1},_.lastIndexOf=function(array,item){if(array==null)return-1;if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf)return array.lastIndexOf(item);var i=array.length;while(i--)if(i in array&&array[i]===item)return i;return-1},_.range=function(start,stop,step){arguments.length<=1&&(stop=start||0,start=0),step=arguments[2]||1;var len=Math.max(Math.ceil((stop-start)/step),0),idx=0,range=new Array(len);while(idx<len)range[idx++]=start,start+=step;return range};var ctor=function(){};_.bind=function(func,context){var bound,args;if(func.bind===nativeBind&&nativeBind)return nativeBind.apply(func,slice.call(arguments,1));if(!_.isFunction(func))throw new TypeError;return args=slice.call(arguments,2),bound=function(){if(this instanceof bound){ctor.prototype=func.prototype;var self=new ctor,result=func.apply(self,args.concat(slice.call(arguments)));return Object(result)===result?result:self}return func.apply(context,args.concat(slice.call(arguments)))}},_.bindAll=function(obj){var funcs=slice.call(arguments,1);return funcs.length==0&&(funcs=_.functions(obj)),each(funcs,function(f){obj[f]=_.bind(obj[f],obj)}),obj},_.memoize=function(func,hasher){var memo={};return hasher||(hasher=_.identity),function(){var key=hasher.apply(this,arguments);return _.has(memo,key)?memo[key]:memo[key]=func.apply(this,arguments)}},_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)},_.defer=function(func){return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)))},_.throttle=function(func,wait){var context,args,timeout,throttling,more,result,whenDone=_.debounce(function(){more=throttling=!1},wait);return function(){context=this,args=arguments;var later=function(){timeout=null,more&&func.apply(context,args),whenDone()};return timeout||(timeout=setTimeout(later,wait)),throttling?more=!0:result=func.apply(context,args),whenDone(),throttling=!0,result}},_.debounce=function(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,later=function(){timeout=null,immediate||func.apply(context,args)};immediate&&!timeout&&func.apply(context,args),clearTimeout(timeout),timeout=setTimeout(later,wait)}},_.once=function(func){var ran=!1,memo;return function(){return ran?memo:(ran=!0,memo=func.apply(this,arguments))}},_.wrap=function(func,wrapper){return function(){var args=[func].concat(slice.call(arguments,0));return wrapper.apply(this,args)}},_.compose=function(){var funcs=arguments;return function(){var args=arguments;for(var i=funcs.length-1;i>=0;i--)args=[funcs[i].apply(this,args)];return args[0]}},_.after=function(times,func){return times<=0?func():function(){if(--times<1)return func.apply(this,arguments)}},_.keys=nativeKeys||function(obj){if(obj!==Object(obj))throw new TypeError("Invalid object");var keys=[];for(var key in obj)_.has(obj,key)&&(keys[keys.length]=key);return keys},_.values=function(obj){return _.map(obj,_.identity)},_.functions=_.methods=function(obj){var names=[];for(var key in obj)_.isFunction(obj[key])&&names.push(key);return names.sort()},_.extend=function(obj){return each(slice.call(arguments,1),function(source){for(var prop in source)obj[prop]=source[prop]}),obj},_.pick=function(obj){var result={};return each(_.flatten(slice.call(arguments,1)),function(key){key in obj&&(result[key]=obj[key])}),result},_.defaults=function(obj){return each(slice.call(arguments,1),function(source){for(var prop in source)obj[prop]==null&&(obj[prop]=source[prop])}),obj},_.clone=function(obj){return _.isObject(obj)?_.isArray(obj)?obj.slice():_.extend({},obj):obj},_.tap=function(obj,interceptor){return interceptor(obj),obj},_.isEqual=function(a,b){return eq(a,b,[])},_.isEmpty=function(obj){if(obj==null)return!0;if(_.isArray(obj)||_.isString(obj))return obj.length===0;for(var key in obj)if(_.has(obj,key))return!1;return!0},_.isElement=function(obj){return!!obj&&obj.nodeType==1},_.isArray=nativeIsArray||function(obj){return toString.call(obj)=="[object Array]"},_.isObject=function(obj){return obj===Object(obj)},_.isArguments=function(obj){return toString.call(obj)=="[object Arguments]"},_.isArguments(arguments)||(_.isArguments=function(obj){return!!obj&&!!_.has(obj,"callee")}),_.isFunction=function(obj){return toString.call(obj)=="[object Function]"},_.isString=function(obj){return toString.call(obj)=="[object String]"},_.isNumber=function(obj){return toString.call(obj)=="[object Number]"},_.isFinite=function(obj){return _.isNumber(obj)&&isFinite(obj)},_.isNaN=function(obj){return obj!==obj},_.isBoolean=function(obj){return obj===!0||obj===!1||toString.call(obj)=="[object Boolean]"},_.isDate=function(obj){return toString.call(obj)=="[object Date]"},_.isRegExp=function(obj){return toString.call(obj)=="[object RegExp]"},_.isNull=function(obj){return obj===null},_.isUndefined=function(obj){return obj===void 0},_.has=function(obj,key){return hasOwnProperty.call(obj,key)},_.noConflict=function(){return root._=previousUnderscore,this},_.identity=function(value){return value},_.times=function(n,iterator,context){for(var i=0;i<n;i++)iterator.call(context,i)},_.escape=function(string){return(""+string).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},_.result=function(object,property){if(object==null)return null;var value=object[property];return _.isFunction(value)?value.call(object):value},_.mixin=function(obj){each(_.functions(obj),function(name){addToWrapper(name,_[name]=obj[name])})};var idCounter=0;_.uniqueId=function(prefix){var id=idCounter++;return prefix?prefix+id:id},_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/.^/,escapes={"\\":"\\","'":"'",r:"\r",n:"\n",t:"	",u2028:"\u2028",u2029:"\u2029"};for(var p in escapes)escapes[escapes[p]]=p;var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g,unescaper=/\\(\\|'|r|n|t|u2028|u2029)/g,unescape=function(code){return code.replace(unescaper,function(match,escape){return escapes[escape]})};_.template=function(text,data,settings){settings=_.defaults(settings||{},_.templateSettings);var source="__p+='"+text.replace(escaper,function(match){return"\\"+escapes[match]}).replace(settings.escape||noMatch,function(match,code){return"'+\n_.escape("+unescape(code)+")+\n'"}).replace(settings.interpolate||noMatch,function(match,code){return"'+\n("+unescape(code)+")+\n'"}).replace(settings.evaluate||noMatch,function(match,code){return"';\n"+unescape(code)+"\n;__p+='"})+"';\n";settings.variable||(source="with(obj||{}){\n"+source+"}\n"),source="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+source+"return __p;\n";var render=new Function(settings.variable||"obj","_",source);if(data)return render(data,_);var template=function(data){return render.call(this,data,_)};return template.source="function("+(settings.variable||"obj")+"){\n"+source+"}",template},_.chain=function(obj){return _(obj).chain()};var wrapper=function(obj){this._wrapped=obj};_.prototype=wrapper.prototype;var result=function(obj,chain){return chain?_(obj).chain():obj},addToWrapper=function(name,func){wrapper.prototype[name]=function(){var args=slice.call(arguments);return unshift.call(args,this._wrapped),result(func.apply(_,args),this._chain)}};_.mixin(_),each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){var method=ArrayProto[name];wrapper.prototype[name]=function(){var wrapped=this._wrapped;method.apply(wrapped,arguments);var length=wrapped.length;return(name=="shift"||name=="splice")&&length===0&&delete wrapped[0],result(wrapped,this._chain)}}),each(["concat","join","slice"],function(name){var method=ArrayProto[name];wrapper.prototype[name]=function(){return result(method.apply(this._wrapped,arguments),this._chain)}}),wrapper.prototype.chain=function(){return this._chain=!0,this},wrapper.prototype.value=function(){return this._wrapped},typeof define=="function"&&define.amd&&define("underscore",[],function(){return _})}).call(this)