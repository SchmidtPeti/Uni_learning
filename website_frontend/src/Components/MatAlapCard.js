import React,{Component} from 'react';
import {Card,Button,Form} from 'react-bootstrap';

/*const MatAlapCard =({topic,task_type,task_image,task_solution,task_solution_stepbystep,solution_showed,solution_stepbystep_showed,onShowSolutation,onSolution_stepbystep}) =>{

    return(
            <Card style={{ width: '50rem' }}>
            <Card.Body>
                  <Card.Title>{topic}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{task_type}</Card.Subtitle>
                  <Card.Img variant="top"  src={task_image} />
                  <Card.Text>
                  ---------------------------------------------------------------------------------------------------------
              </Card.Text>
                  {solution_showed? <Card.Img variant="middle" src={task_solution} /> : <Button onClick={onShowSolutation}>Megoldás</Button>}
              
              <Card.Text>
                    ---------------------------------------------------------------------------------------------------------
              </Card.Text>
              {solution_stepbystep_showed? <Card.Img variant="bottom" src={task_solution_stepbystep} /> : <Button onClick={onSolution_stepbystep}>Megoldás részletesen</Button>}
              
              </Card.Body>
            </Card>
            )
}*/
class MatAlapCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            solution_showed : false,
            solution_stepbystep_showed : false,
            editShow: false,
        };
    }
    onShowEdit = () => {
        this.setState({editShow : true});
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
        const {topic,task_type,task_image,task_solution,task_solution_stepbystep} = this.props;
        const {solution_showed,solution_stepbystep_showed} = this.state;
        return (
            <Card style={{ width: '80%'}} className="mx-auto shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Body>
                  <Card.Title>{topic}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{task_type}</Card.Subtitle>
                  <Card.Img variant="top"  src={task_image} />
                  <Card.Text>
                  ---------------------------------------------------------------------------------------------------------
              </Card.Text>
              <Card.Link>
                  {solution_showed? <Card.Img variant="middle" src={task_solution} /> : <Button onClick={this.onShowSolutation}>Megoldás</Button>}
              </Card.Link>              
              <Card.Text>
                    ---------------------------------------------------------------------------------------------------------
              </Card.Text>
              {solution_stepbystep_showed? <Card.Img variant="bottom" src={task_solution_stepbystep} /> : <Button onClick={this.onSolution_stepbystep}>Megoldás részletesen</Button>}
              </Card.Body>
              <Card.Body>
                    <Card.Link onClick={this.onShowEdit} ><Button classsName="warning">Szerkeztés</Button></Card.Link>
                    <Card.Link href="#">Tördlés</Card.Link>
                </Card.Body>
                <Card.Body>
{this.state.editShow ? 
<h1></h1>:
                      <div></div>}
                </Card.Body>
            </Card>
        )
    }
}
export default MatAlapCard;