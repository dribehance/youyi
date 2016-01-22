// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("platformServices", function($window, $timeout) {
	return {
		getUrl: function() {
			if (this.browser.android()) {
				return {
					url: "http://www.wandoujia.com/apps/com.quark.youyi",
					scheme: "android scheme for open app"
				}
			}
			if (this.browser.ios()) {
				return {
					url: "https://appsto.re/cn/QpER-.i",
					scheme: "youyiurl://"
				}
			}
		},
		browser: {
			android: function() {
				return /Android/i.test(navigator.userAgent);
			},
			ios: function() {
				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
			}
		},
		download: function() {
			var self = this;
			if (this.browser.ios()) {
				$window.location.replace(self.getUrl().scheme);
				$timeout(function() {
					$window.location.replace(self.getUrl().url);
				}, 1000)
			}
			if (this.browser.android()) {
				$window.location.href = this.getUrl().url;
			}
		}
	}
});