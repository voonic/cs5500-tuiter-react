import { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import * as likeService from "../../services/likes-service";
import Tuits from "../tuits";

const MyLikedTuits = ({ uid }) => {
  const [tuits, setTuits] = useState([]);
  const findMyLikedTuits = () =>
    likeService.getMyLikedTuits(uid)
      .then(likeArray => {
        let tuitsArr = [];
        likeArray.forEach(likeObj => {
          if (likeObj.tuit) {
            tuitsArr.push(likeObj.tuit);
          }
        });
        setTuits(tuitsArr);
      });


  useEffect(findMyLikedTuits, [uid]);
  const deleteTuit = (tid) =>
    service.deleteTuit(tid)
      .then(findMyLikedTuits);
  return (
    <div>
      <p></p>
      <h5>My Liked Tuits</h5>
      <Tuits tuits={tuits}
        deleteTuit={deleteTuit} uid={uid} />
    </div>
  );
};

export default MyLikedTuits;

