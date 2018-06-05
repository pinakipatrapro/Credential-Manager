sap.ui.jsview("localstorage.Home", {

	getControllerName : function() {
		return "localstorage.Home";
	},

	createContent : function(oController) {
 		return new sap.m.Page({
			title: "Password Manager",
			content: [
			          	this.createListContent(oController)
			],
			footer : this.createFooter(oController)
		});
	},
	createFooter : function(oController){
		var oOverflowToolbar = new sap.m.OverflowToolbar({
			content : [	
//			           	new sap.m.Button({
//			           		icon:'sap-icon://download',
//			           		press : [oController.download,oController]
//			           	}),
			            new sap.m.ToolbarSpacer(),
			           	new sap.m.Button({
			           		text : 'Create Entry',
			           		icon:'sap-icon://add',
			           		press : [oController.navToAddPasswordPage,oController]
			           	})
			           ]
		});
		return oOverflowToolbar;
	},
	createListContent : function(oController){
		return new sap.m.List({
			headerToolbar : this.createlistHeaderToolbar(oController),
			items : {
				path : '/secureData',
				template : new sap.m.NotificationListItem({
					title : '{Domain}',
					authorName :'Username : {Username}',
					description : ' Password : {Password}   \n Description : {Description}',
					showCloseButton : false,
					datetime:'{Date}',
					press : [oController.pressToNavigate,oController]
				})
			}
		})
	},
	createlistHeaderToolbar : function(oController){
		var oToolbar = new sap.m.Toolbar({
			content : [	
			            new sap.m.SearchField({
			            	width:'90%',
			            	liveChange : [oController.search,oController]
			            }),
			           	
			           ]
		});
		return oToolbar; 
	}

});