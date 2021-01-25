import Cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Cors Handler Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.01.25
 */
export type ICorsHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  options?: CorsOptionsDelegate | CorsOptions
) => Promise<any>;

/**
 * Cors Function Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @description add this interface cause in d.ts not available
 * @since 2021.01.25
 */
export type ICorsFunction<T = Cors.CorsRequest> = (
  req: T,
  res: {
    statusCode?: number;
    setHeader(key: string, value: string): any;
    end(): any;
  },
  next: (err?: any) => any
) => void;
