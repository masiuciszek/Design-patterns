# design principles in JS/TS

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Tools](#tools)
- [Proto](#proto)
- [OPP](#opp)
- [Module-Pattern](#module-pattern)
- [MVC](#mvc)
- [Singleton](#singleton)
- [Observer](#observer)
- [Mediator](#mediator)

## About <a name = "about"></a>

A simple example of using a OOP design in Typescript.
How does the _new_ keyword works and how _this_ keyword is used when working with a more _OOP_ code paradigm.

## Getting Started <a name = "getting_started"></a>

```bash
  $ git clone <URL>

  $ cd into project

  npm/yarn install

```

to run the code in the browser simply run

```bash
  $ npm run build-run
```

and refresh the page

Have fun !✌🏻ƛ🤩

## What is the `new` keyword doing for us when constructing a new object?

**The new keyword will insert a bunch of different stuff for us, 3 main things!**

- **this** will be bound to a empty object. Create a empty object and assign to this
- sets a hidden property which is **underscore underscore proto underscore underscore** sometime call _dunder proto_
- final thing it will automatically return out object from the function

## <a name = "proto" ></a> **\_\_proto\_\_\_**

What is going on when we call a method that does not exists on the object itself but we declared the method on the prototype like this:

```js
  function User(name.age){
    this.name = name
    this.age = age
  }

  const u1 = new User("bob",21)

  User.prototype.birthday = function(){
    this.age++
  }

```

You will probably think it will go straight forward to the prototype but that's not how Javascript works.
It will _panic_ for a bit when it can't find the method itself on the `u1` object.
Luckily javascript has something that calls `dunder proto` which then will go and check if the `birthday` method actually exists on the `User.prototype` and then call the `birthday method`.

[\_\_proto\_\_ vs prototype](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

**proto** is also automatically created when a function is created and that is o what JavaScript will use to look up methods it doesn't find immediately on the current prototype.

```js
function foo() {}

foo.name = "bar"
console.log(foo.name) // foo
foo.prototype.age = 21
console.log(foo.prototype) // foo {age:21}
```

If you want to get deeper on how `OOP` works in _Javascript_ I highly recommend to read [Kyle Simpsons](https://github.com/getify/You-Dont-Know-JS)

## Module pattern <a name = "module-pattern"></a>

Javascript does not have the typical 'private' and 'public' like the more popular OOP language like `java` ore `C#`. However, you can achieve the same effect using clojure's in javascript and `module pattern` using function-level scoping.
The Module pattern is a powerful tool to use to achieve the result that we want to hide or data(`data hiding`) layer like we do in `java` or `c#`.

The main goal is to hide all data until we really need to use the data.

To avoid exposing your top-level function to the global scope we wrap our function inside a `IFFE` **immediately-invoked function expression.**

Here is the score example:

```ts
export const game = (() => {
  let score = 0

  // Private
  const updateScore = (newScore: number) => {
    score = newScore
    const countTracker = document.getElementById("count-tracker") as HTMLHeadingElement
    countTracker.innerHTML = ` <span>${score}</span> `
  }

  const increment = () => {
    updateScore(score + 1)
  }
  const decrement = () => {
    updateScore(score - 1)
  }

  const getScore = () => {
    console.log(score)
    return score
  }

  const newGame = () => updateScore(0)

  const startGame = () => {
    newGame()
  }

  // This will be a private method
  const somePrivateFunc = () => {
    console.log("SCORE", score)
  }

  /* Variables and functions that we would like to expose */
  return {
    score,
    increment,
    getScore,
    startGame,
    decrement,
    newGame,
  }
})()
```

we will keep our methods `public` ore `private` depending on how we want the structure/functionality to be.
For example the methods that gets return from the function will work as `public` methods while methods that are not return will work as a `private method`

## Model View Controller <a name = "mvc"></a>

MVC is a very common pattern for organizing your code.
It's used in different frameworks and it helps you to organize your code in a good way.

`MVC` stands for _Model - View - Controller_.

- **Model** Manages the data of an application
- **View** A visual representation of the model
- **Controller** works like the middleman that talks to the Model and View. You use the controller to access the View ore the Model. The View and Model can't talk each other.

The model is the data. handle the logic and methods that will make the UI change.

The view is how the data is displayed. Mount to the _DOM_ and renders the given `UI`.

The controller connects the model and the view.
The model never touches/talks to the view. The view never touches/talks to the model. The controller connects them and controls the together.

## Singleton <a name = "singleton"></a>

Singleton is implemented by creating a class with a method that creates an instance if there is not already one.
If there is an instance of the class, the method returns a reference of that object. To prevent the creation of multiple instances, you could check if there is a instance of the class.

The idea with a singleton class is that in the program there will only be one and only one instance of the class and that the user of the class does not need to know when it is created. The singleton class is created the first time someone asks for a reference to the class.
A singleton is known as you probably heard `global`, downside with this is that is available throughout the code base, it can be overused,and really hard to track while your application scales in size.
It is also harder to test a `singleton` object. Think for yourself when you have a lot of different objects that use the same `singleton`.

<img src="./singleton.png" />

```ts
class Logger {
  private static instance: Logger
  logs: string[] | undefined

  constructor() {
    if (!Logger.instance) {
      this.logs = []
      Logger.instance = this
    }
    return Logger.instance
  }

  addLog(log: string): void {
    if (this.logs) {
      this.logs.push(log)
    }
  }

  get size() {
    if (this.logs) {
      console.log(this.logs.length)
      return this.logs.length
    }
  }
  get allLogs() {
    if (this.logs) {
      console.log(this.logs)
      return this.logs
    }
  }

  pop() {
    if (this.logs) {
      this.logs.pop()
    }
  }
}

const logger = new Logger()
Object.freeze(logger)
export { logger }
```

## Observer <a name = "observer"></a>

The `Observer Pattern` is a very popular design pattern that are used across a lot of Javascript applications.
Mostly of the famous Javascript frameworks/libraries using this pattern in some way.
Let's take `React` for example, when you will often hear the term `state/update state`, `render`, `mount`.
When state s updated the component will re-render, components in `react` are just a representation of what the interface should look like.

**Application state**
For example, maybe you have a application/program that displays a list of users that get fetched from a external API.
When the app loads, it makes sense to make the API call once and store the data somewhere, in this case the `state`.
The app could then render based on changes to its state. So if the the state changes we should update our view interface and based on our new state.
_According to Wikipedia_

> The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.

The observer pattern defines a one-to-many relationship. When one object updates,
it should notify all the objects that the updated object has been updated.

- subject – This is the object that will send out a notification to all of the ‘observers’ that will get notified if the subject has been updated.In this case, the subject will be the application state.

- observers – These are the objects that want to know when the subject('state') has changed. In this case, these will be for example the page elements that need to update when the application state changes.

## Mediator <a name = "mediator"></a>

The Mediator pattern is another common and very useful pattern to take advantage of.
The `Mediator` introducing a one-to-many flow between objects.
One good example of where you can see where the `Mediator` pattern is used is the `DOM` itself, I thinking about the root `Document`.

## Tools <a name = "tools"></a>

- Typescript
- Webpack
