import Email from "../assets/img/email.svg";
import Fb from "../assets/img/facebook.svg";
import Git from "../assets/img/github.svg";
import Whatsapp from "../assets/img/whatsapp.svg";

export const Icon = ({ name }) => {
  const imageIcons = {
    github: { src: Git, alt: "GitHub" },
    facebook: { src: Fb, alt: "Facebook" },
    whatsapp: { src: Whatsapp, alt: "WhatsApp" },
    mail: { src: Email, alt: "Email" },
  };

  if (imageIcons[name]) {
    const { src, alt } = imageIcons[name];
    const colorFilter =
      "brightness(0) invert(1) sepia(0.25) saturate(1.6) hue-rotate(185deg) brightness(1.1)";
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "1em",
          height: "1em",
          display: "block",
          filter: colorFilter,
        }}
      />
    );
  }

  const icons = {
    download: "\u2B07",
    eye: "\uD83D\uDC41",
    arrow: "\u2192",
    check: "\u2713",
    close: "\u2715",
    plus: "+",
    code: "\u2328",
    layout: "\u229E",
    briefcase: "\uD83D\uDCBC",
    mail: "\u2709",
    phone: "\uD83D\uDCDE",
    globe: "\uD83C\uDF10",
    star: "\u2605",
    quote: "\u275D",
    rocket: "\uD83D\uDE80",
    shield: "\uD83D\uDEE1",
    zap: "\u26A1",
    heart: "\u2665",
    users: "\uD83D\uDC65",
    chart: "\uD83D\uDCCA",
    sparkle: "\u2726",
    chevL: "\u2039",
    chevR: "\u203A",
    up: "\u2191",
    menu: "\u2630",
    external: "\u2197",
    figma: "\uD83C\uDFA8",
    nextjs: "\u25B2",
    react: "\u269B",
    node: "\uD83D\uDFE2",
  };

  return <span style={{ fontSize: "inherit" }}>{icons[name] || "â€¢"}</span>;
};
