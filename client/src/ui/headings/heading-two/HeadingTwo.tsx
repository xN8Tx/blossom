import type { HeadingModel } from "../../../models/uiModel";

import style from "./HeadingTwo.module.scss";

export default function HeadingTwo({ children }: HeadingModel) {
  return <h2 className={style.HeadingTwo}>{children}</h2>;
}
