import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import root from "../ethereum/root";
import web3 from "../ethereum/web3";
import { Link } from "../routes";
import { Router } from "../routes";

class Vote extends Component {

    state = {
        loading: false
    }

    giveVote = async () => {
        this.setState({ loading: true });
        console.log("default Account", web3.eth.defaultAccount);

        const accounts = await web3.eth.getAccounts();
        await root.methods.vote(this.props.candidate[1])
            .send({
                from: accounts[0] 
            });
        Router.pushRoute('/voter');
        this.setState({ loading: false });
    }

    render() {
        const { Row, Cell } = Table;
        const { index, candidate } = this.props;
        const cand = {
            name: candidate[0],
            address: candidate[1],
        }
        return (
            <Row>
                <Cell>{index + 1}</Cell>
                <Cell>{cand.name}</Cell>
                <Cell>{cand.address}</Cell>
                <Cell>
                    <Link>
                        <a><Button loading={this.state.loading} content='Vote' color='green' onClick={this.giveVote} basic /></a>
                    </Link>
                </Cell>
            </Row >
        );
    }
}
export default Vote;