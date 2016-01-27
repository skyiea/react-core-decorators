import inheritStatic from './inherit-static';
import handleRenderError from './handle-render-error';

/**
 * Base decorator for all classes which extend from React.Component.
 * @decorator
 */
export default function (...args) {
    inheritStatic(...args);
    handleRenderError(...args);
}