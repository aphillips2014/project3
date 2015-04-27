// Define two objects
var obj1 = {
    "name": "John"
};

var obj2 = {
    "name": "Jane"
};

var andrew = {
    "name": "Andrew Phillips"
};


//Define a function in the global scope, and use this inside the function:
//this refers to the object for which an instance method is invoked
var printName = function(){
    //console.log(this.name);
};

//Add reference to this function in obj1 and in obj2
obj1.my_method = printName; // obj1 will equal this in the printName method. The object on left side of dot
obj2.my_method = printName; // obj2 will equal this in the printName method. The object on left side of dot

//Call the function from within obj1 and obj2
//obj1.my_method(); //logs "John", because this gets bound to “obj1”
//obj2.my_method(); //logs "Jane”, because this gets bound to “obj2”


//Can we override what “this” refers to? Yes! We can use call when calling 
//our function (functionName.call()) and specify in the first parameter what we want this to be bound to.
//As an example we override what obj1 points to. Instead of printing the data from obj1 we point obj1 to andrew object
obj1.my_method.call(andrew);
obj2.my_method.call(obj1);

/***********************************************************************************************/
//Prototypal Chains (Can I Borrow Some of your Properties?)

var person = {
    "p_name": "John"
};

//Create a new object, student, by “reusing” person.
var student = Object.create(person); 

//Add some new properties to student (person remains unchanged)
//Add student.school to the person object without changing person
student.school = "UPenn";
//console.log(student.school); //will log “UPenn”
//console.log(student.p_name); //Looks in student for p_name, if not found will go up the chain to person object. Line 44 is
//what allows this lookup to happen


/**********************************************************************************************/
//Object Decoration Pattern
//this is an object decorator function as it adds properties to a person to make it into 
//a student object
/*This is another way to re-use a pre-existing object, this time by directly adding properties to it. 
This is different from prototypal chains because it modifies the original object, rather than creating a new one.*/

var studentlike = function(person, school){
    person.school = school;
    return person;
};

var mary = studentlike({"p_name": "Mary"}, "UCLA" );
//console.log(mary.school); //Logs “UCLA”
//console.log(mary.p_name); //Logs “Mary”

/*******************************************************************************************************************/
// Define the Person constructor . Gets called with "new"
var Person = function(firstName) {
  this.firstName = firstName;
};

// Add a couple of methods to Person.prototype. This is for shared methods we want associated with class Person
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
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
  // we call the Person class which is a function and set the firstName param on the parent
  // to the name passed into Student constructor
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
https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2789318536/m-2725948558

Student.prototype.constructor = Student;

// Replace the "sayHello" method
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
              + this.subject + ".");
};

// Add a "sayGoodBye" method
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Get name accessor added by Andrew
Student.prototype.getName = function(){
  console.log("in Students contructor getName method!");
};

// Example usage:
var student1 = new Student("Janet", "Applied Physics"); //student1 will delegate to Student.prototype than Person.prototype for all lookups . https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2711278553/m-2777598543
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"
student1.getName(); // Added by Andrew to test prototype chaining. js will look in Student class for getName and if not found will look in super class which is Parent to find it. If found it will execute it. If not found will look in global Object and if not found return an error

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true


/**********************************************************************************/
//Car constructor super class
var Car = function(loc){
    this.loc = loc;
};

//Add a move method using prototype chaining to Car class which has access to "this"
//Any methods you want shared go on the .prototype property of the constructor function Car
Car.prototype.move = function(){
  this.loc++;  
};
// Your code goes here!

//Bind Van to car using call method
var Van = function(loc){
	Car.call(this,loc); //Run Van subclass in same context as Car in order to access Car instance variables
};

Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van; //we did this because the .prototype object was overwritten with create call above, so we need to set back the constructor property
Van.prototype.grab = function(){};
var zed = new Car(3);
zed.move();

// These lines have been commented out because Van hasn't been defined in this example

var amy = new Van(9);
amy.move();
amy.grab();



/**************************************************************************************/
//Use of call from  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }

  return this;
}

function Food(name, price) {
	//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/e-2768198586/m-2783308539 - call video
	//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/m-2777058542 - call video
  Product.call(this, name, price);
  this.category = 'food';
}

//https://www.udacity.com/course/viewer#!/c-ud015/l-2794468541/m-2684408711 - Object.create video

Food.prototype = Object.create(Product.prototype);

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

Toy.prototype = Object.create(Product.prototype);

var cheese = new Food('feta', 5); 
var fun = new Toy('robot', 40);

