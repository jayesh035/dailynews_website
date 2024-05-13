import React from "react";

const NewItem =(props)=> {
  
    let { title, description, ImgUrl, newsUrl, author, date,source } = props;
    let d = new Date(date);
    date = d.toUTCString();
    return (
      <>
        <div className="my-3">
          <div className="card">
           <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:0}}> 
          <span class=" badge rounded-pill bg-danger">
                  {source}

                </span>
                </div>
            <img
              src={
                !ImgUrl
                  ? "https://cdn.wionews.com/sites/default/files/2023/12/29/402425-untitled-design-2023-12-29t161937511.png"
                  : ImgUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                {title}
               
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-muted">
                  By {author ? author : "Unknown"} on {date}
                </small>
              </p>
              <a
                href={newsUrl}
                rel="noreferrer"
                target="_blank"
                className="btn btn-sm btn-dark"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  
}
export default NewItem;