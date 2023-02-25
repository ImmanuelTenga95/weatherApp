import React, {useState} from 'react'


function WeatherAPi() {
    const [data, setData] = useState([])
  
    const [location, setLocation] = useState('')
   
    const myFunction = (e)=>{
        setLocation(e.target.value)
    }
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=abf5ee13b3a761cca7791b92f704366d`
    const getData = (e)=>{
        if(e.key === "Enter"){
            fetch(URL).then((response)=>response.json()).then((data)=>{
                setData(data)
                console.log(data)
            })
            setLocation('')
        }
    }
   
  return (
    <div className='container col-4 p-sm-2 my-4'>

            <div className="input-group my-sm-4">
                <input
                    value={location}
                    type='text' 
                    placeholder='Enter Location here' 
                    onChange={myFunction} onKeyDown={getData}
                    className="form-control border-dark-primary" aria-describedby="basic-addon1"/>
            </div>

        <div className='row top-div'>
            <div className='col text-white'>
                <p className='city-name'>{data.name} {data.sys?<span className='country'>{data.sys.country}</span>: ''}</p>
                {data.main?<h3>{Math.round(data.main.temp)} &deg;C</h3>: ''}
                
            </div>
            <div className='col text-white weather-desc'>
                {data.weather?<p>{data.weather[0].main}</p>: ''}
                {data.weather?<span>{data.weather[0].description}</span>: ''}
                
            </div>
        </div>
        {data.name !== undefined &&
            <div className='row justify-content-between bottom-div'>
                <div className='col'>
                    <p className='bold'>Feels like</p>
                    {data.main?<p className='text-color'>{Math.round(data.main.feels_like)} &deg;C</p>: ''}
                </div>
                <div className='col'>
                    <p className='bold'>Humidity</p>
                    {data.main?<p className='text-color'>{Math.round(data.main.humidity)} %</p>: ''}
                    
                </div>
                <div className='col'>
                    <p className='bold'>Wind</p>
                    {data.wind?<p className='text-color'>{Math.round((data.wind.speed)*1.609344)} km/h</p>: ''}
                </div>
            </div>
        }
        
    </div>
  )
}

export default WeatherAPi