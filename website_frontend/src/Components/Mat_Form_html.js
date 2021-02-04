import React from 'react';
import {Form,Button} from 'react-bootstrap';

const MatFormHtml = ({myChangeHandler,submitMatAlap,onFileChange,onFileChangeTaskDesc,onFileChangeSolutation,MatAlapCategories}) =>{
    const Option_Cat = MatAlapCategories.map((Category) =>{
        if(Category!==""){
            return (<li key={Category}>{Category}</li>);
        }
        else{
          return "";
        }
    });
    return (
       <div>   
      <Form className="bg-light p-3">
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
      <Form.Group controlId="topic_examples">
        Ezek már voltak
        <ul>{Option_Cat}</ul>
        
      </Form.Group>
      <Form.Group controlId="task_level_id">
        <Form.Label>Milyen szinten vannak a kérdések?</Form.Label>
        <Form.Control as="select" name="level" onChange={myChangeHandler} >
        <option>Please select</option>
          <option>Középiskola</option>
          <option>Bsc</option>
          <option>Msc</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.File id="taskDescription_id" label="A feladat leírása..." name="task_description" onChange={onFileChangeTaskDesc} />
      </Form.Group>
      <Form.Group controlId="solutation_id">
      <Form.File id="taskDescription_id" label="Megoldás röviden" name="solutation" onChange={onFileChangeSolutation} />
      </Form.Group>
      <Form.Group>
        <Form.File id="stepbystep_img" label="Egy kép a részletes megoldásról" name="solutation_stepbystep" onChange={onFileChange} />
      </Form.Group>
      <Form.Group controlId="major_id">
        <Form.Label>Szak</Form.Label>
        <Form.Control type="text" placeholder="Milyen szak előadásán fordult elő?" name="major" onChange={myChangeHandler} />
      </Form.Group>
      <Form.Group controlId="source_id">
        <Form.Label>Forrás</Form.Label>
        <Form.Control type="text" name="source" placeholder="Egy link ahol a feladat volt(legjobb ha valamilyen egyetemes oldal elte./corvinus.)" onChange={myChangeHandler} />
      </Form.Group>
      <Form.Group controlId="solutation_by_id">
        <Form.Label>Ki készítette a megoldást?</Form.Label>
        <Form.Control type="text" name="solutation_by" placeholder="Csak egy név pl Kozsik Zoltán" onChange={myChangeHandler}/>
      </Form.Group>
      <Form.Group controlId="solutation_by_credit_id">
        <Form.Label>Hol elérhető a megoldó?</Form.Label>
        <Form.Control type="text" name="solutation_by_credit" placeholder="A legjobb valamilyen weblap" onChange={myChangeHandler} />
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
            <Form.Control as="select" name="difficulty" required={true} onChange={myChangeHandler} >
            <option>Please select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>         
            </Form.Control>
          </Form.Group>
    <Button type="submit" className="mb-2" onClick={submitMatAlap} block>
          Feltöltés!
    </Button>
    </Form>
    </div>
   )
};
export default MatFormHtml;