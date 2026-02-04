import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {

  const location = useLocation()
//   console.log(location);
  

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})
    },[location.pathname])                              //when route change useEffect run and scroll the page to top
}

export default ScrollToTop








// <-----------------------Notes----------------------------->
// useLocation() provides access to the current URL and navigation state and re-renders the component whenever the route changes.

// useLocation() returns an object
// Actual value:
// {
//   pathname: "/courses",            //current path
//   search: "",
//   hash: "",
//   state: null
// }

// Most used properties 👇
// Property              	Meaning
// pathname	           Current URL path
// search	           Query string (?id=1)
// state	           Data passed during navigation
// hash	               URL hash (#section)