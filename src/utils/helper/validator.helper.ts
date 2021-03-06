/**
 * Verified Is Not Empty
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown} param - param compare
 * @since 2021.01.24
 */
export const VerifiedIsNotEmpty = (param: unknown): boolean =>
  [undefined, null, ``].filter((item: unknown) => param === item).length === 0;

/**
 * Verified Is Not Null
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown} param - param compare
 * @since 2021.01.24
 */
export const VerifiedIsNotNull = (param: unknown): boolean =>
  [undefined, null].filter((item: unknown) => param === item).length === 0;

/**
 * Bulk Verified Is Not Empty
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown[]} param - param compare
 * @since 2021.01.24
 */
export const BulkVerifiedIsNotEmpty = (param: unknown[]): boolean =>
  param.filter((item) => !VerifiedIsNotEmpty(item)).length === 0;

/**
 * Bulk Verified Is Not Null
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown[]} param - param compare
 * @since 2021.01.24
 */
export const BulkVerifiedIsNotNull = (param: unknown[]): boolean =>
  param.filter((item) => !VerifiedIsNotNull(item)).length === 0;
