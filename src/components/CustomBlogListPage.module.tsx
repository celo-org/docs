/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import React from 'react';

 import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
 import BlogLayout from '@theme/BlogLayout';
 import BlogPostItem from '@theme/BlogPostItem';
 import Translate, {translate} from '@docusaurus/Translate';
 import BlogListPaginator from '@theme/BlogListPaginator';
 import type {Props} from '@theme/BlogListPage';
 import {ThemeClassNames} from '@docusaurus/theme-common';
 
 function BlogListPage(props: Props): JSX.Element {
   const {metadata, items, sidebar} = props;
   const {
     siteConfig: {title: siteTitle},
   } = useDocusaurusContext();
   const {blogDescription, blogTitle, permalink} = metadata;
   const isBlogOnlyMode = permalink === '/';
   const title = isBlogOnlyMode ? siteTitle : blogTitle;
 
   return (
     <BlogLayout
       title={title}
       description={blogDescription}
       wrapperClassName={ThemeClassNames.wrapper.blogPages}
       pageClassName={ThemeClassNames.page.blogListPage}
       searchMetadata={{
         // assign unique search tag to exclude this page from search results!
         tag: 'blog_posts_list',
       }}
       sidebar={sidebar}>
         <h1>Celo Development Tutorials</h1>
         <p>Welcome to our curated list of community tutorials.</p>
        {/* <p><a href="/blog/tags"> Filter posts by tag</a></p> */}
        <a
        className="button button--primary"
        href="/community/guidelines"
        // target="_blank"
        rel="noreferrer">
        <Translate id="showcase.header.button">
         ✍️ Contribute a Tutorial
        </Translate>
        

      </a>
        <div><br></br></div>

       {items.map(({content: BlogPostContent}) => (
         <BlogPostItem
           key={BlogPostContent.metadata.permalink} 
           frontMatter={BlogPostContent.frontMatter}
           assets={BlogPostContent.assets}
           metadata={BlogPostContent.metadata}
           truncated={BlogPostContent.metadata.truncated}
           >
           <BlogPostContent />
         </BlogPostItem>
       ))}
       <BlogListPaginator metadata={metadata} />
     </BlogLayout>
   );
 }
 
 export default BlogListPage;
 
