var savedTitle=document.title;var hiddenProperty="hidden"in document?"hidden":"webkitHidden"in document?"webkitHidden":"mozHidden"in document?"mozHidden":null;var visibilityChangeEvent=hiddenProperty.replace(/hidden/i,"visibilitychange");var onVisibilityChange=function(){if(!document[hiddenProperty]){document.title="(/≧▽≦/)咦！又好了！";setTimeout(function(){document.title=savedTitle},500)}else{document.title="(●—●)喔哟，崩溃啦！"}};document.addEventListener(visibilityChangeEvent,onVisibilityChange);function checkIFrame1(){return window.frameElement&&window.frameElement.tagName==="IFRAME"}function checkIFrame2(){return window.parent!==window||window.frames.length>0}function checkIFrame3(){return window!==window.top}setTimeout(()=>{console.log(checkIFrame1(),checkIFrame2(),checkIFrame3());if(checkIFrame3()){var e=document.createElement("div");e.innerHTML="本网站是套壳网站，请认准真实域名：https://xieyufei.com";e.style="position:fixed;width: 100vw;height: 100vh;left:0;top:0;background:#fff;color:#333;font-size: 30px;font-weight: bolder;z-index: 9999999999 !important;line-height: 100vh;text-align: center;";document.body.appendChild(e);var i=document.getElementsByTagName("main");if(i&&i.length){i[0].remove()}}},1200);