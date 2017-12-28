sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("ygsd.controller.BaseController", {

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		getDeviceModel: function() {
			return this.getOwnerComponent().getModel("device");
		},

		getServiceUrl: function() {
			return "https://testc4cwc.duapp.com";
		},

		getAccessInfo :function(){
			return this.getOwnerComponent().getAppData().accessInfo;
		},

		callService: function(sPath, method, postData, callBack,errorCallback) {
			var url = this.getServiceUrl() + sPath;

			$.ajax({
				url: url,
				type: method,
				data: postData,
				success: callBack,
				error: errorCallback
			});
		},

		showMessage: function(sMessage, Type) {
			jQuery.sap.require("sap.m.MessageBox");
			switch (Type) {
				case "error":
					sap.m.MessageBox.error(sMessage, {
						title: "错误", // default
						onClose: null, // default
						textDirection: sap.ui.core.TextDirection.Inherit // default
					});
					break;
				case "warnning":
					sap.m.MessageBox.warning(sMessage, {
						title: "警告", // default
						onClose: null, // default
						textDirection: sap.ui.core.TextDirection.Inherit // default
					});
					break;
				default:
					sap.m.MessageToast.show(sMessage, {
						duration: 3000, // default
						width: "15em", // default
						my: "center bottom", // default
						at: "center bottom", // default
						of: window, // default
						offset: "0 0", // default
						collision: "fit fit", // default
						onClose: null, // default
						autoClose: true, // default
						animationTimingFunction: "ease", // default
						animationDuration: 1000, // default
						closeOnBrowserNavigation: true // default
					});
			}
		},

		navBack: function() {
			var oRouter = this.getRouter();

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
				return;
			} else {
				oRouter.navTo("home", true);
			}
		}
	});
});
