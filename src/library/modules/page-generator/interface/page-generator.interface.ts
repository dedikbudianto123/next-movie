import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { IDefaulError500Props } from '@/app/views/error-500/interface';
import { IDefaultPageProps } from '@/library/interface/general';

/**
 * Default Server Side Props
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export type IDefaultServerSideProps = IDefaultPageProps | IDefaulError500Props;

/**
 * Page Generator Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.02.05
 */
export interface IPageGenerator {
  Component: FC;
  fn: GetServerSideProps<IDefaultServerSideProps>;
}
