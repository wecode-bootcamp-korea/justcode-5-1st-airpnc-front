// import React, { useState } from 'react';
// import CommentList from './CommentList';
// import './MyReview.scss';

// export default function MyReview({ roomList, reviews, getMyReview }) {
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [selected, setSelected] = useState('');
//   const [commentLists, setCommentLists] = useState([]);

//   const onChangeName = e => {
//     setName(e.target.value);
//   };

//   const onChangeComment = e => {
//     setComment(e.target.value);
//   };

//   const onChangeSelect = e => {
//     setSelected(e.target.value);
//   };

//   const handleCommtLists = e => {
//     e.preventDefault();
//     if (!name || !comment || !selected) {
//       alert('후기를 작성 해 주세요!');
//     } else {
//       alert('작성이 완료되었습니다!');
//       setName('');
//       setComment('');
//       setSelected('');
//     }

//     if (name && comment && selected) {
//       setCommentLists(
//         [
//           {
//             name: name,
//             comment: comment,
//             locationOption: selected,
//           },
//         ].concat(commentLists)
//       );

//       fetch('url', {
//         method: 'POST',
//         headers: {
//           Authorization: process.env.REACT_APP_USER_TOKEN,
//         },
//         body: commentLists,
//       })
//         .then(res => res.json())
//         .then(res => {
//           if (res.message === 'SUCCESS') {
//             alert('프로필이 업로드 되었습니다!');
//             getMyReview();
//           } else {
//             alert('프로필 사진을 업로드 해 주세요!');
//           }
//         });
//     }
//   };

//   return (
//     <div className="CommentWrapper">
//       <form className="Comment">
//         <input
//           className="CommentTextInput"
//           type="text"
//           placeholder="제목을 입력하세요."
//           value={name}
//           onChange={onChangeName}
//         />
//         <textarea
//           className="CommentText"
//           rows="2"
//           cols="80"
//           placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를사용하시면 비공개될 수 있습니다."
//           value={comment}
//           onChange={onChangeComment}
//         />
//         <div className="CommentBtn">
//           <select
//             className="NoticeBtn"
//             onChange={onChangeSelect}
//             value={selected}
//           >
//             <option selected value="">
//               숙소를 선택하세요.
//             </option>
//             {roomList &&
//               roomList.map((item, idx) => {
//                 return (
//                   <option value={item.title} key={idx}>
//                     {item.title}
//                   </option>
//                 );
//               })}
//           </select>
//           <button className="Btn" type="submit" onClick={handleCommtLists}>
//             리뷰 남기기
//           </button>
//         </div>
//       </form>
//       <div className="CommentLists">
//         <CommentList reviews={reviews} />
//       </div>
//     </div>
//   );
// }
//일단 사용금지
