import React from 'react';
import {Form,Button,Image} from 'react-bootstrap';


const EditMatcard = ({Submitedit,handler,topic,task_type,task_image,task_solution,task_solution_stepbystep,editMatTaskSolution}) => {
    return(
        <Form className="bg-light p-3">
            <Form.Group controlId="task_type_id">
                <Form.Label>Feladat típusa</Form.Label>
                <Form.Control type="text" placeholder="elmélet vagy gyakorlat" value={task_type} name="task_type" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="topic_id">
                <Form.Label>Téma</Form.Label>
                <Form.Control type="text" placeholder="Milyen témákörben a feladat(Algebra,Valőszínűség)" value={topic} name="topic" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="solutation_id">
                <Image src={task_image} rounded />
                <Form.File id="taskDescription_id" label="A feladat leírása..." name="task_description" onChange={editMatTaskSolution} />
            </Form.Group>
            <Form.Group controlId="solutation_id">
            <Form.File id="taskDescription_id" label="Megoldás röviden" name="solutation" onChange={editMatTaskSolution} />
            </Form.Group>
            <Form.Group>
                <Form.File id="stepbystep_img" label="Egy kép a részletes megoldásról" name="solutation_stepbystep" onChange={editMatTaskSolution} />
            </Form.Group>
            <Button>Szerkeztés</Button>
        </Form>
    )
}
export default EditMatcard;

