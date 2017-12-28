sap.ui.define([
	"ygsd/controller/BaseController"
], function(Controller) {
	"use strict";

	return Controller.extend("ygsd.controller.logon", {

		onInit: function() {
			this.logonData = {
				name: "",
				password: ""
			};
			var oDevide = this.getDeviceModel();
			if (oDevide.getData().system.phone) {
				this.getView().byId("welcome").addStyleClass("welcomePhone");
				this.getView().byId("logonPanel").addStyleClass("loginStylePhone");
			} else if (oDevide.getData().system.desktop) {
				this.getView().byId("welcome").addStyleClass("welcomePC");
				this.getView().byId("logonPanel").addStyleClass("loginStylePC");
			} else {
				this.getView().byId("welcome").addStyleClass("welcome");
				this.getView().byId("logonPanel").addStyleClass("loginStyle");
			}

		},

		onPassWordChange: function(oEvt) {
			this.logonData.password = oEvt.getSource().getValue();

		},

		onNameChange: function(oEvt) {
			this.logonData.name = oEvt.getSource().getValue();
		},

		onConfirm: function() {
			var that = this;
			var allowLogin = false;
			if (this.logonData.name === "") {
				this.showMessage("请输入用户名", "error");
				allowLogin = false;
			} else if (this.logonData.password === "") {
				this.showMessage("请输入密码", "error");
				allowLogin = false;
			} else {
				allowLogin = true;
			}

			var fnCallBack = function(result) {
				if (result.messageCode === "1") {
					that.showMessage(result.message, "error");
				} else {
					that.getRouter().navTo("home", {
						userId: result.userId
					}, false);
				}

			};

			if (allowLogin) {
				that.getRouter().navTo("home", {
						userId: "result.userId"
					}, false);
			//	this.callService("/web/login", "POST", this.logonData, fnCallBack);
			}
		}
	});

});