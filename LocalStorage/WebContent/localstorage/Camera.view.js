sap.ui.jsview("localstorage.Camera", {

	getControllerName : function() {
		return "localstorage.Camera";
	},

	createContent : function(oController) {
 		return new sap.m.Page({
 			showNavButton : true,
 			navButtonPress : [oController.navBack],
			title: "Open Files",
			content: [
	          	this.createCameraStreamContainer(oController),
	          	this.createImageViewer(oController)
            ],
			footer : this.createFooter(oController)
		});
	},
	createCameraStreamContainer : function(){
		return new sap.ui.core.HTML({
			content : '<input type="file" accept="image/x-png,image/gif,image/jpeg" id="idFileUpload" style="position:absolute; top:-100px;">'
		})
	},
	createFooter : function(oController){
		return new sap.m.Toolbar({
			content : [			
			           			new sap.m.ToolbarSpacer(),
			                 	new sap.m.Button({
			                 		icon : 'sap-icon://add',
			                 		press : [oController.openFile,oController]
			                 	}),
			                 	new sap.m.ToolbarSpacer(),
			                 ]
		})
	},
	createImageViewer : function(oController){
		return new sap.m.VBox({
			items : {
				path : '/aImages',
				template : new sap.m.Image({
					src : '{src}',
					width : '100%'
				})
			}
		})
	}

});