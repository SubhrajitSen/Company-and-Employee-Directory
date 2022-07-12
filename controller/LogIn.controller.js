sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller',  "sap/m/MessageBox"],
    function (MessageToast, Controller, MessageBox) {
        "use strict";

        var PageController = Controller.extend("project1.controller.LogIn", {
            onInit: function () {
              
            },
           
            onRegister: function(){
                var value0 = this.getView().byId("user_id").getValue();
                var value1 = this.getView().byId("password").getValue();
                var atpos = value0.indexOf("@");
                var dotpos = value0.lastIndexOf(".");
                if (value0 == "" || value1 == ""){
                    MessageBox.error("Fill in all the Details");
                }else if(value1.length <= 7){
                    MessageBox.error("Password criteria is not matched");
                }
                else if(atpos<1 || dotpos<atpos+2 || dotpos+2>=value0.length)
                {
                    MessageBox.error("Email Id criteria is not matched");
                }
                else{
                var oRouter = this.getOwnerComponent().getRouter();
			    oRouter.navTo("MainPage");
                var oInput1 = this.getView().byId("user_id");
                oInput1.setValue("");
                var oInput2 = this.getView().byId("password");
                oInput2.setValue("");
                }  
    },
    onPressResetButton: function() {
                
        var oInput1 = this.getView().byId("user_id");
        oInput1.setValue("");
        var oInput2 = this.getView().byId("password");
        oInput2.setValue("");
        
    },
    onPressLink: function() {
        var oRouter1 = this.getOwnerComponent().getRouter();
			    oRouter1.navTo("Account");
    },
    onPressPassword: function(){
        this.getView().byId("password").setType("Password");
        this.getView().byId("password").setType("Text");
    }
        });


        return PageController;

    });