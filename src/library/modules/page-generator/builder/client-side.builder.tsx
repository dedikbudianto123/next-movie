import { FC, memo } from 'react';

import BuilderAbstract from '@/library/abstract/builder.abstract';
import {
  IClientSideHandler,
  IClientSideHandlerHOC
} from '@/library/modules/page-generator/interface';

/**
 * Client Side Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
class ClientSideBuilder<T> extends BuilderAbstract<FC<T>> {
  private handler: IClientSideHandler[] = [];

  private Component: FC<T>;

  constructor(component: FC<T>) {
    super();

    this.Component = memo(component);
    this.generateComponent = this.generateComponent.bind(this);
    this.execute = this.execute.bind(this);
  }

  /**
   * Register Handler
   * @param {IClientSideHandler} handler - handler type
   * @returns {ClientSideBuilder}
   */
  public registerHandler(fn: FC, isHOC = false, isWrapper = false): this {
    this.handler.push({
      fn: isHOC ? fn : memo(fn as FC),
      isHOC,
      isWrapper
    });

    return this;
  }

  /**
   * Generate Component
   * @return {FC<T>}
   */
  private generateComponent(): FC<T> {
    const { Component, handler } = this;
    const temp = Component;

    const response = handler.reduce(
      (CurrentComponent, { fn, isHOC, isWrapper }) => {
        if (isHOC) {
          return (fn as IClientSideHandlerHOC)(CurrentComponent);
        }

        if (isWrapper) {
          const NextComponent = fn as FC;
          return (props) => (
            <NextComponent {...props}>
              <CurrentComponent {...props} />
            </NextComponent>
          );
        }

        const NextComponent = fn as FC;
        return (props) => (
          <>
            <NextComponent {...props} />
            <CurrentComponent {...props} />
          </>
        );
      },
      temp
    );

    return response;
  }

  /**
   * Execute
   * @returns {FC<T>}
   */
  execute(): FC<T> {
    const { generateComponent } = this;

    return generateComponent();
  }
}

export default ClientSideBuilder;
