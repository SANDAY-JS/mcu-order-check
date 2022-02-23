import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
import styles from "../styles/scss/SearchBox.module.scss";

const SearchBox = ({
  searchInputRef,
  setSearchText,
  foldMenu,
  animateVariables,
}) => {
  const tl = gsap.timeline({});
  const searchBoxRef = useRef(null);
  const [isDispleyNone, setIsDisplayNone] = useState<boolean>(false);

  const handleSearch = (e) => {
    return setSearchText(e.target.value.trim().toLowerCase());
  };

  useLayoutEffect(() => {
    if (searchInputRef.current.value.length === 0) {
      foldMenu ? setIsDisplayNone(true) : setIsDisplayNone(false);
      return;
    }

    if (isDispleyNone) {
      setIsDisplayNone(false);
    }

    if (foldMenu) {
      tl.to(
        searchInputRef.current,
        0.1,
        { opacity: 0, ease: animateVariables.ease },
        "start"
      );
    }
    tl.to(
      searchInputRef.current,
      animateVariables.duration * 0.75,
      { opacity: 1, ease: animateVariables.ease },
      "start+=.2"
    );
  }, [foldMenu]);

  return (
    <>
      {!foldMenu && <p className={styles.filterTitle}>Filter</p>}
      <div
        ref={searchBoxRef}
        className={`${styles.searchContainer} ${
          searchInputRef.current && searchInputRef.current.value.length > 0
            ? styles.textLength
            : ""
        } ${isDispleyNone ? styles.displayNone : ""}`}
      >
        <FcSearch className={styles.searchIcon} />
        <input
          ref={searchInputRef}
          type="text"
          onChange={handleSearch}
          className={styles.textInput}
          // defaultValue={searchInput}
        />
      </div>
    </>
  );
};

export default SearchBox;
