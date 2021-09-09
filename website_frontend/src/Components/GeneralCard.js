import React,{Component} from 'react';
import {Card,Button} from 'react-bootstrap';
import EditGeneralcard from './editGeneralCard';
import api from '../api/api';
import S3FileUpload from 'react-s3';

class GeneralCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            solution_showed : false,
            editShow: false,
            item_id : 0,
            topic : '',
            task_type : '',
            solution_by : '',
            solution_by_credit : '',
            source : '',
            major: '',
            semester: '',
            subject_name : '',
            university : '',
            difficulty : 0,
            time : 0,
            taskImageChanged: false,
            task_description : '',
            taskImageSolutionChanged : false,
            solution: ''
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };
    onShowEdit = () => {
        this.setState({editShow : !this.state.editShow});
    }
    componentDidMount(){
        this.setState({
            item_id : this.props.AltanaosTask._id,
            difficulty : this.props.AltanaosTask.difficulty,
            major : this.props.AltanaosTask.major,
            semester : this.props.AltanaosTask.semester,
            solution : this.props.AltanaosTask.solution,
            solution_by : this.props.AltanaosTask.solution_by,
            solution_by_credit : this.props.AltanaosTask.solution_by_credit,
            source : this.props.AltanaosTask.source,
            subject_name : this.props.AltanaosTask.subject_name,
            task_description : this.props.AltanaosTask.task_description,
            task_type : this.props.AltanaosTask.task_type,
            time : this.props.AltanaosTask.time,
            topic : this.props.AltanaosTask.topic,
            university : this.props.AltanaosTask.university
        });
    }
    onShowSolutation = () => {
        this.setState({solution_showed : true});
    }
    componentWillReceiveProps(){
        this.setState({solution_showed:false});
    }
    taskImageChange = (event) => {
        if(event.target.files[0]){
            this.setState({task_description: event.target.files[0],taskImageChanged:true});
        }
    }
    taskImageSolutionChange = (event) => {
        if(event.target.files[0]){
            this.setState({solution: event.target.files[0],taskImageSolutionChanged:true});
        }
    }
    deleteImageFromS3 = async () => {
        const task_image = this.props.task_description;
        const task_solution = this.props.solution;
        const {taskImageChanged,taskImageSolutionChanged}  = this.state;
        const config = {
            bucketName: 'unilearning',
            dirName: 'GeneralTask_solution',
            region: 'eu-central-1',
            accessKeyId: process.env.REACT_APP_Bucket_ID,
            secretAccessKey: process.env.REACT_APP_Bucket_Key,
          }
          const taskImage = task_image.split('/')[task_image.split('/').length-1];
          const taskSolution = task_solution.split('/')[task_solution.split('/').length-1];
          if(taskImageChanged){
                await   S3FileUpload.deleteFile(taskImage,config).then(
                    response=>{
                        console.log(response);
                        }).catch(error=>console.log(error));
            }
            if(taskImageSolutionChanged){
                await  S3FileUpload.deleteFile(taskSolution,config).then(
                            response=>{
                                console.log(response);
                            }).catch(error=>console.log(error));
            }
    }
    uploadFileToS3 = async () => {
        const {taskImageChanged,taskImageSolutionChanged,task_description,solution}  = this.state;
        const config = {
            bucketName: 'unilearning',
            dirName: 'GeneralTask_solution',
            region: 'eu-central-1',
          accessKeyId: process.env.REACT_APP_Bucket_ID,
          secretAccessKey: process.env.REACT_APP_Bucket_Key,
        }
        if(taskImageChanged){
            const taskDesc = await S3FileUpload.uploadFile(task_description, config);
            this.setState({task_description : taskDesc.location});
            console.log("Kép megváltoztatva");
        }
        if(taskImageSolutionChanged){
            const solutionS3 = await S3FileUpload.uploadFile(solution, config);
            this.setState({solution : solutionS3.location});
            console.log("Kép megváltoztatva");
        }
      };
    Submitedit = async (event) => {
        event.preventDefault();
        await this.deleteImageFromS3();
        await this.uploadFileToS3();
        const {item_id,difficulty,major,semester,solution,solution_by,solution_by_credit,source,subject_name,task_description,task_type,time,topic,university} = this.state;
        const playload = {difficulty,major,semester,solution,solution_by,solution_by_credit,source,subject_name,task_description,task_type,time,topic,university};
        await api.updateGeneralTask(item_id,playload).then((response) => {
            if (response.status===200)
                {
                    console.log(playload);
                    console.log("Sikeres update ezen a card-on");
                }
            else{
                console.log("Failed with erros status");
            }    
            }).catch(res => console.log(res.error));
        await this.setState({taskImageChanged:false,taskImageSolutionChanged:false});    
        await this.props.loadData();    
    }
    submitDetelte = async () =>{
        if(window.confirm("Biztos törölni akarod?")){   
            await this.setState({taskImageChanged : true,taskImageSolutionChanged : true}); //a törlés csak így mükdődik, mivel az update-nél is ez van használva
            this.deleteImageFromS3();
            const {item_id} = this.state;                              
            await api.deleteGeneralTask(item_id).then((response) => {
                console.log(response);  
            }).catch(error => console.log(error));
            await this.props.loadData(); 
        }
        else{
            console.log("Egy törlés meg lett szakítva")
        }
        await this.props.loadData();
    }
    render() {
        const {isAdmin} = this.props;
        const {topic,task_type,task_description,solution,subject_name,major,semester,source,solution_by,solution_by_credit,difficulty,university,time} = this.props.AltanaosTask;
        const id = this.state.item_id;
        return(
            <Card style={{ width: '100%'}} className="mx-auto shadow-sm p-3 mb-5 bg-white" fluid>
                { isAdmin ? 
            <Button onClick={this.submitDetelte} variant='dark' className='p-10' block>Törlés</Button>
            :
            ""
                }
                <hr />
            <Card.Body>
                  <Card.Title>{topic}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{task_type} | {major}/{subject_name}/{semester} félév</Card.Subtitle>
                  <Card.Img variant="top"  src={task_description} />
                  <Card.Text>
                  <hr />
              </Card.Text>
                  {this.state.solution_showed? <Card.Img variant="middle" src={solution} /> : <Button variant="secondary" onClick={this.onShowSolutation} block>Megoldás</Button>}
            </Card.Body>
            <Card.Body bg="dark">
              <hr />
              {isAdmin ? (this.state.editShow ?<Card.Link onClick={this.onShowEdit} ><Button classsName="danger" variant="danger" block>Bezárás</Button></Card.Link> :<Card.Link onClick={this.onShowEdit} ><Button variant="warning" block>Szerkeztés</Button></Card.Link>) : ""}
            {this.state.editShow ? 
                    <div><EditGeneralcard 
                    Submitedit={this.Submitedit} 
                    id={id} 
                    handler={this.myChangeHandler} 
                    topic={topic} 
                    task_type={task_type} 
                    task_image={task_description} 
                    task_solution={solution} 
                    taskImageChange={this.taskImageChange}
                    taskImageSolutionChange={this.taskImageSolutionChange}
                    solutation_by={solution_by}
                    major={major}
                    subject_name={subject_name}
                    university={university}
                    semester={semester}
                    difficulty={difficulty}
                    solutation_by_credit={solution_by_credit}
                    source={source}
                    time={time}
                    /></div>
                     : ""
                    }
                </Card.Body>
            </Card>      
        )
    }
}
export default GeneralCard;