import { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = ({ uid }) => {
  const [tuits, setTuits] = useState([]);
  const findMyTuits = () =>
    service.findTuitByUser("me")
      .then(tuits => setTuits(tuits));
  useEffect(findMyTuits, []);
  const deleteTuit = (tid) =>
    service.deleteTuit(tid)
      .then(findMyTuits);
  return (
    <div>
      <p></p>
      <h5>My Tuits</h5>
      <Tuits tuits={tuits}
        deleteTuit={deleteTuit} uid={uid} />
    </div>
  );
};

export default MyTuits;

