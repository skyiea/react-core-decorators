import React, { Component } from 'react';
import { shallow } from 'enzyme';

import mixin from './mixin';

it('renders without crashing when no mixins are passed to decorator', () => {
    @mixin()
    class App extends Component {
        render() {
            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);
});

it('renders without crashing whe empty mixin passed to decorator', () => {
    const mix = {};

    @mixin(mix)
    class App extends Component {
        render() {
            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);
});

it('checks whether mixin is applied and if *this* context is correct', () => {
    const mix = {
        mixedMethod() {
            return 1;
        },
        getThis() {
            return this;
        }
    };

    @mixin(mix)
    class App extends Component {
        render() {
            return (
                <section>
                    App
                </section>
            );
        }
    }

    const wrapper = shallow(<App/>);

    expect(wrapper.instance().mixedMethod).toBeDefined();
    expect(typeof wrapper.instance().mixedMethod).toEqual('function');
    expect(wrapper.instance().mixedMethod()).toEqual(1);
    expect(wrapper.instance().getThis()).toEqual(wrapper.instance());
});

it('ensures both original method with same name (as in mixin) and mixin method will be called in proper order', () => {
    let originalCallTimeStamp;
    let mixedCallTimeStamp;

    const originalFn = jest.fn(() => originalCallTimeStamp = Date.now());
    const mixedFn = jest.fn(() => mixedCallTimeStamp = Date.now());

    const mix = {
        componentWillMount() {
            mixedFn();
        }
    };

    @mixin(mix)
    class App extends Component {
        componentWillMount() {
            originalFn();
        }

        render() {
            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);

    expect(originalFn).toHaveBeenCalled();
    expect(mixedFn).toHaveBeenCalled();
    expect(mixedCallTimeStamp).toBeLessThanOrEqual(originalCallTimeStamp);
});