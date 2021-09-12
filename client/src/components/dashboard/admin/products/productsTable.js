import React from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Moment from 'react-moment';
import Loader from 'utils/loader';

const ProductsTable = ({ products, prev, next, goToEdit }) => {
    const gotoPrevPage = page => {
        prev(page);
    };
    const gotoNextPage = page => {
        next(page);
    };
    return (
        <>
            {products && products.docs ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Model</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.docs.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <Moment to={item.date}></Moment>
                                    </td>
                                    <td>{item.model}</td>
                                    <td>{item.available}</td>
                                    <td
                                        className='action_btn remove_btn'
                                        onClick={() => alert('remove')}
                                    >
                                        Remove
                                    </td>
                                    <td
                                        className='action_btn edit_btn'
                                        onClick={() => goToEdit(item._id)}
                                    >
                                        Edit
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {products.hasPrevPage ? (
                            <>
                                <Pagination.Prev
                                    onClick={() =>
                                        gotoPrevPage(products.prevPage)
                                    }
                                />
                                <Pagination.Item
                                    onClick={() =>
                                        gotoPrevPage(products.prevPage)
                                    }
                                >
                                    {products.prevPage}
                                </Pagination.Item>
                            </>
                        ) : null}
                        <Pagination.Item active>
                            {products.page}
                        </Pagination.Item>
                        {products.hasNextPage ? (
                            <>
                                <Pagination.Item
                                    onClick={() =>
                                        gotoNextPage(products.nextPage)
                                    }
                                >
                                    {products.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() =>
                                        gotoNextPage(products.nextPage)
                                    }
                                />
                            </>
                        ) : null}
                    </Pagination>
                    <hr />
                    <LinkContainer to='/dashboard/admin/add_products'>
                        <Button variant='secondary'>Add product</Button>
                    </LinkContainer>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductsTable;
