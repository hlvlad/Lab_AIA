import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function AddEditForm(props) {
    const [itemState, setItemState] = useState(props.item || {
        id: 0,
        picture: {},
        title: '',
        description: ''
    });

    const updateTitle = e => {
        setItemState({
            ...itemState,
           title: e.target.value
        })
    }

    const updateDescription = e => {
        setItemState({
            ...itemState,
            description: e.target.value
        })
    }

    const onSelectFile = e => {
        if(!e.target.files || e.target.files.length === 0) {
            return;
        }
        let objectUrl = URL.createObjectURL(e.target.files[0]);
        setItemState({
            ...itemState,
            picture: objectUrl
        })
    }

    const submitFormAdd = e => {
        e.preventDefault();
        props.addItem(itemState)
        props.handleClose();
    }

    const submitFormEdit = e => {
        e.preventDefault();
        props.updateItem(itemState);
        props.handleClose();
    }

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control id="title" type="text" value={itemState.title} placeholder="Enter model title" onChange={updateTitle}/>
            </Form.Group>
            <Form.Group>
                <Form.File id="image-file" label="Model image" onChange={onSelectFile}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control id="description" type="textarea" value={itemState.description} placeholder="Enter model description" onChange={updateDescription}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default AddEditForm;