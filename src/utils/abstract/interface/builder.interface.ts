/**
 * Builder Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
export interface IBuilder<Output> {
  execute(): Output;
}
