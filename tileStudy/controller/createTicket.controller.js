sap.ui.define([
	"ygsd/controller/BaseController",
	'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("ygsd.controller.createTicket", {

			onInit: function() {
				this.accountModel = new JSONModel({
					"text":"",
				},true);
				var that = this;
				this.getView().byId("createForm").setModel(this.accountModel,"ticket");
				this.getView().byId("createForm").bindElement("ticket>/");
			},

			onSubmit :function(){
				var oTicket = {};
				oTicket = this.accountModel.getData();
				oTicket.wxOpenId = this.getAccessInfo().openid;
				oTicket.entity = "ticket";
				this.getView().setBusy(true);
				this.callService("/create","POST",oTicket,jQuery.proxy(this.submitSuccess,this),jQuery.proxy(this.submitError,this));
			},

			submitSuccess:function(result){
				this.getView().setBusy(false);
				this.showMessage("创建成功");
				this.navBack();
			},

			submitError:function(result){
				this.getView().setBusy(false);
				this.showMessage(result,"error");
			},

			onCancel :function(){
				this.navBack();
			},
	});

});
