// Outside of Meteor.isClient and Meteor.isServer so that it will
// be executed in both environments
Courses = new Mongo.Collection("courses");

if (Meteor.isClient) {
	Meteor.subscribe("coursesData");
	
	Template.courses.helpers({
		// "courses" will now be available in the template
		courses: function () {
			return Courses.find();
		}
	});

	Template.courses.events({
		'submit #newCourse': function (event) {
			event.preventDefault();
			
			// Retrieve the values
			var number = event.target.number.value;
			var title = event.target.title.value;
			var grade = event.target.grade.value;
			var credits = event.target.credits.value;
			
			Meteor.call("addCourse", number, title, grade, credits);
			
			// Clear the form fields
			event.target.number.value = "";
			event.target.title.value = "";
			event.target.credits.value = "";
		},
		"click .delete": function () {
			// "this" points to the course object
			if (confirm ("Do you really want to delete the course \"" + this.number + " - " + this.title + "\"?"))
				Meteor.call("deleteCourse", this);
		}
	});
}

if (Meteor.isServer) {
	Meteor.publish("coursesData", function () {
		return Courses.find({user: this.userId});
	});
}

// Outside of Meteor.isClient and Meteor.isServer
Meteor.methods({
	"addCourse": function (number, title, grade, credits) {
		Courses.insert({number: number, title: title, credits: credits, grade: grade, user: Meteor.userId()});
	},
	"deleteCourse": function (course) {
		if (Meteor.userId() == course.user)
			Courses.remove(course);
	}
});
