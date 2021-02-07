import React, {Component} from 'react';
import axios from 'axios';


const Gradebook = props => (
    <tr>
        <td>{props.gradebook.gb_class}</td>
        <td>{props.gradebook.gb_t1}</td>
        <td>{props.gradebook.gb_t2}</td>
        <td>{props.gradebook.gb_t3}</td>
        <td>{props.gradebook.gb_t4}</td>
    </tr>
)

export default class GradebooksList extends Component {

    constructor(props) {
        super(props);
        this.state = {gradebooks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/gradebook/')
            .then(response => {
                this.setState({gradebooks: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    gradebookList() {
        return this.state.gradebooks.map(function(currentGradebook, i) {
            return <Gradebook gradebook={currentGradebook} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Gradebooks List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>T1</th>
                            <th>T2</th>
                            <th>T3</th>
                            <th>T4</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.gradebookList() }
                    </tbody>
                </table>
            </div>
        )
    }
}