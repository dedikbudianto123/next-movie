import { FC } from 'react';

/**
 * Client Side Handler Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export interface IClientSideHandler {
  fn: IClientSideHandlerType;
  isHOC?: boolean;
  isWrapper?: boolean;
}

/**
 * Client Side Handler HOC
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IClientSideHandlerHOC = (component: FC) => FC;

/**
 * Client Side Handler Type
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IClientSideHandlerType = FC | IClientSideHandlerHOC;
