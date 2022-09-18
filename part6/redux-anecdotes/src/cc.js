/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
// let Relationship = Object.freeze({
//   parent: 0,
//   child: 1,
//   sibling: 2
// });

// class Person
// {
//   constructor(name)
//   {
//     this.name = name;
//   }
// }

// // LOW-LEVEL (STORAGE)

// class RelationshipBrowser
// {
//   constructor()
//   {
//     if (this.constructor.name === 'RelationshipBrowser')
//       throw new Error('RelationshipBrowser is abstract!');
//   }

//   findAllChildrenOf(name) {}
// }

// class Relationships extends RelationshipBrowser
// {
//   constructor()
//   {
//     super();
//     this.data = [];
//   }

//   addParentAndChild(parent, child)
//   {
//     this.data.push({
//       from: parent,
//       type: Relationship.parent,
//       to: child
//     });
//     this.data.push({
//       from: child,
//       type: Relationship.child,
//       to: parent
//     });
//   }


//   findAllChildrenOf(name) {
//     return this.data.filter(r =>
//       r.from.name === name &&
//       r.type === Relationship.parent
//     ).map(r => r.to);
//   }
// }

// // HIGH-LEVEL (RESEARCH)

// class Research
// {
//   // constructor(relationships)
//   // {
//   //   // problem: direct dependence ↓↓↓↓ on storage mechanic
//   //   let relations = relationships.data;
//   //   for (let rel of relations.filter(r =>
//   //     r.from.name === 'John' &&
//   //     r.type === Relationship.parent
//   //   ))
//   //   {
//   //     console.log(`John has a child named ${rel.to.name}`);
//   //   }
//   // }

//   constructor(browser)
//   {
//     for (let p of browser.findAllChildrenOf('John'))
//     {
//       console.log(`John has a child named ${p.name}`);
//     }
//   }
// }

// let parent = new Person('John');
// let child1 = new Person('Chris');
// let child2 = new Person('Matt');

// // low-level module
// let rels = new Relationships();
// rels.addParentAndChild(parent, child1);
// rels.addParentAndChild(parent, child2);

// new Research(rels);

//----------------------------------

// class Address
// {
//   constructor(streetAddress, city, country) {
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.country = country;
//   }

//   toString()
//   {
//     return `Address: ${this.streetAddress}, ` +
//       `${this.city}, ${this.country}`;
//   }
// }

// class Person
// {
//   constructor(name, address)
//   {
//     this.name = name;
//     this.address = address; //!
//   }

//   toString()
//   {
//     return `${this.name} lives at ${this.address}`;
//   }

//   greet()
//   {
//     console.log(
//       `Hi, my name is ${this.name}, ` +
//       `I live at ${this.address.toString()}`
//     );
//   }
// }

// class Serializer
// {
//   constructor(types){
//     this.types = types;
//   }

//   markRecursive(object)
//   {
//     // anoint each object with a type index
//     let idx = this.types.findIndex(t => {
//       return t.name === object.constructor.name;
//     });
//     if (idx !== -1)
//     {
//       object['typeIndex'] = idx;

//       for (let key in object)
//       {
//         if (object.hasOwnProperty(key) && object[key] != null)
//           this.markRecursive(object[key]);
//       }
//     }
//   }

//   reconstructRecursive(object)
//   {
//     if (object.hasOwnProperty('typeIndex'))
//     {
//       let type = this.types[object.typeIndex];
//       let obj = new type();
//       for (let key in object)
//       {
//         if (object.hasOwnProperty(key) && object[key] != null) {
//           obj[key] = this.reconstructRecursive(object[key]);
//         }
//       }
//       delete obj.typeIndex;
//       return obj;
//     }
//     return object;
//   }

//   clone(object)
//   {
//     this.markRecursive(object);
//     let copy = JSON.parse(JSON.stringify(object));
//     return this.reconstructRecursive(copy);
//   }
// }

// let john = new Person('John',
//   new Address('123 London Road', 'London', 'UK'));

// let jane = JSON.parse(JSON.stringify(john));

