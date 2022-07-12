sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller', "sap/m/MessageBox"],
    function (MessageToast, Controller, MessageBox) {
        "use strict";

        var PageController = Controller.extend("project1.controller.Account", {
            onInit: function () {

            },

            onRegister: function () {


                var value0 = this.getView().byId("user_id").getValue();
                var value1 = this.getView().byId("user_name").getValue();
                var value2 = this.getView().byId("password").getValue();
                var value3 = this.getView().byId("password2").getValue();
                var atpos = value0.indexOf("@");
                var dotpos = value0.lastIndexOf(".");
                if (value0 == "" || value1 == "" || value2 == "" || value3 == "") {
                    MessageBox.error("Fill in all the Details");
                }
                else if (value2 != value3) {
                    MessageBox.error("Both Passwords should be same");
                } 
                else if (value2.length <= 7 || value3.length <= 7) {
                    MessageBox.error("Password criteria is not matched");
                }
                else if(atpos<1 || dotpos<atpos+2 || dotpos+2>=value0.length)
                {
                    MessageBox.error("Email  id criteria is not matched");
                }
                else {
                    var oRouter1 = this.getOwnerComponent().getRouter();
                    oRouter1.navTo("LogIn");
                    var oInput1 = this.getView().byId("user_id");
                    oInput1.setValue("");
                    var oInput2 = this.getView().byId("user_name");
                    oInput2.setValue("");
                    var oInput3 = this.getView().byId("password");
                    oInput3.setValue("");
                    var oInput4 = this.getView().byId("password2");
                    oInput4.setValue("");
                }
            },

            handleTile2: function () {

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("LogIn");


            },
            onPressResetButton: function () {

                var oInput1 = this.getView().byId("user_id");
                oInput1.setValue("");
                var oInput2 = this.getView().byId("user_name");
                oInput2.setValue("");
                var oInput3 = this.getView().byId("password");
                oInput3.setValue("");
                var oInput4 = this.getView().byId("password2");
                oInput4.setValue("");
            },
            onPressPassword: function () {
                this.getView().byId("password").setType("Password");
                this.getView().byId("password").setType("Text");

                this.getView().byId("password2").setType("Password");
                this.getView().byId("password2").setType("Text");
                this.getView().byId("password").setType(false);
                this.getView().byId("password2").setType(false);
            },
            onPressPrevious: function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("LogIn");
            }
        });


        return PageController;

    });