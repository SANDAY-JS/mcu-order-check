import { useEffect } from "react";
import styles from "../styles/scss/ShowDetail.module.scss";

const ShowDetail = ({ show, setSelectedShow }) => {
  useEffect(() => {
    document.addEventListener("click", handleDesMenu);
    return () => document.removeEventListener("click", handleDesMenu);
  }, []);

  const handleDesMenu = (e) => {
    if (!e.target.closest(".keepShowDetail")) return setSelectedShow(false);
  };

  return (
    <div className={`need-darMode-status keepShowDetail ${styles.showDetail}`}>
      <video src={show.trailer_url} />
      <h4>{show.title}</h4>
      <p>{show.release_date}</p>
      <p>Box Office: {show.box_office}</p>
      <p>Directed by: {show.directed_by}</p>
      <p>{show.overview}</p>
    </div>
  );
};

export default ShowDetail;
