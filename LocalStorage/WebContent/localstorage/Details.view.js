sap.ui.jsview("localstorage.Details", {

	getControllerName : function() {
		return "localstorage.Details";
	},

	createContent : function(oController) {
 		return new sap.m.Page({
 			showNavButton : true,
 			navButtonPress : [oController.navBack],
			title: "View & Edit Details",
			content: [
			          	this.createEditableFormContent(oController),
			          	this.createDisplayFormContent(oController)
			],
			footer : this.createFooter(oController)
		});
	},
	createFooter : function(oController){
		var oOverflowToolbar = new sap.m.OverflowToolbar({
			content : [	
			            new sap.m.ToolbarSpacer(),
			            new sap.m.Button({
			            	visible : '{/editMode}',
			           		icon : 'sap-icon://save',
			           		press : [oController.editSave,oController]
			           	}),
			           	new sap.m.Button({
			           		visible : '{/editMode}',
			           		icon:'sap-icon://decline',
			           		press : [oController.toggleEditMode,oController]
			           	}),
			           	new sap.m.Button({
			           		visible : '{= !${/editMode}}',
			           		icon:'sap-icon://delete',
			           		press : [oController.onApproveDialog,oController]
			           	}),
			           	new sap.m.Button({
			           		visible : '{= !${/editMode}}',
			           		icon:'sap-icon://edit',
			           		press : [oController.toggleEditMode,oController]
			           	}),
			           ]
		});
		return oOverflowToolbar;
	},
	createEditableFormContent : function(){
		return new sap.m.VBox({
			visible : '{/editMode}',
			items : [
	         	new sap.m.Input({placeholder:'Domain',value:'{/editContext/Domain}'}),
	         	new sap.m.Input({placeholder:'Username',value:'{/editContext/Username}'}),
	         	new sap.m.Input({placeholder:'Password',value:'{/editContext/Password}'}),
	         	new sap.m.TextArea({placeholder:'Description',value:'{/editContext/Description}',cols:50,growing:true}),
         	]
		})
	},
	createDisplayFormContent : function(){
		return new sap.m.VBox({
			visible : '{= !${/editMode}}',
			alignItems : 'Center',
			items : [
				new sap.m.Label({text:'Domain  :  {/editContext/Domain}'}),
				new sap.m.Label({text:'Username  :  {/editContext/Username}'}),
				new sap.m.Label({text:'Password  :  {/editContext/Password}'}),
				new sap.m.Label({wrapping:true,text:'{/editContext/Description}'}).addStyleClass('sapUiLargeMarginTop'),
			]
		}).addStyleClass('sapUiLargeMarginTop');
	}

});