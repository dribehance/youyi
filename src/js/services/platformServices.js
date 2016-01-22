// by dribehance <dribehance.kksdapp.com>
angular.module("Youyi").factory("platformServices", function($window, $rootScope, $timeout) {
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
			return {
				url: "http://uelives.com",
				scheme: "http://uelives.com"
			}
		},
		browser: {
			android: function() {
				return /Android/i.test(navigator.userAgent);
			},
			ios: function() {
				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
			},
			wx_browser: function() {
				return /micromessenger/i.test(navigator.userAgent);
			}
		},
		download: function() {
			var self = this;
			if (self.browser.ios()) {
				$window.location.replace(self.getUrl().scheme);
				$timeout(function() {
					$window.location.replace(self.getUrl().url);
				}, 1000)
				if (self.browser.wx_browser()) {
					$rootScope.download_tip = true;
					$timeout(function() {
						$rootScope.download_tip = false;
					}, 3000)
				}
				return;
			}
			if (this.browser.android()) {
				$window.location.href = this.getUrl().url;
				return;
			}
			$window.location.href = this.getUrl().url;
		}
	}
});