// jane.name = 'Jane';
// jane.address.streetAddress = '321 Angel St';

// john.greet();
// // this won't work
// // jane.greet();

// // try a dedicated serializer
// let s = new Serializer([Person,Address]); // pain point
// jane = s.clone(john);

// jane.name = 'Jane';
// jane.address.streetAddress = '321 Angel St';

// console.log(john.toString());
// console.log(jane.toString());

//---------------------------------

// class Address
// {
//   constructor(suite, streetAddress, city)
//   {
//     this.suite = suite;
//     this.streetAddress = streetAddress;
//     this.city = city;
//   }

//   toString()
//   {
//     return `Suite ${this.suite}, ` +
//       `${this.streetAddress}, ${this.city}`;
//   }
// }

// class Employee // renamed
// {
//   constructor(name, address)
//   {
//     this.name = name;
//     this.address = address; //!
//   }

//   toString()
//   {
//     return `${this.name} works at ${this.address}`;
//   }

//   greet()
//   {
//     console.log(
//       `Hi, my name is ${this.name}, ` +
//       `I work at ${this.address.toString()}` //!
//     );
//   }
// }

// class Serializer
// {
//   constructor(types){
//     this.types = types;
//   }

//   markRecursive(object)
//   {
//     // anoint each object with a type index
//     let idx = this.types.findIndex(t => {
//       return t.name === object.constructor.name;
//     });
//     if (idx !== -1)
//     {
//       object['typeIndex'] = idx;

//       for (let key in object)
//       {
//         if (object.hasOwnProperty(key) && object[key] != null)
//           this.markRecursive(object[key]); // ^^^^^^^^^^ important
//       }
//     }
//   }

//   reconstructRecursive(object)
//   {
//     if (object.hasOwnProperty('typeIndex'))
//     {
//       let type = this.types[object.typeIndex];
//       let obj = new type();
//       for (let key in object)
//       {
//         if (object.hasOwnProperty(key) && object[key] != null) {
//           obj[key] = this.reconstructRecursive(object[key]);
//         }
//       }
//       delete obj.typeIndex;
//       return obj;
//     }
//     return object;
//   }

//   clone(object)
//   {
//     this.markRecursive(object);
//     let copy = JSON.parse(JSON.stringify(object));
//     return this.reconstructRecursive(copy);
//   }
// }

// class EmployeeFactory
// {
//   static _newEmployee(proto, name, suite)
//   {
//     let copy = EmployeeFactory.serializer.clone(proto);
//     copy.name = name;
//     copy.address.suite = suite;
//     return copy;
//   }

//   static newMainOfficeEmployee(name, suite)
//   {
//     return this._newEmployee(
//       EmployeeFactory.main, name, suite
//     );
//   }

//   static newAuxOfficeEmployee(name, suite)
//   {
//     return this._newEmployee(
//       EmployeeFactory.aux, name, suite
//     );
//   }
// }

// EmployeeFactory.serializer = new Serializer([Employee, Address]);
// EmployeeFactory.main = new Employee(null,
//   new Address(null, '123 East Dr', 'London'));
// EmployeeFactory.aux = new Employee(null,
//   new Address(null, '200 London Road', 'Oxford'));

// let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
// let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

// console.log(john.toString());
// console.log(jane.toString());

//----------------------------------------------------------------

// const fs = require('fs');
// const path = require('path');

// class MyDatabase
// {
//   constructor()
//   {
//     const instance = this.constructor.instance;
//     if (instance) {
//       return instance;
//     }

//     this.constructor.instance = this;


//     console.log(`Initializing database`);
//     this.capitals = {};

//     let lines = fs.readFileSync(
//       path.join(__dirname, 'capitals.txt')
//     ).toString().split('\r\n');

//     for (let i = 0; i < lines.length/2; ++i)
//     {
//       this.capitals[lines[2*i]] = parseInt(lines[2*i+1]);
//     }
//   }

//   getPopulation(city)
//   {
//     // possible error handling here
//     return this.capitals[city];
//   }
// }

// // ↑↑↑ low-level module

