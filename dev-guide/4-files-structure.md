# Files structure

`/dev-guide/` - developers guide.<br>

`/src/` - application sources:

- `/src/common/` - common constants, common css, css variables, fonts, images, icons, polyfils, urls.
- `/src/components/` - common, reusable components base.
- `/src/layouts/` - application layouts.
- `/src/pages/` - main development area. Contains project pages.
- `/src/routes/` - router configuration.
- `src/utils` - for common utils

> ##### All common components or presentational components should have following structure:
>
> ```
> ├── componentName
> │   ├── component-name.tsx
> │   ├── component-name.scss
> │   ├── index.ts (with component's export)
> │   ├── constants.ts (if component has local constants, which are used several times by sub components)
> │   └── sub-component-folder (if has)
> │       └── ...
> ```
