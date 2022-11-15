import React from "react";
import styles from "./styles.module.css";

interface Props {
  item: any;
}

const TutorialCard = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageCard}>
        <img
          src={item.img}
          style={{
            width: 500,
            height: 100,
            borderTopRightRadius: 10,
            objectFit: "cover",
          }}
          alt="refi-image"
        />
        <div className={styles.imageDesc}>
          <p>{item.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