// // ↓↓↓ high-level module

// class SingletonRecordFinder
// {
//   totalPopulation(cities)
//   {
//     return cities.map(
//       city => new MyDatabase().getPopulation(city)
//     ).reduce((x,y) => x+y);
//   }
// }

// class ConfigurableRecordFinder
// {
//   constructor(database)
//   {
//     this.database = database;
//   }

//   totalPopulation(cities)
//   {
//     return cities.map(
//       city => this.database.getPopulation(city)
//     ).reduce((x,y) => x+y);
//   }
// }

// class DummyDatabase
// {
//   constructor()
//   {
//     this.capitals = {
//       'alpha': 1,
//       'beta': 2,
//       'gamma': 3
//     };
//   }

//   getPopulation(city)
//   {
//     // possible error handling here
//     return this.capitals[city];
//   }
// }

// describe('singleton database', function()
// {
//   it('is a singleton', function()
//   {
//     const db1 = new MyDatabase();
//     const db2 = new MyDatabase();
//     expect(db1).toBe(db2);
//   });

//   it('calculates total population', function()
//   {
//     let rf = new SingletonRecordFinder();
//     let cities = ['Seoul', 'Mexico City'];
//     let tp = rf.totalPopulation(cities);
//     expect(tp).toEqual(17400000+17500000);
//   });

//   it('calculates total population better', function()
//   {
//     let db = new DummyDatabase();
//     let rf = new ConfigurableRecordFinder(db);
//     expect(rf.totalPopulation(['alpha', 'gamma'])).toEqual(4);
//   });
// });

//----------------------------------------------------------------

// class Shape {
//   constructor(name, renderer) {
//     this.name = name;
//     this.renderer = renderer;
//   }

//   toString() {
//     if (this.name === 'square') {

//       return this.renderer.square
//     } else {
//       return this.renderer.triangle

//     }
//   }

// }

// class Triangle extends Shape {
//   constructor(renderer) {
//     super('triangle', renderer);
//     this.renderer = renderer;
//   }
// }

// class Square extends Shape {
//   constructor(renderer) {
//     super('square', renderer);
//     this.renderer = renderer;
//   }
// }

// class VectorSquare extends Square {
//   toString() {
//     return `Drawing square as lines`;
//   }
// }
// class VectorTriangle extends Triangle {
//   toString() {
//     return `Drawing triangle as lines`;
//   }
// }

// class RasterSquare extends Square {
//   toString() {
//     return `Drawing square as pixels`;
//   }
// }
// class RasterTriangle extends Triangle {
//   toString() {
//     return `Drawing triangle as pixels`;
//   }
// }

// // imagine VectorTriangle and RasterTriangle are here too

// class VectorRenderer {
//   get square() {
//     return new VectorSquare().toString();
//   }
//   get triangle() {
//     return new VectorTriangle().toString()
//   }
// }
// class RasterRenderer {
//   get square() {
//     return new RasterSquare().toString()
//   }

//   get triangle() {
//     return new RasterTriangle().toString()
//   }
// }

//----------------------------------------------------------------

// class SingleValue {
//   constructor(value) {
//     // todo
//     this.value = value;
//   }

//   toString() {
//     return this.value
//   }

//   [Symbol.iterator](){
//     let returned = false
//     return {
//       next:()=>({
//         value:this,
//         done: returned++
//       })
//     }
//   }
// }

// class ManyValues {
//   constructor() {
//     this.value = []
//   }
//   // ensure there's a push(value) method
//   push(value) {
//     this.value.push(value)
//   }

//   toString() {
//     return this.value
//   }
// }

// let sum = function (containers) {
//   // todo
//   let result = 0;
//   // for (let item of containers) {
//   //   item = item.value
//   //   // if (Array.isArray(item)) {
//   //   //   result += item.reduce((x, y) => parseInt(x) + parseInt(y),0)

//   //   // } else {
//   //   //   result += parseInt(item)
//   //   // }

//   // }
//   result= containers.reduce((x,y)=>x+y)
//   return result;
// };

//---------------------------------

