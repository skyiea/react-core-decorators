import React from 'react';

/**
 * Inherits predefined set of static members from super class including merging them with target class static members
 * @decorator
 * @param {Class} targetClass
 */
export function InheritStatic(targetClass) {
    const superClass = targetClass.__proto__;

    const propsToInherit = [
        'propTypes',
        'contextTypes',
        'childContextTypes'
    ];

    for (const propName of propsToInherit) {
        if (superClass[propName]) {
            const clonedProp = Object.assign({}, superClass[propName]);

            // IE10 doesn't provide inheritance of classes static properties, hence all static properties are
            // copied throughout inheritance chain
            targetClass[propName] = targetClass[propName] ?
                Object.assign(clonedProp, targetClass[propName]) : clonedProp;
        }
    }
}

/**
 * Prevents React from failing to render whole application because of one Component error. Shows useful stack trace to
 * facilitate debugging process.
 * @decorator
 * @param {Class}   targetClass
 */
export function HandleRenderError(targetClass) {
    const proto = targetClass.prototype;

    if (proto.hasOwnProperty('render')) {
        const originalRender = proto.render;

        proto.render = function (...args) {
            try {
                return Reflect.apply(originalRender, this, args);
            } catch (error) {
                console.error(`Component failed to render: ${error.stack}`);

                return (
                    <div>COMPONENT FAILED TO RENDER</div>
                );
            }
        };
    }
}

/**
 * Base decorator for all classes which extend from React.Component.
 * @decorator
 */
export function ReactClass(...args) {
    InheritStatic(...args);
    HandleRenderError(...args);
}

/**
 * Mixes given mixins to target class, ensuring methods invocation order same as native React mixins feature.
 * @decorator
 */
export function mixin(...mixins) {
    return function (targetClass) {
        const proto = targetClass.prototype;
        const accumulator = {};

        for (const mixin of mixins) {
            for (const key in mixin) {
                const prop = mixin[key];

                if (typeof prop === 'function') {
                    accumulator[key] = accumulator[key] || [];
                    accumulator[key].push(prop);
                }
            }
        }

        for (const key in accumulator) {
            const methods = accumulator[key];
            const originalMethod = proto[key];

            proto[key] = function (...args) {
                let result;

                for (const method of methods) {
                    result = Reflect.apply(method, this, args);
                }

                if (originalMethod) {
                    result = Reflect.apply(originalMethod, this, args);
                }

                return result;
            };
        }
    };
}