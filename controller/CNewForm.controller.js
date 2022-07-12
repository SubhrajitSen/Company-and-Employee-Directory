sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel", "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageBox",
    'sap/ui/model/Filter',
    'sap/base/util/deepExtend',

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Popover, JSONModel, Button, library, MessageBox, Filter, deepExtend) {
        "use strict";

        return Controller.extend("project1.controller.CNewForm", {
            onInit: function () {
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true);
                var oEmptyModel = new sap.ui.model.json.JSONModel();
               
                this.getView().byId("CustomerDetails").setModel(oEmptyModel);
                this.getView().byId("idCClausesSection").setModel(oEmptyModel);
            },
            onPreviousPage: function(){
                this.getOwnerComponent().getRouter().navTo("MainPage");
            },
            handleReset: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true);
                var oEmptyModel = new sap.ui.model.json.JSONModel();
              
                this.getView().byId("CustomerDetails").setModel(oEmptyModel);
                this.getView().byId("idCClausesSection").setModel(oEmptyModel);
               
            
            },
            handleCancelPress: function(){
                this.getOwnerComponent().getRouter().navTo("MainPage");
            },
            handleReset: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true);
                this.byId("CustomerID").getModel("AppCreateModel").refresh();
                this.byId("CustomerDetails").getModel("AppCreateModel").refresh();
                this.byId("idCClausesSection").getModel("AppCreateModel").refresh();
            },
    
            handleSave : function () {
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(true);
    
            },
            _toggleButtonsAndView : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
                oView.byId("add").setVisible(bEdit);
              
            },
           
            
        });
    });