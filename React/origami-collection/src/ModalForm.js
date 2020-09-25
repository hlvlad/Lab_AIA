import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AddEditForm from "./AddEditForm";

function ModalForm(props) {
    const {item, addItem, updateItem} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let title = item ? 'Edit item' : 'Add item';

    return (
        <>
            <Button variant="primary" className="text-nowrap" onClick={handleShow}>
                {title}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEditForm item={item}
                                 addItem={addItem}
                                 updateItem={updateItem}
                                 handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalForm;