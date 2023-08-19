import type { ButtonModel } from "../../../models/uiModel";

import style from "./PrimaryButton.module.scss";

export default function PrimaryButton({
  children,
  onClick,
  color = "blue",
}: ButtonModel) {
  const className = style.PrimaryButton + " " + style[color];

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
