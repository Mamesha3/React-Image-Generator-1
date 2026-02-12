  import Images from "./component/images"
  import {  useEffect, useState } from "react"
  
  function App() {
    const [imageUrl, setImageUrl] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pages, setPages] = useState(() => {
      const saved = localStorage.getItem("page")
      return saved ? JSON.parse(saved) : 0
    })

    useEffect(() => {
      const storedrData = localStorage.getItem("images")
      
      storedrData ? setImageUrl(JSON.parse(storedrData)) : []
      
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
        const respons = await fetch(`https://picsum.photos/v2/list?page=${pages}&limit=6`)
        const data = await respons.json()
        setImageUrl(prev => [...prev, ...data])
      } catch (error) {
        setError("Failed to fetch images.")
      }finally {
        setLoading(false)
      }
    }

    return (
      <>
       <Images 
         fecthImages={fecthImage}
         loading={loading}
         imageUrl={imageUrl}
         err={error}
       />
      </>
    )
  }

  export default App 