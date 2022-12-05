import { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import * as likeService from "../../services/likes-service";
import Tuits from "../tuits";

const MyDislikedTuits = ({ uid }) => {
  const [tuits, setTuits] = useState([]);
  const findMyDislikedTuits = () => {
    likeService.getMyDislikedTuits(uid)
      .then(likeArray => {
        let tuitsArr = [];
        likeArray.forEach(likeObj => {
          tuitsArr.push(likeObj.tuit);
        });
        setTuits(tuitsArr);
      });
  }

  useEffect(findMyDislikedTuits, [uid]);
  const deleteTuit = (tid) =>
    service.deleteTuit(tid)
      .then(findMyDislikedTuits);
  return (
    <div>
      <p></p>
      <h5>My Disliked Tuits</h5>
      <Tuits tuits={tuits}
        deleteTuit={deleteTuit} uid={uid} dislikeCallback={findMyDislikedTuits} likeCallback={findMyDislikedTuits} />
    </div>
  );
};

export default MyDislikedTuits;

