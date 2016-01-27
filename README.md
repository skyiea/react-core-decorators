# Core decorators for React project

Useful decorators to be utilized in React projects with ES6(ES2015) class approach to declare React components.

## Installation

```
npm i react-core-decorators -S
```

## Usage

At the moment next decorators are provided:

### mixin

Using old-school approach to create React components (`React.createClass({...}`) it was possible to use 
[mixins](https://facebook.github.io/react/docs/reusable-components.html#mixins), while if you are using 
[es6-classes](https://facebook.github.io/react/docs/reusable-components.html#es6-classes) approach then unfortunately
there is [no way to do that natively](https://facebook.github.io/react/docs/reusable-components.html#no-mixins).
Using this decorator it becomes possible again:

```javascript
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { mixin } from 'react-core-decorators';

@mixin(PureRenderMixin)
class Button extends React.Component { ... }
```

### InheritStatic

ES6 classes allow to use inheritance approach to separate concerns between different React component. But each class
overrides static properties of super class, which can cause unwanted effect as is not obvious(`propTypes` won't be
checked, `context` won't work, etc).
Using this decorator will provide proper inheritance of predefined set of static members from super class including
merging them with target class static members.

### HandleRenderError

Prevents React from failing to render whole application because of one Component error. Shows useful stack trace to
facilitate debugging process.

### ReactClass

Basic decorator which is recommended to use in all React components.
At the time it comprises *InheritStatic* and *HandleRenderError* decorators.

```javascript
@ReactClass
class Button extends React.Component { ... }
```