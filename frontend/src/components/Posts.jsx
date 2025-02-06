import React from 'react'
import "./css/Posts.css"
const Posts = ({category, job_titile,by,time}) => {
  return (
<div class="card">
    <div class="card-image"></div>
    <div class="category"> {category} </div>
    <div class="heading"> {job_titile}
        <div class="author"> By <span class="name">{by}</span> {time} days ago</div>
    </div>
</div>
  )
}

export default Posts