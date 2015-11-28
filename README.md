# Core ES7 decorators for React project

Useful decorators for React project, which uses ES6(ES2015) classes approach to declare React components.

## Installation

```
npm i react-core-decorators
```

## Usage

Currently next decorators are provided:

### InheritStatic

ES6 classes allow to use inheritance approach to separate concerns between different React component. But each class
overrides static properties of super class, which can cause unwanted effect (`propTypes` won't be checked, `context`
won't work, etc).
Using this decorators will provide proper inheritance of predefined set of static members from super class including
merging them with target class static members.

### HandleRenderError

Prevents React from failing to render whole application because of one Component error. Shows useful stack trace to
facilitate debugging process.

### ReactClass

Comprises *InheritStatic* and *HandleRenderError* decorators.

```javascript
@ReactClass
class Button extends React.Component { ... }
```