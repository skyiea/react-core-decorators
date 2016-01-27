import 'babel-polyfill';

import React from 'react';

/**
 * Prevents React from failing to render whole application because of one Component error. Shows useful stack trace to
 * facilitate debugging process.
 * @decorator
 * @param {Class}   targetClass
 */
export default function HandleRenderError(targetClass) {
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