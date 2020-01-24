export type ComponentPropsType<F extends Function> = F extends (arg: infer A) => any ? A : never;
