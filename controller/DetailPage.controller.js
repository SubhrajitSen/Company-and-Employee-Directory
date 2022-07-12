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
    function (Controller, MessageToast, Popover, JSONModel, Button, library, MessageBox, deepExtend) {
        "use strict";

        return Controller.extend("project1.controller.DetailPage", {
            onInit: function (oEvent) {
                // Calling the router to advance navigation to next page
                var oRouter = this.getOwnerComponent().getRouter();
                // Attaching the data selected in the last page to be displayed in the given oage
                oRouter.getRoute("DetailPage").attachPatternMatched(this.onPatternMatched, this);
                oRouter.getRoute("DetailPage").attachPatternMatched(this.handleAdd, this);
            },
            onPatternMatched: function (oEvent) {
                var that = this;
                // Creating oEvent to get the data and display it in this page on click on the row of last page 
                var sData = oEvent.getParameter("arguments").ID;
                // To define the backend model and store it in a variable which will help in CRUD operations
                var oDataModel = this.getOwnerComponent().getModel("oDataModel");
                // To read the data from backend and calling it with entity type to get the output 
                oDataModel.read("/Employees(" + sData + ")", {
                    // creating a object results where the only data input needed for the user will be stored
                    success: function (results) {
                        var oModel = new sap.ui.model.json.JSONModel();
                        // Creating a model for the object and setting it to a model
                        oModel.setData(results)
                        // Bindign the model to the simple form so it can be displayed and read by the user
                        that.getView().byId("EmployeeDetails").setModel(oModel);
                        that.getView().byId("EmployeeID").setModel(oModel);
                        that.getView().byId("idCClausesSection").setModel(oModel);
                        // that.byId("SimpleFormChange353").getModel().refresh();

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
                // Credential Management Service Binding
                // var oCredential;
                // oCredential = this.byId("SimpleFormChange353");
                // oCredential.setModel(oCredentialModel);
                // oCredential.setBindingPath("/Employees/" + sData);

                // var oTableData = JSON.parse(sData.Employees);
                // var jModel = new JSONModel(oTableData);
                // this.getView().setModel(jModel);
            },
            onPreviousPage: function () {
                // To navigate to previous page through a button this function is called
                this.getOwnerComponent().getRouter().navTo("MainPage");
            },
            handleEditPress: function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true)
                this._toggleButtonsAndView(true);
            },
            handleCancel: function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);

            },

            handleSave: function () {
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);

            },
            handleReset: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                
                this.byId("EmployeeDetails").getModel("AppCreateModel").refresh();
                this.byId("EmployeeID").getModel("AppCreateModel").refresh();
                this.byId("idCClausesSection").getModel("AppCreateModel").refresh();
            },
            _toggleButtonsAndView: function (bEdit) {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
                oView.byId("reset").setVisible(bEdit);


            },

            getViewSettingsDialog: function (sDialogFragmentName) {
                var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {

                        oDialog.addStyleClass("sapUiSizeCompact");

                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },
            handleAdd: function () {
               
            }



        });
    });
