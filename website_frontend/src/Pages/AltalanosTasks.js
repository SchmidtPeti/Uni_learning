import React from 'react';
import GeneralCard from '../Components/GeneralCard';
import {Form} from 'react-bootstrap';
import loading_img from '../images/loading.gif';


 class AltalanosPage extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            AltalanosTasks :[],
            CurrentSubject: "-",    
         };
     }
     componentDidMount(){
         this.setState({AltalanosTasks:this.props.AltalanosTasks})
     }
     onChangeSubject = (event) => {
         this.setState({CurrentSubject:event.target.value});
     }
     render(){
        const {AltanaosTasks} = this.props;
        let HasSubjectName = [];
        const GeneralTaskSubjectNames = AltanaosTasks.map((AltanaosTask,i)=>{
                if(!HasSubjectName.includes(AltanaosTasks[i].subject_name)){
                    HasSubjectName.push(AltanaosTasks[i].subject_name);
                    return AltanaosTask.subject_name;
                }
                else{
                    return "";
                }
        }); 
        const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
        const Option_subName = GeneralTaskSubjectNames.map((SubjectName) =>{
            if(SubjectName!==""){
        return (<option key={SubjectName} value={SubjectName}>{SubjectName}</option>);
            }
            else{
                return '';
            }
        });
        const MAX_ALTALNOS_AZ_ELEJEN=10;
        let maxAltCounter=0;
        let filtered_AltalanosTasks = [];
        let az_elso_kidobos_lista = AltanaosTasks;
        az_elso_kidobos_lista.reverse();
        for(let i=0;i<AltanaosTasks.length;i++){
            if(this.state.CurrentSubject==="*"){
                filtered_AltalanosTasks.push(AltanaosTasks[i]);
            }
            else if(AltanaosTasks[i].subject_name===this.state.CurrentSubject) {
                filtered_AltalanosTasks.push(AltanaosTasks[i]);
            }
            else if(this.state.CurrentSubject==="-"&&maxAltCounter<MAX_ALTALNOS_AZ_ELEJEN){
                filtered_AltalanosTasks.push(az_elso_kidobos_lista[i]);    
                maxAltCounter++;
            }
        }
        const AltalanosTasks = filtered_AltalanosTasks.map((i,AltanaosTask)=>{
            return (<GeneralCard key={i} AltanaosTask={i}/>)
        }).reverse();
        return (<div className={"bg-light min-vh-100 p-5 rounded "}>
                            <Form.Group controlId="AltalanosSubject">
              <Form.Label>Melyik tantárgy?</Form.Label>
              <Form.Control as="select" name="AltalanosSubject" onChange={this.onChangeSubject}>
                <option value="-">Kérlek válassz!</option>  
                <option value="*">Összes</option>   
                {Option_subName}  
              </Form.Control>
                </Form.Group>
                
            {this.props.isLoading ?  Loading : AltalanosTasks}
            </div>);
     }
 }
 export default AltalanosPage;