// class Bird {
//   constructor(age = 0) {
//     this.age = age;
//   }

//   fly() {
//     return this.age < 10 ? 'flying' : 'too old';
//   }
// }

// class Lizard {
//   constructor(age = 0) {
//     this.age = age;
//   }

//   crawl() {
//     return this.age > 1 ? 'crawling' : 'too young';
//   }
// }

// class Dragon {
//   constructor(age = 0) {
//     this.bird = new Bird(age)
//     this.lizard = new Lizard(age)
//   }

//   fly() {
//     return this.bird.fly()
//   }

//   set age(age) {
//     this.bird.age = age;
//     this.lizard.age = age;
//   }

//   get age() {
//     return this.bird.age || this.lizard.age
//   }

//   crawl() {
//     return this.lizard.crawl()
//   }

//   // flyAndCrawl() {
//   //   if (this.age > 1 && this.age < 10) {
//   //     return 'flying and crawling'
//   //   } else if (this.age < 1) {
//   //     return 'too young'
//   //   } else {
//   //     return 'too old'
//   //   }
//   // }
//   // todo: API members
// }

//--------------------------------
// class Generator {
//   generate(count) {
//     let result = [];
//     for (let i = 0; i < count; ++i)
//       result.push(Math.floor((Math.random() * 6) + 1));
//     return result;
//   }
// }

// class Splitter {
//   split(array) {
//     let result = [];

//     let rowCount = array.length;
//     let colCount = array[0].length;

//     // get the rows
//     for (let r = 0; r < rowCount; ++r) {
//       let theRow = [];
//       for (let c = 0; c < colCount; ++c)
//         theRow.push(array[r][c]);
//       result.push(theRow);
//     }

//     // get the columns
//     for (let c = 0; c < colCount; ++c) {
//       let theCol = [];
//       for (let r = 0; r < rowCount; ++r)
//         theCol.push(array[r][c]);
//       result.push(theCol);
//     }

//     // now the diagonals
//     let diag1 = [];
//     let diag2 = [];
//     for (let c = 0; c < colCount; ++c) {
//       for (let r = 0; r < rowCount; ++r) {
//         if (c === r)
//           diag1.push(array[r][c]);
//         let r2 = rowCount - r - 1;
//         if (c === r2)
//           diag2.push(array[r][c]);
//       }
//     }

//     result.push(diag1);
//     result.push(diag2);

//     return result;
//   }
// }

// class Verifier {
//   verify(array) {
//     if (array.length < 1) return false;
//     let adder = function (p, c) {
//       return p + c;
//     };
//     let expected = array[0].reduce(adder);
//     let ok = true;
//     array.forEach(function (subarray) {
//       if (subarray.reduce(adder) !== expected) {
//         ok = false;
//       }
//     });
//     return ok;
//   }
// }

// class MagicSquareGenerator {
//   generate(size) {
//     // todo
//     let twoDimensionalArray = []
//     for (let i = 1; i <= size / 2; i++) {
//       twoDimensionalArray.push(new Generator().generate(2))
//     }
//     console.log(twoDimensionalArray)

//     const splittedList = new Splitter().split(twoDimensionalArray)
//     const verifiedList = new Verifier().verify(twoDimensionalArray)
//     console.log('very', verifiedList)
//     if (verifiedList) {
//       return twoDimensionalArray
//     } else {
//       return
//     }
//   }
// }

// const result = new MagicSquareGenerator().generate(4)

// console.log(result)

//---------------------------------------------------

// class FormattedText
// {
//   constructor(plainText)
//   {
//     this.plainText = plainText;
//     this.caps = new Array(plainText.length).map(
//       function() { return false; }
//     );
//   }

//   capitalize(start, end)
//   {
//     for (let i = start; i <= end; ++i)
//       this.caps[i] = true;
//   }

//   toString()
//   {
//     let buffer = [];
//     for (let i in this.plainText)
//     {
//       let c = this.plainText[i];
//       buffer.push(this.caps[i] ? c.toUpperCase() : c);
//     }
//     return buffer.join('');
//   }
// }

