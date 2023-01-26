import classNames from "classnames";
import React from "react";

const CTableColumn = ({ children, span, wd}) => {
    return(
        <td className={classNames("CTableColumn", wd)} colspan ={span}>
            {children}
        </td>
    );
};

export default CTableColumn;