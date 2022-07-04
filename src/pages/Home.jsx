import React, { useEffect, useState } from 'react'
import { getAllBehaviour } from '../actions'
import { getCookie, isAuth } from '../actions/auth'
import Card from '../components/Card'
import Layout from '../components/Layout'

const Home = () => {

  const [behaviours, setBehaviours] = useState()
  const token = getCookie("token")

  useEffect(() => {
   getAllBehaviour().then((data)=>{
    if(data.error){

    }else{
      setBehaviours(data)
    }
   })
  }, [])


  return (
    <Layout>
      <div className="behaviour">
        <div className="container mt-6 d-flex flex-wrap justify-content-center align-items-center">
          {behaviours && behaviours.map((item)=>(
            <Card title={item.name} id={item._id} key={item._id} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home