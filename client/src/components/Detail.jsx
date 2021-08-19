import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanQ } from "../action/index";
import { Nav } from "./Nav";
import noimg from "../components/imgs/noimg.jpg";
import s from "./Detail.module.css";
import { Link } from "react-router-dom";

export const Detail = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanQ());
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);
  const detail = useSelector((state) => state.detail);
  return (
    <>
      <Nav />
      <div className={s.container}>
        {detail.length > 0 ? (
          <div className={s.container__card}>
            <div className={s.left}>
              <img
                src={detail[0]?.img ? detail[0]?.img : noimg}
                alt={`dog ${detail[0]?.name}`}
                width="400"
                className={s.fotito}
              />
            </div>
            <div className={s.right}>
              <h1>{detail[0].name}</h1>
              <ul>
                <li>
                  {" "}
                  <h4>Height: {detail[0]?.height + " cm"}</h4>{" "}
                </li>
                <li>
                  {" "}
                  <h4>Weight: {detail[0]?.weight + " Kg"}</h4>{" "}
                </li>
                <li>
                  {" "}
                  <h4>Life span: {detail[0]?.lifeSpan}</h4>{" "}
                </li>
                <li>
                  <h4>
                    Temperaments:{" "}
                    {detail[0]?.temperament
                      ? detail[0].temperament.map((elem) => elem + ", ")
                      : detail[0]?.temperaments?.map(
                          (elem) => elem.name + ", "
                        )}
                  </h4>
                  <Link to='/home'>
                  <h3>Press HERE for go back</h3>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
