import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";
import ModalForm from './ModalForm';
import DataTable from './DataTable';
import './App.css';
import initData from './init.json';

function App() {
    const [items, setItems] = useState(initData);
    const [searchString, setSearchString] = useState('');
    const [filteredItems, setFilteredItems] = useState();
    const [sortBy, setSortBy] = useState('title');

    const addItem = (newEntry) => {
        newEntry.id = items.length;
        setItems(oldItems => [...oldItems, newEntry]);
        setSearchString('');
    }

    const updateItem = (item) => {
        const itemIndex = items.findIndex(data => data.id === item.id);
        setItems([...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]);
        setSearchString('');
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        setSearchString('');
    }

    // Filter items
    useEffect(() => {
        if (searchString) {
            setFilteredItems(items.filter(item => {
                return item.title.includes(searchString) || item.description.includes(searchString)
            }));
        } else {
            setFilteredItems(undefined);
        }
    }, [searchString]);

    // Sort items
    useEffect(() => {
        setItems([...items].sort(function (a, b) {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0
        }))
    }, [sortBy]);

    return (
        <Container className="App">
            <header className="mt-3">
                <h1>Origami figures collection</h1>
            </header>
            <Row className="mt-3 justify-content-end align-items-baseline">
                <Col mt={3} sm={4}>
                    <input type="text" value={searchString} onChange={e => setSearchString(e.target.value)}
                           placeholder="Search..."/>
                </Col>
                <Col sm={8} className="mt-3 d-flex justify-content-end">
                    <Dropdown id="sort-by" title="Title" className="d-flex justify-content-start mr-3"
                              onSelect={eventKey => setSortBy(eventKey)}>
                        <Dropdown.Header>
                            Sort by:
                        </Dropdown.Header>
                        <Dropdown.Toggle>
                            {sortBy}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="title">Title</Dropdown.Item>
                            <Dropdown.Item eventKey="description">Description</Dropdown.Item>
                            <Dropdown.Item eventKey="rating">Rating</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ModalForm addItem={addItem}/>
                </Col>
            </Row>
            <DataTable items={filteredItems || items} updateItem={updateItem} deleteItem={deleteItem}/>
        </Container>
    )
}

export default App;
