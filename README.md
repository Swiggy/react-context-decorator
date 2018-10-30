# @swiggy/react-context-decorator

A [React](https://reactjs.org/docs/context.html) utility function to decorate a component with context, similar to how [react-redux](https://redux.js.org/basics/usagewithreact#implementing-container-components) works.

You might want to look into upcoming experimental `useContext` [React Hook](https://reactjs.org/docs/hooks-reference.html#usecontext) which might solve the problem in much more elegant way.

## Installation

```bash
npm install @swiggy/react-context-decorator
```

## Motivation

While [render props](https://reactjs.org/docs/render-props.html) pattern is a cool way to get data out
from a Component, it can be quite messy to use. [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) tend to keep code less messy, but have their own issues. However, we feel that it would've been a nightmare if [Redux](http://redux.js.org/) never shipped with `connect` (part of [react-redux](https://redux.js.org/basics/usagewithreact#implementing-container-components)) and asked the user to rely on Render props everywhere. Similar to `connect`, `decorateWithContext` makes it easier to `mapContextToProps` and escape from render prop hell.

## Usage

[View](https://codesandbox.io/s/m7oy367ky) on CodeSandbox.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { decorateWithContext } from "@swiggy/react-context-decorator";

/*
This is how our component heirarchy is

<App /> (has the context value) 
|
|_<Content />
  |
  |_<Profile />
      |
      |_<MyGreeting />
      |  |
      |  |_<Greeting /> (context.name -> props.name)
      |
      |_<MyAge />
        |
        |_<Age /> (context.age -> props.age)

Instead of passing props from App -> Content -> Profile -> Greeting,
we would make use of React's context API to directly pass it from App to Greeting.
*/

// Create context using new Context API
const MyContext = React.createContext({ name: "", age: 0 });

// Decorate with `MyContext`
const withMyContext = decorateWithContext(MyContext);

// Your Component that would receive context value in props
const Greeting = props => <h1>Hello {props.name}!</h1>;

// Pick `name` from the context
const withName = withMyContext(context => ({ name: context.name }));

// Decorated component
const MyGreeting = withName(Greeting);

// Your Component that would receive context value in props
const Age = props => <p>Your age is {props.age}.</p>;

// Pick `age` from the context
const withAge = withMyContext(context => ({ age: context.age }));

// Decorated component
const MyAge = withAge(Age);

const Profile = props => (
  <React.Fragment>
    <MyGreeting />
    <MyAge />
  </React.Fragment>
);

const Content = props => (
  <div>
    <Profile />
  </div>
);

class App extends React.PureComponent {
  state = {
    age: 0,
    name: ""
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <input
          type="text"
          placeholder="Enter your name"
          value={this.state.value}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={this.state.age}
          onChange={e => this.setState({ age: e.target.value })}
        />
        <Content />
      </MyContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Contributions

Feel free to report [issues](/issues/new) or raise [pull requests](/pulls/new).
