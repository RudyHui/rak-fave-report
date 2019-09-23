import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Header, Grid, Image, Menu, Container } from 'semantic-ui-react';
import InstagramReport from './InstagramReport';

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
        this.setState({
            isLoggedIn: true,
            userId: response.userId,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
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
                    <Container fluid>
                        <Header as='h1'>Instagram Table Report</Header>
                        <InstagramReport />
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
