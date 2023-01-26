import React from "react";
import "./Stable.scss";

const Stable = ({ hName, children }) => {
  return (
    <table className="Stable">
      <thead>
        <tr>
          {hName.map((item, index) => {
            return (
              <th className="StableHeader" key={index}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Stable;
