import React,{Component} from 'react';
import './App.css';
import './css/style.css';
import HomePage from './Pages/MatTasks';
import AddMatAlapTask from './Pages/AddMatAlapTask';
import AddGeneralTask from './Pages/AddGeneralTask';
import VeletlenPage from './Pages/VeletlenTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import S3FileUpload from 'react-s3';
import background from './images/background.jpg';
import AltalanosPage from './Pages/AltalanosTasks';
import VeletlenGeneralTask from './Pages/VeletlenGeneralTask';
import {Nav,NavDropdown,Alert} from 'react-bootstrap';
import loading_img from './images/loading.gif';
import {Container,Row,Col} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import api from './api/api';
import Generate_zh from './Pages/Generate_zh';

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
        isLoading: true,
        isLoadingMat: true, 
        solution_showed : false,
        solution_stepbystep_showed : false,
        editTask : false
    }
    this.loadData();
    
  }
    loadData = async () => {
      //this.setState({ isLoading: true })

      await api.getAllMatAlapTasks().then(MatAlapTasks => {
          this.setState({
            MatAlapTasks: MatAlapTasks.data.data,
            isLoadingMat: false,
          })
      });
      await api.getAllGeneralTasks().then(GeneralTasks => {
        this.setState({
          GeneralTasks: GeneralTasks.data.data,
            isLoading: false,
        })
    });
    };
    editStart = () => {
      this.setState({editTask : true});
    }
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
    topic_list=(topic) =>{
      let topic_list = [];
      this.state.MatAlapTasks.forEach(task => {
        if(task.topic===topic){
          topic_list.push(task);
        }
      })
      return topic_list;
    }
    generate_list = () => {
      const topics = [
        "Algebrai és gyökös kifejezések I.",
        "Másodfokú egyenletek, egyenlőtlenségek",
        "Algebrai és gyökös kifejezések II.",
        "Exponenciális, logaritmusos kifejezések, egyenletek, egyenlőtlenségek",
        "Trigonometrikus azonosságok, egyenletek, egyenlőtlenségek",
        "Nagyságrend-őrző becslések és függvények további becslései",
        "Kijelentések, kvantorok, logikai állítások I.",
        "Kijelentések, kvantorok, logikai állítások II.",
        "Kijelentések, kvantorok, logikai állítások III.",
        "Teljes indukció",
        "Matematikai alapok 1. zárthelyi"
      ];
      let filtered_MatAlapTasks_zh_list = [];
      topics.forEach( (topic,index) => {
        let topics_list = this.topic_list(topic);
        filtered_MatAlapTasks_zh_list.push(topics_list[Math.floor(Math.random() * topics_list.length)]);
        filtered_MatAlapTasks_zh_list.push(topics_list[Math.floor(Math.random() * topics_list.length)]);
      });
      return filtered_MatAlapTasks_zh_list;
    }  
  onSolution_stepbystep = () => {
      this.setState({solution_stepbystep_showed : true})
  }

    submitMatAlap = async (event) =>{
        event.preventDefault();
        await this.uploadFileToS3(); //wrong input can t be fatal

        const {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty} = this.state;
        const playload = {task_description,task_type,topic,level,solutation,major,solutation_stepbystep,solutation_by,solutation_by_credit,source,time,difficulty};
        console.log(playload);
        api.insertMatAlapTask(playload).then(() => console.log("success")).catch(error => console.log(error));
    }
    submitGeneralTask = async(event) =>{
      event.preventDefault();
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
        S3FileUpload.
        this.setState({task_description : taskDesc.location, solution : solutation_short.location });
      };
  render() {
    const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
    const TwoCard = "";
    return (
    <div className="App"  style={{backgroundImage : "url("+background+")", backgroundAttachment: "fixed", minHeight: 1000}}  >
      <Router>
      <Nav defaultActiveKey="/home" as="ul" className="bg-dark navbar-collapse">
  <Nav.Item as="li">
    <Nav.Link><Link to="/">Uni_learning</Link></Nav.Link>
  </Nav.Item>
  <NavDropdown title="Matematika alapok" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/MatAlapok">Mat Alapok </Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/addMatek">Matek alap feladat hozzáadás</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/generatePage">Matek alapok 1. ZH generálás</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/veletlen">Véletlen Matek alap feladat</Link></NavDropdown.Item>
      </NavDropdown>
  <NavDropdown title="Általános feladatok" id="collasible-nav-dropdown_id">
        <NavDropdown.Item><Link to="/addEgyetemiTantargy">Általános feladat hozzáadás</Link></NavDropdown.Item>
        <NavDropdown.Item><Link to="/AltalanosTasks">Általános feladatok</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/VeletlenAltalanosTaks">Véletlen általános feladatok </Link></NavDropdown.Item>
      </NavDropdown>   
</Nav>
<Container className="justify-content-md-center">
            <Row>
            <Col>
      <Switch>  
          <Route exact path="/">
          <div className={"bg-light min-vh-100 p-5 rounded"}>
            {this.state.isLoadingMat ? Loading : <Alert variant="success">Matek feladatok betöltve</Alert> }
            {this.state.isLoading ? Loading : <Alert variant="success">Általános feladatok betöltve</Alert> }
          </div>
          </Route>
          <Route exact path="/addMatek">
          <AddMatAlapTask myChangeHandler={this.myChangeHandler} submitMatAlap={this.submitMatAlap} onFileChange={this.onFileChange} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolutation} MatAlapTasks={this.state.MatAlapTasks}/>           
          </Route>
          <Route exact path="/addEgyetemiTantargy">
          <AddGeneralTask myChangeHandler={this.myChangeHandler} submitMatAlap={this.submitGeneralTask} onFileChange={this.onFileChange} onFileChangeTaskDesc={this.onFileChangeTaskDesc} onFileChangeSolutation={this.onFileChangeSolution} GeneralTasks={this.state.GeneralTasks}/>           
          </Route>          
          <Route path="/MatAlapok">
            <HomePage  editStart={this.editStart} editTask={this.state.editTask} isLoadingMat={this.state.isLoadingMat} MatAlapTasks={this.state.MatAlapTasks} solution_showed={this.state.solution_showed} solution_stepbystep_showed={this.state.solution_stepbystep_showed} onShowSolutation={this.onShowSolutation} onSolution_stepbystep={this.onSolution_stepbystep} />
          </Route>
          <Route path="/veletlen">
            <VeletlenPage MatAlapTasks={this.state.MatAlapTasks}/>
          </Route>
          <Route path="/AltalanosTasks">
            <AltalanosPage AltanaosTasks={this.state.GeneralTasks} isLoading={this.state.isLoading} />
          </Route>  
          <Route path="/VeletlenAltalanosTaks">
            <VeletlenGeneralTask GeneralTasks={this.state.GeneralTasks} />
          </Route> 
          <Route path="/generatePage">
            <Generate_zh Generated_matalap_list={this.generate_list()} />
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
