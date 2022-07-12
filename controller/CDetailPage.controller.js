sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel", "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library", 
    "sap/m/MessageBox",
     'sap/base/util/deepExtend',
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,  Popover, JSONModel, Button, library, MessageBox, deepExtend) {
        "use strict";

        return Controller.extend("project1.controller.CDetailPage", {
            onInit: function (oEvent) {
               
         
           
                var oRouter = this.getOwnerComponent().getRouter();
			    oRouter.getRoute("CDetailPage").attachPatternMatched(this.onPatternMatched, this);
            },
            onPatternMatched: function(oEvent){
                var that = this;
                var sData1 = oEvent.getParameter("arguments").ID1;
                var oDataModel = this.getOwnerComponent().getModel("oDataModel");
                oDataModel.read("/Customers('" + sData1 + "')", {
                    success: function (output) {
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(output)
                        that.getView().byId("CustomerID").setModel(oModel1);
                        that.getView().byId("CustomerDetails").setModel(oModel1);
                        that.getView().byId("idCClausesSection").setModel(oModel1);
                        // that.byId("SimpleFormChange353").getModel().refresh();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        
                    }
                });
              
            },
            onPreviousPage: function(){
                this.getOwnerComponent().getRouter().navTo("MainPage");
            },
            handleEditPress : function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true);
                this._toggleButtonsAndView(true);
            },
            handleCancel : function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);
    
            },
            handleReset: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                
                this.byId("CustomerID").getModel("AppCreateModel").refresh();
                this.byId("CustomerDetails").getModel("AppCreateModel").refresh();
                this.byId("idCClausesSection").getModel("AppCreateModel").refresh();
            },
            handleSave : function () {
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);
    
            },
            _toggleButtonsAndView : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
                oView.byId("add").setVisible(bEdit);
              
            },
            handleAdd: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true);
                var oEmptyModel = new sap.ui.model.json.JSONModel();
                this.getView().byId("CustomerID").setModel(oEmptyModel);
                this.getView().byId("CustomerDetails").setModel(oEmptyModel);
                this.getView().byId("idCClausesSection").setModel(oEmptyModel);
            } 
            
          
        });
    });