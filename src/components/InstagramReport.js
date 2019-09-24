import React, { Component } from 'react'
import { Table, Image } from 'semantic-ui-react'
import moment from 'moment'

export default class InstagramReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            viewTable: []
        };
    }

    loadInstagramReport = () => {
        window.FB.api(`/${this.props.id}/media`, {fields: 'caption,media_type,thumbnail_url,media_url,username,timestamp'}, function(response) {
            let data = response.data;
            let viewTable = [];
            let imageView;
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    const item = data[i];
                    if(item.media_type === "VIDEO") {
                        imageView = <Table.Cell>{item.thumbnail_url ? <Image src={item.thumbnail_url} size='small' rounded></Image> : null}</Table.Cell>;
                    } else {
                        imageView = <Table.Cell>{item.media_url ? <Image src={item.media_url} size='small' rounded></Image> : null}</Table.Cell>;
                    }
                    viewTable.push(
                        <Table.Row key={i}>
                            <Table.Cell>{moment(item.timestamp).locale('id').format("DD/MM/YYYY, HH:mm:ss")}</Table.Cell>
                            <Table.Cell>{item.username ? item.username : null}</Table.Cell>
                            <Table.Cell>{item.media_type ? item.media_type : null}</Table.Cell>
                            {imageView}
                            <Table.Cell>{item.caption ? item.caption : null}</Table.Cell>
                        </Table.Row>);
                }
            }
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
                        <Table.HeaderCell>username</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Created Time</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Picture</Table.HeaderCell>
                        <Table.HeaderCell>Caption</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{this.state.viewTable}</Table.Body>
            </Table>
        )
    }
}
