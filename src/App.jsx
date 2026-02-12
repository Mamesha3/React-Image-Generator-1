  import Images from "./component/images"
  import {  useEffect, useState } from "react"
  
  function App() {
    const [imageUrl, setImageUrl] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pages, setPages] = useState(() => {
      const saveds = localStorage.getItem("page")
      if(!saveds) return 1

      try {
        return JSON.parse(saveds)
      } catch {
        localStorage.removeItem("page")
        return 1
      }
    })

    useEffect(() => {
      const storedrData = localStorage.getItem("images")
      
      if (storedrData) {
        try {
          setImageUrl(JSON.parse(storedrData))
        } catch (error) {
          console.log(error)
          localStorage.removeItem("images")
        }
      }
      
    }, [])

    useEffect(() => {
      localStorage.setItem("page", JSON.stringify(pages))
    }, [pages])

    useEffect(() => {
       if (imageUrl.length === 0) {
        localStorage.removeItem("images")
       }else {
        localStorage.setItem("images", JSON.stringify(imageUrl))
       }
    }, [imageUrl])


    const fecthImage = async () => {
 
      setPages(prev => prev + 1)
      setLoading(true)
      setError(null)

      try {
        const respons = 
        await fetch(`https://picsum.photos/v2/list?page=${pages}&limit=10`)
        const data = await respons.json()
        setImageUrl(prev => [...prev, ...data])
        } catch (error) {
          console.log(error)
          setError("Failed to fetch images.")
        }finally {
          setLoading(false)
        }    
      }
    
    function handleLocalStorage() {
      setImageUrl(prev => prev.slice(10))
    }  
    return (
      <>
       <Images 
         fecthImages={fecthImage}
         loading={loading}
         imageUrl={imageUrl}
         err={error}
         decreamentImgs={handleLocalStorage}
       />
      </>
    )
  }

  export default App 