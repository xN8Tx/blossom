import type { HeadingModel } from "../../../models/uiModel";

import style from "./HeadingThree.module.scss";

export default function HeadingThree({ children }: HeadingModel) {
  return <h3 className={style.HeadingThree}>{children}</h3>;
}
