import { IBuilder as Base } from './builder.interface';

/**
 * Business Default Layer Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.06
 */
export type IDefaultBussinessLayer<O> = IBusinessLayerOutput<O>;

/**
 * Business Layer Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.06
 */
export interface IBussinessLayer<O, P> extends IDefaultBussinessLayer<O> {
  generateData(): Promise<O>;
  param?: P;
  setParameter(param: P): IDefaultBussinessLayer<O>;
}

/**
 * Business Layer Output Type
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.06
 */
export type IBusinessLayerOutput<Output> = Base<Promise<Output>>;
