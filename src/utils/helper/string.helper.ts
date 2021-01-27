/**
 * Validate Number And Parsed To Integer
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {unknown} number - parameter for parsing this method
 * @since 2021.01.24
 */
export const ValidateNumberAndParsedToInteger = (number: unknown): number => {
  if (
    typeof number === `number` ||
    typeof number === `bigint` ||
    /^-?\d*(\.\d+)?$/.test(`${number}`)
  ) {
    return parseInt(`${number}`, 10);
  }

  return 0;
};

/**
 * Object To String
 * @author Irfan Andriansyah <irfan@99.co>
 * @param {Record<string, string>} obj - object classname
 * @since 2021.01.24
 */
export const ObjToString = (obj: Record<string, boolean>): string =>
  Object.keys(obj)
    .filter((item: string) => obj[item])
    .map((item: string) => item)
    .join(` `);
