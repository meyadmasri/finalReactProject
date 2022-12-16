import React from "react";
import * as dayjs from "dayjs";
let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

const Comments = ({ comment }) => {
  
  return (
    <div class="comment" key={comment.id}>
      <img src={comment.user.avatar} alt={comment.user.name} />
      <div>
        <div class="name">{comment.user.name}</div>
        <div class="mb-2 datetime">{dayjs(comment.created_at).fromNow()}</div>
        {comment.content}
      </div>
      
    </div>
    
  );
};

export default Comments;
