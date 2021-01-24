/**
 * Verified Is Not Empty
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown} param - param compare
 * @since 2021.01.24
 */
export const VerifiedIsNotEmpty = (param: unknown): boolean =>
  [undefined, null, ``].filter((item: unknown) => param === item).length === 0;
