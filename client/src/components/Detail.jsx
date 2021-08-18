import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../action/index";
import noimg from "../components/imgs/noimg.jpg";

export const Detail = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);
  const detail = useSelector((state) => state.detail);
  return (
    <div>
      {detail.length > 0 ? (
        <div>
          <div>
            <h1>{detail[0].name}</h1>
          </div>
          <div>
            <ul>
              <li>
                <h4>Height: {detail[0]?.height + " cm"}</h4>
              </li>
              <li>
                <h4>Weight: {detail[0]?.weight + " Kg"}</h4>
              </li>
              <li>
                <h4>Life span: {detail[0]?.lifeSpan}</h4>
              </li>
              <li>
                <h4>
                  Temperaments:{" "}
                  {detail[0]?.temperament
                    ? detail[0].temperament.map((elem) => elem + ", ")
                    : detail[0]?.temperaments?.map((elem) => elem.name + ", ")}
                </h4>
              </li>
            </ul>
            <div>
              <img
                src={detail[0]?.img ? detail[0]?.img : noimg}
                alt={`image ${detail[0]?.name}`}
                width="400"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Go back</button>
      </Link>
    </div>
  );
};
