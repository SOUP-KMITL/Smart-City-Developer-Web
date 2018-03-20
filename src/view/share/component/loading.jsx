import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div className='flex-middle'>
        <ReactLoading type='bars' color='#ced4da' height={100} width={100} />
    </div>
)

export default Loading;
