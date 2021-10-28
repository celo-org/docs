import React from "react";
import styles from "./styles.module.css";

export type Props = { uri: string };

const CodeSandBoxEmbed: React.FC<Props> = (props) => {
  const { uri } = props;

  return (
    <iframe
      className={styles.Embed}
      src={`https://codesandbox.io/embed/${uri}?fontsize=14&hidenavigation=0&theme=light&view=preview`}
      title={"Code Sandbox"}
      allow={
        "geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      }
      sandbox={
        "allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      }
    />
  );
};

export default CodeSandBoxEmbed;
