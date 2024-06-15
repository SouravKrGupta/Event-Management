import React from 'react'
import './ExploreEvent.css'
import { event_list } from '../../assets/assets'
const ExploreEvent = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
<h1>Explore our Event</h1>  
<p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, magnam? </p>   
<div className="explore-menu-list">
    {event_list.map((item,index)=>{
        return(
            <div  onClick={()=>setCategory(prev=>prev===item.event_name?"All":item.event_name)} key={index} className="explore-menu-list-item">
                <img className={category===item.event_name?"active":""} src={item.event_image} alt="" />
                <p>{item.event_name}</p>
            </div>
        )
    })}
    </div> 
    <hr />
    </div>
  )
}

export default ExploreEvent