import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import root from "../../ethereum/root";
import Layout from "../../component/Layout";
import { Link } from "../../routes";
import web3 from "../../ethereum/web3";

class AdminIndex extends Component {

    state = {
        winnerName: '',
        winnerAddress: '',
        votes: 0
    }

    static async getInitialProps(props) {

        const candidatesCount = await root.methods.getCandidatesCount().call();
        console.log("Candidates Count : ", candidatesCount);

        const votersCount = await root.methods.getVotersCount().call();
        console.log("Voters Count : ", votersCount);

        let candidatesAddress = [];
        for (let i = 0; i < candidatesCount; i++) {
            candidatesAddress.push(await root.methods.candidates(i).call());
        }
        console.log('Candidates Addresses : ', candidatesAddress);

        let votersAddress = [];
        for (let i = 0; i < votersCount; i++) {
            votersAddress.push(await root.methods.voters(i).call());
        }
        console.log('Voters Addresses : ', votersAddress);

        let candidateDetails = [];
        for (let i = 0; i < candidatesAddress.length; i++) {
            candidateDetails.push(await root.methods.getCandidate(candidatesAddress[i]).call());
        }

        let votersDetails = [];
        for (let i = 0; i < votersAddress.length; i++) {
            votersDetails.push(await root.methods.getVoter(votersAddress[i]).call());
        };
        console.log("All Candidate And Voter", candidateDetails, votersDetails);


        return { candidateDetails, votersDetails };
    }

    renderCandidates() {
        return this.props.candidateDetails.map((candidate, index) => {
            const { Row, Cell } = Table;
            console.log("Candidate Detail : ", candidate);
            return (
                <Row>
                    <Cell>{index + 1}</Cell>
                    <Cell>{candidate[0]}</Cell>
                    <Cell>{candidate[1]}</Cell>
                </Row >
            );
        });
    }

    renderVoters() {
        return this.props.votersDetails.map((voter, index) => {
            const { Row, Cell } = Table;
            console.log("Voter Detail : ", voter);
            return (
                <Row>
                    <Cell>{index + 1}</Cell>
                    <Cell>{voter[0]}</Cell>
                    <Cell>{voter[1]}</Cell>
                    <Cell>{voter[2].toString()}</Cell>
                </Row >
            );
        });
    }

    winner = async () => {
        const accounts = await web3.eth.getAccounts();
        let win;
        try {
            await root.methods.winner().send({
                from: accounts[0]
            });
            let winnerAddress = await root.methods.winnerAddress().call();
            let winnerVotes = await root.methods.winnerVotes().call();
            // let winner = await root.getCandidate(winnerAddress).call();
            // console.log('Winner : ',winner);
            this.setState({ winnerAddress: winnerAddress, votes: winnerVotes});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Layout>
                <div>
                    <Link route='admin/registerCandidate'>
                        <a><Button content='Register Candidate' icon='add user' primary /></a>
                    </Link>
                    <Link route='admin/registerVoter'>
                        <a><Button content='Register User' icon='hand point up' primary /></a>
                    </Link>
                    <a><Button content='Declare Winner' icon='winner' onClick={this.winner} primary /></a>

                    {this.state.winnerAddress == '' ? null :
                        <div>
                            <br></br><h3>Winner Address: {this.state.winnerAddress}</h3>
                            <h3>Votes: {this.state.votes}</h3><br/><br/>
                        </div>
                    }
                </div>

                {this.props.candidateDetails.length == 0 ? null :
                    <div>
                        <h3>Registered Candidates</h3>
                        <Table celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Candidate Address</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderCandidates()}
                            </Table.Body>
                        </Table>
                    </div>
                }

                {this.props.votersDetails.length == 0 ? null :
                    <div>
                        <h3>Registered Voters</h3>
                        <Table celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Voter Address</Table.HeaderCell>
                                    <Table.HeaderCell>Voted</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderVoters()}
                            </Table.Body>
                        </Table>
                    </div>
                }

            </Layout>
        );
    }
}

export default AdminIndex;