import React from "react";
import {connect} from "react-redux";
import {Button, Col, Row, Space} from "antd";
import {oauthActions} from "../../actions/oauth.actions";
import {
    get_values,
    platform_color,
    platform_name,
    platform_value,
} from "../../constants/platformConstants";
import {history} from "../../helpers";

class OAuthPage extends React.Component {

     constructor(props) {
        super(props);

        this.props.checkAuthorization();
        this.handleClick = this.handleClick.bind(this)
        this.isCallback = this.isCallback.bind(this)
    }

    handleClick(serviceName) {
        this.props.authorization(serviceName)
    }

   isCallback() {
        if (this.props.authenticatedPlatforms.length >= 1) {
            return <Button size="large" style={{float: 'right'}} href="/" type="link">Continue</Button>
        }
   }

   button(platform) {
       if (this.props.authenticatedPlatforms.filter(x=> x.name === platform).length >= 1) {
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
        const continueButton = this.isCallback()
        if (this.props.allAuthorized) history.push("/")
        const platforms = get_values();
        let oauthButtons = platforms.map(platform=>this.button(platform))
        return (
           <div>
               <Row type="flex" justify="center" align="middle" style={{minHeight: '35vh'}}>
                   <Space direction="vertical" size="large" align="center">
                    {oauthButtons}
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
   return {
       authenticatedPlatforms : state.checkAuthorization.platforms,
       allAuthorized: state.checkAuthorization.allAuthorized
   }
}

const actionCreators = {
    authorization : oauthActions.getAuthorization,
    checkAuthorization : oauthActions.checkAuthorization
}

const connectedRegisterPage = connect(mapState, actionCreators)(OAuthPage);
export { connectedRegisterPage as OAuthPage };