sap.ui.define([
  "fiori_cap/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("fiori_cap.controller.MainView", {

    onInit: function(){
        var jsonModelObj = {
          books: []
        };
  
        const jsonModel = new JSONModel(jsonModelObj);
  
        this.getView().setModel(jsonModel, 'viewModel');
        
      },
  
      onBooks: function(){
        const oView = this.getView();
        const apiModel = oView.getModel("api");
        const viewModel = oView.getModel("viewModel");
        const i18n = oView.getModel("i18n");

        apiModel.read("/Books", {
          success: (resp) => {
            viewModel.setProperty("/books", resp.results);
          },
          error: (error) => {
            console.error(error);
            MessageToast.show(i18n.getProperty("errorGetData"), {});
          }
        })
      },
  
      onBooks2(){
        const oView = this.getView();
        const viewModel = oView.getModel("viewModel");
        const i18n = oView.getModel("i18n");
        const urlBase = sap.ui.require.toUrl("fiori_cap");
        
        $.ajax({
          url: urlBase + "/api/Books",
          type: "GET",
          contentType: "application/json",
          success: function(resp){
            viewModel.setProperty("/books", resp.d.results);
          },
          error: function(err){
            console.error(err);
            MessageToast.show(i18n.getProperty("errorGetData"), {});
          }
        })
      }

  });
});
