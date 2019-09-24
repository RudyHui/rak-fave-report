import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Header, Grid, Image, Menu, Container, Divider } from 'semantic-ui-react';
import InstagramReport from './InstagramReport';
import FacebookReport from './FacebookReport';

export default class Report extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    }

    componentClicked = () => {
        console.log("clicked");
    }

    responseFacebook = (response) =>  {
        let result = response;
        window.FB.api('/me/accounts', {fields: 'instagram_business_account'}, function(response) {
            console.log(response);
            this.setState({
                isLoggedIn: true,
                igAccount: response.data[0].instagram_business_account.id,
                userId: result.userId,
                name: result.name,
                email: result.email,
                picture: result.picture.data.url
            });
        }.bind(this));
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })

        if(name === 'sign-out') {
            window.FB.logout(function(response) {
                this.setState({
                    isLoggedIn: false
                })
            }.bind(this));
        }
    }

    render() {
        const { activeItem } = this.state;
        let content;


        if(this.state.isLoggedIn) {
            content = (
                <div>
                    <Menu stackable>
                        <Menu.Item header>
                            Fave Report
                        </Menu.Item>

                        <Menu.Item position='right'>
                            <Image size='mini' src={this.state.picture} />
                            <p className='ml-2'>{this.state.name}</p>
                        </Menu.Item>

                        <Menu.Item
                            name='sign-out'
                            active={activeItem === 'sign-out'}
                            onClick={this.handleItemClick}
                        >
                            Sign-out
                        </Menu.Item>
                    </Menu>
                    <Container>
                        <Container fluid>
                            <Header as='h1'>Instagram Table Report</Header>
                            <InstagramReport id={this.state.igAccount} />
                            <Divider />
                            <Header as='h1'>Facebook Table Report</Header>
                            <FacebookReport />
                        </Container>
                    </Container>
                </div>
            );
        } else {
            content = (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='black' textAlign='center'>Log-in to your account</Header>
                        <FacebookLogin
                        appId="1065477793653913"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook} />
                    </Grid.Column>
                </Grid>
            );
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
