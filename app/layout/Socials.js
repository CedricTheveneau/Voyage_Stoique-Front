
import styles from "../page.module.css";
import Link from "next/link";

export default function Socials() {
 return (
  <div className={styles.socials}>
  <p>Follow us !</p>
  <div className={styles.icons}><Link id="DiscordSocials" href="https://discord.gg/URGXAVbPYj"
          title="Join our Discord server"><svg alt="Discord logo" width="39" height="40" viewBox="0 0 39 40"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M24.1912 19.556C24.1912 20.5429 23.4632 21.3519 22.541 21.3519C21.6349 21.3519 20.8907 20.5429 20.8907 19.556C20.8907 18.5691 21.6188 17.7601 22.541 17.7601C23.4632 17.7601 24.1912 18.5691 24.1912 19.556ZM16.6356 17.7601C15.7134 17.7601 14.9853 18.5691 14.9853 19.556C14.9853 20.5429 15.7295 21.3519 16.6356 21.3519C17.5578 21.3519 18.2858 20.5429 18.2858 19.556C18.302 18.5691 17.5578 17.7601 16.6356 17.7601ZM33.7208 7.5187V36.5441C29.6448 32.9421 30.9483 34.1344 26.2136 29.7327L27.0711 32.7258H8.72396C6.89571 32.7258 5.40723 31.2374 5.40723 29.3929V7.5187C5.40723 5.67427 6.89571 4.18579 8.72396 4.18579H30.404C32.2323 4.18579 33.7208 5.67427 33.7208 7.5187ZM29.1097 22.8566C29.1097 17.6469 26.7799 13.4241 26.7799 13.4241C24.4501 11.6767 22.2336 11.7253 22.2336 11.7253L22.0071 11.9841C24.7575 12.8255 26.0357 14.0389 26.0357 14.0389C22.1924 11.9325 17.6779 11.9321 13.9498 13.5697C13.3512 13.8448 12.9953 14.0389 12.9953 14.0389C12.9953 14.0389 14.3381 12.7607 17.2504 11.9194L17.0886 11.7253C17.0886 11.7253 14.872 11.6767 12.5422 13.4241C12.5422 13.4241 10.2124 17.6469 10.2124 22.8566C10.2124 22.8566 11.5715 25.2025 15.1471 25.3158C15.1471 25.3158 15.7457 24.5877 16.2311 23.9729C14.1763 23.3581 13.3997 22.0638 13.3997 22.0638C13.6377 22.2304 14.0302 22.4463 14.0631 22.4682C16.7939 23.9976 20.673 24.4986 24.1589 23.0345C24.7252 22.8242 25.3561 22.5168 26.0195 22.0799C26.0195 22.0799 25.2105 23.4066 23.0911 24.0053C23.5764 24.6201 24.1589 25.3158 24.1589 25.3158C27.7345 25.2025 29.1097 22.8566 29.1097 22.8566V22.8566Z"
                  fill="black" />
          </svg></Link></div>
</div>
 );
}