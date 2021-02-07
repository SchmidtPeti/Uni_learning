import React from 'react';
import MatAlapCard from '../Components/MatAlapCard';
import {Form} from 'react-bootstrap';
import loading_img from '../images/loading.gif';



class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            MatAlapTasks : [],
            From : 0,
            current_category : "-",
            to : 0,
            max : 0,
        }

    }
    componentDidMount(){
        this.setState({MatAlapTasks : this.props.MatAlapTasks});
    }
    selectedCategory = (event) =>{
        this.setState({current_category : event.target.value});
    }
    render(){
        const {MatAlapTasks} = this.props;
        let HasCateg = ["*"];
        const MatAlapCategories = MatAlapTasks.map((MatAlapTask,i)=>{
                if(!HasCateg.includes(MatAlapTasks[i].topic)){
                    HasCateg.push(MatAlapTasks[i].topic);
                    return MatAlapTask.topic;
                }
                else{
                    return "";
                }
        }); 
        const Option_Cat = MatAlapCategories.map((Category) =>{
            if(Category!==""){
        return (<option key={Category} value={Category}>{Category}</option>);
            }
            else{
                return '';
            }
        });
        const MAX_FELADATOK_ALAPBOL=10;
        let feladatokSzamolo = 0;
        let filtered_MatAlapTasks = [];
        let ujakElol=MatAlapTasks;
        ujakElol.reverse();
        for(let i=0;i<MatAlapTasks.length;i++){
            if(this.state.current_category==="*"){
                filtered_MatAlapTasks.push(MatAlapTasks[i]);
                }
                else if(this.state.current_category==="-"){
                    if(feladatokSzamolo<MAX_FELADATOK_ALAPBOL){
                        filtered_MatAlapTasks.push(ujakElol[i]);
                        feladatokSzamolo++;
                    }
                }
                else if(MatAlapTasks[i].topic===this.state.current_category) {
                    filtered_MatAlapTasks.push(MatAlapTasks[i]);
                }
        }
        filtered_MatAlapTasks.reverse();
        const MatTaskCard = filtered_MatAlapTasks.map((matalapTask)=>{
            return (
                <MatAlapCard 
                isAdmin={this.props.isAdmin}
                loadData={this.props.loadData}  
                MatalapTask={matalapTask} 
                id={matalapTask._id} 
                topic={matalapTask.topic} 
                task_type={matalapTask.task_type} 
                task_image={matalapTask.task_description} 
                task_solution={matalapTask.solutation} 
                task_solution_stepbystep={matalapTask.solutation_stepbystep}  />
            )
        }).reverse();
        const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
        if(MatAlapTasks.length>0){
        return(
            <div className='bg-light min-vh-100 p-5 rounded'>
                <Form.Group controlId="Matalap_Category">
              <Form.Label>Milyen kategóriájú feladatok?</Form.Label>
              <Form.Control as="select" name="Matalap_Category" onChange={this.selectedCategory}>
                <option value="-">Kérlek válassz!</option>  
                <option value="*">Összes</option>   
                {Option_Cat}  
              </Form.Control>
                </Form.Group>
                {MatTaskCard}
            </div>   
        )}
        else{
            return (
            <div className='bg-light min-vh-100 p-5 rounded'>
             {Loading}
            </div>)
        }
    }
}
export default HomePage;