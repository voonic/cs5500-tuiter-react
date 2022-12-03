import React, { useEffect, useState } from "react";
import * as likesService from "../../services/likes-service";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({ tuit, deleteTuit, uid }) => {

  const [likes, setLikes] = useState(tuit.likes);
  const [dislikes, setDislikes] = useState(tuit.dislikes);
  const [state, setState] = useState();

  const getLikesData = async () => {
    if (uid) {
      const likesData = await likesService.getTuitLikesdata(uid, tuit._id);
      if (likesData) {
        setState(likesData.type ? "liked" : "disliked");
      }
    }
  }

  const toggleLike = async () => {
    if (uid) {
      const likesData = await likesService.userTogglesTuitLikes(uid, tuit._id);
      setLikes(likesData.likes);
      setDislikes(likesData.dislikes);
      setState(likesData.state);
    } else {
      alert("Please login first");
    }
  }

  const toggleDislike = async () => {
    if (uid) {
      const likesData = await likesService.userTogglesTuitDislikes(uid, tuit._id);
      setLikes(likesData.likes);
      setDislikes(likesData.dislikes);
      setState(likesData.state);
    } else {
      alert("Please login first");
    }
  }

  useEffect(getLikesData, []);

  return (
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`/images/${tuit.postedBy.profilePhoto}`}
            className="ttr-tuit-avatar-logo rounded-circle" />
        }
      </div>
      <div className="w-100">
        {tuit.postedBy && uid == tuit.postedBy._id && (
          <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
        )}
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username}</h2>
        {tuit.tuit}
        {
          tuit.youtube &&
          <TuitVideo tuit={tuit} />
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit} />
        }
        <TuitStats
          tuit={tuit}
          likes={likes}
          dislikes={dislikes}
          state={state}
          uid={uid}
          toggleDislike={toggleDislike}
          toggleLike={toggleLike}
        />
      </div>
    </li>
  );
}
export default Tuit;