/*******************************************************************************************************************/
// Define the Person constructor . Gets called with "new". The constructor is passed a reference to a newly created
// empty object as the value of the "this" keyword, and it is responsible for performing appropriate initialization for
//that new object
//Constructors initialize the object passed as the value "this" and return nothing
var Person = function(firstName) {
  this.firstName = firstName; // save off the first name 
};

// Add a couple of methods to Person.prototype. This is for shared methods we want associated with class Person
Person.prototype.walk = function(){
  console.log("I am walking!");
};

//Add sayHello method to Person prototype object
Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + " and we are in Person object!");
};

//Added by Andrew
Person.prototype.getName = function(){
  //console.log(this.firstName());
  console.log("in Person contructor getName method!");
};

// Define the Student constructor
function Student(firstName, subject) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call . Since classes in JS are functions,
  // we call the Person class which is a function and set the firstName param on the parent and subject of Student class
  // passed into Student constructor. Bind Person object to Student. Pass in what the Super class constructor needs
  Person.call(this, firstName);

  // Initialize our Student-specific properties
  this.subject = subject;
};

// Create a Student.prototype(property) object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give Person for the "firstName" 
// argument. The correct place to call Person is above, where we call 
// it from Student.
//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2685208748/m-2685198689

Student.prototype = Object.create(Person.prototype); //Student.prototype object will delegate to Person for failed lookups(inheritance)

// See note below
//We want to associate all class Persons methods which are in prototype to Student so that during invocation of Student it will have access to walk() and sayHello methods in superclass Parent. Student will now delegate lookups to Person.prototype.constructor which is equal to Person object*/

// Set the "constructor" property to refer to Student because the constructor property of Student got removed when we created our own Object above
//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2785528542/m-2785688540
//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2789318536/m-2725948558
//console.log("#1 Student constructor points to: " + Student.prototype.constructor);
Student.prototype.constructor = Student;

// Replace the "sayHello" method
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying " + this.subject + " and I'm in Student prototype!");
};

// Add a "sayGoodBye" method
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Get name accessor added by Andrew
Student.prototype.getName = function(){
  console.log("in Students contructor getName method!");
};

//Get subject
Student.prototype.getSubject = function() {
  console.log("The subject is : " + this.subject);

};

// Example usage:
var student1 = new Student("Janet", "Applied Physics"); //student1 will delegate to Student.prototype than Person.prototype for all lookups . https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2711278553/m-2777598543
student1.sayHello();   //Will look in Student's prototype object for sayHello method
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"
student1.getName(); // Added by Andrew to test prototype chaining. js will look in Student class for getName and if not found will look in super class which is Parent to find it. If found it will execute it. If not found will look in global Object and if not found return an error
student1.getSubject();
// Check that instanceof works correctly
//console.log("#2 Student constructor points to: " + Student.prototype.constructor);
console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true

