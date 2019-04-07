import React, { Component } from "react";
import { Card, Button, Table } from "semantic-ui-react";
import root from "../ethereum/root";
import Layout from "../component/Layout";
import { Link } from "../routes";
import web3 from "../ethereum/web3";

class home extends Component {

    render() {
        return (
            <Layout>
                <div>
                    <Link route='admin'>
                        <a><Button content='Administrator' icon='user outline' primary /></a>
                    </Link>
                    <Link route='voter'>
                        <a><Button content='Voter' icon='users' primary /></a>
                    </Link>
                </div>
            </Layout>
        );
    }
}

export default home;