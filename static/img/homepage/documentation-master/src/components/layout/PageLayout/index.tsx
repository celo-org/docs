// Created this Layout to have a Custom Head on the LandingPage

import React, { ComponentProps } from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import { ToastContainer } from 'react-toastify';
import Head from '@docusaurus/Head';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { defineConfig, normalizeArray } from '@agile-ts/utils';

type Props = {
  canonical?: string;
  color?: string;
} & ComponentProps<typeof Layout>;

interface MetaType {
  title: string;
  description: string;
  image: string;
  color: string;
  keywords: string[];
}

const PageLayout: React.FC<Props> = (props) => {
  const { children, noFooter, wrapperClassName, permalink } = props;
  const { siteConfig } = useDocusaurusContext();
  const {
    favicon,
    title: siteTitle,
    url: siteUrl,
    customFields: { meta: defaultMetaConfig },
  } = siteConfig;
  const meta: MetaType = defineConfig(
    {
      title: props.title,
      description: props.description,
      image: props.image,
      color: props.color,
      keywords: normalizeArray(props.keywords),
    },
    defaultMetaConfig,
    true
  ) as any;
  const canonical = props.canonical || ''; // https://de.ryte.com/wiki/Canonical_Tag
  const finalTitle = `${siteTitle} - ${meta.title}`;
  const metaImageUrl = useBaseUrl(meta.image, { absolute: true });
  const metaFaviconUrl = useBaseUrl(favicon);

  return (
    <LayoutProviders>
      <Head>
        <meta name={'environment'} content={'production'} />

        {/* Name */}
        <meta name={'site_name'} content={siteTitle} />
        <meta name={'application-name'} content={siteTitle} />

        {/* Title */}
        {finalTitle && <title>{finalTitle}</title>}
        {finalTitle && <meta property="og:title" content={finalTitle} />}
        {finalTitle && <meta name="twitter:title" content={finalTitle} />}

        {/* Keywords */}
        {meta.keywords.length > 0 && (
          <meta name="keywords" content={meta.keywords.join(',')} />
        )}

        {/* Color */}
        {meta.color && <meta name="theme-color" content={meta.color} />}

        {/* Icon */}
        {favicon && <link rel="shortcut icon" href={metaFaviconUrl} />}

        {/* Permalink */}
        <link rel="canonical" href={`${siteUrl}${permalink || canonical}/`} />
        <meta
          property="og:url"
          content={`${siteUrl}${permalink || canonical}/`}
        />
        <meta property={'forem:domain'} content={'agile-ts.org'} />

        {/* Description */}
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.description && (
          <meta property="og:description" content={meta.description} />
        )}
        {meta.description && (
          <meta name="twitter:description" content={meta.description} />
        )}

        {/* Image */}
        {meta.image && <meta property="image" content={metaImageUrl} />}
        {meta.image && <meta property="og:image" content={metaImageUrl} />}
        {meta.image && <meta name="twitter:image" content={metaImageUrl} />}
        {meta.image && <meta name="twitter:image:src" content={metaImageUrl} />}
        {meta.image && (
          <meta
            name="twitter:image:alt"
            content={`Image for "${meta.title}"`}
          />
        )}
        {/* Makes Image Large */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Creator */}
        <meta name={'twitter:creator'} content={'@agiletypescript'} />

        <noscript>This site runs best with JavaScript enabled</noscript>
        <link rel={'sitemap'} type={'application/xml'} href={'/sitemap.xml'} />
      </Head>

      <ToastContainer />
      <AnnouncementBar />
      <Navbar />

      <div className={clsx(styles.Wrapper, wrapperClassName)}>{children}</div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
};

export default PageLayout;
