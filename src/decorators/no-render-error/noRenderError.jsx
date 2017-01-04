import React from 'react';

const DefaultErrorScreen = ({ errorComponentName }) => (
    <div>"{errorComponentName}" component failed to render</div>
);

export default function (ErrorScreen = DefaultErrorScreen) {
    return function (targetClass) {
        const proto = targetClass.prototype;

        if (proto.hasOwnProperty('render')) {
            const originalRender = proto.render;

            proto.render = function (...args) {
                try {
                    return originalRender.apply(this, args);
                } catch (error) {
                    console.error(`"${targetClass.name}" component failed to render: ${error.stack}`);

                    return <ErrorScreen errorComponentName={targetClass.name}/>;
                }
            };
        }
    };
}