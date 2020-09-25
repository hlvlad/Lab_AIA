import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalForm from './ModalForm';
import Rater from "react-rater";
import './DataTable.css';
import 'react-rater/lib/react-rater.css';

function DataTable(props) {
    const deleteItem = (id) => {
        let confirmDelete = window.confirm('Are you sure you want to delete this beautiful model?');
        if (confirmDelete) {
            props.deleteItem(id)
        }
    }

    const rateItem = (id, rating) => {
        let item = props.items.find(item => item.id === id);
        item.rating = rating;
        props.updateItem(item);
    }

    const items = props.items ? props.items.map(item => {
            return (
                <Container as="li" key={item.id} className="mt-3 origami-item">
                    <Row>
                        <Col md={6} className="justify-content-center p-0">
                            <Image className="img-fluid w-100" src={item.image || "https://image.flaticon.com/icons/png/512/105/105293.png"} alt="Origami model photo" rounded/>
                        </Col>
                        <Col md={6} className="d-flex flex-column origami-item-info">
                            <Row className="mt-3">
                                <Col className="justify-content-start">
                                    <h5>{item.title}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="justify-content-start">
                                    <p>{item.description}</p>
                                </Col>
                            </Row>
                            <Row className="mt-auto">
                                <Col className="d-flex justify-content-end align-items-center">
                                    {/*<Rater rating={item.rating || 0} onRate={(rating) => {rateItem(item.id, rating);}} className="origami-item-rater" />*/}
                                    <Rater rating={item.rating || 0} onRate={(event) => {rateItem(item.id, event.rating);}}/>
                                    <ModalForm item={item} updateItem={props.updateItem}/>
                                    <Button variant="danger" onClick={() => {deleteItem(item.id);}}>Delete</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        }) :
        <div>NO DATA</div>

    return (
        <ul className="list-unstyled">
            {items}
        </ul> );
}

export default DataTable;