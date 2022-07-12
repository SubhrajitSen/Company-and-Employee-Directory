sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel", "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageBox",
    'sap/ui/model/Filter',
    'sap/base/util/deepExtend',
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Popover, JSONModel, Button, library, MessageBox, Filter, deepExtend, Fragment) {
        "use strict";

        return Controller.extend("project1.controller.MainPage", {
            onInit: function () {
                // Here the data from backend model is stored
                var oCredentialModel = this.getOwnerComponent().getModel("oDataModel");
                // Credential Management Service Binding
                var oCredentialTable;
                // Calling the created model to the table and binding it with it'sid
                oCredentialTable = this.byId("smartidFilterBar");
                // Setting the model 
                oCredentialTable.setModel(oCredentialModel);
                // Binding the table with entity set name given in smart table
                oCredentialTable.setTableBindingPath("/Employees");
                oCredentialTable.setRequestAtLeastFields("EmployeeID");
                oCredentialTable.rebindTable();
                var oCredentialModel1 = this.getOwnerComponent().getModel("oDataModel");
                var oCredentialTable1;
                oCredentialTable1 = this.byId("smartidlabelManagement1");
                oCredentialTable1.setModel(oCredentialModel1);
                oCredentialTable1.setTableBindingPath("/Customers");
                oCredentialTable1.setRequestAtLeastFields("CustomerID");
                oCredentialTable1.rebindTable();
                //For Analytics page
                var results = [];
                results.push({ "SET_NAME": "Germany", "ATTEMPTS": 10 });
                results.push({ "SET_NAME": "France", "ATTEMPTS": 11 });
                results.push({ "SET_NAME": "Italy", "ATTEMPTS": 2 });
                results.push({ "SET_NAME": "Mexico", "ATTEMPTS": 5 });
                results.push({ "SET_NAME": "USA", "ATTEMPTS": 13 });
                results.push({ "SET_NAME": "UK", "ATTEMPTS": 7 });
                results.push({ "SET_NAME": "Sweden", "ATTEMPTS": 2 });
                results.push({ "SET_NAME": "Spain", "ATTEMPTS": 5 });
                results.push({ "SET_NAME": "Canada", "ATTEMPTS": 3 });
                results.push({ "SET_NAME": "Argentina", "ATTEMPTS": 3 });
                results.push({ "SET_NAME": "Switzerland", "ATTEMPTS": 2 });
                results.push({ "SET_NAME": "Brazil", "ATTEMPTS": 8 });
                results.push({ "SET_NAME": "Austria", "ATTEMPTS": 2 });
                results.push({ "SET_NAME": "Portugal", "ATTEMPTS": 1 });
                results.push({ "SET_NAME": "Venezuela", "ATTEMPTS": 4 });
                results.push({ "SET_NAME": "Ireland", "ATTEMPTS": 1 });
                results.push({ "SET_NAME": "Belgium", "ATTEMPTS": 2});
                results.push({ "SET_NAME": "Norway", "ATTEMPTS": 1 });
                results.push({ "SET_NAME": "Denmark", "ATTEMPTS": 2 });
                results.push({ "SET_NAME": "Finland", "ATTEMPTS": 3 });
                results.push({ "SET_NAME": "Poland", "ATTEMPTS": 1 });
                var t = new sap.ui.model.json.JSONModel({ results: results });
                this.getView().setModel(t, "samplepiejson");
            },
            onEmployees: function () {
                // Getting the view with the id for navigation within the page and again calling it by page id
                this.getView().byId("navCon").to(this.getView().byId("p_Employees"));

            },
            onCustomers: function () {
                this.getView().byId("navCon").to(this.getView().byId("p_Customers"));
            },
            onAnalytics: function () {
                this.getView().byId("navCon").to(this.getView().byId("p_Analytics"));
            },
            onCollapseExpandPress: function () {
                // Side navigation is defined to expand the page to show and hide the navigationListItem for the client
                var oSideNavigation = this.getView().byId('sideNavigation');
                // Expansion of navigationListItem to direct the user 
                var bExpanded = oSideNavigation.getExpanded();
                oSideNavigation.setExpanded(!bExpanded);
                var viewId = this.getView().getId();
                var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
                toolPage.setSideExpanded(!toolPage.getSideExpanded());
            },
            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                var bSideExpanded = oToolPage.getSideExpanded();

                this._setToggleButtonTooltip(bSideExpanded);

                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },
            onRowPress: function (oEvent) {
                // Binding the data selected in ComboBox with table id and defining it with a variable
                var sPath = this.byId("tableID").getSelectedItems()[0].getBindingContextPath();
                // To get the data from the table and getting the property binded with the table
                var data = this.getOwnerComponent().getModel("oDataModel").getProperty(sPath);

                // To navigate to next page the router is defined
                var oRouter = this.getOwnerComponent().getRouter();
                // Next page route name is defined and with parameter name given in manifest with pattern of next page
                oRouter.navTo("DetailPage", {
                    "ID": data.EmployeeID,


                });




            },
            onSelectedRow: function (oEvent) {
                var sPath1 = this.byId("tableID1").getSelectedItems()[0].getBindingContextPath();

                var data1 = this.getOwnerComponent().getModel("oDataModel").getProperty(sPath1);


                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CDetailPage", {
                    "ID1": data1.CustomerID,


                });
            },
            onClear: function (oEvent) {
                // var oInput1 = this.getView().byId("EmployeeID");
                // oInput1.setValue("");
                // var oInput2 = this.getView().byId("FirstName");
                // oInput2.setValue("");
                // var oInput3 = this.getView().byId("CustomerID");
                // oInput3.setValue("");
                // var oInput4 = this.getView().byId("ContactName");
                // oInput4.setValue("");

                var afilter = oEvent.getParameter("selectionSet");
                afilter.forEach(function (val) {
                    val.setSelectedKey("");
                });
                var mBindingParams = this.byId("tableID").getBinding("items");
                mBindingParams.filter();
            },
            onErase: function (oEvent) {
                var afilter = oEvent.getParameter("selectionSet");
                afilter.forEach(function (val) {
                    val.setSelectedKey("");
                });
                var mBindingParams = this.byId("tableID1").getBinding("items");
                mBindingParams.filter();

            },
            onReset: function () {
                var oInput1 = this.getView().byId("EmployeeID");
                oInput1.setValue("");
                var oInput2 = this.getView().byId("FirstName");
                oInput2.setValue("");
                var oInput3 = this.getView().byId("CustomerID");
                oInput3.setValue("");
                var oInput4 = this.getView().byId("ContactName");
                oInput4.setValue("");
                var oInput5 = this.getView().byId("LastName");
                oInput5.setValue("");
                var oInput6 = this.getView().byId("CompanyName");
                oInput6.setValue("");
            },
            onSearch: function () {
                var value = this.getView().byId("EmployeeID").getSelectedKey();
                var value2 = this.getView().byId("FirstName").getSelectedKey();
                var value1 = this.getView().byId("LastName").getSelectedKey();
                var oTable = this.getView().byId("tableID");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];
                if (value2 == 0 && value1 == 0) {
                    var oFilter = new Filter("EmployeeID", 'EQ', value);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value1 == 0) {
                    var oFilter = new Filter("FirstName", 'EQ', value2);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value2 == 0) {
                    var oFilter = new Filter("LastName", 'EQ', value1);
                    aFilters.push(oFilter)
                }
                else {
                    MessageBox("Input data is invalid");
                }
                oBinding.filter(aFilters);
            },
            onFilter: function () {
                var value3 = this.getView().byId("CustomerID").getSelectedKey();
                var value4 = this.getView().byId("ContactName").getSelectedKey();
                var value5 = this.getView().byId("CompanyName").getSelectedKey();
                var oTable = this.getView().byId("tableID1");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];
                if (value4 == 0 && value5 == 0) {
                    var oFilter = new Filter("CustomerID", 'EQ', value3);
                    aFilters.push(oFilter);
                }
                else if (value3 == 0 && value5 == 0) {
                    var oFilter = new Filter("ContactName", 'EQ', value4);
                    aFilters.push(oFilter);
                }
                else if (value3 == 0 && value4 == 0) {
                    var oFilter = new Filter("CompanyName", 'EQ', value5);
                    aFilters.push(oFilter);
                }
                else {
                    MessageBox("Input data is invalid");
                }
                oBinding.filter(aFilters);
            },
            onDelete: function (oEvent) {
             

                MessageBox.confirm("Do you really want to delete the selected Customer??", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                           
                            MessageBox.success("The selected Customer details is deleted");  
                    }                   
                    else (oAction === "CANCEL")
                    {

                    }
                }
            })
            },
            onSelectLogOut: function(){
                var oRouter5 = this.getOwnerComponent().getRouter();
                oRouter5.navTo("LogIn");
            },
            onCancel: function (oEvent) {
              
              
              
                MessageBox.confirm("Do you really want to delete the selected Employee??", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            MessageBox.success("The selected Employee details is deleted"); 
                                }
                            
                         else (oAction === "CANCEL")
                        {

                        }
                    }
                })
            },
           
            
            onAdd: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("NewForm");


            },
            onADD: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CNewForm");
            },
            onTableUpdateFinished: function (oEvent) {
                var oViewModel = this.getOwnerComponent().getModel("oDataModel");
                var oTable = this.byId("tableID");
                oViewModel.setProperty("/tableID", "/Employees (" + oTable.getBinding("items").getCurrentContexts().length + ")");
            },
            onTableUpdate: function (oEvent) {
                var oViewModel = this.getOwnerComponent().getModel("oDataModel");
                var oTable = this.byId("tableID1");
                oViewModel.setProperty("/tableID1", "/Customers (" + oTable.getBinding("items").getCurrentContexts().length + ")");
            },

            
            _toggleButtonsAndView: function (bEdit) {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("tableID").setVisible(!bEdit);
                oView.byId("tableID1").setVisible(!bEdit);
                oView.byId("delete").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
                


            },
        

        });
    });