// // this would work better as a nested class
// class TextRange
// {
//   constructor(start, end)
//   {
//     this.start = start;
//     this.end = end;
//     this.capitalize = false;
//     // other formatting options here
//   }

//   covers(position)
//   {
//     return position >= this.start &&
//       position <= this.end;
//   }
// }

// class BetterFormattedText
// {
//   constructor(plainText)
//   {
//     this.plainText = plainText;
//     this.formatting = [];
//   }

//   getRange(start, end)
//   {
//     let range = new TextRange(start, end);
//     this.formatting.push(range);
//     return range;
//   }

//   toString()
//   {
//     let buffer = [];
//     for (let i in this.plainText)
//     {
//       let c = this.plainText[i];
//       for (let range of this.formatting) {
//         if (range.covers(i) && range.capitalize)
//           c = c.toUpperCase();
//       }
//       buffer.push(c);
//     }
//     return buffer.join('');
//   }
// }

// const text = 'This is a brave new world';
// let ft = new FormattedText(text);
// ft.capitalize(10, 15);
// console.log(ft.toString());

// let bft = new BetterFormattedText(text);
// bft.getRange(16, 19).capitalize = true;
// console.log(bft.toString());

// ----------------------------------



// class Sentence {
//   constructor(plainText) {
//     // todo
//     this.plainText = plainText;
//     this.formatting = []
//   }

//   at(index) {
//     // todo
//     const wordsList = this.plainText.split(' ');
//     const modified = { word: wordsList[index], capitalize: false }
//     this.formatting.push(modified)
//     return modified

//   }

//   toString() {
//     // todo
//     const wordsList = this.plainText.split(' ');
//     for (let i = 0; i < wordsList.length; i++) {
//       for (let j = 0; j < this.formatting.length; j++) {
//         if (wordsList[i] === this.formatting[j].word) {
//           wordsList[i] = wordsList[i].toUpperCase()
//         }
//       }
//     }

//     return wordsList.join(' ')

//   }
// }

// let s = new Sentence('alpha beta gamma')
// s.at(1).capitalize = true
// console.log(s.toString())

//--------------------------------

// class Image {
//   constructor(url) {
//     this.url = url;
//     console.log(`Loading image from ${this.url}`);
//   }

//   draw() {
//     console.log(`Drawing image ${this.url}`);
//   }
// }

// class LazyImage {
//   constructor(url) {
//     this.url = url;
//   }

//   draw() {
//     if (!this.image)
//       this.image = new Image(this.url);
//     this.image.draw();
//   }
// }

// function drawImage(img) {
//   console.log('About to draw the image');
//   img.draw();
//   console.log('Done drawing the image');
// }

// let img = new LazyImage('http://pokemon.com/pikachu.png');
// drawImage(img);

// ----------------------------------------------------------------
// class Person {
//   constructor(age = 0) {
//     this.age = age;
//   }

//   drink() { return 'drinking'; }
//   drive() { return 'driving'; }
//   drinkAndDrive() { return 'driving while drunk'; }
// }

// class ResponsiblePerson {
//   constructor(person) {
//     this.person = person;
//   }
//   // todo
//   drink() {
//     if (this.person.age >= 18) {
//       return this.person.drink()
//     } else {
//       return ('too young')
//     }
//   }

//   drive() {
//     if (this.person.age >= 16) {
//       return this.person.drive()
//     } else {
//       return ('too young')
//     }
//   }

//   drinkAndDrive() {
//     return 'dead'
//   }

//   set age(age){
//     this.person.age = age
//   }
// }

// let p = new ResponsiblePerson(new Person(19));
// console.log(p.drive())

// -------------------------------

// let Action = Object.freeze({
//   deposit: 0,
//   withdraw: 1
// });

// class Command {
//   constructor(action, amount) {
//     this.action = action;
//     this.amount = amount;
//     this._success = false;
//   }

//   set success(value) {
//     this._success = value;
//   }

//   get success() {
//     return this._success;
//   }


// }

// class Account {
//   constructor() {
//     this.balance = 0;
//   }

