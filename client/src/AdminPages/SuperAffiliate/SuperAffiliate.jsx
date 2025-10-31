import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const SuperAffiliate = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <div>
            Super Affiliate
        </div>
    );
};

export default SuperAffiliate;