// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
// import './MyLogDetail.scss';
// const IMG_WIDTH = 660;
// const SLIDE_WIDTH = 820;

// export default function MyLogDetail({ roomList }) {
//   const WHOLE_WIDTH = roomList.length * 330;
//   const [slideImgLong, setSlideImgLong] = useState(0);

//   const movePrevSlideImg = () => {
//     if (SLIDE_WIDTH > Math.abs(slideImgLong)) {
//       setSlideImgLong(0);
//     } else if (slideImgLong === 0) {
//       return;
//     } else {
//       setSlideImgLong(slideImgLong + IMG_WIDTH);
//     }
//   };

//   const moveNextSlideImg = () => {
//     const IMG_SLIDE_LENGTH = Math.floor(WHOLE_WIDTH / IMG_WIDTH) - 1;
//     const isClosedEndPoint =
//       IMG_SLIDE_LENGTH * IMG_WIDTH === Math.abs(slideImgLong);
//     if (isClosedEndPoint) {
//       setSlideImgLong(
//         slideImgLong - (WHOLE_WIDTH - Math.abs(slideImgLong) - SLIDE_WIDTH - 30)
//       );
//     } else if (Math.abs(slideImgLong) === WHOLE_WIDTH - SLIDE_WIDTH - 30) {
//       return;
//     } else {
//       setSlideImgLong(slideImgLong - IMG_WIDTH);
//     }
//   };

//   return (
//     <div className="DetailContainer">
//       {roomList &&
//         roomList.map((info, idx) => {
//           return (
//             <Link to={`/rooms/${info.reservation_id}`} key={idx}>
//               <div className="DetailWrapper">
//                 <div
//                   className="RoomImg"
//                   style={{
//                     backgroundImage: `url(${info.image_url})`,
//                   }}
//                 >
//                   <div className="WrapperCover" />
//                 </div>
//                 <div>
//                   <p className="Location">{info.address}</p>
//                   <h4 className="House">{info.title}</h4>
//                   <p className="RoomDate">
//                     {info.check_in} - {info.check_out}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//     </div>
//   );
// }
//일단 사용금지