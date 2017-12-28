sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("jerryTile.controller.BaseController", {

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		getDeviceModel: function() {
			return this.getOwnerComponent().getModel("device");
		},
		getServiceUrl: function() {
			return "https://www.sap.com";
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
