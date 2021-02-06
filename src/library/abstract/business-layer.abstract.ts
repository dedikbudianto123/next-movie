import { IBussinessLayer } from './interface';

/**
 * Business Layer Abstract
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
abstract class BusinessLayerAbstract<O, P> implements IBussinessLayer<O, P> {
  public param: P;

  constructor() {
    this.setParameter = this.setParameter.bind(this);
    this.generateData = this.generateData.bind(this);
    this.execute = this.execute.bind(this);
  }

  /**
   * Set Parameter
   * @param {P} parameter - parameter apps
   * @returns {void}
   */
  setParameter(parameter: P): this {
    this.param = parameter;

    return this;
  }

  abstract generateData(): Promise<O>;

  /**
   * Execute Builder
   */
  public execute(): Promise<O> {
    const { generateData } = this;

    return generateData();
  }
}

export default BusinessLayerAbstract;
