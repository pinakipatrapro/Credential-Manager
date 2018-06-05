sap.ui.controller("localstorage.Camera", {
	onInit : function(){

	},
	navBack : function(){
		var app = sap.ui.getCore().byId('idAppContainer');
		app.back();
	},
	openFile : function(that){
		var that  = this;
		$("#idFileUpload").click();
		$("#idFileUpload").on("change", function(){
			that.getBaseUrl();
		})
	},
	getBaseUrl :function()  {
		var model = this.getView().getModel();
		setTimeout(function(){
			var files    = document.getElementById('idFileUpload').files[0];
			if(model.getData().aImages){
				var aImages = model.getData().aImages;
			}else{
				var aImages = [];
			}
			var reader = new FileReader();
			if(typeof(files) == 'undefined'){
				return;
			}
			reader.readAsDataURL(files);
			reader.onload = function (e) {
				aImages.push({src:reader.result});
				model.setData({aImages : aImages},false	);
				$('input[type="file"]').val(null);
			}
		})
	}
});