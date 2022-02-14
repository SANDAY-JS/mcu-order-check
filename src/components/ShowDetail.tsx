import Image from "next/image";
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

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className={`need-darMode-status keepShowDetail ${styles.showDetail}`}>
      {show.trailer_url ? (
        <iframe
          src={show.trailer_url}
          frameBorder={0}
          className={styles.showDetail__trailer}
        />
      ) : (
        <Image
          src={"/images/novideo.jpg"}
          alt={show.title}
          layout="intrinsic"
          width={352}
          height={180}
          objectFit="cover"
        />
      )}
      <h4>{show.title}</h4>
      <p>
        Release Date:{" "}
        {show.release_date
          ? show.release_date.replace(/-/g, "/")
          : "not confirmed"}
      </p>
      <p>Chronological Number: {show.chronology ?? "unknown"}</p>
      {show.box_office && (
        <p>{`Box Office: ${priceFormatter.format(show.box_office)}`}</p>
      )}
      <p>Directed by: {show.directed_by}</p>
      <p>{show.overview}</p>
    </div>
  );
};

export default ShowDetail;
