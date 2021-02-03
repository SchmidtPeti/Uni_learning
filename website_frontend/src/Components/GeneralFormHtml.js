import {Form,Button} from 'react-bootstrap';
import React from 'react';

const GeneralFormHtml = ({myChangeHandler,submitGeneralTask,onFileChangeTaskDesc,onFileChangeSolutation,GeneralTasks,Option_subName}) => {
    return (
        <div className='whole_form'>
          <Form className="bg-light p-3">
          <Form.Group>
            <Form.File id="taskDescription_id" label="A feladat leírása..." name="task_description" onChange={onFileChangeTaskDesc} />
          </Form.Group>
          <Form.Group controlId="task_type_id">
            <Form.Label>Milyen típusú feladat?</Form.Label>
            <Form.Control as="select" name="task_type" onChange={myChangeHandler}>
            <option>Please select</option>
              <option>Elmélet</option>
              <option>Gyakorlat</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="topic_id">
            <Form.Label>Téma</Form.Label>
            <Form.Control type="text" placeholder="Milyen témákörben a feladat(Algebra,Valőszínűség)" name="topic" onChange={myChangeHandler}/>
          </Form.Group>
          <Form.Group controlId="solution_id">
          <Form.File id="taskDescription_id" label="Megoldás röviden" name="solution" onChange={onFileChangeSolutation} />
          </Form.Group>
          <Form.Group controlId="major_id">
            <Form.Label>Szak</Form.Label>
            <Form.Control type="text" placeholder="Milyen szak előadásán fordult elő?" name="major" onChange={myChangeHandler} />
          </Form.Group>        
          <Form.Group controlId="semster_id">
            <Form.Label>Melyik félévben?</Form.Label>
            <Form.Control type="text" name="semester" placeholder="Melyik félév tanterv szerint(pl 1,2,3)" onChange={myChangeHandler} />
          </Form.Group>
          <Form.Group controlId="subject_id">
            <Form.Label>Mi a tantárgy neve az egyetmen?</Form.Label>
            <Form.Control type="text" name="subject_name" placeholder="Mi a neve a tantárgynak?" onChange={myChangeHandler} />
            <Form.Group controlId="subject_examples">
                  Milyen tantárgyak vannak már a rendszerben?
                  <ul>
                  {Option_subName}
                  </ul>
                </Form.Group>
          </Form.Group>
          <Form.Group controlId="university_id">
            <Form.Label>Melyik egyetmen van ez a tantárgy</Form.Label>
            <Form.Control type="text" name="university" placeholder="Az egyetem neve(ELTE,CORVINUS, stb...)" onChange={myChangeHandler} />
          </Form.Group>
          <Form.Group controlId="source_id">
            <Form.Label>Forrás</Form.Label>
            <Form.Control type="text" name="source" placeholder="Egy link ahol a feladat volt(legjobb ha valamilyen egyetemes oldal elte./corvinus.)" onChange={myChangeHandler} />
          </Form.Group>
          <Form.Group controlId="solution_by_id">
            <Form.Label>Ki készítette a megoldást?</Form.Label>
            <Form.Control type="text" name="solution_by" placeholder="Csak egy név pl Kozsik Zoltán" onChange={myChangeHandler}/>
          </Form.Group>
          <Form.Group controlId="solution_by_credit_id">
            <Form.Label>Hol elérhető a megoldó?</Form.Label>
            <Form.Control type="text" name="solution_by_credit" placeholder="A legjobb valamilyen weblap" onChange={myChangeHandler} />
          </Form.Group>
        <Form.Group controlId="hardness_id">
                <Form.Label>Mennyi időt vett a fel feladat(az egységek relativitást jelölnek)</Form.Label>
                <Form.Control as="select" name="time" onChange={myChangeHandler}>
                  <option>Please select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>         
                </Form.Control>
              </Form.Group>
        <Form.Group controlId="hardness_id">
                <Form.Label>Milyen nehéznek itéled a feladatot(nagyobb nehezebb)</Form.Label>
                <Form.Control as="select" name="difficulty" onChange={myChangeHandler} >
                <option>Please select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>         
                </Form.Control>
              </Form.Group>
        <Button type="submit" className="mb-2" onClick={submitGeneralTask}>
              Feltöltés!
        </Button>
        </Form>
  
        </div>
    )

}
export default GeneralFormHtml;