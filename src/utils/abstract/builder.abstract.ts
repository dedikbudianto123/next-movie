import { BuilderInterface } from './interface/builder.interface';

/**
 * Builder Abstract
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.24
 */
abstract class BuilderAbstract<Output> implements BuilderInterface<Output> {
  abstract execute(): Output;
}

export default BuilderAbstract;
