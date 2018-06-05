sap.ui.controller("localstorage.Details", {
	onInit : function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(JSON.parse(JSON.stringify(saveDataFormat)))
		this.getView().setModel(oModel,'createModel')
	},
	navBack : function(){
		var app = sap.ui.getCore().byId('idAppContainer');
		app.back();
	},
	resetForm : function(){
		this.getView().getModel('createModel').setData(JSON.parse(JSON.stringify(saveDataFormat)));
	},
	editSave : function(){
		var editedData = this.getView().getModel().getData().editContext;
		var secureData = JSON.parse(localStorage.getItem('secureData'));
		for(var i=0; i<secureData.length;i++){
			if(secureData[i].id == editedData.id){
				secureData[i].Domain = editedData.Domain,
				secureData[i].Username = editedData.Username,
				secureData[i].Password = editedData.Password,
				secureData[i].Description = editedData.Description,
				secureData[i].Date = new Date().toString().split('GMT')[0],
				secureData[i].Device = JSON.stringify(sap.ui.Device)
				break;
			}
		}
		this.navBack();
		localStorage.setItem('secureData',JSON.stringify(secureData));
		this.refreshModelFromLocalStore();
		sap.ui.getCore().byId('idHome').getController().onInit();
	},
	refreshModelFromLocalStore : function(){
		var secureData = JSON.parse(localStorage.getItem('secureData'));
		var app = sap.ui.getCore().byId('idAppContainer');
		app.getModel().setData({'secureData':''},true);
		app.getModel().setData({'secureData':secureData},true);
	},
	toggleEditMode : function(){
		var editMode = this.getView().getModel().getData().editMode;
		this.getView().getModel().setData({editMode:!editMode},true);
		var resetData = this.getView().getModel().getData().contextObjectReset;
		this.getView().getModel().setData({editContext:resetData},true)
	},
	
	deleteEntry : function(){
		var id  = this.getView().getModel().getData().editContext.id;
		var secureData = JSON.parse(localStorage.getItem('secureData'));
		for(var i=0; i<secureData.length;i++){
			if(secureData[i].id == id){
				secureData.splice(i,1);
				break;
			}
		}
		this.navBack();
		localStorage.setItem('secureData',JSON.stringify(secureData));
		this.refreshModelFromLocalStore();
	},
	onApproveDialog: function () {
		var that = this;
		var dialog = new sap.m.Dialog({
			title: 'Confirm',
			type: 'Message',
			content: new sap.m.Text({ text: 'Are you sure you want to delete the selected credentials?' }),
			beginButton: new sap.m.Button({
				text: 'Yes',
				press: function () {
					that.deleteEntry();
					sap.m.MessageToast.show('Entry deleted!');
					dialog.close();
				}
			}),
			endButton: new sap.m.Button({
				text: 'Cancel',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});

		dialog.open();
	},
	
});