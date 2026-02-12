
export default function Images({ imageUrl, err, loading, fecthImages }) {
    
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
        }
    }

    return (
        <>
        {/* <button onClick={fecthImages}>
            Generate
        </button> */}
         {loading && <p>Loading...</p>}
         {err && <p>{err}</p>}

        <div className="images">
             {imageUrl.map(item => {
                // console.log(item)
               return <div className="image" key={item.download_url}>
                  <img key={item.download_url} src={item.download_url} alt={item.author} loading="lazy"/>

                  <button 
                //   className="generate"
                  onClick={() => handlDownload(item.download_url, item.id)}
                  >Download</button>
                </div>
             })}  
             <div className="buttons">
             <button
              onClick={fecthImages}
              className="generat-more"
             >{imageUrl.length > 0 ? "Show More" : "Generate Img"}</button>         
            </div>   
         </div>
        
        </>
    )
}