import * as React from "react";
import Head from "next/head";

export interface SeoData {
  title: string;
  desc: string;
  url: string;
  thumbnail: string;
}
export interface SeoProps {
  data: SeoData;
}

export function Seo({ data }: SeoProps) {
  const { desc, thumbnail, title, url } = data;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={desc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={thumbnail} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={thumbnail} />
    </Head>
  );
}
