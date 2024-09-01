import React, { useEffect, useState} from 'react';
import axios from 'axios';
const Homescreen = () => {

  const [data, setData] = useState([])

  useEffect(() => {

    const fetchData = async () =>{

      try {

        const {data: response} = await axios.get('/api/cars/getallcars');

        setData(response);
        console.log(response);

      } catch (error) {

        console.error(error.message);

      }
    }

    fetchData();

  }, []);

  return (

    <div>
      <h1> Home Screen </h1>
      <h1>they are {data.length} rooms</h1>
    </div>

  )
}
export default Homescreen;