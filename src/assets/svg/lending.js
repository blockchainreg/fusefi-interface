import React from 'react'
import image from '../svg/animation.svg'
function Welcome(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        className="icon"
        d="M22 19C22 19.5949 21.6134 20.1208 21.0455 20.2983L14.5626 22.3242C14.1954 22.439 13.8028 22.4453 13.4319 22.3426L7 20.56C7 21.3553 6.35529 22 5.56 22H3C1.89543 22 1 21.1046 1 20V13C1 11.8954 1.89543 11 3 11H8.97L15.13 13.3C16.25 13.72 17 14.8 17 16H19C20.66 16 22 17.34 22 19ZM5 20V13H3V20H5ZM19.9 18.57C19.74 18.24 19.39 18 19 18H13.65C13.11 18 12.58 17.92 12.07 17.75L10.6388 17.2749C10.1147 17.101 9.83112 16.5344 10.0049 16.0103C10.1788 15.486 10.7451 15.2011 11.2694 15.3751L12.7 15.85C13 15.95 15 16 15 16C15 15.63 14.77 15.3 14.43 15.17L8.61 13H7V18.5L13.97 20.41L19.9 18.57Z"
        fill="black"
      />
      <circle className="icon2" cx="17" cy="7" r="5" stroke="black" strokeWidth="2" />
    </svg>
  )
}

export default Welcome
