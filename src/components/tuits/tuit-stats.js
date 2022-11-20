import React from "react";

export default class TuitStats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {this.props.tuit && this.props.tuit.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {this.props.tuit && this.props.tuit.retuits}
        </div>
        <div className="col">
          <i className="far fa-heart me-1"></i>
          {this.props.tuit && this.props.tuit.likes}
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
  }
}