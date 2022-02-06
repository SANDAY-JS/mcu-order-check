import Image from "next/image";
import styles from "../styles/scss/ShowItem.module.scss";

const ShowItem = ({ show, setSelectedShow }) => {
  const noPicture = "/images/noimage.png";

  return (
    <div
      className={`keepShowDetail ${styles.showContainer__showItem}`}
      onClick={() => setSelectedShow(show)}
    >
      <p className={styles.showContainer__showItem__title}>{show.title}</p>
      <div className={styles.showContainer__showItem__imageWrap}>
        <Image
          src={show.cover_url ?? noPicture}
          alt={show.title}
          width={256}
          height={379}
          layout="intrinsic"
          placeholder="blur"
          blurDataURL={show.cover_url ?? noPicture}
        />
      </div>
    </div>
  );
};

export default ShowItem;
