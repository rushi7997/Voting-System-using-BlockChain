import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import root from "../../ethereum/root";
import Layout from "../../component/Layout";
import { Link } from "../../routes";
import web3 from "../../ethereum/web3";
import Vote from "../../component/vote";

class VoterIndex extends Component {

    state = {
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {

        const candidatesCount = await root.methods.getCandidatesCount().call();
        console.log("Candidates Count : ", candidatesCount);

        let candidatesAddress = [];
        for (let i = 0; i < candidatesCount; i++) {
            candidatesAddress.push(await root.methods.candidates(i).call());
        }
        console.log('Candidates Addresses : ', candidatesAddress);

        let candidateDetails = [];
        for (let i = 0; i < candidatesAddress.length; i++) {
            candidateDetails.push(await root.methods.getCandidate(candidatesAddress[i]).call());
        }

        return { candidateDetails };
    }

    renderCandidates() {
        return this.props.candidateDetails.map((candidate, index) => {
            return (
                <Vote
                    key={index}
                    index={index}
                    candidate={candidate}
                />
            );
        });
    }

    render() {
        return (
            <Layout>
                {this.props.candidateDetails.length == 0 ? null :
                    <div>
                        <h3>Candidates</h3>
                        <Table celled fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Candidate Address</Table.HeaderCell>
                                    <Table.HeaderCell>Give Vote</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderCandidates()}
                            </Table.Body>
                        </Table>
                    </div>
                }
            </Layout>
        );
    }
}

export default VoterIndex;