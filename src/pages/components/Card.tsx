import { Proposal } from "@celo/contractkit/lib/wrappers/Governance";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  item: any;
}

const Card = ({ item }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h3>{item.title}</h3>
      </div>
      <div className={styles.desc}>
        <p>{item.desc}</p>
      </div>
    </div>
  );
};

export default Card;
