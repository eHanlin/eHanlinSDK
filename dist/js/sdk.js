//verion: 0.0.5
!function(window,module){var document=window.document,API_DOMAIN,CONFIG,DATA_KEY,EH,JSONP_KEY,TRANSITION_END,randId;EH=window.EH?window.EH:{root:"/"},CONFIG=EH.CONFIG?EH.CONFIG:{},randId=function(){return"EH_"+ +new Date+"_"+parseInt(1e4*Math.random())+"_"+parseInt(1e4*Math.random())},DATA_KEY="EH_"+randId(),JSONP_KEY="jsonp_"+randId(),API_DOMAIN=CONFIG.API_DOMAIN?CONFIG.API_DOMAIN:"test.ehanlin.com.tw:8989",TRANSITION_END=function(){var t,e,n,i;t=document.createElement("div"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(e in n)if(i=n[e],void 0!==t.style[e])return i}();var util;util={isObject:function(t){return"object"==typeof t},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},isString:function(t){return"string"==typeof t},isFunction:function(t){return"function"==typeof t},isArrayLike:function(t){var e;return e=t.length,"function"==typeof t?!1:this.isArray(t)||0===e||"number"==typeof e&&e>0&&e-1 in t},each:function(t,e){var n,i,r,o,s,a,u;if(u=null,n=0,this.isArrayLike(t)){for(o=[],i=0,r=t.length;r>i&&(a=t[i],u=e.call(a,n,a),u!==!1);i++)o.push(void 0);return o}s=[];for(n in t){if(u=e.call(t[n],n,t[n]),u===!1)break;s.push(void 0)}return s},clone:function(t,e,n){var i,r,o;o=null,r=null,"boolean"!=typeof t?(o=t,r=e):(o=e,r=n);for(i in r)util.isArray(r[i])?o[i]=util.isArray(o[i])?o[i]:[]:util.isObject(r[i])&&(o[i]=util.isObject(o[i])?o[i]:{}),t&&util.isObject(r[i])?this.clone(o[i],r[i]):o[i]=r[i];return o},copyArray:function(t){var e,n,i,r,o;for(r=[],e=n=0,i=t.length;i>n;e=++n)o=t[e],r[e]=t[e];return r},inherits:function(t,e){return this.clone(!0,t.prototype,e.prototype)},hasData:function(t){return t[DATA_KEY]?!0:!1},removeData:function(t,e){return this.hasData?e?delete t[DATA_KEY][e]:delete t[DATA_KEY]:void 0},data:function(t,e,n){var i;return i=this.hasData(t)?t[DATA_KEY]:t[DATA_KEY]={},3===arguments.length?i[e]=n:i[e]}};var domUtils;domUtils={query:function(t){return document.querySelectorAll(t)},isElement:function(t){var e;try{return t instanceof HTMLElement}catch(n){return e=n,"object"==typeof t&&1===t.nodeType&&"object"==typeof t.style&&"object"==typeof t.ownerDocument}},createElement:function(t){return document.createElement(t)},createElementByHTML:function(t){var e,n;return n=this.createElement("div"),e=null,n.innerHTML=t,e=n.children,util.each(function(t,e){return n.removeChild(e)}),e},getStyles:function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):window.getComputedStyle(t,null)},css:function(t,e,n){var i,r,o,s;if(null==n&&(n=!1),"string"==typeof e)return s=this.getStyles(t)[e],n===!0?parseFloat(s):s;o=[];for(r in e)i=e[r],o.push(t.style[r]=i);return o},hide:function(t){var e;return e=this.css(t,"display"),/none/i.test(e)?void 0:(util.data(t,"originalDisplay",e),this.css(t,{display:"none"}))},show:function(t){var e,n;return e=this.css(t,"display"),n=util.data(t,"originalDisplay"),n=n&&!/none/i.test(n)?n:"block",/none/i.test(e)?this.css(t,{display:n}):void 0},offset:function(t){var e,n,i;return e=t.getBoundingClientRect(),i=t.ownerDocument,n=i.documentElement,{top:e.top+n.scrollTop-(n.clientTop||0),left:e.left+n.scrollLeft-(n.clientLeft||0)}},position:function(t){var e,n,i;return i={top:0,left:0},"fixed"===this.css(t,"position")?t.getBoundingClientRect():(n=this.offsetParent(t.offsetParent),n&&!this.nodeName(n,"html")&&(i=domUtils.offset(n)),e=this.offset(t),i.top+=this.css(n,"borderTopWidth",!0),i.left+=this.css(n,"borderLeftWidth",!0),{top:e.top-i.top-this.css(t,"marginTop",!0),left:e.left-i.left-this.css(t,"marginLeft",!0)})},offsetParent:function(){var t,e;for(t=document.documentElement,e=e||t;e&&!this.nodeName(e,"html")&&"static"===this.css(e,"position");)e=e.offsetParent;return e||t},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},fireEvent:function(t,e,n){var i;return i=document.createEvent("Event"),i.initEvent(e,!0,!1),i.detail=n,t.dispatchEvent(i)},remove:function(t){var e;return e=t.parentNode,e?e.removeChild(t):void 0},getDataByDatasetKey:function(t,e){var n,i,r,o,s,a,u;n={},a=this.getDataset(t);for(r in a)u=a[r],s=new RegExp("^"+e,"i"),s.test(r)&&(i=r.replace(s,""),o=i.split(""),o[0]=o[0].toLowerCase(),n[o.join("")]=isNaN(u)||""===u?u:Number(u));return n},getDatasetAttributeNameByKey_:function(t){var e,n,i,r,o,s,a,u;for(n=t.replace(/^data-/,""),a=n.split("-"),e="",i=r=0,o=a.length;o>r;i=++r)s=a[i],0===i?e=s:(u=s.split(""),e=e+u.shift().toUpperCase()+u.join(""));return e},getDataset:function(t){var e,n,i,r,o,s,a;if(t.dataset)n=t.dataset;else for(n={},a=t.attributes,r=0,o=a.length;o>r;r++)e=a[r],s=e.nodeName,/data-/.test(s)&&(i=this.getDatasetAttributeNameByKey_(s),n[i]=e.value);return n},width:function(t,e){return arguments.length>1?t.style.width=e+"px":t.clientWidth},height:function(t,e){return arguments.length>1?t.style.height=e+"px":t.clientHeight}};var Animation,animationEffect;Animation=function(){function t(t){this.el=t,this.queue=[]}return t.prototype.addCss_=function(t){return this.el.classList.add("eh-animation"),this.el.classList.add(t),this.queue.push(t)},t.prototype.resetCss_=function(){var t,e;for(e=[];t=this.queue.shift();)e.push(this.el.classList.remove(t));return e},t.prototype.cssEffect=function(t,e){var n,i;return this.resetCss_(),this.addCss_(t),e?(n=this.el,i=function(){return e&&e(),n.removeEventListener(TRANSITION_END,i)},n.addEventListener(TRANSITION_END,i)):void 0},t}(),animationEffect={createAnimation:function(t){var e;return e=util.data(t,"animation"),e?e:(e=new Animation(t),util.data(t,"animation",e),e)},fadeIn:function(t,e){var n;return n=this.createAnimation(t),domUtils.show(t),n.cssEffect("eh-fade-in",e)},fadeOut:function(t,e){var n;return n=this.createAnimation(t),n.cssEffect("eh-fade-out",function(){return domUtils.hide(t),e&&e()})}};var queryString;queryString={stringify:function(t){var e,n,i,r,o,s;o=[];for(r in t)if(s=t[r],util.isArray(s))for(n=0,i=s.length;i>n;n++)e=s[n],o.push(r+"="+e);else o.push(r+"="+s);return o.join("&")},parse:function(t){var e,n,i,r,o,s,a,u,l;for(s=t.split("&"),r={},u=[],e=0,i=s.length;i>e;e++)o=s[e],a=o.split("="),n=a.key,l=a.val,u.push("undefined"==typeof r[n]?r[n]=l:util.isArray(r[n])?r[n].push(l):r[n]=[r[n],l]);return u}};var Deferred=function(){var t=function(t){return function(e){this.hasResult()?e.apply(null,this.taskParams_):this[t+"Cbs_"].push(e)}},e=function(){this.doneCbs_=[],this.failCbs_=[],this.alwayCbs_=[],this.result_={}};return e.prototype={TYPES:["resolve","reject"],TASK_MAPPING:{done:"resolve",fail:"reject"},done:t("done"),fail:t("fail"),always:t("alway"),hasEndTask:function(t){return this.result_[this.TASK_MAPPING[t]]?!0:!1},hasResult:function(){var t=this.result_,e=this.TYPES;for(var n in e)if(e[n]in t)return!0;return!1},runTask:function(t,e){for(var n in t){for(var i=null,r=t[n];i=this[r+"Cbs_"].shift();)i.apply(null,e);delete this[r+"Cbs_"]}},resolve:function(){this.hasResult()||(this.result_.resolve=!0,this.taskParams_=arguments,this.runTask(["alway","done"],arguments))},reject:function(){this.hasResult()||(this.result_.reject=!0,this.taskParams_=arguments,this.runTask(["alway","fail"],arguments))}},function(){return new e}}(),ajax,buildAjax,buildErrorPipe,buildPipeByContentType,getDataByHeader,getScript;buildPipeByContentType=function(t,e,n,i){var r;return r=function(){return e&&e.apply(t,arguments),i.resolve.apply(i,arguments)},function(e){var o,s;return 4===this.readyState&&200===this.status?(o=this.getResponseHeader("content-type"),"application/json"===o.toLowerCase()?(s=JSON.parse(this.responseText),r(e,s)):r(e,this.responseText)):(n&&n.apply(t,arguments),i.reject.apply(i,arguments))}},buildErrorPipe=function(t,e,n){return function(){return e&&e.apply(t,arguments),n.reject.apply(n,arguments)}},getDataByHeader=function(t,e){var n,i;if(util.isString(e))return e;for(n in t)if(i=t[n],/content-type/i.test(n)){if(/application\/json/i.test(i))return JSON.stringify(e);if(/application\/x-www-form-urlencoded/i.test(i))return queryString.stringify(e)}return e.toString()},ajax=function(t,e){var n,i,r,o,s,a,u,l,c,d,p;switch(null==e&&(e={}),p=new XMLHttpRequest,i=Deferred(),l=(e.method||"get").toLowerCase(),n=e.data||{},d=e.success,r=e.error,c=e.progress,a=e.headers,u=!1,l){case"get":n=util.isObject(n)?queryString.stringify(n):n,u=!0}if(p.addEventListener("load",buildPipeByContentType(p,d,r,i)),p.addEventListener("error",buildErrorPipe(p,r,i)),util.isFunction(c)&&p.addEventListener("progress",c.bind(p)),p.open(l,t,!0),a&&util.isObject(a))for(o in a)s=a[o],p.setRequestHeader(o,s);return u?p.send():p.send(getDataByHeader(a,n)),p.done=i.done.bind(i),p.fail=i.fail.bind(i),p},buildAjax=function(t){return function(e,n){return null==n&&(n={}),ajax(e,util.clone(n,t))}},ajax.get=buildAjax({method:"get"}),ajax.post=buildAjax({method:"post",headers:{"Content-type":"application/x-www-form-urlencoded"}}),ajax.put=buildAjax({method:"put"}),ajax.postJson=buildAjax({method:"post",headers:{"Content-type":"application/json"}}),EH[JSONP_KEY]={},getScript=ajax.getScript=function(t,e){var n;return n=domUtils.createElement("script"),n.onload=function(){var t;return t=n.parentNode,t.removeChild(n),e&&e()},n.type="text/javascript",n.src=t,document.body.appendChild(n)},ajax.jsonp=function(t,e,n,i){var r,o,s;return null==e&&(e={}),null==i&&(i={callbackName:"callback"}),r=Deferred(),o=randId(),EH[JSONP_KEY][o]=function(){return n&&n.apply(null,arguments),r.resolve.apply(r,arguments),delete EH[JSONP_KEY][o]},s=util.clone({},e),s[i.callbackName]="EH."+JSONP_KEY+"."+o,getScript(t+"?"+queryString.stringify(s)),r};var api;api={getComment:function(t,e,n,i){return null==i&&(i=10),ajax.jsonp("//"+API_DOMAIN+"/user/"+t+"/type/"+e+"/target/"+n+"/Comment",{limit:i})},putComment:function(t,e,n,i){return null==i&&(i={}),i._id&&delete i._id,ajax.postJson("//"+API_DOMAIN+"/user/"+t+"/type/"+e+"/target/"+n+"/Comment",{data:i})}},EH.api=api;var Observer;Observer=function(){function t(){}return t.prototype.getEvent_=function(){return this.events_?this.events_:this.events_={}},t.prototype.removeEvent_=function(t,e,n){var i,r,o,s,a,u,l;for(r=null,i=function(){return e&&n?function(t,i){return e===t&&n===i}:function(t){return e===t}}(),l=events[t],a=s=0,u=l.length;u>s;a=++s)if(o=l[a],i(e,n)){r=a;break}return r?events[t].splice(r,1):void 0},t.prototype.trigger=function(t){var e,n,i,r,o,s,a,u,l,c,d,p;for(u=util.copyArray(arguments),u.shift(),n=this.getEvent_(),d=[],c=n[t],r=i=0,s=c.length;s>i;r=++i)e=c[r],e.callback.apply(e.context||null,u),d.push(r);for(l=0,p=[],o=0,a=d.length;a>o;o++)r=d[o],l-=r,p.push(n[t].splice(l,1));return p},t.prototype.on=function(t,e,n,i){var r;return null==i&&(i=!1),r=this.getEvent_(),r[t]||(r[t]=[]),r.push({name:t,callback:e,context:n})},t.prototype.off=function(t,e,n){var i,r;switch(i=this.getEvent_(),arguments.length){case 0:r=[];for(t in i)r.push(delete i[t]);return r;case 1:return delete i[t];case 2:case 3:return this.removeEvent_(t,e,n)}},t.prototype.once=function(){var t;return t=util.copyArray(arguments),t.push(!0),this.on.apply(this,t)},t}();var pathBuilder={img:function(t){return EH.root+"images/"+t}},EventBinder=function(){};util.clone(EventBinder.prototype,{EVENTS:["click","mousedown","mouseup","mousemove","touchstart","touchmove","touchend","load","submit","commentSubmit","close"],register:function(el,view){this.EVENTS.forEach(function(eventName){var key="eh-event-"+eventName;util.each(el.querySelectorAll("["+key+"]"),function(index,dom){var ehEvent={};if(util.data(dom,"eh-event")?ehEvent=util.data(dom,"eh-event"):util.data(dom,"eh-event",ehEvent),!ehEvent[eventName]){var values=/([^()].*)\((.*)\)/.exec(dom.getAttribute(key)),funcName=values[1],params=eval("(function(){ return arguments;})("+values[2]+")");dom.addEventListener(eventName,function(t){var e=util.clone([],params);e.unshift(t),t.originalElement=dom,view[funcName].apply(view,e)}),ehEvent[eventName]=!0}})})}});var Model=function(){this.data={}};util.clone(Model.prototype,{set:function(t,e){1==arguments.length&&util.isObject(t)?util.clone(this.data,t):this.data[t]=e},get:function(t){return this.data[t]}});var View;View=function(){function t(){}return t.prototype.onCreate=function(t){var e;return e=this.buildElement(),t?(this.el=t,this.el.appendChild(e)):this.el=e,this.eventBinder=new EventBinder,XEHML.parse(this.el),this.registerEvent()},t.prototype.width=function(){var t;return t=util.copyArray(arguments),t.unshift(this.el),domUtils.width.apply(domUtils,t)},t.prototype.height=function(){var t;return t=util.copyArray(arguments),t.unshift(this.el),domUtils.height.apply(domUtils,t)},t.prototype.hide=function(){return domUtils.hide(this.el)},t.prototype.show=function(){return domUtils.show(this.el)},t.prototype.destroy=function(){},t.prototype.buildElement=function(){return domUtils.createElementByHTML("<div></div>")[0]},t.prototype.registerEvent=function(){var t;return t=this.el,this.eventBinder.register(t,this)},t.prototype.fireEvent=function(t,e){return domUtils.fireEvent(this.el,t,e)},t.prototype.findViewByName=function(t){var e;return e=this.el.querySelector('[data-eh-action="'+t+'"]'),util.data(e,"view")},t}();var WindowView,extend=function(t,e){function n(){this.constructor=t}for(var i in e)hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;WindowView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,t),e.prototype.onCreate=function(t){return View.prototype.onCreate.call(this,t),this.headerEl=this.el.querySelector("div.eh-window-header"),this.titleEl=this.headerEl.querySelector("div.eh-window-title"),domUtils.getDataset(t).enabledHeader?domUtils.show(this.headerEl):domUtils.hide(this.headerEl)},e.prototype.showTitle=function(){return domUtils.show(this.headerEl)},e.prototype.hideTitle=function(){return domUtils.hide(this.headerEl)},e.prototype.setTitle=function(t){return this.titleEl.innerHTML=t},e.prototype.getTitle=function(){return this.titleEl.innerHTML},e.prototype.close=function(){return this.fireEvent("close",{})},e.prototype.buildElement=function(){return domUtils.createElementByHTML('<div class="eh-window-view">\n  <div class="eh-window-header">\n    <div class="eh-window-title"></div>\n    <a class="close-button" eh-event-click="close()">&times;</a>\n  </div>\n  <div class="eh-window-content" data-eh-transclude></div>\n</div>')[0]},e}(View);var CommentView,extend=function(t,e){function n(){this.constructor=t}for(var i in e)hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;CommentView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,t),e.prototype.onCreate=function(t){return View.prototype.onCreate.call(this,t),this.textarea=this.el.querySelector("textarea"),this.select=this.el.querySelector("select")},e.prototype.setTextAreaPlaceHolder=function(t){return this.textarea.setAttribute("placeholder",t)},e.prototype.getText=function(){return this.textarea.value},e.prototype.getSelect=function(){return this.select.value},e.prototype.setText=function(t){return this.textarea.value=t},e.prototype.setSelect=function(t){return this.select.value=t},e.prototype.hideSelector=function(){return domUtils.hide(this.select)},e.prototype.showSelector=function(){return domUtils.show(this.select)},e.prototype.renderSelect=function(t){var e,n,i,r;for(e="",n=0,i=t.length;i>n;n++)r=t[n],e+='<option value="'+r.val+'">'+r.text+"</option>";return this.select.innerHTML=e},e.prototype.preventDefault=function(t){return t.preventDefault()},e.prototype.onSubmit=function(){return this.fireEvent("commentSubmit",{text:this.getText(),select:this.getSelect()})},e.prototype.buildElement=function(){return domUtils.createElementByHTML('<div class="eh-comment-view">\n  <div class="eh-line-block">\n    <select id="" name="" class="eh-basic-select">\n    </select>\n  </div>\n  <div class="eh-table-layout eh-full eh-line-block">\n    <div class="eh-table-cell">\n      <textarea name="" ></textarea>\n    </div>\n    <div class="eh-table-cell action-cell">\n      <a class="eh-btn" eh-event-click="onSubmit()" eh-event-mousedown="preventDefault()">送出</a>\n    </div>\n  </div>\n</div>')[0]},e}(View);var CommentWindowView,extend=function(t,e){function n(){this.constructor=t}for(var i in e)hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;CommentWindowView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,t),e.prototype.onCreate=function(t){return View.prototype.onCreate.call(this,t)},e.prototype.buildElement=function(){return domUtils.createElementByHTML('<div data-eh-action="window">\n  <div data-eh-action="comment"></div>\n</div>')[0]},e}(View);var NotificationWindowView,extend=function(t,e){function n(){this.constructor=t}for(var i in e)hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;NotificationWindowView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,t),e.prototype.onCreate=function(t){return View.prototype.onCreate.call(this,t),this.window=this.findViewByName("window"),this.message=this.el.querySelector(".message")},e.prototype.setMessage=function(t){return this.message.innerHTML=t},e.prototype.getMessage=function(){return this.message.innerHTML},e.prototype.setTitle=function(t){return this.window.setTitle(t)},e.prototype.getTitle=function(){return this.window.getTitle()},e.prototype.close=function(){return animationEffect.fadeOut(this.el,function(t){return function(){return domUtils.remove(t.el)}}(this))},e.prototype.buildElement=function(){return domUtils.createElementByHTML('<div data-eh-action="window" eh-event-close="close()" data-enabled-header="true">\n  <div class="message"></div>\n</div>')[0]},e}(View);var notification;notification=function(){var t;return t=domUtils.createElementByHTML('<div class="eh-notification-list"></div>')[0],window.addEventListener("DOMContentLoaded",function(){return document.body.appendChild(t)}),{message:function(e,n,i){var r,o;return null==i&&(i={ms:2e3}),r=new NotificationWindowView,o=domUtils.createElementByHTML('<div class="eh-notification-row"></div>')[0],r.onCreate(o),r.setMessage(e),r.setTitle(n),t.appendChild(r.el),setTimeout(function(){return r.close()},i.ms)}}}();var ScoreView,extend=function(t,e){function n(){this.constructor=t}for(var i in e)hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty;ScoreView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return extend(e,t),e.prototype.onCreate=function(t){return View.prototype.onCreate.call(this,t),this.commentWindowView=this.findViewByName("commentWindow"),this.commentView=this.findViewByName("comment"),this.onLoadData(),this.registerEvent(),this.commentWindowMaxWidth=500,domUtils.css(this.commentWindowView.el,{position:"absolute",width:this.commentWindowMaxWidth+"px",display:"none",zIndex:1}),document.addEventListener("click",function(t){return function(){return t.closeComment()}}(this))},e.prototype.TEXT_PLACEHOLDER="請留下您對此影片的意見或心得想法，以協助我們製作出更符合您學習需求的教學影片",e.prototype.onLoadData=function(){var t,e,n,i,r;return this.data_={},t=domUtils.getDataset(this.el),r=t.ehAttrUser,i=t.ehAttrType,n=t.ehAttrTarget,e=api.getComment(r,i,n,1),this.onUpdate(),e.done(function(t){return function(e){var n;return n=e&&e.result&&e.result.length?e.result[0]:{},t.data_="undefined"!=typeof n.like?{like:n.like}:{},t.syncAttrToData(),t.renderByData()}}(this))},e.prototype.onUpdate=function(){var t,e,n;return t=domUtils.getDataset(this.el),e=JSON.parse(t.ehCommentSelect||"[]"),e.length?(this.commentView.renderSelect(e),this.enabledSection=!0):this.commentView.hideSelector(),n=t.ehTextPlaceholder?t.ehTextPlaceholder:this.TEXT_PLACEHOLDER,this.commentView.setTextAreaPlaceHolder(n)},e.prototype.syncAttrToData=function(){return util.clone(this.data_,domUtils.getDataByDatasetKey(this.el,"ehAttr"))},e.prototype.setLike=function(t){return this.data_.like=t,this.putToServer(),this.fireEvent("likeChange",this.data_)},e.prototype.putToServer=function(){var t,e,n,i;return i=domUtils.getDataset(this.el),n=i.ehAttrUser,e=i.ehAttrType,t=i.ehAttrTarget,this.syncAttrToData(),api.putComment(n,e,t,this.data_)},e.prototype.getLike=function(){return this.data_.like},e.prototype.LIKE=1,e.prototype.UNLIKE=0,e.prototype.renderByData=function(){var t,e,n,i;switch(e=this.data_.like,t=this.el,n=t.querySelector(".eh-like"),i=t.querySelector(".eh-unlike"),e){case 1:return n.classList.add("active"),i.classList.remove("active");case 0:return n.classList.remove("active"),i.classList.add("active");default:return n.classList.remove("active"),i.classList.remove("active")}},e.prototype.preventDefault=function(t){return t.preventDefault()},e.prototype.onLike=function(t){return this.setLike(this.LIKE),this.renderByData(),this.showComment(t.originalElement)},e.prototype.onUnLike=function(t){return this.setLike(this.UNLIKE),this.renderByData(),this.showComment(t.originalElement)},e.prototype.onCommentSubmit=function(t){var e;return e=t.detail,this.data_.suggestion=e.text,this.enabledSection&&(this.data_.section=e.select,""===this.data_.section)?void notification.message("請選擇段落","eHanlin"):(this.closeComment(),this.putToServer(),notification.message("我們已經收到你的意見，感謝您！祝您學習愉快！","eHanlin"))},e.prototype.autoCommentResize=function(){var t,e,n;return t=document.body,e=t.clientWidth,n=t.scrollWidth<this.commentWindowMaxWidth?e:this.commentWindowMaxWidth,this.commentWindowView.width(n),n},e.prototype.autoCommentPosition=function(t){var e,n,i,r,o,s;return n=this.autoCommentResize(),r=this.height(),i=domUtils.offset(this.el),e=document.body.clientWidth,o=e-i.left-n,s={left:o>0?t.offsetLeft+5:t.offsetLeft+t.clientWidth-n-5,top:t.offsetTop+10},n<this.commentWindowMaxWidth&&(s.left=(window.innerWidth-e)/2-domUtils.offset(this.el).left),domUtils.css(this.commentWindowView.el,{left:s.left+"px",top:s.top+r+"px"})},e.prototype.showComment=function(t){return this.autoCommentPosition(t),this.commentWindowView.show()},e.prototype.closeComment=function(){return this.commentWindowView.hide()},e.prototype.stopPropagation=function(t){return t.stopPropagation()},e.prototype.buildElement=function(){return domUtils.createElementByHTML('      <div class="eh-score-view" eh-event-click="stopPropagation()">\n        <div class="eh-like eh-circle-button" eh-event-click="onLike()" eh-event-mousedown="preventDefault()">\n          <div class="like-img eh-img-btn"></div>\n          <div class="active eh-img-btn like-img-active"></div>\n</div>\n<div class="eh-unlike eh-circle-button" eh-event-click="onUnLike()" eh-event-mousedown="preventDefault()">\n          <div class="unlike-img eh-img-btn"></div>\n          <div class="active eh-img-btn unlike-img-active"></div>\n</div>\n        <div data-eh-action="commentWindow" eh-event-commentSubmit="onCommentSubmit()"></div>\n      </div>')[0]},e}(View);var viewBuilder={score:ScoreView,comment:CommentView,window:WindowView,commentWindow:CommentWindowView},XEHML=EH.XEHML={parse:function(t,e){var n=t,i=e;domUtils.isElement(t)||(n=document.body,i=t);var r=n.querySelectorAll("[data-eh-action]");domUtils.getDataset(n).ehAction&&!util.data(n,"view")&&this.renderElement_([n]),this.renderElement_(r),i&&i()},update:function(){var t=util.data(el,"view");t&&t.onUpdate&&t.onUpdate()},renderElement_:function(t){util.each(t,function(t,e){if(!util.data(e,"view")){var n=util.copyArray(e.children),i=new(viewBuilder[domUtils.getDataset(e).ehAction]);util.each(n,function(t,e){var n=e.parentNode;n&&n.removeChild(e)}),util.data(e,"view",i),i.onCreate(e);var r=e.querySelector("[data-eh-transclude]");r&&util.each(n,function(t,e){r.appendChild(e)})}})}};window.addEventListener("DOMContentLoaded",function(){EH.XEHML.parse()}),"undefined"!=typeof module&&(module.exports=EH),window.EH=EH}(window,window.module);