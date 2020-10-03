import React from 'react'
import axios from 'axios';

export default function AxiosClient() {
    return axios.get('https://api.openchargemap.io/v3/poi/?output=json&latitude=65.012093&longitude=25.465076&maxresults=25&distanceunit=10miles')
}


