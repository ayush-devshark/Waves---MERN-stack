import React from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import HistoryBlock from 'utils/HistoryBlock';

const UserDashboard = ({ users }) => {
    return (
        <>
            <DashboardLayout title='Overview'>
                <div className='user_nfo_panel'>
                    <div>{users.data.firstname}</div>
                    <div>{users.data.lastname}</div>
                    <div>{users.data.email}</div>
                    {users.data.history ? (
                        <div className='user_nfo_panel'>
                            <h1>History of purchases</h1>
                            <div className='user_product_block_wrapper'>
                                <HistoryBlock history={users.data.history} />
                            </div>
                        </div>
                    ) : null}
                </div>
            </DashboardLayout>
        </>
    );
};

export default UserDashboard;
