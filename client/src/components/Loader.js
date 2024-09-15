import React, {useState} from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    let [loading, setLoading] = useState(true);

    return (
    <div style={{marginTop:'150px'}}>
        <div className="sweet-loading text-center">


            <HashLoader
                color= '#red'
                loading={loading}
                css=''
                size={100}
            />
        </div>

    </div>
)
}


export default Loader