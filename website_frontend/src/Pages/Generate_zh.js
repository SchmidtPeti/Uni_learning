import React from 'react';
import MatAlapCard from '../Components/MatAlapCard'

const GenerateZh = ({Generated_matalap_list}) =>{
    console.log(Generated_matalap_list);
    const items =
        Generated_matalap_list.map(element => {
            return <MatAlapCard topic={element.topic} task_type={element.task_type} task_image={element.task_description} task_solution={element.solutation} task_solution_stepbystep={element.solutation_stepbystep} />
        });
    return(
        <div>
            {items}
        </div>    
    )
}
export default GenerateZh;