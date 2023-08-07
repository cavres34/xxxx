// const scrollPos = useRef(null);
// const [previousScrollPosition, setPreviousScrollPosition] = useState(
//   window.scrollY || document.documentElement.scrollTop
// );

// scrollPos.current = window.scrollY || document.documentElement.scrollTop;
// const handleScroll = () => {
//   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
//   console.log(scrollPosition, scrollPos.current);
//   console.log(`diff: ${scrollPosition - scrollPos.current}`);
//   const bar = document.querySelector(".sbar");
//   if (scrollPosition - scrollPos.current < 0) {
//     console.log("======================================");

//     bar.style.position = "fixed";
//     setTimeout(() => {
//       bar.style.position = "static";
//     }, 15000);
//   } else {
//     bar.style.position = "static";
//   }

//   setPreviousScrollPosition(() => scrollPosition);
//   scrollPos.current = scrollPos;
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);
