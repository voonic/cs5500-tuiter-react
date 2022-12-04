import React from "react";

export default class TuitStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let thumbsUpClassName = "fa fa-thumbs-up me-1";
    if (this.props.state == "liked") {
      thumbsUpClassName += " text-danger";
    }
    let thumbsDownClassName = "fa fa-thumbs-down me-1";
    if (this.props.state == "disliked") {
      thumbsDownClassName += " text-danger";
    }

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
          <i className={thumbsUpClassName} onClick={this.props.toggleLike}></i>
          {this.props.likes}
        </div>
        <div className="col">
          <i className={thumbsDownClassName} onClick={this.props.toggleDislike}></i>
          {this.props.dislikes}
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
  }
}
