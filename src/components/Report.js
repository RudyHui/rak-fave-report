import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Header, Grid, Image, Menu, Container, Segment } from 'semantic-ui-react';
import InstagramReport from './InstagramReport';
import FacebookReport from './FacebookReport';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            activeName: 'facebook',
            userId: '',
            name: '',
            email: '',
            picture: '',
            datesRange: ''
        };
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    componentClicked = () => {
        console.log("clicked");
    }

    responseFacebook = (response) =>  {
        let result = response;
        window.FB.api('/me/accounts', {fields: 'instagram_business_account'}, function(response) {
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
        switch(name) {
            case 'sign-out':
                window.FB.logout(function(response) {
                    this.setState({
                        isLoggedIn: false
                    })
                }.bind(this));
                break;
            case 'facebook':
                this.setState({
                    activeName: name
                })
                break;
            case 'instagram':
                this.setState({
                    activeName: name
                })
                break;
            default:
                break;
        }
    }

    render() {
        let activeItem = this.state.activeName;
        let content;
        let segmentContent;

        if(activeItem === "facebook") {
            let startDate = null;
            let endDate = null;

            if(this.state.datesRange) {
                let arrDate = this.state.datesRange.split(" - ");
                if(arrDate.length > 1 && arrDate[1]) {
                    startDate = arrDate[0];
                    endDate = arrDate[1];
                }
            }

            segmentContent = (
                <Segment>
                    <Header as='h1'>Facebook Table Report</Header>
                    <DatesRangeInput
                        name="datesRange"
                        placeholder="From - To"
                        dateFormat="MM/DD/YYYY"
                        value={this.state.datesRange}
                        iconPosition="left"
                        onChange={this.handleChange}
                    />
                    <FacebookReport startDate={startDate} endDate={endDate} />
                </Segment>
            );
        } else {
            segmentContent = (
                <Segment>
                    <Header as='h1'>Instagram Table Report</Header>
                    <InstagramReport id={this.state.igAccount} />
                </Segment>
            );
        }

        if(this.state.isLoggedIn) {
            content = (
                <div>
                    <Menu stackable>
                        <Menu.Item header>
                            Fave Report
                        </Menu.Item>
                        <Menu.Item
                            name='facebook'
                            active={activeItem === 'facebook'}
                            onClick={this.handleItemClick}
                        >
                            Facebook
                        </Menu.Item>
                        <Menu.Item
                            name='instagram'
                            active={activeItem === 'instagram'}
                            onClick={this.handleItemClick}
                        >
                            Instagram
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
                            {segmentContent}
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
