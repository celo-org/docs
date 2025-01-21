import React, { useEffect } from "react";

/**
 * Copyright (c) Facebook, Inc. and its affiliat  es.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import { BlogCard } from "@site/src/components/Blog/BlogCard";
import Layout from "@theme/Layout";
import { useLocation } from "react-router-dom";
import { blogs } from "./blogs";

const TITLE = translate({ message: "Celo Documentation" });
const DESCRIPTION = translate({
  message:
    "Build decentralized applications that create the conditions for prosperity — for everyone.",
});
const EDIT_URL = "/developer/deploy";

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const { scrollTopPosition, focusedElementId } = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({ top: scrollTopPosition });
}

export default function HomePage(): JSX.Element {
  const location = useLocation<UserState>();
  useEffect(() => {
    restoreUserState(location.state);
  }, [location]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CeloOrg" />
        <meta name="twitter:title" content="Celo Documentation" />
        <meta
          name="twitter:description"
          content="Build decentralized applications that create the conditions for
              prosperity — for everyone."
        />
        <meta
          name="twitter:image"
          content="https://github.com/celo-org/docs/blob/main/static/img/preview.png?raw=true"
        />
      </Head>
      <main className="min-h-screen bg-fig text-white relative">
        <section className="relative py-20 px-4  m-4 rounded-lg hidden md:block">
          <div className="max-w-7xl mx-auto">
            <p
              className={`text-5xl md:text-6xl lg:text-7xl font-advercase mb-16 text-center text-white`}
            >
              All blogs
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
