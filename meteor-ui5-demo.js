// Define the "people" collection
people = new Mongo.Collection("people");

// Server-only code
if (Meteor.isServer){

    // Server startup code
    Meteor.startup(function() {
        // Prevent /demoapp/ templates/controllers from being cached in development
        // so that we can make changes and see them reflected in the browser immediately.
        // TODO Still need to employ something like UI5 cachebuster for deploying new versions
        // of app in production.
        if (process.env.NODE_ENV === "development"){
            WebApp.rawConnectHandlers.use('/demoapp/', function(req, res, next) {
                res.setHeader('cache-control', 'no-cache');
                next();
            });
        }

        // Seed our people collection with some starting data if it's empty
        if (!people.find().count()){
            people.insert({
                name: "Jim",
                age: 36,
                city: "Melbourne"
            });
            people.insert({
                name: "Jill",
                age: 22,
                city: "Sydney"
            });
            people.insert({
                name: "Rodney",
                age: 54,
                city: "Wollongong"
            });
        }
    });

    // Publish the people collection
    Meteor.publish("people", function () {
      return people.find();
    });
}
