import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './scss/style.scss';

class Subtask extends React.Component {
    render() {
        return (
            <li className='subtask-item'>
                <span className="fa-li"><i className="fa fa-circle"></i></span>
                {this.props.name}
            </li>
        );
    }
}
class Task extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addClass: false,
			changeIcon: false
		}
	}
	toggle(){
		this.setState({addClass: !this.state.addClass});
		this.setState({changeIcon: !this.state.changeIcon});
	}
    render(){
  		let taskClass = ["task-item"];
  		let changeClass = ["fa fa-plus-circle"];
  		if(this.state.addClass){
  			taskClass.push('showCheckbox')
  		}
  		if(this.state.changeIcon){
  			changeClass.push("fa fa-minus-square")
  		}
        return (
             <li onClick = {this.toggle.bind(this)} className={taskClass.join(' ')}>
                <span className="fa-li"><i className={changeClass.join(' ')} onClick = {this.toggle.bind(this)}></i></span>{this.props.name}
            </li>
        );
    };
}
class TaskContainer extends React.Component {
    render() {
        const items = this.props.data;
        let taskItems = [];
        let index=0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type === 'task') {
                taskItems.push(<Task key={index++} name={items[i].name}/>);
            } else {
                taskItems.push(
                    <Subtask key={index++} name={items[i].name}/>
                );
            }
            if (items[i].children) {
                taskItems.push(<TaskContainer key={index++} data={items[i].children}/>);
            }
        }

        return (
	            <ul className='fa-ul'>
	                {taskItems}
	            </ul>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data,
        };
    }

    render(){
        return (
	        <div className="container" >                 	
				<div className="widget">
					<TaskContainer data={this.state.data} /> 
                    
				</div>
	        </div>
        );
    }
}

const tasks = {
    data: [
        {
            type: 'task',
            name: 'Task',
            children: [
                {
                    type: 'subtask',
                    name: 'subtask 1'
                },
                {
                    type: 'task',
                    name: 'Task 1',
                    children: [
                        {
                            type: 'subtask',
                            name: 'subtask 2'
                        },
                        {
                            type: 'subtask',
                            name: 'subtask 2'
                        },
                        {
                            type: 'subtask',
                            name: 'subtask 2'
                        },
                        {
                            type: 'task',
                            name: 'Task 2',
                            children: [
                                {
                                    type: 'subtask',
                                    name: 'subtask 3'
                                },
                                {
                                    type: 'subtask',
                                    name: 'subtask 3'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'task',
                    name: 'Task 1',
                    children: [
                        {
                            type: 'subtask',
                            name: 'subtask 2'
                        },
                        {
                            type: 'subtask',
                            name: 'subtask 2'
                        }
                    ]
                }
            ]
        },
        {
        	type: 'subtask',
            name: 'Subtask'
        }
    ]
};


ReactDOM.render(
    <App data={tasks.data} />,
  document.getElementById('root')
);