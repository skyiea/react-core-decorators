# Core decorators for React project

Useful decorators that could be utilized in React projects which use class-based 
definition of React components. (Keep in mind that decorators can't be used to
decorate [Stateless React Components](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components)).
To get more familiar with decorators pattern and its usage in ES6 read [this great article](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841).

## Installation

```
npm i react-core-decorators -S
```

## Usage

Next decorators are present:

### mixin

Earlier while using old-fashion approach to create React components (`React.createClass({...}`) it was 
possible to use so called "mixins". At the moment, if you are defining your component as 
[ES6 classes](https://facebook.github.io/react/docs/reusable-components.html#es6-classes)
there is no way to use mixins natively. While usually you [don't need to use them](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)
there are still some cases when you want to have them in hand.
Usage is pretty straight-forward:

```javascript
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { mixin } from 'react-core-decorators';

@mixin(PureRenderMixin)
class Button extends React.Component { ... }
```

#### Signature
`function mixin(Mixin[, Mixin][, Mixin]..) { ... }`

*Mixin* - plain object with methods that should be added/chained to original class.
You can pass multiple mixins (as multiple arguments). If mixin inclues method which is
also present in other mixin or in original class prototype then they will be chained and called
with proper context (*this*) in next order: *Mixin1 -> Mixin2 -> ... -> Class prototype*.

### noRenderError

React is designed in such a way that if one component fails to render (uncaught exception 
within `render` method) whole app won't be rendered:
 
 ```javascript
class App extends React.Component {
    render() {
        return (
            <section>
                Header
                <Body/>
                Footer
            </section>
        );
    }
};

class Body extends React.Component {
    render() {
        throw new Error();
        
        return (
            <section>Body</section>
        );
    }
};
 ```

In the example above header and footer won't be rendered due to an error inside Body 
component render method.
To avoid above-mentioned global impact of single component on application rendering in whole use 
this decorator in next fashion:

```javascript
import { noRenderError } from 'react-core-decorators';

@noRenderError()
class Body extends React.Component {
...
```

In addition this decorator shows useful stack trace to facilitate debugging process (in earlier React versions
there was no easy way to understand which Component failed to render).

#### Signature
`function noRenderError(ErrorScreen) { ... }`

(optional) *ErrorScreen* - React Component which should be rendered instead of failed Component.
It will be supplied with `errorComponentName` property, which is class name of failed Component.
If omitted default Error Screen will be used.
(Be aware, that your custom ErrorScreen component should be decorated as well, if you want to be sure
it won't break rendering flow in case of error within itself).

```javascript
@noRenderError()
class CustomErrorScreen extends React.Component {
    render() {
        const {
            errorComponentName
        } = this.props;
        
        return (
            <div>Oops, {errorComponentName} failed to render</div>
        );
    }
}

@noRenderError(CustomErrorScreen)
class Body extends React.Component {
```

Worth noting that you can't just put this decorator on some Component and expect that any errors
in Child components will be handled automatically - you need to use it directly for each Child 
component.