import classNames from "classnames";
import React from "react";

const StableColumn = ({ children, span, wd }) => {
  return (
    <td className={classNames("StableColumn", wd)} colSpan={span}>
      {children}
    </td>
  );
};

export default StableColumn;
