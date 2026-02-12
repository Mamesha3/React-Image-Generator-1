
export default function Images({ decreamentImgs, imageUrl, err, loading, fecthImages }) {
    
    async function handlDownload(url, id) {
        try {
            const res = await fetch(url)
            const blob = await res.blob()

            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `image-${id}.jpg`

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.log("Download Feild", error)
            alert("Failed to fetch!. Has No Internet or Network Error")
        }
    }

    // console.log(imageUrl.length)
    return (
        <>
        <button className="reomev"
        onClick={decreamentImgs}
        >I</button>

         {loading && <p>Loading...</p>}
         {err && <p>{err}</p>}

        <div className="images">
             {imageUrl.length === 0 ? 
               <div className="empty_img">
                 <img src="" alt="" />
                 <h3>Image Folder Is <strong>Empty</strong></h3>
               </div>
              : imageUrl.map(item => {
               return <div className="image" key={item.download_url}>
                  <img key={item.download_url} src={item.download_url} alt={item.author} loading="lazy"/>

                  <button 
                //   className="generate"
                  onClick={() => handlDownload(item.download_url, item.id)}
                  >Download</button>
                  <span className="author"><strong>{item.author}</strong></span>
                </div>
             })}  
             <div className="buttons">
             <button
              onClick={imageUrl.length === 100 ? '' : fecthImages}
              className="generat-more"
             >{imageUrl.length > 0 ? 
                "Show More" : imageUrl.length >= 10 ? "No More Images" : "Generate Img"}</button>         
            </div>   
         </div>
        
        </>
    )
}