import React,{Component} from 'react';
import {Card,Button} from 'react-bootstrap';

class MatAlapCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            solution_showed : false,
            solution_stepbystep_showed : false,
        };
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
                  {solution_showed? <Card.Img variant="middle" src={task_solution} /> : <Button onClick={this.onShowSolutation}>Megoldás</Button>}
              
              <Card.Text>
                    ---------------------------------------------------------------------------------------------------------
              </Card.Text>
              {solution_stepbystep_showed? <Card.Img variant="bottom" src={task_solution_stepbystep} /> : <Button onClick={this.onSolution_stepbystep}>Megoldás részletesen</Button>}
              
              </Card.Body>
            </Card>
        )
    }
}
export default MatAlapCard;