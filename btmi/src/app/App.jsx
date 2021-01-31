import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="jumbotron">
                <div className="comtainer">
                    <div className="col-sm-8 col-sm-offset-2">Alert</div>
                </div>
            </div>
        )
    }

}

function mapState(state) {
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };