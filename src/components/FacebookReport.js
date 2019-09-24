import React, { Component } from 'react'
import { Table, Image } from 'semantic-ui-react'
import moment from 'moment'

export default class FacebookReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
            data: [],
            viewTable: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            startDate: nextProps.startDate,
            endDate: nextProps.endDate
        });
    }

    loadFacebookReport = () => {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        
        if(startDate && endDate) {
            window.FB.api('/me', {fields: `feed.since(${startDate}).until(${endDate}){caption,created_time,description,full_picture}`}, function(response) {
                let data;
                let viewTable = [];
    
                if(response.feed) {
                    data = response.feed.data;
                } else {
                    viewTable.push(
                        <Table.Row key={0}>
                            <Table.Cell colSpan='4' textAlign='center'>No data</Table.Cell>
                        </Table.Row>
                    );
                }
    
                for (const i in data) {
                    if (data.hasOwnProperty(i)) {
                        const item = data[i];
                        viewTable.push(
                            <Table.Row key={i}>
                                <Table.Cell>{moment(item.created_time).locale('id').format("DD/MM/YYYY, HH:mm:ss")}</Table.Cell>
                                <Table.Cell>{item.full_picture ? <Image src={item.full_picture} size='small' rounded></Image> : null}</Table.Cell>
                                <Table.Cell>{item.caption ? item.caption : null}</Table.Cell>
                                <Table.Cell>{item.description ? item.description : null}</Table.Cell>
                            </Table.Row>
                        );
                    }
                }
                this.setState({
                    data: data,
                    viewTable: viewTable
                })
            }.bind(this));
        }
    }

    componentDidMount() {
        this.loadFacebookReport();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps) {
            this.loadFacebookReport();
        }
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
