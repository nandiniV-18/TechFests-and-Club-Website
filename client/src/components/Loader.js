import React, { useState } from 'react';
import { css } from 'react-emotion';
import HashLoader from 'react-spinners/HashLoader';
function Loader() {
    const [loading, setloading] = useState(true);
    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">
                <HashLoader
                    color='#000'
                    loading={loading}
                    cssOverride=''
                    size={150}
                />
            </div>

        </div>
    )
}

export default Loader