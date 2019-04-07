import React, { Component } from "react";
import Layout from "../../component/Layout";
import { Button, Form, Message } from "semantic-ui-react";
import root from "../../ethereum/root";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";


class RegisterCandidate extends Component {

    state = {
        address: '',
        candidateName: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        console.log('States : ',this.state);        
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            console.log("Addresses : ",accounts);

            await root.methods
                .candidateRegister(this.state.candidateName, this.state.address)
                .send({
                    from: accounts[0] 
                });
            Router.pushRoute('/admin');
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }
        console.log("Registration of candidate done.");
        
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h1>Register New Candidate</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-name'
                            label='Candidate Name'
                            placeholder='Enter name'
                            value={this.state.candidateName}
                            onChange={event =>
                                this.setState({ candidateName: event.target.value })
                            }
                        />
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-address'
                            label='Candidate Address(ID)'
                            placeholder="Enter Address"
                            value={this.state.address}
                            onChange={event =>
                                this.setState({ address: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Message error header='Oops!!' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Register</Button>
                </Form>
            </Layout>
        );
    };
}
export default RegisterCandidate;