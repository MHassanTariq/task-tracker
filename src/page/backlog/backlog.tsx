import React from "react";
import PageScreen from "../../components/pageScreen";
import colors from "../../utils/colors";

function Backlog() {
  function Title() {
    return <p className={`${colors.titleText}`}>Backlog</p>;
  }

  return (
    <PageScreen>
      <Title />
      {/* Add your backlog items here */}
    </PageScreen>
  );
}

export default Backlog;
