import React from 'react';
import MatFormHtml from './Mat_Form_html';
import S3FileUpload from 'react-s3';
import api from '../api/api';
import loading_img from '../images/loading.gif';



class MatAlapForm extends React.Component {
  constructor(props) {
    super(props);
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
      difficulty : 0
    }
  }
  uploadFileToS3 = async () => {
    const config = {
      bucketName: 'unilearning',
      dirName: 'MatAlap_solutation',
      region: 'eu-central-1',
      accessKeyId: process.env.REACT_APP_Bucket_ID,
      secretAccessKey: process.env.REACT_APP_Bucket_Key,
    }
    const file_loc = await S3FileUpload.uploadFile(this.state.solutation_stepbystep, config);
    const taskDesc = await S3FileUpload.uploadFile(this.state.task_description, config);
    const solutation_short = await S3FileUpload.uploadFile(this.state.solutation, config);
    this.setState({task_description : taskDesc.location,solutation_stepbystep : file_loc.location, solutation : solutation_short.location });
  };
  submitMatAlap = async (event) =>{
    event.preventDefault();
    await this.uploadFileToS3(); //wrong input can t be fatal

    const {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty} = this.state;
    const playload = {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty};
    console.log(playload);
    await api.insertMatAlapTask(playload).then(() => console.log("success")).catch(error => console.log(error));
    //this.props.loadData();
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  };
  onFileChangeTaskDesc = event => {
    this.setState({ task_description: event.target.files[0] }); 
  }
  onFileChangeSolutation= event => {
    this.setState({ solutation: event.target.files[0] }); 
  }
  onFileChange = event => { 
     
    this.setState({ solutation_stepbystep: event.target.files[0] }); 
   
  }; 
  render() {
    let HasCateg = [];
    const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
    if(this.props.MatAlapTasks.length>0){
    const MatAlapCategories = this.props.MatAlapTasks.map((MatAlapTask,i)=>{
      if(!HasCateg.includes(this.props.MatAlapTasks[i].topic)){
          HasCateg.push(this.props.MatAlapTasks[i].topic);
          return MatAlapTask.topic;
      }
      else{
          return "";
      }
    }); 
    return( <MatFormHtml myChangeHandler={this.myChangeHandler} submitMatAlap={this.submitMatAlap} onFileChange={this.onFileChange} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolutation}  MatAlapCategories={MatAlapCategories} />)}
    else{
      return Loading;
    }
  }
}
export default MatAlapForm;