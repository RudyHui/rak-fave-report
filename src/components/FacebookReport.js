import React, { Component } from 'react'
import { Table, Image } from 'semantic-ui-react'
import moment from 'moment'

export default class FacebookReport extends Component {
    state = {
        data: [],
        viewTable: []
    }

    loadInstagramReport = () => {
        window.FB.api('/me/feed', {fields: 'caption,created_time,description,full_picture'}, function(response) {
            console.log(response);
            let data = response.data;
            let viewTable = [];
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    const item = data[i];
                    viewTable.push(
                        <Table.Row key={i}>
                            <Table.Cell>{moment(item.created_time).locale('id').format("DD/MM/YYYY, HH:mm:ss")}</Table.Cell>
                            <Table.Cell>{item.full_picture ? <Image src={item.full_picture} size='small' rounded></Image> : null}</Table.Cell>
                            <Table.Cell>{item.caption ? item.caption : null}</Table.Cell>
                            <Table.Cell>{item.description ? item.description : null}</Table.Cell>
                        </Table.Row>);
                }
            }
            console.log(viewTable);
            this.setState({
                data: data,
                viewTable: viewTable
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
                        <Table.HeaderCell>Picture</Table.HeaderCell>
                        <Table.HeaderCell>Caption</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{this.state.viewTable}</Table.Body>
            </Table>
        )
    }
}
