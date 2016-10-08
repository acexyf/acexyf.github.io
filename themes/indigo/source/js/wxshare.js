var ImgSrc, DescInfo, dataForWeixin, href, tit;


var $ = function(id) {
    return document.getElementById(id);
};

function loaded() {
	href = $("[name=tcshareurl]").val() || '//xieyufei.com';
	ImgSrc = $("[name=tcshareimg]").val() || $(".container img")[0].src || '//xieyufei.com/img/head.png';
	DescInfo = $("[name=tcDesc]").val() || '谢小飞的博客';	
	tit = $("[name=tcsharetext]").val() || '谢小飞的博客';

	dataForWeixin = {
		appId: "",
		MsgImg: "",
		TLImg: ImgSrc,
		url: href,
		title: tit,
		desc: DescInfo,
		fakeid: "",
		callback: function() {}
	}
}(function() {
	var a = function() {
			WeixinJSBridge.on("menu:share:timeline", function(b) {
				loaded();
				(dataForWeixin.callback)();
				WeixinJSBridge.invoke("shareTimeline", {
					img_url: dataForWeixin.TLImg,
					img_width: "120",
					img_height: "120",
					link: dataForWeixin.url,
					desc: dataForWeixin.desc,
					title: dataForWeixin.title
				}, function(c) {})
			});
			WeixinJSBridge.on("menu:share:appmessage", function(b) {
				loaded();
				WeixinJSBridge.invoke("sendAppMessage", {
					img_url: dataForWeixin.TLImg,
					img_width: "120",
					img_height: "120",
					link: dataForWeixin.url,
					desc: dataForWeixin.desc,
					title: dataForWeixin.title
				}, function(c) {})
			});
			WeixinJSBridge.on("menu:share:weibo", function(b) {
				loaded();
				WeixinJSBridge.invoke("shareWeibo", {
					content: dataForWeixin.desc,
					img_url: dataForWeixin.TLImg,
					img_width: "120",
					img_height: "120",
					desc: dataForWeixin.desc,
					url: dataForWeixin.url,
					title: dataForWeixin.title
				}, function(c) {
					(dataForWeixin.callback)()
				})
			})
		};
	if (document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", a, false)
	} else {
		if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", a);
			document.attachEvent("onWeixinJSBridgeReady", a)
		}
	}
})();