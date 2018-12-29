import React from "react";
import { connect } from "react-redux";
import LinearProgress from "material-ui/LinearProgress";

function Loader({ loading }) {
  if (loading) {
    return <LinearProgress mode="indeterminate" />;
  }
  return <span style={{ width: "4px" }} />;
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.global,
  };
};

export default connect(mapStateToProps)(Loader);