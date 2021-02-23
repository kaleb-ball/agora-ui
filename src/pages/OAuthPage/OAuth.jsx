import React from "react";
import {connect} from "react-redux";
import {Button, Card, Col, Layout, Row, Space} from "antd";
import {oauthConstants} from "../../constants";
import {oauthActions} from "../../actions/oauth.actions";

class OAuthPage extends React.Component {

    constructor(props) {
        super(props);


        this.onZoomClick = this.onZoomClick.bind(this)
        this.onTeamsClick = this.onTeamsClick.bind(this)
    }


    onZoomClick(e) { this.handleClick(oauthConstants.ZOOM) }

    onTeamsClick(e) { this.handleClick(oauthConstants.TEAMS) }

    handleClick(serviceName) {
        this.props.authorization(serviceName)
    }

   render() {

      return(
          <div >
              <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}}>
                      <Space direction="vertical" size="large">
                          <Button
                              type="primary"
                              shape="round"
                              style={{background: "#2D8CFF"}}
                              size="large"
                              onClick={this.onZoomClick}>
                              Authorize with Zoom
                          </Button>
                          <Button
                              shape="round"
                              style={{background: "#464EB8", color:"white", borderColor:"white"}}
                              size="large"
                              onClick={this.onTeamsClick}>
                              Authorize with Teams
                          </Button>
                      </Space>
              </Row>
          </div>

      )
   }

}

function mapState(state) {
   return {}
}

const actionCreators = {
    authorization : oauthActions.getAuthorization
}

const connectedRegisterPage = connect(mapState, actionCreators)(OAuthPage);
export { connectedRegisterPage as OAuthPage };