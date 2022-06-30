// import React from 'react';
// import 'components/CommentLists.scss';

// export default function CommentList({ reviews }) {
//   return (
//     <div>
//       {reviews &&
//         reviews.map((comment, idx) => {
//           return (
//             <div className="CommentWrapper" key={idx}>
//               <div className="UserWrapper">
//                 <div className="NameWrapper">
//                   <div className="User">
//                     <p className="Name">{comment.user_name}</p>
//                     <p className="Room">{comment.room}</p>
//                   </div>
//                   <p className="Date">{comment.created_at.slice(0, 10)}</p>
//                 </div>
//               </div>
//               <div className="CommentText">
//                 <h5 className="Title">{comment.title}</h5>
//                 <p className="Text">{comment.content}</p>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
// 일단 사용금지