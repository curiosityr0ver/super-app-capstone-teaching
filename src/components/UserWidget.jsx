import React from 'react'
import styles from '../pages/homepage/Homepage.module.css'

function UserWidget({user,userAvtar,selectedGenre,genres}) {
  return (
    <div className={styles.userWidget}>
        <img src={userAvtar} alt="" />
            <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
                <h1>{user.username}</h1>
            {selectedGenre.length > 0 && (
                <div className={styles.genreGrid}>
                {
                    selectedGenre
                    .filter((id, index) => index < 4)
                    .map((id)=>
                    <div className={styles.pill}>{genres[id].title}</div>
                )}
                </div>
            )}
            </div>
    </div>
  )
}

export default UserWidget