import React from "react";
import styles from "../pages/homepage/Homepage.module.css";
import userAvatar from "../assets/avatar.png";
import { genresHomePage } from "../assets/data/genres";

const UserWidget = ({ user, selectedGenres }) => {
  return (
    <div className={styles.userWidget}>
      {user && (
        <>
          <img src={userAvatar} alt="avatar of user" />
          <div className={styles.infoFlex}>
            <div className={styles.userInfo}>
              <h1 className={styles.nameEmail}>{user.name}</h1>
              <h1 className={styles.nameEmail}>{user.email}</h1>
              <h1 className={styles.username}>{user.username}</h1>
            </div>

            {selectedGenres.length > 0 && (
              <div className={styles.genreGrid}>
                {selectedGenres
                  .filter((genre, index) => index < 4)
                  .map((genre) => (
                    <div className={styles.pill} key={genre}>
                      {genresHomePage[genre].title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserWidget;
