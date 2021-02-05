import React from 'react';
import {Form,Button,Image} from 'react-bootstrap';


const EditGeneralcard = ({
    Submitedit,
    id,
    handler,
    topic,
    task_type,
    task_image,
    task_solution,
    taskImageChange,
    taskImageSolutionChange,
    solutation_by,
    major,
    semester,
    subject_name,
    university,
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
            <Form.Group controlId="solution_by_id">
                <Form.Label>Készítő</Form.Label>
                <Form.Control type="text" placeholder="Ki készítette a feladatot?" defaultValue={solutation_by} name="solution_by" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="solution_by_credit_id">
                <Form.Label>Készítő weblap link</Form.Label>
                <Form.Control type="text" placeholder="A készítő weboldal link-je" defaultValue={solutation_by_credit} name="solution_by_credit" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="source_id">
                <Form.Label>Feladat forrása</Form.Label>
                <Form.Control type="text" placeholder="Honnan van a feladat?" defaultValue={source} name="source" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="major_id">
                <Form.Label>Szak</Form.Label>
                <Form.Control type="text" placeholder="Milyen szakról van a feladat?" defaultValue={major} name="major" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="university_id">
                <Form.Label>Egytem neve:</Form.Label>
                <Form.Control type="text" placeholder="Mi az egyetem neve, ahol tantárgy van?" defaultValue={university} name="university" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="semester_id">
                <Form.Label>Melyik félév:</Form.Label>
                <Form.Control type="text" placeholder="Melyik félévben volt ez a tantárgy?" defaultValue={semester} name="semester" onChange={handler}/>
            </Form.Group>
            <Form.Group controlId="subject_name_id">
                <Form.Label>Tantárgy neve:</Form.Label>
                <Form.Control type="text" placeholder="Mi a tantárgy neve?" defaultValue={subject_name} name="subject_name" onChange={handler}/>
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
                <Form.Control type="text" placeholder="Milyen témákörben a feladat(Haskell, Programozási alapismeretek)" defaultValue={topic} name="topic" onChange={handler}/>
            </Form.Group>
            <hr/>
            <Form.Group controlId="solutation_id">
                <Image src={task_image} style={{width : '20vw'}} rounded />
                <Form.File id="taskDescription_id" label="A feladat leírása..." name="task_description" onChange={taskImageChange} />
            </Form.Group>
            <hr />
            <Form.Group controlId="solution_id">
            <Image src={task_solution} style={{width : '20vw'}} rounded />
            <Form.File id="solution_id" label="Kép a megoldásról" name="solution" onChange={taskImageSolutionChange} />
            </Form.Group>
            <hr />
            <Button onClick={Submitedit} block>Szerkeztés</Button>
        </Form>
    )
}
export default EditGeneralcard;