//   process(cmd) {
//     // todo
//     switch (cmd.action) {
//       case Action.deposit: {
//         this.balance += cmd.amount
//         cmd.success = true
//         break
//       }

//       case Action.withdraw: {
//         if (this.balance >= cmd.amount) {

//           this.balance -= cmd.amount
//           cmd.success = true

//         } else {
//           cmd.success = false
//         }
//       }

//         break

//     }
//   }
// }

// let cmd = new Command(Action.deposit, 50)

// let account = new Account()

// account.process(cmd)

// ----------------------------------------------------------------

// class Integer {
//   constructor(value) {
//     this.value = value;
//   }
// }

// let Operation = Object.freeze({
//   addition: 0,
//   subtraction: 1
// });

// class BinaryOperation {
//   constructor() {
//     this.type = null;
//     this.left = null;
//     this.right = null;
//   }

//   get value() {
//     switch (this.type) {
//       case Operation.addition:
//         return this.left.value + this.right.value;
//       case Operation.subtraction:
//         return this.left.value - this.right.value;
//     }
//     return 0;
//   }
// }

// let TokenType = Object.freeze({
//   integer: 0,
//   plus: 1,
//   minus: 2,
//   lparen: 3,
//   rparen: 4
// });

// class Token {
//   constructor(type, text) {
//     this.type = type;
//     this.text = text;
//   }

//   toString() {
//     return `\`${this.text}\``;
//   }
// }

// function lex(input) {
//   let result = [];

//   for (let i = 0; i < input.length; ++i) {
//     switch (input[i]) {
//       case '+':
//         result.push(new Token(TokenType.plus, '+'));
//         break;
//       case '-':
//         result.push(new Token(TokenType.minus, '-'));
//         break;
//       case '(':
//         result.push(new Token(TokenType.lparen, '('));
//         break;
//       case ')':
//         result.push(new Token(TokenType.rparen, ')'));
//         break;
//       default:
//         let buffer = [input[i]];
//         for (let j = i + 1; j < input.length; ++j) {
//           if ('0123456789'.includes(input[j])) {
//             buffer.push(input[j]);
//             ++i;
//           } else {
//             result.push(new Token(TokenType.integer,
//               buffer.join('')));
//             break;
//           }
//         }
//         break;
//     }
//   }

//   return result;
// }

// function parse(tokens) {
//   let result = new BinaryOperation();
//   let haveLHS = false;

//   for (let i = 0; i < tokens.length; ++i) {
//     let token = tokens[i];

//     switch (token.type) {
//       case TokenType.integer:
//         let integer = new Integer(parseInt(token.text));
//         if (!haveLHS) {
//           result.left = integer;
//           haveLHS = true;
//         } else {
//           result.right = integer;
//         }
//         break;
//       case TokenType.plus:
//         result.type = Operation.addition;
//         break;
//       case TokenType.minus:
//         result.type = Operation.subtraction;
//         break;
//       case TokenType.lparen:
//         let j = i;
//         for (; j < tokens.length; ++j)
//           if (tokens[j].type === TokenType.rparen)
//             break; // found it!
//         // process subexpression
//         let subexpression = tokens.slice(i + 1, j);
//         let element = parse(subexpression);
//         if (!haveLHS) {
//           result.left = element;
//           haveLHS = true;
//         } else result.right = element;
//         i = j; // advance
//         break;
//     }
//   }
//   return result;
// }

// let input = "(13+4)-(12+1)";
// let tokens = lex(input);
// console.log(tokens.join('  '));

// let parsed = parse(tokens);
// console.log(`${input} = ${parsed.value}`);

// -------------------------------
// -------------------------------

// let TokenType = Object.freeze({
//   integer: 0,
//   plus: 1,
//   minus: 2,
//   lparen: 3,
//   rparen: 4
// });


// let Operation = Object.freeze({
//   addition: 0,
//   subtraction: 1
// });

// class Integer {
//   constructor(value) {
//     this.value = value;
//   }
// }


// class BinaryOperation {
//   constructor() {
//     this.type = null;
//     this.left = null;
//     this.right = null;
//   }

