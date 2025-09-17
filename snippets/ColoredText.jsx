// JS + Tailwind
export const ColoredText = ({
  color = "#329F3B", // light-mode default
  darkColor = "#fcff52", // dark-mode default
  children,
}) => {
  const isTWLight = typeof color === "string" && color.startsWith("text-");
  const isTWDark = typeof darkColor === "string" && darkColor.startsWith("text-");

  // Wrap children so inner <a> inherits color
  const Wrap = ({ useColor, kids }) =>
    typeof kids === "string" ? (
      kids
    ) : (
      <span style={{ color: `${useColor} !important` }} className="!text-inherit">
        {kids}
      </span>
    );

  return (
    <>
      {/* Light mode */}
      <span
        className={`colored_text font-bold dark:hidden ${isTWLight ? `!${color}` : ""}`}
        style={!isTWLight ? { color, fontWeight: "bold" } : { fontWeight: "bold" }}
      >
        <Wrap useColor={isTWLight ? undefined : color} kids={children} />
      </span>

      {/* Dark mode */}
      <span
        className={`colored_text font-bold hidden dark:inline ${isTWDark ? `!${darkColor}` : ""}`}
        style={!isTWDark ? { color: darkColor, fontWeight: "bold" } : { fontWeight: "bold" }}
      >
        <Wrap useColor={isTWDark ? undefined : darkColor} kids={children} />
      </span>
    </>
  );
};
