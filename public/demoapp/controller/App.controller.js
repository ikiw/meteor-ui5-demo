sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "meteor-ui5/MeteorModel",
        "sap/ui/model/json/JSONModel",
    ],
    function(Controller, MessageToast, MeteorModel, JSONModel) {
        "use strict";

        return Controller.extend("demoapp.controller.App", {

            _oNewPersonModel: null,

            onInit: function() {

                // Build and set People Meteor model from meteor subscription and cursor
                var sSubscription = "people";
                var oCursor = people.find();
                var oPeople = new MeteorModel(
                    sSubscription,
                    oCursor,
                    people          // Meteor collection required if we want two-way binding
                );
                this.getView().setModel(oPeople, "people");

                // Create JSON model to store details of New Person as entered on form
                this._oNewPersonModel = new JSONModel({});
                this.getView().setModel(this._oNewPersonModel, "newPerson");
            },

            onPressDelete: function(event){
                // Get meteor record id from custom data set in button
                var id = event.getSource().data("id");

                // Use meteor to delete the record directly from the collection.
                // Table contents will update reactively.
                people.remove(id);
                sap.m.MessageToast.show("1 person removed.");
            },

            onPressAddPerson: function(event){
                // Get data entered on from from bound JSON model
                var oNewPerson = this._oNewPersonModel.getData();
                people.insert(oNewPerson);

                // Clear form data
                this._oNewPersonModel.setData({});
                sap.m.MessageToast.show("'" + oNewPerson.name + "' added.");
            }
        });
    }
);