//   get value() {
//     switch (this.type) {
//       case Operation.addition:
//         return this.left.value + this.right.value;
//       case Operation.subtraction:
//         return this.left.value - this.right.value;
//     }
//     return 0;
//   }
// }

// class ExpressionProcessor {
//   constructor() {
//     // todo
//     this.variables = "";
//     this.operator = "";
//     this.value = ""
//   }


//    parse(tokens) {
//     let result = new BinaryOperation();
//     let haveLHS = false;

//     for (let i = 0; i < tokens.length; ++i) {
//       let token = tokens[i];

//       switch (token.type) {
//         case TokenType.integer:
//           let integer = new Integer(parseInt(token.text));
//           if (!haveLHS) {
//             result.left = integer;
//             haveLHS = true;
//           } else {
//             result.right = integer;
//           }
//           break;
//         case TokenType.plus:
//           result.type = Operation.addition;
//           break;
//         case TokenType.minus:
//           result.type = Operation.subtraction;
//           break;
//         case TokenType.lparen:
//           let j = i;
//           for (; j < tokens.length; ++j)
//             if (tokens[j].type === TokenType.rparen)
//               break; // found it!
//           // process subexpression
//           let subexpression = tokens.slice(i + 1, j);
//           let element = this.parse(subexpression);
//           if (!haveLHS) {
//             result.left = element;
//             haveLHS = true;
//           } else result.right = element;
//           i = j; // advance
//           break;
//       }
//     }
//     return result;
//   }

//   calculate(expression) {
//     // todo

//     let tokenList = [];
//     let result = 0
//     for (let i = 0; i < expression.length; i++) {
//       let token = expression[i];
//       console.log(token)
//       switch (token) {
//         case '+': {
//           tokenList.push(token)
//           break;
//         }
//         case '-': {
//           tokenList.push(token)
//           break;
//         }
//         default: {
//           const parsed = parseInt(token, 10)
//           if (isNaN(parsed)) {
//             tokenList.push(0)
//           } else {
//             tokenList.push(parsed)
//           }

//         }
//       }
//     }
//     console.log(tokenList)
//     for (let i = 0; i < tokenList.length; i++) {
//       const token = tokenList[i]
//       const prevToken = tokenList[i - 1]
//       const nextToken = tokenList[i + 1]

//       switch (token) {
//         case '+': {
//           result += prevToken + nextToken
//           console.log('+')
//           console.log(prevToken)
//           console.log(nextToken)
//           console.log(result)
//           break;
//         }
//         case '-': {
//           result += prevToken - nextToken
//           console.log('-')
//           console.log(prevToken)
//           console.log(nextToken)
//           console.log(result)
//           break;
//         }
//       }
//     }
//     console.log('\n')
//     return result
//   }
// }
// console.log(new ExpressionProcessor().calculate("1+2+3-y")) 

// -------------------------------
// class Node
// {
//   constructor(value, left=null, right=null)
//   {
//     // todo
//     this.value = value
//     this.left = left
//     this.right = right
//   }

//   * preorder()
//   {
//     // todo
//   }
// }

// -------------------------------
// class Mediator {
//   // todo
//   constructor(participant) {
//     this.participants = []
//     this.participants.push(participant);
//   }

//   //   join(participant) {
//   //       this.participants.push(participant)
//   //   }
// }

// class Participant {
//   constructor(mediator, name) {
//     // todo
//     this.initialValue = 0
//     this.mediator = mediator
//     this.name = name
//   }

//   say(n) {
//     // todo
//     for (let participant of this.mediator.participants) {
//       if (participant.name !== this.name) {
//         participant.initialValue = n
//       }
//     }
//   }
// }
// ----------------------------------------------------------------
// class Token {
//   constructor(value = 0) {
//     this.value = value;
//   }
// }

// class Memento {
//   constructor() {
//     this.tokens = [];
//   }
// }

// class TokenMachine {
//   constructor() {
//     // todo
//     this.changes = [];
//     this.current = 0;
//   }

//   addTokenValue(value) {
//     return this.addToken(new Token(value));
//   }

