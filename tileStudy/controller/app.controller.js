sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ygsd.controller.app", {

			onInit: function() {
				/* implemented in component.js: 

				getAppData: function(){
					return this.AppData;
				}
				*/
			this.appdata = this.getOwnerComponent().getAppData();
			this.WXCode = this.getWXCode();
			var that = this;
			// get access token
			$.ajax({ url: "https://testc4cwc.duapp.com/getWXWebToken",
							 type:"POST",
							 data:{
								 "code":this.WXCode
							 },
							 success: function(data){
									that.appdata.accessInfo = data;
								},
							error:function( XMLHttpRequest, textStatus, errorThrown){

								}
							});
		},

		 getWXCode: function(){
		 	//用返回的code去拿token
			return window.location.search.substr(1).split("&state")[0].split("code=")[1];

		}
	});
});
