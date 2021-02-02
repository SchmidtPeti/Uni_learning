import React,{Component} from 'react';
import {Form,Button} from 'react-bootstrap';
import GeneralCard from '../Components/GeneralCard';
class VeletlenGeneralTask extends Component{
    constructor(props){//GeneralTasks
        super(props);
        this.state = {
            selectedSubjectName : "",
            FilerTasks : [],
            GeneralTasks: [],
            db: 0,
            max: 0,
            randomTasksNumber: [],
        }
    }
    onSelectChange = (event) => {
        this.setState({randomTasksNumber: []});
        this.setState({db:0});
        this.setState({selectedSubjectName:event.target.value});
        this.setState({max : this.state.GeneralTasks.filter(x=>x.subject_name===event.target.value).length});
        const filterTasks = this.state.GeneralTasks.filter(x=>x.subject_name===event.target.value);
        this.setState({FilerTasks: filterTasks});
    }
    onClickFiler =  () =>{
        const {FilerTasks} = this.state;
        let max_probalkozasok = 10; //ne égjen ki 100-as nagyságoknál
        let randomTasksNumber_ = [];
        for(let i=0;i<this.state.db;i++){
            let random_szam = Math.floor(Math.random()*FilerTasks.length);
            let i = 0;
            while(randomTasksNumber_.includes(random_szam)&&i<max_probalkozasok){
                random_szam = Math.floor(Math.random()*FilerTasks.length);
                i++;
            }
            if(i<max_probalkozasok){
                randomTasksNumber_.push(random_szam);
            }
        }
        this.setState({randomTasksNumber: randomTasksNumber_});
    }
    onChangeDb = (event) => {
        this.setState({db: event.target.value});
    }
    componentDidMount(){
        this.setState({GeneralTasks : this.props.GeneralTasks});
    }
    render(){
        let HasSubjectName = [];
        const {FilerTasks,GeneralTasks,randomTasksNumber} = this.state;
        const GeneralTaskSubjectNames = GeneralTasks===undefined ? [] : GeneralTasks.map((GeneralTask,i)=>{
                if(!HasSubjectName.includes(GeneralTask.subject_name)){
                    HasSubjectName.push(GeneralTask.subject_name);
                    return GeneralTask.subject_name;
                }
                else{
                    return "";
                }
        }); 
        const Option_subName = GeneralTaskSubjectNames.map((SubjectName) =>{
            if(SubjectName!==""){
        return (<option>{SubjectName}</option>);
            }
        });
        const RandomTasks = randomTasksNumber.length>0 ? randomTasksNumber.map((tasknumber)=>{
            return (<GeneralCard AltanaosTask={FilerTasks[tasknumber]}  />);
        }) : (<h1>Még nincs variáció</h1>);
        const fileterTasks = (randomTasksNumber.length > 0) ? 
        <div>
        {RandomTasks}
        </div>
        :
        "Nincs még kijelölve tantárgy név";
        return(
            <div className="bg-light min-vh-100 p-5 rounded">
             <Form >   
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Tantárgy név</Form.Label>
            <Form.Control as="select" onChange={this.onSelectChange}>
               <option>Válassz valamit</option> 
              {Option_subName}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control type="number" onChange={this.onChangeDb} placeholder="Hány darabot?" min={0} value={this.state.db} max={this.state.max} />
            </Form.Group>
          <Button onClick={this.onClickFiler} className={"btn-lg btn-block"}>Mehet</Button>
            {fileterTasks}
           </Form> 
          </div>
        )
    }
}
export default VeletlenGeneralTask;