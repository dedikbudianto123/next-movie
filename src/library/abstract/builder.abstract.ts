import { IBuilder } from './interface/builder.interface';

/**
 * Builder Abstract
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
abstract class BuilderAbstract<Output> implements IBuilder<Output> {
  abstract execute(): Output;
}

export default BuilderAbstract;
