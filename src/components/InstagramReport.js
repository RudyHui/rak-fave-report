import React, { Component } from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'

export default class InstagramReport extends Component {
    state = {
        data: []
    }

    viewTable;
    
    loadInstagramReport = () => {
        window.FB.api('/me/feed', {fields: 'caption,created_time,description,full_picture'}, function(response) {
            console.log(response);
            let data = response.data;
            this.viewTable = '';
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    const item = data[i];
                    this.viewTable += (
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h2' textAlign='center'>
                                    {item.created_time}
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{item.caption}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                        </Table.Row>
                    );
                }
            }
            this.setState({
                data: data
            })
        }.bind(this));
    }

    componentDidMount() {
        this.loadInstagramReport();
    }

    render() {
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Created Time</Table.HeaderCell>
                        <Table.HeaderCell>Caption</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.viewTable}
                </Table.Body>
            </Table>
        )
    }
}
