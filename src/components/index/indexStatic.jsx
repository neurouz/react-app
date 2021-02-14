import React from "react";

import "../../styles/indexStatic.css";
import ToolGrinding from "../../images/tool-grinding.jpg";
import Customer from "../../images/customer.jpg";

export default function IndexStatic() {
  return (
    <div className="index-static">
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
      <hr style={{ width: "70%" }} />
      <div className="static-parent">
        <div className="index-row static-parent-2">
          <img src={Customer} alt="Tool grinding"></img>
          <p>
            We enjoy working with our customers to ensure we get the job done
            right! Our wide range of capabilities enables companies to use us as
            their source for designing and manufacturing tools, and sharpening
            and altering standard tools. In addition, we distribute some of the
            best tooling available in the market today. We would sincerely
            appreciate the opportunity to demonstrate to you the quality and
            service that has helped us to become a leading service center in the
            Midwest.
          </p>
        </div>
      </div>
      <div className="static-parent">
        <div className="index-row">
          <button className="btn btn-outline-primary btn-lg">
            Become a member now!
          </button>
        </div>
      </div>
    </div>
  );
}
