import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  href?: string;
  label: string;
  to?: string;
}

const FooterLink: React.FC<Props> = (props) => {
  const { href, to, label } = props;
  const linkHref = useBaseUrl(href ?? "", { forcePrependBaseUrl: undefined });
  const linkTo = useBaseUrl(to ?? "");

  return (
    <a
      className={styles.LinkText}
      {...(href != null
        ? {
            href: linkHref,
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : { href: linkTo })}
      {...props}
    >
      {label}
    </a>
  );
};

export default FooterLink;
