import React from "react";
import "./CTable.scss";

const CTable = ({hName,children}) => {
    return(
        <div>
        <table className="CTable">
            <thead>
                <tr>
                    {hName.map((item, index) => {
                        return(
                            <th className="CTableHeader" key={index}>
                                {item}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </div>
    );
};

export default CTable;

