import Cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Cors Function Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @description add this interface cause in d.ts not available
 * @since 2021.01.25
 */
export type ICorsFunction<T = Cors.CorsRequest> = (
  req: T,
  res: {
    end(): any;
    setHeader(key: string, value: string): any;
    statusCode?: number;
  },
  next: (err?: any) => any
) => void;

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
