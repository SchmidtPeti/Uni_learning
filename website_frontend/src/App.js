import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/Home';
import AddMatAlapTask from './Pages/AddMatAlapTask';
import AddGeneralTask from './Pages/AddGeneralTask';
import VeletlenPage from './Pages/VeletlenTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import S3FileUpload from 'react-s3';
import background from './images/background.jpg';
import AltalanosPage from './Pages/AltalanosTasks';
import VeletlenGeneralTask from './Pages/VeletlenGeneralTask';
import {Nav} from 'react-bootstrap';
import {Container,Row,Col,Card} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import api from './api/api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        MatAlapTasks : [],
        GeneralTasks : [],
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
        isLoading: false,
        solution_showed : false,
        solution_stepbystep_showed : false,
    }
    
  }
    componentDidMount = async () => {
      this.setState({ isLoading: true })

      await api.getAllMatAlapTasks().then(MatAlapTasks => {
          this.setState({
            MatAlapTasks: MatAlapTasks.data.data,
              isLoading: false,
          })
      });
      await api.getAllGeneralTasks().then(GeneralTasks => {
        this.setState({
          GeneralTasks: GeneralTasks.data.data,
            isLoading: false,
        })
    });
    console.log(this.state.GeneralTasks);
    };
      myChangeHandler = (event) => {//used on admin page to login
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };
    onFileChange = event => { 
     
      this.setState({ solutation_stepbystep: event.target.files[0] }); 
     
    }; 
    onFileChangeTaskDesc = event => {
      this.setState({ task_description: event.target.files[0] }); 
    }
    onFileChangeSolutation= event => {
      this.setState({ solutation: event.target.files[0] }); 
    }
    onFileChangeSolution= event => {
      this.setState({ solution: event.target.files[0] }); 
    }
    onShowSolutation = () => {
      this.setState({solution_showed : true});
  }
  onSolution_stepbystep = () => {
      this.setState({solution_stepbystep_showed : true})
  }

    submitMatAlap = async () =>{
        await this.uploadFileToS3(); //wrong input can t be fatal
        const {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty} = this.state;
        const playload = {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty};
        console.log(playload);
        api.insertMatAlapTask(playload).then(() => console.log("success")).catch(error => console.log(error));
    }
    submitGeneralTask = async() =>{
      await this.uploadFileToS3_s(); //wrong input can t be fatal   
      const {task_description,task_type,topic,solution,major,solution_by,solution_by_credit,subject_name,semester,university,source,time,difficulty} = this.state;
      const playload = {task_description,task_type,topic,solution,major,subject_name,semester,university,solution_by,solution_by_credit,source,time,difficulty};
      console.log(playload);
      api.insertGeneralTask(playload).then(() => console.log("success")).catch(error => console.log(error));
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
      };
  render() {
    return (
    <div className="App"  style={{backgroundImage : "url("+background+")", backgroundAttachment: "fixed", minHeight: 1000}}  >
      <Router>
      <Nav defaultActiveKey="/home" as="ul" className="bg-dark">
  <Nav.Item as="li">
    <Nav.Link>Uni_learning</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-1"><Link to="/MatAlapok">Mat Alapok </Link></Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-2"><Link to="/addMatek">Matek feladat hozzáadás</Link></Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-3"><Link to="/addEgyetemiTantargy">Egyetemi feladat hozzáadás</Link></Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-4"><Link to="/veletlen">Veletlen</Link></Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-5"><Link to="/AltalanosTasks">Általános feladatok </Link></Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-6"><Link to="/VeletlenAltalanosTaks">Véletlen általános feladatok </Link></Nav.Link>
  </Nav.Item>
</Nav>
<Container className="justify-content-md-center">
            <Row>
            <Col>
      <Switch>  
          <Route exact path="/addMatek">
          <AddMatAlapTask myChangeHandler={this.myChangeHandler} submitMatAlap={this.submitMatAlap} onFileChange={this.onFileChange} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolutation}/>           
          </Route>
          <Route exact path="/addEgyetemiTantargy">
          <AddGeneralTask myChangeHandler={this.myChangeHandler} submitMatAlap={this.submitGeneralTask} onFileChange={this.onFileChange} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolution}/>           
          </Route>          
          <Route path="/MatAlapok">
            <HomePage MatAlapTasks={this.state.MatAlapTasks} solution_showed={this.state.solution_showed} solution_stepbystep_showed={this.state.solution_stepbystep_showed} onShowSolutation={this.onShowSolutation} onSolution_stepbystep={this.onSolution_stepbystep} />
          </Route>
          <Route path="/veletlen">
            <VeletlenPage MatAlapTasks={this.state.MatAlapTasks} />
          </Route>
          <Route path="/AltalanosTasks">
            <AltalanosPage AltanaosTasks={this.state.GeneralTasks} />
          </Route>  
          <Route path="/VeletlenAltalanosTaks">
            <VeletlenGeneralTask GeneralTasks={this.state.GeneralTasks} />
          </Route>  
        </Switch>
        </Col>
            </Row> 
        </Container>
      </Router>  
    </div>)
  };
}

export default App;
