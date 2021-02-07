import React from 'react';
import MatAlapCard from '../Components/MatAlapCard'

const GenerateZh = ({isAdmin,loadData,Generated_matalap_list}) =>{
    const items =
        Generated_matalap_list.map(element => {
            return (<MatAlapCard 
            isAdmin={isAdmin}
            loadData={loadData}  
            MatalapTask={element} 
            id={element._id} 
            topic={element.topic} 
            task_type={element.task_type} 
            task_image={element.task_description} 
            task_solution={element.solutation} 
            task_solution_stepbystep={element.solutation_stepbystep}  />)
        });
    return(
        <div className={"bg-light min-vh-100 p-5 rounded "}>
            {items}
        </div>    
    )
}
export default GenerateZh;