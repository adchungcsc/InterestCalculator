import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


function AddBlock(props) {

    function handleSubmit(event){
        event.preventDefault();
        console.log("Submitted")
        let name = event.target.elements.name.value;
        let initial = parseFloat(event.target.elements.initial.value);
        let contributions = parseFloat(event.target.elements.contributions.value)
        let time = parseInt(event.target.elements.time.value)
        let rateReturn = parseFloat(event.target.elements.rateReturn.value)
        let rateInflation = parseFloat(event.target.elements.rateInflation.value)
        props.handleAddInvestingBlock(initial, name, contributions, time, rateReturn, rateInflation)
    }

    return (
        <div className="border task-adder" style={{"margin-top": "3em"}}>
            <h3>Add Investing Block</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Initial Contribution {new Date().getFullYear()}</Form.Label>
                    <Form.Control name="initial" type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Annual Contributions</Form.Label>
                    <Form.Control name="contributions" type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Years At This Rate</Form.Label>
                    <Form.Control name="time" type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Expected Rate of Return</Form.Label>
                    <Form.Control name="rateReturn" type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Expected Rate of Inflation</Form.Label>
                    <Form.Control name="rateInflation" type="number"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddBlock;
