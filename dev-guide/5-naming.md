# Naming convention

## General rules

Use `camelCase` for naming. Exceptions:

- react components: `PascalCase`
- constants: `UPPER_SNAKE_CASE`
- css classes: `kebab-case`

Event handler props should be named as `on<EventName>`. Example: `onClick`.

## CSS class naming

We use BEM naming convention [More Info](bem.info/methodology/naming-convention/)

For example, we have a component `UserInfo` containing root element with class `user-info` and nested element containing user name.
In this case class name `name` would be enough for this nested element. No need to add parent class name as a prefix like this: `user-info__name`.

```
const UserInfo = ({ name }) => (
  <div className={cx('user-info')}>
    <div className={cx('user-info__name')}>{name}</div>
  </div>
);
```

It is preferred to have a class name for the root element the same as a component's name, but it is not required.

## File naming

All files (except icons) should be named in `kebab-case`.

Files with tests should be named as `<fileName>.test.js`. For example if you have a file `my-super-function.js`, file with tests should be named `mySuperFunction.test.js`.

Files with storybook stories should be named in the following way: `<componentFileName>.stories.jsx`.

SVG icons should be named in dash notation. To use them in JSX, the `-inline` postfix should be added. For example: `arrow-down-inline.svg`.
