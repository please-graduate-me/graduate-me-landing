import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

/** 서버 기능 없이 Cloudflare Pages용 정적 파일을 생성한다. */
export default withVanillaExtract(config);
