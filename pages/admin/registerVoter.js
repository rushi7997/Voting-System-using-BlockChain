import React, { Component } from "react";
import Layout from "../../component/Layout";
import { Button, Form, Message } from "semantic-ui-react";
import root from "../../ethereum/root";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";


class RegisterVoter extends Component {

    state = {
        address: '',
        voterName: '',
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
                .voterRegister(this.state.voterName, this.state.address)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/admin');
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }
        console.log("Registration of Voter done.");
        
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h1>Register New Voter</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-name'
                            label='Voter Name'
                            placeholder='Enter name'
                            value={this.state.voterName}
                            onChange={event =>
                                this.setState({ voterName: event.target.value })
                            }
                        />
                        <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-address'
                            label='Voter Address(ID)'
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
export default RegisterVoter;