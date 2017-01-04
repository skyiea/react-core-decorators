import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import noRenderError from './noRenderError';

const consoleError = console.error;

beforeEach(() => {
    console.error = jest.fn();
});

afterEach(() => {
    console.error = consoleError;
});

it('renders without crashing when no error screen is passed to decorator', () => {
    @noRenderError()
    class App extends Component {
        render() {
            throw new Error();

            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);
    expect(console.error).toHaveBeenCalled();
});

it('renders without crashing when error screen is defined as class', () => {
    class ErrorScreen extends Component {
        render() {
            return (
                <div>Error screen</div>
            );
        }
    }

    @noRenderError(ErrorScreen)
    class App extends Component {
        render() {
            throw new Error();

            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);
    expect(console.error).toHaveBeenCalled();
});


it('renders without crashing when error screen is defined as stateless component', () => {
    const ErrorScreen = () => (
        <div>Error screen</div>
    );

    @noRenderError(ErrorScreen)
    class App extends Component {
        render() {
            throw new Error();

            return (
                <section>
                    App
                </section>
            );
        }
    }

    shallow(<App/>);
    expect(console.error).toHaveBeenCalled();
});

it('renders parent without error while child fails to render', () => {
    @noRenderError()
    class Child extends Component {
        render() {
            throw new Error();

            return (
                <section>
                    App
                </section>
            );
        }
    }

    class Parent extends Component {
        render() {
            return (
                <section>
                    Header
                    <Child/>
                </section>
            );
        }
    }

    mount(<Parent/>);
    expect(console.error).toHaveBeenCalled();
});

it('renders parent partial content while child fails to render', () => {
    @noRenderError()
    class Child extends Component {
        render() {
            throw new Error();

            return (
                <section>
                    App
                </section>
            );
        }
    }

    class Parent extends Component {
        render() {
            return (
                <section>
                    Header
                    <Child/>
                </section>
            );
        }
    }

    const wrapper = mount(<Parent/>);

    expect(wrapper.text()).toContain('Header');
    expect(console.error).toHaveBeenCalled();
});