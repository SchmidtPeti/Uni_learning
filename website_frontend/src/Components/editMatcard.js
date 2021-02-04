import React from 'react';
import {Form,Button,Image} from 'react-bootstrap';


const EditMatcard = ({
    Submitedit,
    id,
    handler,
    topic,
    task_type,
    task_image,
    task_solution,
    task_solution_stepbystep,
    taskImageChange,
    taskImageSolutionChange,
    taskImageSolutionStepbyStep,
    solutation_by,
    major,
    level,
    difficulty,
    solutation_by_credit,
    source,
    time}) => {
    return(
        <Form className="bg-light p-3">
            <Form.Group controlId="task_type_id">
                <Form.Control type="text" placeholder="Ezzel az id-val rendelkező item-t fogja átszerkezteni" value={id} readOnly name="item_id" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="task_type_id">
                <Form.Label>Feladat típusa</Form.Label>
                <Form.Control type="text" placeholder="elmélet vagy gyakorlat" defaultValue={task_type} name="task_type" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="solutation_by_id">
                <Form.Label>Készítő</Form.Label>
                <Form.Control type="text" placeholder="Ki készítette a feladatot?" defaultValue={solutation_by} name="solutation_by" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="solutation_by_credit_id">
                <Form.Label>Készítő weblap link</Form.Label>
                <Form.Control type="text" placeholder="A készítő weboldal link-je" defaultValue={solutation_by_credit} name="solutation_by_credit" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="source_credit_id">
                <Form.Label>Feladat forrása</Form.Label>
                <Form.Control type="text" placeholder="Honnan van a feladat?" defaultValue={source} name="source" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="major_id">
                <Form.Label>Szak</Form.Label>
                <Form.Control type="text" placeholder="Milyen szakról van a feladat?" defaultValue={major} name="major" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="level_id">
                <Form.Label>Képzés:</Form.Label>
                <Form.Control type="text" placeholder="Milyen képzésről van a feladat?" defaultValue={level} name="level" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="difficulty_id">
                <Form.Label>Nehézség:</Form.Label>
                <Form.Control type="text" placeholder="Milyen nehézségű a feladat?" defaultValue={difficulty} name="difficulty" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="time_id">
                <Form.Label>Időt:</Form.Label>
                <Form.Control type="text" placeholder="Milyen nehézségű a feladat?" defaultValue={time} name="time" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="topic_id">
                <Form.Label>Téma</Form.Label>
                <Form.Control type="text" placeholder="Milyen témákörben a feladat(Algebra,Valőszínűség)" defaultValue={topic} name="topic" onChange={handler}/>
            </Form.Group>
            <hr/>
            <Form.Group controlId="solutation_id">
                <Image src={task_image} style={{width : '20vw'}} rounded />
                <Form.File id="taskDescription_id" label="A feladat leírása..." name="task_description" onChange={taskImageChange} />
            </Form.Group>
            <hr />
            <Form.Group controlId="solutation_id">
            <Image src={task_solution} style={{width : '20vw'}} rounded />
            <Form.File id="solutation_id" label="Megoldás röviden" name="solutation" onChange={taskImageSolutionChange} />
            </Form.Group>
            <hr />
            <Form.Group>
            <Image src={task_solution_stepbystep} style={{width : '20vw'}} rounded />
                <Form.File id="stepbystep_img" label="Egy kép a részletes megoldásról" name="solutation_stepbystep" onChange={taskImageSolutionStepbyStep} />
            </Form.Group>
            <hr />
            <Button onClick={Submitedit} block>Szerkeztés</Button>
        </Form>
    )
}
export default EditMatcard;

