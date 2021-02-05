import React from 'react';
import GeneralFormHtml from './GeneralFormHtml';
import S3FileUpload from 'react-s3';
import loading_img from '../images/loading.gif';
import api from '../api/api';



class GeneralForm extends React.Component{
    constructor(){
      super();
      this.state = {
        task_description : null,
        task_type : "",
        topic : "",
        level : "",
        solutation : null,
        major : "",
        solutation_stepbystep : null,
        solutation_stepbystp_server_location : "",
        solutation_by : "",
        solutation_by_credit: "",
        subject_name : "",
        semester : "",
        university: "",
        solution_by : "",
        solution_by_credit : "",
        solution: null,
        source : "",
        time : 0,
        difficulty : 0,
    }
  }
  onFileChangeTaskDesc = event => {
    this.setState({ task_description: event.target.files[0] }); 
  }
  onFileChangeSolutation= event => {
    this.setState({ solution: event.target.files[0] }); 
  }
  uploadFileToS3_s = async () => {
    const config = {
      bucketName: 'unilearning',
      dirName: 'GeneralTask_solution',
      region: 'eu-central-1',
      accessKeyId: process.env.REACT_APP_Bucket_ID,
      secretAccessKey: process.env.REACT_APP_Bucket_Key,
    }
    const taskDesc = await S3FileUpload.uploadFile(this.state.task_description, config);
    const solutation_short = await S3FileUpload.uploadFile(this.state.solution, config);
    this.setState({task_description : taskDesc.location, solution : solutation_short.location });
  }
  submitGeneralTask = async(event) =>{
    event.preventDefault();
    await this.uploadFileToS3_s(); //wrong input can t be fatal   
    const {task_description,task_type,topic,solution,major,solution_by,solution_by_credit,subject_name,semester,university,source,time,difficulty} = this.state;
    const playload = {task_description,task_type,topic,solution,major,subject_name,semester,university,solution_by,solution_by_credit,source,time,difficulty};
    console.log(playload);
    await api.insertGeneralTask(playload).then(() => console.log("success")).catch(error => console.log(error));
    this.props.loadData();
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  };
    render(){
        const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
        if(this.props.GeneralTasks.length>0){
        let HasSubjectName = [];
        const GeneralTaskSubjectNames = this.props.GeneralTasks.map((GeneralTask,i)=>{
                if(!HasSubjectName.includes(this.props.GeneralTasks[i].subject_name)){
                    HasSubjectName.push(this.props.GeneralTasks[i].subject_name);
                    return GeneralTask.subject_name;
                }
                else{
                    return "";
                }
        }); 
        const Option_subName = GeneralTaskSubjectNames.map((SubjectName) =>{
            if(SubjectName!==""){
        return (<li>{SubjectName}</li>);
            }
            else{
              return "";
            }
        });
      return (
        <GeneralFormHtml myChangeHandler={this.myChangeHandler} submitGeneralTask={this.submitGeneralTask} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolutation} GeneralTasks={this.props.GeneralTasks} Option_subName={Option_subName} />
           )
      }
      else{
        return Loading
      }
    }
} 
export default GeneralForm;