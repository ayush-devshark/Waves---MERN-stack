import React from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Moment from 'react-moment';
import Loader from 'utils/loader';

const ProductsTable = ({ products }) => {
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
                                        onClick={() => alert('edit')}
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
                                    onClick={() => alert('prev')}
                                />
                                <Pagination.Item
                                    onClick={() => alert('Go to prev')}
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
                                    onClick={() => alert('Go to next')}
                                >
                                    {products.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() => alert('next')}
                                />
                            </>
                        ) : null}
                    </Pagination>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductsTable;
