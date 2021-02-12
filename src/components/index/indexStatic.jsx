import React from "react";

import "../../styles/indexStatic.css";
import ToolGrinding from "../../images/tool-grinding.jpg";

export default function IndexStatic() {
  return (
    <div>
      <h1 className="text-center font-weight-bold text-primary">
        {" "}
        Welcome to EToolService!
      </h1>
      <div className="static-parent">
        <div className="index-row">
          <p>
            The company manufactures high-precision cutting tools, which
            includes production of hartmetal, PCD and PCBN cutting tools and
            resharpening of all kinds of cutting tools. While the standard
            product range comprises 6% of our production, the bulk of
            manufacture are non-standard tools custom-made for individual
            customers. Such tools enable our costumer to maximally optimise
            processing.
          </p>
          <img src={ToolGrinding} alt="Tool grinding"></img>
        </div>
      </div>
    </div>
  );
}
