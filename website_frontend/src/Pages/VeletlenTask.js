import React,{Component} from 'react';
import {Form,Button} from 'react-bootstrap';
import MatAlapCard from '../Components/MatAlapCard';

class VeletlenPage extends Component{
    constructor(props){//category and tasks
        super(props);
        this.state = {
            selected_Category : "",
            FilerTasks : [],
            db : 0,
            max: 0,
            RandomMatTaskNumber: [],
        }
    }
    onClickFiler =  () =>{
        let max_probalkozasok = 10;
        const MatAlapTasks = this.props.MatAlapTasks.filter(x=>x.topic===this.state.selected_Category);
        this.setState({FilerTasks: MatAlapTasks});
        const {max,db} = this.state;
        let randomTasksNumber_ = [];
        for(let i=0;i<db;i++){
            let random_szam = Math.floor(Math.random()*max);
            let i = 0;
            while(randomTasksNumber_.includes(random_szam)&&i<max_probalkozasok){
                random_szam = Math.floor(Math.random()*max);
                i++;
            }
            if(i<max_probalkozasok){
                randomTasksNumber_.push(random_szam);
            }
        }
        this.setState({RandomMatTaskNumber: randomTasksNumber_});

    }
    onSelectChange = (event) => {
        this.setState({RandomMatTaskNumber: []});
        this.setState({db:0});
        this.setState({selected_Category:event.target.value});
        const MatAlapTasks = this.props.MatAlapTasks.filter(x=>x.topic===event.target.value);
        this.setState({max: MatAlapTasks.length}) ;
    }
    onChangeDb = (event) => {
        this.setState({db : event.target.value})
    }
    render(){
        let HasCateg = [];
        const MatAlapCategories = this.props.MatAlapTasks.map((MatAlapTask,i)=>{
                if(!HasCateg.includes(this.props.MatAlapTasks[i].topic)){
                    HasCateg.push(this.props.MatAlapTasks[i].topic);
                    return MatAlapTask.topic;
                }
                else{
                    return "";
                }
        }); 
        const Option_Cat = MatAlapCategories.map((Category) =>{
            if(Category!==""){
                return (<option>{Category}</option>);
            }
            else{
                return "";
            }
        });
         //ne égjen ki 100-as nagyságoknál
        const {max,RandomMatTaskNumber,FilerTasks} = this.state;
        //const RandomTask = this.state.FilerTasks[Math.floor(Math.random()*max)];
        const fileterTasks = (max > 0) ? 
        RandomMatTaskNumber.map((taskIndex) => {
            return (<MatAlapCard topic={FilerTasks[taskIndex].topic} task_type={FilerTasks[taskIndex].task_type} task_image={FilerTasks[taskIndex].task_description} task_solution={FilerTasks[taskIndex].solutation} task_solution_stepbystep={FilerTasks[taskIndex].solutation_stepbystep}/>);
        })
        :
        "Nincs még kijelölve kategória";

        return(
            <div className={"bg-light min-vh-100 p-5 rounded"}>
             <Form>   
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Válassz kategóriát!</Form.Label>
            <Form.Control as="select" onChange={this.onSelectChange}>
               <option>Válassz valamit</option> 
              {Option_Cat}
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
export default VeletlenPage;