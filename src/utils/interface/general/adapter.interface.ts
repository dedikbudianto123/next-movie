/**
 * Adapter Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export type IAdapter<Input, Output> = (input: Input) => Output | undefined;
