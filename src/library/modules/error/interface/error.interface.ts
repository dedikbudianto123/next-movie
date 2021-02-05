/**
 * Error Apps Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.02
 */
export interface IErrorApps {
  code: number;
  message: string;
  stack?: string;
}
