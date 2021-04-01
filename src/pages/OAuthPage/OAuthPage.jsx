import React from "react";
import {connect} from "react-redux";
import {Button, Col, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {
    number_of_platforms,
    platform_color,
    platform_name,
    platform_value,
    platformConstants
} from "../../constants/platformConstants";
import {oauthService} from "../../services";
import {history} from "../../helpers";


class OAuthPage extends React.Component {

    constructor(props) {
        super(props);
        oauthService.authenticatedPlatforms();
        this.authenticatedPlatforms = localStorage.getItem('authenticatedPlatforms') ? JSON.parse(localStorage.getItem('authenticatedPlatforms')).platforms : []

        if (this.authenticatedPlatforms.length === number_of_platforms()) {
            history.push("/")
        }

        this.handleClick = this.handleClick.bind(this)
        this.isCallback = this.isCallback.bind(this)
    }

    handleClick(serviceName) {
        this.props.authorization(serviceName)
    }

   isCallback() {
        if (this.authenticatedPlatforms.length >= 1) {
            return <Button size="large" style={{float: 'right'}} href="/" type="link">Continue</Button>
        }
   }

   button(platform) {
       if (this.authenticatedPlatforms.includes(platform)) {
           return(
               <div>
                   <Space align="center">
                       <Button disabled primary size="large">Authorized with {platform_name(platform)}</Button>
                   </Space>
               </div>
           )
       } else {
           return (
               <div>
                   <Button
                       style={{background: platform_color(platform), color: "white", borderColor: "white"}}
                       size="large"
                       onClick={() => this.handleClick(platform_value(platform))}>
                       Authorize with {platform_name(platform)}
                   </Button>
               </div>
           )
       }
   }



   render() {
        let continueButton = this.isCallback()
        return (
           <div>
               <Row type="flex" justify="center" align="middle" style={{minHeight: '35vh'}}>
                   <Space direction="vertical" size="large" align="center">
                       {this.button(platformConstants.PLATFORM_NAMES.ZOOM)}
                       {this.button(platformConstants.PLATFORM_NAMES.TEAMS)}
                   </Space>
               </Row>
               <Col span={12} push={6}>
                   {continueButton}
               </Col>
           </div>

        );
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