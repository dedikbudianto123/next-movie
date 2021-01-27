/**
 * Rating Movie Model Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRating {
  item: IRatingItem[];
}

/**
 * Rating Movie Item Model Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.27
 */
export interface IRatingItem {
  source: string;
  value: string;
}
