import React,{Component} from 'react';
import {Card,Button} from 'react-bootstrap';
import EditMatcard from './editMatcard';
import api from '../api/api';
import S3FileUpload from 'react-s3';


class MatAlapCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            solution_showed : false,
            solution_stepbystep_showed : false,
            editShow: false,
            item_id : 0,
            topic : '',
            task_type : '',
            solutation_by : '',
            solutation_by_credit : '',
            source : '',
            major: '',
            level: '',
            difficulty : 0,
            time : 0,
            taskImageChanged: false,
            task_image : '',
            taskImageSolutionChanged : false,
            task_solution : '',
            taskSolutionStepybyStep : false,
            task_solution_stepbystep : ''
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };
    componentDidMount(){
        const {topic,task_type,_id} = this.props.MatalapTask;
        const task_image = this.props.MatalapTask.task_description;
        const task_solution = this.props.MatalapTask.solutation;
        const task_solution_stepbystep = this.props.MatalapTask.solutation_stepbystep;
        const solutation_by = this.props.MatalapTask.solutation_by;
        const solutation_by_credit = this.props.MatalapTask.solutation_by_credit;
        const source = this.props.MatalapTask.source;
        const major = this.props.MatalapTask.major;
        const level = this.props.MatalapTask.level;
        const difficulty = this.props.MatalapTask.difficulty;
        const time = this.props.MatalapTask.time;
        this.setState({
            topic: topic,
            item_id: _id,
            task_type:task_type,
            task_image: task_image,
            task_solution : task_solution,
            task_solution_stepbystep: task_solution_stepbystep,
            solutation_by : solutation_by,
            solutation_by_credit: solutation_by_credit,
            source : source,
            major : major,
            level: level,
            difficulty : difficulty,
            time : time
        })
    }
    uploadFileToS3 = async () => {
        const {taskImageChanged,taskImageSolutionChanged,taskSolutionStepybyStep}  = this.state;
        const config = {
          bucketName: 'unilearning',
          dirName: 'MatAlap_solutation',
          region: 'eu-central-1',
          accessKeyId: process.env.REACT_APP_Bucket_ID,
          secretAccessKey: process.env.REACT_APP_Bucket_Key,
        }
        if(taskImageChanged){
        const taskDesc = await S3FileUpload.uploadFile(this.state.task_image, config);
        this.setState({task_image : taskDesc.location});
        console.log("Kép megváltoztatva");
        }
        if(taskImageSolutionChanged){
            const solution = await S3FileUpload.uploadFile(this.state.task_solution, config);
            this.setState({task_solution : solution.location});
            console.log("Kép megváltoztatva");
        }
        if(taskSolutionStepybyStep){
            const solutionBy = await S3FileUpload.uploadFile(this.state.task_solution_stepbystep, config);
            this.setState({ task_solution_stepbystep : solutionBy.location});
            console.log("Kép megváltoztatva");
        }
      };
    taskImageChange = (event) => {
        if(event.target.files[0]){
            this.setState({task_image: event.target.files[0],taskImageChanged:true});
        }
    }
    taskImageSolutionChange = (event) => {
        if(event.target.files[0]){
            this.setState({task_solution: event.target.files[0],taskImageSolutionChanged:true});
        }
    }
    taskImageSolutionStepbyStep = (event) => {
        if(event.target.files[0]){
            this.setState({task_solution_stepbystep: event.target.files[0],taskSolutionStepybyStep:true});
        }
    }
    Submitedit = async (event) => {
        event.preventDefault();
        await this.deleteImageFromS3();
        await this.uploadFileToS3();
        const {topic,task_type,task_image,task_solution,task_solution_stepbystep,solutation_by,solutation_by_credit,source,major,level,difficulty,time,item_id} = this.state;
        const playload = {topic,task_type,task_image,task_solution,task_solution_stepbystep,solutation_by,solutation_by_credit,source,major,level,difficulty,time};
        await api.updateMatTask(item_id,playload).then((response) => {
            if (response.status===200)
                {
                    console.log(playload);
                    console.log("Sikeres update ezen a card-on");
                }
            else{
                console.log("Failed with erros status");
            }    
            }).catch(res => console.log(res.error));
        this.setState({taskImageChanged:false,taskImageSolutionChanged:false,taskSolutionStepybyStep:false});    
        await this.props.loadData();    
    }
    
    deleteImageFromS3 = async () => {
        const task_image = this.props.MatalapTask.task_description;
        const task_solution = this.props.MatalapTask.solutation;
        const task_solution_stepbystep = this.props.MatalapTask.solutation_stepbystep;     
        const {taskImageChanged,taskImageSolutionChanged,taskSolutionStepybyStep}  = this.state;
        const config = {
            bucketName: 'unilearning',
            dirName: 'MatAlap_solutation',
            region: 'eu-central-1',
            accessKeyId: process.env.REACT_APP_Bucket_ID,
            secretAccessKey: process.env.REACT_APP_Bucket_Key,
          }
          const taskImage = task_image.split('/')[task_image.split('/').length-1];
          const taskSolution = task_solution.split('/')[task_solution.split('/').length-1];
          const fileNameTastStepByStep = task_solution_stepbystep.split('/')[task_solution_stepbystep.split('/').length-1];
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
            if(taskSolutionStepybyStep){
         await S3FileUpload.deleteFile(fileNameTastStepByStep,config).then(
                        response=>{
                            console.log(response);
                          }).catch(error=>console.log(error));    
                        }
    }
    submitDetelte = async () =>{
        if(window.confirm("Biztos törölni akarod?")){   
            await this.setState({taskImageChanged : true,taskImageSolutionChanged : true,taskSolutionStepybyStep:true}); //a törlés csak így mükdődik, mivel az update-nél is ez van használva
            this.deleteImageFromS3();
            const {item_id} = this.state;                              
            await api.deleteMatTask(item_id).then((response) => {
                console.log(response);  
            }).catch(error => console.log(error));
            await this.props.loadData(); 
        }
        else{
            console.log("Egy törlés meg lett szakítva")
        }
        await this.props.loadData();
    }
    onShowEdit = () => {
        this.setState({editShow : !this.state.editShow});
    }
    onShowSolutation = () => {
        this.setState({solution_showed : true});
    }
    onSolution_stepbystep = () => {
        this.setState({solution_stepbystep_showed : true})
    }
    setHiddenAnswers = () => {
        this.setState({solution_showed: false, solution_stepbystep_showed:false})
    }
    componentWillReceiveProps(){
        this.setHiddenAnswers();
    }
    render() {
        const {topic,task_type} = this.state;
        const task_image = this.props.MatalapTask.task_description;
        const task_solution = this.props.MatalapTask.solutation;
        const task_solution_stepbystep = this.props.MatalapTask.solutation_stepbystep;  
        const id = this.state.item_id;
        const {solution_showed,solution_stepbystep_showed} = this.state;
        return (
            <Card style={{ width: '100%'}} className="mx-auto shadow-sm p-3 mb-5 bg-white" fluid>
            <Button onClick={this.submitDetelte} variant='dark' className='p-10' block>Törlés</Button>

            <Card.Body>
                  <Card.Title>{topic}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{task_type}</Card.Subtitle>
                  <Card.Img variant="top"  src={task_image}/>
                  <Card.Text>
                      <hr />
                </Card.Text>
              <Card.Link>
                  {solution_showed? <Card.Img variant="middle" src={task_solution} /> : <Button onClick={this.onShowSolutation} variant="primary" block>Megoldás</Button>}
              </Card.Link>              
              <Card.Text>
                    <hr />
              </Card.Text>
              {solution_stepbystep_showed? <Card.Img variant="bottom" src={task_solution_stepbystep} /> : <Button onClick={this.onSolution_stepbystep} variant="secondary" block>Megoldás részletesen</Button>}
              </Card.Body>
              <Card.Body bg="dark">
              <hr />
              {this.state.editShow ?<Card.Link onClick={this.onShowEdit} ><Button classsName="danger" variant="danger" block>Bezárás</Button></Card.Link> :<Card.Link onClick={this.onShowEdit} ><Button variant="warning" block>Szerkeztés</Button></Card.Link>}
{this.state.editShow ? 
                    <div><EditMatcard 
                    Submitedit={this.Submitedit} 
                    id={id} 
                    handler={this.myChangeHandler} 
                    topic={this.state.topic} 
                    task_type={task_type} 
                    task_image={task_image} 
                    task_solution={task_solution} 
                    task_solution_stepbystep={task_solution_stepbystep} 
                    editMatTaskSolution={this.editMatTaskSolution}
                    taskImageChange={this.taskImageChange}
                    taskImageSolutionChange={this.taskImageSolutionChange}
                    taskImageSolutionStepbyStep={this.taskImageSolutionStepbyStep}
                    solutation_by={this.props.MatalapTask.solutation_by}
                    major={this.props.MatalapTask.major}
                    level={this.props.MatalapTask.level}
                    difficulty={this.props.MatalapTask.difficulty}
                    solutation_by_credit={this.props.MatalapTask.solutation_by_credit}
                    source={this.props.MatalapTask.source}
                    time={this.props.MatalapTask.time}
                    /></div>
                     : ""
                    }
                </Card.Body>
            </Card>
        )
    }
}
export default MatAlapCard;