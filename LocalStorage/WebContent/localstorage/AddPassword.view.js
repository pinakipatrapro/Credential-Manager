sap.ui.jsview("localstorage.AddPassword", {

	getControllerName : function() {
		return "localstorage.AddPassword";
	},

	createContent : function(oController) {
 		return new sap.m.Page({
 			showNavButton : true,
 			navButtonPress : [oController.navBack],
			title: "Create New Password",
			content: [
			          	this.createFormContent(oController)
			],
			footer : this.createFooter(oController)
		});
	},
	createFooter : function(oController){
		var oOverflowToolbar = new sap.m.OverflowToolbar({
			content : [	
			           	new sap.m.Button({
			           		text:'Reset',
			           		icon : 'sap-icon://reset',
			           		press : [oController.resetForm,oController]
			           	}),
			            new sap.m.ToolbarSpacer(),
//			           	new sap.m.Button({
//			           		text:'Open',
//			           		icon:'sap-icon://open-folder',
//			           		press : [oController.navToCamera,oController]
//			           	}),
			           	new sap.m.Button({
			           		text:'Cancel',
			           		icon:'sap-icon://decline',
			           		press : [oController.navBack]
			           	}),
			           	new sap.m.Button({
			           		text:'Save',
			           		icon:'sap-icon://save',
			           		press : [oController.save,oController]
			           	}),
			           ]
		});
		return oOverflowToolbar;
	},
	createFormContent : function(){
		return new sap.m.VBox({
			items : [
			         	new sap.m.Input({placeholder:'Domain',value:'{createModel>/domain}',
			         		showSuggestion : true,
			         		suggestionItems : {
			         			path : '/uniqueDomains',
			         			template : new sap.ui.core.Item({
			         				text : '{name}'
			         			})
			         		}
			         	}),
			         	new sap.m.Input({placeholder:'Username',value:'{createModel>/uname}',
			         		showSuggestion : true,
			         		suggestionItems : {
			         			path : '/uniqueUsernames',
			         			template : new sap.ui.core.Item({
			         				text : '{name}'
			         			})
			         		}
			         	}),
			         	new sap.m.Input({placeholder:'Password',value:'{createModel>/pwd}'}),
			         	new sap.m.TextArea({placeholder:'Description',value:'{createModel>/desc}',cols:50,growing:true}),
			         ]
		})
	}

});