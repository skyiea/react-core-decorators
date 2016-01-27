/**
 * Inherits predefined set of static members from super class including merging them with target class static members
 * @decorator
 * @param {Class} targetClass
 */
export default function (targetClass) {
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