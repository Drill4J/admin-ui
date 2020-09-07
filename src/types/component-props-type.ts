export type ComponentPropsType<F extends (props: any) => JSX.Element> = F extends (arg: infer A) => any ? A : never;
