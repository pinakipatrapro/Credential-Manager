var saveDataFormat = {
	domain : '',
	uname : '',
	pwd : '',
	desc : ''
};
sap.ui.controller("localstorage.AddPassword", {
	onInit : function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(JSON.parse(JSON.stringify(saveDataFormat)))
		this.getView().setModel(oModel,'createModel')
	},
	navBack : function(){
		var app = sap.ui.getCore().byId('idAppContainer');
		app.back();
	},
	navToCamera : function(){
		var app = sap.ui.getCore().byId('idAppContainer');
		app.to('idCamera');
		app.setModel(this.getView().getModel('createModel'));
	},
	resetForm : function(){
		this.getView().getModel('createModel').setData(JSON.parse(JSON.stringify(saveDataFormat)));
	},
	save : function(){
		//Prep data save
		var data = this.getView().getModel('createModel').getData();
		var dataToBeSaved = {
			Domain : data.domain,
			Username : data.uname,
			Password : data.pwd,
			Description : data.desc,
			Date : new Date().toString().split('GMT')[0],
			Device : JSON.stringify(sap.ui.Device)
		}
//		Get saved data
		var secureData = localStorage.getItem('secureData');
		dataToBeSaved.id = 1;
		if(secureData == null){
			secureData = [dataToBeSaved];
			localStorage.setItem('secureData',JSON.stringify(secureData))
		}else{
			var id = 0;
			var secureData = JSON.parse(secureData);
			secureData.forEach(function(dataObject){
				if(dataObject.id > id){
					id = dataObject.id;
				}
			});
			id = id +1;
			dataToBeSaved.id = id; 
			secureData.push(dataToBeSaved);
			localStorage.setItem('secureData',JSON.stringify(secureData))
		}
		this.refreshModelFromLocalStore();
		this.resetForm();
		this.navBack();
		sap.ui.getCore().byId('idHome').getController().onInit();
	},
	refreshModelFromLocalStore : function(){
		var secureData = JSON.parse(localStorage.getItem('secureData'));
		var app = sap.ui.getCore().byId('idAppContainer');
		app.getModel().setData({'secureData':secureData},true);
	},
	
});