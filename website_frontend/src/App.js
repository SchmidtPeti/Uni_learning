import React,{Component} from 'react';
import './App.css';
import './css/style.css';
import HomePage from './Pages/MatTasks';
import MatAlapForm from './Components/MatAlap_form';
import GeneralForm from './Components/General_form';
import VeletlenPage from './Pages/VeletlenTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './images/background.jpg';
import AltalanosPage from './Pages/AltalanosTasks';
import VeletlenGeneralTask from './Pages/VeletlenGeneralTask';
import {Nav,NavDropdown} from 'react-bootstrap';
import loading_img from './images/loading.gif';
import {Container,Row,Col} from 'react-bootstrap';
import MatAlapCard from "./Components/MatAlapCard";
import GeneralCard from './Components/GeneralCard';
import {Form,Button} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import api from './api/api';
import GenerateZh from './Pages/Generate_zh';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        MatAlapTasks : [],
        GeneralTasks : [],
        isLoading: false,
        isLoadingMat: false,
        isAdmin : false,
        topic : ""
    }
    
  }
    loadData = async (topic) => {
      this.setState({MatAlapTasks :[],GeneralTasks:[],isLoading : true,isLoadingMat:true});
      await api.getAllMatAlapTasks(topic).then(MatAlapTasks => {
          this.setState({
            MatAlapTasks: MatAlapTasks.data.data,
            isLoadingMat: false,
          })
      }).catch(err => console.log(err));
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
    onShowSolutation = () => {
      this.setState({solution_showed : true});
    }
    topic_list=(topic) =>{
      let topic_list = [];
      //console.log(this.state.MatAlapTasks);
      this.state.MatAlapTasks.forEach(task => {
        if(task.topic===topic){
          topic_list.push(task);
        }
      })
      return topic_list;
    }
    topicSelectorChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
      if(this.state.topic!==""){
          this.setState({isLoading : true,isLoadingMat:true});
      }
    }
    submitCategory = () => {
      this.loadData(this.state.topic);
    }
    generate_list = () => {
      const topics = [
        "Analízis Számhalmaz szuprémuma és infimuma",
        "Függvények",
        "Valós sorozatok 1.",
        "Valós sorozatok 2.",
        "Valós sorozatok 3."
      ];
      let filtered_MatAlapTasks_zh_list = [];
      topics.forEach( (topic) => {
        let topics_list = this.topic_list(topic);
        filtered_MatAlapTasks_zh_list.push(topics_list[Math.floor(Math.random() * topics_list.length)]);
        filtered_MatAlapTasks_zh_list.push(topics_list[Math.floor(Math.random() * topics_list.length)]);
      });
      return filtered_MatAlapTasks_zh_list;
    }  
  onSolution_stepbystep = () => {
      this.setState({solution_stepbystep_showed : true})
  }
  adminPopup = () => {
    const adminCheck = prompt("Password");
    if(adminCheck===process.env.REACT_APP_ADMIN_PASSWORD){
      this.setState({isAdmin:true});
    }
  }
  render() {
    const {isAdmin} = this.state;
    const Loading = <div><img src={loading_img} alt="Loading" className={"loading"} /></div>;
    const lastMatItem = this.state.MatAlapTasks[this.state.MatAlapTasks.length-1];
    const LastGenItem = this.state.GeneralTasks[this.state.GeneralTasks.length-1]
    return (
    <div className="App"  style={{backgroundImage : "url("+background+")", backgroundAttachment: "fixed", minHeight: 1000}}  >
      <Router>
      <Nav defaultActiveKey="/home" as="ul" className="bg-dark navbar-collapse">
  <Nav.Item as="li">
    <Nav.Link><Link to="/">Uni_learning<span onClick={() => this.adminPopup()}>(9)</span></Link></Nav.Link>
  </Nav.Item>
  <NavDropdown title="Matematika" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/Matek">Matek </Link></NavDropdown.Item>
        {isAdmin ? 
       <NavDropdown.Item><Link to="/addMatek">Matek feladat hozzáadás</Link></NavDropdown.Item> :
       ""  
      }
        <NavDropdown.Item><Link to="/generatePage">Matek alapok 1. ZH generálás</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/veletlen">Véletlen Matek alap feladat</Link></NavDropdown.Item>
      </NavDropdown>
  <NavDropdown title="Általános feladatok" id="collasible-nav-dropdown_id">
    {isAdmin ?
             <NavDropdown.Item><Link to="/addEgyetemiTantargy">Általános feladat hozzáadás</Link></NavDropdown.Item>
     : 
     ""
     }        <NavDropdown.Item><Link to="/AltalanosTasks">Általános feladatok</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/VeletlenAltalanosTaks">Véletlen általános feladatok </Link></NavDropdown.Item>
      </NavDropdown>   
</Nav>
<Container className="justify-content-md-center">
      <div>
        <div className={"bg-light min-vh-10 p-5 rounded"}>
          <Form.Control as="select" name="topic" onChange={this.topicSelectorChange}>
                <option value="-">Kérlek válassz!</option>
                <option value="*">Összes</option>
                <option value="0">Matalap 1</option>  
                <option value="1">Matalap 2</option> 
                <option value="2">Matalap 3</option>
                <option value="3">Anal_1</option>
                <option value="4">Anal_2</option>
                <option value="5">DiMat1</option>
          </Form.Control>
          <Button type="submit" className="mb-2" onClick={this.submitCategory} block>
          Feltöltés!
          </Button>
        </div>
      </div>
            <Row>
            <Col>
      <Switch>  
          <Route exact path="/">
          <div className={"bg-light min-vh-100 p-5 rounded"}>
            {this.state.isLoadingMat ? Loading : "" }
            {this.state.isLoading ? Loading : "" }
            {this.state.MatAlapTasks.length>0 ? <div><h2>Legutóbbi matek</h2><MatAlapCard 
                            isAdmin={isAdmin}
                            loadData={this.loadData}  
                            MatalapTask={lastMatItem} 
                            id={lastMatItem._id} 
                            topic={lastMatItem.topic} 
                            task_type={lastMatItem.task_type} 
                            task_image={lastMatItem.task_description} 
                            task_solution={lastMatItem.solutation} 
                            task_solution_stepbystep={lastMatItem.solutation_stepbystep} className={'col-6'} /></div>
                           : "" }
            {
              this.state.GeneralTasks.length>0 ?
              <GeneralCard isAdmin={isAdmin} loadData={this.loadData} AltanaosTask={LastGenItem} task_description={LastGenItem.task_description} solution={LastGenItem.solution}/>
              :
               "" 
            }               
          </div>
          </Route>
          <Route exact path="/addMatek">
          <MatAlapForm loadData={this.loadData} MatAlapTasks={this.state.MatAlapTasks} />
          </Route>
          <Route exact path="/addEgyetemiTantargy">
          <GeneralForm  loadData={this.loadData} GeneralTasks={this.state.GeneralTasks}/>
          </Route>          
          <Route path="/Matek">
            <HomePage isAdmin={isAdmin} loadData={this.loadData} editStart={this.editStart} 
            editTask={this.state.editTask} isLoadingMat={this.state.isLoadingMat} 
            MatAlapTasks={this.state.MatAlapTasks} solution_showed={this.state.solution_showed} 
            solution_stepbystep_showed={this.state.solution_stepbystep_showed} 
            onShowSolutation={this.onShowSolutation} onSolution_stepbystep={this.onSolution_stepbystep} />
          </Route>
          <Route path="/veletlen">
            <VeletlenPage isAdmin={isAdmin} load={this.loadData} MatAlapTasks={this.state.MatAlapTasks}/>
          </Route>
          <Route path="/AltalanosTasks">
            <AltalanosPage isAdmin={isAdmin} loadData={this.loadData} AltanaosTasks={this.state.GeneralTasks} isLoading={this.state.isLoading} />
          </Route>  
          <Route path="/VeletlenAltalanosTaks">
            <VeletlenGeneralTask isAdmin={isAdmin} loadData={this.loadData} GeneralTasks={this.state.GeneralTasks} />
          </Route> 
          <Route path="/generatePage">
            <GenerateZh isAdmin={isAdmin} loadData={this.loadData} Generated_matalap_list={this.generate_list()} />
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
