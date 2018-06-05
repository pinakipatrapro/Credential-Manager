sap.ui.controller("localstorage.Home", {
	onInit : function(){
		var oModel = new sap.ui.model.json.JSONModel();
		var secureData = JSON.parse(localStorage.getItem('secureData'));
		oModel.setData({'secureData':secureData});
		if(secureData){
			this.buildSuggestionItem(secureData,oModel);
		};
		var app = sap.ui.getCore().byId('idAppContainer');
		app.setModel(oModel)
	},
	navToAddPasswordPage : function(){
		var app = sap.ui.getCore().byId('idAppContainer');
		app.to('idAddPassword','slide');
	},
	download : function(){
		var jsonData = JSON.parse(localStorage.getItem('secureData'));
	    let dataStr = JSON.stringify(jsonData);
	    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
	    
	    let exportFileDefaultName = 'data.json';
	    
	    let linkElement = document.createElement('a');
	    linkElement.setAttribute('href', dataUri);
	    linkElement.setAttribute('download', exportFileDefaultName);
	    linkElement.click();
	},
	pressToNavigate : function(oEvent){
		var contextObject = oEvent.getSource().getBindingContext().getObject();
		var app = sap.ui.getCore().byId('idAppContainer');
		app.to('idDetails','slide');
		this.getView().getModel().setData({editContext:contextObject},true)
		this.getView().getModel().setData({contextObjectReset:contextObject},true)
		this.getView().getModel().setData({editMode:false},true)
		
	},
	search : function(oEvent){
		var binding = oEvent.getSource().getParent().getParent().getBinding('items');
		var value = oEvent.getParameter('newValue');
		var aFilters = [
            new sap.ui.model.Filter('Domain',sap.ui.model.FilterOperator.Contains,value),
            new sap.ui.model.Filter('Username',sap.ui.model.FilterOperator.Contains,value),
            new sap.ui.model.Filter('Password',sap.ui.model.FilterOperator.Contains,value),
            new sap.ui.model.Filter('Description',sap.ui.model.FilterOperator.Contains,value),
            new sap.ui.model.Filter('Date',sap.ui.model.FilterOperator.Contains,value)
        ]
		var filter = new sap.ui.model.Filter(aFilters,false);
		binding.filter(filter);
	},
	buildSuggestionItem : function(secureData,oModel){
		var uniqueDomains= $.unique(secureData.map(function (d) {return {'name':d.Domain};}));
		oModel.setData({'uniqueDomains':uniqueDomains},true);
		var uniqueUsernames= $.unique(secureData.map(function (d) {return {'name':d.Username};}));
		oModel.setData({'uniqueUsernames':uniqueUsernames},true);
	},
	JSONToCSVConvertor :function(e,r,a){var t="object"!=typeof e?JSON.parse(e):e,n="";if(n+=r+"\r\n\n",a){var o="";for(var i in t[0])o+=i+",";n+=(o=o.slice(0,-1))+"\r\n"}for(var c=0;c<t.length;c++){o="";for(var i in t[c])o+='"'+t[c][i]+'",';o.slice(0,o.length-1),n+=o+"\r\n"}if(""!=n){var d="MyReport_";d+=r.replace(/ /g,"_");var l="data:text/csv;charset=utf-8,"+escape(n),v=document.createElement("a");v.href=l,v.style="visibility:hidden",v.download=d+".csv",document.body.appendChild(v),v.click(),document.body.removeChild(v)}else alert("Invalid data")}
});