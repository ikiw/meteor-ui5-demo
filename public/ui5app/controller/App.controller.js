sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "meteor-ui5/MeteorModel"
    ],
    function(Controller, MessageToast, MeteorModel) {
        "use strict";
        return Controller.extend("x.controller.App", {
            onInit: function() {

                // Build and set Meteor model from meteor subscription and cursor
                var sSubscription = "people";
                var oCursor = people.find();
                var oPeople = new MeteorModel(sSubscription,oCursor);
                this.getView().setModel(oPeople, "people");
            }
        });
    }
);