//   addToken(token) {
//     // todo
//     con new Memento().tokens.push(token)
//   }

//   revert(m) {
//     // todo
//   }
// }

// -------------------------------
// class Event
// {
//   constructor()
//   {
//     this.handlers = new Map();
//     this.count = 0;
//   }

//   subscribe(handler)
//   {
//     this.handlers.set(++this.count, handler);
//     return this.count;
//   }

//   unsubscribe(idx)
//   {
//     this.handlers.delete(idx);
//   }

//   // 1) who fired the event?
//   // 2) additional data (event args)
//   fire(sender, args)
//   {
//     this.handlers.forEach(
//       (v, k) => v(sender, args)
//     );
//   }
// }
// class Game
// {
//     // todo
// }

// class Rat
// {
//   constructor(game)
//   {
//     // todo
//   }

//   die()
//   {
//     // todo
//   }
// }
// -------------------------------
// class CombinationLock {
//   constructor(combination) {
//     this.combination = combination;
//     this.reset();
//     this.count = 0

//     // todo
//   }

//   reset() {
//     // reset lock state here
//     this.status = 'LOCKED';
//   }

//   enterDigit(digit) {
//     this.count++;
//     // set this.status depending on state of the lock
//     // console.log(this.combination.join(''))
//     if (this.status === 'LOCKED') {
//       this.status = `${digit}`
//     } else {
//       this.status += digit
//       if (this.count === this.combination.length) {

//         if (this.status === this.combination.join('')) {
//           this.status = 'OPEN'
//         } else {
//           this.status = 'ERROR'

//         }
//       }
//     }
//   }
// }

// -------------------------------
// class Creature {
//   constructor(attack, health) {
//     this.attack = attack;
//     this.health = health;
//     this.alive = this.health > 0;
//     this.attackCount = 0;
//     // todo
//   }
// }

// class Game {
//   constructor(damageStrategy) {
//     this.damageStrategy = damageStrategy;
//   }

//   springTrapOn(creature) {
//     this.damageStrategy.damage(creature);
//     return creature.alive;
//   }
// }

// class DamageStrategy {
//   damage(creature) {
//     if (creature.health <= 0) {
//       creature.alive = false;
//     }
//   }
// }

// class ConstantDamageStrategy extends DamageStrategy {
//   damage(creature) {
//     // todo
//     if (creature.attackCount < 1) {
//       creature.health -= 1
//       creature.attackCount++;
//     }
//   }
// }

// class GrowingDamageStrategy extends DamageStrategy {
//   damage(creature) {
//     // todo
//     creature.health -= ++creature.attackCount
//     // creature.attackCount++

//   }
// }
// GrowingDamageStrategy.impact = {};

// let c1 = new Creature(5, 5)
// let cds = new ConstantDamageStrategy()
// let gds = new GrowingDamageStrategy()
// let game1 = new Game(cds)
// let game2 = new Game(gds)

// game1.springTrapOn(c1)
// console.log(c1)

// game1.springTrapOn(c1)
// console.log(c1)

// console.log("Growing")

// game2.springTrapOn(c1)
// console.log(c1)

// game2.springTrapOn(c1)
// console.log(c1)
// -------------------------------
class Creature {
  constructor(attack, health) {
    this.attack = attack;
    this.health = health;
  }
}

class CardGame {
  constructor(creatures) {
    this.creatures = creatures;
  }

  // returns index of winner if there's a winner
  // returns -1 if there's no winner (both alive or both dead)
  combat(creature1index, creature2index) {
    let first = this.creatures[creature1index];
    let second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    let firstAlive = first.health > 0;
    let secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return -1;
    return firstAlive ? creature1index : creature2index;
  }

  hit(attacker, defender) {
    throw new Error('Please implement this in inheritors');
  }
}

class TemporaryCardDamageGame extends CardGame {
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    // todo
  }
}

class PermanentCardDamageGame extends CardGame {
  constructor(creatures) {
    super(creatures);
  }

  hit(attacker, defender) {
    // todo
  }
}