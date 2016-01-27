import 'babel-polyfill';

/**
 * Mixes given mixins to target class, ensuring methods invocation order same as native React mixins feature.
 * @decorator
 */
export default function (...mixins) {
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